<template>
  <FileManager
    :directoryId="claim.rootDirectoryID"
    v-if="claim.rootDirectoryID"
  />
  <div v-else class="fixed-heading">
    <span>No directory found</span>
  </div>
</template>

<script>
import FileManager from 'components/FileManager';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'claim-files',
  components: { FileManager },

  async created() {
    await this.getSingleClaims(this.$route.params.claimId);
  },

  computed: {
    ...mapGetters(['claim'])
  },

  methods: {
    ...mapActions(['getSingleClaims'])
  }
};
</script>
