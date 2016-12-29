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
				css += 'margin-left: -10px !important;';
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
