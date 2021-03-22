<template>
  <q-page>
    <div class="row height-without-header ">
      <SubSideBar
        class="col-2"
        :list="adminSettings"
        @onListClick="setSelectedTab"
        :selectedItem="tab"
      />
      <div class="col-10">
        <div class="q-pa-xs col-9">
          <!-- Height given for there Inner 2 div -->
          <div class=" row full-width" style="height: 100%" flat bordered>
            <!-- Main Template -->
            <template class="">
              <q-tab-panels
                class="q-ml-xl full-width  "
                style="height : calc(100vh - 10px);"
                v-model="tab"
                animated
                vertical
                swipeable
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="accountSummary">
                  <q-card class="q-pa-lg " style="height: 800px;" flat bordered>
                    <div class=" text-h5">Account Summary</div>
                    <div class=" row q-mt-lg text-bold">
                      <div class=" col">Company Name</div>
                      <div class=" col">Company Address</div>
                      <div class=" col">Company Mobile</div>
                      <div class=" col">Postal Company Code</div>
                    </div>
                    <q-separator />
                    <div class=" row q-mt-xs">
                      <div class=" col">{{ user.name }}</div>
                      <div class=" col">Company Address</div>
                      <div class=" col ">
                        {{
                          user.phoneNumber.number
                            ? user.phoneNumber.number
                            : '-'
                        }}
                      </div>
                      <div class=" col">Company Mobile</div>
                    </div>

                    <div class=" row q-mt-xl text-bold">
                      <div class=" col">Company Administrator</div>
                      <div class=" col">Administrator Email</div>
                    </div>
                    <q-separator />
                    <div class=" row q-mt-xs">
                      <div class=" col">
                        {{ user.contact.fname }} {{ user.contact.lname }}
                      </div>
                      <div class=" col">{{ user.email }}</div>
                    </div>
                  </q-card>
                </q-tab-panel>
                <q-tab-panel name="actionItems">
                  <q-card class="q-pa-lg " style="" flat bordered>
                    <div class=" full-width">
                      <div class=" text-h5 text-bold">Claim Action Item</div>
                      <div class="text-h5 " style="height:200px;">
                        <div class=" q-pa-xl"></div>
                        <div class=" row q-pa-xl">
                          <q-btn
                            color="primary"
                            label="+ Add Default Action "
                            class=" col-2"
                            @click="addDefaultActionDialogBox = true"
                          />
                          <q-btn
                            color="primary"
                            label="Refresh "
                            class="q-mx-lg col-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Clone Workflow "
                            class="col-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Delete Workflow "
                            class="q-mx-lg col-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Planning Sheet "
                            class="q-mx-lg col-2"
                            @click=""
                          />
                        </div>
                      </div>
                    </div>
                    <q-card
                      class=" q-ma-xl  "
                      style="border: 1px solid grey;"
                      flat
                      bordered
                    >
                      <div class=" row bg-grey-3 ">
                        <div class="col-7 q-pa-lg">
                          5 Action Items
                        </div>

                        <div class="col-4 row  text-h6">
                          <div class="col q-pt-md">Workflow</div>

                          <div class="col">
                            <q-select
                              class="full-width q-py-sm"
                              outlined
                              options-dense
                              behavior="menu"
                              v-model="model"
                              :options="options"
                              label="Claim-New Claim"
                            ></q-select>
                          </div>
                        </div>
                        <q-separator />
                      </div>
                      <div class=" q-pa-lg">
                        <div v-for="index in 5" v-if="index >= 0">
                          <div class=" row q-pa-md">
                            <div class="col-11 ">
                              <div class="text-blue">
                                Send Wecome Letter To Client
                              </div>

                              <div class="q-pl-lg">
                                Created when the claim is maded
                              </div>
                            </div>

                            <div class="col-1 row  text-h6">
                              <q-icon size="sm" color="primary" name="create" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="addDefaultActionDialogBox" persistent>
      <q-card class=" col-8 " style=" width:1200px;">
        <q-bar class=" row justify-between bg-primary " style="height:50px;">
          <div class=" q-px-xs text-bold text-white">
            Add Action Item
          </div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div class=" row q-mt-lg  full-width">
          <div class="col-1-1 ">
            <div class="q-ml-xl q-pa-md text-bold">Action Item :</div>
          </div>
          <div class="col-5">
            <q-input class="q-mx-md" style="width: 300px" outlined />
          </div>
          <div class="col-1-1 ">
            <div class=" q-pa-md text-bold ">Enabled :</div>
          </div>
          <div class="col-3 q-ml-lg">
            <q-toggle v-model="enabled" left-label class="q-mt-xs " />
            <q-badge color="primary" v-if="enabled == true">Enable</q-badge>
            <q-badge class="q-mt-md" color="primary" v-else>Disable</q-badge>
          </div>
        </div>
        <!-- second -->
        <div class=" row q-mt-md  full-width">
          <div class="col-1-1 ">
            <div class="q-ml-xl q-pa-md text-bold">Created When :</div>
          </div>
          <div class="col-3">
            <q-select
              outlined
              options-dense
              behavior="menu"
              v-model="main.select"
              option-label="value"
              :options="actionReason"
              map-options
              emit-value
              label="Created when"
            ></q-select>
          </div>
          <!-- This is for Demo ! Api Not Integrated Yet -->
          <div
            class="col-3 q-ml-lg"
            v-if="main.select == 'nnj' || main.select == 'nknj'"
          >
            <q-select
              class="  col-3"
              outlined
              options-dense
              behavior="menu"
              v-model="model"
              :options="options"
              label="Sub-option"
            ></q-select>
          </div>
        </div>
        <!-- 3 -->
        <div class=" row q-mt-md  full-width">
          <div class="col-1-1 ">
            <div class="q-ml-xl q-pa-sm text-bold">Default Priority :</div>
          </div>
          <div class="col-5">
            <q-toggle
              v-model="defaultPriorityToggleButton"
              left-label
              class=" "
            />
            <q-badge color="primary" v-if="defaultPriorityToggleButton == true"
              >Important</q-badge
            >
          </div>
          <div class="col-1-1 ">
            <div class=" q-pa-md">:</div>
          </div>
          <div class="col-3 q-ml-lg"></div>
        </div>
        <div class=" row q-mt-md  full-width">
          <div class="col-1-1 row ">
            <div class="q-ml-xl q-pa-md text-bold">Due Date :</div>
            <div class="  q-ml-xl q-pt-md text-bold">Task will be Due</div>
          </div>
          <div class="col-2 q-mr-lg">
            <q-input class="q-mx-lg" style="" outlined />
          </div>

          <div class="col-2">
            <q-select
              outlined
              options-dense
              behavior="menu"
              :options="options"
              label="Bussiness"
            ></q-select>
          </div>
          <div class="col-1-1 ">
            <div class=" q-pa-md text-bold ">days after it is created</div>
          </div>
        </div>
        <div class=" row q-mt-md  full-width">
          <div class="col-1-1 row ">
            <div class="q-ml-xl q-pa-md text-bold">Assign To :</div>
            <div class="  q-ml-xl q-pt-md text-bold">
              <q-btn color="primary" size="10px" label="..Select" @click="" />
            </div>
          </div>
        </div>
        <div class=" row q-mt-md q-pl-xl  full-width">
          <div class="col-5" style="margin-left:10%;">
            <q-card class="q-pa-md text-bold" flat bordered>
              Note : Actions are executed in the order specified
            </q-card>
          </div>
        </div>
        <div
          v-for="(val, index) in value"
          v-if="value.length > 0"
          class="  row q-mt-md  full-width"
        >
          <div class="col-1-1 ">
            <div class="q-ml-xl q-pa-md text-bold">Completion Action :</div>
          </div>
          <div class="col-3">
            <q-select
              outlined
              options-dense
              behavior="menu"
              v-model="val.name"
              option-value="machineValue"
              option-label="value"
              @input="setSubTypeOfAction(val.name)"
              label="Completion Action"
            ></q-select>
          </div>

          <div class="col-3 q-ml-lg" v-if="val.name">
            <q-select
              class="  col-3"
              outlined
              options-dense
              behavior="menu"
              v-model="model"
              option-label="value"
              label="Sub-option"
            ></q-select>
          </div>
          <div class="  q-ml-xl q-pt-sm text-bold">
            <q-icon size="md" color="primary" name="add" @click="Addlick" />
          </div>
          <div class="  q-ml-lg q-pt-sm text-bold" v-if="value.length > 1">
            <q-icon
              size="md"
              color="primary"
              name="clear"
              @click="removeCompletionAction(index)"
            />
          </div>
        </div>
        <!-- {{ actionOverDues[0].subOptions[1].subTypes }} -->
        <div
          v-for="(val, index) in value1"
          v-if="value1.length > 0"
          class="  row q-mt-md  full-width"
        >
          <div class="col-1-1 ">
            <div class="q-ml-xl q-pa-md text-bold">OverDue Action:</div>
          </div>
          <div class="q-ml-lg col-3">
            <q-select
              outlined
              options-dense
              behavior="menu"
              option-value="machineValue"
              option-label="value"
              v-model="val.name"
              map-options
              emit-value
              @input="setSubType(val.name)"
              label="OverDue"
            ></q-select>
          </div>

          <div class="col-3 q-ml-lg " v-if="val.name">
            <q-select
              class="  col-3"
              outlined
              options-dense
              behavior="menu"
              option-label="value"
              v-model="model"
              label="Sub-option"
            ></q-select>
          </div>

          <div class="  q-ml-xl q-pt-sm text-bold">
            <q-icon
              size="md"
              color="primary"
              name="add"
              @click="addMoreOverDue"
            />
          </div>
          <div class="  q-ml-lg q-pt-sm text-bold" v-if="value1.length > 1">
            <q-icon
              size="md"
              color="primary"
              name="clear"
              @click="RemoveOverDue(index)"
            />
          </div>
        </div>

        <div class="  row q-mt-md  full-width">
          <div class="col-1-1 ">
            <div class="q-ml-xl q-pa-md text-bold">Notes/Instruction:</div>
          </div>
          <div class="q-ml-md col-5 ">
            <textarea rows="4" required style="width:60%;"></textarea>
          </div>
        </div>
        <div class="  q-my-xl row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class=" col-2 q-mt-xl"
            @click="onClickSaveButton"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import SubSideBar from 'components/SubSideBar';
