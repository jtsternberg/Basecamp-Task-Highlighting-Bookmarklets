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
