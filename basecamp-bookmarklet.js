// javascript:(function(){if%20(%20!%20window.bcx%20)%20{%20return;%20}var%20email_address%20=%20window.bcx.people.models[0].get(%27email_address%27);var%20name%20=%20window.bcx.people.models[0].get(%27name%27);if%20(%20name%20&&%20email_address%20)%20{var%20behavior%20=%20%27todo_assignee_present%27;var%20$me%20=%20$(%27span[data-behavior=%27+%20behavior%20+%27]:contains(%27+%20name%20+%27)%27);if%20(%20!%20$me.length%20)%20{$me%20=%20$(%27span[data-behavior=%27+%20behavior%20+%27]:contains(%27+%20email_address%20+%27)%27);}if%20(%20$me.length%20)%20{$me.parents(%27.wrapper%27).css({%27background%27:%20%27#FFFF5C%27,%27padding%27:%20%275px%208px%205px%2030px%27,%27border-radius%27:%20%2715px%27,%27margin-left%27:%20%27-29px%27});alert(%20%27Found%20%27+%20$me.length%20+%27%20tasks%20for%20you.%27%20);}%20else%20{alert(%20%27Hey,%20looks%20like%20you\%27re%20task-free!%27%20);}}})();


(function(){
	if ( ! window.bcx ) { return; }

	var email_address = window.bcx.people.models[0].get('email_address');
	var name  = window.bcx.people.models[0].get('name');

	if ( name && email_address ) {
		var behavior = 'todo_assignee_present';
		var $me = $('span[data-behavior='+ behavior +']:contains('+ name +')');
		if ( ! $me.length ) {
			$me = $('span[data-behavior='+ behavior +']:contains('+ email_address +')');
		}
		if ( $me.length ) {
			$me.parents('.wrapper').css({
				'background': '#FFFF5C',
				'padding': '5px 8px 5px 30px',
				'border-radius': '15px',
				'margin-left': '-29px'
			});

			alert( 'Found '+ $me.length +' tasks for you.' );
		} else {
			alert( 'Hey, looks like you\'re task-free!' );
		}
	}
})();

// for the new people @here, I use this on a near-daily basis for seeing the tasks assigned to me more easily in BC: http://dsgnwrks.pro/plugins-and-scripts/bookmarklet-to-highlight-tasks-assigned-to-me-in-new-basecamp/
