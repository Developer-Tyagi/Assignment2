<template>
  <q-page class="window-height bg-background full-width   ">
    <br />
    <!-- This Style is needed for inner div-->
    <div class=" q-pa-xs" style="height:60%;width:95%;">
      <div class=" full-width">
        <div class=" my-font text-bold row q-my-lg q-mx-xl">
          Users - Add New
        </div>
      </div>
      <q-card class=" row  full-width full-height" flat bordered>
        <q-card class=" col-6 q-mx-xl   full-height " flat bordered>
          <div class="q-mt-xs row  full-width">
            <div class="col-5  q-mx-xl">First Name *</div>
            <div class="col-4  q-mx-lg">Last Name *</div>
          </div>
          <div class="row q-mt-xs      justify-between full-width">
            <div class="col-6  ">
              <q-input
                type="password"
                class="q-mx-xl"
                style="border: 1px solid #dddddd"
                filled
                v-model="password"
              />
            </div>

            <div class="col-6  ">
              <q-input
                type="password"
                class="q-mx-xl"
                style="border: 1px solid #dddddd"
                filled
                v-model="password"
              />
            </div>
          </div>
          <div class="row q-mt-xs  full-width">
            <div class="col-5  q-mx-xl">Phone Number *</div>
            <div class="col-4  q-mx-lg">Email *</div>
          </div>
          <div class="row   justify-between full-width">
            <div class="col-6 ">
              <q-input
                type="password"
                class="q-mx-xl"
                style="border: 1px solid #dddddd"
                filled
                v-model="password"
              />
            </div>

            <div class="col-6  ">
              <q-input
                type="password"
                class="q-mx-xl"
                style="border: 1px solid #dddddd"
                filled
                v-model="password"
              />
            </div>
          </div>
          <div class="row q-my-xs  full-width">
            <div class="col-5  q-mx-xl">Available Roles *</div>
            <div class="col-4  q-mx-lg">Allotted Roles *</div>
          </div>
          <div class="row   justify-between full-width">
            <div class="col-6   " style="height:200px;">
              <q-card
                class="   q-mx-xl scroll"
                style="height:150px;"
                flat
                bordered
              >
                <q-pull-to-refresh @refresh="refresh">
                  <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="q-mb-sm q-ml-lg"
                  >
                    Client Adjuster
                  </div>
                </q-pull-to-refresh>
              </q-card>
              <div class="q-pl-xl row  full-width text-primary">
                +Add Another User
              </div>
            </div>

            <div class="col-6   ">
              <q-card
                class="q-mx-xl scroll q-pl-lg"
                style="height:150px;"
                flat
                bordered
              >
                Client Adjuster
              </q-card>
            </div>
          </div>
        </q-card>
        <q-separator vertical />
        <div class="  col-4  q-ml-xl   ">
          <!-- This is for right empt y division! there is no data shown in the wireframes -->
          <div class="full-width  full-height" borderless>
            <div class=" row">
              <q-card
                class="q-mx-xl q-mt-lg q-pl-lg"
                style="height:100px;width:300px;"
                flat
                bordered
              >
                You have Not Added any user yet
              </q-card>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'AddUser',
  data() {
    return {
      items: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      password: ''
    };
  }
};
</script>
