'use strict';

CKEDITOR.plugins.add('addsign', {
  icons: 'addsign',
  init: function(editor) {
    editor.addCommand('addsign', {
      exec: function(editor) {
        editor.insertHtml(
          '<div  > Please Sign Here' +
            '<br>' +
            '<span style="color: white; background-color:white"> @docusign-signature@ </span>' +
            '</div>'
        );
      }
    });

    editor.ui.addButton('addsign', {
      label: 'Add Doc Sign',
      command: 'addsign',
      toolbar: 'insert,100'
    });
  }
});
