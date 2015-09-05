// BOOKMARKLET: javascript:(function(window,%20document,%20$,%20undefined){%27use%20strict%27;if%20(%20!%20window.bcx%20)%20{return;}if%20(%20window.BCHighlightMe%20&&%20window.BCHighlightMe.highlightMe%20)%20{window.BCHighlightMe.highlightMe();return;}var%20app%20=%20{me%20:%20window.bcx.people.models[0],initDone%20:%20false};app.highlightMe%20=%20function()%20{if%20(%20!%20app.me.get(%20%27name%27%20)%20&&%20!%20app.me.get(%20%27email_address%27%20)%20)%20{return;}var%20$me%20=%20app.getMe();if%20(%20!%20$me.length%20)%20{return%20app.init(%20%27Hey,%20looks%20like%20you\%27re%20task-free!%27%20);}$me.parents(%20%27.wrapper%27%20).addClass(%20%27BC-highlight-me%27%20);app.init(%20%27Found%20%27+%20$me.length%20+%27%20tasks%20for%20you.%27%20);};app.init%20=%20function(%20alertMsg%20)%20{if%20(%20app.initDone%20)%20{return;}alert(%20alertMsg%20);$(%20%27body%27%20).on(%20%27click%27,%20%27a%27,%20app.clickLink%20);app.addStyles();app.initDone%20=%20true;};app.addStyles%20=%20function()%20{var%20css%20=%20%27%27;css%20+=%20%27<style%20type=%22text/css%22%20media=%22screen%22>%27;css%20+=%20%27.BC-highlight-me%20{%27;css%20+=%20%27background:%20#FFFF5C;%27;css%20+=%20%27border-radius:%2015px;%27;css%20+=%20%27padding:%205px%208px%205px%2030px%20!important;%27;css%20+=%20%27margin-left:%20-29px%20!important;%27;css%20+=%20%27}%27;css%20+=%20%27</style>%27;$(%20%27head%27%20).append(%20css%20);};app.getMe%20=%20function()%20{var%20selector%20=%20function(%20search%20)%20{return%20$(%20%27span[data-behavior=todo_assignee_present]:contains(%27+%20search%20+%27)%27%20);};var%20$me%20=%20selector(%20app.me.get(%20%27name%27%20)%20);if%20(%20!%20$me.length%20)%20{$me%20=%20selector(%20app.me.get(%20%27email_address%27%20)%20);}return%20$me;};app.clickLink%20=%20function()%20{setTimeout(%20function()%20{app.highlightMe();},%201000%20);};app.highlightMe();window.BCHighlightMe%20=%20window.BCHighlightMe%20||%20app;})(window,%20document,%20jQuery);

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
