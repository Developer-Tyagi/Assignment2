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
        <q-card class="   col-11  q-ml-xl full-height  " flat bordered>
          <div id="q-app">
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
                    <div name=" bg-yellow setConfiguration" class="">
                      <div
                        label="Set Configuration "
                        class="bg-blue full-width"
                        scroll
                      >
                        Set Configuration
                        <q-menu
                          max-height="290px"
                          class="bg-blue"
                          style="overflow:auto;"
                        >
                          <div class=" " style="width:240px;"></div>
                          <div class="">kk</div>
                          <div class="">kk</div>
                          <div class="">kk</div>
                          <div class="">kk</div>
                          <div class="">kk</div>
                          <div class="">kk</div>
                          <div class="bg-red">kk</div>
                          <div class="bg-red">kk</div>
                        </q-menu>
                      </div>
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
                        <div
                          class="row q-mt-xs      justify-between full-width"
                        >
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

              <div class=" row    full-width q-pa-xl ">
                <div class="col-3 "></div>
                <div class="col-7 justify-center q-ml-xl  "></div>
              </div>
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
      len: 1,
      toggle: false,
      // this is for static dropdown
      options: ['Manager', 'Staff'],
      isShowRemoveButton: false,
      tab: 'setConfiguration',
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
    }
  }
};
</script>
<style lang="scss"></style>
