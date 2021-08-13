<template>
  <ckeditor
    v-if="showEditor"
    v-model="editorData"
    :config="config"
    @ready="prefill()"
    editorUrl="/ckeditor/ckeditor.js"
    @change="$emit('updateMarkup', val)"
  />
</template>

<script>
import CKEditor from 'ckeditor4-vue';
export default {
  name: 'Ckeditor',
  components: {
    ckeditor: CKEditor.component
  },

  props: ['markup', 'templateTokens'],

  data: () => ({
    editorData: '',
    showEditor: false,
    config: {
      height: 150,
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        {
          name: 'editing',
          groups: ['find', 'selection', 'spellchecker', 'editing']
        },
        {
          name: 'paragraph',
          groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
        },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      extraPlugins: 'token,addsign',
      clipboard_defaultContentType: 'text',
      availableTokens: [],
      tabSpaces: 4,
      removeButtons:
        'Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Source,CreateDiv,Blockquote,About,Maximize,ShowBlocks,Flash,Smiley,SpecialChar,Iframe,PageBreak,Anchor,Unlink,Link,BidiLtr,BidiRtl,Language',
      // filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
      // filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      // filebrowserUploadMethod: 'form',
      // filebrowserUploadUrl: 'https://api.claimguru.cilalabs.dev/v1/files',
      // uploadUrl: 'https://api.claimguru.cilalabs.dev/v1/files',
      // imageUploadUrl: 'https://api.claimguru.cilalabs.dev/v1/files',
      // filebrowserUploadMethod: 'xhr',
      // fileTools_requestHeaders: {
      //   Accept: 'application/json',
      //   'Content-Type': 'multipart/form-data',
      //   Authorization:
      //     'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjNGQwMGJjM2NiZWE4YjU0NTMzMWQxZjFjOTZmZDRlNjdjNTFlODkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS3VsZGVlcCBTaW5naCBQYWwiLCJvcmdhbml6YXRpb25JRCI6IjYwNjY3OTk4NmY2MTJlODkzNjg0YTNlNSIsInJvbGVzIjpbIm93bmVyIl0sImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wcmUtcHJvZC0yODY4MDEiLCJhdWQiOiJwcmUtcHJvZC0yODY4MDEiLCJhdXRoX3RpbWUiOjE2MjM2NTA5MDMsInVzZXJfaWQiOiJkeGRKNGFSMjU5TlRwSVFraXF4ajZCNDZrcjUzIiwic3ViIjoiZHhkSjRhUjI1OU5UcElRa2lxeGo2QjQ2a3I1MyIsImlhdCI6MTYyMzk5NTk3NSwiZXhwIjoxNjIzOTk5NTc1LCJlbWFpbCI6Imt1bGRlZXBAY2lsYWxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsia3VsZGVlcEBjaWxhbGFicy5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.eabl9yO5LXi_5V2ut2ep0o1ULobXCtQxJYDZsYMbh7xX5g2LcoLiyEVSMG1DKOZHZUVYoGy027ZhVJOMH85r07K742pwAa8sgtbxJv_iwcClrecyyUZonS6Ceo-qe5fmN2atJv05Rzr5WcNVq7aYXH-gYP4v6NnRpvq0x_9EB8pxBlKQqZtRP5eBCZOxWzDqnRmGGJ6yCACwltfTNp-Q42ePhvSlmST98Z0Sp_hIqZn-yvzGXHv_BO_Y_UdoqrbFcuaI2PTKEKOypZbbLiHN6nSwmy4gv7bL-sgyBh0WUD_B-eMxYc1LhvJ6LbA7PSudzgjFinHhCclADgQfDKEPQg'
      // },

      // // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
      // // Reduce the list of block elements listed in the Format drop-down to the most commonly used.
      // format_tags: 'p;h1;h2;h3;pre',
      // // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
      // removeDialogTabs: 'image:advanced;link:advanced'
      pasteFromWordRemoveFontStyles: false
    }
  }),

  watch: {
    markup(val) {
      this.editorData = val;
    },

    editorData(val) {
      this.$emit('updateMarkup', val);
    }
  },

  mounted() {
    this.config.availableTokens = this.templateTokens;
    this.showEditor = true;
  },

  methods: {
    prefill() {
      this.editorData = this.markup;
    }
  }
};
</script>
