tinyMCEPopup.requireLangPack();var ExampleDialog={init:function(){var f=document.forms[0];f.someval.value=tinyMCEPopup.editor.selection.getContent({format:'text'});f.somearg.value=tinyMCEPopup.getWindowArg('some_custom_arg');},insert:function(){tinyMCEPopup.editor.execCommand('mceInsertContent',false,document.forms[0].someval.value);tinyMCEPopup.close();}};tinyMCEPopup.onInit.add(ExampleDialog.init,ExampleDialog);
