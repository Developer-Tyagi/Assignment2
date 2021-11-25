<template>
  <q-page class="window-height bg-background full-width">
    <br />
    <div class="q-mx-xl q-mt-xs" style="height: 60%; width: 90%">
      <div class="full-width">
        <div class="my-font text-bold q-mx-xl">My Profile</div>
      </div>
      <div class="row full-width full-height">
        <div class="col-4 q-mx-xl col-4">
          <div class="q-mx-xs q-mt-lg my-font text-bold column full-width">
            My details
          </div>
          <q-card class="row full-height" flat bordered>
            <div class="col-9 full-height">
              <div class="q-pt-lg q-pl-lg text-bold" style>
                {{ detail.name }}
              </div>
              <div class="q-pl-lg">{{ detail.bussiness }}</div>

              <div class="q-pl-lg">{{ detail.phone }}</div>

              <div class="q-pl-lg">{{ detail.email }}</div>

              <div class="q-pl-lg">{{ detail.name }}</div>
              <div class="q-pl-lg q-pt-xl text-bold">Address</div>
              <div class="q-pl-lg">
                {{ detail.address.buildingNo }}
              </div>
              <div class="q-pl-lg">{{ detail.address.colony }}</div>
              <div class="q-pl-lg">{{ detail.address.country }}</div>
            </div>
            <div class="col-1 q-mt-lg q-ml-xs">
              <q-icon class="q-ml-lg" size="sm" color="primary" name="create" />
            </div>
          </q-card>
        </div>
        <div class="column q-mx-xs q-mt-lg col-6">
          <div class="row my-font full-width">
            <div class="text-bold col-7">Yours saved Cards</div>
            <div class="text-bold">Expires</div>
          </div>
          <q-card class="row q-pa-xs full-width" flat bordered>
            <q-list class="full-width">
              <q-expansion-item class="bg-background full-width">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-img
                      src="~assets/visa_logo.svg"
                      style="height: 24px; width: 24px"
                    />
                  </q-item-section>

                  <q-item-section>
                    <div class="q-ml-xs col-6">ICICI Bank credit</div>
                  </q-item-section>
                  <q-item-section>
                    <div>12/22</div>
                  </q-item-section>
                </template>
                <q-separator />
                <div class="row full-width">
                  <div class="row col-10">
                    <div class="col-6">
                      <p class="text-subtitle2 q-pl-lg q-pt-xs text-bold">
                        Billing Address
                      </p>
                      <br />

                      <p class="text-subtitle2 q-pl-lg text-bold">
                        {{ detail.name }}
                      </p>
                      <p class="q-pl-lg">
                        {{ detail.address.buildingNo }}
                      </p>
                      <p class="q-pl-lg">
                        {{ detail.address.colony }}
                      </p>
                      <p class="q-pl-lg">
                        {{ detail.address.country }}
                      </p>
                    </div>
                    <div class="col-6">
                      <p class="q-pl-xl text-bold q-pt-xs">Name on Card</p>
                      <br />
                      <p class="text-bold q-pl-xl">
                        {{ detail.name }}
                      </p>
                    </div>
                  </div>
                  <div class="q-ma-xs">
                    <q-icon size="sm" color="primary" name="create" />
                    <q-icon
                      class="q-ml-xs"
                      size="sm"
                      color="primary"
                      name="delete"
                    />
                  </div>
                </div>
              </q-expansion-item>
            </q-list>
          </q-card>
          <div class="q-pa-xs text-primary">+ Add Card</div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Profile',
  data() {
    return {
      detail: {
        name: 'John Smith',
        bussiness: 'Bussiness Name 01',
        phone: '+17288-876655',
        email: 'john@gmail.com',
        address: {
          buildingNo: 'po box N-28',
          colony: 'Civil lines',
          country: 'India'
        }
      }
    };
  }
};
</script>
