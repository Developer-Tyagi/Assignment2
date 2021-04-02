<template>
  <FileManager :directoryId="$route.params.rootDirectoryID" />
</template>

<script>
import FileManager from 'components/FileManager';
export default {
  name: 'claim-files',
  components: { FileManager },

  mounted() {}
};
</script>
