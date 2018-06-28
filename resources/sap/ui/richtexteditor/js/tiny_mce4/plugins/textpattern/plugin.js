tinymce.PluginManager.add('textpattern',function(c){var d=true,p;p=c.settings.textpattern_patterns||[{start:'*',end:'*',format:'italic'},{start:'**',end:'**',format:'bold'},{start:'#',format:'h1'},{start:'##',format:'h2'},{start:'###',format:'h3'},{start:'####',format:'h4'},{start:'#####',format:'h5'},{start:'######',format:'h6'},{start:'1. ',cmd:'InsertOrderedList'},{start:'* ',cmd:'InsertUnorderedList'},{start:'- ',cmd:'InsertUnorderedList'}];function g(){if(d){p.sort(function(a,b){if(a.start.length>b.start.length){return-1;}if(a.start.length<b.start.length){return 1;}return 0;});d=false;}return p;}function f(t){var p=g();for(var i=0;i<p.length;i++){if(t.indexOf(p[i].start)!==0){continue;}if(p[i].end&&t.lastIndexOf(p[i].end)!=t.length-p[i].end.length){continue;}return p[i];}}function h(t,o,a){var p,b,i;p=g();for(i=0;i<p.length;i++){b=p[i];if(b.end&&t.substr(o-b.end.length-a,b.end.length)==b.end){return b;}}}function j(s){var a,b,r,e,o,i,t,n,q,u,v;function w(){e=e.splitText(i);e.splitText(o-i-u);e.deleteData(0,q.start.length);e.deleteData(e.data.length-q.end.length,q.end.length);}a=c.selection;b=c.dom;if(!a.isCollapsed()){return;}r=a.getRng(true);e=r.startContainer;o=r.startOffset;t=e.data;u=s?1:0;if(e.nodeType!=3){return;}q=h(t,o,u);if(!q){return;}i=Math.max(0,o-u);i=t.lastIndexOf(q.start,i-q.end.length-1);if(i===-1){return;}n=b.createRng();n.setStart(e,i);n.setEnd(e,o-u);q=f(n.toString());if(!q||!q.end){return;}if(e.data.length<=q.start.length+q.end.length){return;}v=c.formatter.get(q.format);if(v&&v[0].inline){w();c.formatter.apply(q.format,{},e);return e;}}function k(){var s,a,b,e,n,i,t,o,w,r,q;s=c.selection;a=c.dom;if(!s.isCollapsed()){return;}t=a.getParent(s.getStart(),'p');if(t){w=new tinymce.dom.TreeWalker(t,t);while((n=w.next())){if(n.nodeType==3){e=n;break;}}if(e){o=f(e.data);if(!o){return;}r=s.getRng(true);b=r.startContainer;q=r.startOffset;if(e==b){q=Math.max(0,q-o.start.length);}if(tinymce.trim(e.data).length==o.start.length){return;}if(o.format){i=c.formatter.get(o.format);if(i&&i[0].block){e.deleteData(0,o.start.length);c.formatter.apply(o.format,{},e);r.setStart(b,q);r.collapse(true);s.setRng(r);}}if(o.cmd){c.undoManager.transact(function(){e.deleteData(0,o.start.length);c.execCommand(o.cmd);});}}}}function l(){var r,w;w=j();if(w){r=c.dom.createRng();r.setStart(w,w.data.length);r.setEnd(w,w.data.length);c.selection.setRng(r);}k();}function m(){var w,a,b,r,e;w=j(true);if(w){e=c.dom;a=w.data.slice(-1);if(/[\u00a0 ]/.test(a)){w.deleteData(w.data.length-1,1);b=e.doc.createTextNode(a);if(w.nextSibling){e.insertAfter(b,w.nextSibling);}else{w.parentNode.appendChild(b);}r=e.createRng();r.setStart(b,1);r.setEnd(b,1);c.selection.setRng(r);}}}c.on('keydown',function(e){if(e.keyCode==13&&!tinymce.util.VK.modifierPressed(e)){l();}},true);c.on('keyup',function(e){if(e.keyCode==32&&!tinymce.util.VK.modifierPressed(e)){m();}});this.getPatterns=g;this.setPatterns=function(n){p=n;d=true;};});
