// javascript:(function($,%20undefined){var%20search_name%20=%20prompt(%20%27Search%20Name:%27%20);if%20(search_name%20!==%20null)%20{jQuery.expr[%27:%27].Contains%20=%20function(a,%20i,%20m)%20{return%20jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())%20>=%200;};var%20behavior%20=%20%27todo_assignee_present%27;var%20$search_name%20=%20$(%27span[data-behavior=%27+%20behavior%20+%27]:Contains(%27+%20search_name%20+%27)%27);if%20(%20!%20$search_name.length%20)%20{$search_name%20=%20$(%27span[data-behavior=%27+%20behavior%20+%27]:Contains(%27+%20search_name%20+%27)%27);}if%20(%20!%20$search_name.length%20)%20{return%20false;}$(%27span[data-behavior]%27).parents(%27.wrapper%27).css({%27background%27:%20%27none%27,%27padding%27:%20%270%27,%27margin-left%27:%20%270%27});$search_name.parents(%27.wrapper%27).css({%27background%27:%20%27#A4FF5C%27,%27padding%27:%20%275px%208px%205px%2030px%27,%27border-radius%27:%20%2715px%27,%27margin-left%27:%20%27-29px%27});alert(%20$search_name.parents(%27.wrapper%27).length%20+%20%27%20tasks%20found%20for%20%27+%20search_name%20+%20%27.%27%20);}})(jQuery);

(function($, undefined){

	var search_name = prompt( 'Search Name:' );

	if (search_name !== null) {
		jQuery.expr[':'].Contains = function(a, i, m) {
			return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};
		var behavior = 'todo_assignee_present';
		var $search_name = $('span[data-behavior='+ behavior +']:Contains('+ search_name +')');
		if ( ! $search_name.length ) {
			$search_name = $('span[data-behavior='+ behavior +']:Contains('+ search_name +')');
		}
		if ( ! $search_name.length ) {
			return false;
		}
		$('span[data-behavior]').parents('.wrapper').css({
			'background': 'none',
			'padding': '0',
			'margin-left': '0'
		});
		$search_name.parents('.wrapper').css({
			'background': '#A4FF5C',
			'padding': '5px 8px 5px 30px',
			'border-radius': '15px',
			'margin-left': '-29px'
		});

		alert( $search_name.parents('.wrapper').length + ' tasks found for '+ search_name + '.' );
	}

})(jQuery);
