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
      directoryId: '1HD84t8eOK25ZJGtPfMJOk4rjwM9zrv8t'
    };
  }
};
</script>
