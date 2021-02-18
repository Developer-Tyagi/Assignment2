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
                    class="  row  justify-between text-bold text-h7"
                    :style="
                      tab == 'adduser'
                        ? { 'background-color': '' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    <div
                      class="col-5 q-py-md q-ml-xl
                    "
                    >
                      Add User
                    </div>
                    <div class=" q-mt-md col-1 q-mr-lg">
                      <q-icon size="sm" color="green" name="done" />
                    </div>
                  </div>

                  <div
                    class="q-py-md text-center text-bold text-h7"
                    name="offcInfo"
                    label="Office Staff Info"
                    :style="
                      tab == 'offcInfo'
                        ? { 'background-color': '#CDFE92' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    Office Staff Info
                  </div>
                  <div
                    class="q-py-md text-center text-bold text-h7"
                    name="sales"
                    label="Sales Representatives"
                    :style="
                      tab == 'sales'
                        ? { 'background-color': '#CDFE92' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    Sales Representatives
                  </div>
                  <div
                    class="q-py-md text-center text-bold text-h7"
                    :style="
                      tab == 'inspectionType'
                        ? { 'background-color': '#CDFE92' }
                        : tab == 'sales' ||
                          tab == 'offcInfo' ||
                          tab == 'inspectionType' ||
                          tab == 'industryType'
                        ? { 'background-color': 'white' }
                        : 'red'
                    "
                  >
                    Set Configuration
                  </div>
                  <!-- This is Scrolling div -->
                  <div
                    style="overflow:auto;max-height:300px"
                    v-if="
                      tab != 'adduser' && tab != 'offcInfo' && tab != 'sales'
                    "
                  >
                    <div
                      name="inspectionType"
                      class="q-py-md text-center"
                      :style="
                        tab == 'inspectionType'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      InspectionType
                    </div>
                    <div
                      name="industryType"
                      class="q-py-md text-center"
                      :style="
                        tab == 'industryType'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Industry Type
                    </div>
                    <div
                      name="honorific"
                      class="q-py-md text-center"
                      :style="
                        tab == 'honorific'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Honorific
                    </div>
                    <div
                      name="phoneType"
                      class="q-py-md text-center"
                      :style="
                        tab == 'phoneType'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Phone Type
                    </div>
                    <div
                      name="clientType"
                      class="q-py-md text-center"
                      :style="
                        tab == 'clientType'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Clients Type
                    </div>
                    <div
                      name="policyCategories"
                      class="q-py-md text-center"
                      :style="
                        tab == 'policyCategories'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Policy Categories
                    </div>
                    <div
                      name="policyType"
                      class="q-py-md text-center"
                      :style="
                        tab == 'policyType'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Policy Type
                    </div>
                    <div
                      name="propertyType"
                      class="q-py-md text-center"
                      :style="
                        tab == 'propertyType'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Property Type
                    </div>
                    <div
                      name="claimReason"
                      class="q-py-md text-center"
                      :style="
                        tab == 'claimReason'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': '#CDFE92' }
                          : 'red'
                      "
                    >
                      Claim Reason
                    </div>
                    <div
                      name="lossCause"
                      class="q-py-md text-center"
                      :style="
                        tab == 'lossCause'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Loss Cause
                    </div>
                    <div
                      class="q-py-md text-center"
                      name="claimSeverity"
                      :style="
                        tab == 'claimSeverity'
                          ? { 'background-color': '#CDFE92' }
                          : tab == 'sales' ||
                            tab == 'offcInfo' ||
                            tab == 'inspectionType'
                          ? { 'background-color': 'white' }
                          : 'red'
                      "
                    >
                      Claim Severity
                    </div>
                  </div>
                </q-tabs>
              </template>
              <!-- Main Template -->
              <template v-slot:after>
                <q-tab-panels
                  style="height: 400px"
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

                    <div class=" row q-py-md q-px-xl">
                      <q-btn
                        outline
                        class="  q-mx-md"
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
                        class="  q-mx-md"
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
                  <!-- Sales  Representative -->
                  <q-tab-panel name="sales">
                    <div class="row">
                      <p class="q-my-auto">
                        <label> Does Company Have Sales Representative </label>
                      </p>
                      <q-toggle class="q-ml-xs" v-model="toggle" />
                    </div>
                    <q-form ref="addUserForm">
                      <div
                        outlined
                        v-for="(contactInfo, index) in users"
                        v-if="index >= 0"
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
                        outline
                        class="  q-mx-md"
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
                    <div class="q-pa-lg" v-if="!inspection.type">
                      You Have Not Added Any Inspection Type yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class="justify-between" style="width: 40%">
                          <td>Inspection Type</td>
                          <td>Duration</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ inspection.subtypes[0].type }}
                          </td>
                          <td>{{ inspection.subtypes[0].duration }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>
                  <!-- Industry Type -->
                  <q-tab-panel name="industryType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Industry Type</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Industry Type')"
                      >
                        Add Industry Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Industry Type yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            industry Type
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>
                  <!-- Honorific -->
                  <q-tab-panel name="honorific">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Honorific</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Honorofic')"
                      >
                        Add Honorific
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Honorific yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Honorific
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>
                  <!-- Phone Type -->
                  <q-tab-panel name="phoneType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Phone Type</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Phone Type')"
                      >
                        Add Phone Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Phone Type yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Honorific
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>
                  <!-- Client Type -->
                  <q-tab-panel name="clientType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Client Type</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Client Type')"
                      >
                        Add Client Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Client Type yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Honorific
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>
                  <!-- Policy Category -->
                  <q-tab-panel name="policyCategories">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Policy Categories</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Policy Categories')"
                      >
                        Add Policy Categories
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Policy Categories yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Policy Categories
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>

                  <!-- Policy Type -->
                  <q-tab-panel name="policyType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Policy Type</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Policy Type')"
                      >
                        Add Policy Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Policy Type yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Policy Type
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>
                  <!-- property Type -->
                  <q-tab-panel name="propertyType">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Policy Type</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Policy Type')"
                      >
                        Add Policy Type
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Policy Type yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Policy Type
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>

                  <!-- Claim Reason -->
                  <q-tab-panel name="claimReason">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Claim Reason</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Claim Reason')"
                      >
                        Add Claim Reason
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Claim Reason yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Claim Reason
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>

                  <!-- Loss Cause -->
                  <q-tab-panel name="lossCause">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Loss Cause</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Loss Cause')"
                      >
                        Add Loss Cause
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Loss Cause yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Loss Cause
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </q-tab-panel>

                  <!-- Claim Severity -->
                  <q-tab-panel name="claimSeverity">
                    <div class="row justify-between">
                      <!-- empty pannel -->
                      <div class=" text-bold col-4">Claim Serverity</div>
                      <div
                        class=" col-2 text-primary"
                        @click="onclickSecondaryDialogBox('Claim Serverity')"
                      >
                        Add Claim Serverity
                      </div>
                    </div>
                    <div class="q-mt-lg"><q-separator /></div>
                    <!-- This is div for Data of Industry Type -->
                    <div class="q-pa-lg" v-if="!industryType[0]">
                      You Have Not Added Any Claim Serverity yet
                    </div>
                    <div v-else class="row justify-between">
                      <table>
                        <tr class=" justify-between" style="width:40%">
                          <td>
                            Claim Serverity
                          </td>
                          <td>Duration</td>
                          <td>Edit & Delete</td>
                        </tr>

                        <tr
                          v-for="(contactInfo, index) in inspection.subtypes"
                          v-if="index >= 0"
                        >
                          <td>
                            {{ industryType }}
                          </td>
                          <td>{{ industryType }}</td>
                          <td>
                            <div>
                              <q-icon size="sm" color="primary" name="create" />
                              <q-icon
                                class="q-ml-xs"
                                size="sm"
                                color="primary"
                                name="delete"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
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
                      tab == 'adduser' || tab == 'offcInfo' || tab == 'sales'
                    "
                    color="primary"
                    label="submit and Proceed"
                    class="q-mx-lg"
                    @click="onSubmit"
                  />
                  <q-btn
                    v-if="
                      tab != 'adduser' && tab != 'offcInfo' && tab != 'sales'
                    "
                    color="primary"
                    label="Next"
                    class="q-mx-lg "
                    @click="onClickNext"
                  />
                </div>
                <div class="q-mt-md">
                  <q-separator />
                </div>
              </template>
            </q-splitter>
            <!-- This is First Dialog -->
            <q-dialog v-model="InspectionDialogBox" persistent>
              <q-card style="width: 700px;height:600px; max-width: 1000vw;">
                <q-bar class=" row justify-between" style="height:50px">
                  <div class="col-46 q-px-xl text-bold ">
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
                      <div class="q-pa-lg">
                        <q-input
                          v-model="inspection.type"
                          label="Type Of Inspection"
                          lazy-rules
                          v-if="index == 0"
                        />

                        <q-input
                          v-model="inspection.subtypes[index].type"
                          label="Sub Type Of Inspection"
                          lazy-rules
                        />
                        Default Duration (hr))
                        <q-slider
                          class="q-mt-lg"
                          name="speed"
                          v-model="inspection.subtypes[index].duration"
                          label-always
                          :min="0"
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
            <!-- This is Industry Dialog Box -->
            <q-dialog v-model="industryTypeDialogBox" persistent>
              <q-card style="width: 700px;height:400px; max-width: 1000vw;">
                <q-bar class=" row justify-between" style="height:50px">
                  <div class="col-7 q-px-xl text-bold ">
                    Add {{ industryTypeDialogBoxName }}
                  </div>
                  <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip>Close</q-tooltip>
                  </q-btn>
                </q-bar>

                <q-card-section>
                  <div
                    class=" q-pa-xl"
                    style="margin-left:50px;margin-right:50px;"
                  >
                    <div class=" column  q-pa-lg">
                      <div class="q-px-xl q-my-xs">
                        {{ industryTypeDialogBoxName }}
                      </div>
                      <div class="q-pl-xs">
                        <q-input
                          v-model="industryType"
                          class="q-mx-xl"
                          style="width :300px ; height:50px;"
                          outlined
                        />
                      </div>
                    </div>
                    <div class="  row justify-center  q-pa-lg">
                      <div>
                        <q-btn
                          color="primary"
                          label="Clear"
                          class="q-mx-lg "
                          @click=""
                        />
                      </div>
                      <div>
                        <q-btn
                          color="primary"
                          label="Save"
                          class="q-mx-lg "
                          @click=""
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
export default {
  name: 'AddUser',
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
      tab: 'adduser',
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
        type: '',
        subtypes: [{ type: ' ', duration: 0 }]
      },
      industryType: [],
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
  computed: {
    ...mapGetters(['contactTypes', 'titles'])
  },
  mounted() {
    this.getTitles();
    this.getContactTypes();
  },
  methods: {
    ...mapActions(['addUser', 'getTitles', 'getContactTypes']),
    validateEmail,
    // on Clicking Submit Button

    async onSubmit() {
      const success = await this.$refs.addUserForm.validate();
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
        if (this.tab == 'adduser') {
          this.isShowRemoveButton = false;
          this.tab = 'offcInfo';
        } else if (this.tab == 'offcInfo') {
          this.tab = 'sales';
        } else if (this.tab == 'sales') {
          this.tab = 'inspectionType';
        }
      } else {
        this.$q.notify({
          message: 'Please fill the first Name',
          position: 'top',
          type: 'negative'
        });
      }
    },
    // This is Secondary Dialog Box
    onclickSecondaryDialogBox(value) {
      this.industryTypeDialogBoxName = value;
      this.industryTypeDialogBox = true;
    },

    async addAnotherContact() {
      console.log(this.titles);
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
            message: 'Please fill the first Name',
            position: 'top',
            type: 'negative'
          });
        }
      }
    },
    removeAnotherContact() {
      const len = this.users.length;
      if (len === 2) {
        this.isShowRemoveButton = false;
      }

      this.users.pop();
    },

    addAnotherSubType() {
      this.inspection.subtypes.push({ type: ' ', duration: '' });
    },
    onClickRemoveSubType() {
      this.inspection.subtypes.pop();
    },
    onClickClearInspectionType() {
      this.inspection = {
        type: '',
        subtypes: [{ type: ' ', duration: '' }]
      };
    },
    onSaveInspectionType() {
      this.InspectionDialogBox = false;
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
    }

    // End of Functions
  },
  created() {
    console.log('helloW');
  }
};
</script>
<style lang="scss">
.th,
td {
  border: 1px solid black;
  width: 200px;
}
</style>
