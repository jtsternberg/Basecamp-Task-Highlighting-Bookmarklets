javascript:(function(window,%20document,%20undefined){%27use%20strict%27;if%20(%20!%20window.BC%20||%20!%20window.BC.current%20)%20{return;}var%20$,%20jq,%20app;if%20(%20window.BC3HighlightMe%20&&%20window.BC3HighlightMe.highlightMe%20)%20{window.BC3HighlightMe.highlightMe();return;}app%20=%20{me%20:%20window.BC.current.person,initDone%20:%20false};app.highlightMe%20=%20function()%20{if%20(%20!%20app.me.id%20)%20{return;}var%20$todos%20=%20app.getToDos();if%20(%20!%20$todos.length%20)%20{return%20app.init(%20%27Hey,%20looks%20like%20you\%27re%20task-free!%27%20);}$todos.addClass(%20%27BC-highlight-me%27%20);app.triggerEvent(%20$todos%20);app.init(%20%27Found%20%27+%20$todos.length%20+%27%20tasks%20for%20you.%27%20);};app.init%20=%20function(%20alertMsg%20)%20{if%20(%20app.initDone%20)%20{return;}alert(%20alertMsg%20);window.setInterval(%20app.highlightMe,%201500%20);app.addStyles();app.initDone%20=%20true;};app.addStyles%20=%20function()%20{var%20css%20=%20%27%27;css%20+=%20%27<style%20type=%22text/css%22%20media=%22screen%22>%27;css%20+=%20%27.BC-highlight-me%20{%27;css%20+=%20%27background:%20rgba(255,%20255,%2092,%200.4);%27;css%20+=%20%27border-radius:%2015px;%27;css%20+=%20%27padding:%205px%208px%205px%2010px%20!important;%27;css%20+=%20%27margin-left:%20-9px%20!important;%27;css%20+=%20%27margin-bottom:%207px;%27;css%20+=%20%27}%27;css%20+=%20%27</style>%27;$(%20%27head%27%20).append(%20css%20);};app.getToDos%20=%20function()%20{return%20$(%20%27[data-avatar-for-person-id=%22%27+%20app.me.id%20+%27%22]%27%20).parents(%20%27li.todo%27%20);};app.triggerEvent%20=%20function(%20$todos%20)%20{if%20(%20$todos.length%20)%20{var%20ids%20=%20$todos.parents(%20%27.todolist%27%20).map(%20function()%20{%20return%20$(%20this%20).data(%20%27recordingId%27%20);%20}%20).get();$(%20%27body%27%20).trigger(%20%27basecamp_tasks_highlighted%27,%20{%20%27type%27%20:%20%27me%27,%20%27ids%27%20:%20ids%20}%20);}};if%20(%20window.jQuery%20)%20{$%20=%20window.jQuery;app.highlightMe();}%20else%20{jq%20=%20document.createElement(%27script%27);jq.src%20=%20%22https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js%22;document.getElementsByTagName(%27head%27)[0].appendChild(jq);setTimeout(%20function()%20{jQuery.noConflict();$%20=%20window.jQuery;app.highlightMe();},%20500%20);}window.BC3HighlightMe%20=%20window.BC3HighlightMe%20||%20app;})(window,%20document);