<template>
  <div class="flex-row full-width">
    <footer v-if="isMobileResolution" class="full-width q-mb-md">
      <q-separator class="q-mb-md error-separator" />
      <span class="footer-position fontWeight400">
        © ClaimGuru
        <span>
          {{ currentYear() }}
        </span>
      </span>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Footer',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isMobileResolution'])
  },
  methods: {
    currentYear() {
      let year = new Date().getFullYear();
      return year;
    }
  }
};
</script>
<style lang="scss" scoped>
.error-separator {
  color: #d0d5dd;
}
.footer-position {
  padding-left: 32px;
  color: #667085;
  float: left;
  letter-spacing: 0.15px;
}
</style>