import { mapGetters, mapActions } from 'vuex';
import { getCurrentUser } from 'src/utils/auth';
export default {
  name: 'Admin',
  components: { SubSideBar },
  data() {
    return {
      indexOfSubType: 0,
      main: {
        select: ''
      },
      enabled: false,
      defaultPriorityToggleButton: false,
      value: [{ name: '' }],
      value1: [{ name: '' }],
      addDefaultActionDialogBox: false,
      model: null,
      options: ['nknj', ',mmnjn', 'nnkmk', 'nnj', 'nkjn'],
      tab: '',
      adminSettings: [
        { name: 'Account Summary', key: 'accountSummary' },
        { name: 'Company Setup', key: 'companySetup' },
        { name: 'Group Permission ', key: 'groupPermission' },
        { name: ' Action items', key: 'actionItems' }
      ]
    };
  },
  computed: {
    ...mapGetters(['actionOverDues', 'actionCompletion', 'actionReason'])
  },
  methods: {
    ...mapActions([
      'getActionOverDues',
      'getActionCompletion',
      'getActionReasons'
    ]),
    setSelectedTab(e) {
      this.tab = e.key;
    },
    RemoveOverDue(val) {
      this.value1.splice(val, 1);
    },
    onClickSaveButton() {
      this.addDefaultActionDialogBox = false;
    },
    removeCompletionAction(val) {
      this.value.splice(val, 1);
    },
    addMoreOverDue() {
      this.value1.push({
        name: ''
      });
    },
    setSubType(val) {
      if (val == 'client') {
        this.indexOfSubType = 0;
      } else {
        this.indexOfSubType = 1;
      }
    },
    setSubTypeOfAction(val) {
      if (val.machineValue == 'client') {
        this.indexOfSubTypeAction = 0;
      } else {
        this.indexOfSubTypeAction = 1;
      }
    },

    Addlick() {
      this.value.push({
        name: ''
      });
    }
  },

  created() {
    const params = {
      workflowID: ''
    };
    this.getActionReasons(params);
    this.getActionOverDues();
    this.getActionCompletion();
    this.tab = 'accountSummary';
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
    }
  }
};
</script>
