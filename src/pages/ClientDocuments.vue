<template>
  <FileManager :directoryId="directoryId" />
</template>
<script>
import FileManager from 'components/FileManager';
export default {
  name: 'ClientDocument',

  components: { FileManager },

  data() {
    return {
      directoryId: ''
    };
  },

  created() {
    this.directoryId = this.$route.params.directoryId;
  }
};
</script>
