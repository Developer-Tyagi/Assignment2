<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/clients')"
      :showAddButton="false"
    />
  </q-page>
</template>
<script>
import CustomHeader from 'components/CustomHeader';
export default {
  data() {
    return {};
  },

  components: {
    CustomHeader
  },
  mounted() {},

  methods: {}
};
</script>
<style></style>
