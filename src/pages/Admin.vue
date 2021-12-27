<template>
  <q-page>
    <div class="row q-px-xl">
      <div class="col">
        <div class="row" flat bordered>
          <!-- Main Template -->
          <q-tab-panels
            class="q-ml-xl full-height mobile-container-page-without-search full-width"
            v-model="webSubOptionMenuTab.key"
            animated
            vertical
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="accountSummary">
              <q-card
                class="q-pa-xl"
                style="
                  border-radius: 20px;
                  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
                "
              >
                <div class="row justify-between">
                  <div class="text-h5 text-weight-bold">Account Summary</div>
                  <div>
                    <a
                      @click="onEditClick"
                      class="text-primary text-subtitle1 text-weight-bold q-mr-xs"
                      style="
                        cursor: pointer;
                        font-size: 16px;
                        text-decoration: underline;
                      "
                      >Edit</a
                    >
                    <i class="text-primary fas fa-edit"></i>
                  </div>
                </div>
                <q-form ref="accountSummaryForm">
                  <div class="q-mt-xl">
                    <!-- Name -->
                    <div class="row">
                      <div class="col q-mr-md">
                        <div class="row text-subtitle1 text-weight-bold">
                          First Name<span class="text-red">*</span>
                        </div>
                        <!-- {{users}} -->
                        <div class="row">
                          <q-input
                            dense
                            class="full-width"
                            input-class="text-subtitle1"
                            outlined
                            v-model="users.fname"
                            :disable="!editAccountSummary"
                            lazy-rules
                            maxlength="128"
                            :rules="[
                              val => val.length > 0 || 'Please add first name',
                              val =>
                                validateText(val) || 'Please enter valid name'
                            ]"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="row text-subtitle1 text-weight-bold">
                          Last Name<span class="text-red">*</span>
                        </div>
                        <div class="row">
                          <q-input
                            dense
                            class="full-width"
                            input-class="text-subtitle1"
                            outlined
                            v-model="users.lname"
                            :disable="!editAccountSummary"
                            lazy-rules
                            maxlength="128"
                            :rules="[
                              val => val.length > 0 || 'Please add last name',
                              val =>
                                validateText(val) ||
                                'Please enter valid last name'
                            ]"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- address -->
                    <div class="q-mt-sm full-width">
                      <div class="col">
                        <div class="row text-subtitle1 text-weight-bold">
                          Address<span class="text-red">*</span>
                        </div>

                        <div v-if="user.mailingAddress">
                          <AutoCompleteAddress
                            :id="'AddVendor'"
                            :address="users.mailingAddress"
                            :isDropBoxEnable="false"
                            :isChecksEnable="false"
                            :value="true"
                            :view="'custom'"
                            :readOnly="!editAccountSummary"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row q-mt-sm full-width">
                      <div class="col q-mr-md">
                        <div class="text-subtitle1 text-weight-bold">
                          Mobile<span class="text-red">*</span>
                        </div>
                        <div class="col clickable text-primary">
                          <q-input
                            dense
                            class="full-width"
                            input-class="text-subtitle1"
                            outlined
                            v-model="users.contact.number"
                            :disable="!editAccountSummary"
                            lazy-rules
                            mask="(###) ### - ####"
                            unmasked-value
                            :rules="[
                              val =>
                                val.length > 0 || 'Please add contact number',
                              val =>
                                val.length > 9 ||
                                'Mobile number must contain 10 digit'
                            ]"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="text-bold">
                          <div class="row text-subtitle1 text-weight-bold">
                            Email Address<span class="text-red">*</span>
                          </div>
                        </div>
                        <!-- @click="onEmailClick(user.email, $event)" -->
                        <div class="row ">
                          <div class="col clickable text-primary">
                            <q-input
                              dense
                              class="full-width"
                              input-class="text-subtitle1"
                              outlined
                              v-model="users.email"
                              :rules="[
                                val =>
                                  val.length > 0 || 'Please add email address',
                                val =>
                                  validateEmail(val) ||
                                  'You have entered an invalid email address!'
                              ]"
                              :disable="!editAccountSummary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="q-mt-lg row justify-end"
                    v-if="editAccountSummary"
                  >
                    <q-btn
                      class="col-1 q-mr-sm"
                      size="md"
                      text-color="black"
                      color="white"
                      label="Cancel"
                      @click="cancelAccountSummaryUpdate"
                    />
                    <q-btn
                      class="col-1"
                      size="md"
                      color="primary"
                      label="Save"
                      @click="onSaveEditedButton"
                    />
                  </div>
                </q-form>
              </q-card>
              <q-card
                class="q-pa-xl q-mt-xl"
                style="
                  border-radius: 20px;
                  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
                "
              >
                <div class="row justify-between">
                  <div class="text-h5 text-weight-bold">Company Details</div>
                  <div>
                    <a
                      @click="onEditClickOrganization"
                      class="text-primary text-subtitle1 text-weight-bold q-mr-xs"
                      style="
                        cursor: pointer;
                        font-size: 16px;
                        text-decoration: underline;
                      "
                      >Edit </a
                    ><i class="text-primary fas fa-edit"></i>
                  </div>
                </div>
                <q-form ref="companyDetailsForm">
                  <div style="margin-top: 30px">
                    <div class="row text-subtitle1 text-weight-bold">
                      Company Name<span class="text-red">*</span>
                    </div>

                    <div class="row">
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        v-model="organizations.users.fname"
                        :disable="!editCompanyDetails"
                        maxlength="128"
                        :rules="[
                          val => val.length > 0 || 'Please add company name'
                        ]"
                      />
                    </div>

                    <div class="col q-mt-sm q-mr-md full-width">
                      <div class="row justify-between">
                        <div class="col text-subtitle1 text-weight-bold">
                          Address<span class="text-red">*</span>
                        </div>
                        <div
                          v-if="editCompanyDetails"
                          class="col row items-center justify-end"
                        >
                          <a
                            @click="copyUserAddress"
                            class="text-primary"
                            style="
                              cursor: pointer;
                              font-size: 16px;
                              text-decoration: underline;
                            "
                            >Copy from above
                          </a>
                          <q-icon color="primary" name="content_copy" />
                        </div>
                      </div>
                      <div v-if="organizations.users.mailingAddress">
                        <AutoCompleteAddress
                          :id="'AddVendor1'"
                          :address="organizations.users.mailingAddress"
                          :isDropBoxEnable="false"
                          :isChecksEnable="false"
                          :value="true"
                          :view="'custom'"
                          :readOnly="!editCompanyDetails"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="row"></div>
                    </div>

                    <div class="row q-mt-sm full-width">
                      <div class="col">
                        <div class="row text-subtitle1 text-weight-bold">
                          Company website
                        </div>
                        <q-input
                          dense
                          class="full-width"
                          input-class="text-subtitle1"
                          outlined
                          v-model="organizations.website"
                          :disable="!editCompanyDetails"
                          :rules="[
                            val =>
                              validateUrl(val) ||
                              'You have entered an invalid URL!'
                          ]"
                        />
                      </div>
                    </div>
                    <div class="row q-mt-sm full-width">
                      <div class="col q-mr-md">
                        <!-- company adminstrator changed to contact name -->
                        <div class="row text-subtitle1 text-weight-bold">
                          Contact Name
                        </div>
                        <q-input
                          dense
                          class="full-width"
                          input-class="text-subtitle1"
                          outlined
                          :disable="!editCompanyDetails"
                        />
                      </div>
                      <div class="col">
                        <!-- company adminstrator changed to contact name -->
                        <div class="row text-subtitle1 text-weight-bold">
                          Contact Email
                        </div>
                        <q-input
                          dense
                          class="full-width"
                          input-class="text-subtitle1"
                          outlined
                          :disable="!editCompanyDetails"
                        />
                      </div>
                    </div>
                    <div
                      class="q-mt-lg row justify-end"
                      v-if="editCompanyDetails"
                    >
                      <q-btn
                        class="col-1 q-mr-sm"
                        size="md"
                        text-color="black"
                        color="white"
                        label="Cancel"
                        @click="cancelCompanyDetailsUpdate"
                      />
                      <q-btn
                        class="col-1"
                        size="md"
                        color="primary"
                        label="Save"
                        @click="onSaveEditedButtonOrganization"
                      />
                    </div>
                  </div>
                </q-form>
              </q-card>
              <q-card
                class="q-pa-xl q-mt-xl"
                style="
                  border-radius: 20px;
                  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
                "
              >
                <div class="row justify-between">
                  <div class="text-h5 text-weight-bold">
                    <img
                      class="vertical-middle"
                      height="30px;"
                      width="30px;"
                      src="~assets/photo_ID_app.png"
                    />
                    ID Account Information (<a
                      class="text-primary"
                      href="https://photoidapp.net/"
                      target="_blank"
                      >signup</a
                    >)
                  </div>
                  <div>
                    <a
                      @click="onEditClickOrganization('PHOTOIDFORM')"
                      class="text-primary text-subtitle1 text-weight-bold q-mr-xs"
                      style="
                        cursor: pointer;
                        font-size: 16px;
                        text-decoration: underline;
                      "
                      >Edit </a
                    ><i class="text-primary fas fa-edit"></i>
                  </div>
                </div>
                <q-form ref="editPhotoIDForm">
                  <div class="row q-mt-lg full-width">
                    <div class="col q-mr-md">
                      <div class="row text-subtitle1 text-weight-bold">
                        Account Email
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        @click="onEmailClick(user.email, $event)"
                        v-model="organizations.users.email"
                        :disable="!editPhotoIDDetails"
                      />
                    </div>
                    <div class="col">
                      <div class="row text-subtitle1 text-weight-bold">
                        Account Api Key
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        v-model="organizations.users.lname"
                        :disable="!editPhotoIDDetails"
                      />
                    </div>
                  </div>
                  <div
                    v-if="this.editPhotoIDDetails"
                    class="q-mt-lg row justify-end"
                  >
                    <q-btn
                      class="col-1 q-mr-sm"
                      size="md"
                      label="Cancel"
                      text-color="black"
                      color="white"
                      @click="cancelPhotoIDUpdate"
                    />
                    <q-btn
                      class="col-1"
                      size="md"
                      color="primary"
                      label="Save"
                      @click="onSaveEditedButtonOrganization"
                    />
                  </div>
                </q-form>
              </q-card>
              <!-- <q-card
                class="q-pa-xl q-my-xl"
                style="border-radius:20px;box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);"
              >
                <div class="row">
                  <div class="text-h5 text-weight-bold">
                    Plan:
                    {{
                      toUpperCase(
                        organization.plan && organization.plan.machineValue
                          ? organization.plan.machineValue
                          : '-'
                      )
                    }}
                  </div>
                </div>
                <div class="row q-mt-md">
                  <div class="text-subtitle1 text-weight-bold">Paid Users-</div>
                  <div class="text-subtitle1">{{ organization.paidUsers }}</div>

                  <div class="text-subtitle1 text-weight-bold q-pl-xl">
                    Unpaid Users-
                  </div>
                  <div class="text-subtitle1">
                    {{ organization.nonPaidUsers }}
                  </div>
                </div>
                <div class="q-mt-md">
                  <table>
                    <thead>
                      <tr class="row text-bold text-h6 text-white">
                        <th class="bg-primary text-white col">
                          Paid Users
                        </th>
                        <th class="col bg-primary text-white">
                          UnPaid Users
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="full-width"
                      style="height: 400px;display: inline-block;overflow: scroll;"
                    >
                      <tr
                        class="row"
                        v-for="(paidUnpaid, index) in paidUnpaidUserDetails"
                        :key="index"
                      >
                        <td class="col text-center">
                          {{ paidUnpaid.paidUserName }}
                        </td>
                        <td class="col text-center">
                          {{ paidUnpaid.unPaidUserName }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </q-card> -->
            </q-tab-panel>
            <q-tab-panel name="groupPermission" class="q-pa-none">
              <!-- <div class="row">
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
                          <div class="q-mt-sm text-bold" style="height: 30px">
                            Permission/Role
                          </div>
                        </div>

                        <th
                          v-for="(user, index) in arrOfRoles"
                          style="height: 30px"
                          :key="index"
                        >
                          <div style="height: 45px; width: 100px">
                            {{ user.value.name }}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tr v-for="(us, ind) in permissions" :key="ind">
                      <th
                        style="
                          height: 40px;
                          font-size: 10px;
                          font-weight: normal;
                          text-align: left;
                        "
                      >
                        <span class="q-ml-sm">{{ us.name }}</span>
                      </th>
                      <td
                        align="center"
                        v-for="(user, index) in arrOfRoles"
                        :key="index"
                      >
                        <div
                          style="height: 40px"
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
                        <div v-else style="height: 40px">
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
              </div> -->
              <!-- group permission -->
              <div>
                <p>
                  Please select the role you wish to configure from the selector
                  below and then set privileges by checking the associated box.
                  Checking the box will turn the privilege on. Changes to these
                  settings will be saved automatically.
                </p>
                <div class="text-brown-7 text-weight-bold text-italic">
                  Note: the user will need to log out and then in again to
                  activate the privilege
                </div>
              </div>

              <div class="row q-mt-md items-center">
                <div class="col">
                  <div class="row items-center">
                    <div class="q-mr-md">Role</div>

                    <q-select
                      dense
                      outlined
                      options-dense
                      behavior="menu"
                      option-label="value"
                      option-value="machineValue"
                      v-model="selectedRole"
                      :options="arrOfRoles"
                      map-options
                      emit-value
                      label="Select Role"
                      style="width: 26%"
                    />
                    {{ selectedRole }}
                  </div>
                </div>
                <div class="col--6">
                  <q-checkbox v-model="paid">Paid</q-checkbox>
                </div>
              </div>

              <div
                v-if="selectedRole"
                v-for="(us, ind) in sortedPermissions"
                :key="ind"
              >
                <div v-for="(user, index) in arrOfRoles" :key="index">
                  <div
                    class="row items-center"
                    v-if="user.value.name === selectedRole.value.name"
                  >
                    <div
                      style="height: 40px"
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

                    <div v-else style="height: 40px">
                      <q-icon
                        color="primary q-mt-sm"
                        name=" radio_button_unchecked"
                        size="sm"
                        @click="rolePermission(ind, index, 'unselected')"
                      />
                    </div>
                    <span class="q-ml-sm">{{ us.name }}</span>
                  </div>
                </div>

                <!-- <span class="q-ml-sm">{{ us.name }}</span> -->
              </div>
            </q-tab-panel>
            <q-tab-panel name="actionItems">
              <q-card class="q-pa-lg card-style" flat bordered>
                <div class="text-h6 text-bold">Claim Action Item</div>
                <div class="row">
                  <q-btn
                    color="primary"
                    label="+ Add Default Action "
                    @click="addDefaultActionItem()"
                    :disable="claimType == ''"
                  />
                </div>

                <q-card class="q-mt-md">
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
                  <div class="">
                    <q-scroll-area class="claim-list-scrollable">
                      <div
                        v-for="(item, index) in allAction"
                        :key="index"
                        class="row q-pb-md"
                      >
                        <div class="col-11">
                          <div class="text-blue">
                            {{ item.name ? item.name : '-' }}
                          </div>
                          <div>
                            {{ item.createdDesc ? item.createdDesc : '-' }}
                          </div>
                        </div>
                        <!--this is for edit and delete -->
                        <div class="row justify-between">
                          <div
                            class="col-1 cursor-pointer text-h6"
                            @click="toEditActionItem(item)"
                          >
                            <q-icon size="md" color="primary" name="create" />
                          </div>
                          <div
                            class="col-1 cursor-pointer text-h6"
                            @click="toDeleteActionItem(item)"
                          >
                            <q-icon size="md" color="primary" name="delete" />
                          </div>
                        </div>
                      </div>
                    </q-scroll-area>
                  </div>
                </q-card>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>

    <!-- Dialog Box for Adding Action Items -->
    <q-dialog v-model="addDefaultActionDialogBox">
      <q-card style="width: 60%; height: 88vh">
        <q-bar class="row justify-between bg-primary" style="height: 50px">
          <div
            v-if="editDefaultActionItem"
            class="q-px-xs text-bold text-white"
          >
            Edit Action Item
          </div>
          <div v-else class="q-px-xs text-bold text-white">Add Action Item</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div style="height: calc(100% - 140px); overflow: auto" class="q-pa-md">
          <q-form ref="addActionForm">
            <div class="row full-width">
              <div class="q-pa-sm text-bold">
                Action Item <span class="text-red">*</span> :
              </div>
              <q-input
                dense
                v-model="actions.name"
                class="q-mx-md"
                style="width: 200px"
                outlined
                :rules="[
                  val => (val && val.length > 0) || 'Please enter action'
                ]"
              />
            </div>

            <!-- second -->
            <div class="row q-mt-md full-width">
              <div class="q-pa-sm text-bold">
                Created When <span class="text-red">*</span> :
              </div>
              <q-select
                dense
                outlined
                options-dense
                behavior="menu"
                v-model="actions.createWhen.type"
                option-label="value"
                :options="actionReason"
                option-value="machineValue"
                @input="
                  createdWhenSubType(
                    actions.createWhen.type,
                    (isEditable = true)
                  )
                "
                map-options
                emit-value
                label="Created when"
                class="input-extra-padding"
                style="width: 26%"
                :rules="[
                  val => (val && val.length > 0) || 'Please select any category'
                ]"
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
                  style="width: 220px"
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please select any category'
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
            <div class="row q-pa-sm">
              <div class="q-py-md text-bold">
                Enabled <span class="text-red">*</span> :
              </div>
              <q-toggle v-model="actions.isEnabled" left-label class="" />
              <q-badge color="primary" dense style="margin: auto 10px">{{
                actions.isEnabled ? 'Enable' : 'Disable'
              }}</q-badge>
              <div class="q-pa-md text-bold">
                Default Priority <span class="text-red">*</span> :
              </div>
              <div class="col-2 q-mt-xs">
                <q-toggle
                  v-model="defaultPriority"
                  left-label
                  @input="TogglePriority"
                />
                <q-badge color="primary" v-if="defaultPriority == true"
                  >High</q-badge
                >
                <q-badge v-else color="primary">Low</q-badge>
              </div>
            </div>

            <!-- 3 -->
            <div class="row q-mt-md full-width">
              <div class="row q-pa-xs">
                <div class="q-py-sm text-bold">
                  Assign To <span class="text-red">*</span> :
                </div>
                <div class="q-ml-sm row text-bold">
                  <q-select
                    dense
                    outlined
                    v-model="actions.assignedTo[0].type"
                    options-dense
                    behavior="menu"
                    option-label="value"
                    :options="assignTo"
                    @input="
                      callAssignApi(
                        actions.assignedTo[0].type,
                        (isEditable = true)
                      )
                    "
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
                    class="q-ml-sm input-extra-padding"
                    style="width: 200px"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select any user '
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="q-py-sm q-pl-xs text-bold">
              Due Date <span class="text-red">*</span> :
            </div>
            <div class="row q-pl-xs full-width">
              <!-- <div class="q-pa-sm text-bold">Due Date :</div> -->
              <div class="text-grey-9 text-bold q-py-sm">Task will be Due</div>

              <q-input
                dense
                v-model.number="actions.due.interval"
                class="q-mx-sm"
                outlined
                placeholder="Day"
                style="width: 20%"
                :rules="[val => !!val || 'Please enter days']"
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
                :rules="[
                  val => (val && val.length > 0) || 'Please select any category'
                ]"
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
              :key="index"
            >
              <div>
                <div class="q-pa-sm text-bold" v-if="index == 0">
                  Completion Action <span class="text-red">*</span> :
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
                      index,
                      (isEditable = true)
                    )
                  "
                  label="Completion Action"
                  class="input-extra-padding"
                  style="width: 200px"
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please select any category'
                  ]"
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
                      index,
                      (isEditable = true)
                    )
                  "
                  map-options
                  emit-value
                  options-dense
                  style="width: 200px"
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please select any category'
                  ]"
                />
              </div>
              <div
                class="q-ml-xs"
                v-if="
                  actions.actions.onComplete[index].task &&
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
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please select any category'
                  ]"
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
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please select any category'
                  ]"
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
              :key="index"
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
                    setSubType(
                      actions.actions.onOverdue[index].type,
                      index,
                      (isEditable = true)
                    )
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
                      index,
                      true
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
                  actions.actions.onOverdue[index].task &&
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
        <!--button for edited action item-->
        <div v-if="editDefaultActionItem" class="row justify-center">
          <q-btn
            color="primary"
            label="Save"
            class="single-next-button-style col-6 q-my-lg"
            @click="onClickEditSaveButton"
          />
        </div>
        <!--button action for adding new action item-->
        <div v-else class="row justify-center">
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { getCurrentUser } from 'src/utils/auth';
import { toGetStateShortName } from '@utils/common';
import {
  onPhoneNumberClick,
  onEmailClick,
  showPhoneNumber,
  sendPhoneNumber
} from '@utils/clickable';
import { validateEmail, validateText, validateUrl } from '@utils/validation';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  name: 'Admin',
  components: { AutoCompleteAddress },

  data() {
    return {
      paid: false,
      roles: [],
      editAccountSummary: false,
      editCompanyDetails: false,
      editPhotoIDDetails: false,
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
      newRole: { id: '', value: '', machine: '' },
      newPermission: '',
      rol: [],
      arrOfRoles: [],
      value: {},
      userId: '',
      defaultPriority: false,
      selectedRole: '',
      organizations: {
        name: '',
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
      model: null,
      dueDays: ['Bussiness', 'Calendar']
    };
  },
  computed: {
    ...mapGetters([
      'webSubOptionMenuTab',
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
    ]),

    sortedPermissions: function () {
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      return this.permissions.sort(compare);
    }
  },

  methods: {
    toGetStateShortName,
    onPhoneNumberClick,
    onEmailClick,
    showPhoneNumber,
    toUpperCase(plan) {
      return plan[0].toUpperCase() + plan.slice(1);
    },
    ...mapActions([
      'editAdminActionItem',
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
      'adminActionItemDelete',
      'updateUserForOrganization',
      'updateAccessToken'
    ]),
    ...mapMutations(['webMenuSubOptionTab']),
    validateEmail,
    validateText,
    validateUrl,

    //to Delete Admin Action item
    async toDeleteActionItem(item) {
      const payload = {
        itemID: item.id,
        workFlowID: this.selectedWorkflowID
      };
      this.adminActionItemDelete(payload);
      await this.getAllWorkFlow(this.claimType);
    },
    addDefaultActionItem() {
      this.addDefaultActionDialogBox = true;
      this.editDefaultActionItem = false;
      this.defaultPriority = false;
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
          interval: 0,
          unit: 'days'
        },
        notes: ''
      };
    },
    toEditActionItem(item) {
      this.addDefaultActionDialogBox = !this.addDefaultActionDialogBox;
      this.editDefaultActionItem = true;
      this.editedActionItemID = item.id;
      this.actions.name = item.name;
      this.actions.isEnabled = item.isEnabled;
      this.actions.createWhen.type =
        item.createWhen && item.createWhen.type ? item.createWhen.type : '';
      this.actions.createWhen.task =
        item.createWhen && item.createWhen.task ? item.createWhen.task : [];
      this.actions.priority = item.priority;
      this.editedDefaultPriority(this.actions.priority);
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

      this.actions.actions.onComplete[0].task =
        item.actions.onComplete && item.actions.onComplete[0].task
          ? item.actions.onComplete[0].task
          : [];
      this.actions.actions.onComplete[0].type =
        item.actions.onComplete && item.actions.onComplete[0].type
          ? item.actions.onComplete[0].type
          : '';

      this.actions.actions.onOverdue[0].type =
        item.actions.onOverdue && item.actions.onOverdue[0].type
          ? item.actions.onOverdue[0].type
          : '';
      this.actions.actions.onOverdue[0].task =
        item.actions.onOverdue && item.actions.onOverdue[0].task
          ? item.actions.onOverdue[0].task
          : [];

      this.actions.due.type = item.due && item.due.type ? item.due.type : '';
      this.actions.due.interval =
        item.due && item.due.interval ? item.due.interval : '';
      this.actions.due.unit = item.due && item.due.unit ? item.due.unit : '';
      this.actions.notes = item.notes ? item.notes : '';

      this.createdWhenSubType(
        this.actions.createWhen.type,
        (this.isEditable = false)
      );
      if (this.actions.assignedTo[0].type != '')
        this.callAssignApi(
          this.actions.assignedTo[0].type,
          (this.isEditable = false)
        );
      if (this.actions.assignedTo[0].name != '')
        this.setAssignTo(this.actions.assignedTo[0].name);

      for (let i = 0; i < this.actions.actions.onComplete.length; i++) {
        if (this.actions.actions.onComplete[i].type != '')
          this.setSubTypeOfAction(
            this.actions.actions.onComplete[i].type,
            i,
            (this.isEditable = false)
          );

        if (this.actions.actions.onComplete[i].task.length != 0)
          this.setSubTypeForAction(
            this.actions.actions.onComplete[i].task[0],
            this.indexOfSubTypeOfCompletion,
            i,
            (this.isEditable = false)
          );
      }
      for (let i = 0; i < this.actions.actions.onOverdue.length; i++) {
        if (this.actions.actions.onOverdue[i].type != '')
          this.setSubType(
            this.actions.actions.onOverdue[i].type,
            i,
            (this.isEditable = false)
          );
        if (this.actions.actions.onOverdue[i].task.length != 0)
          this.setSubOfSubType(
            this.actions.actions.onOverdue[i].task[0],
            this.indexOfSubType,
            i,
            false
          );
      }
    },
    //this function is used for resetting the Dafault Priority toggle
    editedDefaultPriority(val) {
      if (val == 'critical') {
        this.defaultPriority = true;
      } else this.defaultPriority = false;
    },
    // this function is used to update the subcolumn of AssignTo data.
    async callAssignApi(val, isEditable) {
      this.assignToSubOption = [];
      if (isEditable) {
        if (this.actions.assignedTo && this.actions.assignedTo[0].name)
          this.actions.assignedTo[0].name = '';
      }

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

    // this function is used to get the detail of sub options of selected AssignedTo.
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
    },
    checkPermission(val, role, index) {
      if (this.roleTypes[index].permission.includes(val)) {
        this.arrOfRoles[index].label = true;
        return true;
      }
      return false;
    },
    async onSaveEditedButtonOrganization() {
      const success = await this.$refs.companyDetailsForm.validate();
      if (
        success &&
        this.organizations.users.mailingAddress.address1.length > 0
      ) {
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
        this.editCompanyDetails = false;
        this.editPhotoIDDetails = false;
      }
    },

    async onSaveEditedButton() {
      const success = await this.$refs.accountSummaryForm.validate();

      if (success && this.users.mailingAddress.address1.length > 0) {
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
              number: sendPhoneNumber(this.users.contact.number)
            }
          }
        };
        await this.updateAccessToken(this.users.email);
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
        this.editAccountSummary = false;
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
    // Toggle Priority Set
    TogglePriority() {
      if (this.defaultPriority) {
        this.actions.priority = 'critical';
      } else this.actions.priority = 'low';
    },

    //  Finding and Clearing the Other Sub data while changing the main DRopdown data
    createdWhenSubType(value, isEditable) {
      if (isEditable) {
        if (this.actions.createWhen.task && this.actions.createWhen.task[0])
          this.actions.createWhen.task[0] = '';
      }
      var index = this.actionReason.findIndex(
        std => std.machineValue === value
      );
      this.indexOfActionReason = index;
    },

    onEditClick() {
      this.editAccountSummary = true;
    },
    onEditClickOrganization(val) {
      if (val == 'PHOTOIDFORM') {
        this.editPhotoIDDetails = true;
      } else {
        this.editCompanyDetails = true;
      }
    },

    // Action OverDue Sub Dropdown Index set and also used to find the index of selected onOverdue.
    setSubType(val, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.onOverdue[index].task &&
          this.actions.actions.onOverdue[index].task[0]
        )
          this.actions.actions.onOverdue[index].task[0] = '';
        if (
          this.actions.actions.onOverdue[index].task &&
          this.actions.actions.onOverdue[index].task[1]
        )
          this.actions.actions.onOverdue[index].task[1] = '';
      }
      if (val) {
        var index = this.actionOverDues.findIndex(
          std => std.machineValue === val
        );
        this.indexOfSubType = index;
      }
    },

    // this function is used to update the selected subOption of onOverdue, and also used to find the index of selected subtoption index.
    setSubOfSubType(subValue, indexOfSubType, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.onOverdue[index].task &&
          this.actions.actions.onOverdue[index].task[1]
        )
          this.actions.actions.onOverdue[index].task[1] = '';
      }

      if (subValue) {
        const obj = this.actionOverDues[indexOfSubType].subOptions.findIndex(
          item => {
            return item.machineValue === subValue;
          }
        );

        this.indexOfSubOfSubType = obj;
      }
    },

    // this function is used to update the subOption of onComplete row and use to find the index value of selected onComplete subOption, which we used further to display subOption of Selected SubOption.
    setSubTypeForAction(SubOptionValue, sValue, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.onComplete[index].task &&
          this.actions.actions.onComplete[index].task[1]
        )
          this.actions.actions.onComplete[index].task[1] = '';
      }
      if (SubOptionValue) {
        const ob = this.actionCompletion[sValue].subOptions.findIndex(item => {
          return item.machineValue === SubOptionValue;
        });
        this.indexOfSubOfSubTypeOfCompletion = ob;
      }
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
          val.task = val.task.filter(function (el) {
            return el != '';
          });
        });

        this.actions.actions.onOverdue.forEach(val => {
          val.task = val.task.filter(function (el) {
            return el != '';
          });
        });

        this.actions.createWhen.task = this.actions.createWhen.task.filter(
          function (el) {
            return el != '';
          }
        );

        const param = { machineValue: this.claimType, data: this.actions };
        await this.addWorkflowAction(param);
        this.addDefaultActionDialogBox = false;
        this.getAllWorkFlow(this.claimType);
        /*  Clearing the form     */
        this.defaultPriority = false;
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
            interval: 0,
            unit: 'days'
          },
          notes: ''
        };
      }
    },

    //on Edit Button For Action Item
    async onClickEditSaveButton() {
      const success = await this.$refs.addActionForm.validate();
      if (success) {
        const payload = {
          id: this.editedActionItemID,
          workflowID: this.selectedWorkflowID,
          attributes: {
            name: this.actions.name,
            isEnabled: this.actions.isEnabled,
            createWhen: {
              type: this.actions.createWhen.type,
              task: this.actions.createWhen.task
            },
            priority: this.actions.priority,
            assignedTo: [
              {
                type: this.actions.assignedTo[0].type,
                name: this.actions.assignedTo[0].name,
                id: this.actions.assignedTo[0].id
              }
            ],
            actions: {
              onComplete: [
                {
                  type: this.actions.actions.onComplete[0].type,
                  task: this.actions.actions.onComplete[0].task
                }
              ],
              onOverdue: [
                {
                  type: this.actions.actions.onOverdue[0].type,
                  task: this.actions.actions.onOverdue[0].task
                }
              ]
            },
            due: {
              type: this.actions.due.type,
              interval: this.actions.due.interval,
              unit: this.actions.due.unit
            },
            notes: this.actions.notes
          }
        };
        this.editDefaultActionItem = false;
        (this.editedActionItemID = ''),
          (this.addDefaultActionDialogBox = false);
        await this.editAdminActionItem(payload);

        this.getAllWorkFlow(this.claimType);
        /*  Clearing the form     */
        this.defaultPriority = false;
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
            interval: 0,
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
    cancelAccountSummaryUpdate() {
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      this.users.contact.type = this.user.phoneNumber.type;
      this.users.contact.number = this.user.phoneNumber.number;
      this.users.email = this.user.email;
      this.users.mailingAddress.addressRegion = this.user.mailingAddress.addressRegion;
      this.users.mailingAddress.addressLocality = this.user.mailingAddress.addressLocality;
      this.users.mailingAddress.houseNumber = this.user.mailingAddress.houseNumber;
      this.users.mailingAddress.address1 = this.user.mailingAddress.address1;
      this.users.mailingAddress.address2 = this.user.mailingAddress.address2;
      this.users.mailingAddress.postalCode = this.user.mailingAddress.postalCode;
      this.editAccountSummary = false;
    },
    cancelCompanyDetailsUpdate() {
      this.editCompanyDetails = false;
      this.organizations.users.fname = this.organization.name;
      // this.organizations.users.lname = this.organization.photoIDAPIKey;

      // this.organizations.users.contact.number = this.organization.website;
      //this.organizations.users.email = this.organization.photoIDEmail;
      this.organizations.users.mailingAddress.addressRegion = this.organization.billingInfo.address.addressRegion;
      this.organizations.users.mailingAddress.addressLocality = this.organization.billingInfo.address.addressLocality;
      this.organizations.users.mailingAddress.houseNumber = this.organization.billingInfo.address.houseNumber;
      this.organizations.users.mailingAddress.address1 = this.organization.billingInfo.address.address1;
      this.organizations.users.mailingAddress.address2 = this.organization.billingInfo.address.address2;
      this.organizations.users.mailingAddress.postalCode = this.organization.billingInfo.address.postalCode;
    },
    cancelPhotoIDUpdate() {
      this.editPhotoIDDetails = false;
      this.organizations.users.lname = this.organization.photoIDAPIKey;
      this.organizations.users.email = this.organization.photoIDEmail;
    },
    copyUserAddress() {
      this.organizations.users.mailingAddress = this.user.mailingAddress;
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

    // this function is used to update the subOptions of onComplete option and also used to get the index of seleted onComplete action.
    setSubTypeOfAction(val, index, isEditable) {
      if (isEditable) {
        if (
          this.actions.actions.onComplete[index].task &&
          this.actions.actions.onComplete[index].task[0]
        )
          this.actions.actions.onComplete[index].task[0] = '';
        if (
          this.actions.actions.onComplete[index].task &&
          this.actions.actions.onComplete[index].task[1]
        )
          this.actions.actions.onComplete[index].task[1] = '';
      }
      if (val) {
        var indexOfCompletionAction = this.actionCompletion.findIndex(
          std => std.machineValue === val
        );
        this.indexOfSubTypeOfCompletion = indexOfCompletionAction;
      }
    }
  },

  async created() {
    this.getAllUsers();
    this.paidUnpaidUserDetails;
    this.getOrganization();
    console.log('arr of roles', this.arrOfRoles);
    console.log(this.arrOfRoles.length);
    for (var i = 0; i <= this.arrOfRoles.length; i++) {
      console.log(this.arrOfRoles[i]);
    }

    this.getContactTypes();
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

    // assign values to this.users
    this.users.fname = this.user.contact.fname;
    this.users.lname = this.user.contact.lname;
    this.users.contact.type = this.user.phoneNumber.type;
    this.users.contact.number = this.user.phoneNumber.number;
    this.users.email = this.user.email;
    this.users.mailingAddress.addressRegion =
      this.user.mailingAddress.addressRegion;
    this.users.mailingAddress.addressLocality =
      this.user.mailingAddress.addressLocality;
    this.users.mailingAddress.houseNumber =
      this.user.mailingAddress.houseNumber;
    this.users.mailingAddress.address1 = this.user.mailingAddress.address1;
    this.users.mailingAddress.address2 = this.user.mailingAddress.address2;
    this.users.mailingAddress.postalCode = this.user.mailingAddress.postalCode;
    // assign org values

    this.organizations.users.fname = this.organization.name;
    this.organizations.users.lname = this.organization.photoIDAPIKey;

    // this.organizations.users.contact.number = this.organization.website;
    this.organizations.users.email = this.organization.photoIDEmail;
    this.organizations.users.mailingAddress.addressRegion =
      this.organization.billingInfo.address.addressRegion;
    this.organizations.users.mailingAddress.addressLocality =
      this.organization.billingInfo.address.addressLocality;
    this.organizations.users.mailingAddress.houseNumber =
      this.organization.billingInfo.address.houseNumber;
    this.organizations.users.mailingAddress.address1 =
      this.organization.billingInfo.address.address1;
    this.organizations.users.mailingAddress.address2 =
      this.organization.billingInfo.address.address2;
    this.organizations.users.mailingAddress.postalCode =
      this.organization.billingInfo.address.postalCode;
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
