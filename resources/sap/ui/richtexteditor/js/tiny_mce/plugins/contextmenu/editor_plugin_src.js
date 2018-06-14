(function(){var E=tinymce.dom.Event,a=tinymce.each,D=tinymce.DOM;tinymce.create('tinymce.plugins.ContextMenu',{init:function(b){var t=this,s,c,r,h;t.editor=b;c=b.settings.contextmenu_never_use_native;t.onContextMenu=new tinymce.util.Dispatcher(this);h=function(e){d(b,e);};s=b.onContextMenu.add(function(b,e){if((r!==0?r:e.ctrlKey)&&!c)return;E.cancel(e);if(e.target.nodeName=='IMG')b.selection.select(e.target);t._getMenu(b).showMenu(e.clientX||e.pageX,e.clientY||e.pageY);E.add(b.getDoc(),'click',h);b.nodeChanged();});b.onRemove.add(function(){if(t._menu)t._menu.removeAll();});function d(b,e){r=0;if(e&&e.button==2){r=e.ctrlKey;return;}if(t._menu){t._menu.removeAll();t._menu.destroy();E.remove(b.getDoc(),'click',h);t._menu=null;}};b.onMouseDown.add(d);b.onKeyDown.add(d);b.onKeyDown.add(function(b,e){if(e.shiftKey&&!e.ctrlKey&&!e.altKey&&e.keyCode===121){E.cancel(e);s(b,e);}});},getInfo:function(){return{longname:'Contextmenu',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/contextmenu',version:tinymce.majorVersion+"."+tinymce.minorVersion};},_getMenu:function(e){var t=this,m=t._menu,s=e.selection,c=s.isCollapsed(),b=s.getNode()||e.getBody(),d,p;if(m){m.removeAll();m.destroy();}p=D.getPos(e.getContentAreaContainer());m=e.controlManager.createDropMenu('contextmenu',{offset_x:p.x+e.getParam('contextmenu_offset_x',0),offset_y:p.y+e.getParam('contextmenu_offset_y',0),constrain:1,keyboard_focus:true});t._menu=m;m.add({title:'advanced.cut_desc',icon:'cut',cmd:'Cut'}).setDisabled(c);m.add({title:'advanced.copy_desc',icon:'copy',cmd:'Copy'}).setDisabled(c);m.add({title:'advanced.paste_desc',icon:'paste',cmd:'Paste'});if((b.nodeName=='A'&&!e.dom.getAttrib(b,'name'))||!c){m.addSeparator();m.add({title:'advanced.link_desc',icon:'link',cmd:e.plugins.advlink?'mceAdvLink':'mceLink',ui:true});m.add({title:'advanced.unlink_desc',icon:'unlink',cmd:'UnLink'});}m.addSeparator();m.add({title:'advanced.image_desc',icon:'image',cmd:e.plugins.advimage?'mceAdvImage':'mceImage',ui:true});m.addSeparator();d=m.addMenu({title:'contextmenu.align'});d.add({title:'contextmenu.left',icon:'justifyleft',cmd:'JustifyLeft'});d.add({title:'contextmenu.center',icon:'justifycenter',cmd:'JustifyCenter'});d.add({title:'contextmenu.right',icon:'justifyright',cmd:'JustifyRight'});d.add({title:'contextmenu.full',icon:'justifyfull',cmd:'JustifyFull'});t.onContextMenu.dispatch(t,m,b,c);return m;}});tinymce.PluginManager.add('contextmenu',tinymce.plugins.ContextMenu);})();
