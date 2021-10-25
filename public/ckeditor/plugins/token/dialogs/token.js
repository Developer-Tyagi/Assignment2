/**
 * @fileOverview Definition for token plugin dialog.
 *
 */

'use strict';

CKEDITOR.dialog.add('token', function(editor) {
  var lang = editor.lang.token;
  var generalLabel = editor.lang.common.generalTab;
  var tokens = [['', '']];
  if (typeof editor.config.availableTokens != 'undefined') {
    tokens = editor.config.availableTokens;
  }
  var selectString = '<div id="selectedToken"> </div>';

  editor.config.groupTokens.forEach(tokenGroup => {
    var optGrp =
      "<button class='collapsible' style='color: black; width:90%; font-weight: bold;  padding: 5px 15px; cursor: pointer; border-bottom:1px solid black ;text-align: left; outline: none;font-size: 18px; margin-bottom:10px;'> " +
      tokenGroup.groupName +
      '</button>';
    var tokenOption =
      "<ul class='content' style='list-style-type:none; overflow: scroll; max-height: 250px; display:none;  transition: max-height 0.2s ease-out;'>";
    tokenGroup.tokens.forEach(tokenArr => {
      tokenOption +=
        "<li class='tokenElement'  style='padding:5px 25px;border-bottom:1px solid black; width:88%;  margin-bottom: 10px;'   value=" +
        tokenArr[1] +
        ' ><p>' +
        tokenArr[0] +
        '</p></li>';
    });
    tokenOption += '</ul> <br>';
    optGrp += tokenOption;

    selectString += optGrp;
  });

  return {
    title: lang.title,
    minWidth: 1050,
    minHeight: 400,

    contents: [
      {
        id: 'info',
        label: generalLabel,
        title: generalLabel,
        elements: [
          // Dialog window UI elements.
          {
            type: 'html',
            id: 'name',
            html: selectString,
            required: true,
            label: lang.name,
            style: '.active, .collapsible:hover {background-color: #555;}',
            onLoad: function() {
              var coll = document.getElementsByClassName('collapsible');

              for (var i = 0; i < coll.length; i++) {
                coll[i].addEventListener('click', function() {
                  this.classList.toggle('active');
                  var content = this.nextElementSibling;

                  if (content.style.display == 'block') {
                    content.style.display = 'none';
                  } else {
                    content.style.display = 'block';
                  }
                });
              }

              var coll2 = document.getElementsByClassName('tokenElement');

              var selectedItem = '';
              for (var i = 0; i < coll2.length; i++) {
                coll2[i].addEventListener('click', function() {
                  for (var j = 0; j < coll2.length; j++) {
                    coll2[j].style.backgroundColor = '';
                  }
                  selectedItem = this.getAttribute('value');
                  this.style.backgroundColor = 'grey';
                  var divEle = document.getElementById('selectedToken');
                  divEle.setAttribute('value', selectedItem);
                });
              }
            },
            onHide: function() {
              let coll = document.getElementsByClassName('collapsible');

              for (var i = 0; i < coll.length; i++) {
                var content = coll[i].nextElementSibling;
                if (content.style.display == 'block') {
                  content.style.display = 'none';
                  coll[i].classList.toggle('active');
                }
              }
            },
            commit: function(widget) {
              var document1 = document.getElementById('selectedToken');
              var finalToken = document1.getAttribute('value');
              if (finalToken && finalToken != null) {
              }
              widget.setData('name', finalToken);
            }
          }
        ]
      }
    ]
  };
});
