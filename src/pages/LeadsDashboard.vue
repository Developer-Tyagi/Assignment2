<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
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
      <div class="row q-pa-sm">
        <q-card dark class="my-card" @click="$router.push('/leads')">
          <div class="value">0</div>
          <div class="text">New Leads</div>
        </q-card>
        <q-card dark class="my-card">
          <div class="value">6</div>
          <div class="text">Converted Leads</div>
        </q-card>
        <q-card dark class="my-card">
          <div class="value">2</div>
          <div class="text">Dead Leads</div>
        </q-card>
      </div>
      <div class="q-pa-sm">
        <q-card>
          <!-- <bar-chart></bar-chart> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.my-card {
  display: flex;
  flex-direction: column;
  background-color: #1b2854;
  width: calc(33.33% - 10px);
  height: 150px;
  padding: 25px 20px;
  margin: 5px;
  .value {
    font-size: 32px;
    text-align: center;
  }
  .text {
    font-size: 14px;
    text-align: center;
    line-height: 18px;
  }
}
</style>

<script>
export default {};
</script>