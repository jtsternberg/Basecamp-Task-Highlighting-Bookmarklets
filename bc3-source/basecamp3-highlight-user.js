(function(window, document, $, undefined){
	'use strict';

	if ( window.BCHighlightUser && window.BCHighlightUser.init ) {
		return window.BCHighlightUser.init();
	}

	var getEl = function( id ) {
		return document.getElementById( id );
	};

	var app = {
		search_name : ''
	};

	if ( ! $.expr[':'].Contains ) {
		$.expr[':'].Contains = function(a, i, m) {
			return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};
	}

	app.searchUser = function() {
		app.search_name = prompt( 'Search Name:' );

		var $search = app.highlightUser();

		var number = false !== $search && $search.length ? $search.length : 'No';
		alert( number + ' tasks found for '+ app.search_name + '.' );

		app.triggerEvent( $search );
	};

	app.init = function() {
		app.maybeAddStyles();
		app.maybeAddButton();
		app.highlightUser();
	};

	app.maybeAddStyles = function() {
		if ( ! getEl( 'bc-highlight-user-styles' ) ) {
			var css = '';
			css += '<style id="bc-highlight-user-styles" type="text/css" media="screen">';
				css += '.BC-user-highlight {';
				// css += 'background: #A4FF5C;';
				css += 'background: rgba(164, 255, 92, 0.42);';
					css += 'border-radius: 15px;';
					css += 'padding: 5px 8px 5px 10px !important;';
					css += 'margin-left: -10px !important;';
					css += 'margin-bottom: 7px;';
				css += '}';
			css += '</style>';
			$( 'head' ).append( css );
		}
	};

	app.maybeAddButton = function() {
		if ( ! getEl( 'bc-highlight-user' ) ) {
			var $toolbar = $( '.perma-toolbar' );
			var $btn = $toolbar.find( '[data-bridge-action-type="bookmark"]' );
			var classes = $btn.attr( 'class' ).replace( 'bookmark', 'highlight-user' );
			$btn.before( '<button id="bc-highlight-user" class="'+ classes +'" type="button">Search User <span class="topnav-menu__icon topnav-menu__icon--search"></span></button>');

			$( document.body ).on( 'click', '#bc-highlight-user', app.searchUser );
		}
	};

	app.highlightUser = function() {
		if ( ! app.search_name ) {
			return;
		}

		app.maybeAddButton();

		var $search = $( '.todo_assignee .todo_assignee_name:Contains('+ app.search_name +')' );

		if ( ! $search.length ) {
			return false;
		}

		$( '.BC-user-highlight' ).removeClass( 'BC-user-highlight' );

		return $search.parents( 'li.todo' ).addClass( 'BC-user-highlight' );
	};

	app.triggerEvent = function( $search ) {
		if ( $search.length ) {
			var ids = $search.parents( '.todolist' ).map( function() { return $( this ).data( 'recordingId' ); } ).get();
			$( 'body' ).trigger( 'basecamp_tasks_highlighted', { 'type' : 'me', 'ids' : ids } );
		}
	};

	app.init();

	// Check for highlight every second. This accounts for page navigation.
	app.interval = app.interval || window.setInterval( app.init, 1500 );

	window.BCHighlightUser = window.BCHighlightUser || app;

})(window, document, jQuery);
