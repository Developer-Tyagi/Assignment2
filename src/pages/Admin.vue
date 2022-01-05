<template>
  <q-page>
    <div class="row q-px-xl">
      <div class="col">
        <div class="row" flat bordered>
          <!-- Main Template -->
          <q-tab-panels
            class="
              q-ml-xl
              full-height
              mobile-container-page-without-search
              full-width
            "
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
                      class="
                        text-primary text-subtitle1 text-weight-bold
                        q-mr-xs
                      "
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
                            maxlength="25"
                            :rules="[
                              val => val.length > 0 || 'Please add first name'
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
                            maxlength="25"
                            :rules="[
                              val => val.length > 0 || 'Please add last name'
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
                            maxlength="10"
                            :rules="[
                              val =>
                                val.length > 0 || 'Please add contact number'
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

                        <div class="row">
                          <div
                            class="col clickable text-primary"
                            @click="onEmailClick(user.email, $event)"
                          >
                            <q-input
                              dense
                              class="full-width"
                              input-class="text-subtitle1"
                              outlined
                              v-model="users.email"
                              :rules="[
                                val =>
                                  val.length > 0 || 'Please add email address'
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
                      class="
                        text-primary text-subtitle1 text-weight-bold
                        q-mr-xs
                      "
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
                        maxlength="50"
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
                      class="
                        text-primary text-subtitle1 text-weight-bold
                        q-mr-xs
                      "
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
              </div>
            </q-tab-panel>
            <q-tab-panel name="actionItems">
              <div class="col">
                <div class="row justify-between">
                  <div class="text-weight-bold text-h5">Automation</div>
                  <div class="row">
                    <div
                      class="text-underline text-body1 cursor-pointer"
                      @click="addDefaultActionItem()"
                    >
                      Create New rules
                    </div>
                    <q-icon class="q-ml-sm" size="sm" name="settings" />
                  </div>
                </div>

                <!-- Dialog Box for Adding Action Items -->
                <div class="column" v-if="addDefaultActionDialogBox">
                  <div class="row text-subtitle1 text-weight-bold">
                    <q-input
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
                    />
                  </div>
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
                        <q-timeline-entry
                          icon="chevron_right"
                          :subtitle="actions.triggerEvent.type"
                        >
                        </q-timeline-entry>
                        <q-timeline-entry
                          v-for="(item, index) in actions.actions
                            .completionRule"
                          :key="index"
                          icon="chevron_right"
                          :subtitle="actions.actions.completionRule[index].type"
                        >
                        </q-timeline-entry>
                      </q-timeline>
                    </div>
                    <div class="col q-ml-xl">
                      <div class="row">
                        <div class="col-2">Workflow</div>
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
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-2">Trigger event</div>
                        <div class="col-3 q-ml-xs">
                          <q-select
                            dense
                            outlined
                            options-dense
                            behavior="menu"
                            v-model="actions.triggerEvent.type"
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
                          />
                          <div
                            class="q-ml-xs"
                            v-if="
                              actions.triggerEvent.type &&
                              actionReason[indexOfActionReason]
                                .additionalReasons
                            "
                          >
                            <q-select
                              dense
                              class="input-extra-padding"
                              outlined
                              options-dense
                              behavior="menu"
                              v-model="actions.triggerEvent.task[0]"
                              option-label="value"
                              option-value="machineValue"
                              map-options
                              emit-value
                              :options="
                                actionReason[indexOfActionReason]
                                  .additionalReasons
                              "
                              label="Sub-option"
                              :rules="[
                                val =>
                                  (val && val.length > 0) ||
                                  'Please select any category'
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
                          v-model="actions.isEnabled"
                          label="Enable rule"
                        />
                      </div>
                      <div class="row">
                        <div class="col-2">Actions</div>
                        <div class="col-9 q-ml-xs">
                          <div
                            class="row"
                            v-for="(val, index) in actions.actions
                              .completionRule"
                            :key="index"
                          >
                            <div class="col-4">
                              <div>
                                <q-select
                                  dense
                                  outlined
                                  options-dense
                                  behavior="menu"
                                  v-model="
                                    actions.actions.completionRule[index].type
                                  "
                                  option-label="value"
                                  option-value="machineValue"
                                  map-options
                                  emit-value
                                  :options="actionCompletion"
                                  @input="
                                    setSubTypeOfAction(
                                      actions.actions.completionRule[index]
                                        .type,
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
                                  actionCompletion[indexOfSubTypeOfCompletion]
                                    .subOptions
                                "
                              >
                                <q-select
                                  dense
                                  class="col-3 input-extra-padding"
                                  outlined
                                  v-model="
                                    actions.actions.completionRule[index]
                                      .task[0]
                                  "
                                  behavior="menu"
                                  option-value="machineValue"
                                  option-label="value"
                                  :options="
                                    actionCompletion[indexOfSubTypeOfCompletion]
                                      .subOptions
                                  "
                                  label="Sub-option"
                                  @input="
                                    setSubTypeForAction(
                                      actions.actions.completionRule[index]
                                        .task[0],
                                      indexOfSubTypeOfCompletion,
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
                                  actions.actions.completionRule[index]
                                    .task[0] &&
                                  actionCompletion[indexOfSubTypeOfCompletion]
                                    .subOptions
                                    ? actionCompletion[
                                        indexOfSubTypeOfCompletion
                                      ].subOptions[
                                        indexOfSubOfSubTypeOfCompletion
                                      ]
                                      ? actionCompletion[
                                          indexOfSubTypeOfCompletion
                                        ].subOptions[
                                          indexOfSubOfSubTypeOfCompletion
                                        ].subTypes.length > 0
                                      : false
                                    : false
                                "
                              >
                                <q-select
                                  v-if="
                                    actions.actions.completionRule[index]
                                      .task[0] == 'user'
                                  "
                                  dense
                                  class="input-extra-padding"
                                  outlined
                                  v-model="
                                    actions.actions.completionRule[index]
                                      .task[1]
                                  "
                                  behavior="menu"
                                  option-value="id"
                                  option-label="value"
                                  :options="
                                    actionCompletion[indexOfSubTypeOfCompletion]
                                      .subOptions[
                                      indexOfSubOfSubTypeOfCompletion
                                    ].subTypes
                                  "
                                  label="Sub-option"
                                  map-options
                                  emit-value
                                  options-dense
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
                                  v-model="
                                    actions.actions.completionRule[index]
                                      .task[1]
                                  "
                                  behavior="menu"
                                  option-value="machineValue"
                                  option-label="value"
                                  :options="
                                    actionCompletion[indexOfSubTypeOfCompletion]
                                      .subOptions[
                                      indexOfSubOfSubTypeOfCompletion
                                    ].subTypes
                                  "
                                  label="Sub-option"
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
                                  actions.actions.completionRule.length ==
                                  index + 1
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
                        <div class="col-2">Assign To</div>
                        <div class="col-3 q-ml-xs">
                          <div class="">
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
                              :rules="[
                                val =>
                                  (val && val.length > 0) ||
                                  'Please select any category'
                              ]"
                            />
                          </div>
                          <div class="q-ml-sm">
                            <q-select
                              v-if="actions.assignedTo[0].type"
                              v-model="actions.assignedTo[0].name"
                              dense
                              outlined
                              options-dense
                              behavior="menu"
                              option-label="name"
                              :options="assignToSubOption"
                              option-value="name"
                              @input="setAssignTo(actions.assignedTo[0].name)"
                              map-options
                              emit-value
                              class="q-ml-sm input-extra-padding"
                              :rules="[
                                val =>
                                  (val && val.length > 0) ||
                                  'Please select any user '
                              ]"
                            />
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
                              v-model="actions.actions.overdueRule[index].type"
                              behavior="menu"
                              option-value="machineValue"
                              option-label="value"
                              :options="actionOverDues"
                              map-options
                              emit-value
                              @input="
                                setSubType(
                                  actions.actions.overdueRule[index].type,
                                  index,
                                  (isEditable = true)
                                )
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
                                v-model="
                                  actions.actions.overdueRule[index].task[0]
                                "
                                behavior="menu"
                                option-value="machineValue"
                                option-label="value"
                                map-options
                                :options="
                                  actionOverDues[indexOfSubType].subOptions
                                "
                                @input="
                                  setSubOfSubType(
                                    actions.actions.overdueRule[index].task[0],
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
                                  actions.actions.overdueRule[index].task[0] ==
                                  'user'
                                "
                                dense
                                class="col-3 input-extra-padding"
                                outlined
                                options-dense
                                v-model="
                                  actions.actions.overdueRule[index].task[1]
                                "
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
                              />
                              <q-select
                                v-else
                                dense
                                class="col-3 input-extra-padding"
                                outlined
                                options-dense
                                v-model="
                                  actions.actions.overdueRule[index].task[1]
                                "
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
                            <div
                              v-if="editDefaultActionItem"
                              class="q-ml-md col-2"
                            >
                              <q-btn
                                color="primary"
                                label="Save"
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

                    <tr
                      class="table-tr"
                      v-for="(item, index) in allAction"
                      :key="index"
                    >
                      <td class="table-td">{{ item.name }}</td>
                      <td class="table-td">workflow(Need info)</td>
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
                          />
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
                              <q-item
                                clickable
                                v-close-popup
                                @click="toCopyRule(item)"
                              >
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
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
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
import { validateEmail } from '@utils/validation';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  name: 'Admin',
  components: { AutoCompleteAddress },

  data() {
    return {
      copyRule: false,
      workflowActionItem: '',
      editAccountSummary: false,
      editCompanyDetails: false,
      editPhotoIDDetails: false,
      isEditable: false,
      ActionItemKebabMenu: false,
      editedActionItemID: '',
      selectedWorkflowID: '',
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
        triggerEvent: {
          type: '',
          task: []
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
    ])
  },

  methods: {
    toGetStateShortName,
    onPhoneNumberClick,
    onEmailClick,
    showPhoneNumber,
    toUpperCase(plan) {
      return plan[0].toUpperCase() + plan.slice(1);
    },
    toActionItemCancel() {
      this.copyRule = false;
      this.addDefaultActionDialogBox = false;
    },
    ...mapActions([
      'editAdminActionItem',
      'getActionOverDues',
      'getActionCompletion',
      'getActionReasons',
      'getWorkflowAction',
      'actionItemToggleSwitch',
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

    //to Delete Admin Action item
    async toDeleteActionItem(item) {
      const payload = {
        itemID: item.id,
        workFlowID: item.workflowId
      };
      this.adminActionItemDelete(payload);
      await this.getAllWorkFlow(this.claimType);
    },
    addDefaultActionItem() {
      this.addDefaultActionDialogBox = true;
      this.editDefaultActionItem = false;
      this.workflowActionItem = '';
      this.actions = {
        name: '',
        isEnabled: false,
        triggerEvent: {
          type: '',
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
      };
    },
    //function is used to switch the toggle status
    toActionItemToggleSwitch(item) {
      if (item.isEnabled) {
        var toggleDetail = {
          toggleStatus: 'disable',
          ruleId: item.id,
          workflowId: item.workflowId
        };
        this.actionItemToggleSwitch(toggleDetail);
      } else {
        var toggleDetail = {
          toggleStatus: 'enable',
          ruleId: item.id,
          workflowId: item.workflowId
        };
        this.actionItemToggleSwitch(toggleDetail);
      }
    },
    //function is used to copy the rule
    toCopyRule(item) {
      this.copyRule = true;
      this.toEditActionItem(item);
    },
    //function is used to edit the rule item
    toEditActionItem(item) {
      this.addDefaultActionDialogBox = true;
      this.editDefaultActionItem = true;
      this.editedActionItemID = item.id;
      this.actions.name = item.name;
      this.workflowActionItem = item.workflowActionItem;
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
      if (this.actions.assignedTo[0].type != '')
        this.callAssignApi(
          this.actions.assignedTo[0].type,
          (this.isEditable = false)
        );
      if (this.actions.assignedTo[0].name != '')
        this.setAssignTo(this.actions.assignedTo[0].name);

      for (let i = 0; i < this.actions.actions.completionRule.length; i++) {
        if (this.actions.actions.completionRule[i].type != '')
          this.setSubTypeOfAction(
            this.actions.actions.completionRule[i].type,
            i,
            (this.isEditable = false)
          );

        if (this.actions.actions.completionRule[i].task.length != 0)
          this.setSubTypeForAction(
            this.actions.actions.completionRule[i].task[0],
            this.indexOfSubTypeOfCompletion,
            i,
            (this.isEditable = false)
          );
      }
      for (let i = 0; i < this.actions.actions.overdueRule.length; i++) {
        if (this.actions.actions.overdueRule[i].type != '')
          this.setSubType(
            this.actions.actions.overdueRule[i].type,
            i,
            (this.isEditable = false)
          );
        if (this.actions.actions.overdueRule[i].task.length != 0)
          this.setSubOfSubType(
            this.actions.actions.overdueRule[i].task[0],
            this.indexOfSubType,
            i,
            false
          );
      }
    },
    //this is for action item kebeb menu item
    toActionItemKebabMenu(item) {
      if (this.ActionItemKebabMenu == item.name) this.ActionItemKebabMenu = '';
      //this is used to disable the kebab menu , when click it on again.
      else this.ActionItemKebabMenu = item.name;
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
        this.actions.assignedTo[0].machineValue =
          obj.attributes.roles[0].machineValue;
      } else {
        const obj = this.roleTypes.find(item => {
          return item.name == val;
        });

        this.actions.assignedTo[0].id = obj.id ? obj.id : '';
        this.actions.assignedTo[0].machineValue = obj.machineValue
          ? obj.machineValue
          : '';
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
      if (success) {
        if (this.organizations.users.mailingAddress.houseNumber) {
          this.organizations.users.mailingAddress.address1 =
            this.organizations.users.mailingAddress.houseNumber +
            ', ' +
            this.organizations.users.mailingAddress.address1;
        }
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
      if (success) {
        if (this.users.mailingAddress.houseNumber) {
          this.users.mailingAddress.address1 =
            this.users.mailingAddress.houseNumber +
            ', ' +
            this.users.mailingAddress.address1;
        }

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

    //  Finding and Clearing the Other Sub data while changing the main DRopdown data
    createdWhenSubType(value, isEditable) {
      if (isEditable) {
        if (this.actions.triggerEvent.task && this.actions.triggerEvent.task[0])
          this.actions.triggerEvent.task[0] = '';
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

    // Action OverDue Sub Dropdown Index set and also used to find the index of selected overdueRule.
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
        this.indexOfSubType = index;
      }
    },

    // this function is used to update the selected subOption of overdueRule, and also used to find the index of selected subtoption index.
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

        this.indexOfSubOfSubType = obj;
      }
    },

    // this function is used to update the subOption of completionRule row and use to find the index value of selected completionRule subOption, which we used further to display subOption of Selected SubOption.
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
        this.indexOfSubOfSubTypeOfCompletion = ob;
      }
    },

    RemoveOverDue(val) {
      this.actions.actions.overdueRule.splice(val, 1);
    },
    // OnSaveButtonClick
    async onClickSaveButton() {
      /* This Filter function is used for elimination the null and empty values from the array     */
      this.actions.actions.completionRule.forEach(val => {
        val.task = val.task.filter(function (el) {
          return el != '';
        });
      });

      this.actions.actions.overdueRule.forEach(val => {
        val.task = val.task.filter(function (el) {
          return el != '';
        });
      });

      this.actions.triggerEvent.task = this.actions.triggerEvent.task.filter(
        function (el) {
          return el != '';
        }
      );
      const param = {
        machineValue: this.workflowActionItem,
        data: this.actions
      };
      await this.addWorkflowAction(param);
      this.addDefaultActionDialogBox = false;
      this.getAllWorkFlow(this.workflowActionItem);
      /*  Clearing the form     */
      (this.workflowActionItem = ''),
        (this.actions = {
          name: '',

          isEnabled: false,
          triggerEvent: {
            type: '',
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
    },

    //on Edit Button For Action Item
    async onClickEditSaveButton() {
      const payload = {
        id: this.editedActionItemID,
        workflowID: this.selectedWorkflowID,
        attributes: {
          name: this.actions.name,
          isEnabled: this.actions.isEnabled,
          triggerEvent: {
            type: this.actions.triggerEvent.type,
            task: this.actions.triggerEvent.task
          },
          assignedTo: [
            {
              type: this.actions.assignedTo[0].type,
              name: this.actions.assignedTo[0].name,
              id: this.actions.assignedTo[0].id
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
      this.editDefaultActionItem = false;
      this.editedActionItemID = '';
      this.addDefaultActionDialogBox = false;
      await this.editAdminActionItem(payload);

      this.getAllWorkFlow(this.claimType);
      /*  Clearing the form     */

      this.actions = {
        name: '',
        isEnabled: false,
        triggerEvent: {
          type: '',
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
      };
    },

    // Remove Completion Multiple Values
    removeCompletionAction(val) {
      this.actions.actions.completionRule.splice(val, 1);
    },
    cancelAccountSummaryUpdate() {
      this.editAccountSummary = false;
      // update data to previous state
    },
    cancelCompanyDetailsUpdate() {
      this.editCompanyDetails = false;
      // update data to previous state
    },
    cancelPhotoIDUpdate() {
      this.editPhotoIDDetails = false;
      // update data to previous state
    },
    copyUserAddress() {
      this.organizations.users.mailingAddress = this.user.mailingAddress;
    },
    addAnotherOnClick() {
      this.actions.actions.completionRule.push({
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

    // this function is used to update the subOptions of completionRule option and also used to get the index of seleted completionRule action.
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
        this.indexOfSubTypeOfCompletion = indexOfCompletionAction;
      }
    }
  },

  async created() {
    this.getAllUsers();
    this.paidUnpaidUserDetails;
    this.getOrganization();

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
    this.users.contact.number = showPhoneNumber(this.user.phoneNumber.number);
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
