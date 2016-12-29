(function(window, document, $, undefined){
	'use strict';

	if ( window.BCMinifier && window.BCMinifier.init ) {
		window.BCMinifier.addAllButtons();
		return;
	}

	var app = {
		upArrow : '&ShortUpArrow;',
		dwnArrow : '&ShortDownArrow;',
		autoHide : false
	};

	app.init = function() {
		$( 'body' ).on( 'click', '.minifier.minify-all', app.toggleAllLists );
		$( 'body' ).on( 'click', '.minifier.minify-lists', app.toggleList );
		$( 'body' ).on( 'click', 'a', app.clickLink );
		$( 'body' ).on( 'basecamp_tasks_highlighted', app.maybeShowOnHighlight );

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
				css += 'top: .4em;';
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
		$( '.todolists li[data-sortable-type="todolist"]' ).each( app.addButtons );

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
