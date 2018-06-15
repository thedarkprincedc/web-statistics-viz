(function(){tinymce.create('tinymce.plugins.WordCount',{block:0,id:null,countre:null,cleanre:null,init:function(a,u){var t=this,l=0,V=tinymce.VK;t.countre=a.getParam('wordcount_countregex',/[\w\u2019\u00co-\u00ff^\uc397^u00f7\'-]+/g);t.cleanre=a.getParam('wordcount_cleanregex',/[0-9.(),;:!?%#$?\'\"_+=\\\/-]*/g);t.update_rate=a.getParam('wordcount_update_rate',2000);t.update_on_delete=a.getParam('wordcount_update_on_delete',false);t.id=a.id+'-word-count';a.onPostRender.add(function(a,d){var r,i;i=a.getParam('wordcount_target_id');if(!i){r=tinymce.DOM.get(a.id+'_path_row');if(r)tinymce.DOM.add(r.parentNode,'div',{'style':'float: right'},a.getLang('wordcount.words','Words: ')+'<span id="'+t.id+'">0</span>');}else{tinymce.DOM.add(i,'span',{},'<span id="'+t.id+'">0</span>');}});a.onInit.add(function(a){a.selection.onSetContent.add(function(){t._count(a);});t._count(a);});a.onSetContent.add(function(a){t._count(a);});function c(k){return k!==l&&(k===V.ENTER||l===V.SPACEBAR||b(l));}function b(k){return k===V.DELETE||k===V.BACKSPACE;}a.onKeyUp.add(function(a,e){if(c(e.keyCode)||t.update_on_delete&&b(e.keyCode)){t._count(a);}l=e.keyCode;});},_getCount:function(e){var t=0;var a=e.getContent({format:'raw'});if(a){a=a.replace(/\.\.\./g,' ');a=a.replace(/<.[^<>]*?>/g,' ').replace(/&nbsp;|&#160;/gi,' ');a=a.replace(/(\w+)(&.+?;)+(\w+)/,"$1$3").replace(/&.+?;/g,' ');a=a.replace(this.cleanre,'');var w=a.match(this.countre);if(w){t=w.length;}}return t;},_count:function(e){var t=this;if(t.block)return;t.block=1;setTimeout(function(){if(!e.destroyed){var a=t._getCount(e);tinymce.DOM.setHTML(t.id,a.toString());setTimeout(function(){t.block=0;},t.update_rate);}},1);},getInfo:function(){return{longname:'Word Count plugin',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/wordcount',version:tinymce.majorVersion+"."+tinymce.minorVersion};}});tinymce.PluginManager.add('wordcount',tinymce.plugins.WordCount);})();