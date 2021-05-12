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
        <div class="row" flat bordered>
          <!-- Main Template -->
          <q-tab-panels
            class="q-ml-xl mobile-container-page-without-search full-width"
            v-model="tab"
            animated
            vertical
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="accountSummary">
              <q-card class="q-pa-lg" flat bordered>
                <div class="row justify-between">
                  <div class="text-h5">Account Summary</div>
                  <div class="text-h5">
                    <q-icon
                      name="create"
                      color="primary"
                      @click="onEditClick"
                    />
                  </div>
                </div>

                <div class="row q-mt-lg text-bold">
                  <div class="col">Company Name</div>
                  <div class="col">Company Address</div>
                  <div class="col">Company Mobile</div>
                  <div class="col">Postal Company Code</div>
                </div>
                <q-separator />
                <div class="row q-mt-xs">
                  <!-- {{ user }} -->
                  <div class="col-3 column  ">
                    {{ user.name }}
                  </div>
                  <div class="col-3">
                    <div class="q-mr-md  " v-if="user.mailingAddress">
                      {{
                        user.mailingAddress.streetAddress
                          ? user.mailingAddress.streetAddress
                          : '-'
                      }},{{
                        user.mailingAddress.addressRegion
                          ? user.mailingAddress.addressRegion
                          : '-'
                      }},{{
                        user.mailingAddress.addressLocality
                          ? user.mailingAddress.addressLocality
                          : '-'
                      }}
                      ,
                      {{
                        user.mailingAddress.addressCountry
                          ? user.mailingAddress.addressCountry
                          : '-'
                      }},{{
                        user.mailingAddress.postalCode
                          ? user.mailingAddress.postalCode
                          : '-'
                      }}
                    </div>
                  </div>
                  <div class="col">
                    {{
                      user.phoneNumber.number ? user.phoneNumber.number : '-'
                    }}
                  </div>
                  <div class="col">
                    {{
                      user.mailingAddress.postalCode
                        ? user.mailingAddress.postalCode
                        : '-'
                    }}
                  </div>
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
              <q-card class="q-pa-lg" flat bordered>
                <div class="text-h6 text-bold">Claim Action Item</div>
                <div class="row">
                  <q-btn
                    color="primary"
                    label="+ Add Default Action "
                    @click="addDefaultActionDialogBox = true"
                    :disable="claimType == ''"
                  />
                  <!-- <q-btn
                    class="q-ml-sm"
                    color="primary"
                    label="Refresh "
                    @click=""
                    :disable="claimType == ''"
                  />
                  <q-btn
                    class="q-ml-sm"
                    color="primary"
                    label="Clone Workflow "
                    @click=""
                    :disable="claimType == ''"
                  />
                  <q-btn
                    class="q-ml-sm"
                    color="primary"
                    label="Delete Workflow "
                    @click=""
                    :disable="claimType == ''"
                  />
                  <q-btn
                    class="q-ml-sm"
                    color="primary"
                    label="Planning Sheet "
                    @click=""
                    :disable="claimType == ''"
                  /> -->
                </div>

                <q-card class="q-my-md" scroll flat bordered>
                  <div
                    class="row bg-grey-3 q-px-md"
                    style="align-items: center"
                  >
                    <div class="q-pa-lg" v-if="claimType">
                      {{ allAction.length }} Action Items
                    </div>
                    <div class="" v-else>Please Select Action Items</div>

                    <div class="text-h6 q-ml-auto q-mr-lg">Workflow</div>

                    <q-select
                      dense
                      class="q-py-sm input-extra-padding"
                      outlined
                      options-dense
                      behavior="menu"
                      v-model="claimType"
                      option-value="machineValue"
                      option-label="value"
                      :options="workflowAction"
                      @input="claimActionItem(claimType)"
                      map-options
                      emit-value
                    />
                  </div>
                  <div class="q-pa-lg" style="height: 350px; overflow: auto">
                    <div v-for="index in allAction" class="row q-pb-md">
                      <div class="col-11">
                        <div class="text-blue">
                          {{ index.name ? index.name : '-' }}
                        </div>
                        <div>
                          {{ index.createdDesc ? index.createdDesc : '-' }}
                        </div>
                      </div>

                      <div class="col-1 row text-h6">
                        <q-icon size="sm" color="primary" name="create" />
                      </div>
                    </div>
                  </div>
                </q-card>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
    <!-- Dialog For user Data -->
    <q-dialog
      v-model="editUserInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 40%; height: 75vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="q-px-xs text-bold text-white">Edit User Info</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div style="height: calc(100% - 140px); overflow: auto" class="q-pa-md">
          <q-form ref="addUserForm" class="q-pa-md">
            <div class=" q-mt-xs ">
              <q-card class="q-mx-md q-pa-sm q-mb-sm">
                <div class="row  full-width">
                  <q-input
                    v-model="users.fname"
                    dense
                    class="q-mx-md col-5 input-extra-padding"
                    outlined
                    label="First name"
                  />

                  <q-input
                    dense
                    v-model="users.lname"
                    class="q-mx-md col-5 input-extra-padding"
                    outlined
                    label="Last name"
                  />
                </div>
                <div class="row">
                  <q-select
                    dense
                    v-model="users.contact.type"
                    class="q-mx-md col-5 input-extra-padding"
                    :options="contactTypes"
                    option-value="machineValue"
                    option-label="name"
                    map-options
                    outlined
                    options-dense
                    behavior="menu"
                    label="Type"
                    emit-value
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select phone type'
                    ]"
                  />
                  <q-input
                    dense
                    v-model="users.contact.number"
                    outlined
                    class="q-mx-md required col-5 input-extra-padding"
                    label="Phone"
                    mask="(###) ###-####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length == 14) || 'Please enter phone number'
                    ]"
                  />
                </div>
                <div class="row">
                  <q-input
                    dense
                    v-model="users.email"
                    style="width:270px;"
                    label="Email"
                    class="q-mx-md  col-5 required"
                    outlined
                    lazy-rules
                    :rules="[
                      val =>
                        validateEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                  />
                  <q-select
                    dense
                    outlined
                    filled
                    options-dense
                    class="q-mx-md col-5 input-extra-padding required"
                    v-model="selectedRole"
                    :options="userRole"
                    label="Role"
                    color="primary"
                    behavior="menu"
                    options-selected-class="text-deep-orange"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please enter the user role!'
                    ]"
                  >
                    <template v-slot:option="scope">
                      <q-expansion-item
                        expand-separator
                        group="somegroup"
                        :default-opened="hasChild(scope)"
                        header-class="text-weight-bold"
                        :label="scope.opt.label"
                      >
                        <template v-for="child in scope.opt.children">
                          <q-item
                            :key="child.label"
                            clickable
                            v-ripple
                            v-close-popup
                            @click="selectedRole = child.label"
                            :class="{
                              'bg-light-oragne-1': selectedRole === child.label
                            }"
                          >
                            <q-item-section>
                              <q-item-label
                                v-html="child.label"
                                class="q-ml-md"
                              ></q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-expansion-item>
                    </template>
                  </q-select>
                </div>
              </q-card>
              <q-card class="q-mx-md q-pa-sm">
                <AutoCompleteAddress
                  :id="'AddVendor'"
                  :address="users.mailingAddress"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                  :value="true"
                />
              </q-card>
            </div>
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class="align-content-center col-2 q-my-lg"
            @click="onSaveEditedButton"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Dialog Box for Adding Action Items -->
    <q-dialog v-model="addDefaultActionDialogBox" persistent>
      <q-card style="width: 60%; height: 88vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="q-px-xs text-bold text-white">Add Action Item</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div style="height: calc(100% - 140px); overflow: auto" class="q-pa-md">
          <div class="row full-width">
            <div class="q-pa-sm text-bold">Action Item :</div>
            <q-input
              dense
              v-model="actions.name"
              class="q-mx-md"
              style="width: 200px"
              outlined
            />
            <div class="q-pa-md text-bold">Enabled :</div>
            <q-toggle v-model="actions.isEnabled" left-label class="q-mt-xs" />
            <q-badge color="primary" dense style="margin: auto 10px">{{
              actions.isEnabled ? 'Enable' : 'Disable'
            }}</q-badge>
          </div>

          <!-- second -->
          <div class="row q-mt-md full-width">
            <div class="q-pa-sm text-bold">Created When :</div>
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
              style="width: 250px"
            />

            <div class="col-2-1 q-ml-xs" v-if="actions.createWhen.type">
              <q-select
                dense
                class="col-3 input-extra-padding"
                outlined
                options-dense
                behavior="menu"
                v-model="actions.createWhen.task[0]"
                option-label="value"
                option-value="machineValue"
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
              <div class="q-pa-sm text-bold">
                Default Priority <span class="text-red">*</span> :
              </div>
            </div>
            <div class="col-4">
              <q-toggle v-model="priority" left-label @input="TogglePriority" />
              <q-badge color="primary" v-if="priority == true">High</q-badge>
              <q-badge v-else color="primary">Low</q-badge>
            </div>

            <div class="col-1-1 row">
              <div class="q-py-sm text-bold">Assign To :</div>
              <div class="q-ml-sm q-pt-sm text-bold">
                <q-badge color="primary" label="Select" @click="" />
              </div>
            </div>
          </div>
          <div class="row q-mt-md full-width">
            <div class="q-pa-sm text-bold">Due Date :</div>
            <div class="text-grey-9 text-bold q-pa-sm">Task will be Due</div>

            <q-input
              dense
              v-model.number="actions.due.interval"
              class="q-mx-sm"
              outlined
              placeholder="Day"
              style="width: 50px"
            />

            <q-select
              dense
              class="q-mx-sm"
              outlined
              options-dense
              v-model="actions.due.type"
              behavior="menu"
              option-value="options"
              :options="dueDays"
              label="Type"
              style="width: 200px"
            />

            <div class="q-pa-sm text-grey-9 text-bold">
              days after it is created
            </div>
          </div>

          <div class="row q-mt-md full-width">
            <q-card
              class="q-pa-sm q-pl-xl text-bold"
              style="letter-spacing: 1px; width: 100%"
              flat
              bordered
            >
              Note : Actions are executed in the order specified
            </q-card>
          </div>
          <div
            v-for="(val, index) in actions.actions.onComplete"
            v-if="actions.actions.onComplete.length > 0"
            class="row q-mt-md full-width"
          >
            <div class="col-1-1">
              <div class="q-pa-sm text-bold" v-if="index == 0">
                Completion Action :
              </div>
              <div class="q-pa-sm text-bold" v-else style="visibility: hidden">
                Completion Action :
              </div>
            </div>
            <div>
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
                style="width: 200px"
              />
            </div>

            <div class="q-ml-xs" v-if="actions.actions.onComplete[index].type">
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
                style="width: 200px"
              />
            </div>
            <div
              class="q-ml-xs"
              v-if="actions.actions.onComplete[index].task[0]"
            >
              <q-select
                dense
                class="input-extra-padding"
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
                style="width: 200px"
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
              <div class="q-pa-sm text-bold" v-if="index == 0">
                OverDue Action:
              </div>
              <div class="q-pa-sm text-bold" v-else style="visibility: hidden">
                OverDue Action:
              </div>
            </div>

            <div class="q-ml-lg">
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
                style="width: 200px"
              />
            </div>

            <div class="q-ml-xs" v-if="actions.actions.onOverdue[index].type">
              <q-select
                class="input-extra-padding"
                outlined
                dense
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
                style="width: 200px"
              />
            </div>

            <div
              class="q-ml-xs"
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
                style="width: 200px"
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
            <div class="">
              <div class="q-pa-sm text-bold">Notes/Instruction:</div>
            </div>
            <div class="q-ml-md col-5">
              <textarea v-model="actions.notes" rows="4" style="width: 100%" />
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
import { validateEmail } from '@utils/validation';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  name: 'Admin',
  components: { SubSideBar, AutoCompleteAddress },

  data() {
    return {
      userId: '',
      editUserInfoDialog: false,
      priority: false,
      selectedRole: '',
      userRole: [
        {
          label: 'Paid',
          children: []
        },
        {
          label: 'Un-paid',
          children: []
        }
      ],
      selectedRole: '',
      users: {
        fname: '',
        lname: '',
        contact: {
          type: 'main',
          number: ''
        },
        email: '',
        roles: [],
        mailingAddress: {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        }
      },

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

      claimType: '',

      indexOfActionReason: '',
      indexOfSubTypeOfCompletion: '',
      indexOfSubOfSubTypeOfCompletion: '',

      indexOfSubType: 0,
      indexOfSubTypeForComp: '',
      indexOfSubOfSubType: 0,

      addDefaultActionDialogBox: false,
      model: null,
      dueDays: ['Bussiness', 'Calendar'],
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
      'allAction',
      'contactTypes',
      'roleTypes'
    ])
  },
  watch: {
    selectedRole(newVal, oldVal) {
      if (newVal) {
        var user = this.roleTypes.find(o => o.name === newVal);
        this.users.roles[0] = user.machineValue;
      }
    }
  },
  methods: {
    ...mapActions([
      'getActionOverDues',
      'getActionCompletion',
      'getActionReasons',
      'getWorkflowAction',
      'getAllWorkFlow',
      'addWorkflowAction',
      'getContactTypes',
      'editUserInfo',
      'getUserInfo',
      'removeCurrentUser',
      'getRoles'
    ]),
    validateEmail,

    async onSaveEditedButton() {
      const success = await this.$refs.addUserForm.validate();
      if (success) {
        this.editUserInfoDialog = false;
        const payload = {
          id: this.userId,
          data: {
            contact: {
              fname: this.users.fname,
              lname: this.users.lname
            },
            email: this.users.email,
            role: this.users.roles,
            mailingAddress: this.users.mailingAddress,
            phoneNumber: {
              type: this.users.contact.type,
              number: this.users.contact.number
            }
          }
        };
        await this.editUserInfo(payload);
        await this.removeCurrentUser();
        await this.getUserInfo();
        this.user = getCurrentUser().attributes;
        this.users.fname = this.user.contact.fname;
        this.users.lname = this.user.contact.lname;
        this.users.contact.type = this.user.phoneNumber.type;
        this.users.contact.number = this.user.phoneNumber.number;
        this.users.email = this.user.email;
        this.users.mailingAddress = this.user.mailingAddress;
      }
    },
    hasChild(scope) {
      return scope.opt.children.some(c => c.label === this.selectedRole);
    },
    // For Api Calling
    async claimActionItem(mValue) {
      this.claimType = mValue;
      await this.getAllWorkFlow(this.claimType);
      await this.getActionReasons(this.claimType);
      await this.getActionOverDues(this.claimType);
      await this.getActionCompletion(this.claimType);
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

    onEditClick() {
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      this.users.contact.type = this.user.phoneNumber.type;
      this.users.contact.number = this.user.phoneNumber.number;
      this.users.email = this.user.email;
      this.users.mailingAddress = this.user.mailingAddress;
      this.editUserInfoDialog = true;
    },
    // Action OverDue Sub Dropdown Index set

    setSubType(val, index) {
      this.actions.actions.onOverdue[
        index
      ].task[0] = this.actions.actions.onOverdue[index].task[1] = '';

      var index = this.actionOverDues.findIndex(
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
      const param = { machineValue: this.claimType, data: this.actions };
      await this.addWorkflowAction(param);
      this.addDefaultActionDialogBox = false;
      this.getAllWorkFlow(this.claimType);
      this.actions = {
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
      };
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

  async created() {
    this.getContactTypes();
    this.tab = 'accountSummary';
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
    this.getWorkflowAction();
    this.claimType = 'claim_new_claim';
    await this.claimActionItem(this.claimType);
    this.getRoles().then(async () => {
      this.roleTypes.forEach(val => {
        if (val.isPaid) {
          this.userRole[0].children.push({
            label: val.name,
            value: val.machineValue
          });
        } else {
          this.userRole[1].children.push({
            label: val.name,
            value: val.machineValue
          });
        }
      });
    });
  }
};
</script>
<style lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 80%;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
