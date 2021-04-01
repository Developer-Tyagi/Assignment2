<template>
  <FileManager :claimId="claimId" />
</template>
<script>
import FileManager from 'components/FileManager';
export default {
  name: 'ClientDocument',

  components: { FileManager },

  data() {
    return {
      claimId: '1HD84t8eOK25ZJGtPfMJOk4rjwM9zrv8t'
    };
  }
};
</script>
