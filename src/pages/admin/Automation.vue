<template>
  <q-page>
    <div class="col">
      <div class="row justify-between">
        <div class="text-weight-bold text-h5">Automation</div>
        <div class="row">
          <div
            class="
              text-underline text-body1 text-bold
              cursor-pointer
              text-primary
            "
            @click="addDefaultActionItem()"
          >
            Create New rules
          </div>
          <q-icon class="q-ml-sm fas fa-cogs" size="sm" color="primary" />
        </div>
      </div>
      <div class="q-mt-md">
        <div v-if="copyRule">Copy Rule</div>
        <div v-else-if="editDefaultActionItem">Edit Rule</div>
        <div v-else-if="addDefaultActionDialogBox">Create New Rule</div>
      </div>

      <!-- Dialog Box for Adding Action Items -->
      <div class="column q-mt-sm" v-if="addDefaultActionDialogBox">
        <q-separator />
        <div class="row q-mt-lg">
          <div class="col-3">
            <div>Rule Details</div>
            <div class="row">
              <div class="q-mr-md col-3 q-mt-sm">
                <q-separator />
              </div>
            </div>
            <q-timeline color="secondary">
              <q-timeline-entry icon="warning">
                <template v-slot:subtitle>
                  When: {{ actions.triggerEvent.type.value }}
                </template>
              </q-timeline-entry>

              <q-timeline-entry
                v-if="actions.actions.completionRule[0].type != ''"
                v-for="(item, index) in actions.actions.completionRule"
                :key="index"
                icon="chevron_right"
              >
                <template v-slot:subtitle>
                  <span v-if="index == 0"> Then: </span>
                  <span v-else>And:</span>
                  {{ actions.actions.completionRule[index].type.value }}
                </template>
              </q-timeline-entry>
            </q-timeline>
          </div>

          <div class="col q-ml-xl">
            <!--  rule name -->
            <q-form ref="automationRuleForm">
              <div class="row q-mb-sm">
                <div class="col-2">
                  Rule Name <span class="text-red"> *</span>
                </div>
                <div class="col-3 q-ml-xs">
                  <q-input
                    outlined
                    dense
                    :prefix="copyRule ? 'Copy-' : ''"
                    class="full-width"
                    v-model="actions.name"
                    maxlength="128"
                    :label="
                      editDefaultActionItem
                        ? copyRule
                          ? 'Copy-Rule '
                          : 'Edit Rule'
                        : 'Create New Rule'
                    "
                    :rules="[
                      val => (val && val.length > 0) || 'Please add rule name'
                    ]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  Workflow <span class="text-red"> *</span>
                </div>
                <div class="col-3 q-ml-xs">
                  <q-select
                    dense
                    outlined
                    options-dense
                    behavior="menu"
                    v-model="workflowActionItem"
                    option-label="value"
                    :options="workflowAction"
                    option-value="machineValue"
                    map-options
                    emit-value
                    label="Create a claim"
                    class="input-extra-padding"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select any workflow'
                    ]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  Trigger event<span class="text-red"> *</span>
                </div>
                <div class="col-3 q-ml-xs">
                  <q-select
                    dense
                    outlined
                    options-dense
                    behavior="menu"
                    v-model="actions.triggerEvent.type.machineValue"
                    option-label="value"
                    :options="actionReason"
                    option-value="machineValue"
                    @input="
                      createdWhenSubType(
                        actions.triggerEvent.type,
                        (isEditable = true)
                      )
                    "
                    map-options
                    emit-value
                    label="Created when"
                    class="input-extra-padding"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select any event'
                    ]"
                  />

                  <div
                    class="q-ml-xs"
                    v-if="
                      actions.triggerEvent.type.value &&
                        actionReason[indexOfActionReason].additionalReasons
                    "
                  >
                    <q-select
                      dense
                      class="input-extra-padding"
                      outlined
                      options-dense
                      behavior="menu"
                      v-model="triggerEventSubType"
                      option-label="value"
                      option-value="machineValue"
                      map-options
                      emit-value
                      :options="
                        actionReason[indexOfActionReason].additionalReasons
                      "
                      @input="
                        setSubTypeForTriggerEvents(
                          triggerEventSubType,
                          indexOfActionReason
                        )
                      "
                      label="Sub-option"
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select any action'
                      ]"
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
                <q-checkbox
                  class="q-ml-md q-mb-md"
                  @input="toEnableDisabledUpdate(actions)"
                  v-model="actions.isEnabled"
                  label="Enable rule"
                />
              </div>
              <div class="row">
                <div class="col-2">
                  Actions <span class="text-red"> *</span>
                </div>
                <div class="col-9 q-ml-xs">
                  <div
                    class="row"
                    v-for="(val, index) in actions.actions.completionRule"
                    :key="index"
                  >
                    <div class="col-4">
                      <div>
                        <q-select
                          dense
                          outlined
                          options-dense
                          behavior="menu"
                          v-model="actionCompletionRuleType[index]"
                          option-label="value"
                          option-value="machineValue"
                          map-options
                          emit-value
                          :options="actionCompletion"
                          @input="
                            setSubTypeOfAction(
                              actionCompletionRuleType[index],
                              index,
                              (isEditable = true)
                            )
                          "
                          label="Completion Action"
                          class="input-extra-padding"
                          :rules="[
                            val =>
                              (val && val.length > 0) ||
                              'Please select any category'
                          ]"
                        />
                      </div>

                      <div
                        class="q-ml-md col-1"
                        v-if="
                          actions.actions.completionRule[index].type &&
                            actionCompletion[
                              actions.actions.completionRule[index].typeVal
                            ].hasAdditionalActions
                        "
                      >
                        <q-select
                          dense
                          class="col-3 input-extra-padding"
                          outlined
                          v-model="actionCompletionRuleSubType[index]"
                          behavior="menu"
                          option-value="machineValue"
                          option-label="value"
                          :options="
                            actionCompletion[
                              actions.actions.completionRule[index].typeVal
                            ].subOptions
                          "
                          label="Sub-option"
                          @input="
                            setSubTypeForAction(
                              actionCompletionRuleSubType[index],
                              actions.actions.completionRule[index].typeVal,
                              index,
                              (isEditable = true)
                            )
                          "
                          map-options
                          emit-value
                          options-dense
                          :rules="[
                            val =>
                              (val && val.length > 0) ||
                              'Please select any category'
                          ]"
                        />
                      </div>

                      <div
                        class="q-ml-md col-1"
                        v-if="
                          actions.actions.completionRule[index].task &&
                          actions.actions.completionRule[index].task[0] &&
                          actionCompletion[
                            actions.actions.completionRule[index].typeVal
                          ].hasAdditionalActions
                            ? actionCompletion[
                                actions.actions.completionRule[index].typeVal
                              ].subOptions[
                                actions.actions.completionRule[index].subTypeVal
                              ]
                              ? actionCompletion[
                                  actions.actions.completionRule[index].typeVal
                                ].subOptions[
                                  actions.actions.completionRule[index]
                                    .subTypeVal
                                ].subTypes.length > 0
                              : false
                            : false
                        "
                      >
                        <q-select
                          v-if="
                            actions.actions.completionRule[index].task[0]
                              .machineValue == 'user'
                          "
                          dense
                          class="input-extra-padding"
                          outlined
                          v-model="actionCompletionRuleSubValueType[index]"
                          behavior="menu"
                          option-value="id"
                          option-label="value"
                          :options="
                            actionCompletion[
                              actions.actions.completionRule[index].typeVal
                            ].subOptions[
                              actions.actions.completionRule[index].subTypeVal
                            ].subTypes
                          "
                          label="Sub-option"
                          map-options
                          emit-value
                          options-dense
                          @input="
                            setSubTypeValueForAction(
                              actionCompletionRuleSubValueType[index],
                              actions.actions.completionRule[index].typeVal,
                              actions.actions.completionRule[index].subTypeVal,
                              index,
                              (isEditable = true),
                              (isUserType = true)
                            )
                          "
                          :rules="[
                            val =>
                              (val && val.length > 0) ||
                              'Please select any category'
                          ]"
                        />
                        <q-select
                          v-else
                          dense
                          class="input-extra-padding"
                          outlined
                          v-model="actionCompletionRuleSubValueType[index]"
                          behavior="menu"
                          option-value="machineValue"
                          option-label="value"
                          :options="
                            actionCompletion[
                              actions.actions.completionRule[index].typeVal
                            ].subOptions[
                              actions.actions.completionRule[index].subTypeVal
                            ].subTypes
                          "
                          label="Sub-option"
                          map-options
                          emit-value
                          options-dense
                          @input="
                            setSubTypeValueForAction(
                              actionCompletionRuleSubValueType[index],
                              actions.actions.completionRule[index].typeVal,
                              actions.actions.completionRule[index].subTypeVal,
                              index,
                              (isEditable = true),
                              (isUserType = false)
                            )
                          "
                          :rules="[
                            val =>
                              (val && val.length > 0) ||
                              'Please select any category'
                          ]"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="text-bold"
                        v-if="actions.actions.completionRule.length > 1"
                      >
                        <q-icon
                          class="clickable"
                          size="md"
                          color="primary"
                          name="clear"
                          @click="removeCompletionAction(index)"
                        />
                      </div>

                      <div
                        v-if="
                          actions.actions.completionRule.length == index + 1
                        "
                      >
                        <q-icon
                          class="clickable"
                          size="md"
                          color="primary"
                          name="add"
                          @click="addAnotherOnClick"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-2">
                  Assign To<span class="text-red"> *</span>
                </div>
                <div class="col-3 q-ml-xs">
                  <div class="q-mb-md">
                    <q-select
                      dense
                      outlined
                      v-model="assignedToInfo"
                      use-input
                      input-debounce="0"
                      @input="setAssignTo(assignedToInfo)"
                      option-label="name"
                      option-value="id"
                      label="Assigned To"
                      @filter="AssignedTOSearch"
                      :options="assignedTo"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
              </div>

              <!--Due Date-->
              <div class="row">
                <div class="col-2">Due Date</div>
                <div class="col-1 q-ml-xs">
                  <q-input
                    dense
                    v-model.number="actions.due.interval"
                    outlined
                    min="0"
                    type="number"
                    placeholder="Day"
                    :rules="[val => !!val || 'Please enter days']"
                  />
                </div>
              </div>

              <!--OverDue-->

              <div
                class="row"
                v-for="(Overdue, index) in actions.actions.overdueRule"
                :key="index"
              >
                <div class="col-2" v-if="index == 0">If overdue:</div>
                <div
                  class="col-3 q-ml-xs"
                  v-if="actions.actions.overdueRule.length > 0"
                >
                  <div>
                    <q-select
                      dense
                      outlined
                      v-model="overDueType"
                      behavior="menu"
                      option-value="machineValue"
                      option-label="value"
                      :options="actionOverDues"
                      map-options
                      emit-value
                      @input="
                        setSubType(overDueType, index, (isEditable = true))
                      "
                      label="OverDue"
                      options-dense
                      class="input-extra-padding"
                    />

                    <div
                      class="q-ml-lg"
                      v-if="
                        actions.actions.overdueRule[index].type &&
                          actionOverDues[indexOfSubType].subOptions
                      "
                    >
                      <q-select
                        class="input-extra-padding"
                        outlined
                        dense
                        options-dense
                        v-model="overDueSubTaskTypeVal"
                        behavior="menu"
                        option-value="machineValue"
                        option-label="value"
                        map-options
                        :options="actionOverDues[indexOfSubType].subOptions"
                        @input="
                          setSubOfSubType(
                            overDueSubTaskTypeVal,
                            indexOfSubType,
                            index,
                            true
                          )
                        "
                        emit-value
                        label="Sub-option"
                      />
                    </div>

                    <div
                      class="q-ml-lg"
                      v-if="
                        actions.actions.overdueRule[index].task &&
                        actions.actions.overdueRule[index].task[0] &&
                        actionOverDues[indexOfSubType].subOptions
                          ? actionOverDues[indexOfSubType].subOptions[
                              indexOfSubOfSubType
                            ]
                            ? actionOverDues[indexOfSubType].subOptions[
                                indexOfSubOfSubType
                              ].subTypes.length > 0
                            : false
                          : false
                      "
                    >
                      <q-select
                        v-if="
                          actions.actions.overdueRule[index].task[0]
                            .machineValue == 'user'
                        "
                        dense
                        class="col-3 input-extra-padding"
                        outlined
                        options-dense
                        v-model="overDueSubTaskSubVal"
                        behavior="menu"
                        option-value="id"
                        option-label="value"
                        map-options
                        emit-value
                        :options="
                          actionOverDues[indexOfSubType].subOptions[
                            indexOfSubOfSubType
                          ].subTypes
                        "
                        label="Sub-option"
                        @input="
                          setSubOfSubTypeVal(
                            overDueSubTaskSubVal,
                            indexOfSubType,
                            indexOfSubOfSubType,
                            index,
                            true,
                            true
                          )
                        "
                      />
                      <q-select
                        v-else
                        dense
                        class="col-3 input-extra-padding"
                        outlined
                        options-dense
                        v-model="overDueSubTaskSubVal"
                        behavior="menu"
                        option-value="machineValue"
                        option-label="value"
                        map-options
                        emit-value
                        :options="
                          actionOverDues[indexOfSubType].subOptions[
                            indexOfSubOfSubType
                          ].subTypes
                        "
                        @input="
                          setSubOfSubTypeVal(
                            overDueSubTaskSubVal,
                            indexOfSubType,
                            indexOfSubOfSubType,
                            index,
                            true,
                            false
                          )
                        "
                        label="Sub-options"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notes-->
              <div class="row">
                <div class="col-2">Notes</div>
                <div class="col q-ml-xs">
                  <textarea
                    v-model="actions.notes"
                    rows="4"
                    maxlength="1024"
                    style="width: 50%"
                  />
                </div>
              </div>

              <!--Submit button-->
              <div class="row justify-end">
                <div class="col-8">
                  <div class="row">
                    <div class="col-2">
                      <q-btn
                        bordered
                        label="Cancel"
                        style="width: 100%"
                        class="col-6 q-mt-lg q-mr-xl"
                        @click="toActionItemCancel()"
                      />
                    </div>
                    <div v-if="editDefaultActionItem" class="q-ml-md col-2">
                      <q-btn
                        v-if="copyRule"
                        color="primary"
                        label="Save"
                        style="width: 100%"
                        class="q-my-lg"
                        @click="onClickSaveButton"
                      />
                      <q-btn
                        v-else
                        color="primary"
                        label="Update"
                        style="width: 100%"
                        class="q-my-lg"
                        @click="onClickEditSaveButton"
                      />
                    </div>
                    <!--button action for adding new action item-->
                    <div v-else class="col-2 q-ml-xl">
                      <q-btn
                        color="primary"
                        label="Save"
                        style="width: 100%"
                        class="q-my-lg"
                        @click="onClickSaveButton"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </div>

      <div class="col">
        <table class="action-item-table">
          <tr>
            <th class="table-th text-black">Rule Name</th>
            <th class="table-th text-black">Workflow</th>
            <th class="table-th text-black">Assigned To</th>
            <th class="table-th text-black">Person</th>
            <th class="table-th text-black">State</th>
            <th class="table-th text-black">Actions</th>
          </tr>

          <tr class="table-tr" v-for="(item, index) in allAction" :key="index">
            <td class="table-td">{{ item.name }}</td>
            <td class="table-td">{{ item.workflow.value }}</td>
            <td class="table-td">{{ item.assignedTo[0].type }}</td>
            <td class="table-td">{{ item.assignedTo[0].name }}</td>
            <td class="table-td">
              {{ item.isEnabled ? 'ON' : 'OFF' }}
            </td>
            <td class="table-td">
              <div class="justify-between">
                <q-icon
                  name="edit"
                  class="cursor-pointer"
                  @click="toEditActionItem(item)"
                />
                <q-icon
                  class="q-px-md cursor-pointer"
                  name="fas fa-power-off"
                  :color="item.isEnabled ? 'primary' : 'grey'"
                  @click="toActionItemToggleSwitch(item)"
                >
                  <q-tooltip>
                    {{ item.isEnabled ? 'Enabled' : 'Disabled' }}
                  </q-tooltip>
                </q-icon>
                <q-icon
                  class="cursor-pointer"
                  name="fas fa-ellipsis-v"
                  @click="toActionItemKebabMenu(item)"
                />

                <q-menu
                  v-if="ActionItemKebabMenu == item.name"
                  anchor="bottom right"
                  self="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup @click="toCopyRule(item)">
                      <q-item-section>Copy Rule</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="toDeleteActionItem(item)"
                    >
                      <q-item-section>Delete Rule</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { getCurrentUser } from 'src/utils/auth';

