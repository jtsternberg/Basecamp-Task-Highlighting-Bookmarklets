(function(window, document, undefined){
	'use strict';

	if ( ! window.BC || ! window.BC.current ) {
		return;
	}

	var $, jq, app;

	if ( window.BC3HighlightMe && window.BC3HighlightMe.highlightMe ) {
		window.BC3HighlightMe.highlightMe();
		return;
	}

	app = {
		me : window.BC.current.person,
		initDone : false
	};

	app.highlightMe = function() {
		if ( ! app.me.id ) {
			return;
		}

		var $todos = app.getToDos();

		if ( ! $todos.length ) {
			return app.init( 'Hey, looks like you\'re task-free!' );
		}

		$todos.addClass( 'BC-highlight-me' );

		app.triggerEvent( $todos );

		app.init( 'Found '+ $todos.length +' tasks for you.' );
	};

	app.init = function( alertMsg ) {
		if ( app.initDone ) {
			return;
		}

		alert( alertMsg );

		// Check for highlight every second. This accounts for page navigation.
		window.setInterval( app.highlightMe, 1500 );

		app.addStyles();

		app.initDone = true;
	};

	app.addStyles = function() {
		var css = '';
		css += '<style type="text/css" media="screen">';
			css += '.BC-highlight-me {';
				// css += 'background: #FFFF5C;';
				css += 'background: rgba(255, 255, 92, 0.4);';
				css += 'border-radius: 15px;';
				css += 'padding: 5px 8px 5px 10px !important;';
				css += 'margin-left: -9px !important;';
				css += 'margin-bottom: 7px;';
			css += '}';
		css += '</style>';
		$( 'head' ).append( css );
	};

	app.getToDos = function() {
		return $( '[data-avatar-for-person-id="'+ app.me.id +'"]' ).parents( 'li.todo' );
	};

	app.triggerEvent = function( $todos ) {
		if ( $todos.length ) {
			var ids = $todos.parents( '.todolist' ).map( function() { return $( this ).data( 'recordingId' ); } ).get();
			$( 'body' ).trigger( 'basecamp_tasks_highlighted', { 'type' : 'me', 'ids' : ids } );
		}
	};

	if ( window.jQuery ) {

		$ = window.jQuery;
		app.highlightMe();

	} else {

		jq = document.createElement('script');
		jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
		document.getElementsByTagName('head')[0].appendChild(jq);

		setTimeout( function() {
			jQuery.noConflict();

			$ = window.jQuery;
			app.highlightMe();
		}, 500 );

	}

	window.BC3HighlightMe = window.BC3HighlightMe || app;

})(window, document);

(function(window, document, $, undefined){
	'use strict';

	if ( ! window.BC || ! window.BC.current ) {
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

		app.triggerEvent( $search );

		if ( ! app.initDone ) {
			// Check for highlight every second. This accounts for page navigation.
			window.setInterval( app.highlightUser, 1500 );
			app.addStyles();
		}

		app.initDone = true;
	};

	app.addStyles = function() {
		var css = '';
		css += '<style type="text/css" media="screen">';
			css += '.BC-user-highlight {';
			// css += 'background: #A4FF5C;';
			css += 'background: rgba(164, 255, 92, 0.42);';
				css += 'border-radius: 15px;';
				css += 'padding: 5px 8px 5px 10px !important;';
				css += 'margin-left: -9px !important;';
				css += 'margin-bottom: 7px;';
			css += '}';
		css += '</style>';
		$( 'head' ).append( css );
	};

	app.highlightUser = function() {
		if ( ! app.search_name ) {
			return;
		}

		var $search = $( '.todo_assignee .todo_assignee_name:Contains('+ app.search_name +')' );

		if ( ! $search.length ) {
			return false;
		}

		$( '.BC-user-highlight' ).removeClass( 'BC-user-highlight' );

		return $search.parents( 'li.todo' ).addClass( 'BC-user-highlight' );
	};

	app.triggerEvent = function( $search ) {
		if ( $search.length ) {
			var ids = $search.parents( '.todolist' ).map(function() { return this.id; }).get();
			$( 'body' ).trigger( 'basecamp_tasks_highlighted', { 'type' : 'user', 'search' : app.search_name, 'ids' : ids } );
		}
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
		$( 'body' )
			.on( 'click', '.minifier.minify-all', app.toggleAllLists )
			.on( 'click', '.minifier.minify-lists', app.toggleList )
			.on( 'click', 'a', app.clickLink )
			.on( 'basecamp_tasks_highlighted', app.maybeShowOnHighlight );

		app.addStyles();
		app.addAllButtons();
	};

	app.addStyles = function() {
		var css = '';
		css += '<style type="text/css" media="screen">';
			css += '.minifier.minify-lists, .minify-all-icon {';
				css += 'top: .05em;';
				css += 'cursor: pointer;';
				css += 'background: #3cb371;';
				css += 'padding: 1px 6px;';
				css += 'border-radius: 30px;';
				css += 'color: #ffffff;';
				css += 'font-size: 1.5em;';
				css += 'display: inline-block;';
				css += 'margin-left: 6px;';
				css += 'position: relative;';
				css += 'width: 1.2em;';
				css += 'height: 1.2em;';
				css += 'line-height: 1em;';
				css += 'text-align: center;';
			css += '}';
			css += '.minifier.minify-lists {';
				css += 'position: absolute;';
				css += 'right: 0;';
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
		$( '.many_lists .todolist' ).each( app.addButtons );

		if ( app.autoHide ) {
			setTimeout( function() {
				$( '.minifier.minify-all' ).trigger( 'click' );
			}, 100 );
		}
	};

	app.addAllButton = function() {
		var $btn = $( '.action_button.primary[data-behavior="expand_new_todolist"]' );
		if ( $btn.next( '.minifier' ).length ) {
			return;
		}

		var html = '<div class="minifier minify-all" title="Minify All"><span class="minify-all-text">Minify All</span><span class="minify-all-icon">' + app.upArrow +'</span></div>';

		$btn.after( html );
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
		var $list = $( document.getElementById( $button.data( 'selector' ) ) );
		var $items = $list.find( 'ul.todos.remaining, ul.todos.completed' );

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

	app.maybeShowOnHighlight = function( evt, data ) {
		var index, ids = data.ids;
		for (index = ids.length - 1; index >= 0; index--) {
			var $button = $( '[data-selector="sortable_' + ids[ index ] + '"]' );
			if ( $button.length && $button.data( 'hidden' ) ) {
				$button.trigger( 'click' );
			}
		}
	};

	app.init();

	window.BCMinifier = window.BCMinifier || app;

})(window, document, jQuery);
