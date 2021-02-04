<template>
  <q-layout>
    <div class="row">
      <div
        style="width: 5%; background-color: #1b2854"
        class="items-center q-py-lg q-px-md"
      >
        <q-icon name="menu" color="white" size="lg"></q-icon>
      </div>
      <div style="width: 95%">
        <div class="row justify-between items-center q-pa-lg">
          <div class="bg-transparent col-1 q-ml-xl">
            <q-img src="~assets/insideLogo.png" />
          </div>
          <div class="q-mr-xl">
            <q-img
              src="~assets/LogIn-Logout Icon.svg"
              style="height: 24px; width: 24px"
            />
          </div>
        </div>
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'AdminLayout'
};
</script>
