<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/dashboard')"
      :showAddButton="false"
    />
  </q-page>
</template>

<script>
import CustomHeader from "components/CustomHeader";
export default {
  name: "AddClient",
  components: { CustomHeader }
};
</script>
<style lang="sass"></style>
