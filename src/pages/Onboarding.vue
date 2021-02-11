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
                      <div
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0"
                      >
                        <div class=" q-mt-xs row  full-width">
                          <div class="col-5  q-mx-xl">First Name *</div>
                          <div class="col-4  q-mx-lg">Last Name *</div>
                        </div>
                        <div class="row q-mt-xs   justify-between full-width">
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.fname"
                              class="q-mx-xl"
                              style="border: 1px solid #DDDDDD"
                              filled
                            />
                          </div>
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.lname"
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
                        <div
                          class="row q-mt-xs      justify-between full-width"
                        >
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].email"
                              class="q-mx-xl"
                              style="border: 1px solid #DDDDDD"
                              filled
                            />
                          </div>
                          <div class="col-6  ">
                            <q-select
                              v-model="users[index].roles[0]"
                              filled
                              class="q-mx-xl"
                              :options="options"
                              label="role"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <q-btn
                          outline
                          class="q-mt-lg q-mx-xl"
                          @click="addAnotherContact"
                          color="primary"
                          label="Add"
                          style="margin-right: auto"
                        />
                        <q-btn
                          outline
                          @click="removeAnotherContact"
                          class="q-mt-sm q-mx-xl"
                          color="primary"
                          label="Remove"
                          v-if="isShowRemoveButton"
                        />
                      </div>
                    </q-tab-panel>
                    <q-tab-panel name="offcInfo">
                      <div
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0"
                      >
                        <div class="q-mt-xs row  full-width">
                          <div class="col-5  q-mx-xl">First Name *</div>
                          <div class="col-4  q-mx-lg">Last Name *</div>
                        </div>
                        <div
                          class="row q-mt-xs      justify-between full-width"
                        >
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.fname"
                              class="q-mx-xl"
                              style="border: 1px solid #DDDDDD"
                              filled
                            />
                          </div>
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.lname"
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
                        <div
                          class="row q-mt-xs      justify-between full-width"
                        >
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].email"
                              class="q-mx-xl"
                              style="border: 1px solid #DDDDDD"
                              filled
                            />
                          </div>
                          <div class="col-6  ">
                            <q-select
                              v-model="users[index].roles[0]"
                              filled
                              class="q-mx-xl"
                              :options="options"
                              label="role"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <q-btn
                          outline
                          class="q-mt-sm q-mx-xl"
                          @click="addAnotherContact"
                          color="primary"
                          label="Add"
                          style="margin-right: auto"
                        />
                        <q-btn
                          outline
                          @click="removeAnotherContact"
                          class="q-mt-sm q-mx-xl"
                          color="primary"
                          label="Remove"
                          v-if="isShowRemoveButton"
                        />
                      </div>
                    </q-tab-panel>
                    <q-tab-panel name="sales">
                      <div
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0"
                      >
                        <div class="q-mt-xs row  full-width">
                          <div class="col-5  q-mx-xl">First Name *</div>
                          <div class="col-4  q-mx-lg">Last Name *</div>
                        </div>
                        <div
                          class="row q-mt-xs      justify-between full-width"
                        >
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.fname"
                              class="q-mx-xl"
                              style="border: 1px solid #DDDDDD"
                              filled
                            />
                          </div>
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.lname"
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
                        <div
                          class="row q-mt-xs      justify-between full-width"
                        >
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].email"
                              class="q-mx-xl"
                              style="border: 1px solid #DDDDDD"
                              filled
                            />
                          </div>
                          <div class="col-6  ">
                            <q-select
                              v-model="users[index].roles[0]"
                              filled
                              class="q-mx-xl"
                              :options="options"
                              label="role"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <q-btn
                          outline
                          class="q-mt-sm q-mx-xl"
                          @click="addAnotherContact"
                          color="primary"
                          label="Add"
                          style="margin-right: auto"
                        />
                        <q-btn
                          outline
                          @click="removeAnotherContact"
                          class="q-mt-sm q-mx-xl"
                          color="primary"
                          label="Remove"
                          v-if="isShowRemoveButton"
                        />
                      </div>
                    </q-tab-panel>
                    <!-- This is for 4th panel for future use -->
                    <!-- <q-tab-panel name="sales">
                      <div class="q-mx-xl row">
                        <p class=" q-my-auto">
                          <label>
                            Does Company Have Sales Representative
                          </label>
                        </p>
                        <q-toggle class="q-ml-xs" v-model="toggle" />
                      </div>
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
                    ></q-tab-panel> -->
                  </q-tab-panels>
                  <div class="q-pt-lg">
                    <q-separator />
                    <div class="row justify-center full-width q-pa-xl ">
                      <q-btn
                        color="primary"
                        label="submit and Proceed"
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
import { mapActions } from 'vuex';
export default {
  name: 'AddUser',
  data() {
    return {
      toggle: false,
      // this is for static dropdown
      options: ['Manager', 'Staff'],
      isShowRemoveButton: false,
      tab: 'adduser',
      splitterModel: 20,
      users: [
        {
          type: 'user',
          contact: {
            fname: '',
            lname: ''
          },
          email: '',
          roles: []
        }
      ],
      onboard: {
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
    ...mapActions(['addUser']),
    // on Clicking Next Button
    onClickNext() {
      this.users.forEach(user => {
        this.addUser(user);
      });
      this.users = [
        {
          type: 'user',
          contact: {
            fname: '',
            lname: ''
          },
          email: '',
          roles: []
        }
      ];
      if (this.tab == 'adduser') {
        this.isShowRemoveButton = false;
        this.tab = 'offcInfo';
      } else if (this.tab == 'offcInfo') {
        this.tab = 'sales';
      } else if (this.tab == 'sales') {
        this.tab = 'setConfiguration';
      }
    },

    addAnotherContact() {
      const len = this.users.length;
      console.log(this.users, len);
      if (this.users[len - 1].contact.fname) {
        this.users.push({
          type: 'user',
          contact: {
            fname: '',
            lname: ''
          },
          email: '',
          roles: []
        });
        this.isShowRemoveButton = true;
      } else {
        console.log('no');
        this.$q.notify({
          message: 'Please fill the first Name',
          position: 'top',
          type: 'negative'
        });
      }
    },
    removeAnotherContact() {
      const len = this.users.length;
      if (len === 2) {
        this.isShowRemoveButton = false;
      }

      this.users.pop();
    }
  }
};
</script>
