<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/clients')"
      :showAddButton="false"
    />
    <div class="column full-height" style="padding: 51px 20px 20px 20px">
      <div class="q-pa-md column full-height">
        <div class="createClientInfo" style="font-size: 15px">
          <div class="form-list" @click="clientInfoDailog = true">
            Client Info
          </div>
          <div class="form-list" @click="publicAdjustorInfoDialog = true">
            Public Adjustor Info
          </div>
          <div class="form-list" @click="mailingAddressDialog = true">
            Mailing Address
          </div>
          <div class="form-list" @click="insuranceInfoDialog = true">
            Insurance Info
          </div>
          <div class="form-list" @click="lossInfoDialog = true">Loss Info</div>
          <div class="form-list" @click="mortgageInfoDialog = true">
            Mortgage Info
          </div>
          <div class="form-list" @click="estimatingInfoDialog = true">
            Estimating Info
          </div>
          <q-separator />
          <div class="form-list" @click="expertVendorInfoDialog = true">
            Expert/Vendor Info
          </div>
          <q-separator />
          <div class="form-list" @click="officeTaskDialog = true">
            Office Task
          </div>
          <q-separator />
          <div class="form-list" @click="documentsDialog = true">Documents</div>
          <q-separator />
        </div>
        <q-btn
          label="Create Client"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="createClientButtonClick"
          size="'xl'"
        ></q-btn>
      </div>
    </div>
    <q-dialog
      v-model="publicAdjustorInfoDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 51px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="publicAdjustorInfoDialog = false"
              style="margin: auto 0"
            />

            <div class="text-uppercase text-bold text-black q-mx-auto">
              Public Adjustor Info
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="text-h7">
            Select Public Adjustor You Want to Assign to.
          </div>
          <q-select
            v-model="AdjustorTypes.type"
            :options="AdjustorTypes"
            label="Select Public Adjustor"
          />
        </q-card-section>
        <div v-if="AdjustorTypes.type == 'Self'">
          <div style="font-size: 15px; font-weight: bold">My Details</div>
          <br />
          <div style="font-size: 15px; margin-left: 10px">22/12/2020</div>
          <div style="font-size: 15px; margin-left: 10px; font-weight: bold">
            David Jones
          </div>
          <div style="font-size: 15px; margin-left: 10px">
            davidjones@company.com
          </div>
          <div style="font-size: 15px; margin-left: 10px">
            Mobile- +1(650) XXXXX98
          </div>
          <div style="font-size: 15px; margin-left: 10px">
            License Number- 12345677
          </div>
          <br />
          <div class="row">
            <p style="font-size: 15px">Is it company lead?</p>
            <q-toggle class="q-ml-auto" v-model="isItCompanyLeadToggle" />
          </div>
          <q-separator /><br />
          <div style="font-size: 15px">Default Fee Rate - 20%</div>
          <br />
          <div style="font-size: 20px">Adjustors Fee Type</div>
          <div class="row">
            <div class="q-pa-md">
              <q-btn padding="xs" color="primary" icon="eva-percent" />
            </div>
            <div class="q-pa-md">
              <div class="text-purple q-gutter-md">
                <q-btn padding="xs" color="primary" icon="monetization_on" />
              </div>
            </div>
            <div class="q-pa-md">
              <div class="text-purple q-gutter-md">
                <q-btn padding="xs" color="primary" icon="query_builder" />
              </div>
            </div>
          </div>
          <div style="font-size: 15px; font-weight: bold">
            Adjusters Fee Rate
          </div>
          <br />
          <q-separator />
          <br />
          <div class="row" style="font-size: 20px">
            <span class="material-icons"> info </span>
            <div>Needs approval from company</div>
          </div>
        </div>
        <div v-else-if="AdjustorTypes.type == 'Public Adjustor 01'">
          <div style="font-size: 15px; margin-left: 10px">
            Public Adjustor 01 Details
          </div>
          <br />
          <div style="font-size: 15px; margin-left: 10px">22/12/2020</div>
          <div style="font-size: 15px; margin-left: 10px; font-weight: bold">
            Public Adjustor 01
          </div>
          <div style="font-size: 15px; margin-left: 10px">
            publicadjustor01@company.com
          </div>
          <div style="font-size: 15px; margin-left: 10px">
            Mobile- +1(650) XXXXX98
          </div>
          <div style="font-size: 15px; margin-left: 10px">
            License Number- 12345677
          </div>
          <br />
          <div class="row">
            <p style="font-size: 15px">Is it company lead</p>
            <q-toggle class="q-ml-auto" v-model="isItCompanyLeadToggle" />
          </div>
          <q-separator></q-separator><br />
          <div style="font-size: 15px; margin-left: 25px">
            Default Fee Rate - 20%
          </div>
          <br />
          <div style="font-size: 20px">Adjustors Fee Type</div>
          <div class="row">
            <div class="q-pa-md">
              <q-btn padding="xs" color="primary" icon="eva-percent" />
            </div>
            <div class="q-pa-md">
              <div class="text-purple q-gutter-md">
                <q-btn padding="xs" color="primary" icon="monetization_on" />
              </div>
            </div>
            <div class="q-pa-md">
              <div class="text-purple q-gutter-md">
                <q-btn padding="xs" color="primary" icon="query_builder" />
              </div>
            </div>
          </div>
          <div style="font-size: 15px; font-weight: bold">
            Adjusters Fee Rate
          </div>
          <br />
          <q-separator />
          <br />
          <div class="row" style="font-size: 20px; margin-left: 10px">
            <span class="material-icons"> info </span>
            <div>Needs approval from company</div>
          </div>
        </div>
        <div v-else></div>
        <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          size="'xl'"
        ></q-btn>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="clientInfoDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top-51px;">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="clientInfoDailog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Client Info
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                overflow-y: auto;
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <div>
                <q-form ref="clientForm">
                  <div>
                    <span class="form-heading">Choose Lead Source</span>
                  </div>
                  <div>
                    <q-select
                      v-model="sourceDetails.type"
                      :options="leadSources"
                      option-label="name"
                      option-value="value"
                      emit-value
                      map-options
                      @input="onChangingSourceType()"
                    />
                    <q-input
                      v-if="
                        sourceDetails.type != 'vendor' &&
                          sourceDetails.type != '' &&
                          sourceDetails.type != 'google'
                      "
                      type="text"
                      placeholder="Enter Source details"
                      v-model="sourceDetails.details"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                    />
                    <div
                      v-else-if="sourceDetails.type == 'vendor'"
                      class="custom-select"
                      @click="onAddVendorDialogClick('vendor')"
                    >
                      <div class="select-text">
                        {{
                          sourceDetails.id
                            ? sourceDetails.details
                            : 'Select Lead Source'
                        }}
                      </div>
                    </div>
                  </div>
                  <q-select
                    v-model="client.id"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    :options="clientTypes"
                    @input="setTypes(clientTypes, client)"
                    label="Client Type"
                  />

                  <div class="row">
                    <p class="q-mx-none q-my-auto">
                      Is Policy Holder An Organization ?
                    </p>
                    <q-toggle
                      v-model="primaryDetails.isOrganization"
                      left-label
                      class="q-ml-auto"
                    />
                  </div>

                  <div v-if="primaryDetails.isOrganization">
                    <q-input
                      v-model="primaryDetails.organizationName"
                      label="Organization Name"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) ||
                          'Please fill the organization name '
                      ]"
                    />
                  </div>
                  <div class="row">
                    <p class="q-mx-none q-my-auto">
                      Organization Is Policyholder?
                    </p>
                    <q-toggle
                      v-model="policyHolder.isPolicyHolder"
                      left-label
                      class="q-ml-auto"
                    />
                  </div>
                  <br />

                  <span class="form-heading">Insured Details</span>
                  <q-select
                    v-model="honorific1.id"
                    :options="titles"
                    option-value="id"
                    option-label="name"
                    map-options
                    @input="setTitleName(1)"
                    emit-value
                    label="Title"
                  />

                  <q-input
                    v-model="insuredDetails.fname"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please fill the First name'
                    ]"
                    label="First Name"
                  />

                  <q-input
                    v-model="insuredDetails.lname"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please fill the Last name'
                    ]"
                    label="Last Name"
                  />
                  <div class="row">
                    <q-select
                      v-model="insuredDetails.type"
                      :options="contactTypes"
                      option-value="machineName"
                      option-label="name"
                      map-options
                      emit-value
                      label="Type"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                      style="width: 40%; margin-right: auto"
                    />
                    <q-input
                      v-model="insuredDetails.phone"
                      label="Phone"
                      type="number"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length == 10) ||
                          'Please fill the phone number'
                      ]"
                      style="width: 55%"
                    />
                  </div>
                  <q-input
                    v-model="insuredDetails.email"
                    label="Email"
                    lazy-rules
                    :rules="[
                      val =>
                        validateEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                  />
                  <div class="row">
                    <p class="q-mx-none q-my-auto">Is there a Co-insured?</p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="isThereaCoInsuredToggle"
                    />
                  </div>
                  <br />
                  <div v-if="isThereaCoInsuredToggle" style="font-size: 20px">
                    <span class="form-heading">Co-insured Details</span>

                    <q-select
                      v-model="honorific2.id"
                      :options="titles"
                      option-value="id"
                      option-label="name"
                      map-options
                      @input="setTitleName(2)"
                      emit-value
                      label="Title"
                    />
                    <q-input
                      v-model="coInsuredDetails.fname"
                      label="First Name"
                    />
                    <q-input
                      v-model="coInsuredDetails.lname"
                      label="Last Name"
                    />
                    <div class="row">
                      <q-select
                        v-model="coInsuredDetails.type"
                        :options="contactTypes"
                        option-value="machineName"
                        option-label="name"
                        map-options
                        emit-value
                        style="width: 40%; margin-right: auto"
                        label="Type"
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || '']"
                      />
                      <q-input
                        v-model="coInsuredDetails.phone"
                        label="Phone"
                        type="number"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 10) ||
                            'Please fill the phone number'
                        ]"
                        style="width: 55%"
                      />
                    </div>
                    <q-input
                      v-model="coInsuredDetails.email"
                      input
                      type="email"
                      lazy-rules
                      :rules="[
                        val =>
                          validateEmail(val) ||
                          'You have entered an invalid email address!'
                      ]"
                      label="Email"
                    />
                  </div>
                  <div class="row">
                    <p class="q-mx-none q-my-auto">
                      Add aditional phone number(s)
                    </p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="addAditionalPhoneNumberToggle"
                    />
                  </div>
                  <div v-if="addAditionalPhoneNumberToggle">
                    <div class="row">
                      <q-select
                        v-model="addAditionalPhoneNumber.type1"
                        label="Type"
                        :options="contactTypes"
                        option-value="machineName"
                        option-label="name"
                        map-options
                        emit-value
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || '']"
                        style="width: 40%; margin-right: auto"
                      />
                      <q-input
                        v-model="addAditionalPhoneNumber.phone2"
                        label="Phone2"
                        type="number"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 10) ||
                            'Please fill the phone number'
                        ]"
                        style="width: 55%; margin-left: auto"
                      />
                    </div>
                    <div class="row">
                      <q-select
                        v-model="addAditionalPhoneNumber.type2"
                        label="Type"
                        :options="contactTypes"
                        option-value="machineName"
                        option-label="name"
                        map-options
                        emit-value
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || '']"
                        style="width: 40%; margin-right: auto"
                      />
                      <q-input
                        v-model="addAditionalPhoneNumber.phone3"
                        label="Phone3"
                        type="number"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 10) ||
                            'Please fill the phone number'
                        ]"
                        style="width: 55%"
                      />
                    </div>
                  </div>
                  <br />
                  <span class="form-heading">Address Details</span>

                  <AutoCompleteAddress
                    :address="clientAddressDetails"
                    :isDropBoxEnable="true"
                    :isChecksEnable="false"
                    :isFieldsDisable="false"
                  />
                  <div class="row">
                    <p class="q-mx-none q-my-auto">Tenent Occupied</p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="tenantOccupiedToggle"
                    />
                  </div>
                  <div v-if="tenantOccupiedToggle">
                    <q-input
                      v-model="tenantOccupied.name"
                      label="Tenant Name"
                    />

                    <div class="row">
                      <q-select
                        v-model="tenantOccupied.type"
                        label="Type"
                        :options="contactTypes"
                        option-value="machineName"
                        option-label="name"
                        map-options
                        emit-value
                        style="width: 40%; margin-right: auto"
                      />
                      <q-input
                        v-model="tenantOccupied.phone"
                        label="Phone"
                        style="width: 55%; margin-left: auto"
                      />
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
            <br />
          </div>

          <q-btn
            @click="onSubmit"
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="mailingAddressDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top-51px;">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="mailingAddressDialog = false"
              style="margin: auto 0"
            />

            <div class="text-uppercase text-bold text-black q-mx-auto">
              Mailing Address
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white" style="min-height: 630px">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <div>
                <div class="full-height" style="padding: 30px 20px 20px 20px">
                  <div class="row">
                    <p class="q-mx-none q-my-auto">
                      Is the mailing address same?
                    </p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="isMailingAddressSameToggle"
                      @input="mailingAddressSame"
                    />
                  </div>
                  <AutoCompleteAddress
                    :address="mailingAddressDetails"
                    :isDropBoxEnable="true"
                    :isChecksEnable="false"
                    :isFieldsDisable="isMailingAddressSameToggle"
                  />
                </div>
              </div>
              <br />
            </div>
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="mailingAddressDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="insuranceInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top-20px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="insuranceInfoDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Insurance Info
            </div>
          </q-toolbar>
        </q-header>

        <q-card-section>
          <div class="q-page bg-white" style="min-height: 630px">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                overflow-y: auto;
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <div
                class="custom-select"
                v-model="insuranceDetails.carrierName"
                @click="onAddVendorDialogClick('carrier')"
              >
                <div class="select-text">
                  {{
                    insuranceDetails.carrierName
                      ? insuranceDetails.carrierName
                      : 'Enter Carrier Details'
                  }}
                </div>
              </div>
              <q-input
                v-model="insuranceDetails.policyNumber"
                label="Policy Number"
              />

              <q-input
                v-model="insuranceDetails.insuranceCarrierNumber"
                label="Insurance Carrier Number"
              />

              <div class="row">
                <p class="q-mx-none q-my-auto">Has claim been filed?</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="hasClaimBeenFilledToggle"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">
                  Is this is a Foced-Placed policy?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isThisIsForcedPlacedPolicyToggle"
                />
              </div>
              <span class="form-heading">Policy Effective date</span>
              <q-input
                v-model="insuranceDetails.policyEffectiveDate"
                type="date"
              /><br />
              <span class="form-heading">Policy Expiry date </span>
              <q-input
                v-model="insuranceDetails.policyExpireDate"
                type="date"
              />
              <q-select
                v-model="insuranceDetails.policyCategory.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="policyCategories"
                @input="
                  setTypes(
                    policyCategories,
                    insuranceDetails.policyCategory,
                    'policyCategory'
                  )
                "
                label="Policy Category"
              />
              <q-select
                v-model="insuranceDetails.property.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="propertyTypes"
                @input="setTypes(propertyTypes, insuranceDetails.property)"
                label="Property Type"
              />
              <div class="row">
                <p class="q-mx-none q-my-auto">Dwelling Limit (A)</p>
                <q-input
                  mask="#.#"
                  type="number"
                  v-model.number="insuranceDetails.dwellingLimitA"
                  placeholder="Dwelling Limit (A)"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">Other Structure (B)</p>
                <q-input
                  mask="#.#"
                  type="number"
                  v-model="insuranceDetails.otherStructureB"
                  placeholder="Other Structure (B)"
                  prefix="$"
                  style="margin-left: auto; width: 50%"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">Contents Limit (C)</p>
                <q-input
                  mask="#.#"
                  type="number"
                  v-model="insuranceDetails.contentsLimit"
                  placeholder="Contents Limit (C)"
                  prefix="$"
                  style="margin-left: auto; width: 50%"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">Loss of Use Limit (D)</p>
                <q-input
                  mask="#.#"
                  type="number"
                  v-model="insuranceDetails.lossOfUSD"
                  placeholder="Loss of Use Limit (D)"
                  prefix="$"
                  style="margin-left: auto; width: 50%"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">Depreciation</p>
                <q-input
                  mask="#.#"
                  type="number"
                  v-model="insuranceDetails.deprecation"
                  placeholder="Depreciation"
                  prefix="$"
                  style="margin-left: auto; width: 50%"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">Deductible</p>
                <q-input
                  mask="#.#"
                  type="number"
                  v-model="insuranceDetails.deductible"
                  placeholder="Deductible"
                  prefix="$"
                  style="margin-left: auto; width: 50%"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">Prior payment by insured</p>
                <q-input
                  mask="#.#"
                  type="number"
                  v-model="insuranceDetails.priorPayment"
                  placeholder="Prior payment by insured"
                  prefix="$"
                  style="margin-left: auto; width: 50%"
                />
              </div>
              <br />
              <span class="form-heading">Reason for Limits/Denial</span>
              <div class="floating-label">
                <textarea
                  rows="5"
                  required
                  class="full-width"
                  v-model="insuranceDetails.reasonsOfLD"
                  style="resize: none;"
                ></textarea>
              </div>
              <br />
            </div>
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="insuranceInfoDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="lossInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 20px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="lossInfoDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Loss Info
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white" style="min-height: 630px">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                overflow-y: auto;
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <div class="row">
                <p class="q-mx-none q-my-auto">
                  Loss Address Same As Client's?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isLossAddressSameAsClientToggle"
                  @input="lossAddressSame"
                />
              </div>
              <AutoCompleteAddress
                :address="lossAddressDetails"
                :isDropBoxEnable="true"
                :isChecksEnable="false"
                :isFieldsDisable="isLossAddressSameAsClientToggle"
              />
              <q-input
                v-model="LossAddressName"
                label="Loss Address Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'This is a required field'
                ]"
              />
              <q-select
                v-model="lossInfo.property.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="propertyTypes"
                @input="setTypes(propertyTypes, lossInfo.property)"
                label="Property Type"
              />
              <q-input
                v-model="lossInfo.propertyDescription"
                label="Description of Property"
              />
              <q-select
                v-model="lossInfo.reasonClaim.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="claimReasons"
                @input="setTypes(claimReasons, lossInfo.reasonClaim)"
                label="Reason for Claim"
              /><br />
              <span class="form-heading">Date of Loss</span>
              <q-input
                v-model="lossInfo.dateOfLoss"
                type="date"
                placeholder="Date of Loss"
              />

              <q-select
                v-model="lossInfo.causeOfLoss.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="lossCauses"
                @input="setTypes(lossCauses, lossInfo.causeOfLoss)"
                label="Cause of Loss"
              /><br />
              <span class="form-heading">Deadline Date</span>
              <q-input
                v-model="lossInfo.deadlineDate"
                type="date"
                placeholder="Deadline Date"
              /><br />
              <span class="form-heading">Recov. Deprec. Deadline</span>
              <q-input
                v-model="lossInfo.recovDeadline"
                type="date"
                placeholder="Recov. Deprec. Deadline"
              /><br />
              <div class="row">
                <p style="q-mx-none q-my-auto">Is the Home Habitable?</p>
                <q-toggle class="q-ml-auto" v-model="isTheHomeHabitable" />
              </div>
              <div class="row">
                <p style="q-mx-none q-my-auto">FEMA Claim</p>
                <q-toggle class="q-ml-auto" v-model="femaClaimToggle" />
              </div>
              <div class="row">
                <p style="q-mx-none q-my-auto">State of Emergency</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isStateOfEmergencyToggle"
                />
              </div>
              <div v-if="isStateOfEmergencyToggle">
                <q-input
                  v-model="lossInfo.nameOfEmergency"
                  label="Related to"
                />
              </div>
              <q-select
                v-model="lossInfo.severityOfClaimType.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="claimSeverity"
                @input="setTypes(claimSeverity, lossInfo.severityOfClaimType)"
                label="Severity of Claim"
              /><br />
              <q-input
                v-model="lossInfo.descriptionDwelling"
                label="Loss Description to Dwelling"
              /><br />
              <div class="row">
                <p style="q-mx-none q-my-auto">
                  Is there damage to other structures?
                </p>
                <q-toggle class="q-ml-auto" v-model="isDamageOSToggle" />
              </div>
              <q-input
                v-if="isDamageOSToggle"
                v-model="lossInfo.damageDescription"
                label="Damage items description"
              />

              <div class="row">
                <p style="q-mx-none q-my-auto">
                  Is there damage to personal property?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isThereDamageToPersonalPropertyToggle"
                />
              </div>
              <div class="row">
                <p style="q-mx-none q-my-auto">
                  Was a PPIF provided to the insured?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="wasAppifProvidedToTheInsuredToggle"
                />
              </div>
              <div class="row">
                <p style="q-mx-none q-my-auto">
                  Does the office need to provide a<br />
                  PPIF to the insured?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="doesTheOfficeNeedToProvidePpifToTheInsuredToggle"
                />
              </div>
              <div class="row">
                <p style="q-mx-none q-my-auto">
                  Is there a mortgage on the home?
                </p>
                <q-toggle class="q-ml-auto" v-model="IsMortgageHomeToggle" />
              </div>
              <div class="row">
                <p style="q-mx-none q-my-auto">
                  Is there a second claim to file?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isThereAsecondClaimToFileToggle"
                />
              </div>
            </div>
            <q-separator />
            <br />
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="lossInfoDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="mortgageInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 20px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="mortgageInfoDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Mortgage Info
            </div>
          </q-toolbar>
        </q-header>

        <q-card-section>
          <div class="q-page bg-white" style="min-height: 620px">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                overflow-y: auto;
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <q-select
                v-model="mortgageDetails[0].id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="vendors"
                @input="setTypes(vendors, mortgageDetails[0], 'mortgage')"
                label="Mortgage Company Name"
              />
              <q-input
                v-model="mortgageDetails[0].loanNumber"
                label="Loan Number"
              />
              <q-input
                v-model="mortgageDetails[0].accountNumber"
                label="Account Number"
              /><br />
              <span class="form-heading">Notes</span>
              <textarea
                rows="5"
                required
                class="full-width"
                v-model="mortgageDetails[0].notes"
                style="resize: none;"
              />
              <div class="row">
                <p style="q-mx-none q-my-auto">
                  Is there a 2nd mortgage on the home?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isSecondMortgageHome"
                  @input="onSecondMortgageToggle"
                />
              </div>
              <div v-if="isSecondMortgageHome">
                <q-select
                  v-model="mortgageDetails[1].id"
                  option-value="id"
                  option-label="name"
                  map-options
                  emit-value
                  :options="vendors"
                  @input="setTypes(vendors, mortgageDetails[1], 'mortgage')"
                  label="Mortgage Company Name"
                />
                <q-input
                  v-model="mortgageDetails[1].loanNumber"
                  label="Loan Number"
                />
                <q-input
                  v-model="mortgageDetails[1].accountNumber"
                  label="Account Number"
                /><br />
                <span class="form-heading">Notes</span>
                <textarea
                  rows="5"
                  class="full-width"
                  v-model="mortgageDetails[1].notes"
                />
              </div>
            </div>
            <br />
          </div>
          <!-- </div> -->
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="mortgageInfoDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="estimatingInfoDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 20px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="estimatingInfoDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Estimating Info
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white" style="min-height: 630px">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                overflow-y: auto;
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <div class="row">
                <p style="font-size: 15px">
                  Does an estimator need to be<br />assigned?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="doesAnEstimatorNeedToBeAssignedToggle"
                />
              </div>
              <q-input
                v-model="estimatingInfo.estimatorToBeAssigned"
                label="Estimator to be assigned"
              />
              <q-input
                v-model="estimatingInfo.scopeTimeNeeded"
                label="Scope time needed"
              />
              <q-input
                v-model="estimatingInfo.notesToTheEstimator"
                label="Notes to the estimator"
              /><br />
              <div class="row">
                <p style="font-size: 15px">Estimating Information Claim 2</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="estimatingInformationClaim2Toggle"
                />
              </div>
            </div>
            <br />
          </div>

          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="estimatingInfoDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="expertVendorInfoDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 20px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="expertVendorInfoDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Expert / Vendor Info
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white" style="min-height: 630px">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                overflow-y: auto;
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <div class="row">
                <p>Has a Vendor of Expert hired?</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="hasAvendorOfExpertHiredToggle"
                />
              </div>
              <div v-if="hasAvendorOfExpertHiredToggle">
                <q-select
                  v-model="expertVendorInfo.expertType"
                  :options="hasAvendorOfExpertHiredTypes"
                  label="Select Vendor / Expert Type"
                />
              </div>
              <div class="row">
                <p>Any other Expert hired?</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="anyOtherExpertHiredToggle"
                />
              </div>
              <div class="row">
                <p>Do you refer any Vendor?</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="doYouReferAnyVendorToggle"
                />
              </div>
            </div>
            <br />
          </div>

          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="expertVendorInfoDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="officeTaskDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 20px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="officeTaskDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Office Task
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white" style="min-height: 630px">
            <div
              class="full-width"
              style="
                height: calc(100vh - 145px);
                overflow-y: auto;
                margin-bottom: 10px;
                padding-top: 40px;
              "
            >
              <q-select
                v-model="officeTask.officeActionTypes"
                :options="officeActionRequiredTypes"
                label="Office Action Required"
              />
              <q-select
                v-model="officeTask.officeTaskTypes"
                :options="officeTaskRequiredTypes"
                label="Office Task Required"
              /><br />
              <div class="row">
                <p>Additional Office Task Required</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="additionalOfficeTaskRequiredToggle"
                />
              </div>
            </div>
            <br />
          </div>

          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="officeTaskDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="vendorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="close"
              @click="vendorsListDialog = false"
              style="margin: auto 0"
            />

            <div class="text-uppercase text-bold text-black q-mx-auto">
              {{ vendorDialogName }}
            </div>
            <img
              src="~assets/add.svg"
              @click="addVendorDialog = true"
              style="margin: 0 0 0 20px"
            />
          </q-toolbar>
        </q-header>
        <VendorsList
          :selective="true"
          @selectedVendor="onClosingVendorSelectDialog"
          ref="list"
          :showFilter="showVendorDialogFilters"
          :filterName="vendorDialogFilterByIndustry"
        />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="addVendorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @closeDialog="closeAddVendorDialog"
          :componentName="vendorDialogName"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import CustomHeader from 'components/CustomHeader';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

