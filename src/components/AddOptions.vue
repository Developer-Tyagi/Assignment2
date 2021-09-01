<template>
  <q-card class="bg-grey-4 text-primary" style="width: 550px; height: 315px">
    <q-card-section>
      <div class="q-mx-md">
        <div class="q-pa-sm" @click="$router.push('/add-lead')">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_LEADS.svg" />
            </q-icon>
            <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
              Add Leads
            </p>
            <q-space />
            <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
          </div>
        </div>
        <div class="q-pa-sm" @click="$router.push('/add-client')">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_CLIENTS.svg" />
            </q-icon>
            <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
              Add Clients
            </p>
            <q-space />
            <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
          </div>
        </div>
        <div class="q-pa-sm" @click="$router.push('/mortgages/' + true)">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_mortgage.svg" />
            </q-icon>
            <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
              Add Mortgages
            </p>
            <q-space />
            <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
          </div>
        </div>
        <div class="q-pa-sm" @click="$router.push('/carriers/' + true)">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_carriers.svg" />
            </q-icon>
            <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
              Add Carriers
            </p>
            <q-space />
            <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
          </div>
        </div>
        <div class="q-pa-sm" @click="$router.push('/add-client')">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_claims.svg" />
            </q-icon>
            <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
              Add Claims
            </p>
            <q-space />
            <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'AddOptions'
};
</script>
