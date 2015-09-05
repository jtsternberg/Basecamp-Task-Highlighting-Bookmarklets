(function(window, document, $, undefined){
	'use strict';

	if ( ! window.bcx ) {
		return;
	}

	if ( window.BCHighlightMe && window.BCHighlightMe.highlightMe ) {
		window.BCHighlightMe.highlightMe();
		return;
	}

	var app = {
		me : window.bcx.people.models[0],
		initDone : false
	};

	app.highlightMe = function() {
		if ( ! app.me.get( 'name' ) && ! app.me.get( 'email_address' ) ) {
			return;
		}

		var $me = app.getMe();

		if ( ! $me.length ) {
			return app.init( 'Hey, looks like you\'re task-free!' );
		}

		$me.parents( '.wrapper' ).addClass( 'BC-highlight-me' );
		app.init( 'Found '+ $me.length +' tasks for you.' );
	};

	app.init = function( alertMsg ) {
		if ( app.initDone ) {
			return;
		}

		alert( alertMsg );

		$( 'body' ).on( 'click', 'a', app.clickLink );
		app.addStyles();

		app.initDone = true;
	};

	app.addStyles = function() {
		var css = '';
		css += '<style type="text/css" media="screen">';
			css += '.BC-highlight-me {';
				css += 'background: #FFFF5C;';
				css += 'border-radius: 15px;';
				css += 'padding: 5px 8px 5px 30px !important;';
				css += 'margin-left: -29px !important;';
			css += '}';
		css += '</style>';
		$( 'head' ).append( css );
	};

	app.getMe = function() {
		var selector = function( search ) {
			return $( 'span[data-behavior=todo_assignee_present]:contains('+ search +')' );
		};

		var $me = selector( app.me.get( 'name' ) );

		if ( ! $me.length ) {
			$me = selector( app.me.get( 'email_address' ) );
		}

		return $me;
	};

	app.clickLink = function() {
		setTimeout( function() {
			app.highlightMe();
		}, 1000 );
	};

	app.highlightMe();

	window.BCHighlightMe = window.BCHighlightMe || app;

})(window, document, jQuery);

(function(window, document, $, undefined){
	'use strict';

	if ( ! window.bcx ) {
		return;
	}

	if ( window.BCHighlightUser && window.BCHighlightUser.init ) {
		window.BCHighlightUser.init();
		return;
	}

	var app = {
		search_name : '',
		initDone : false
	};

	$.expr[':'].Contains = function(a, i, m) {
		return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};

	app.init = function() {

		app.search_name = prompt( 'Search Name:' );

		var $search = app.highlightUser();

		var number = false !== $search && $search.length ? $search.length : 'No';
		alert( number + ' tasks found for '+ app.search_name + '.' );

		if ( ! app.initDone ) {
			$( 'body' ).on( 'click', 'a', app.clickLink );
			app.addStyles();
		}

		app.initDone = true;
	};

	app.addStyles = function() {
		var css = '';
		css += '<style type="text/css" media="screen">';
			css += '.BC-user-highlight {';
				css += 'background: #A4FF5C;';
				css += 'border-radius: 15px;';
				css += 'padding: 5px 8px 5px 30px !important;';
				css += 'margin-left: -29px !important;';
			css += '}';
		css += '</style>';
		$( 'head' ).append( css );
	};

	app.highlightUser = function() {
		if ( ! app.search_name ) {
			return;
		}

		var $search = $( 'span[data-behavior=todo_assignee_present]:Contains('+ app.search_name +')' );

		if ( ! $search.length ) {
			return false;
		}

		$( '.BC-user-highlight' ).removeClass( 'BC-user-highlight' );

		return $search.parents( '.wrapper' ).addClass( 'BC-user-highlight' );
	};

	app.clickLink = function() {
		setTimeout( function() {
			app.highlightUser();
		}, 1000 );
	};

	app.init();

	window.BCHighlightUser = window.BCHighlightUser || app;

})(window, document, jQuery);