export default {
  name: 'Automation',
  data() {
    return {
      triggerEventSubType: '',
      actionCompletionRuleType: [],
      actionCompletionRuleSubType: [],
      actionCompletionRuleSubValueType: [],
      overDueType: '',
      overDueSubTaskTypeVal: '',
      overDueSubTaskSubVal: '',
      editedRule: {},
      enabledDisabledByEditCopy: {},
      assignedToInfo: '',
      assignedTo: [],
      copyRule: false,
      workflowActionItem: '',
      ActionItemKebabMenu: false,
      isEditable: false,
      editedActionItemID: '',
      selectedWorkflowID: '',
      editTogglePriorityKey: false,
      editDefaultActionItem: false,
      assignTo: [
        { value: 'User', machineValue: 'user' },
        { value: 'Role', machineValue: 'role' }
      ],
      columns: [
        {
          name: 'paidUserName',
          label: 'Paid Users',
          align: 'left',
          field: row => row.paidUserName
        },
        {
          name: 'unPaidUserName',
          label: 'UnPaid Users',
          align: 'left',
          field: row => row.unPaidUserName
        }
      ],
      data: [],
      assignee: '',
      assignToSubOption: [],
      value: {},
      userId: '',
      actions: {
        name: '',
        isEnabled: true,
        triggerEvent: {
          type: {
            value: '',
            machineValue: ''
          },
          task: [
            {
              value: '',
              machineValue: ''
            }
          ]
        },
        assignedTo: [
          {
            type: '',
            name: '',
            machineValue: '',
            id: ''
          }
        ],
        actions: {
          completionRule: [
            {
              typeVal: '',
              subTypeVal: '',
              type: {},
              task: []
            }
          ],
          overdueRule: [
            {
              type: {},
              task: []
            }
          ]
        },
        due: {
          interval: 0,
          unit: 'days'
        },
        notes: ''
      },

      claimType: '',

      indexOfActionReason: '',
      indexOfSubTypeOfCompletion: '',
      indexOfSubOfSubTypeOfCompletion: '',

      indexOfSubType: 0,
      indexOfSubTypeForComp: '',
      indexOfSubOfSubType: 0,

      addDefaultActionDialogBox: false,
      model: null
    };
  },
  computed: {
    ...mapGetters([
      'roleTypes',
      'assignedToData',
      'webSubOptionMenuTab',
      'actionOverDues',
      'actionCompletion',
      'actionReason',
      'workflowAction',
      'getWorkflow',
      'allAction',
      'contactTypes',
      'allUsers'
    ])
  },

  methods: {
    ...mapActions([
      'assignedToSearch',
      'actionItemToggleSwitch',
      'editAdminActionItem',
      'getActionOverDues',
      'getActionCompletion',
      'getActionReasons',
      'getWorkflowAction',
      'getAllWorkFlow',
      'addWorkflowAction',
      'getAllConfigurationTableData',
      'editUserInfo',
      'editUserProfile',
      'getUserInfo',
      'getAllUsers',
      'getRoles',
      'getPermissions',
      'setMultiplePermission',
      'getOrganization',
      'adminActionItemDelete',
      'updateUserForOrganization',
      'updateAccessToken'
    ]),

    toActionItemCancel() {
      this.copyRule = false;
      this.addDefaultActionDialogBox = false;
    },
    //function is used to check if the enable and disable is updated from the Edit rule mode.
    toEnableDisabledUpdate(val) {
      if (this.editDefaultActionItem) this.enabledDisabledByEditCopy = val;
    },
    //assignedTO user/role search
    async AssignedTOSearch(val, update) {
      await this.assignedToSearch(val);
      update(() => {
        this.assignedTo = this.assignedToData;
      });
    },
    //to Delete Admin Action item
    async toDeleteActionItem(item) {
      const payload = {
        itemID: item.machineValue,
        workFlowID: item.workflow.machineValue
      };
      this.adminActionItemDelete(payload);
      this.getAllWorkFlow(this.claimType);
    },
    addDefaultActionItem() {
      (this.assignedToInfo = ''),
        (this.assignedTo = []),
        (this.addDefaultActionDialogBox = true);
      this.editDefaultActionItem = false;
      this.workflowActionItem = '';
      this.actions = {
        name: '',
        isEnabled: true,
        triggerEvent: {
          type: {
            value: '',
            machineValue: ''
          },
          task: [{ value: '', machineValue: '' }]
        },
        assignedTo: [
          {
            type: '',
            name: '',
            id: ''
          }
        ],
        actions: {
          completionRule: [
            {
              typeVal: '',
              subTypeVal: '',
              type: '',
              task: []
            }
          ],
          overdueRule: [
            {
              type: '',
              task: []
            }
          ]
        },
        due: {
          interval: 0,
          unit: 'days'
        },
        notes: ''
      };
    },
    //function is used to switch the toggle status
    async toActionItemToggleSwitch(item) {
      if (this.editDefaultActionItem) {
        if (item.isEnabled) {
          var toggleDetail = {
            toggleStatus: 'enable',
            ruleId: item.machineValue,
            workflowId: item.workflowID
          };
          await this.actionItemToggleSwitch(toggleDetail);
        } else {
          var toggleDetail = {
            toggleStatus: 'disable',
            ruleId: item.machineValue,
            workflowId: item.workflowID
          };
          await this.actionItemToggleSwitch(toggleDetail);
        }
      } else {
        if (item.isEnabled) {
          var toggleDetail = {
            toggleStatus: 'disable',
            ruleId: item.machineValue,
            workflowId: item.workflow.machineValue
          };
          await this.actionItemToggleSwitch(toggleDetail);
        } else {
          var toggleDetail = {
            toggleStatus: 'enable',
            ruleId: item.machineValue,
            workflowId: item.workflow.machineValue
          };
          await this.actionItemToggleSwitch(toggleDetail);
        }
      }

      this.getAllWorkFlow(this.claimType);
    },
    //function is used to copy the rule
    toCopyRule(item) {
      this.copyRule = true;
      this.toEditActionItem(item);
    },
    //function is used to edit the rule item
    toEditActionItem(item) {
      this.editedRule = item;
      this.workflowActionItem = item.workflow.machineValue;
      this.addDefaultActionDialogBox = true;
      this.editDefaultActionItem = true;
      this.editedActionItemID = item.machineValue;
      this.actions.name = item.name;
      this.actions.isEnabled = item.isEnabled;
      this.actions.triggerEvent.type =
        item.triggerEvent && item.triggerEvent.type
          ? item.triggerEvent.type
          : '';
      this.actions.triggerEvent.task =
        item.triggerEvent && item.triggerEvent.task
          ? item.triggerEvent.task
          : [];

      this.actions.assignedTo[0].id =
        item.assignedTo && item.assignedTo[0].id ? item.assignedTo[0].id : '';
      this.actions.assignedTo[0].name =
        item.assignedTo && item.assignedTo[0].name
          ? item.assignedTo[0].name
          : '';
      this.actions.assignedTo[0].type =
        item.assignedTo && item.assignedTo[0].type
          ? item.assignedTo[0].type
          : '';

      this.actions.actions.completionRule[0].task =
        item.actions.completionRule && item.actions.completionRule[0].task
          ? item.actions.completionRule[0].task
          : [];
      this.actions.actions.completionRule[0].type =
        item.actions.completionRule && item.actions.completionRule[0].type
          ? item.actions.completionRule[0].type
          : '';

      this.actions.actions.overdueRule[0].type =
        item.actions.overdueRule && item.actions.overdueRule[0].type
          ? item.actions.overdueRule[0].type
          : '';
      this.actions.actions.overdueRule[0].task =
        item.actions.overdueRule && item.actions.overdueRule[0].task
          ? item.actions.overdueRule[0].task
          : [];
      this.actions.due.interval =
        item.due && item.due.interval ? item.due.interval : '';
      this.actions.due.unit = item.due && item.due.unit ? item.due.unit : '';
      this.actions.notes = item.notes ? item.notes : '';

      this.createdWhenSubType(
        this.actions.triggerEvent.type,
        (this.isEditable = false)
      );
      (this.triggerEventSubType = this.actions.triggerEvent.task[0].value),
        (this.actions.assignedTo[0].type = item.assignedTo[0].type);
      this.actions.assignedTo[0].name = item.assignedTo[0].name;
      this.actions.assignedTo[0].id = item.assignedTo[0].id;
      this.actions.assignedTo[0].machineValue = item.assignedTo[0].machineValue;
      this.assignedToInfo = item.assignedTo[0].name;

      for (let i = 0; i < this.actions.actions.completionRule.length; i++) {
        if (this.actions.actions.completionRule[i].type != '') {
          this.actionCompletionRuleType[
            i
          ] = this.actions.actions.completionRule[i].type.value;
          this.setSubTypeOfAction(
            this.actions.actions.completionRule[i].type.machineValue,
            i,
            (this.isEditable = false)
          );
        }
        if (this.actions.actions.completionRule[i].task.length != 0) {
          (this.actionCompletionRuleSubType = this.actions.actions.completionRule[
            i
          ].task[0].value),
            (this.actionCompletionRuleSubValueType = this.actions.actions.completionRule[
              i
            ].task[1].value);

          this.setSubTypeForAction(
            this.actions.actions.completionRule[i].task[0].machineValue,
            this.indexOfSubTypeOfCompletion,
            i,
            (this.isEditable = false)
          );
        }
      }

      for (let i = 0; i < this.actions.actions.overdueRule.length; i++) {
        if (this.actions.actions.overdueRule[i].type != '') {
          this.overDueType = this.actions.actions.overdueRule[i].type.value;
          this.setSubType(
            this.actions.actions.overdueRule[i].type.machineValue,
            i,
            (this.isEditable = false)
          );
        }
        if (this.actions.actions.overdueRule[i].task.length != 0) {
          this.overDueSubTaskTypeVal = this.actions.actions.overdueRule[
            i
          ].task[0].value;
          this.overDueSubTaskSubVal = this.actions.actions.overdueRule[
            i
          ].task[1].value;
          this.setSubOfSubType(
            this.actions.actions.overdueRule[i].task[0].machineValue,
            this.indexOfSubType,
            i,
            false
          );
        }
      }
    },

    //this is for action item kebeb menu item
    toActionItemKebabMenu(item) {
      if (this.ActionItemKebabMenu == item.name) this.ActionItemKebabMenu = '';
      //this is used to disable the kebab menu , when click it on again.
      else this.ActionItemKebabMenu = item.name;
    },

    async setAssignTo(val) {
      if (val) {
        if (val.type == 'user') {
          await this.getAllUsers();
          const obj = this.allUsers.find(item => {
            return item.id === val.id;
          });

          this.actions.assignedTo[0].id = obj.id ? obj.id : '';
          this.actions.assignedTo[0].machineValue = obj.attributes.roles[0]
            .machineValue
            ? obj.attributes.roles[0].machineValue
            : '';
          this.actions.assignedTo[0].type = val.type;
          this.actions.assignedTo[0].name = obj.name;
        } else {
          await this.getRoles();
          const obj = this.roleTypes.find(item => {
            return item.machineValue === val.id;
          });

          this.actions.assignedTo[0].type = val.type;
          this.actions.assignedTo[0].name = obj.name;
          this.actions.assignedTo[0].id = obj.id ? obj.id : '';
          this.actions.assignedTo[0].machineValue = obj.machineValue
            ? obj.machineValue
            : '';
        }
      }
    },
    hasChild(scope) {
      return scope.opt.children.some(c => c.label === this.selectedRole);
    },
    // For Api Calling
    async claimActionItem(mValue) {
      await this.getAllWorkFlow(this.claimType);
      await this.getActionReasons(this.claimType);
      await this.getActionOverDues(this.claimType);
      await this.getActionCompletion(this.claimType);
      this.claimType = mValue;
      this.selectedWorkflowID = mValue;
    },

    setSubTypeForTriggerEvents(value, pValue) {
      var index = this.actionReason[pValue].additionalReasons.findIndex(
        std => std.machineValue === value
      );
      // this.actions.triggerEvent.task=[];
      let subTaskData = {
        value: this.actionReason[pValue].additionalReasons[index].value,
        machineValue: this.actionReason[pValue].additionalReasons[index]
          .machineValue
      };
      this.actions.triggerEvent.task[0] = subTaskData;
    },

    //  Finding and Clearing the Other Sub data while changing the main DRopdown data
    createdWhenSubType(value, isEditable) {
      if (isEditable) {
        if (this.actions.triggerEvent.task && this.actions.triggerEvent.task[0])
          this.actions.triggerEvent.task[0] = { value: '', machineValue: '' };
      }
      var index = this.actionReason.findIndex(
        std => std.machineValue === value.machineValue
      );
      this.actions.triggerEvent.type.value = this.actionReason[index].value;
      this.indexOfActionReason = index;
    },

    // Action OverDue Sub Dropdown Index set and also used to find the index of selected onOverdue.
    setSubType(val, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.overdueRule[index].task &&
          this.actions.actions.overdueRule[index].task[0]
        )
          this.actions.actions.overdueRule[index].task[0] = '';
        if (
          this.actions.actions.overdueRule[index].task &&
          this.actions.actions.overdueRule[index].task[1]
        )
          this.actions.actions.overdueRule[index].task[1] = '';
      }
      if (val) {
        var index = this.actionOverDues.findIndex(
          std => std.machineValue === val
        );
        let overdueObj = {
          value: this.actionOverDues[index].value,
          machineValue: this.actionOverDues[index].machineValue
        };
        this.actions.actions.overdueRule[0].type = overdueObj;
        this.indexOfSubType = index;
      }
    },
    setSubOfSubTypeVal(
      subValue,
      indexOfSubType,
      indexOfSubOfSubType,
      index,
      isEditable,
      isUserType
    ) {
      if (subValue && isUserType) {
        // For subtype user
        var ind = this.actionOverDues[indexOfSubType].subOptions[
          indexOfSubOfSubType
        ].subTypes.findIndex(std => std.id === subValue);

        var overdueObj = {
          value: this.actionOverDues[indexOfSubType].subOptions[
            indexOfSubOfSubType
          ].subTypes[ind].value,
          machineValue: this.actionOverDues[indexOfSubType].subOptions[
            indexOfSubOfSubType
          ].subTypes[ind].id
        };
      } else {
        // For subtype role
        var ind = this.actionOverDues[indexOfSubType].subOptions[
          indexOfSubOfSubType
        ].subTypes.findIndex(std => std.machineValue === subValue);

        var overdueObj = {
          value: this.actionOverDues[indexOfSubType].subOptions[
            indexOfSubOfSubType
          ].subTypes[ind].value,
          machineValue: this.actionOverDues[indexOfSubType].subOptions[
            indexOfSubOfSubType
          ].subTypes[ind].machineValue
        };
      }
      this.actions.actions.overdueRule[index].task[1] = overdueObj;
    },

    // this function is used to update the selected subOption of onOverdue, and also used to find the index of selected subtoption index.
    setSubOfSubType(subValue, indexOfSubType, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.overdueRule[index].task &&
          this.actions.actions.overdueRule[index].task[1]
        )
          this.actions.actions.overdueRule[index].task[1] = '';
      }

      if (subValue) {
        const obj = this.actionOverDues[indexOfSubType].subOptions.findIndex(
          item => {
            return item.machineValue === subValue;
          }
        );
        let valObj = {
          value: this.actionOverDues[indexOfSubType].subOptions[obj].value,
          machineValue: this.actionOverDues[indexOfSubType].subOptions[obj]
            .machineValue
        };
        this.actions.actions.overdueRule[index].task[0] = valObj;
        this.indexOfSubOfSubType = obj;
      }
    },
    setSubTypeValueForAction(
      SubOptionValue,
      sValue,
      sTValue,
      index,
      isEditable,
      isUserType
    ) {
      if (SubOptionValue != '' && isUserType) {
        var ob = this.actionCompletion[sValue].subOptions[
          sTValue
        ].subTypes.findIndex(item => {
          return item.id === SubOptionValue;
        });

        var valObj = {
          value: this.actionCompletion[sValue].subOptions[sTValue].subTypes[ob]
            .value,
          machineValue: this.actionCompletion[sValue].subOptions[sTValue]
            .subTypes[ob].id
        };
      } else {
        var ob = this.actionCompletion[sValue].subOptions[
          sTValue
        ].subTypes.findIndex(item => {
          return item.machineValue === SubOptionValue;
        });

        var valObj = {
          value: this.actionCompletion[sValue].subOptions[sTValue].subTypes[ob]
            .value,
          machineValue: this.actionCompletion[sValue].subOptions[sTValue]
            .subTypes[ob].machineValue
        };
      }
      this.actions.actions.completionRule[index].task[1] = valObj;
      this.actions.actions.completionRule[index].subTypeVal = ob;
      this.indexOfSubOfSubTypeOfCompletion = ob;
    },

    // this function is used to update the subOption of onComplete row and use to find the index value of selected onComplete subOption, which we used further to display subOption of Selected SubOption.
    setSubTypeForAction(SubOptionValue, sValue, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.completionRule[index].task &&
          this.actions.actions.completionRule[index].task[1]
        )
          this.actions.actions.completionRule[index].task[1] = '';
      }
      if (SubOptionValue != '') {
        const ob = this.actionCompletion[sValue].subOptions.findIndex(item => {
          return item.machineValue === SubOptionValue;
        });
        let valObj = {
          value: this.actionCompletion[sValue].subOptions[ob].value,
          machineValue: this.actionCompletion[sValue].subOptions[ob]
            .machineValue
        };
        this.actions.actions.completionRule[index].task[0] = valObj;
        this.actions.actions.completionRule[index].subTypeVal = ob;
        this.indexOfSubOfSubTypeOfCompletion = ob;
      }
    },

    RemoveOverDue(val) {
      this.actions.actions.overdueRule.splice(val, 1);
    },
    // OnSaveButtonClick
    async onClickSaveButton() {
      /* This Filter function is used for elimination the null and empty values from the array     */
      const success = await this.$refs.automationRuleForm.validate();
      if (success) {
        this.actions.actions.completionRule.forEach(val => {
          val.task = val.task.filter(function(el) {
            return el != '';
          });
        });

        this.actions.actions.overdueRule.forEach(val => {
          val.task = val.task.filter(function(el) {
            return el != '';
          });
        });

        this.actions.triggerEvent.task = this.actions.triggerEvent.task.filter(
          function(el) {
            return el != '';
          }
        );

        if (this.copyRule) {
          this.actions.name = 'Copy- ' + this.actions.name;
        }
        let data = this.actions;
        data.actions.completionRule.forEach(item => {
          delete item.subTypeVal;
          delete item.typeVal;
        });
        // delete data.actions.completionRule[0].typeVal;
        // delete data.actions.completionRule[0].subTypeVal;
        const param = {
          machineValue: this.workflowActionItem,
          data: data
        };

        await this.addWorkflowAction(param);
        this.addDefaultActionDialogBox = false;
        this.getAllWorkFlow(this.claimType);
        this.copyRule = false;
        this.editDefaultActionItem = false;

        /*  Clearing the form     */
        (this.workflowActionItem = ''),
          (this.actions = {
            name: '',

            isEnabled: false,
            triggerEvent: {
              type: {
                value: '',
                machineValue: ''
              },
              task: []
            },
            assignedTo: [
              {
                type: '',
                name: '',
                id: ''
              }
            ],
            actions: {
              completionRule: [
                {
                  type: '',
                  task: []
                }
              ],
              overdueRule: [
                {
                  type: '',
                  task: []
                }
              ]
            },
            due: {
              interval: 0,
              unit: 'days'
            },
            notes: ''
          });
      }
    },

    //on Edit Button For Action Item
    async onClickEditSaveButton() {
      const success = await this.$refs.automationRuleForm.validate();
      if (success) {
        const payload = {
          id: this.editedActionItemID,
          workflowID: this.workflowActionItem,
          attributes: {
            name: this.actions.name,
            triggerEvent: {
              type: this.actions.triggerEvent.type,
              task: this.actions.triggerEvent.task
            },
            assignedTo: [
              {
                type: this.actions.assignedTo[0].type,
                name: this.actions.assignedTo[0].name,
                id: this.actions.assignedTo[0].id,
                machineValue: this.actions.assignedTo[0].machineValue
              }
            ],
            actions: {
              completionRule: [
                {
                  type: this.actions.actions.completionRule[0].type,
                  task: this.actions.actions.completionRule[0].task
                }
              ],
              overdueRule: [
                {
                  type: this.actions.actions.overdueRule[0].type,
                  task: this.actions.actions.overdueRule[0].task
                }
              ]
            },
            due: {
              interval: this.actions.due.interval,
              unit: this.actions.due.unit
            },
            notes: this.actions.notes
          }
        };
        this.enabledDisabledByEditCopy = {
          isEnabled: this.actions.isEnabled,
          machineValue: this.editedRule.machineValue,
          workflowID: this.editedRule.workflow.machineValue
        };
        this.toActionItemToggleSwitch(this.enabledDisabledByEditCopy);
        await this.editAdminActionItem(payload);
        this.editDefaultActionItem = false;
        this.editedActionItemID = '';
        this.editedRule = {};
        this.enabledDisabledByEditCopy = {};
        this.addDefaultActionDialogBox = false;
        this.getAllWorkFlow(this.claimType);
        /*  Clearing the form     */

        this.actions = {
          name: '',
          isEnabled: false,
          triggerEvent: {
            type: {
              value: '',
              machineValue: ''
            },
            task: [{ value: '', machineValue: '' }]
          },

          assignedTo: [
            {
              type: '',
              name: '',
              id: '',
              machineValue: ''
            }
          ],
          actions: {
            completionRule: [
              {
                type: '',
                task: []
              }
            ],
            overdueRule: [
              {
                type: '',
                task: []
              }
            ]
          },
          due: {
            interval: 0,
            unit: 'days'
          },
          notes: ''
        };
      }
    },

    // Remove Completion Multiple Values
    removeCompletionAction(val) {
      this.actions.actions.completionRule.splice(val, 1);
      this.actionCompletionRuleType.splice(val, 1);
      this.actionCompletionRuleSubType.splice(val, 1);
      this.actionCompletionRuleSubValueType.splice(val, 1);
    },

    addAnotherOnClick() {
      this.actions.actions.completionRule.push({
        typeVal: '',
        subTypeVal: '',
        type: '',
        task: []
      });
    },
    addMoreOverDue() {
      this.actions.actions.overdueRule.push({
        type: '',
        task: []
      });
    },

    // this function is used to update the subOptions of onComplete option and also used to get the index of seleted onComplete action.
    setSubTypeOfAction(val, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.completionRule[index].task &&
          this.actions.actions.completionRule[index].task[0]
        )
          this.actions.actions.completionRule[index].task[0] = '';
        if (
          this.actions.actions.completionRule[index].task &&
          this.actions.actions.completionRule[index].task[1]
        )
          this.actions.actions.completionRule[index].task[1] = '';
      }
      if (val) {
        var indexOfCompletionAction = this.actionCompletion.findIndex(
          std => std.machineValue === val
        );
        let actionCompletionObj = {
          value: this.actionCompletion[indexOfCompletionAction].value,
          machineValue: this.actionCompletion[indexOfCompletionAction]
            .machineValue
        };
        this.actions.actions.completionRule[index].type = actionCompletionObj;
        this.actions.actions.completionRule[
          index
        ].typeVal = indexOfCompletionAction;
        //this.indexOfSubTypeOfCompletion = indexOfCompletionAction;
      }
    }
  },

  async created() {
    this.getAllUsers();
    this.getAllConfigurationTableData({ name: 'phone_types' });
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
    this.getWorkflowAction();
    this.claimType = ['claim_new_claim', 'claim_estimation'];
    await this.claimActionItem(this.claimType);
  }
};
</script>
<style lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 80%;
}

tr:nth-child(even) {
  background-color: $grey-3 !important;
}

th {
  background: lightgray;
  border: 1px solid #ccc;
}
table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
}
table {
  border-collapse: collapse;
  width: 99.9%;
}
td {
  padding: 8px 16px;
  border: 1px solid #ccc;
}
.action-item-table {
  width: 100%;
  overflow: auto;
}
.table-th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f9e7d8;
  color: white;
}
.table-th1 {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f9e7d8;
  color: white;
}

.table-th,
.table-td {
  text-align: center;
  padding: 12px;
}

.table-tr:nth-child(odd) {
  background-color: white;
}
.table-tr:nth-child(even) {
  background-color: $grey-3;
}
.table-data {
  width: 33.33%;
  text-align: center;
}
</style>
