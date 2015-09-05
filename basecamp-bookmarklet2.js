// BOOKMARKLET: javascript:(function(window,%20document,%20$,%20undefined){%27use%20strict%27;if%20(%20!%20window.bcx%20)%20{return;}if%20(%20window.BCHighlightUser%20&&%20window.BCHighlightUser.init%20)%20{window.BCHighlightUser.init();return;}var%20app%20=%20{search_name%20:%20%27%27,initDone%20:%20false};$.expr[%27:%27].Contains%20=%20function(a,%20i,%20m)%20{return%20$(a).text().toUpperCase().indexOf(m[3].toUpperCase())%20>=%200;};app.init%20=%20function()%20{app.search_name%20=%20prompt(%20%27Search%20Name:%27%20);var%20$search%20=%20app.highlightUser();var%20number%20=%20false%20!==%20$search%20&&%20$search.length%20?%20$search.length%20:%20%27No%27;alert(%20number%20+%20%27%20tasks%20found%20for%20%27+%20app.search_name%20+%20%27.%27%20);if%20(%20!%20app.initDone%20)%20{$(%20%27body%27%20).on(%20%27click%27,%20%27a%27,%20app.clickLink%20);app.addStyles();}app.initDone%20=%20true;};app.addStyles%20=%20function()%20{var%20css%20=%20%27%27;css%20+=%20%27<style%20type=%22text/css%22%20media=%22screen%22>%27;css%20+=%20%27.BC-user-highlight%20{%27;css%20+=%20%27background:%20#A4FF5C;%27;css%20+=%20%27border-radius:%2015px;%27;css%20+=%20%27padding:%205px%208px%205px%2030px%20!important;%27;css%20+=%20%27margin-left:%20-29px%20!important;%27;css%20+=%20%27}%27;css%20+=%20%27</style>%27;$(%20%27head%27%20).append(%20css%20);};app.highlightUser%20=%20function()%20{if%20(%20!%20app.search_name%20)%20{return;}var%20$search%20=%20$(%20%27span[data-behavior=todo_assignee_present]:Contains(%27+%20app.search_name%20+%27)%27%20);if%20(%20!%20$search.length%20)%20{return%20false;}$(%20%27.BC-user-highlight%27%20).removeClass(%20%27BC-user-highlight%27%20);return%20$search.parents(%20%27.wrapper%27%20).addClass(%20%27BC-user-highlight%27%20);};app.clickLink%20=%20function()%20{setTimeout(%20function()%20{app.highlightUser();},%201000%20);};app.init();window.BCHighlightUser%20=%20window.BCHighlightUser%20||%20app;})(window,%20document,%20jQuery);

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
