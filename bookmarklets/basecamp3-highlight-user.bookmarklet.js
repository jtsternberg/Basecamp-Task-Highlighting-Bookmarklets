javascript:(function(window,%20document,%20$,%20undefined){%27use%20strict%27;if%20(%20window.BCHighlightUser%20&&%20window.BCHighlightUser.init%20)%20{return%20window.BCHighlightUser.init();}var%20getEl%20=%20function(%20id%20)%20{return%20document.getElementById(%20id%20);};var%20app%20=%20{search_name%20:%20%27%27};if%20(%20!%20$.expr[%27:%27].Contains%20)%20{$.expr[%27:%27].Contains%20=%20function(a,%20i,%20m)%20{return%20$(a).text().toUpperCase().indexOf(m[3].toUpperCase())%20>=%200;};}app.searchUser%20=%20function()%20{app.search_name%20=%20prompt(%20%27Search%20Name:%27%20);var%20$search%20=%20app.highlightUser();var%20number%20=%20false%20!==%20$search%20&&%20$search.length%20?%20$search.length%20:%20%27No%27;alert(%20number%20+%20%27%20tasks%20found%20for%20%27+%20app.search_name%20+%20%27.%27%20);app.triggerEvent(%20$search%20);};app.init%20=%20function()%20{app.maybeAddStyles();app.maybeAddButton();app.highlightUser();};app.maybeAddStyles%20=%20function()%20{if%20(%20!%20getEl(%20%27bc-highlight-user-styles%27%20)%20)%20{var%20css%20=%20%27%27;css%20+=%20%27<style%20id=%22bc-highlight-user-styles%22%20type=%22text/css%22%20media=%22screen%22>%27;css%20+=%20%27.BC-user-highlight%20{%27;css%20+=%20%27background:%20rgba(164,%20255,%2092,%200.42);%27;css%20+=%20%27border-radius:%2015px;%27;css%20+=%20%27padding:%205px%208px%205px%2010px%20!important;%27;css%20+=%20%27margin-left:%20-10px%20!important;%27;css%20+=%20%27margin-bottom:%207px;%27;css%20+=%20%27}%27;css%20+=%20%27</style>%27;$(%20%27head%27%20).append(%20css%20);}};app.maybeAddButton%20=%20function()%20{if%20(%20!%20getEl(%20%27bc-highlight-user%27%20)%20)%20{var%20$toolbar%20=%20$(%20%27.perma-toolbar%27%20);var%20$btn%20=%20$toolbar.find(%20%27[data-bridge-action-type=%22bookmark%22]%27%20);$btn.before(%20%27<button%20id=%22bc-highlight-user%22%20class=%22%27+%20$btn.attr(%20%27class%27%20)%20+%27%22%20type=%22button%22>Search%20User%20<span%20class=%22topnav-menu__icon%20topnav-menu__icon--search%22></span></button>%27);$(%20document.body%20).on(%20%27click%27,%20%27#bc-highlight-user%27,%20app.searchUser%20);}};app.highlightUser%20=%20function()%20{if%20(%20!%20app.search_name%20)%20{return;}app.maybeAddButton();var%20$search%20=%20$(%20%27.todo_assignee%20.todo_assignee_name:Contains(%27+%20app.search_name%20+%27)%27%20);if%20(%20!%20$search.length%20)%20{return%20false;}$(%20%27.BC-user-highlight%27%20).removeClass(%20%27BC-user-highlight%27%20);return%20$search.parents(%20%27li.todo%27%20).addClass(%20%27BC-user-highlight%27%20);};app.triggerEvent%20=%20function(%20$search%20)%20{if%20(%20$search.length%20)%20{var%20ids%20=%20$search.parents(%20%27.todolist%27%20).map(%20function()%20{%20return%20$(%20this%20).data(%20%27recordingId%27%20);%20}%20).get();$(%20%27body%27%20).trigger(%20%27basecamp_tasks_highlighted%27,%20{%20%27type%27%20:%20%27me%27,%20%27ids%27%20:%20ids%20}%20);}};app.init();app.interval%20=%20app.interval%20||%20window.setInterval(%20app.init,%201500%20);window.BCHighlightUser%20=%20window.BCHighlightUser%20||%20app;})(window,%20document,%20jQuery);