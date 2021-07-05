<template>
  <FileManager :directoryId="directoryId" />
</template>
<script>
import FileManager from 'components/FileManager';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ClientDocument',

  components: { FileManager },

  data() {
    return {
      directoryId: ''
    };
  },
  computed: {
    ...mapGetters(['editSelectedClient'])
  },
  methods: {
    ...mapActions(['getSingleClientDetails'])
  },
  created() {
    this.directoryId = this.editSelectedClient.attributes.directoryID;
  }
};
</script>
