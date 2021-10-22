<template>
  <div class="pdf-view-container">
    <vue-pdf-app :pdf="pdfSrc" />
  </div>
</template>
<script>
import VuePdfApp from 'vue-pdf-app';

import 'vue-pdf-app/dist/icons/main.css';

export default {
  name: 'PDFViewer',
  components: {
    VuePdfApp
  },
  props: ['pdfSrc']
};
</script>
<style lang="scss" scoped>
@media only screen and (min-width: $breakpoint-sm) {
  .pdf-view-container {
    height: 60vh;
    width: 100%;
  }
}
@media only screen and (max-width: $breakpoint-sm) {
  .pdf-view-container {
    width: 100%;
    height: 800px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
<style lang="scss">
@media only screen and (max-width: $breakpoint-sm) {
  .pdf-view-container .pdfViewer {
    .page {
      margin: 0 11px !important;
      border: none;
    }
  }
}
</style>
