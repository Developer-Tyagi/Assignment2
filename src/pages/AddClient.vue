<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/clients')"
      :showAddButton="false"
    />

    <div class="column" style="padding: 30px 20px 20px 20px">
      <div class="q-md column full-width fix-height">
        <div
          v-for="dialogBox in dialogBoxes"
          :key="dialogBox.name"
          @click="createClientDailogBoxOpen(dialogBox.name)"
        >
          <div class="form-list row">
            {{ dialogBox.name }}
            <div class="q-mr-lg q-ml-auto" v-if="dialogBox.validForm == true">
              <q-icon size="xs" color="primary" name="done" />
            </div>
          </div>
        </div>

        <q-btn
          label="Create Client"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          :disabled="isCreateClientButtonDisabled"
          @click="createClientButtonClick"
          size="'xl'"
        ></q-btn>
      </div>
    </div>

    <!-- Public Adjuster Info -->
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
    <!-- Client Info -->
    <q-dialog
      v-model="clientInfoDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
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
            <div class="full-width fix-height">
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
                        sourceDetails.type != constants.industries.VENDOR &&
                          sourceDetails.type != '' &&
                          sourceDetails.type != 'google'
                      "
                      type="text"
                      class="required"
                      placeholder="Enter Source details"
                      v-model="sourceDetails.details"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || '']"
                    />
                    <div
                      v-else-if="
                        sourceDetails.type == constants.industries.VENDOR
                      "
                      class="custom-select"
                      @click="
                        onAddVendorDialogClick(constants.industries.VENDOR)
                      "
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
                    class="required"
                    v-model="client.id"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    :options="clientTypes"
                    @input="setTypes(clientTypes, client)"
                    label="Client Type"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please select the client type'
                    ]"
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
                      class="required"
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
                    class="required"
                    :options="titles"
                    option-value="id"
                    option-label="value"
                    map-options
                    @input="setTitleName(1)"
                    emit-value
                    label="Title"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select the Title'
                    ]"
                  />

                  <q-input
                    class="required"
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
                    class="required"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please fill the Last name'
                    ]"
                    label="Last Name"
                  />
                  <div class="row justify-between">
                    <q-select
                      v-model="insuredDetails.type"
                      class="required col-5"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      map-options
                      emit-value
                      label="Type"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                    />
                    <q-input
                      v-model="insuredDetails.phone"
                      class="required col-6"
                      label="Phone"
                      mask="(###) ###-####"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length == 14) ||
                          'Please enter the phone number'
                      ]"
                    />
                  </div>
                  <q-input
                    v-model="insuredDetails.email"
                    class="required"
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
                      class="required"
                      :options="titles"
                      option-value="id"
                      option-label="value"
                      map-options
                      @input="setTitleName(2)"
                      emit-value
                      label="Title"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select the Title'
                      ]"
                    />
                    <q-input
                      v-model="coInsuredDetails.fname"
                      label="First Name"
                    />
                    <q-input
                      v-model="coInsuredDetails.lname"
                      label="Last Name"
                    />
                    <div class="row justify-between">
                      <q-select
                        v-model="coInsuredDetails.type"
                        class="required col-5"
                        :options="contactTypes"
                        option-value="machineValue"
                        option-label="name"
                        map-options
                        emit-value
                        label="Type"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please select phone type'
                        ]"
                      />
                      <q-input
                        v-model="coInsuredDetails.phone"
                        label="Phone"
                        class="required col-6"
                        mask="(###) ###-####"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 14) ||
                            'Please enter the phone number'
                        ]"
                      />
                    </div>
                    <q-input
                      v-model="coInsuredDetails.email"
                      input
                      type="email"
                      class="required"
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
                    <div class="row justify-between">
                      <q-select
                        v-model="addAditionalPhoneNumber.type1"
                        class="required col-5"
                        label="Type"
                        :options="contactTypes"
                        option-value="machineValue"
                        option-label="name"
                        map-options
                        emit-value
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please select phone type'
                        ]"
                      />
                      <q-input
                        v-model="addAditionalPhoneNumber.phone2"
                        label="Phone2"
                        class="required col-6"
                        mask="(###) ###-####"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 14) ||
                            'Please enter the phone number'
                        ]"
                      />
                    </div>
                    <div class="row justify-between">
                      <q-select
                        class="required col-5"
                        v-model="addAditionalPhoneNumber.type2"
                        label="Type"
                        :options="contactTypes"
                        option-value="machineValue"
                        option-label="name"
                        map-options
                        emit-value
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please select phone type'
                        ]"
                      />
                      <q-input
                        class="required col-6"
                        v-model="addAditionalPhoneNumber.phone3"
                        label="Phone3"
                        mask="(###) ###-####"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 14) ||
                            'Please enter the phone number'
                        ]"
                      />
                    </div>
                  </div>
                  <br />
                  <span class="form-heading">Address Details</span>

                  <AutoCompleteAddress
                    :address="clientAddressDetails"
                    :isDropBoxEnable="true"
                    :isChecksEnable="true"
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

                    <div class="row justify-between">
                      <q-select
                        class="required col-5"
                        v-model="tenantOccupied.type"
                        label="Type"
                        :options="contactTypes"
                        option-value="machineValue"
                        option-label="name"
                        map-options
                        emit-value
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please select phone type'
                        ]"
                      />
                      <q-input
                        class="required col-6"
                        v-model="tenantOccupied.phone"
                        label="Phone"
                        mask="(###) ###-####"
                        lazy-rules
                        :rules="[
                          val =>
                            (val && val.length == 14) ||
                            'Please enter the phone number'
                        ]"
                      />
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
            <br />
          </div>

          <q-btn
            @click="onSubmit('clientInfoDailog')"
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Mailing Address -->
    <q-dialog
      v-model="mailingAddressDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
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
          <div class="q-page bg-white">
            <div class="full-width fix-height">
              <div>
                <q-form ref="mailingAddressForm">
                  <div class="row">
                    <span class="form-heading">
                      Is the mailing address same?
                    </span>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="isMailingAddressSameToggle"
                      @input="mailingAddressSame"
                    />
                  </div>
                  <AutoCompleteAddress
                    :address="mailingAddressDetails"
                    :isDropBoxEnable="true"
                    :isChecksEnable="true"
                    :isFieldsDisable="isMailingAddressSameToggle"
                  />
                </q-form>
              </div>

              <br />
            </div>
          </div>

          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onSubmit('mailingAddressDialog')"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Insurance Info -->
    <q-dialog
      v-model="insuranceInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
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
          <div class="q-page bg-white">
            <div class="full-width fix-height">
              <div>
                <q-form ref="insuranceInfoForm">
                  <div
                    class="custom-select"
                    v-model="insuranceDetails.carrierName"
                    @click="
                      onAddVendorDialogClick(constants.industries.CARRIER)
                    "
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
                    v-model="insuranceDetails.insuranceClaimNumber"
                    label="Insurance Claim Number"
                  />
                  <br />
                  <div class="row">
                    <p class="q-my-auto form-heading">Has claim been filed?</p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="hasClaimBeenFilledToggle"
                    />
                  </div>
                  <div class="row">
                    <p class="q-my-auto form-heading">
                      Is this is a Foced-Placed policy?
                    </p>

                    <q-toggle
                      class="q-ml-auto"
                      v-model="isThisIsForcedPlacedPolicyToggle"
                    />
                  </div>
                  <br />
                  <span class="form-heading">Policy Effective date</span>

                  <div class="full-width">
                    <q-input
                      v-model="insuranceDetails.policyEffectiveDate"
                      mask="##/##/####"
                      label="MM/DD/YYYY"
                      lazy-rules
                      :rules="[val => validateDate(val) || 'Invalid date!']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="sm"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="insuranceDetails.policyEffectiveDate"
                              @input="() => $refs.qDateProxy.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <br />

                  <span class="form-heading">Policy Expiry date </span>

                  <div class="full-width">
                    <q-input
                      v-model="insuranceDetails.policyExpireDate"
                      mask="##/##/####"
                      label="MM/DD/YYYY"
                      lazy-rules
                      :rules="[val => validateDate(val) || 'Invalid date!']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="sm"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy1"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="insuranceDetails.policyExpireDate"
                              @input="() => $refs.qDateProxy1.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <q-select
                    class="required"
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
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please select policy category'
                    ]"
                  />
                  <q-select
                    class="required"
                    v-model="insuranceDetails.policy.id"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    :options="policyTypes"
                    @input="setTypes(policyTypes, insuranceDetails.policy)"
                    label="Policy Type"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please select the policy type'
                    ]"
                  />
                  <br />
                  <div class="row" style="align-items: center">
                    <span class="form-heading">Dwelling Limit (A)</span>
                    <q-input
                      mask="#.#"
                      type="number"
                      v-model.number="insuranceDetails.dwellingLimitA"
                      placeholder="Dwelling Limit (A)"
                      style="margin-left: auto; width: 50%"
                      prefix="$"
                    />
                  </div>
                  <div class="row" style="align-items: center">
                    <span class="form-heading">Other Structure (B)</span>
                    <q-input
                      mask="#.#"
                      type="number"
                      v-model.number="insuranceDetails.otherStructureB"
                      placeholder="Other Structure (B)"
                      prefix="$"
                      style="margin-left: auto; width: 50%"
                    />
                  </div>
                  <div class="row" style="align-items: center">
                    <span class="form-heading">Contents Limit (C)</span>
                    <q-input
                      mask="#.#"
                      type="number"
                      v-model.number="insuranceDetails.contentsLimit"
                      placeholder="Contents Limit (C)"
                      prefix="$"
                      style="margin-left: auto; width: 50%"
                    />
                  </div>
                  <div class="row" style="align-items: center">
                    <span class="form-heading">Loss of Use Limit (D)</span>
                    <q-input
                      mask="#.#"
                      type="number"
                      v-model.number="insuranceDetails.lossOfUSD"
                      placeholder="Loss of Use Limit (D)"
                      prefix="$"
                      style="margin-left: auto; width: 50%"
                    />
                  </div>
                  <div class="row" style="align-items: center">
                    <span class="form-heading">Depreciation</span>
                    <q-input
                      mask="#.#"
                      type="number"
                      v-model.number="insuranceDetails.deprecation"
                      placeholder="Depreciation"
                      prefix="$"
                      style="margin-left: auto; width: 50%"
                    />
                  </div>
                  <div class="row" style="align-items: center">
                    <span class="form-heading">Deductible</span>
                    <q-input
                      mask="#.#"
                      type="number"
                      v-model.number="insuranceDetails.deductible"
                      placeholder="Deductible"
                      prefix="$"
                      style="margin-left: auto; width: 50%"
                    />
                  </div>

                  <div class="row" style="align-items: center">
                    <span class="form-heading" style="width: 50%"
                      >Prior payment by insured</span
                    >
                    <q-input
                      mask="#.#"
                      type="number"
                      v-model.number="insuranceDetails.priorPayment"
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
                      style="resize: none"
                    ></textarea>
                  </div>
                  <br />
                </q-form>
              </div>
            </div>
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onSubmit('insuranceInfoDialog')"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Loss Info -->
    <q-dialog
      v-model="lossInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
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
          <div class="q-page bg-white">
            <div class="full-width fix-height">
              <div>
                <q-form ref="lossInfoForm">
                  <div class="row">
                    <p class="q-my-auto form-heading">
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
                    :isChecksEnable="true"
                    :isFieldsDisable="isLossAddressSameAsClientToggle"
                  />
                  <q-input
                    class="required"
                    v-model="LossAddressName"
                    label="Loss Address Name"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'This is a required field'
                    ]"
                  />
                  <q-select
                    class="required"
                    v-model="lossInfo.property.id"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    :options="propertyTypes"
                    @input="setTypes(propertyTypes, lossInfo.property)"
                    label="Property Type"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please select the property type'
                    ]"
                  />
                  <q-input
                    v-model="lossInfo.propertyDescription"
                    label="Description of Property"
                  />
                  <q-select
                    class="required"
                    v-model="lossInfo.reasonClaim.id"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    :options="claimReasons"
                    @input="setTypes(claimReasons, lossInfo.reasonClaim)"
                    label="Reason for Claim"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please select the reason for claim'
                    ]"
                  /><br />
                  <span class="form-heading">Date of Loss</span>

                  <div class="full-width">
                    <q-input
                      v-model="lossInfo.dateOfLoss"
                      mask="##/##/####"
                      label="MM/DD/YYYY"
                      lazy-rules
                      :rules="[val => validateDate(val) || 'Invalid date!']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="sm"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy2"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="lossInfo.dateOfLoss"
                              @input="() => $refs.qDateProxy2.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <q-select
                    class="required"
                    v-model="lossInfo.causeOfLoss.id"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    :options="lossCauses"
                    @input="setTypes(lossCauses, lossInfo.causeOfLoss)"
                    label="Cause of Loss"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please select the cause of loss'
                    ]"
                  /><br />
                  <span class="form-heading">Deadline Date</span>

                  <div class="full-width">
                    <q-input
                      v-model="lossInfo.deadlineDate"
                      mask="##/##/####"
                      label="MM/DD/YYYY"
                      lazy-rules
                      :rules="[val => validateDate(val) || 'Invalid date!']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="sm"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy3"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="lossInfo.deadlineDate"
                              @input="() => $refs.qDateProxy3.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <br />
                  <span class="form-heading">Recov. Deprec. Deadline</span>

                  <div class="full-width">
                    <q-input
                      v-model="lossInfo.recovDeadline"
                      mask="##/##/####"
                      label="MM/DD/YYYY"
                      lazy-rules
                      :rules="[val => validateDate(val) || 'Invalid date!']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="sm"
                          color="primary"
                          class="cursor-pointer"
                        >
                          <q-popup-proxy
                            ref="qDateProxy4"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="lossInfo.recovDeadline"
                              @input="() => $refs.qDateProxy4.hide()"
                              mask="MM/DD/YYYY"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <br />

                  <div class="row">
                    <p class="q-my-auto form-heading">Is the Home Habitable?</p>
                    <q-toggle class="q-ml-auto" v-model="isTheHomeHabitable" />
                  </div>
                  <div class="row">
                    <p class="q-mx-none q-my-auto form-heading">FEMA Claim</p>
                    <q-toggle class="q-ml-auto" v-model="femaClaimToggle" />
                  </div>
                  <div class="row">
                    <p class="q-my-auto form-heading">State of Emergency</p>
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
                    class="required"
                    v-model="lossInfo.severityOfClaimType.id"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    :options="claimSeverity"
                    @input="
                      setTypes(claimSeverity, lossInfo.severityOfClaimType)
                    "
                    label="Severity of Claim"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please select the severity of claim'
                    ]"
                  /><br />
                  <span class="form-heading">Loss Description to Dwelling</span>
                  <textarea
                    rows="5"
                    required
                    class="full-width"
                    v-model="lossInfo.descriptionDwelling"
                    style="resize: none"
                  />
                  <br />
                  <div class="row">
                    <p class="q-mx-none q-my-auto form-heading">
                      Is there damage to other structures?
                    </p>
                    <q-toggle class="q-ml-auto" v-model="isDamageOSToggle" />
                  </div>

                  <div v-if="isDamageOSToggle">
                    <br />
                    <div
                      v-if="osDamagedItems.length >= 1"
                      flat
                      bordered
                      scroll
                      style="margin-top:20px"
                    >
                      <div class=" items-start q-gutter-md">
                        <div
                          v-for="(item, index) in osDamagedItems"
                          v-if="osDamagedItems.length"
                        >
                          <q-card flat bordered>
                            <div class="text-right">
                              <q-icon
                                v-if="osDamagedItems.length >= 1"
                                size="xs"
                                class="q-ma-xs"
                                dense
                                color="primary"
                                name="close"
                                @click="deleteDamagedItem(index)"
                              />
                            </div>
                            <div>
                              <div class="row">
                                <div
                                  class=" form-heading q-ml-sm text-capitalize q-pt-xs"
                                >
                                  {{ item.name }}
                                </div>
                                <div
                                  class="q-ml-auto q-pt-xs"
                                  style="margin-right:30px"
                                >
                                  {{ '$' + item.cost }}
                                </div>
                              </div>
                              <div
                                class="q-mr-xl  q-my-xm q-px-sm q-ma-xs  text-capitalize text-caption "
                                style="margin-right:91px"
                              >
                                <p>{{ item.desc }}</p>
                              </div>
                            </div>
                          </q-card>
                        </div>
                      </div>
                    </div>
                    <q-btn
                      label="add item"
                      name="add"
                      class="q-mt-sm"
                      icon="add"
                      size="sm"
                      color="primary"
                      @click="damagedItemsDailog = true"
                    >
                    </q-btn>
                    <!-- Damaged Items Dialog Box -->
                    <q-dialog
                      v-model="damagedItemsDailog"
                      persistent
                      transition-show="slide-up"
                      transition-hide="slide-down"
                    >
                      <q-card
                        class="form-card q-pa-md "
                        style="width:500px;height:50%"
                      >
                        <q-header bordered class="bg-white">
                          <q-toolbar class="row bg-white">
                            <img
                              src="~assets/close.svg"
                              alt="back-arrow"
                              @click="damagedItemsDailog = false"
                              style="margin: auto 0"
                            />
                            <div
                              class="text-uppercase text-bold text-black q-mx-auto"
                            >
                              Add Items
                            </div>
                          </q-toolbar>
                        </q-header>

                        <q-card-section>
                          <div class="q-page bg-white">
                            <div class="full-width" style="margin-top: 30px;">
                              <q-input
                                v-model="lossInfo.OSDamageName"
                                label="Name"
                              />
                              <q-input
                                v-model="lossInfo.OSDamageDescription"
                                label="Description"
                                autogrow
                              />
                              <q-input
                                mask="#.#"
                                type="number"
                                prefix="$"
                                v-model.number="lossInfo.OSDamagedItemCost"
                                label="Item Cost"
                              /><br />
                            </div>
                            <br />
                          </div>

                          <q-btn
                            label="Save"
                            color="primary"
                            class="full-width q-mt-auto text-capitalize"
                            @click="addDamagedItems"
                            size="'xl'"
                          ></q-btn>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                  </div>
                  <div class="row ">
                    <p class="q-mt-md form-heading">
                      Is there damage to personal property?
                    </p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="isThereDamageToPersonalPropertyToggle"
                    />
                  </div>
                  <!-- Persnol Property Damage List -->
                  <div v-if="isThereDamageToPersonalPropertyToggle">
                    <br />
                    <div
                      v-if="ppDamagedItems.length >= 1"
                      flat
                      bordered
                      scroll
                      class="q-mt-xs"
                    >
                      <div class=" items-start q-gutter-md">
                        <div
                          v-for="(item, index) in ppDamagedItems"
                          v-if="ppDamagedItems.length"
                        >
                          <q-card flat bordered>
                            <div class="text-right">
                              <q-icon
                                v-if="ppDamagedItems.length >= 1"
                                class="q-ma-xs"
                                size="xs"
                                dense
                                color="primary"
                                name="close"
                                @click="deletePPDamagedItem(index)"
                              />
                            </div>
                            <div class="row">
                              <div
                                class=" form-heading q-ml-sm text-capitalize q-pt-xs"
                              >
                                {{ item.name }}
                              </div>
                              <div
                                class="q-ml-auto q-pt-xs"
                                style="margin-right:30px"
                              >
                                {{ '$' + item.cost }}
                              </div>
                            </div>
                            <div
                              class="q-mr-xl  q-my-xm q-px-sm q-ma-xs  text-capitalize text-caption "
                              style="margin-right:91px"
                            >
                              <p>{{ item.desc }}</p>
                            </div>
                            <div class="q-ma-sm q-ml-xs ">
                              {{ item.serialNumber }}
                            </div>
                            <div class="q-ma-sm ">
                              {{ item.radio }}
                            </div>
                          </q-card>
                        </div>
                      </div>
                    </div>
                    <div>
                      <q-btn
                        label="add item"
                        name="add"
                        class="q-mt-sm"
                        icon="add"
                        size="sm"
                        color="primary"
                        @click="PPdamagedItemsDailog = true"
                      >
                      </q-btn>
                    </div>
                    <q-dialog
                      v-model="PPdamagedItemsDailog"
                      persistent
                      transition-show="slide-up"
                      transition-hide="slide-down"
                    >
                      <q-card
                        class="form-card q-pa-md"
                        style="width:500px;height:65%"
                      >
                        <q-header bordered class="bg-white">
                          <q-toolbar class="row bg-white">
                            <img
                              src="~assets/close.svg"
                              alt="back-arrow"
                              @click="PPdamagedItemsDailog = false"
                              style="margin: auto 0"
                            />
                            <div
                              class="text-uppercase text-bold text-black q-mx-auto"
                            >
                              Add Items
                            </div>
                          </q-toolbar>
                        </q-header>

                        <q-card-section>
                          <div class="q-page bg-white">
                            <div class="full-width" style="margin-top: 30px;">
                              <q-input
                                v-model="lossInfo.PPDamageName"
                                label="Name"
                              />
                              <q-input
                                v-model="lossInfo.PPDamageDescription"
                                label="Description"
                                autogrow
                              />
                              <q-input
                                type="number"
                                v-model.number="lossInfo.PPDamagedItemCost"
                                label="Item Cost"
                                prefix="$"
                              />
                              <q-input
                                v-model="lossInfo.serialNumber"
                                label="Serial Number"
                              />
                              <br />

                              <q-radio
                                v-model="lossInfo.repairReplaceRadio"
                                val="Repair"
                                label="Repair"
                              ></q-radio>
                              <q-radio
                                class="q-ml-none "
                                v-model="lossInfo.repairReplaceRadio"
                                val="Replace"
                                label="Replace"
                              ></q-radio>
                            </div>
                            <br />
                          </div>

                          <q-btn
                            label="Save"
                            color="primary"
                            class="full-width q-mt-auto text-capitalize"
                            @click="addPPDamagedItems"
                            size="'xl'"
                          ></q-btn>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                  </div>
                  <div class="row">
                    <p class="q-mx-none q-my-auto form-heading">
                      Was a PPIF provided to the insured?
                    </p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="wasAppifProvidedToTheInsuredToggle"
                    />
                  </div>
                  <div class="row">
                    <p class="q-mx-none q-my-auto form-heading">
                      Does Claimguru PPIF need to be provided?
                    </p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="doesTheOfficeNeedToProvidePpifToTheInsuredToggle"
                    />
                  </div>
                  <div class="row">
                    <p class="q-my-auto form-heading">
                      Is there a mortgage on the home?
                    </p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="isMortgageHomeToggle"
                      @input="onToggleButtonClick"
                    />
                  </div>
                </q-form>
              </div>
              <div
                v-if="isMortgageHomeToggle"
                @click="mortgageInfoDialog = true"
              >
                <div class="row">
                  <div class="q-px-xs row">
                    <div v-if="!mortgageDetails[0]['id']">Select Mortgage</div>
                    <div
                      v-else
                      class="select-text"
                      v-for="(mortgageDetail, index) in mortgageDetails"
                    >
                      <span>
                        {{ mortgageDetail.value }}
                      </span>
                      <span v-if="mortgageDetails.length - 1 > index"> , </span>
                    </div>
                  </div>
                </div>
              </div>
              <q-separator />
              <br />
            </div>
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onSubmit('lossInfoDialog')"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Mortage Info -->
    <q-dialog
      v-model="mortgageInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
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
          <div class="q-page bg-white">
            <div class="full-width fixHeight">
              <div
                class="custom-select"
                v-model="mortgageDetails[0].id"
                @click="onAddVendorDialogClick(constants.industries.MORTGAGE)"
              >
                <div class="select-text">
                  {{
                    mortgageDetails[0].value
                      ? mortgageDetails[0].value
                      : 'Enter Mortgage Company'
                  }}
                </div>
              </div>

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
                style="resize: none"
              />
              <div class="row">
                <span class="form-heading">
                  Is there a 2nd mortgage on the home?
                </span>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isSecondMortgageHome"
                  @input="onSecondMortgageToggle"
                />
              </div>
              <div v-if="isSecondMortgageHome">
                <div
                  class="custom-select"
                  v-model="mortgageDetails[1].id"
                  @click="
                    onAddVendorDialogClick(
                      constants.industries.SECONDARYMORTGAGE
                    )
                  "
                >
                  <div class="select-text">
                    {{
                      mortgageDetails[1].value
                        ? mortgageDetails[1].value
                        : 'Enter Mortgage Company'
                    }}
                  </div>
                </div>
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
                  style="resize: none"
                />
              </div>
            </div>
            <br />
          </div>

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
    <!-- Estimating Info -->
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
          <div class="q-page bg-white" style="min-height: 500px">
            <div class="full-width fix-height">
              <div>
                <q-form ref="estimatingInfoForm">
                  <div class="row">
                    <p style="form-heading">
                      Does an estimator need to be<br />assigned?
                    </p>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="doesAnEstimatorNeedToBeAssignedToggle"
                    />
                  </div>

                  <div
                    v-if="doesAnEstimatorNeedToBeAssignedToggle"
                    @click="estimatorsListDialog = true"
                  >
                    <div
                      class="custom-select form-heading"
                      v-model="addEstimatorInfo.name"
                    >
                      <div class="select-text">
                        {{
                          addEstimatorInfo.name
                            ? addEstimatorInfo.name
                            : 'Add Estimator'
                        }}
                      </div>
                    </div>
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
                </q-form>
              </div>
              <br />
            </div>
          </div>

          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onSubmit('estimatingInfoDialog')"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Add Estimator Dialog -->
    <q-dialog
      v-model="addEstimatorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="addEstimatorDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              ADD NEW ESTIMATOR
            </div>
          </q-toolbar>
        </q-header>

        <q-card-section>
          <div class="q-page bg-white">
            <div class="full-width fix-height">
              <div>
                <q-form ref="addEstimatorForm">
                  <q-select
                    class="required"
                    v-model="honorific3.id"
                    :options="titles"
                    option-value="id"
                    option-label="value"
                    map-options
                    @input="setTitleName(3)"
                    emit-value
                    label="Title"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select the title'
                    ]"
                  />

                  <q-input
                    class="required"
                    v-model="addEstimatorInfo.fname"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please fill the First name'
                    ]"
                    label="First Name"
                  />

                  <q-input v-model="addEstimatorInfo.lname" label="Last Name" />
                  <q-input
                    class="required"
                    v-model="addEstimatorInfo.email"
                    label="Email"
                    lazy-rules
                    :rules="[
                      val =>
                        validateEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                  />

                  <div class="row justify-between">
                    <q-select
                      class="col-5"
                      v-model="addEstimatorInfo.type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      map-options
                      emit-value
                      label="Type"
                    />
                    <q-input
                      class="col-6"
                      v-model="addEstimatorInfo.phone"
                      label="Phone"
                      mask="(###) ###-####"
                    />
                  </div>
                </q-form>
              </div>
            </div>
          </div>
          <q-btn
            label="Add Estimator"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onSubmit('addEstimatorDialog')"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Expert /Vendor Info -->
    <q-dialog
      v-model="expertVendorInfoDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
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
          <div class="q-page bg-white">
            <div class="full-width fix-height">
              <div>
                <q-form ref="expertVendorInfoForm">
                  <div class="row">
                    <span class="form-heading"
                      >Do any vendors need to be assigned?</span
                    >
                    <q-toggle
                      class="q-ml-auto"
                      v-model="vendorExpertHiredToggle"
                    />
                  </div>

                  <q-select
                    v-if="vendorExpertHiredToggle"
                    class="full-width"
                    v-model="expertVendorInfo.industry.value"
                    use-input
                    input-debounce="0"
                    option-label="name"
                    label=" Industry"
                    :options="vendorIndustriesOptions"
                    option-value="name"
                    @filter="searchFilterBy"
                    @input="setVendorIndustryName"
                    behavior="menu"
                    emit-value
                    map-options
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please fill the Vendor Industry'
                    ]"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-black">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <!-- This will Show the input when industry Type is Others -->
                  <q-input
                    v-model="industryType.value"
                    v-if="expertVendorInfo.industry.value == 'Others'"
                    label="Enter New Industry Type"
                  ></q-input>
                  <q-btn
                    class="q-mt-md"
                    v-if="industryType.value"
                    label="Add"
                    outline
                    @click="addAnotherIndustry"
                  />

                  <div
                    v-if="vendorExpertHiredToggle"
                    class="custom-select"
                    v-model="expertVendorInfo.vendorName"
                    @click="
                      onAddVendorDialogClick(constants.industries.EXPERTVENDOR)
                    "
                  >
                    <div class="select-text">
                      {{
                        expertVendorInfo.id
                          ? expertVendorInfo.vendorName
                          : 'Select Vendor'
                      }}
                    </div>
                  </div>

                  <div class="row">
                    <span class="form-heading">Is Insured hired?</span>
                    <q-toggle
                      class="q-ml-auto"
                      v-model="anyOtherExpertHiredToggle"
                    />
                  </div>
                  <span class="form-heading">Notes</span>
                  <div>
                    <textarea
                      rows="5"
                      required
                      class="full-width"
                      v-model="expertVendorInfo.notes"
                      style="resize: none"
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <span class="form-heading">Internal Notes</span>
                    <textarea
                      rows="5"
                      required
                      class="full-width"
                      v-model="expertVendorInfo.internalNotes"
                      style="resize: none"
                    ></textarea>
                  </div>
                </q-form>
              </div>
              <br />
            </div>
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onSubmit('expertVendorInfoDialog')"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Office Task -->
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
    <!-- Vendor list Dialog -->
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
          :valueName="valueName"
        />
      </q-card>
    </q-dialog>
    <!-- Estimators List Dialog -->
    <q-dialog
      v-model="estimatorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white justify-between">
            <img
              src="~assets/close.svg"
              alt="close"
              @click="estimatorsListDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Estimators
            </div>
            <img
              src="~assets/add.svg"
              @click="addEstimatorDialog = true"
              style="margin: 0 0 0 20px"
            />
          </q-toolbar>
        </q-header>
        <div class="vendor-list">
          <div
            v-for="estimator in estimators"
            :key="estimator.id"
            class="vendor-list-item"
            @click="selectEstimator(estimator)"
          >
            <span>{{ estimator.fname }} {{ estimator.lname }}</span>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Add vendor Dialog -->
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
          :selectedIndustryType="
            expertVendorInfo.industry.value == 'Others'
              ? industryType.value
              : expertVendorInfo.industry.value
          "
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import CustomHeader from 'components/CustomHeader';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import AddressService from '@utils/country';
import { validateEmail, validateDate } from '@utils/validation';
import { constants } from '@utils/constant';
import { dateToSend } from '@utils/date';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import { date } from 'quasar';

