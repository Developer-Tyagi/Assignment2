<template>
  <q-page>
    <div class="q-pa-lg">
      <div class="row">
        <q-card
          class="q-ma-md plan-card"
          bordered
          v-for="(plan, index) in plans"
          :class="index === 1 ? 'plan-card--selected' : 'plan-card'"
        >
          <q-card-section class="full-height column">
            <div class="text-h5 text-weight-medium q-mb-md q-mt-md">
              {{ plan.name }}
            </div>
            <div v-if="plan.price" class="q-mt-auto">
              <span class="text-h5 text-weight-medium">${{ plan.price }}</span
              >/mo
            </div>
            <div class="q-mt-auto row">
              <div v-if="plan.price">Starting Price</div>
              <div v-if="!plan.price" class="q-ml-auto">Ask for Quote</div>
              <div v-if="plan.price" class="q-ml-auto">
                <span :class="index == 1 ? 'text-bold' : ''">
                  {{ index == 1 ? 'Current Plan' : 'Buy Pack' }}
                </span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <h6 class="text-bold">Plan Details</h6>
      <div class="row justify-between" style="min-height: 150px">
        <q-card bordered class="col-9 row q-pa-md">
          <div class="col-3">
            <p>Subscription Start Date</p>
            <p class="text-bold text-h6">December 15, 2020</p>
            <p>Subscription End Date</p>
            <p class="text-bold text-h6">December 14, 2021</p>
          </div>
          <div class="col-3">
            <p>Licenses Available</p>
            <p class="text-bold text-h6">15</p>
            <p>Total Users</p>
            <p class="text-bold text-h6">5</p>
          </div>
        </q-card>
        <div class="column col-1 justify-between q-mx-auto">
          <q-btn color="orange" label="Upgrade" outline></q-btn>
          <q-btn color="orange" label="Renew" outline></q-btn>
          <q-btn color="orange" label="Manage" outline></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['plans'])
  }
};
</script>
<style lang="scss">
.plan-card {
  width: 28%;
  height: 160px;
  border: #eca74c;
}

.plan-card--selected {
  @extend .plan-card;
  background: #eca74c;
  color: white;
}
</style>