(function(window, document, $, undefined){
	'use strict';

	if ( window.BCMinifier && window.BCMinifier.init ) {
		window.BCMinifier.addAllButtons();
		return;
	}

	var app = {
		upArrow : '&ShortUpArrow;',
		dwnArrow : '&ShortDownArrow;',
		autoHide : true
	};

	app.init = function() {
		$( 'body' ).on( 'click', '.minifier.minify-all', app.toggleAllLists );
		$( 'body' ).on( 'click', '.minifier.minify-lists', app.toggleList );
		$( 'body' ).on( 'click', 'a', app.clickLink );

		app.addStyles();
		app.addAllButtons();
	};

	app.addStyles = function() {
		var css = '';
		css += '<style type="text/css" media="screen">';
			css += '.minifier.minify-lists, .minify-all-icon {';
				css += 'top: .05em;';
				css += 'cursor: pointer;';
				css += 'background: #e2e9f8;';
				css += 'padding: 1px 6px;';
				css += 'border-radius: 100%;';
				css += 'color: #1c5c76;';
				css += 'font-size: 1.5em;';
				css += 'display: inline-block;';
				css += 'margin-left: 6px;';
				css += 'position: relative;';
			css += '}';
			css += '.minifier.minify-lists {';
				css += 'position: absolute;';
				css += 'right: 0;';
				css += 'top: .8em;';
			css += '}';
			css += '.minifier.minify-all {';
				css += 'display: inline-block;';
				css += 'margin-left: 10px;';
				css += 'cursor: pointer;';
			css += '}';
		css += '</style>';
		$( 'head' ).append( css );
	};

	app.addAllButtons = function() {
		app.addAllButton();
		$( '[data-sortable-type="todolist"]' ).each( app.addButtons );

		if ( app.autoHide ) {
			setTimeout( function() {
				$( '.minifier.minify-all' ).trigger( 'click' );
			}, 100 );
		}
	};

	app.addAllButton = function() {
		if ( $( '[data-behavior="new_todolist"]' ).next( '.minifier' ).length ) {
			return;
		}

		var html = '<div class="minifier minify-all" title="Minify All"><span class="minify-all-text">Minify All</span><span class="minify-all-icon">' + app.upArrow +'</span></div>';

		$( '[data-behavior="new_todolist"]' ).after( html );
	};

	app.addButtons = function() {
		var $this = $( this );
		var id = $this.attr( 'id' );

		if ( ! id || undefined === typeof id || $this.find( '.minifier' ).length > 0 ) {
			return;
		}

		var html = '<div class="minifier minify-lists" title="Minify List" data-selector="' + id + '">' + app.upArrow +'</div>';

		$this.css({ 'position':'relative' }).append( html );
	};

	app.toggleList = function( evt, state ) {
		var $button = evt instanceof jQuery ? evt : $( this );

		var $items = $( document.getElementById( $button.data( 'selector' ) ) ).find( '.todolist .todos' );

		function open() {
			$items.show();
			$button.data( 'hidden', false ).html( app.upArrow ).attr( 'title', 'Minify List' );
		}

		function close() {
			$items.hide();
			$button.data( 'hidden', true ).html( app.dwnArrow ).attr( 'title', 'Expand List' );
		}

		if ( 'close' === state ) {
			return close();
		}

		if ( $button.data( 'hidden' ) || 'open' === state ) {
			return open();
		}

		close();
	};

	app.toggleAllLists = function() {
		var $all_button = $( this );
		var closeIt = ! $all_button.data( 'hidden' );

		$( '.minifier.minify-lists' ).each( function() {
			app.toggleList( $( this ), closeIt ? 'close' : 'open' );
		});

		var html = closeIt ? app.dwnArrow : app.upArrow;
		var title = closeIt ? 'Expand All' : 'Minify All';

		$all_button.data( 'hidden', closeIt ).attr( 'title', title );
		$all_button.find( '.minify-all-text' ).html( title );
		$all_button.find( '.minify-all-icon' ).html( html );
	};

	app.clickLink = function() {
		setTimeout( function() {
			if ( $( '.minifier' ).length ) {
				return;
			}

			app.addAllButtons();
			setTimeout( app.clickLink, 200 );
		}, 1000 );
	};

	app.init();

	window.BCMinifier = window.BCMinifier || app;

})(window, document, jQuery);
