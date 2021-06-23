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
    ...mapGetters(['editSelectedClient', 'selectedClientId'])
  },
  methods: {
    ...mapActions(['getSingleClientDetails'])
  },
  created() {
    // this.directoryId = this.$route.params.directoryId;
    this.getSingleClientDetails(this.selectedClientId);
    this.directoryId = this.editSelectedClient.attributes.directoryID;
  }
};
</script>
