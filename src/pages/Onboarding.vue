<template>
  <q-page class="window-height bg-background full-width">
    <br />
    <!-- This Style is needed for inner div-->
    <div class="q-pa-xs" style="height: 60%; width: 95%">
      <div class="full-width">
        <div class="my-font text-bold row q-my-lg q-mx-xl">
          Setup Company Account
        </div>
      </div>
      <!-- Height given for there Inner 2 div -->
      <div class="row full-width" style="height: 107%" flat bordered>
        <q-separator vertical />
        <!-- This is the Main Div -->
        <q-card class="col-11 q-ml-xl full-height" flat bordered>
          <div>
            <q-splitter
              v-model="splitterModel"
              style="height: 478px"
              flat
              bordered
            >
              <template v-slot:before>
                <q-tabs v-model="tab" vertical class="">
                  <div
                    class="row justify-between text-bold text-h7"
                    :style="
                      tab == 'addUser'
                        ? { 'background-color': '#E8E8E8' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    <div class="col-5 q-py-md q-ml-xl">Add User</div>
                    <div class="q-mt-md col-1 q-mr-lg" v-if="tab != 'addUser'">
                      <q-icon size="xs" color="primary" name="done" />
                    </div>
                  </div>

                  <div
                    class="q-pb-lg row justify-between text-bold text-h7"
                    name="offcInfo"
                    label="Office Staff Info"
                    :style="
                      tab == 'offcInfo'
                        ? { 'background-color': '#E8E8E8' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    <div class="col-5 q-pt-md q-ml-xl">Office Staff Info</div>
                    <div
                      class="q-mt-md col-1 q-mr-lg"
                      v-if="tab != 'addUser' && tab != 'offcInfo'"
                    >
                      <q-icon size="xs" color="primary" name="done" />
                    </div>
                  </div>
                  <div
                    class="q-pb-lg row justify-between text-bold text-h7"
                    name="sales"
                    label="Sales Representatives"
                    :style="
                      tab == 'sales'
                        ? { 'background-color': '#E8E8E8' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    <div class="col-7 q-pt-md q-ml-xl">
                      Sales Representative
                    </div>
                    <div
                      class="q-mt-md col-1 q-mr-lg"
                      v-if="
                        tab != 'addUser' && tab != 'offcInfo' && tab != 'sales'
                      "
                    >
                      <q-icon size="xs" color="primary" name="done" />
                    </div>
                  </div>
                  <div
                    class="q-pb-lg row justify-between text-bold text-h7"
                    :style="
                      tab != 'addUser' && tab != 'offcInfo' && tab != 'sales'
                        ? { 'background-color': '#E8E8E8' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    <div class="col-7 q-pt-md q-ml-xl">Set Configuration</div>
                    <div
                      class="q-mt-md col-1 q-mr-lg"
                      v-if="tab == 'claimSeverity'"
                    >
                      <q-icon size="xs" color="primary" name="done" />
                    </div>
                  </div>
                  <!-- This is Scrolling div -->
                  <div
                    style="overflow: auto; max-height: 300px"
                    v-if="
                      tab != 'addUser' && tab != 'offcInfo' && tab != 'sales'
                    "
                  >
                    <div
                      name="inspectionType"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'inspectionType'
                          ? { 'background-color': '	#E8E8E8' }
                          : 'white'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">InspectionType</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="industryType"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'industryType'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'white'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Industry Type</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="honorific"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'honorific'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'white'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Honorific</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="phoneType"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'phoneType'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Phone Type</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="clientType"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'clientType'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Clients Type</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType' &&
                            tab != 'clientType'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="policyCategories"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'policyCategories'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Policy Categories</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType' &&
                            tab != 'clientType' &&
                            tab != 'policyCategories'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="policyType"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'policyType'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Policy Type</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType' &&
                            tab != 'clientType' &&
                            tab != 'policyType' &&
                            tab != 'policyCategories'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="propertyType"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'propertyType'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Property Type</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType' &&
                            tab != 'clientType' &&
                            tab != 'policyType' &&
                            tab != 'propertyType' &&
                            tab != 'policyCategories'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="claimReason"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'claimReason'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Claim Reason</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType' &&
                            tab != 'clientType' &&
                            tab != 'policyType' &&
                            tab != 'propertyType' &&
                            tab != 'claimReason' &&
                            tab != 'policyCategories'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      name="lossCause"
                      class="q-pb-lg row justify-between text-bold text-h7"
                      :style="
                        tab == 'lossCause'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Loss Cause</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType' &&
                            tab != 'clientType' &&
                            tab != 'policyType' &&
                            tab != 'propertyType' &&
                            tab != 'claimReason' &&
                            tab != 'lossCause' &&
                            tab != 'policyCategories'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                    <div
                      class="q-pb-lg row justify-between text-bold text-h7"
                      name="claimSeverity"
                      :style="
                        tab == 'claimSeverity'
                          ? { 'background-color': '#E8E8E8' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      <div class="col-7 q-pt-md q-ml-xl">Claim Severity</div>
                      <div
                        class="q-mt-md col-1 q-mr-lg"
                        v-if="
                          tab != 'addUser' &&
                            tab != 'offcInfo' &&
                            tab != 'sales' &&
                            tab != 'inspectionType' &&
                            tab != 'industryType' &&
                            tab != 'honorific' &&
                            tab != 'phoneType' &&
                            tab != 'clientType' &&
                            tab != 'policyType' &&
                            tab != 'propertyType' &&
                            tab != 'claimReason' &&
                            tab != 'lossCause' &&
                            tab != 'policyCategories'
                        "
                      >
                        <q-icon size="xs" color="primary" name="done" />
                      </div>
                    </div>
                  </div>
                </q-tabs>
              </template>
              <!-- Main Template -->
              <template v-slot:after>
                <q-tab-panels
                  class="bg-grey-3"
                  style="height: 400px"
                  v-model="tab"
                  animated
                  swipeable
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel name="addUser">
                    <q-form ref="addUserForm">
                      <div
                        outlined
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0"
                      >
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 text-bold">
                            User &nbsp;{{ index + 1 }}
                          </div>
                        </div>
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 q-mx-xl q-mt-lg">First Name *</div>
                          <div class="col-4 q-mx-lg q-mt-lg">Last Name *</div>
                        </div>
                        <div class="row q-mt-xs justify-between full-width">
                          <div class="col-6">
                            <q-input
                              v-model="users[index].contact.fname"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                            />
                          </div>
                          <div class="col-6">
                            <q-input
                              v-model="users[index].contact.lname"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                            />
                          </div>
                        </div>
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 q-mx-xl q-mt-lg">Email*</div>
                          <div class="col-4 q-mx-lg q-mt-lg">Role *</div>
                        </div>
                        <div class="row q-mt-xs justify-between full-width">
                          <div class="col-6">
                            <q-input
                              v-model="users[index].email"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                              lazy-rules
                              :rules="[
                                val =>
                                  validateEmail(val) ||
                                  'You have entered an invalid email address!'
                              ]"
                            />
                          </div>
                          <div class="col-6">
                            <q-select
                              v-model="users[index].roles[0]"
                              outlined
                              style="width: 300px"
                              class="q-mx-xl"
                              :options="options"
                              label="role"
                              :rules="[
                                val =>
                                  (val && val.length > 0) || 'Role is Required'
                              ]"
                            />
                          </div>
                        </div>
                      </div>
                    </q-form>

                    <div class="row q-py-md q-px-xl">
                      <q-btn
                        outline
                        class="q-mx-md"
                        @click="addAnotherContact"
                        color="primary"
                        label="Add More"
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
                  <!-- Office Information -->
                  <q-tab-panel name="offcInfo">
                    <q-form ref="addUserForm">
                      <div
                        outlined
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0"
                      >
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 text-bold">
                            Office Staff &nbsp;{{ index + 1 }}
                          </div>
                        </div>
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 q-mx-xl q-mt-lg">First Name *</div>
                          <div class="col-4 q-mx-lg q-mt-lg">Last Name *</div>
                        </div>
                        <div class="row q-mt-xs justify-between full-width">
                          <div class="col-6">
                            <q-input
                              v-model="users[index].contact.fname"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                            />
                          </div>
                          <div class="col-6">
                            <q-input
                              v-model="users[index].contact.lname"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                            />
                          </div>
                        </div>
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 q-mx-xl q-mt-lg">Email*</div>
                          <div class="col-4 q-mx-lg q-mt-lg">Role *</div>
                        </div>
                        <div class="row q-mt-xs justify-between full-width">
                          <div class="col-6">
                            <q-input
                              v-model="users[index].email"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                              lazy-rules
                              :rules="[
                                val =>
                                  validateEmail(val) ||
                                  'You have entered an invalid email address!'
                              ]"
                            />
                          </div>
                          <div class="col-6">
                            <q-select
                              v-model="users[index].roles[0]"
                              outlined
                              style="width: 300px"
                              class="q-mx-xl"
                              :options="options"
                              label="role"
                              :rules="[
                                val =>
                                  (val && val.length > 0) || 'Role is Required'
                              ]"
                            />
                          </div>
                        </div>
                      </div>
                    </q-form>

                    <div class="row q-py-md q-px-xl">
                      <q-btn
                        outline
                        class="q-mx-md"
                        @click="addAnotherContact"
                        color="primary"
                        label="Add More"
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
                  <!-- Sales  Representative -->
                  <q-tab-panel name="sales">
                    <div class="row">
                      <p class="q-my-auto">
                        <label> Does Company Have Sales Representative </label>
                      </p>
                      <q-toggle
                        class="q-ml-xs"
                        v-model="toggle"
                        @input="onToggleChange"
                      />
                    </div>
                    <q-form ref="addUserForm">
                      <div
                        outlined
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0 && toggle == true"
                      >
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 text-bold">
                            Sales Representative &nbsp;{{ index + 1 }}
                          </div>
                        </div>

                        <div class="q-mt-xs row full-width">
                          <div class="col-5 q-mx-xl q-mt-lg">First Name *</div>
                          <div class="col-4 q-mx-lg q-mt-lg">Last Name *</div>
                        </div>
                        <div class="row q-mt-xs justify-between full-width">
                          <div class="col-6">
                            <q-input
                              v-model="users[index].contact.fname"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                              :disable="toggle == false"
                            />
                          </div>
                          <div class="col-6">
                            <q-input
                              v-model="users[index].contact.lname"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                              :disable="toggle == false"
                            />
                          </div>
                        </div>
                        <div class="q-mt-xs row full-width">
                          <div class="col-5 q-mx-xl q-mt-lg">Email*</div>
                          <div class="col-4 q-mx-lg q-mt-lg">Role *</div>
                        </div>
                        <div class="row q-mt-xs justify-between full-width">
                          <div class="col-6">
                            <q-input
                              v-model="users[index].email"
                              class="q-mx-xl"
                              style="width: 300px"
                              outlined
                              :disable="toggle == false"
                              lazy-rules
                              :rules="[
                                val =>
                                  validateEmail(val) ||
                                  'You have entered an invalid email address!'
                              ]"
                            />
                          </div>

                          <div class="col-6">
                            <q-select
                              v-model="users[index].roles[0]"
                              outlined
                              style="width: 300px"
                              class="q-mx-xl"
                              :options="options"
                              :disable="toggle == false"
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

                    <div class="row q-py-md q-px-xl">
                      <q-btn
                        v-if="toggle == true"
                        outline
                        class="q-mx-md"
                        @click="addAnotherContact"
                        color="primary"
                        label="Add More"
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

                  <!-- Inspection Type -->
                  <q-tab-panel name="inspectionType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class="text-bold col-4">Inspection Type</div>
                      <div
                        class="col-2 text-primary"
                        @click="InspectionDialogBox = true"
                      >
                        Add Inspection Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Inspection Type -->
                    <div class="q-pa-lg" v-if="!inspectionTypes">
                      You Have Not Added Any Inspection Type Yet
                    </div>
                    <div v-else class="row">
                      <div class="row full-width">
                        <div class="col-4 q-ml-xl text-bold">
                          Inspection Type
                        </div>
                        <div class="col-3 q-ml-lg text-bold">Duration</div>
                        <div class="col-3 q-ml-lg text-center text-bold">
                          Edit/Delete
                        </div>
                      </div>
                      <br />

                      <div
                        class="row full-width"
                        v-for="(ins, index) in inspectionTypes"
                        v-if="index >= 0"
                      >
                        <div class="col-8 q-ml-xl bg-grey-2">
                          <div class="col-5 q-pl-md">
                            {{ inspectionTypes[index].value }}
                          </div>

                          <div
                            class="row q-ml-lg q-mb-md col-5"
                            v-for="(ins, index1) in inspectionTypes[index]
                              .subtypes"
                            v-if="index >= 0"
                          >
                            <div class="q-pl-lg col-6">
                              {{
                                inspectionTypes[index].subtypes[index1].value
                              }}
                            </div>
                            <div class="q-pl-lg">
                              {{
                                inspectionTypes[index].subtypes[index1].duration
                              }}
                            </div>
                          </div>
                        </div>
                        <div class="col-2 bg-grey-2 q-pl-xl">
                          <q-icon size="sm" color="primary" name="create" />
                          <q-icon
                            class="q-ml-xs"
                            size="sm"
                            color="primary"
                            name="delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-tab-panel>
                  <!-- Industry Type -->
                  <q-tab-panel name="industryType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class="text-bold col-4">IndustryType</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Industry Type')"
                      >
                        Add IndustryType
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!vendorIndustries">
                      You Have Not Added Any IndustryType yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="q-py-xs row justify-between full-width"
                        v-for="(contactInfo, index) in vendorIndustries"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl q-py-xs">
                          {{ vendorIndustries[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>
                  <!-- Honorific -->
                  <q-tab-panel name="honorific">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class="text-bold col-4">Honorific</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Honorofic')"
                      >
                        Add Honorific
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!titles">
                      You Have Not Added Any Honorific yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in titles"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ titles[index].value }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>

                  <!-- Phone Type -->
                  <q-tab-panel name="phoneType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class="text-bold col-4">Phone Type</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Phone Type')"
                      >
                        Add Phone Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!contactTypes">
                      You Have Not Added Any Phone Type Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in contactTypes"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ contactTypes[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>
                  <!-- Client Type -->
                  <q-tab-panel name="clientType">
                    <div class="row justify-between">
                      <div class="text-bold col-4">Client Type</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Client Type')"
                      >
                        Add Client Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!clientTypes">
                      You Have Not Added Any Client Type Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in clientTypes"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ clientTypes[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>
                  <!-- Policy Category -->
                  <q-tab-panel name="policyCategories">
                    <div class="row justify-between">
                      <div class="text-bold col-4">Policy Categories</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Policy Categories')"
                      >
                        Add Policy Categories
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!policyCategories">
                      You Have Not Added Any Policy Categories Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in policyCategories"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ policyCategories[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>

                  <!-- Policy Type -->
                  <q-tab-panel name="policyType">
                    <div class="row justify-between">
                      <div class="text-bold col-4">Policy Type</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Policy Type')"
                      >
                        Add Policy Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!policyTypes">
                      You Have Not Added Any Policy Type Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in policyTypes"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ policyTypes[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>

                  <!-- property Type -->
                  <q-tab-panel name="propertyType">
                    <div class="row justify-between">
                      <div class="text-bold col-4">Property Type</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Property Type')"
                      >
                        Add Property Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!propertyTypes">
                      You Have Not Added Any Property Type Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in propertyTypes"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ propertyTypes[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>

                  <!-- Claim Reason -->
                  <q-tab-panel name="claimReason">
                    <div class="row justify-between">
                      <div class="text-bold col-4">Claim Reason</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Claim Reason')"
                      >
                        Add Claim Reason
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!claimReasons">
                      You Have Not Added Any Claim Reason Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in claimReasons"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ claimReasons[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>

                  <!-- Loss Cause -->
                  <q-tab-panel name="lossCause">
                    <div class="row justify-between">
                      <div class="text-bold col-4">Loss Cause</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Loss Cause')"
                      >
                        Add Loss Cause
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!lossCauses">
                      You Have Not Added Any Loss Cause Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in lossCauses"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ lossCauses[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>

                  <!-- Claim Severity -->
                  <q-tab-panel name="claimSeverity">
                    <div class="row justify-between">
                      <div class="text-bold col-4">Claim Severity</div>
                      <div
                        class="col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Claim Severity')"
                      >
                        Add Claim Severity
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!claimSeverity">
                      You Have Not Added Any Claim Severity Yet
                    </div>
                    <div v-else class="bg-grey-1">
                      <div
                        class="row justify-between full-width"
                        v-for="(contactInfo, index) in claimSeverity"
                        v-if="index >= 0"
                      >
                        <div class="q-px-xl">
                          {{ claimSeverity[index].name }}
                        </div>

                        <div class="col-2 item-center">
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
                      </div>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
                <!-- This is Submit Button -->
                <div>
                  <q-separator />
                </div>
                <div class="q-mt-lg row justify-center">
                  <q-btn
                    v-if="
                      tab == 'addUser' || tab == 'offcInfo' || tab == 'sales'
                    "
                    color="primary"
                    label="submit and Proceed"
                    class="q-mx-lg"
                    @click="onSubmit"
                  />
                  <q-btn
                    v-if="
                      tab != 'addUser' &&
                        tab != 'offcInfo' &&
                        tab != 'sales' &&
                        tab != 'claimSeverity'
                    "
                    color="primary"
                    label="Next"
                    class="q-mx-lg"
                    @click="onClickNext"
                  />
                  <q-btn
                    v-if="tab == 'claimSeverity'"
                    color="primary"
                    label="Go To Dashboard"
                    class="q-mx-lg"
                    @click="SendToDashboard"
                  />
                </div>
                <div class="q-mt-md">
                  <q-separator />
                </div>
              </template>
            </q-splitter>
            <!-- This is First Dialog -->
            <q-dialog v-model="InspectionDialogBox" persistent>
              <q-card style="width: 700px; height: 600px; max-width: 1000vw">
                <q-bar class="row justify-between" style="height: 50px">
                  <div class="col-46 q-px-xl text-bold">
                    Add Inspection Type
                  </div>
                  <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip>Close</q-tooltip>
                  </q-btn>
                </q-bar>

                <q-card-section>
                  <div
                    v-for="(contactInfo, index) in inspection.subtypes"
                    v-if="index >= 0"
                  >
                    <div
                      class="column bg-grey-3 q-pa-xl"
                      style="margin-left: 100px; margin-right: 100px"
                    >
                      <div class="q-pa-xs">
                        <q-input
                          v-model="inspection.value"
                          label="Type Of Inspection"
                          lazy-rules
                          v-if="index == 0"
                        />

                        <q-input
                          v-model="inspection.subtypes[index].value"
                          label="Sub Type Of Inspection"
                          lazy-rules
                        />
                        Default Duration (hr))
                        <q-slider
                          class="q-mt-lg"
                          name="speed"
                          v-model="inspection.subtypes[index].duration"
                          label-always
                          :min="0.5"
                          :max="5"
                          :step="0.5"
                        />
                      </div>
                    </div>
                    <br />
                  </div>

                  <div class="row justify-between text-primary q-mx-xl">
                    <div class="q-ml-xl" @click="addAnotherSubType">
                      + Another Sub Type Of Inspection
                    </div>
                    <div
                      class="q-mr-xl"
                      v-if="inspection.subtypes[1]"
                      @click="onClickRemoveSubType"
                    >
                      Remove
                    </div>
                  </div>
                  <div class="row justify-center q-pa-lg">
                    <div>
                      <q-btn
                        color="primary"
                        label="Clear"
                        class="q-mx-lg"
                        @click="onClickClearInspectionType"
                      />
                    </div>
                    <div>
                      <q-btn
                        color="primary"
                        label="Save"
                        class="q-mx-lg"
                        @click="onSaveInspectionType"
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!-- This is Secondary Dialog Box -->
            <q-dialog v-model="industryTypeDialogBox" persistent>
              <q-card style="width: 700px; height: 400px; max-width: 1000vw">
                <q-bar class="row justify-between" style="height: 50px">
                  <div class="col-7 q-px-xl text-bold">
                    Add {{ industryTypeDialogBoxName }}
                  </div>
                  <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip>Close</q-tooltip>
                  </q-btn>
                </q-bar>

                <q-card-section>
                  <div
                    class="q-pa-xl"
                    style="margin-left: 50px; margin-right: 50px"
                  >
                    <div class="column q-pa-lg">
                      <div class="q-px-xl q-py-xs">
                        {{ industryTypeDialogBoxName }}
                      </div>
                      <q-form ref="SecondaryForm">
                        <div class="q-pl-xs">
                          <q-input
                            v-model="industryType.value"
                            class="q-mx-xl"
                            style="width: 300px"
                            outlined
                            :rules="[
                              val =>
                                (val && val.length > 0) ||
                                'Please Fill ' + industryTypeDialogBoxName
                            ]"
                          />
                        </div>
                      </q-form>
                    </div>
                    <div class="row justify-center q-pa-lg">
                      <div>
                        <q-btn
                          color="primary"
                          label="Clear"
                          class="q-mx-lg"
                          @click="onClickClearSecondaryDilogBoxData"
                        />
                      </div>
                      <div>
                        <q-btn
                          color="primary"
                          label="Save"
                          class="q-mx-lg"
                          @click="
                            onSubmitSecondaryDilogBox(industryTypeDialogBoxName)
                          "
                        />
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>

            <div class="row full-width q-pa-xl">
              <div class="col-3"></div>
              <div class="col-7 justify-center q-ml-xl"></div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
// import { mapActions } from 'vuex';
import { mapGetters, mapActions } from 'vuex';
import { validateEmail } from '@utils/validation';
import { getToken, getCurrentUser } from '@utils/auth';
export default {
  name: 'addUser',
  data() {
    return {
      InspectionDialogBox: false,
      industryTypeDialogBox: false,
      industryTypeDialogBoxName: '',
      len: 1,
      toggle: false,

      // this is for static dropdown
      options: ['Manager', 'Staff'],
      isShowRemoveButton: false,
      tab: 'addUser',
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
        value: '',

        subtypes: [
          { value: ' ', duration: 0.5, unit: 'hour', machineValue: '' }
        ]
      },
      industryType: {
        value: '',
        machineValue: ''
      }
    };
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'titles',
      'inspectionTypes',
      'vendorIndustries',
      'clientTypes',
      'policyTypes',
      'policyCategories',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity'
    ])
  },
  mounted() {
    this.getTitles();
    this.getContactTypes();
    this.getVendorIndustries();
    this.getInspectionTypes();
    this.getClientTypes();
    this.getPolicyTypes();
    this.getPolicyCategory();
    this.getPropertyTypes();
    this.getLossCauses();
    this.getSeverityClaim();
    this.getClaimReasons();
  },

  created() {
    if (getCurrentUser() && getCurrentUser().attributes) {
      this.tab = getCurrentUser().attributes.onboard.step;
    }
  },
  methods: {
    ...mapActions([
      'addUser',
      'addInspectionType',
      'addHonorifics',
      'addIndustry',
      'addPhone',
      'addClientType',
      'addPolicy',
      'addPolicyCategories',
      'addProperty',
      'addClaimReason',
      'addLoss',
      'addClaimSeverity',
      'addOnboardingStep',
      'getTitles',
      'getClientTypes',
      'getContactTypes',
      'getInspectionTypes',
      'getVendorIndustries',
      'getPolicyTypes',
      'getPolicyCategory',
      'getPropertyTypes',
      'getSeverityClaim',
      'getClaimReasons',
      'getLossCauses'
    ]),
    validateEmail,
    //  Secondary Dilog Box Submit
    async onSubmitSecondaryDilogBox(typeName) {
      var vald = await this.$refs.SecondaryForm.validate();
      if (vald) {
        switch (typeName) {
          case 'Honorofic':
            var response = await this.addHonorifics(this.industryType);
            break;

          case 'Industry Type':
            var response = await this.addIndustry(this.industryType);
            break;
          case 'Phone Type':
            var response = await this.addPhone(this.industryType);
            break;
          case 'Client Type':
            var response = await this.addClientType(this.industryType);
            break;
          case 'Policy Type':
            var response = await this.addPolicy(this.industryType);
            break;
          case 'Policy Categories':
            var response = await this.addPolicyCategories(this.industryType);
            break;
          case 'Property Type':
            var response = await this.addProperty(this.industryType);
            break;
          case 'Claim Reason':
            var response = await this.addClaimReason(this.industryType);
            break;
          case 'Loss Cause':
            var response = await this.addLoss(this.industryType);
            break;
          case 'Claim Severity':
            var response = await this.addClaimSeverity(this.industryType);
            break;
        }
        if (response) {
          const data = {
            payload: { step: this.tab },
            id: getCurrentUser().id
          };
          await this.addOnboardingStep(data);
          this.getTitles();
          this.getVendorIndustries();
          this.getContactTypes();
          this.getClientTypes();
          this.getPolicyTypes();
          this.getPolicyCategory();
          this.getPropertyTypes();
          this.getLossCauses();
          this.getSeverityClaim();
          this.getClaimReasons();
          this.industryTypeDialogBox = false;
          this.industryType.value = '';
          vald = '';
        }
      }
    },
    // This is Secondary Dialog Box
    onclickSecondaryDialogBox(value) {
      this.industryTypeDialogBoxName = value;
      this.industryTypeDialogBox = true;
    },
    // on Clicking Submit Button on
    async onSubmit() {
      const success = await this.$refs.addUserForm.validate();
      if (this.tab == 'sales' && this.toggle == false) {
        this.tab = 'inspectionType';
        return;
      }
      if (success) {
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
        if (this.tab == 'addUser') {
          this.tab = 'offcInfo';
        } else if (this.tab == 'offcInfo') {
          this.tab = 'sales';
        } else if (this.tab == 'sales') {
          this.tab = 'inspectionType';
        }
        this.isShowRemoveButton = false;
      }
    },

    async addAnotherContact() {
      const success = await this.$refs.addUserForm.validate();
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
            message: 'Please fill the first Name and Email First',
            position: 'top',
            type: 'negative'
          });
        }
      }
    },
    //  For Remove  AddUser,OfficeStraffInfo and Sales
    removeAnotherContact() {
      const len = this.users.length;
      if (len === 2) {
        this.isShowRemoveButton = false;
      }
      this.users.pop();
    },
    // For adding SubType of Inspection Type
    addAnotherSubType() {
      this.inspection.subtypes.push({ type: ' ', duration: 0.5 });
    },
    // For Removing SubType
    onClickRemoveSubType() {
      this.inspection.subtypes.pop();
    },
    // For Clearing  the Form In Inspection Type
    onClickClearInspectionType() {
      this.inspection = {
        type: '',
        subtypes: [{ type: ' ', duration: 0.5 }]
      };
    },
    //For clearing the Secondary Dilog box Data when clicked to clearing
    onClickClearSecondaryDilogBoxData() {
      this.industryType.value = '';
    },
    // onSaveInspectionType
    async onSaveInspectionType() {
      const response = await this.addInspectionType(this.inspection);
      if (response) {
        this.getInspectionTypes();
        this.InspectionDialogBox = false;
        this.inspection = {
          value: '',

          subtypes: [
            { value: ' ', duration: 0.5, unit: 'hour', machineValue: '' }
          ]
        };
      } else {
        this.$q.notify({
          message: ' Server Response Failed',
          position: 'top',
          type: 'negative'
        });
      }
    },
    SendToDashboard() {
      this.$router.push('/dashboard');
    },
    onClickNext() {
      if (this.tab == 'inspectionType') {
        this.tab = 'industryType';
      } else if (this.tab == 'industryType') {
        this.tab = 'honorific';
      } else if (this.tab == 'honorific') {
        this.tab = 'phoneType';
      } else if (this.tab == 'phoneType') {
        this.tab = 'clientType';
      } else if (this.tab == 'clientType') {
        this.tab = 'policyCategories';
      } else if (this.tab == 'policyCategories') {
        this.tab = 'policyType';
      } else if (this.tab == 'policyType') {
        this.tab = 'propertyType';
      } else if (this.tab == 'propertyType') {
        this.tab = 'claimReason';
      } else if (this.tab == 'claimReason') {
        this.tab = 'lossCause';
      } else if (this.tab == 'lossCause') {
        this.tab = 'claimSeverity';
      }
    },
    onToggleChange() {
      if (this.toggle == false) {
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
      }
    }

    // End of Functions
  }
};
</script>
<style lang="scss">
.th,
td {
  border: 1px solid black;
  width: 200px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