import AddressService from '@utils/country';
import { validateEmail } from '@utils/validation';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { sources } from 'src/store/common/getters';
import { state } from 'src/store/common/state';
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import vendors from 'src/store/vendors';
const addressService = new AddressService();

export default {
  name: 'addClient',
  components: { CustomHeader, VendorsList, AddVendor, AutoCompleteAddress },
  data() {
    return {
      isSecondMortgageHome: false,
      vendorDialogName: '',
      vendorDialogFilterByIndustry: '',
      showVendorDialogFilters: false,
      LossAddressName: '',
      publicAdjustorInfoDialog: false,
      addVendorDialog: false,
      vendorsListDialog: false,
      officeTaskDialog: false,
      expertVendorInfoDialog: false,
      estimatingInfoDialog: false,
      lossInfoDialog: false,
      hasClaimBeenFilledToggle: false,
      AdjustorTypes: ['Self', 'Public Adjustor 01'],
      maximizedToggle: true,
      clientInfoDailog: false,
      policyHolder: {
        isPolicyHolder: false,
        policyHolderName: ''
      },
      primaryDetails: {
        isOrganization: false,
        organizationName: ''
      },
      honorific1: {
        id: '',
        value: ''
      },
      honorific2: {
        id: '',
        value: ''
      },
      sourceDetails: {
        id: '',
        type: '',
        details: ''
      },
      client: {
        id: '',
        value: ''
      },
      insuredDetails: {
        fname: '',
        lname: '',
        phone: '',
        type: '',
        email: ''
      },
      coInsuredDetails: {
        fname: '',
        lname: '',
        phone: '',
        type: '',
        email: ''
      },
      addAditionalPhoneNumber: {
        phone2: '',
        phone3: '',
        phone: '',
        type1: '',
        type2: ''
      },
      clientAddressDetails: {
        addressCountry: '',
        addressRegion: '',
        addressLocality: '',
        postalCode: '',
        streetAddress: '',
        postOfficeBoxNumber: '',
        isGateDropbox: false,
        dropBoxInfo: ''
      },

      tenantOccupied: {
        name: '',
        phone: '',
        type: ''
      },
      mailingAddressDetails: {
        addressCountry: '',
        addressRegion: '',
        addressLocality: '',
        postalCode: '',
        streetAddress: '',
        postOfficeBoxNumber: '',
        isGateDropbox: false,
        dropBoxInfo: ''
      },
      lossInfo: {
        dateOfLoss: '',
        propertyDescription: '',
        reasonClaim: {
          value: '',
          id: ''
        },
        deadlineDate: '',
        recovDeadline: '',
        nameOfEmergency: '',
        descriptionDwelling: '',
        damageDescription: '',
        property: {
          value: '',
          id: ''
        },
        insuranceAdjustorName: '',
        whereDidTheLossOccur: '',
        other: '',
        severityOfClaimType: {
          id: '',
          value: ''
        },
        causeOfLoss: {
          value: '',
          id: ''
        },
        describeTheLoss: '',
        insuranceAdjustorPhone: '',
        insuranceAdjustorPhoneType: '',
        typeOfLoss: ''
      },
      insuranceDetails: {
        property: {
          id: '',
          value: ''
        },
        type: '',
        details: '',
        id: '',
        policyCategory: {
          id: '',
          value: ''
        },
        carrierName: '',
        carrierId: '',
        insuranceCarrierNumber: '',
        policyNumber: '',
        policyEffectiveDate: '',
        policyExpireDate: '',
        dwellingLimitA: '',
        contentsLimit: '',
        otherStructureB: '',
        lossOfUSD: '',
        deprecation: '',
        deductible: '',
        priorPayment: '',
        reasonsOfLD: ''
      },
      mortgageDetails: [
        {
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: true,
          notes: ''
        }
      ],
      estimatingInfo: {
        estimatorToBeAssigned: '',
        scopeTimeNeeded: '',
        notesToTheEstimator: ''
      },
      expertVendorInfo: {
        expertType: ''
      },
      officeTask: {
        officeActionTypes: '',
        officeTaskTypes: ''
      },
      isItCompanyLeadToggle: false,
      addAditionalPhoneNumberToggle: false,
      gateDropboxToggle: false,
      tenantOccupiedToggle: false,
      isDamageOSToggle: false,
      mailingAddressDialog: false,
      isMailingAddressSameToggle: false,
      isThereaCoInsuredToggle: false,

      states: [],
      countries: [],
      insuranceInfoDialog: false,
      isThisIsForcedPlacedPolicyToggle: false,
      DidYouHavePoliceDeclarationToggle: false,
      isStateOfEmergencyToggle: false,
      isTheHomeHabitable: false,
      isThereDamageToPersonalPropertyToggle: false,
      wasAppifProvidedToTheInsuredToggle: false,
      doesTheOfficeNeedToProvidePpifToTheInsuredToggle: false,
      IsMortgageHomeToggle: false,
      isLossAddressSameAsClientToggle: false,
      lossAddressDetails: {
        addressCountry: '',
        addressRegion: '',
        addressLocality: '',
        postalCode: '',
        streetAddress: '',
        postOfficeBoxNumber: '',
        isGateDropbox: false,
        dropBoxInfo: ''
      },
      isThereAsecondClaimToFileToggle: false,
      typeOfLoss: [],
      mortgageInfoDialog: false,
      isTherea2ndMortgageOnTheHomeToggle: false,
      doesAnEstimatorNeedToBeAssignedToggle: false,
      estimatingInformationClaim2Toggle: false,
      hasAvendorOfExpertHiredToggle: false,
      anyOtherExpertHiredToggle: false,
      doYouReferAnyVendorToggle: false,
      femaClaimToggle: false,
      additionalOfficeTaskRequiredToggle: false,
      officeActionRequiredTypes: [],
      officeTaskRequiredTypes: []
    };
  },
  created() {
    this.getVendors(this.$route.params.id);
    this.getClientTypes();
    this.getPropertyTypes();
    this.getLossCauses();
    this.getSeverityClaim();
    this.getClaimReasons();
    this.getContactTypes();
    this.getPolicyCategory();
    if (this.selectedLead.id) {
      this.insuredDetails.fname = this.selectedLead.primaryContact.fname;
      this.insuredDetails.lname = this.selectedLead.primaryContact.lname;
      this.insuredDetails.email = this.selectedLead.primaryContact.email;
      this.insuredDetails.phone = this.selectedLead.primaryContact.phoneNumber[0].number;
      this.insuredDetails.type = this.selectedLead.primaryContact.phoneNumber[0].type;
      this.sourceDetails.id = this.selectedLead.leadSource.id;
      this.sourceDetails.type = this.selectedLead.leadSource.type;
      this.honorific1.id = this.selectedLead.primaryContact.honorific.id;
      this.honorific1.value = this.selectedLead.primaryContact.honorific.value;
      this.sourceDetails.details = this.selectedLead.leadSource.detail;
      this.insuranceDetails.carrierName = this.selectedLead.leadSource.type;
      this.insuranceDetails.policyNumber = this.selectedLead.policyNumber;
    }
    this.countries = addressService.getCountries();
    this.onCountrySelect('United States');
  },

  computed: {
    ...mapGetters([
      'selectedLead',
      'leadSources',
      'contactTypes',
      'clientTypes',
      'propertyTypes',
      'claimSeverity',
      'lossCauses',
      'claimReasons',
      'titles',
      'vendors',
      'policyCategories'
    ])
  },
  mounted() {
    this.getTitles();
  },
  methods: {
    ...mapActions([
      'addClient',
      'getVendors',
      'addClaim',
      'getClientTypes',
      'getPropertyTypes',
      'getSeverityClaim',
      'getLossCauses',
      'getClaimReasons',
      'getContactTypes',
      'getTitles',
      'getPolicyCategory'
    ]),

    ...mapMutations(['setSelectedLead']),

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    async onSubmit() {
      const sucess = await this.$refs.clientForm.validate();
      if (sucess == true) {
        this.clientInfoDailog = false;
      } else {
        this.clientInfoDailog = true;
      }
    },

    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.id === this['honorific' + val].id;
      });

      this['honorific' + val].title = titleResult.title;
    },

    setTypes(types, data, type) {
      const obj = types.find(item => {
        return item.id === data.id;
      });
      data.value = type == 'mortgage' ? obj.name : obj.machineName; //machine name is not present in vendor
    },

    mailingAddressSame() {
      if (this.isMailingAddressSameToggle) {
        this.mailingAddressDetails = this.clientAddressDetails;
      } else {
        this.mailingAddressDetails = {
          addressCountry: '',
          addressRegion: '',
          addressLocality: '',
          postalCode: '',
          streetAddress: '',
          postOfficeBoxNumber: '',
          isGateDropbox: false,
          dropBoxInfo: ''
        };
      }
    },

    lossAddressSame() {
      if (this.isLossAddressSameAsClientToggle) {
        this.lossAddressDetails = this.clientAddressDetails;
      } else {
        this.lossAddressDetails = {
          addressCountry: '',
          addressRegion: '',
          addressLocality: '',
          postalCode: '',
          streetAddress: '',
          postOfficeBoxNumber: '',
          isGateDropbox: false,
          dropBoxInfo: ''
        };
      }
    },
    onSecondMortgageToggle() {
      if (this.isSecondMortgageHome) {
        this.mortgageDetails.push({
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: false,
          notes: ''
        });
      }
    },
    async createClientButtonClick() {
      const payload = {
        isOrganization: this.primaryDetails.isOrganization,
        organizationName: this.primaryDetails.organizationName,
        isOrganizationPolicyholder: this.policyHolder.isPolicyHolder,
        source: {
          id: '',
          type: this.sourceDetails.type,
          detail: this.sourceDetails.details
        },
        type: {
          ...this.client
        },
        insuredInfo: {
          primary: {
            honorific: {
              id: this.honorific1.id,
              value: this.honorific1.title
            },
            fname: this.insuredDetails.fname,
            lname: this.insuredDetails.lname,
            email: this.insuredDetails.email,
            phoneNumber: [
              {
                type: this.insuredDetails.type,
                number: this.insuredDetails.phone
              }
            ]
          },
          secondary: {
            honorific: {
              id: this.honorific2.id,
              value: this.honorific2.title
            },
            fname: this.coInsuredDetails.fname,
            lname: this.coInsuredDetails.lname,
            email: this.coInsuredDetails.email,
            phoneNumber: [
              {
                type: this.coInsuredDetails.type,
                number: this.coInsuredDetails.phone
              }
            ]
          },
          address: {
            ...this.clientAddressDetails
          },
          mailingAddress: {
            ...this.mailingAddressDetails
          },
          phoneNumbers: [
            {
              type: this.addAditionalPhoneNumber.type1,
              number: this.addAditionalPhoneNumber.phone2
            },
            {
              type: this.addAditionalPhoneNumber.type2,

              number: this.addAditionalPhoneNumber.phone3
            }
          ],
          tenantInfo: {
            name: '',
            phoneNumber: {
              type: '',
              number: ''
            }
          }
        }
      };

      if (this.tenantOccupiedToggle) {
        payload.insuredInfo.tenantInfo.name = this.tenantOccupied.name;
        payload.insuredInfo.tenantInfo.phoneNumber.type = this.tenantOccupied.type;
        payload.insuredInfo.tenantInfo.phoneNumber.number = this.tenantOccupied.phone;
      } else {
        delete payload.insuredInfo.tenantInfo;
      }
      if (this.sourceDetails.type == 'vendor') {
        payload.source.id = this.sourceDetails.id;
      } else {
        payload.source.detail = this.sourceDetails.details;
      }

      const response = await this.addClient(payload);
      if (response && response.id) {
        const clientInfo = {
          name: response,
          id: response.id
        };
        this.setPayloadForLoss(clientInfo);
      }
    },

    async setPayloadForLoss(clientInfo) {
      const payload = {
        client: {
          id: this.client.id,
          fname: this.insuredDetails.fname,
          lname: this.insuredDetails.lname
        },
        policyInfo: {
          carrier: {
            id: this.insuranceDetails.carrierId,
            value: this.insuranceDetails.carrierName
          },
          number: this.insuranceDetails.policyNumber,
          isClaimFiled: this.hasClaimBeenFilledToggle,
          isForcedPlaced: this.isThisIsForcedPlacedPolicyToggle,
          claimNumber: '',
          category: {
            id: this.insuranceDetails.policyCategory.id,
            value: this.insuranceDetails.policyCategory.value
          },
          type: {
            id: this.insuranceDetails.property.id,
            value: this.insuranceDetails.property.value
          },
          effectiveDate: this.insuranceDetails.policyEffectiveDate,
          expirationDate: this.insuranceDetails.policyExpireDate,
          limitCoverage: {
            dwelling: this.insuranceDetails.dwellingLimitA,
            otherStructure: this.insuranceDetails.otherStructureB,
            content: this.insuranceDetails.contentsLimit,
            lossOfUse: this.insuranceDetails.lossOfUSD
          },
          deductibleAmount: this.insuranceDetails.deductible,
          depreciation: this.insuranceDetails.deprecation,
          priorPayment: this.insuranceDetails.priorPayment,
          limitReason: this.insuranceDetails.reasonsOfLD,
          declaration: {
            isDeclared: '',
            fileInfo: {
              id: '',
              value: ''
            }
          }
        },
        mortgageInfo: [
          {
            ...this.mortgageDetails
          }
        ],
        lossInfo: {
          address: {
            ...this.clientAddressDetails
          },

          propertyTypes: {
            ...this.lossInfo.property
          },
          propertyDesc: this.lossInfo.propertyDescription,
          claimReason: {
            ...this.lossInfo.reasonClaim
          },
          date: this.lossInfo.dateOfLoss,
          cause: {
            ...this.lossInfo.causeOfLoss
          },
          deadlineDate: this.lossInfo.deadlineDate,
          recovDDate: this.lossInfo.recovDeadline,
          isFEMA: this.femaClaimToggle,
          isEmergency: this.isStateOfEmergencyToggle,
          emergencyName: this.lossInfo.nameOfEmergency,
          desc: this.lossInfo.descriptionDwelling,
          isHabitable: this.isTheHomeHabitable,
          claimSeverity: {
            ...this.lossInfo.severityOfClaimType
          },
          isOSDamaged: this.isDamageOSToggle,
          OSDamageDesc: this.lossInfo.damageDescription,
          isPPDamaged: this.isThereDamageToPersonalPropertyToggle,
          isPPIF: this.wasAppifProvidedToTheInsuredToggle,
          isNeedPPIF: this.doesTheOfficeNeedToProvidePpifToTheInsuredToggle,
          hashHomeMortgage: this.IsMortgageHomeToggle,
          isSecondClaim: this.isThereAsecondClaimToFileToggle
        }
      };

      this.addClaim(payload).then(() => this.setSelectedLead());
    },

    validateEmail,

    onChangingSourceType() {
      this.sourceDetails.id = '';

      this.sourceDetails.details = '';
    },

    addSelectedVendor(e) {
      this.sourceDetails = {
        id: e.id,
        type: 'vendor',
        details: e.name
      };
      this.closeVendorsList();
    },

    onClosingVendorSelectDialog(vendor, isVendor) {
      if (isVendor) {
        this.sourceDetails.id = vendor.id;
        this.sourceDetails.details = vendor.name;
      } else {
        this.insuranceDetails.carrierId = vendor.id;
        this.insuranceDetails.carrierName = vendor.name;
      }
      this.vendorsListDialog = false;
    },

    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      this.vendorsListDialog = true;
      if (e) {
        this.$refs.list.getVendors();
      }
    },

    onAddVendorDialogClick(name) {
      this.vendorDialogName = name;
      if (name === 'carrier') {
        this.showVendorDialogFilters = false;
        this.vendorDialogFilterByIndustry = '5ffedc469a111940084ce6e2';
      } else {
        this.showVendorDialogFilters = true;
        this.vendorDialogFilterByIndustry = '';
      }
      this.vendorsListDialog = true;
    }
  }
};
</script>

<style lang="scss">
.form-card {
  max-height: calc(100vh - 100px);
  overflow: scroll;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}

.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  padding: 15px 0;
  border-bottom: 1px solid #d3d3d3;
}

.custom-select {
  width: 100%;
  border-bottom: 1px solid #c2c2c2;
  margin-bottom: 20px;

  .select-text {
    line-height: 24px;
    padding-top: 24px;
    padding-bottom: 8px;
    height: 50px;
  }
}
</style>
