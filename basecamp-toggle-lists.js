// BOOKMARKLET: javascript:(function(window,%20document,%20$,%20undefined){%27use%20strict%27;if%20(%20window.BCMinifier%20&&%20window.BCMinifier.init%20)%20{window.BCMinifier.addAllButtons();return;}var%20app%20=%20{upArrow%20:%20%27&ShortUpArrow;%27,dwnArrow%20:%20%27&ShortDownArrow;%27,autoHide%20:%20true};app.init%20=%20function()%20{$(%20%27body%27%20).on(%20%27click%27,%20%27.minifier.minify-all%27,%20app.toggleAllLists%20);$(%20%27body%27%20).on(%20%27click%27,%20%27.minifier.minify-lists%27,%20app.toggleList%20);$(%20%27body%27%20).on(%20%27click%27,%20%27a%27,%20app.clickLink%20);app.addStyles();app.addAllButtons();};app.addStyles%20=%20function()%20{var%20css%20=%20%27%27;css%20+=%20%27<style%20type=%22text/css%22%20media=%22screen%22>%27;css%20+=%20%27.minifier.minify-lists,%20.minify-all-icon%20{%27;css%20+=%20%27top:%20.05em;%27;css%20+=%20%27cursor:%20pointer;%27;css%20+=%20%27background:%20#e2e9f8;%27;css%20+=%20%27padding:%201px%206px;%27;css%20+=%20%27border-radius:%20100%;%27;css%20+=%20%27color:%20#1c5c76;%27;css%20+=%20%27font-size:%201.5em;%27;css%20+=%20%27display:%20inline-block;%27;css%20+=%20%27margin-left:%206px;%27;css%20+=%20%27position:%20relative;%27;css%20+=%20%27}%27;css%20+=%20%27.minifier.minify-lists%20{%27;css%20+=%20%27position:%20absolute;%27;css%20+=%20%27right:%200;%27;css%20+=%20%27top:%20.8em;%27;css%20+=%20%27}%27;css%20+=%20%27.minifier.minify-all%20{%27;css%20+=%20%27display:%20inline-block;%27;css%20+=%20%27margin-left:%2010px;%27;css%20+=%20%27cursor:%20pointer;%27;css%20+=%20%27}%27;css%20+=%20%27</style>%27;$(%20%27head%27%20).append(%20css%20);};app.addAllButtons%20=%20function()%20{app.addAllButton();$(%20%27[data-sortable-type=%22todolist%22]%27%20).each(%20app.addButtons%20);if%20(%20app.autoHide%20)%20{setTimeout(%20function()%20{$(%20%27.minifier.minify-all%27%20).trigger(%20%27click%27%20);},%20100%20);}};app.addAllButton%20=%20function()%20{if%20(%20$(%20%27[data-behavior=%22new_todolist%22]%27%20).next(%20%27.minifier%27%20).length%20)%20{return;}var%20html%20=%20%27<div%20class=%22minifier%20minify-all%22%20title=%22Minify%20All%22><span%20class=%22minify-all-text%22>Minify%20All</span><span%20class=%22minify-all-icon%22>%27%20+%20app.upArrow%20+%27</span></div>%27;$(%20%27[data-behavior=%22new_todolist%22]%27%20).after(%20html%20);};app.addButtons%20=%20function()%20{var%20$this%20=%20$(%20this%20);var%20id%20=%20$this.attr(%20%27id%27%20);if%20(%20!%20id%20||%20undefined%20===%20typeof%20id%20||%20$this.find(%20%27.minifier%27%20).length%20>%200%20)%20{return;}var%20html%20=%20%27<div%20class=%22minifier%20minify-lists%22%20title=%22Minify%20List%22%20data-selector=%22%27%20+%20id%20+%20%27%22>%27%20+%20app.upArrow%20+%27</div>%27;$this.css({%20%27position%27:%27relative%27%20}).append(%20html%20);};app.toggleList%20=%20function(%20evt,%20state%20)%20{var%20$button%20=%20evt%20instanceof%20jQuery%20?%20evt%20:%20$(%20this%20);var%20$items%20=%20$(%20document.getElementById(%20$button.data(%20%27selector%27%20)%20)%20).find(%20%27.todolist%20.todos%27%20);function%20open()%20{$items.show();$button.data(%20%27hidden%27,%20false%20).html(%20app.upArrow%20).attr(%20%27title%27,%20%27Minify%20List%27%20);}function%20close()%20{$items.hide();$button.data(%20%27hidden%27,%20true%20).html(%20app.dwnArrow%20).attr(%20%27title%27,%20%27Expand%20List%27%20);}if%20(%20%27close%27%20===%20state%20)%20{return%20close();}if%20(%20$button.data(%20%27hidden%27%20)%20||%20%27open%27%20===%20state%20)%20{return%20open();}close();};app.toggleAllLists%20=%20function(%20evt%20)%20{var%20$all_button%20=%20$(%20this%20);var%20closeIt%20=%20!%20$all_button.data(%20%27hidden%27%20);$(%20%27.minifier.minify-lists%27%20).each(%20function()%20{app.toggleList(%20$(%20this%20),%20closeIt%20?%20%27close%27%20:%20%27open%27%20);});var%20html%20=%20closeIt%20?%20app.dwnArrow%20:%20app.upArrow;var%20title%20=%20closeIt%20?%20%27Expand%20All%27%20:%20%27Minify%20All%27;$all_button.data(%20%27hidden%27,%20closeIt%20).attr(%20%27title%27,%20title%20);$all_button.find(%20%27.minify-all-text%27%20).html(%20title%20);$all_button.find(%20%27.minify-all-icon%27%20).html(%20html%20);};app.clickLink%20=%20function()%20{setTimeout(%20function()%20{if%20(%20$(%20%27.minifier%27%20).length%20)%20{return;}app.addAllButtons();setTimeout(%20app.clickLink,%20200%20);},%201000%20);};app.init();window.BCMinifier%20=%20window.BCMinifier%20||%20app;})(window,%20document,%20jQuery);

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
		$( 'body' ).on( 'click', '.minifier.minify-all', app.toggleAllLists );
		$( 'body' ).on( 'click', '.minifier.minify-lists', app.toggleList );
		$( 'body' ).on( 'click', 'a', app.clickLink );

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
				css += 'top: .8em;';
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
		$( '[data-sortable-type="todolist"]' ).each( app.addButtons );

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

	app.toggleAllLists = function( evt ) {
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

	app.init();

	window.BCMinifier = window.BCMinifier || app;

})(window, document, jQuery);
