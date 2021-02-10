<template>
  <q-page class="window-height bg-background full-width   ">
    <br />
    <!-- This Style is needed for inner div-->
    <div class="  q-pa-xs" style="height:60%;width:95%;">
      <div class=" full-width">
        <div class=" my-font text-bold row q-my-lg q-mx-xl">
          Setup Company Account
        </div>
      </div>
      <div class=" row   full-width " flat bordered>
        <q-separator vertical />
        <q-card class="  col-11  q-ml-xl   " flat bordered>
          <div id="q-app">
            <div>
              <q-splitter v-model="splitterModel" style="height: 405px">
                <template v-slot:before>
                  <q-tabs v-model="tab" vertical class="">
                    <q-tab name="adduser" label="Add-User"></q-tab>
                    <q-tab name="offcInfo" label="Offc Staff Info"></q-tab>
                    <q-tab name="sales" label="Sales Representative"></q-tab>
                    <q-tab
                      name="setConfiguration"
                      label="Set Configuration"
                    ></q-tab>
                  </q-tabs>
                </template>

                <template v-slot:after>
                  <q-tab-panels
                    v-model="tab"
                    animated
                    swipeable
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel name="adduser">
                      <div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl">First Name *</div>
                        <div class="col-4  q-mx-lg">Last Name *</div>
                      </div>
                      <div class="row q-mt-xs      justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="onboard.adduser.fname"
                            type="password"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                          />
                        </div>
                        <div class="col-6  ">
                          <q-input
                            v-model="onboard.adduser.lname"
                            type="password"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                          />
                        </div>
                      </div>
                      <div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl">Email*</div>
                        <div class="col-4  q-mx-lg">Role *</div>
                      </div>
                      <div class="row q-mt-xs      justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="onboard.adduser.email"
                            type="password"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                          />
                        </div>
                        <div class="col-6  ">
                          <q-select
                            v-model="onboard.adduser.role"
                            filled
                            class="q-mx-xl"
                            :options="options"
                            label="role"
                          />
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="offcInfo"
                      ><div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl">First Name *</div>
                        <div class="col-4  q-mx-lg">Last Name *</div>
                      </div>
                      <div class="row q-mt-xs      justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="onboard.officesuer.fname"
                            type="password"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                          />
                        </div>
                        <div class="col-6  ">
                          <q-input
                            type="password"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                            v-model="onboard.officesuer.lname"
                          />
                        </div>
                      </div>
                      <div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl">Email*</div>
                        <div class="col-4  q-mx-lg">Role *</div>
                      </div>
                      <div class="row q-mt-xs      justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                            v-model="onboard.officesuer.email"
                          />
                        </div>
                        <div class="col-6  ">
                          <q-select
                            filled
                            v-model="onboard.officesuer.role"
                            :options="options"
                            label="Filled"
                          />
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="sales">
                      <div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl">First Name *</div>
                        <div class="col-4  q-mx-lg">Last Name *</div>
                      </div>
                      <div class="row q-mt-xs  justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="onboard.sales.fname"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                          />
                        </div>
                        <div class="col-6  ">
                          <q-input
                            v-model="onboard.sales.lname"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                          />
                        </div>
                      </div>
                      <div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl">Email*</div>
                        <div class="col-4  q-mx-lg">Role *</div>
                      </div>
                      <div class="row q-mt-xs      justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="onboard.sales.email"
                            class="q-mx-xl"
                            style="border: 1px solid #DDDDDD"
                            filled
                          />
                        </div>
                        <div class="col-6  ">
                          <q-select
                            filled
                            v-model="onboard.sales.role"
                            class="q-mx-xl"
                            :options="options"
                            label="Filled"
                          />
                        </div></div
                    ></q-tab-panel>
                  </q-tab-panels>
                  <div class="q-pt-xl">
                    <q-separator />
                    <div class="row justify-between full-width q-pa-xl ">
                      <q-btn
                        color="primary"
                        label="Back"
                        class="q-px-lg"
                        outline
                        type="reset"
                        @click="onClickBack"
                      />
                      <q-btn
                        color="primary"
                        label="Next"
                        class="q-px-lg"
                        @click="onClickNext"
                      />
                    </div>
                  </div>
                </template>
              </q-splitter>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'AddUser',
  data() {
    return {
      // this is for static dropdown
      options: ['Manager', 'Staff'],
      tab: 'adduser',
      splitterModel: 20,
      onboard: {
        adduser: {
          fname: '',
          lname: '',
          email: '',
          role: ''
        },
        officesuer: {
          fname: '',
          lname: '',
          email: '',
          role: ''
        },
        sales: {
          fname: '',
          lname: '',
          email: '',
          role: ''
        }
      }
    };
  },
  methods: {
    // on Clicking Next Button
    onClickNext() {
      if (this.tab == 'adduser') {
        this.tab = 'offcInfo';
      } else if (this.tab == 'offcInfo') {
        this.tab = 'sales';
      } else if (this.tab == 'sales') {
        this.tab = 'setConfiguration';
      }
    },
    // on clicking previous button
    onClickBack() {
      if (this.tab == 'adduser') {
        // this.tab = 'offcInfo';
      } else if (this.tab == 'offcInfo') {
        this.tab = 'adduser';
      } else if (this.tab == 'sales') {
        this.tab = 'offcInfo';
      } else if (this.tab == 'setConfiguration') {
        this.tab = 'sales';
      }
    }
  }
};
</script>
