<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          class="clickable"
          @click="$router.push('/dashboard')"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
        <img
          src="~assets/bell.svg"
          alt="back-arrow"
          class="clickable"
          @click="$router.push('/dashboard')"
        />
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
      <div class="row">
        <q-card dark class="my-card col">
          <div class="value">6</div>
          <div class="text">New Leads</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.my-card {
  background-color: #1b2854;
  .value {
    font-size: 32px;
  }
  .text {
    font-size: 14px;
  }
}
</style>