const addressService = new AddressService();

export default {
  name: 'addClient',
  components: { CustomHeader, VendorsList, AddVendor, AutoCompleteAddress },

  data() {
    return {
      PPdamagedItemsDailog: false,
      ppDamagedItems: [],

      damagedItemsDailog: false,
      osDamagedItems: [],

      isCreateClientButtonDisabled: true,
      industryType: {
        value: '',
        machineValue: ''
      },
      dialogBoxes: [
        { name: 'Client Info', validForm: false },
        { name: 'Mailing Address', validForm: false },
        { name: 'Insurance Info', validForm: false },
        { name: 'Loss Info', validForm: false },
        { name: 'Expert/Vendor Info', validForm: false },
        { name: 'Estimating Info', validForm: false },
        { name: 'Office Task', validForm: false },
        { name: 'Public Adjustor Info', validForm: false }
      ],

      vendorIndustriesOptions: [],
      estimatorsListDialog: false,
      constants: constants,
      valueName: '',
      mortgageInfoDialog: false,
      isSecondMortgageHome: false,
      vendorDialogName: '',
      vendorDialogFilterByIndustry: '',
      showVendorDialogFilters: false,
      LossAddressName: '',
      publicAdjustorInfoDialog: false,
      addVendorDialog: false,
      addEstimatorDialog: false,
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
        value: '',
        machineValue: ''
      },
      honorific2: {
        id: '',
        value: '',
        machineValue: ''
      },
      sourceDetails: {
        id: '',
        type: '',
        details: ''
      },
      client: {
        id: '',
        value: '',
        machineValue: ''
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
        machineValue: '',
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
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
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
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
      },

      lossInfo: {
        repairReplaceRadio: '',
        serialNumber: '',
        PPDamageName: '',
        PPDamageDescription: '',
        PPDamagedItemCost: '',
        OSDamageDescription: '',
        OSDamageName: '',

        DescriptionOfLoss: '',

        OSDamagedItemCost: '',
        dateOfLoss: '',
        propertyDescription: '',
        damagePersnalPropertyDescription: '',
        reasonClaim: {
          value: '',
          id: '',
          machineValue: ''
        },
        deadlineDate: '',
        recovDeadline: '',
        nameOfEmergency: '',
        descriptionDwelling: '',
        damageDescription: '',
        property: {
          value: '',
          id: '',
          machineValue: ''
        },
        insuranceAdjustorName: '',
        whereDidTheLossOccur: '',
        other: '',
        severityOfClaimType: {
          id: '',
          value: '',
          machineValue: ''
        },
        causeOfLoss: {
          value: '',
          id: '',
          machineValue: ''
        },
        describeTheLoss: '',
        insuranceAdjustorPhone: '',
        insuranceAdjustorPhoneType: '',
        typeOfLoss: ''
      },
      insuranceDetails: {
        policy: {
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
        insuranceClaimNumber: '',
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
        notes: '',
        internalNotes: '',
        vendorName: '',
        id: '',
        industry: { value: null, id: '', machineValue: '' }
      },
      officeTask: {
        officeActionTypes: '',
        officeTaskTypes: ''
      },
      isItCompanyLeadToggle: false,
      addAditionalPhoneNumberToggle: false,
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
      isMortgageHomeToggle: false,
      isLossAddressSameAsClientToggle: false,
      lossAddressDetails: {
        addressCountry: '',
        addressRegion: '',
        addressLocality: '',
        postalCode: '',
        streetAddress: '',
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
      },
      addEstimatorInfo: {
        name: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        type: ''
      },
      honorific3: {
        id: '',
        value: '',
        machineValue: ''
      },
      typeOfLoss: [],

      isTherea2ndMortgageOnTheHomeToggle: false,
      doesAnEstimatorNeedToBeAssignedToggle: false,

      vendorExpertHiredToggle: false,
      anyOtherExpertHiredToggle: false,

      femaClaimToggle: false,
      additionalOfficeTaskRequiredToggle: false,
      officeActionRequiredTypes: [],
      officeTaskRequiredTypes: []
    };
  },

  created() {
    this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = this.lossInfo.dateOfLoss = this.lossInfo.deadlineDate = this.lossInfo.recovDeadline = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );

    this.getVendors(this.$route.params.id);
    this.getClientTypes();
    this.getEstimators();

    this.getPropertyTypes();
    this.getPolicyTypes();
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
      this.honorific1.machineValue = this.selectedLead.primaryContact.honorific.machineValue;
      this.sourceDetails.details = this.selectedLead.leadSource.detail;
      this.insuranceDetails.carrierName = this.selectedLead.leadSource.type;
      this.insuranceDetails.policyNumber = this.selectedLead.policyNumber;
      this.lossAddressDetails.addressCountry = this.selectedLead.lossLocation.addressCountry;
      this.lossAddressDetails.addressLocality = this.selectedLead.lossLocation.addressLocality;
      this.lossAddressDetails.addressRegion = this.selectedLead.lossLocation.addressRegion;
      this.lossAddressDetails.postalCode = this.selectedLead.lossLocation.postalCode;
      this.lossAddressDetails.streetAddress = this.selectedLead.lossLocation.streetAddress;
    }
    this.countries = addressService.getCountries();
    this.onCountrySelect('United States');
  },

  computed: {
    ...mapGetters([
      'selectedLead',
      'leadSources',
      'estimators',
      'contactTypes',
      'clientTypes',
      'propertyTypes',
      'policyTypes',
      'claimSeverity',
      'lossCauses',
      'claimReasons',
      'titles',
      'vendors',
      'policyCategories',
      'vendorIndustries'
    ])
  },

  mounted() {
    this.getTitles();
    this.getVendorIndustries();
  },
  methods: {
    ...mapActions([
      'addClient',
      'getVendors',
      'getEstimators',
      'addClaim',
      'addEstimator',
      'getClientTypes',
      'getPropertyTypes',
      'getPolicyTypes',
      'getSeverityClaim',
      'getLossCauses',
      'getClaimReasons',
      'getContactTypes',
      'getTitles',
      'getPolicyCategory',
      'getVendorIndustries',
      'addIndustry'
    ]),

    ...mapMutations(['setSelectedLead']),
    async addAnotherIndustry() {
      const response = await this.addIndustry(this.industryType);
      if (response) {
        this.$q.notify({
          message: 'Added New Industry Type',
          position: 'top',
          type: 'negative'
        });
      }
    },

    searchFilterBy(val, update) {
      this.expertVendorInfo.industry.value = null;
      if (val === ' ') {
        update(() => {
          this.vendorIndustriesOptions = this.vendorIndustries;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.vendorIndustriesOptions = this.vendorIndustries.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    createClientDailogBoxOpen(value) {
      switch (value) {
        case 'Client Info':
          this.clientInfoDailog = true;
          break;
        case 'Mailing Address':
          this.mailingAddressDialog = true;
          break;
        case 'Insurance Info':
          this.insuranceInfoDialog = true;
          break;
        case 'Loss Info':
          this.lossInfoDialog = true;
          break;
        case 'Expert/Vendor Info':
          this.expertVendorInfoDialog = true;
          break;
        case 'Estimating Info':
          this.estimatingInfoDialog = true;
          break;
        case 'Office Task':
          this.officeTaskDialog = true;
          break;
        case 'Public Adjustor Info':
          this.publicAdjustorInfoDialog = true;
          break;
        case 'Documents':
          this.documentsDialog = true;
          break;
      }
    },
    validateDate,
    deleteItems(index) {
      this.$delete(this.ppDamagedItems, index);
    },
    addPPDamagedItems() {
      this.PPdamagedItemsDailog = false;
      this.ppDamagedItems.push({
        name: this.lossInfo.PPDamageName,
        desc: this.lossInfo.PPDamageDescription,
        cost: this.lossInfo.PPDamagedItemCost,
        serialNumber: this.lossInfo.serialNumber,
        radio: this.lossInfo.repairReplaceRadio
      });
      this.lossInfo.PPDamageName = '';
      this.lossInfo.PPDamageDescription = '';
      this.lossInfo.serialNumber = '';
      this.lossInfo.PPDamagedItemCost = '';
      this.lossInfo.repairReplaceRadio = false;
    },
    deletePPDamagedItem(index) {
      this.$delete(this.ppDamagedItems, index);
    },

    setVendorIndustryName() {
      const selectedName = this.expertVendorInfo.industry.value;
      const result = this.vendorIndustries.find(obj => {
        return obj.name === selectedName;
      });

      this.expertVendorInfo.industry.value = result.name;

      this.expertVendorInfo.industry.id = result.id;
      this.expertVendorInfo.industry.machineValue = result.machineValue;
    },
    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    async onSubmit(name) {
      let success = false;
      let validationIndex;
      switch (name) {
        case 'clientInfoDailog':
          success = await this.$refs.clientForm.validate();
          validationIndex = 0;

          break;
        case 'insuranceInfoDialog':
          success = await this.$refs.insuranceInfoForm.validate();
          validationIndex = 2;

          break;

        case 'mailingAddressDialog':
          success = await this.$refs.mailingAddressForm.validate();
          validationIndex = 1;

          break;

        case 'addEstimatorDialog':
          success = await this.$refs.addEstimatorForm.validate();
          validationIndex = 5;
          break;
        case 'lossInfoDialog':
          success = await this.$refs.lossInfoForm.validate();
          validationIndex = 3;

          break;

        case 'expertVendorInfoDialog':
          success = await this.$refs.expertVendorInfoForm.validate();
          validationIndex = 4;

          break;
        case 'estimatingInfoDialog':
          success = await this.$refs.estimatingInfoForm.validate();
          validationIndex = 5;
      }
      if (success == true) {
        this.dialogBoxes[validationIndex].validForm = true;

        for (var i = 0; i < this.dialogBoxes.length - 2; i++) {
          if (this.dialogBoxes[i].validForm == false) {
            this.isCreateClientButtonDisabled = true;
            break;
          } else {
            this.isCreateClientButtonDisabled = false;
          }
        }

        if (
          name === 'insuranceInfoDialog' ||
          name === 'expertVendorInfoDialog'
        ) {
          this[name] = false;
        }
        if (name === 'addEstimatorDialog') {
          this.onAddEstimatorButtonClick();
          this[name] = false;
        } else {
          this[name] = false;
        }
      } else {
        this.dialogBoxes.validForm = false;
      }
    },
    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.id === this['honorific' + val].id;
      });
      this['honorific' + val].title = titleResult.value;
      this['honorific' + val].machineValue = titleResult.machineValue;
    },

    setTypes(types, data, type) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
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
          dropBox: {
            info: '',
            isPresent: false
          }
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
          dropBox: {
            info: '',
            isPresent: false
          }
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
      } else {
        this.mortgageDetails.pop();
      }
    },
    async createClientButtonClick() {
      const payload = {
        isOrganization: this.primaryDetails.isOrganization,
        organizationName: this.primaryDetails.organizationName,
        isOrganizationPolicyholder: this.policyHolder.isPolicyHolder,
        source: {
          id: this.sourceDetails.id,
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
              value: this.honorific1.title,
              machineValue: this.honorific1.machineValue
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
              value: this.honorific2.title,
              machineValue: this.honorific2.machineValue
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
      if (!this.isThereaCoInsuredToggle) {
        delete payload.insuredInfo.secondary;
      }
      if (this.sourceDetails.type == constants.industries.VENDOR) {
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

        this.setPayloadForClaim(clientInfo);
      }
    },

    async setPayloadForClaim(clientInfo) {
      const payload = {
        client: {
          id: clientInfo.id,
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
          claimNumber: this.insuranceDetails.insuranceClaimNumber,
          category: {
            id: this.insuranceDetails.policyCategory.id,
            value: this.insuranceDetails.policyCategory.value,
            machineValue: this.insuranceDetails.policyCategory.machineValue
          },
          type: {
            id: this.insuranceDetails.policy.id,
            value: this.insuranceDetails.policy.value,
            machineValue: this.insuranceDetails.policy.machineValue
          },
          effectiveDate: dateToSend(this.insuranceDetails.policyEffectiveDate),
          expirationDate: dateToSend(this.insuranceDetails.policyExpireDate),
          limitCoverage: {
            dwelling: this.insuranceDetails.dwellingLimitA
              ? this.insuranceDetails.dwellingLimitA
              : 0,
            otherStructure: this.insuranceDetails.otherStructureB
              ? this.insuranceDetails.otherStructureB
              : 0,
            content: this.insuranceDetails.contentsLimit
              ? this.insuranceDetails.contentsLimit
              : 0,
            lossOfUse: this.insuranceDetails.lossOfUSD
              ? this.insuranceDetails.lossOfUSD
              : 0
          },
          deductibleAmount: this.insuranceDetails.deductible
            ? this.insuranceDetails.deductible
            : 0,
          depreciation: this.insuranceDetails.deprecation
            ? this.insuranceDetails.deprecation
            : 0,
          priorPayment: this.insuranceDetails.priorPayment
            ? this.insuranceDetails.priorPayment
            : 0,
          limitReason: this.insuranceDetails.reasonsOfLD,
          declaration: {
            isDeclared: true,
            fileInfo: {
              id: '',
              value: ''
            }
          }
        },
        mortgageInfo: this.mortgageDetails,
        lossInfo: {
          lossAddressName: '',
          address: {
            ...this.clientAddressDetails
          },

          propertyType: {
            ...this.lossInfo.property
          },
          propertyDesc: this.lossInfo.propertyDescription,
          claimReason: {
            ...this.lossInfo.reasonClaim
          },
          date: dateToSend(this.lossInfo.dateOfLoss),
          cause: {
            ...this.lossInfo.causeOfLoss
          },
          deadlineDate: dateToSend(this.lossInfo.deadlineDate),
          recovDDDate: dateToSend(this.lossInfo.recovDeadline),
          isFEMA: this.femaClaimToggle,
          isEmergency: this.isStateOfEmergencyToggle,
          emergencyName: this.lossInfo.nameOfEmergency,
          desc: this.lossInfo.descriptionDwelling,
          isHabitable: this.isTheHomeHabitable,
          serverity: {
            ...this.lossInfo.severityOfClaimType
          },
          OSDamageItems: this.osDamagedItems,
          PPDamageItems: this.ppDamagedItems,
          isPPIF: this.wasAppifProvidedToTheInsuredToggle,
          isNeedPPIF: this.doesTheOfficeNeedToProvidePpifToTheInsuredToggle,

          hasHomeMortgage: this.isMortgageHomeToggle,
          isSecondClaim: false
        },
        expertInfo: {
          isVendorAssigned: this.vendorExpertHiredToggle,
          vendor: [
            {
              id: this.expertVendorInfo.id,
              value: this.expertVendorInfo.vendorName
            }
          ],
          isInsuredHired: this.anyOtherExpertHiredToggle,
          notes: this.expertVendorInfo.notes,
          internalNotes: this.expertVendorInfo.internalNotes
        }
      };

      this.addClaim(payload).then(() => {
        this.setSelectedLead();
        this.$router.push('/clients');
      });
    },
    async onAddEstimatorButtonClick() {
      const payload = {
        fname: this.addEstimatorInfo.fname,
        lname: this.addEstimatorInfo.lname,
        honorific: {
          id: this.honorific3.id,
          value: this.honorific3.title,
          machineValue: this.honorific3.machineValue
        },
        email: this.addEstimatorInfo.email,
        phoneNumber: [
          {
            type: this.addEstimatorInfo.type,
            number: this.addEstimatorInfo.phone
          }
        ]
      };
      const response = this.addEstimator(payload);
      if (response) {
        await this.getEstimators();
        this.addEstimatorInfo = {
          name: '',
          fname: '',
          lname: '',
          email: '',
          phone: '',
          type: ''
        };
        (this.honorific3.id = ''), (this.addEstimatorDialog = false);
      }
    },
    selectEstimator(value) {
      this.addEstimatorInfo.name = value.fname;
      this.estimatorsListDialog = false;
    },

    validateEmail,
    addDamagedItems() {
      this.osDamagedItems.push({
        name: this.lossInfo.OSDamageName,
        desc: this.lossInfo.OSDamageDescription,
        cost: this.lossInfo.OSDamagedItemCost
      });

      this.damagedItemsDailog = false;
      this.lossInfo.OSDamageName = '';
      this.lossInfo.OSDamageDescription = '';
      this.lossInfo.OSDamagedItemCost = '';
    },
    deleteDamagedItem(index) {
      this.$delete(this.osDamagedItems, index);
    },

    onChangingSourceType() {
      this.sourceDetails.id = '';
      this.sourceDetails.details = '';
      this.sourceDetails.machineValue = '';
    },

    onClosingVendorSelectDialog(vendor, dialogName) {
      switch (dialogName) {
        case constants.industries.CARRIER:
          this.insuranceDetails.carrierId = vendor.id;
          this.insuranceDetails.carrierName = vendor.name;
          break;
        case constants.industries.VENDOR:
          this.sourceDetails.id = vendor.id;
          this.sourceDetails.details = vendor.name;
          break;
        case constants.industries.MORTGAGE:
          this.mortgageDetails[0].id = vendor.id;
          this.mortgageDetails[0].value = vendor.name;
          break;
        case constants.industries.SECONDARYMORTGAGE:
          this.mortgageDetails[1].id = vendor.id;
          this.mortgageDetails[1].value = vendor.name;
          break;
        case constants.industries.EXPERTVENDOR:
          this.expertVendorInfo.id = vendor.id;
          this.expertVendorInfo.vendorName = vendor.name;
          break;
      }

      this.vendorsListDialog = false;
    },
    onToggleButtonClick() {
      if (this.mortgageDetails.length > 1) {
        this.mortgageDetails.pop();
      }
      if (!this.isMortgageHomeToggle) {
        this.isSecondMortgageHome = false;
        this.mortgageDetails = [
          {
            id: '',
            value: '',
            loanNumber: '',
            accountNumber: '',
            isPrimary: true,
            notes: ''
          }
        ];
      }
    },
    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      this.vendorsListDialog = true;
      if (e) {
        if (
          this.vendorDialogName === constants.industries.CARRIER ||
          this.vendorDialogName === constants.industries.MORTGAGE
        ) {
          const params = {
            industry:
              this.vendorDialogName === constants.industries.CARRIER
                ? constants.industries.CARRIER
                : constants.industries.MORTGAGE,
            name: ''
          };
          this.$refs.list.getVendors(params);
        } else {
          this.$refs.list.getVendors();
        }
      }
    },
    onAddVendorDialogClick(name) {
      this.valueName = name;

      switch (name) {
        case constants.industries.MORTGAGE:
          this.vendorDialogName = constants.industries.MORTGAGE;
          this.showVendorDialogFilters = false;
          this.vendorDialogFilterByIndustry = constants.industries.MORTGAGE;
          break;
        case constants.industries.SECONDARYMORTGAGE:
          this.vendorDialogName = constants.industries.MORTGAGE;
          this.showVendorDialogFilters = false;
          this.vendorDialogFilterByIndustry = constants.industries.MORTGAGE;
          break;
        case constants.industries.EXPERTVENDOR:
          this.vendorDialogName = constants.industries.EXPERTVENDOR;
          this.showVendorDialogFilters = false;
          this.vendorDialogFilterByIndustry = constants.industries.VENDOR;

          this.vendorDialogFilterByIndustry = this.expertVendorInfo.industry.machineValue;
          break;
        case constants.industries.CARRIER:
          this.vendorDialogName = constants.industries.CARRIER;
          this.showVendorDialogFilters = false;
          this.vendorDialogFilterByIndustry = constants.industries.CARRIER;
          break;
        case constants.industries.VENDOR:
          this.vendorDialogName = constants.industries.VENDOR;
          this.showVendorDialogFilters = true;
          this.vendorDialogFilterByIndustry = '';
          break;
        default:
          this.vendorDialogName = name;
      }
      this.vendorsListDialog = true;
    }
  }
};
</script>

<style lang="scss">
.fix-height {
  height: calc(100vh - 145px);
  overflow-y: auto;
  margin-bottom: 10px;
  padding-top: 20px;
}

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
  padding: 5px;
  border-bottom: 1px solid #d3d3d3;
  margin-top: 20px;
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
.vendor-list {
  padding-top: 51px;
  color: #666666;
  .actions-div {
    display: flex;
    border-bottom: 1px solid #0000001f;
    padding: 0 20px;
    align-items: center;
  }
  .vendor-list-item {
    padding: 20px;
    border-bottom: 1px solid lightgray;
    text-transform: capitalize;
    display: flex;
  }
}
</style>
