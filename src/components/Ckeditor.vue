<template>
  <ckeditor
    v-model="editorData"
    :config="config"
    editorUrl="https://cdn.ckeditor.com/4.14.0/full-all/ckeditor.js"
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

  props: ['markup'],

  data: () => ({
    editorData: '',
    config: {
      height: 150,
      extraPlugins: '',
      // availableTokens: [
      //   ['', ''],
      //   ['token1', 'token1'],
      //   ['token2', 'token2'],
      //   ['token3', 'token3']
      // ],
      removeButtons:
        'Source,Save,ExportPdf,Preview,Print,Scayt,Form,Textarea,TextField,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Language,BidiRtl,BidiLtr,Link,Unlink,Anchor,Flash,Smiley,SpecialChar,PageBreak,Iframe,About,ShowBlocks,Maximize',
      // filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
      // filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadMethod: 'form',
      filebrowserUploadUrl: 'https://api.claimguru.cilalabs.dev/v1/files',
      uploadUrl: 'https://api.claimguru.cilalabs.dev/v1/files',
      imageUploadUrl: 'https://api.claimguru.cilalabs.dev/v1/files',
      filebrowserUploadMethod: 'xhr',
      fileTools_requestHeaders: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjNGQwMGJjM2NiZWE4YjU0NTMzMWQxZjFjOTZmZDRlNjdjNTFlODkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS3VsZGVlcCBTaW5naCBQYWwiLCJvcmdhbml6YXRpb25JRCI6IjYwNjY3OTk4NmY2MTJlODkzNjg0YTNlNSIsInJvbGVzIjpbIm93bmVyIl0sImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wcmUtcHJvZC0yODY4MDEiLCJhdWQiOiJwcmUtcHJvZC0yODY4MDEiLCJhdXRoX3RpbWUiOjE2MjM2NTA5MDMsInVzZXJfaWQiOiJkeGRKNGFSMjU5TlRwSVFraXF4ajZCNDZrcjUzIiwic3ViIjoiZHhkSjRhUjI1OU5UcElRa2lxeGo2QjQ2a3I1MyIsImlhdCI6MTYyMzk5NTk3NSwiZXhwIjoxNjIzOTk5NTc1LCJlbWFpbCI6Imt1bGRlZXBAY2lsYWxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsia3VsZGVlcEBjaWxhbGFicy5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.eabl9yO5LXi_5V2ut2ep0o1ULobXCtQxJYDZsYMbh7xX5g2LcoLiyEVSMG1DKOZHZUVYoGy027ZhVJOMH85r07K742pwAa8sgtbxJv_iwcClrecyyUZonS6Ceo-qe5fmN2atJv05Rzr5WcNVq7aYXH-gYP4v6NnRpvq0x_9EB8pxBlKQqZtRP5eBCZOxWzDqnRmGGJ6yCACwltfTNp-Q42ePhvSlmST98Z0Sp_hIqZn-yvzGXHv_BO_Y_UdoqrbFcuaI2PTKEKOypZbbLiHN6nSwmy4gv7bL-sgyBh0WUD_B-eMxYc1LhvJ6LbA7PSudzgjFinHhCclADgQfDKEPQg'
      },

      // // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
      // // Reduce the list of block elements listed in the Format drop-down to the most commonly used.
      // format_tags: 'p;h1;h2;h3;pre',
      // // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
      removeDialogTabs: 'image:advanced;link:advanced'
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

  mounted() {}
};
</script>
