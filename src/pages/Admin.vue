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
                  <div class="col">Name</div>
                  <div class="col">Address</div>
                  <div class="col">Mobile</div>
                  <div class="col">Postal Code</div>
                </div>
                <q-separator />
                <div class="row q-mt-xs">
                  <!-- {{ user }} -->
                  <div class="col-3 column">
                    {{ user.name }}
                  </div>
                  <div class="col-3">
                    <div class="q-mr-md" v-if="user.mailingAddress">
                      <div>
                        {{
                          user.mailingAddress.address1
                            ? user.mailingAddress.address1
                            : '-'
                        }}
                      </div>
                      <div>
                        {{
                          user.mailingAddress.address2
                            ? user.mailingAddress.address2
                            : '-'
                        }}
                      </div>
                      <div>
                        {{
                          user.mailingAddress.addressLocality
                            ? user.mailingAddress.addressLocality
                            : '-'
                        }}{{
                          user.mailingAddress.addressRegion
                            ? toGetStateShortName(
                                user.mailingAddress.addressRegion
                              )
                            : '-'
                        }}
                        {{
                          user.mailingAddress.postalCode
                            ? user.mailingAddress.postalCode
                            : '-'
                        }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="col clickable text-primary"
                    @click="onPhoneNumberClick(user.phoneNumber.number, $event)"
                  >
                    {{
                      user.phoneNumber.number
                        ? showPhoneNumber(user.phoneNumber.number)
                        : '-'
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
                  <div class="col">Administrator Email</div>
                </div>
                <q-separator />
                <div class="row q-mt-xs">
                  <div
                    class="col clickable text-primary"
                    @click="onEmailClick(user.email, $event)"
                  >
                    {{ user.email }}
                  </div>
                </div>
              </q-card>
              <q-card class="q-pa-lg q-mt-lg" flat bordered>
                <div class="row justify-between">
                  <div class="text-h5">Company Details</div>
                  <div class="text-h5">
                    <q-icon
                      name="create"
                      color="primary"
                      @click="onEditClickOrganization"
                    />
                  </div>
                </div>

                <div class="row q-mt-lg text-bold">
                  <div class="col">Company Name</div>
                  <div class="col">Company Address</div>
                  <div class="col">Company website</div>

                  <div class="col">Postal Company Code</div>
                </div>
                <q-separator />

                <div class="row q-mt-xs">
                  <div class="col-3 column">
                    {{ organization.name }}
                  </div>
                  <div class="col-3">
                    <div
                      class="q-mr-md"
                      v-if="
                        organization.billingInfo &&
                          organization.billingInfo.address
                      "
                    >
                      <div>
                        {{
                          organization.billingInfo.address.address1
                            ? organization.billingInfo.address.address1
                            : '-'
                        }}
                      </div>
                      <div>
                        {{
                          organization.billingInfo.address.address2
                            ? organization.billingInfo.address.address2
                            : '-'
                        }}
                      </div>
                      <div>
                        {{
                          organization.billingInfo.address.addressLocality
                            ? organization.billingInfo.address.addressLocality
                            : '-'
                        }},{{
                          organization.billingInfo.address.addressRegion
                            ? toGetStateShortName(
                                organization.billingInfo.address.addressRegion
                              )
                            : '-'
                        }}

                        {{
                          organization.billingInfo.address.postalCode
                            ? organization.billingInfo.address.postalCode
                            : '-'
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="col ">
                    {{ organization.website ? organization.website : '-' }}
                  </div>
                  <div class="col">
                    {{
                      organization.billingInfo &&
                      organization.billingInfo.address.postalCode
                        ? organization.billingInfo.address.postalCode
                        : '-'
                    }}
                  </div>
                </div>

                <div class="row q-mt-xl text-bold">
                  <div class="col">Company Administrator</div>
                  <div class="col">Photo ID Email</div>
                  <div class="col">Photo ID Api Key</div>
                </div>
                <q-separator />
                <div class="row q-mt-xs">
                  <div class="col">
                    {{ organization.name }}
                  </div>
                  <div
                    class="col clickable text-primary"
                    @click="onEmailClick(user.email, $event)"
                  >
                    {{
                      organization.photoIDEmail
                        ? organization.photoIDEmail
                        : '-'
                    }}
                  </div>
                  <div class="col text-primary">
                    {{
                      organization.photoIDAPIKey
                        ? organization.photoIDAPIKey
                        : '-'
                    }}
                  </div>
                </div>
              </q-card>
              <q-card class="q-pa-lg q-mt-lg" flat bordered>
                <div class="row ">
                  <div class="text-weight-bold text-h5">Plan:</div>
                  <div class="text-h5">Platinum</div>
                </div>
                <div
                  class="row 
                 "
                >
                  <div class="text-body1 text-weight-bold">Paid Users-</div>
                  <div class="text-body1 ">{{ organization.paidUsers }}</div>

                  <div class="text-body1 text-weight-bold  q-pl-xl">
                    Unpaid Users-
                  </div>
                  <div class="text-body1 ">{{ organization.nonPaidUsers }}</div>
                </div>

                <!--table for paid /unpaid users-->
                <div class="q-pa-md">
                  <table>
                    <thead>
                      <tr class="text-bold text-h6 text-white">
                        <th class="bg-primary text-white" style="width: 600px">
                          Paid Users
                        </th>
                        <th class="bg-primary text-white" style="width: 600px">
                          UnPaid Users
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="paidUnpaid in paidUnpaidUserList">
                        <td class="text-center">
                          {{ paidUnpaid.paidUserName }}
                        </td>
                        <td class="text-center">
                          {{ paidUnpaid.unPaidUserName }}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- <q-table
                    :data="data"
                    :columns="columns"
                    row-key="name"
                  /> -->
                </div>
              </q-card>
            </q-tab-panel>
            <q-tab-panel name="groupPermission" class="q-pa-none">
              <div class="row">
                <div class="col">
                  <table>
                    <thead>
                      <tr>
                        <div
                          style="
                          height: 50px;
                         border: 1px solid #ccc;
                          font-size: 15px;
                         overflow: auto;
                        position: sticky;
                        top: 0;
                     z-index: 10;
      
                        "
                          class="text-center bg-white"
                        >
                          <div class="q-mt-sm text-bold" style="height: 30px;">
                            Permission/Role
                          </div>
                        </div>

                        <th
                          v-for="(user, index) in arrOfRoles"
                          style="height: 30px;"
                        >
                          <div style="height:45px;width:100px;">
                            {{ user.value.name }}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tr v-for="(us, ind) in permissions">
                      <th
                        style="height: 40px; font-size: 10px;font-weight:normal;text-align: left;"
                      >
                        <span class="q-ml-sm">{{ us.name }}</span>
                      </th>
                      <td align="center" v-for="(user, index) in arrOfRoles">
                        <div
                          style="height: 40px;"
                          v-if="
                            user.value.permission != null &&
                              checkPermission(
                                permissions[ind].machineValue,
                                user.machineValue,
                                index
                              )
                          "
                        >
                          <q-icon
                            color="primary  q-mt-sm"
                            name="check_circle"
                            size="sm"
                            @click="rolePermission(ind, index, 'selected')"
                          />
                        </div>
                        <div v-else style="height: 40px;">
                          <q-icon
                            color="primary q-mt-sm"
                            name=" radio_button_unchecked"
                            size="sm"
                            @click="rolePermission(ind, index, 'unselected')"
                          />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
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
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 40%; height: 75vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="q-px-xs text-bold text-white">Edit Account Summary</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div style="height: calc(100% - 140px); overflow: auto" class="q-pa-md">
          <q-form ref="addUserForm" class="q-pa-md">
            <div class="q-mt-xs">
              <q-card class="q-mx-md q-pa-sm q-mb-sm">
                <div class="row full-width">
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
                        (val && val.length == 14) ||
                        'Please enter phhone number'
                    ]"
                  />
                </div>
                <div class="row">
                  <q-input
                    dense
                    disable
                    v-model="users.email"
                    style=""
                    label="Email"
                    class="q-mx-md col-5 required"
                    outlined
                    lazy-rules
                    :rules="[
                      val =>
                        validateEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                  />
                </div>
              </q-card>
              <q-card class="q-mx-md q-pa-sm">
                <AutoCompleteAddress
                  :id="'AddVendor'"
                  :address="users.mailingAddress"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                  :value="true"
                  :view="'web'"
                />
              </q-card>
            </div>
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class="single-next-button-style col-6 q-my-lg"
            @click="onSaveEditedButton"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- editing organization info dialog -->
    <q-dialog
      v-model="editOrganizsationInfoDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 40%; height: 75vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="q-px-xs text-bold text-white">
            Edit Organization Summary
          </div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div style="height: calc(100% - 140px); overflow: auto" class="q-pa-md">
          <q-form ref="addUserFormOrganization" class="q-pa-md">
            <div class="q-mt-xs">
              <q-card class="q-mx-md q-pa-sm q-mb-sm">
                <div class="row full-width">
                  <q-input
                    v-model="organizations.users.fname"
                    dense
                    class="q-mx-md col-5 input-extra-padding"
                    outlined
                    label="First name"
                  />

                  <q-input
                    dense
                    v-model="organizations.users.lname"
                    class="q-mx-md col-5 input-extra-padding"
                    outlined
                    label="PhotoId Api key"
                  />
                </div>
                <div class="row">
                  <q-input
                    dense
                    v-model="organizations.users.email"
                    label="PhotoId  Email"
                    class="q-mx-md col-5 "
                    outlined
                    lazy-rules
                  />
                </div>
              </q-card>
              <q-card class="q-mx-md q-pa-sm">
                <AutoCompleteAddress
                  :id="'AddVendor'"
                  :address="organizations.users.mailingAddress"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                  :value="true"
                  :view="'web'"
                />
              </q-card>
            </div>
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class=" single-next-button-style col-6 q-my-lg"
            @click="onSaveEditedButtonOrganization"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Dialog Box for Adding Action Items -->
    <q-dialog v-model="addDefaultActionDialogBox">
      <q-card style="width: 60%; height: 88vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div class="q-px-xs text-bold text-white">Add Action Item</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div style="height: calc(100% - 140px); overflow: auto" class="q-pa-md">
          <q-form ref="addActionForm">
            <div class="row full-width">
              <div class="q-pa-sm text-bold">Action Item :</div>
              <q-input
                dense
                v-model="actions.name"
                class="q-mx-md"
                style="width: 200px"
                outlined
              />
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
                style="width: 26%"
              />

              <div
                class="q-ml-xs"
                v-if="
                  actions.createWhen.type &&
                    actionReason[indexOfActionReason].additionalReasons
                "
              >
                <q-select
                  dense
                  class="input-extra-padding"
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
                  style="width:220px"
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
            <div class="row q-pa-sm">
              <div class="q-py-md  text-bold">Enabled :</div>
              <q-toggle v-model="actions.isEnabled" left-label class="" />
              <q-badge color="primary" dense style="margin: auto 10px">{{
                actions.isEnabled ? 'Enable' : 'Disable'
              }}</q-badge>
              <div class="q-pa-md text-bold">
                Default Priority <span class="text-red">*</span> :
              </div>
              <div class="col-2 q-mt-xs">
                <q-toggle
                  v-model="priority"
                  left-label
                  @input="TogglePriority"
                />
                <q-badge color="primary" v-if="priority == true">High</q-badge>
                <q-badge v-else color="primary">Low</q-badge>
              </div>
            </div>

            <!-- 3 -->
            <div class="row q-mt-md full-width">
              <div class=" row q-pa-xs">
                <div class="q-py-sm text-bold">Assign To :</div>
                <div class="q-ml-sm  row   text-bold">
                  <q-select
                    dense
                    outlined
                    v-model="actions.assignedTo[0].type"
                    options-dense
                    behavior="menu"
                    option-label="value"
                    :options="assignTo"
                    @input="callAssignApi(actions.assignedTo[0].type)"
                    option-value="machineValue"
                    map-options
                    emit-value
                    label="Assign To"
                    class="input-extra-padding"
                    style="width: 200px"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select any category'
                    ]"
                  />

                  <q-select
                    v-if="actions.assignedTo[0].type"
                    v-model="actions.assignedTo[0].name"
                    dense
                    outlined
                    options-dense
                    behavior="menu"
                    option-label="name"
                    :options="assignToSubOption"
                    option-value="machineValue"
                    @input="setAssignTo(actions.assignedTo[0].name)"
                    map-options
                    emit-value
                    class=" q-ml-sm input-extra-padding"
                    style="width: 200px"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select any user '
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="q-py-sm  q-pl-xs text-bold">Due Date :</div>
            <div class="row q-pl-xs   full-width">
              <!-- <div class="q-pa-sm text-bold">Due Date :</div> -->
              <div class="text-grey-9 text-bold q-py-sm">Task will be Due</div>

              <q-input
                dense
                v-model.number="actions.due.interval"
                class="q-mx-sm"
                outlined
                placeholder="Day"
                style="width: 20%;"
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
                class="q-pa-sm q-pl-sm text-bold"
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
              <div>
                <div class="q-pa-sm text-bold" v-if="index == 0">
                  Completion Action :
                </div>
                <div
                  class="q-pa-sm text-bold"
                  v-else
                  style="visibility: hidden"
                >
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

              <div
                class="q-ml-xs"
                v-if="
                  actions.actions.onComplete[index].type &&
                    actionCompletion[indexOfSubTypeOfCompletion].subOptions
                "
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
                  style="width: 200px"
                />
              </div>
              <div
                class="q-ml-xs"
                v-if="
                  actions.actions.onComplete[index].task[0] &&
                  actionCompletion[indexOfSubTypeOfCompletion].subOptions
                    ? actionCompletion[indexOfSubTypeOfCompletion].subOptions[
                        indexOfSubOfSubTypeOfCompletion
                      ]
                      ? actionCompletion[indexOfSubTypeOfCompletion].subOptions[
                          indexOfSubOfSubTypeOfCompletion
                        ].subTypes.length > 0
                      : false
                    : false
                "
              >
                <q-select
                  v-if="actions.actions.onComplete[index].task[0] == 'user'"
                  dense
                  class="input-extra-padding"
                  outlined
                  v-model="actions.actions.onComplete[index].task[1]"
                  behavior="menu"
                  option-value="id"
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
                <q-select
                  v-else
                  dense
                  class="input-extra-padding"
                  outlined
                  v-model="actions.actions.onComplete[index].task[1]"
                  behavior="menu"
                  option-value="machineValue"
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
                  @click="addAnotherOnClick"
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
              <div>
                <div class="q-pa-sm text-bold" v-if="index == 0">
                  OverDue Action:
                </div>
                <div
                  class="q-pa-sm text-bold"
                  v-else
                  style="visibility: hidden"
                >
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

              <div
                class="q-ml-xs"
                v-if="
                  actions.actions.onOverdue[index].type &&
                    actionOverDues[indexOfSubType].subOptions
                "
              >
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
                v-if="
                  actions.actions.onOverdue[index].task[0] &&
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
                  v-if="actions.actions.onOverdue[index].task[0] == 'user'"
                  dense
                  class="col-3 input-extra-padding"
                  outlined
                  options-dense
                  v-model="actions.actions.onOverdue[index].task[1]"
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
                  style="width: 200px"
                />
                <q-select
                  v-else
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
                    actionOverDues[indexOfSubType].subOptions[
                      indexOfSubOfSubType
                    ].subTypes
                  "
                  label="Sub-options"
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
                <textarea
                  v-model="actions.notes"
                  rows="4"
                  style="width: 100%"
                />
              </div>
            </div>
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class="single-next-button-style col-6 q-my-lg"
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
import { toGetStateShortName } from '@utils/common';
import {
  onPhoneNumberClick,
  onEmailClick,
  showPhoneNumber,
  sendPhoneNumber
} from '@utils/clickable';
import { validateEmail } from '@utils/validation';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  name: 'Admin',
  components: { SubSideBar, AutoCompleteAddress },

  data() {
    return {
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
      newRole: { id: '', value: '', machine: '' },
      newPermission: '',
      rol: [],
      arrOfRoles: [],
      value: {},
      userId: '',
      editOrganizsationInfoDialog: false,
      editUserInfoDialog: false,
      priority: false,
      selectedRole: '',
      organizations: {
        users: {
          fname: '',
          lname: '',
          email: '',
          roles: [],
          mailingAddress: {
            houseNumber: '',
            addressLocality: '',
            addressRegion: '',
            postOfficeBoxNumber: '',
            postalCode: '',
            address1: '',
            address2: '',
            dropBox: {
              info: '',
              isPresent: false
            }
          }
        }
      },
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
          houseNumber: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          address1: '',
          address2: '',
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
            type: '',
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
      'roleTypes',
      'permissions',
      'organization',
      'allUsers',
      'paidUnpaidUserDetails'
    ])
  },

  methods: {
    toGetStateShortName,
    onPhoneNumberClick,
    onEmailClick,
    showPhoneNumber,

    ...mapActions([
      'getActionOverDues',
      'getActionCompletion',
      'getActionReasons',
      'getWorkflowAction',
      'getAllWorkFlow',
      'addWorkflowAction',
      'getContactTypes',
      'editUserInfo',
      'editUserProfile',
      'getUserInfo',
      'getAllUsers',
      'getRoles',
      'getPermissions',
      'setMultiplePermission',
      'getOrganization',
      'updateUserForOrganization'
    ]),
    validateEmail,

    async callAssignApi(val) {
      this.assignToSubOption = [];
      this.actions.assignedTo[0].name = '';
      this.assignee = val;
      if (val == 'user') {
        await this.getAllUsers();
        this.allUsers.forEach(user => {
          this.assignToSubOption.push({
            machineValue: user.name,
            name: user.name,
            id: user.id
          });
        });
      } else {
        await this.getRoles();
        this.roleTypes.forEach(user => {
          this.assignToSubOption.push({
            machineValue: user.machineValue,
            name: user.name,
            id: user.id
          });
        });
      }
    },
    setAssignTo(val) {
      if (this.assignee == 'user') {
        const obj = this.allUsers.find(item => {
          return item.name === val;
        });

        this.actions.assignedTo[0].id = obj.id;
      } else {
        const obj = this.roleTypes.find(item => {
          return item.machineValue === val;
        });
        this.actions.assignedTo[0].id = obj.id;
      }
    },

    async rolePermission(per, role, value) {
      if (value == 'unselected') {
        this.newPermission = this.permissions[per].machineValue;
        this.newRole.id = this.roleTypes[role].id;
        this.newRole.value = this.roleTypes[role].name;
        this.newRole.machineValue = this.roleTypes[role].machineValue;
        if (this.roleTypes[role].permission == null) {
          this.rol.push(this.newPermission);
        } else {
          this.rol = this.roleTypes[role].permission;
          this.rol.push(this.newPermission);
        }
        const payload = [
          {
            id: this.newRole.id,
            value: this.newRole.value,
            machineValue: this.newRole.machineValue,
            permissions: this.rol
          }
        ];
        this.setMultiplePermission(payload).then(async () => {
          this.arrOfRoles = [];
          await this.getRoles().then(async () => {
            this.roleTypes.forEach(val => {
              this.arrOfRoles.push({
                label: '',
                value: val
              });
            });
          });
        });
      } else {
        this.newPermission = this.permissions[per].machineValue;
        this.newRole.id = this.roleTypes[role].id;
        this.newRole.value = this.roleTypes[role].name;
        this.newRole.machineValue = this.roleTypes[role].machineValue;

        var index = this.roleTypes[role].permission.indexOf(this.newPermission);

        this.rol = this.roleTypes[role].permission;
        this.rol.splice(index, 1);
        const payload = [
          {
            id: this.newRole.id,
            value: this.newRole.value,
            machineValue: this.newRole.machineValue,
            permissions: this.rol
          }
        ];
        this.setMultiplePermission(payload).then(async () => {
          this.arrOfRoles = [];
          await this.getRoles().then(async () => {
            this.roleTypes.forEach(val => {
              this.arrOfRoles.push({
                label: '',
                value: val
              });
            });
          });
        });
      }

      this.tab = 'groupPermission';
    },
    checkPermission(val, role, index) {
      if (this.roleTypes[index].permission.includes(val)) {
        this.arrOfRoles[index].label = true;
        return true;
      }
      return false;
    },
    async onSaveEditedButtonOrganization() {
      const success = await this.$refs.addUserFormOrganization.validate();
      if (success) {
        this.editUserInfoDialog = false;
        const payload = {
          data: {
            name: this.organizations.users.fname,
            photoIDAPIKey: this.organizations.users.lname,

            photoIDEmail: this.organizations.users.email,
            billingInfo: {
              address: this.organizations.users.mailingAddress
            }
          }
        };
        await this.updateUserForOrganization(payload);
        await this.getOrganization();
        this.editOrganizsationInfoDialog = false;
      }
    },

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
            /**TODo */
            phoneNumber: {
              type: this.users.contact.type,
              number: sendPhoneNumber(this.users.contact.number)
            }
          }
        };
        // await this.editUserInfo(payload);
        await this.editUserProfile(payload);
        await this.getUserInfo();
        this.user = getCurrentUser().attributes;
        this.users.fname = this.user.contact.fname;
        this.users.lname = this.user.contact.lname;
        this.users.contact.type = this.user.phoneNumber.type;
        this.users.contact.number = showPhoneNumber(
          this.user.phoneNumber.number
        );
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
      this.users.contact.number = showPhoneNumber(this.user.phoneNumber.number);
      this.users.email = this.user.email;
      this.users.mailingAddress.addressRegion = this.user.mailingAddress.addressRegion;
      this.users.mailingAddress.addressLocality = this.user.mailingAddress.addressLocality;
      this.users.mailingAddress.houseNumber = this.user.mailingAddress.houseNumber;
      this.users.mailingAddress.address1 = this.user.mailingAddress.address1;
      this.users.mailingAddress.address2 = this.user.mailingAddress.address2;
      this.users.mailingAddress.postalCode = this.user.mailingAddress.postalCode;
      this.editUserInfoDialog = true;
    },
    onEditClickOrganization() {
      this.organizations.users.fname = this.organization.name;
      this.organizations.users.lname = this.organization.photoIDAPIKey;

      // this.organizations.users.contact.number = this.organization.website;
      this.organizations.users.email = this.organization.photoIDEmail;
      this.organizations.users.mailingAddress.addressRegion = this.organization.billingInfo.address.addressRegion;
      this.organizations.users.mailingAddress.addressLocality = this.organization.billingInfo.address.addressLocality;
      this.organizations.users.mailingAddress.houseNumber = this.organization.billingInfo.address.houseNumber;
      this.organizations.users.mailingAddress.address1 = this.organization.billingInfo.address.address1;
      this.organizations.users.mailingAddress.address2 = this.organization.billingInfo.address.address2;
      this.organizations.users.mailingAddress.postalCode = this.organization.billingInfo.address.postalCode;

      this.editOrganizsationInfoDialog = true;
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
      const success = await this.$refs.addActionForm.validate();
      if (success) {
        /* This Filter function is used for elimination the null and empty values from the array     */
        this.actions.actions.onComplete.forEach(val => {
          val.task = val.task.filter(function(el) {
            return el != '';
          });
        });

        this.actions.actions.onOverdue.forEach(val => {
          val.task = val.task.filter(function(el) {
            return el != '';
          });
        });

        this.actions.createWhen.task = this.actions.createWhen.task.filter(
          function(el) {
            return el != '';
          }
        );

        const param = { machineValue: this.claimType, data: this.actions };
        await this.addWorkflowAction(param);
        this.addDefaultActionDialogBox = false;
        this.getAllWorkFlow(this.claimType);
        /*  Clearing the form     */
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
              type: '',
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
            interval: null,
            unit: 'days'
          },
          notes: ''
        };
      }
    },

    // Remove Completion Multiple Values
    removeCompletionAction(val) {
      this.actions.actions.onComplete.splice(val, 1);
    },

    addAnotherOnClick() {
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
    this.getAllUsers();
    this.getOrganization();
    this.paidUnpaidUserList = this.paidUnpaidUserDetails;
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
        this.arrOfRoles.push({
          label: '',
          value: val
        });
      });
    });
    this.getPermissions();
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
</style>
