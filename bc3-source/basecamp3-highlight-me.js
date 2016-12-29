(function(window, document, $, undefined){
	'use strict';

	var app;

	if ( window.BC3HighlightMe && window.BC3HighlightMe.highlightMe ) {
		return window.BC3HighlightMe.init();
	}

	var getEl = function( id ) {
		return document.getElementById( id );
	};

	var $id = function( id ) {
		return $( getEl( id ) );
	};

	app = {
		me : $( '[name="current-person-id"]' ).attr( 'content' ),
		highlighted : null
	};

	app.unHighLight = function() {
		$id( 'bc-highlight-me' ).text( 'Highlight My Tasks' );
		$( '.BC-highlight-me' ).removeClass( 'BC-highlight-me' );
		app.highlighted = false;
	};

	app.doHighlight = function() {
		var $todos = app.getToDos();

		$id( 'bc-highlight-me' ).text( 'Unhighlight My Tasks' );

		if ( $todos.length ) {
			$todos.addClass( 'BC-highlight-me' );
		}

		app.triggerEvent( $todos );

		app.highlighted = true;

		return $todos;
	};

	app.highlightMe = function( clicked ) {
		if ( ! app.me || ( ! clicked && null === app.highlighted ) ) {
			return;
		}

		app.maybeAddButton();

		if ( app.highlighted && clicked ) {
			return app.unHighLight();
		}

		if ( ! app.highlighted && clicked ) {

			var $todos = app.doHighlight();

			if ( ! $todos.length ) {
				window.alert( 'Hey, looks like you\'re task-free!' );
			} else {
				window.alert( 'Found '+ $todos.length +' tasks for you.' );
			}
		}
	};

	app.init = function() {
		app.addStyles();
		app.maybeAddButton();
	};

	app.addStyles = function() {
		if ( ! getEl( 'bc-highlight-me-styles' ) ) {
			var css = '';
			css += '<style id="bc-highlight-me-styles" type="text/css" media="screen">';
				css += '.BC-highlight-me {';
					// css += 'background: #FFFF5C;';
					css += 'background: rgba(255, 255, 92, 0.4);';
					css += 'border-radius: 15px;';
					css += 'padding: 5px 8px 5px 10px !important;';
					css += 'margin-left: -10px !important;';
					css += 'margin-bottom: 7px;';
				css += '}';
				css += '#bc-highlight-me {';
					css += 'margin-right: 5px';
				css += '}';
			css += '</style>';
			$( 'head' ).append( css );
		}
	};

	app.maybeAddButton = function() {
		if ( ! getEl( 'bc-highlight-me' ) ) {
			var $toolbar = $( '.perma-toolbar' );
			var $btn = $toolbar.find( '[data-bridge-action-type="bookmark"]' );
			$btn.before( '<button id="bc-highlight-me" type="button" class="'+ $btn.attr( 'class' ) +'"></button>');
			if ( ! app.highlighted ) {
				app.unHighLight();
			} else {
				app.doHighlight();
			}

			$( document.body ).on( 'click', '#bc-highlight-me', app.highlightMe );
		}
	};

	app.getToDos = function() {
		return $( '[data-avatar-for-person-id="'+ app.me +'"]' ).parents( 'li.todo' );
	};

	app.triggerEvent = function( $todos ) {
		if ( $todos.length ) {
			var ids = $todos.parents( '.todolist' ).map( function() { return $( this ).data( 'recordingId' ); } ).get();
			$( 'body' ).trigger( 'basecamp_tasks_highlighted', { 'type' : 'me', 'ids' : ids } );
		}
	};

	app.init();

	// Check for highlight every second. This accounts for page navigation.
	app.interval = app.interval || window.setInterval( app.init, 1500 );

	window.BC3HighlightMe = window.BC3HighlightMe || app;

})(window, document, jQuery);
