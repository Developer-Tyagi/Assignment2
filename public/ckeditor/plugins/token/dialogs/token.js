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
  var selectString =
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  <style>ul::-webkit-scrollbar { width: 10px; }  ul::-webkit-scrollbar-track {background-color: #9993 !important; } ul::-webkit-scrollbar-thumb {background-color: #9999 !important; } </style> <div id="selectedToken"> </div>';
  editor.config.groupTokens.forEach(tokenGroup => {
    var optGrp =
      "<button class='collapsible' style='color: black; width:90%; font-weight: bold;  padding: 10px 15px; cursor: pointer; border-bottom:1px solid #d8d8d8 ;text-align: left; outline: none;font-size: 16px; '><i class='fa fa-plus' style='margin-right:10px'></i>" +
      tokenGroup.groupName +
      '</button>';
    var tokenOption =
      "<ul class='content' style='list-style-type:none; overflow-y: scroll; max-height: 250px; display:none;  transition: max-height 0.2s ease-out; height: 110%; margin-bottom: 0.01em;' >";
    tokenGroup.tokens.forEach(tokenArr => {
      tokenOption +=
        "<li class='tokenElement' style='padding:10px 25px;border-bottom:1px solid #d8d8d8; width:88%'   value=" +
        tokenArr[1] +
        ' ><p style="margin-left:10px;font-size: 14px;">' +
        tokenArr[0] +
        '</p></li>';
    });
    tokenOption += '</ul> <br>';
    optGrp += tokenOption;

    selectString += optGrp;
  });

  return {
    title: lang.title,
    minWidth: 900,
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
                  // remove all active class
                  for (var j = 0; j < coll.length; j++) {
                    var content1 = coll[j].nextElementSibling;
                    if (content1.style.display == 'block' && this !== coll[j]) {
                      content1.style.display = 'none';
                      coll[j].classList.toggle('active');
                      var iconEle = coll[j].childNodes[0];
                      iconEle.classList.toggle('fa-minus');
                    }
                  }
                  // open selected item
                  this.classList.toggle('active');
                  var content = this.nextElementSibling;
                  var iconElement = this.childNodes[0];
                  iconElement.classList.toggle('fa-minus');

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
                  let iconEle = coll[i].childNodes[0];
                  iconEle.classList.toggle('fa-minus');
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
