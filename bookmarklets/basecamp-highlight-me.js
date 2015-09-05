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
