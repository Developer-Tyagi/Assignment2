<template>
  <q-page> <ClaimFiles />{{ templates[0] }} </q-page>
</template>
<script>
import ClaimFiles from 'src/pages/ClaimFiles';
import { mapGetters } from 'vuex';
export default {
  components: {
    ClaimFiles
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(['templates'])
  }
};
</script>
<style lang="scss"></style>
