<template>
  <q-card class="bg-grey-4 " style="width:100%; height: 245px">
    <div>
      <div class="q-mx-md q-mt-sm">
        <div @click="$router.push('/add-lead')">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_LEADS.svg" />
            </q-icon>
            <div
              class="text-weight-bolder text-subtitle1 text-icons-style q-my-sm q-pl-lg"
            >
              Add Leads
            </div>
            <q-space />
            <q-icon
              class="q-my-sm q-mr-md text-icons-style"
              size="sm"
              name="more_vert"
            />
          </div>
        </div>
        <div class="q-pt-sm" @click="$router.push('/add-client')">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_CLIENTS.svg" />
            </q-icon>
            <div
              class="text-weight-bolder text-subtitle1 text-icons-style q-my-sm q-pl-lg"
            >
              Add Clients
            </div>
            <q-space />
            <q-icon
              class="q-my-sm q-mr-md text-icons-style"
              size="sm"
              name="more_vert"
            />
          </div>
        </div>
        <div class="q-pt-sm" @click="$router.push('/mortgages/' + true)">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_mortgage.svg" />
            </q-icon>
            <div
              class="text-weight-bolder text-subtitle1 text-icons-style q-my-sm q-pl-lg"
            >
              Add Mortgages
            </div>
            <q-space />
            <q-icon
              class="q-my-sm q-mr-md text-icons-style"
              size="sm"
              name="more_vert"
            />
          </div>
        </div>
        <div class="q-pt-sm" @click="$router.push('/carriers/' + true)">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_carriers.svg" />
            </q-icon>
            <div
              class="text-weight-bolder text-subtitle1 text-icons-style q-my-sm q-pl-lg"
            >
              Add Carriers
            </div>
            <q-space />
            <q-icon
              class="q-my-sm q-mr-md text-icons-style"
              size="sm"
              name="more_vert"
            />
          </div>
        </div>
        <div class="q-pt-sm" @click="$router.push('/add-client')">
          <div class="row bg-white" style="border-radius: 10px; height: 40px">
            <q-icon size="sm" class="q-ml-md q-my-sm">
              <img src="~assets/add_claims.svg" />
            </q-icon>
            <div
              class="text-weight-bolder text-subtitle1 text-icons-style q-my-sm q-pl-lg"
            >
              Add Claims
            </div>
            <q-space />
            <q-icon
              class="q-my-sm q-mr-md text-icons-style"
              size="sm"
              name="more_vert"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script>
export default {
  name: 'AddOptions'
};
</script>
