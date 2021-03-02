<template>
  <q-layout view="lhr lpR lfr">
    <div
      class="row justify-between items-center q-px-lg q-py-md"
      v-if="$route.name !== 'login'"
    >
      <q-img src="~assets/insideLogo.png" style="width: 142px; height: 45px" />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AuthLayout'
};
</script>
