tinymce.PluginManager.add('nonbreaking',function(a){var s=a.getParam('nonbreaking_force_tab');a.addCommand('mceNonBreaking',function(){a.insertContent((a.plugins.visualchars&&a.plugins.visualchars.state)?'<span class="mce-nbsp">&nbsp;</span>':'&nbsp;');a.dom.setAttrib(a.dom.select('span.mce-nbsp'),'data-mce-bogus','1');});a.addButton('nonbreaking',{title:'Nonbreaking space',cmd:'mceNonBreaking'});a.addMenuItem('nonbreaking',{text:'Nonbreaking space',cmd:'mceNonBreaking',context:'insert'});if(s){var b=+s>1?+s:3;a.on('keydown',function(e){if(e.keyCode==9){if(e.shiftKey){return;}e.preventDefault();for(var i=0;i<b;i++){a.execCommand('mceNonBreaking');}}});}});
