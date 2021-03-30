<template>
  <q-page>
    <div class="row height-without-header">
      <SubSideBar
        class="col-2"
        :list="adminSettings"
        @onListClick="setSelectedTab"
        :selectedItem="tab"
      />
      <div class="col-10">
        <div class="q-pa-xs col-9">
          <!-- Height given for there Inner 2 div -->
          <div class="row full-width" style="height: 100%" flat bordered>
            <!-- Main Template -->
            <template class="">
              <q-tab-panels
                class="q-ml-xl full-width"
                style="height: calc(100vh - 10px)"
                v-model="tab"
                animated
                vertical
                swipeable
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="accountSummary">
                  <q-card class="q-pa-lg" style="height: 800px" flat bordered>
                    <div class="text-h5">Account Summary</div>

                    <div class="row q-mt-lg text-bold">
                      <div class="col">Company Name</div>
                      <div class="col">Company Address</div>
                      <div class="col">Company Mobile</div>
                      <div class="col">Postal Company Code</div>
                    </div>
                    <q-separator />
                    <div class="row q-mt-xs">
                      <div class="col">{{ user.name }}</div>
                      <div class="col">Company Address</div>
                      <div class="col">
                        {{
                          user.phoneNumber.number
                            ? user.phoneNumber.number
                            : '-'
                        }}
                      </div>
                      <div class="col">Company Mobile</div>
                    </div>

                    <div class="row q-mt-xl text-bold">
                      <div class="col">Company Administrator</div>
                      <div class="col">Administrator Email</div>
                    </div>
                    <q-separator />
                    <div class="row q-mt-xs">
                      <div class="col">
                        {{ user.contact.fname }} {{ user.contact.lname }}
                      </div>
                      <div class="col">{{ user.email }}</div>
                    </div>
                  </q-card>
                </q-tab-panel>
                <q-tab-panel name="actionItems">
                  <q-card class="q-pa-lg" style="" flat bordered>
                    <div class="full-width">
                      <div class="text-h5 text-bold">Claim Action Item</div>
                      <div class="text-h5" style="height: 200px">
                        <div class="q-pa-xl"></div>
                        <div class="row q-pa-xl">
                          <q-btn
                            color="primary"
                            label="+ Add Default Action "
                            class="col-md-2 col-lg-2"
                            @click="addDefaultActionDialogBox = true"
                          />
                          <q-btn
                            color="primary"
                            label="Refresh "
                            class="col-md-1 q-mx-lg col-lg-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Clone Workflow "
                            class="col-md-2col-lg-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Delete Workflow "
                            class="q-mx-lg col-md-2 col-lg-2"
                            @click=""
                          />
                          <q-btn
                            color="primary"
                            label="Planning Sheet "
                            class="q-mx-lg col-md-2 col-lg-2"
                            @click=""
                          />
                        </div>
                      </div>
                    </div>
                    <q-card
                      class="q-mx-xl q-my-md"
                      scroll
                      style="border: 1px solid grey"
                      flat
                      bordered
                    >
                      <div class="row bg-grey-3">
                        <div class="col-7 q-pa-lg" v-if="ClaimType">
                          {{ allAction.length }} Action Items
                        </div>
                        <div class="col-7 q-pa-lg" v-else>
                          Please Select Action Items
                        </div>

                        <div class="col-4 row text-h6">
                          <div class="col q-pt-md">Workflow</div>

                          <div class="col">
                            <q-select
                              dense
                              class="full-width q-py-sm input-extra-padding"
                              outlined
                              options-dense
                              behavior="menu"
                              v-model="ClaimType"
                              option-value="machineValue"
                              option-label="value"
                              :options="workflowAction"
                              label="Claim-New Claim"
                              @input="claimActionItem(ClaimType)"
                              map-options
                              emit-value
                            />
                          </div>
                        </div>
                        <q-separator />
                      </div>

                      <div
                        class="q-pa-lg"
                        style="height: 350px; overflow: auto"
                      >
                        <div v-for="index in allAction">
                          <div class="row q-pa-md">
                            <div class="col-11">
                              <div class="text-blue">
                                {{ index.name ? index.name : '-' }}
                              </div>

                              <div class="q-pl-lg">
                                {{
                                  index.createdDesc ? index.createdDesc : '-'
                                }}
                              </div>
                            </div>

                            <div class="col-1 row text-h6">
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
    <!-- Dialog Box for Adding Action Items -->
    <q-dialog v-model="addDefaultActionDialogBox" persistent>
      <q-card style="width: 60%; height: 88vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="q-px-xs text-bold text-white">Add Action Item</div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div class="q-mt-sm" style="height: calc(100% - 155px; overflow:auto">
          <div class="row q-mt-lg full-width">
            <div class="col-1-1">
              <div class="q-ml-xl q-pa-md text-bold">Action Item :</div>
            </div>

            <div class="col-4">
              <q-input
                dense
                v-model="actions.name"
                class="q-mx-md"
                style="width: 250px"
                outlined
              />
            </div>
            <div class="col-1-1">
              <div class="q-pa-md text-bold">Enabled :</div>
            </div>
            <div class="col-3 q-ml-xs">
              <q-toggle
                v-model="actions.isEnabled"
                left-label
                class="q-mt-xs"
              />
              <q-badge color="primary" v-if="actions.isEnabled == true"
                >Enable</q-badge
              >
              <q-badge class="q-mt-md" color="primary" v-else>Disable</q-badge>
            </div>
          </div>

          <!-- second -->
          <div class="row q-mt-md full-width">
            <div class="col-2-1">
              <div class="q-ml-xl q-pa-md text-bold">Created When :</div>
            </div>
            <div class="col-2-1">
              <q-select
                dense
                outlined
                options-dense
                behavior="menu"
                v-model="actions.createWhen.type"
                option-label="value"
                :options="actionReason"
                option-value="machineValue"
                @input="createdWhenSubType(actions.createWhen.type)"
                map-options
                emit-value
                label="Created when"
                class="input-extra-padding"
              />
            </div>

            <div class="col-2-1 q-ml-xs" v-if="actions.createWhen.type">
              <q-select
                dense
                class="col-3 input-extra-padding"
                outlined
                options-dense
                behavior="menu"
                v-model="actions.createWhen.task[0]"
                option-label="machineValue"
                map-options
                emit-value
                :options="actionReason[indexOfActionReason].additionalReasons"
                label="Sub-option"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No data present
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <!-- 3 -->
          <div class="row q-mt-md full-width">
            <div class="col-1-1">
              <div class="q-ml-xl q-pa-sm text-bold">
                Default Priority <span class="text-red">*</span> :
              </div>
            </div>
            <div class="col-4">
              <q-toggle v-model="priority" left-label @input="TogglePriority" />
              <q-badge color="primary" v-if="priority == true">HIgh</q-badge>
              <q-badge v-else color="primary">Low</q-badge>
            </div>

            <div class="col-1-1 row">
              <div class="q-py-sm text-bold">Assign To :</div>
              <div class="q-ml-sm q-pt-sm text-bold">
                <q-btn color="primary" size="10px" label="Select" @click="" />
              </div>
            </div>
          </div>
          <div class="row q-mt-md full-width">
            <div class="col-1-1 row">
              <div class="q-ml-xl q-pa-md text-bold">Due Date :</div>
              <div class="text-grey-9 q-pt-md text-bold">Task will be Due</div>
            </div>
            <div class="col-2">
              <q-input
                dense
                v-model.number="actions.due.interval"
                class="q-mx-sm"
                style=""
                outlined
                placeholder="Day"
              />
            </div>

            <div class="col-2">
              <q-select
                dense
                class="q-pt-xs"
                outlined
                options-dense
                v-model="actions.due.type"
                behavior="menu"
                option-value="options"
                :options="options"
                class="input-extra-padding"
                label="Type"
              />
            </div>
            <div class="q-ml-md">
              <div class="q-mt-md q-ml-xl text-bold">
                days after it is created
              </div>
            </div>
          </div>

          <div class="row q-mt-md q-pl-xl full-width">
            <div class="col-7">
              <q-card
                class="q-pa-md q-pl-xl text-bold"
                style="letter-spacing: 1px"
                flat
                bordered
              >
                Note : Actions are executed in the order specified
              </q-card>
            </div>
          </div>
          <div
            v-for="(val, index) in actions.actions.onComplete"
            v-if="actions.actions.onComplete.length > 0"
            class="row q-mt-md full-width"
          >
            <div class="col-1-1">
              <div class="q-ml-xl q-pa-md text-bold" v-if="index == 0">
                Completion Action :
              </div>
              <div
                class="q-ml-xl q-pa-md text-bold"
                v-else
                style="visibility: hidden"
              >
                Completion Action :
              </div>
            </div>
            <div class="col-2-1">
              <q-select
                dense
                outlined
                options-dense
                behavior="menu"
                v-model="actions.actions.onComplete[index].type"
                option-label="value"
                option-value="machineValue"
                map-options
                emit-value
                :options="actionCompletion"
                @input="
                  setSubTypeOfAction(
                    actions.actions.onComplete[index].type,
                    index
                  )
                "
                label="Completion Action"
                class="input-extra-padding"
              />
            </div>

            <div
              class="col-2-1 q-ml-xs"
              v-if="actions.actions.onComplete[index].type"
            >
              <q-select
                dense
                class="col-3 input-extra-padding"
                outlined
                v-model="actions.actions.onComplete[index].task[0]"
                behavior="menu"
                option-value="machineValue"
                option-label="value"
                :options="
                  actionCompletion[indexOfSubTypeOfCompletion].subOptions
                "
                label="Sub-option"
                @input="
                  setSubTypeForAction(
                    actions.actions.onComplete[index].task[0],
                    indexOfSubTypeOfCompletion,
                    index
                  )
                "
                map-options
                emit-value
                options-dense
              />
            </div>
            <div
              class="col-2-1 q-ml-xs"
              v-if="actions.actions.onComplete[index].task[0]"
            >
              <q-select
                dense
                class="col-3 input-extra-padding"
                outlined
                v-model="actions.actions.onComplete[index].task[1]"
                behavior="menu"
                option-label="value"
                :options="
                  actionCompletion[indexOfSubTypeOfCompletion].subOptions[
                    indexOfSubOfSubTypeOfCompletion
                  ].subTypes
                "
                label="Sub-option"
                map-options
                emit-value
                options-dense
              />
            </div>
            <div class="q-ml-md q-mt-sm">
              <q-icon
                class="clickable"
                size="md"
                color="primary"
                name="add"
                @click="Addlick"
              />
            </div>
            <div
              class="q-ml-sm q-pt-sm text-bold"
              v-if="actions.actions.onComplete.length > 1"
            >
              <q-icon
                class="clickable"
                size="md"
                color="primary"
                name="clear"
                @click="removeCompletionAction(index)"
              />
            </div>
          </div>
          <!-- OverDue -->

          <div
            v-for="(Overdue, index) in actions.actions.onOverdue"
            v-if="actions.actions.onOverdue.length > 0"
            class="row q-mt-md full-width"
          >
            <div class="col-1-1">
              <div class="q-ml-xl q-pa-md text-bold" v-if="index == 0">
                OverDue Action:
              </div>
              <div
                class="q-ml-xl q-pa-md text-bold"
                v-else
                style="visibility: hidden"
              >
                OverDue Action:
              </div>
            </div>

            <div class="q-ml-lg col-2-1">
              <q-select
                dense
                outlined
                v-model="actions.actions.onOverdue[index].type"
                behavior="menu"
                option-value="machineValue"
                option-label="value"
                :options="actionOverDues"
                map-options
                emit-value
                @input="
                  setSubType(actions.actions.onOverdue[index].type, index)
                "
                label="OverDue"
                options-dense
                class="input-extra-padding"
              />
            </div>

            <div
              class="col-2-1 q-ml-xs"
              v-if="actions.actions.onOverdue[index].type"
            >
              <q-select
                class=" "
                outlined
                options-dense
                v-model="actions.actions.onOverdue[index].task[0]"
                behavior="menu"
                option-value="machineValue"
                option-label="value"
                map-options
                :options="actionOverDues[indexOfSubType].subOptions"
                @input="
                  setSubOfSubType(
                    actions.actions.onOverdue[index].task[0],
                    indexOfSubType,
                    index
                  )
                "
                emit-value
                label="Sub-option"
              />
            </div>

            <div
              class="col-2-1 q-ml-xs"
              v-if="actions.actions.onOverdue[index].task[0]"
            >
              <q-select
                dense
                class="col-3 input-extra-padding"
                outlined
                options-dense
                v-model="actions.actions.onOverdue[index].task[1]"
                behavior="menu"
                option-value="machineValue"
                option-label="value"
                map-options
                emit-value
                :options="
                  actionOverDues[indexOfSubType].subOptions[indexOfSubOfSubType]
                    .subTypes
                "
                label="Sub-option-option"
              />
            </div>

            <div class="q-ml-md q-pt-sm text-bold">
              <q-icon
                class="clickable"
                size="md"
                color="primary"
                name="add"
                @click="addMoreOverDue"
              />
            </div>
            <div
              class="q-ml-sm q-pt-sm text-bold"
              v-if="actions.actions.onOverdue.length > 1"
            >
              <q-icon
                class="clickable"
                size="md"
                color="primary"
                name="clear"
                @click="RemoveOverDue(index)"
              />
            </div>
          </div>

          <div class="row q-mt-md full-width">
            <div class="col-1-1">
              <div class="q-ml-xl q-pa-md text-bold">Notes/Instruction:</div>
            </div>
            <div class="q-ml-md col-5">
              <textarea
                v-model="actions.notes"
                rows="4"
                required
                style="width: 60%"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class="align-content-center col-2 q-my-lg"
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
      params: '',
      priority: false,
      actions: {
        name: '',
        isEnabled: false,
        createWhen: {
          type: '',
          task: []
        },
        priority: 'low',
        assignedTo: [
          {
            type: 'user',
            name: '',
            id: ''
          }
        ],
        actions: {
          onComplete: [
            {
              type: '',
              task: []
            }
          ],
          onOverdue: [
            {
              type: '',
              task: []
            }
          ]
        },
        due: {
          type: '',
          interval: '',
          unit: 'days'
        },
        notes: ''
      },

      ClaimType: '',

      indexOfActionReason: '',
      indexOfSubTypeOfCompletion: '',
      indexOfSubOfSubTypeOfCompletion: '',

      indexOfSubType: 0,
      indexOfSubTypeForComp: '',
      indexOfSubOfSubType: 0,

      addDefaultActionDialogBox: true,
      model: null,
      options: ['Bussiness', 'Industry'],
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
    ...mapGetters([
      'actionOverDues',
      'actionCompletion',
      'actionReason',
      'workflowAction',
      'getWorkflow',
      'allAction'
    ])
  },
  methods: {
    ...mapActions([
      'getActionOverDues',
      'getActionCompletion',
      'getActionReasons',
      'getWorkflowAction',
      'getAllWorkFlow',
      'addWorkflowAction'
    ]),

    // For Api Calling
    async claimActionItem(mValue) {
      this.params = mValue;
      await this.getAllWorkFlow(this.params);
    },
    // Toggle Priority Set
    TogglePriority() {
      if (this.priority == true) {
        this.actions.priority = 'critical';
      }
    },
    //  Finding and Clearing the Other Sub data while changing the main DRopdown data
    createdWhenSubType(value) {
      this.actions.createWhen.task[0] = '';

      var index = this.actionReason.findIndex(
        std => std.machineValue === value
      );

      this.indexOfActionReason = index;
    },
    // Action OverDue Sub Dropdown Index set

    setSubType(val, index) {
      this.actions.actions.onOverdue[
        index
      ].task[0] = this.actions.actions.onOverdue[index].task[1] = '';

      var index = this.actionCompletion.findIndex(
        std => std.machineValue === val
      );

      this.indexOfSubType = index;
    },

    setSubOfSubType(subValue, indexOfSubType, index) {
      this.actions.actions.onOverdue[index].task[1] = '';

      const obj = this.actionOverDues[indexOfSubType].subOptions.findIndex(
        item => {
          return item.machineValue === subValue;
        }
      );

      this.indexOfSubOfSubType = obj;
    },

    setSubTypeForAction(SubOptionValue, sValue, index) {
      this.actions.actions.onComplete[index].task[1] = '';

      const ob = this.actionCompletion[sValue].subOptions.findIndex(item => {
        return item.machineValue === SubOptionValue;
      });
      this.indexOfSubOfSubTypeOfCompletion = ob;
    },

    setSelectedTab(e) {
      this.tab = e.key;
    },
    RemoveOverDue(val) {
      this.actions.actions.onOverdue.splice(val, 1);
    },
    // OnSaveButtonClick
    async onClickSaveButton() {
      const param = { machineValue: this.params, data: this.actions };
      await this.addWorkflowAction(param);
      this.addDefaultActionDialogBox = false;
      this.getAllWorkFlow(this.params);
    },

    // Remove Completion Multiple Values
    removeCompletionAction(val) {
      this.actions.actions.onComplete.splice(val, 1);
    },

    Addlick() {
      this.actions.actions.onComplete.push({
        type: '',
        task: []
      });
    },
    addMoreOverDue() {
      this.actions.actions.onOverdue.push({
        type: '',
        task: []
      });
    },

    setSubTypeOfAction(val, index) {
      this.actions.actions.onComplete[
        index
      ].task[0] = this.actions.actions.onComplete[index].task[1] = '';
      var indexOfCompletionAction = this.actionCompletion.findIndex(
        std => std.machineValue === val
      );

      this.indexOfSubTypeOfCompletion = indexOfCompletionAction;
    }
  },

  created() {
    this.getWorkflowAction();

    const params = {
      workflowID: 'claim_estimation'
    };
    this.getActionReasons(params);
    this.getActionOverDues(params);
    this.getActionCompletion(params);
    this.tab = 'accountSummary';
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
    }
  }
};
</script>
<style lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 80%;
}
.q-select {
  width: 200px;
  height: 10px;
  margin-top: 20px;
}
</style>
