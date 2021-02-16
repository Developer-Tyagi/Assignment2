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
      <!-- Height given for there Inner 2 div -->
      <div class=" row   full-width " style="height:107%;" flat bordered>
        <q-separator vertical />
        <q-card class=" bg-red  col-11  q-ml-xl full-height  " flat bordered>
          <div>
            <q-splitter
              v-model="splitterModel"
              style="height: 478px"
              flat
              bordered
            >
              <template v-slot:before>
                <q-tabs v-model="tab" vertical class="">
                  <q-tab name="adduser" label="Add User" disable></q-tab>
                  <q-tab
                    id="offcInfo"
                    label="Office Staff Info"
                    disable
                  ></q-tab>
                  <q-tab
                    name="sales"
                    label="Sales Representatives"
                    disable
                  ></q-tab>
                  <q-tab
                    name="setConfiguration"
                    label="Set Configuration"
                    disable
                  ></q-tab>

                  <div class="bg-blue" style="overflow:auto;max-height:300px">
                    <div
                      name="sssss"
                      class="q-py-md text-center"
                      @click="UserA('inspectionType')"
                    >
                      InspectionType
                    </div>
                    <div class="q-py-md text-center" @click="Dialog2 = true">
                      Industry Type
                    </div>
                    <div class="q-py-md text-center">honorific</div>
                    <div class="q-py-md text-center">Phone Type</div>
                    <div class="q-py-md text-center">Clients Type</div>
                    <div class="q-py-md text-center">kk</div>
                    <div class="q-py-md text-center">honorific</div>
                    <div class="q-py-md text-center">Phone Type</div>
                    <div class="q-py-md text-center">Clients Type</div>
                    <div class="q-py-md text-center">kk</div>
                  </div>
                </q-tabs>
              </template>
              <!-- Main Template -->
              <template v-slot:after>
                <q-tab-panels
                  style="height:400px"
                  v-model="tab"
                  animated
                  swipeable
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel name="adduser">
                    <q-form ref="addUserForm">
                      <div
                        outlined
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0"
                      >
                        <div class=" q-mt-xs   row  full-width">
                          <div class="col-5  text-bold">
                            Add User &nbsp;{{ index + 1 }}
                          </div>
                        </div>
                        <div class=" q-mt-xs row  full-width">
                          <div class="col-5  q-mx-xl q-mt-lg">
                            First Name *
                          </div>
                          <div class="col-4  q-mx-lg q-mt-lg">
                            Last Name *
                          </div>
                        </div>
                        <div class="row q-mt-xs   justify-between full-width">
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.fname"
                              class="q-mx-xl"
                              style="width :300px ;"
                              outlined
                            />
                          </div>
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].contact.lname"
                              class="q-mx-xl"
                              style="width :300px ;"
                              outlined
                            />
                          </div>
                        </div>
                        <div class="q-mt-xs row  full-width">
                          <div class="col-5  q-mx-xl q-mt-lg">Email*</div>
                          <div class="col-4  q-mx-lg q-mt-lg">Role *</div>
                        </div>
                        <div
                          class="row q-mt-xs      justify-between full-width"
                        >
                          <div class="col-6  ">
                            <q-input
                              v-model="users[index].email"
                              class="q-mx-xl"
                              style="width :300px ;"
                              outlined
                              :rules="[
                                val =>
                                  (val && val.length > 0) ||
                                  'Please choose the Title'
                              ]"
                            />
                          </div>
                          <div class="col-6  ">
                            <q-select
                              v-model="users[index].roles[0]"
                              outlined
                              style="width :300px ;"
                              class="q-mx-xl"
                              :options="options"
                              label="role"
                              :rules="[
                                val =>
                                  (val && val.length > 0) ||
                                  'Please choose the Title'
                              ]"
                            />
                          </div>
                        </div>
                      </div>
                    </q-form>

                    <div class="row q-mt-lg">
                      <q-btn
                        outline
                        class="  q-mx-xl"
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
                      outlined
                      v-for="(contactInfo, index) in users"
                      v-if="index >= 0"
                    >
                      <div class=" q-mt-xs   row  full-width">
                        <div class="col-5  text-bold">
                          Office Staff Info &nbsp;{{ index + 1 }}
                        </div>
                      </div>
                      <div class=" q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl q-mt-lg">First Name *</div>
                        <div class="col-4  q-mx-lg q-mt-lg">Last Name *</div>
                      </div>
                      <div class="row q-mt-xs   justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="users[index].contact.fname"
                            class="q-mx-xl"
                            style="width :300px ;"
                            outlined
                          />
                        </div>
                        <div class="col-6  ">
                          <q-input
                            v-model="users[index].contact.lname"
                            class="q-mx-xl"
                            style="width :300px ;"
                            outlined
                          />
                        </div>
                      </div>
                      <div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl q-mt-lg">Email*</div>
                        <div class="col-4  q-mx-lg q-mt-lg">Role *</div>
                      </div>
                      <div class="row q-mt-xs      justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="users[index].email"
                            class="q-mx-xl"
                            style="width :300px ;"
                            outlined
                            :rules="[
                              val =>
                                (val && val.length > 0) ||
                                'Please choose the Title'
                            ]"
                          />
                        </div>
                        <div class="col-6  ">
                          <q-select
                            v-model="users[index].roles[0]"
                            outlined
                            style="width :300px ;"
                            class="q-mx-xl"
                            :options="options"
                            :rules="[
                              val =>
                                (val && val.length > 0) ||
                                'Please choose the Title'
                            ]"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row q-mt-lg">
                      <q-btn
                        outline
                        class="  q-mx-xl"
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
                    <div class=" row ">
                      <p class=" q-my-auto">
                        <label>
                          Does Company Have Sales Representative
                        </label>
                      </p>
                      <q-toggle class="q-ml-xs" v-model="toggle" />
                    </div>
                    <div
                      outlined
                      v-for="(contactInfo, index) in users"
                      v-if="index >= 0"
                    >
                      <div class=" q-mt-xs   row  full-width">
                        <div class="col-5  text-bold">
                          Sale Representative &nbsp;{{ index + 1 }}
                        </div>
                      </div>
                      <div class=" q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl q-mt-lg">First Name *</div>
                        <div class="col-4  q-mx-lg q-mt-lg">Last Name *</div>
                      </div>
                      <div class="row q-mt-xs   justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="users[index].contact.fname"
                            class="q-mx-xl"
                            style="width :300px ;"
                            outlined
                            :disable="toggle == false"
                          />
                        </div>
                        <div class="col-6  ">
                          <q-input
                            v-model="users[index].contact.lname"
                            class="q-mx-xl"
                            style="width :300px ;"
                            outlined
                            :disable="toggle == false"
                          />
                        </div>
                      </div>
                      <div class="q-mt-xs row  full-width">
                        <div class="col-5  q-mx-xl q-mt-lg">Email*</div>
                        <div class="col-4  q-mx-lg q-mt-lg">Role *</div>
                      </div>
                      <div class="row q-mt-xs      justify-between full-width">
                        <div class="col-6  ">
                          <q-input
                            v-model="users[index].email"
                            class="q-mx-xl"
                            style="width :300px ;"
                            outlined
                            :disable="toggle == false"
                            :rules="[
                              val =>
                                (val && val.length > 0) ||
                                'Please choose the Title'
                            ]"
                          />
                        </div>
                        <div class="col-6  ">
                          <q-select
                            v-model="users[index].roles[0]"
                            outlined
                            style="width :300px ;"
                            class="q-mx-xl"
                            :options="options"
                            label="role"
                            :disable="toggle == false"
                            :rules="[
                              val =>
                                (val && val.length > 0) ||
                                'Please choose the Title'
                            ]"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row q-mt-lg">
                      <q-btn
                        outline
                        class="  q-mx-xl"
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
                  <q-tab-panel name="setConfiguration"> abcg</q-tab-panel>
                  <!-- Inspection Type -->
                  <q-tab-panel name="inspectionType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class="bg-red col-2">Inspection Type</div>
                      <div
                        class="bg-green col-2 text-primary"
                        @click="bar = true"
                      >
                        Add Inspection Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>

                    <div v-if="!inspection.subtypes[0].type">ddddd</div>
                    <div v-else class="row justify-between">
                      <p>
                        {{ inspection.subtypes[0].type }}
                      </p>
                      <div>
                        <q-icon size="sm" color="primary" name="create" />
                        <q-icon
                          class="q-ml-xs"
                          size="sm"
                          color="primary"
                          name="delete"
                        />
                      </div>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="industryType"> Industry Type</q-tab-panel>
                </q-tab-panels>
                <div>
                  <q-separator />
                </div>
                <div class="q-mt-lg row justify-center">
                  <q-btn
                    color="primary"
                    label="submit and Proceed"
                    class="q-mx-lg "
                    @click="onClickNext"
                  />
                </div>
                <div class="q-mt-md ">
                  <q-separator />
                </div>
              </template>
            </q-splitter>
            <!-- This is First Dialog -->
            <q-dialog v-model="bar" persistent>
              <q-card style="width: 1000px;height:1000px; max-width: 1000vw;">
                <q-bar class=" row justify-between" style="height:100px">
                  <div class="col-4 q-px-xl text-bold ">
                    Add Inspection Type
                  </div>
                  <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip>Close</q-tooltip>
                  </q-btn>
                </q-bar>

                <q-card-section>
                  <div
                    class="column  bg-grey-3 q-pa-xl"
                    style="margin-left:150px;margin-right:150px;"
                  >
                    <div class="q-pa-lg">
                      <q-input
                        v-model="inspection.type"
                        label="Type Of Inspection"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 10) ||
                            'Please fill the phone number'
                        ]"
                      />

                      <q-input
                        v-model="inspection.subtypes[0].type"
                        label="Sub Type Of Inspection"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 10) ||
                            'Please fill the phone number'
                        ]"
                      />
                      <q-label>Default Duration (hr)</q-label>
                      <q-slider
                        class="q-mt-lg"
                        name="speed"
                        v-model="inspection.subtypes[0].duration"
                        label-always
                        :min="0"
                        :max="5"
                        :step="0.5"
                      />
                    </div>
                    <div class="text-primary q-pl-lg" style="">
                      + Another Sub Type Of Inspection
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!-- This is Industry Dialog Box -->
            <q-dialog v-model="Dialog2" persistent>
              <q-card style="width: 1000px;height:1000px; max-width: 1000vw;">
                <q-bar class=" row justify-between" style="height:100px">
                  <div class="col-4 q-px-xl text-bold ">
                    Add Industry Type
                  </div>
                  <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip>Close</q-tooltip>
                  </q-btn>
                </q-bar>

                <q-card-section>
                  <div
                    class="q-pa-xl"
                    style="margin-left:150px;margin-right:150px;"
                  >
                    <div class=" column bg-bue q-pa-lg">
                      <div class="q-mx-xl q-my-xs">Industry Type</div>
                      <div class="">
                        <q-input
                          class="q-mx-xl"
                          label=""
                          style="width :300px ;"
                          outlined
                        />
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>

            <div class=" row    full-width q-pa-xl ">
              <div class="col-3 "></div>
              <div class="col-7 justify-center q-ml-xl  "></div>
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
      bar: false,
      Dialog2: false,
      len: 1,
      toggle: false,
      // speed: 0,
      // this is for static dropdown
      options: ['Manager', 'Staff'],
      isShowRemoveButton: false,
      tab: '',
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
      inspection: {
        type: 'A',
        subtypes: [{ type: 'Industry ', duration: 1 }]
      },
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
      const success = this.$refs.addUserForm.validate();
      if (success) {
        const len = this.users.length;

        if (this.users[len - 1].contact.fname && this.users[len - 1].email) {
          this.len = len + 1;
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
          this.$q.notify({
            message: 'Please fill the first Name',
            position: 'top',
            type: 'negative'
          });
        }
      }
    },
    removeAnotherContact() {
      const len = this.users.length;
      // this.len = len - 1;
      if (len === 2) {
        this.isShowRemoveButton = false;
      }

      this.users.pop();
    },
    UserA(value) {
      console.log(1233456787);
      this.tab = value;
    }
    // End of Functions
  }
};
</script>
<style lang="scss"></style>
