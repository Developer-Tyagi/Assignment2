<template>
  <div>
    <FileManager
      :directoryId="claim.rootDirectoryID"
      v-if="claim.rootDirectoryID"
      :generateClaimDocument="true"
    />
    <div v-else class="text-center">
      <span>No directory found</span>
    </div>
  </div>
</template>

<script>
import FileManager from 'components/FileManager';
import { mapActions, mapGetters } from 'vuex';
import request from '@api';
export default {
  name: 'ClaimFiles',
  components: { FileManager },
  data() {
    return {};
  },
  async created() {
    await this.getSingleClaims(this.selectedClaimId);
  },

  computed: {
    ...mapGetters(['claim', 'selectedClaimId'])
  },

  methods: {
    ...mapActions(['getSingleClaims', 'getTemplates'])
  }
};
</script>
