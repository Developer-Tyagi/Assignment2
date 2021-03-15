<template>
  <q-layout>
    <q-page-container>
      <CustomHeader @backButton="$router.go(-1)" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import CustomHeader from 'components/CustomHeader';

export default {
  name: 'MobileLayout',
  components: { CustomHeader }
};
</script>
