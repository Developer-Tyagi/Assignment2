<template>
  <div class="ckeditor">
    <CKEditor
      v-model="editorData"
      :config="config"
      @ready="prefill()"
      editorUrl="https://cdn.ckeditor.com/4.14.0/full-all/ckeditor.js"
      @change="$emit('updateMarkup', val)"
    ></CKEditor>
  </div>
</template>

<script>
import CKEditor from 'ckeditor4-vue';

export default {
  name: 'Ckeditor',
  components: {
    CKEditor: CKEditor.component
  },
  props: ['markup'],
  data: () => ({
    editorData: '',
    config: {
      extraPlugins: 'filebrowser'
      // toolbar: [
      // {
      //   name: 'document',
      //   items: ['Source']
      // },
      //   {
      //     name: 'basicstyles',
      //     items: ['Bold', 'Italic', 'Underline', 'Strike']
      //   },
      //   {
      //     name: 'paragraph',
      //     items: [
      //       'JustifyLeft',
      //       'JustifyCenter',
      //       'JustifyRight',
      //       'JustifyBlock',
      //       '-',
      //       'NumberedList',
      //       'BulletedList',
      //       '-',
      //       'Outdent',
      //       'Indent'
      //     ]
      //   },
      //   {
      //     name: 'clipboard',
      //     items: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste']
      //   },
      //   { name: 'links', items: ['Link', 'Unlink'] },
      //   {
      //     name: 'insert',
      //     items: ['Image', 'Table']
      //   },
      //   '/',
      //   { name: 'colors', items: ['TextColor', 'BGColor'] },
      //   { name: 'styles', items: ['Format', 'Font', 'FontSize', 'Styles'] }
      // ]
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
  methods: {
    prefill() {
      this.editorData = this.markup;
    }
  }
};
</script>
