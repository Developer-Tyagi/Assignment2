<template>
  <div>
    <FileManager
      :directoryId="claim.rootDirectoryID"
      v-if="claim.rootDirectoryID"
    />
    <div v-else class="text-center">
      <span>No directory found</span>
    </div>
  </div>
</template>

<script>
import FileManager from 'components/FileManager';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ClaimFiles',
  components: { FileManager },
  data() {
    return {};
  },
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
