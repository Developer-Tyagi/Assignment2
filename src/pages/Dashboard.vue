<template>
  <q-page class="q-px-md q-py-md">
    <q-card>
      <q-card-section class="row">
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">50</p>
          </div>
          <p class="text"><small>Open Claims</small></p>
        </div>
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">50</p>
          </div>
          <p class="text"><small>Claims with recent activity</small></p>
        </div>
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">150</p>
          </div>
          <p class="text"><small>Clients</small></p>
        </div>
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">4</p>
          </div>
          <p class="text"><small>Clients with Open Claims</small></p>
        </div>
      </q-card-section>
    </q-card>
    <div class="q-mt-sm">
      <div class="q-pa-sm">
        <span>New Claims/Clients & Leads</span>
        <span class="float-right">Last 7 days</span>
      </div>
      <q-card class="q-mt-sm">
        <q-card-section class="row q-py-sm q-px-none">
          <div class="col-6 q-pa-md border-right">
            <span><small>New Claims</small></span>
            <span class="text-bold float-right">10</span>
          </div>
          <div class="col-6 q-pa-md">
            <span><small>New Leads</small></span>
            <span class="text-bold float-right">0</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-mt-sm">
      <div class="q-pa-sm">
        <span>Claims Watch List</span>
        <span class="float-right">See all</span>
      </div>
      <q-card class="q-mt-sm">
        <q-card-section>
          <div class="row">
            <span>John Smith</span>
            <span class="q-ml-auto">Recent Activity</span>
          </div>
          <div class="row">
            <span> <small class="opacity-50"> File No. 12345678</small></span>
            <span class="q-ml-auto">
              <small class="opacity-50"> Date of Activity</small></span
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      dashboard: ''
    };
  },

  created() {
    console.log('hi');
    this.dashboard = localStorage.getItem('fmcToken');
  },

  methods: {}
};
</script>
<style>
.my-card {
  display: flex;
  background-color: #1b2854;
  height: 3rem;
  width: 3rem;
  margin: auto;
  border-radius: 3px;
}
.card-text {
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  margin: auto;
}

.text {
  text-align: center;
  margin: 5px auto 0 auto;
  line-height: 10px;
  max-width: 80%;
}
</style>
