(function(window, document, $, undefined){
	'use strict';

	if ( window.BCMinifier && window.BCMinifier.init ) {
		window.BCMinifier.init();
		return;
	}

	var getEl = function( id ) {
		return document.getElementById( id );
	};

	var app = {
		upArrow : '&ShortUpArrow;',
		dwnArrow : '&ShortDownArrow;',
		autoHide : false
	};

	app.init = function() {
		app.maybeAddStyles();
		app.maybeAddButtons();

		if ( app.autoHide && 'done' !== app.autoHide ) {
			setTimeout( function() {
				$( '.minifier.minify-all' ).trigger( 'click' );
			}, 100 );
			app.autoHide = 'done';
		}
	};

	app.maybeAddStyles = function() {
		if ( ! getEl( 'bc-minifiy-lists-styles' ) ) {
			var css = '';
			css += '<style id="bc-minifiy-lists-styles" type="text/css" media="screen">';
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
		}
	};

	app.maybeAddButtons = function() {
		if ( app.addAllButton() ) {
			$( '.many_lists .todolist' ).each( app.addButtons );

			$( document.body )
				.on( 'click', '.minifier.minify-all', app.toggleAllLists )
				.on( 'click', '.minifier.minify-lists', app.toggleList )
				.on( 'basecamp_tasks_highlighted', app.maybeShowOnHighlight );
		}
	};

	app.addAllButton = function() {
		if ( ! getEl( 'bc-minifiy-all-lists' ) ) {
			var $btn = $( '.action_button.primary[data-behavior="expand_new_todolist"]' );
			var html = '<div id="bc-minifiy-all-lists" class="minifier minify-all" title="Minify All"><span class="minify-all-text">Minify All</span><span class="minify-all-icon">' + app.upArrow +'</span></div>';

			$btn.after( html );

			return true;
		}

		return false;
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

	app.maybeShowOnHighlight = function( evt, data ) {
		var index;
		for (index = data.ids.length - 1; index >= 0; index--) {
			var $button = $( '[data-selector="recording_' + data.ids[ index ] + '"]' );
			if ( $button.length && $button.data( 'hidden' ) ) {
				$button.trigger( 'click' );
			}
		}
	};

	app.init();

	// Check for highlight every second. This accounts for page navigation.
	app.interval = app.interval || window.setInterval( app.init, 1500 );

	window.BCMinifier = window.BCMinifier || app;

})(window, document, jQuery);
