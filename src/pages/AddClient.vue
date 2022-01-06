<template>
  <q-page>
    <div class="responsive-page">
      <div class="stepper">
        <div class="step justify-between" id="step">
          <div
            class="column align-center q-px-md"
            v-for="(arr, index) in stepArr"
            :key="index"
            @click="onStepClick(index)"
          >
            <div
              :class="{
                'icon-div-selected': index == step,
                'icon-div-done': index < step,
                'icon-div': index > step
              }"
              class="q-mx-auto"
            >
              <q-icon
                v-if="index == step"
                size="14px"
                name="create"
                color="white"
                style="margin: auto"
              />
              <q-icon
                v-if="index < stepClickValidTill && index != step"
                size="14px"
                name="done"
                color="white"
                style="margin: auto"
              />
            </div>
            <div class="label">{{ arr.name }}</div>
          </div>
        </div>
        <div class="form">
          <!-- Client Info -->
          <q-form
            @submit="onNextButtonClick(0)"
            :hidden="step != 0"
            ref="clientInfo"
          >
            <div class="form-card q-pa-sm">
              <q-card class="q-pa-md q-mb-md">
                <q-select
                  dense
                  v-model="client.value"
                  option-value="name"
                  option-label="name"
                  map-options
                  emit-value
                  behavior="menu"
                  borderless
                  class="required input-style input-field"
                  options-dense
                  :options="clientTypes"
                  @input="setTypes(clientTypes, client)"
                  label="Client Type"
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please select the client type'
                  ]"
                  :disable="isOfflineClientEdit"
                />
                <div class="row">
                  <p class="q-mx-none q-ml-sm q-my-auto">
                    Is Policyholder An Organization ?
                  </p>
                  <q-toggle
                    v-model="primaryDetails.isOrganization"
                    left-label
                    class="q-ml-auto"
                    :disable="isOfflineClientEdit"
                  />
                </div>
                <div v-if="primaryDetails.isOrganization">
                  <q-input
                    dense
                    v-model="primaryDetails.organizationName"
                    label="Organization Name"
                    borderless
                    class="required input-style input-field"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please fill the organization name '
                    ]"
                    :disable="isOfflineClientEdit"
                  />
                </div>
              </q-card>
              <q-card class="q-pa-md q-mb-md">
                <span class="form-heading q-ml-xs">Insured Details</span>
                <q-select
                  dense
                  v-model="honorific1.value"
                  borderless
                  class="required input-style input-field"
                  :options="titles"
                  option-value="value"
                  option-label="value"
                  map-options
                  options-dense
                  behavior="menu"
                  @input="setTitleName(1)"
                  emit-value
                  label="Title"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please select the Title'
                  ]"
                  :disable="isOfflineClientEdit"
                />
                <q-input
                  dense
                  borderless
                  class="required input-style input-field"
                  v-model="insuredDetails.fname"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill the First name'
                  ]"
                  label="First Name"
                  :disable="isOfflineClientEdit"
                />
                <q-input
                  dense
                  v-model="insuredDetails.lname"
                  borderless
                  class="required input-style input-field"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill the Last name'
                  ]"
                  label="Last Name"
                  :disable="isOfflineClientEdit"
                />

                <div class="row justify-between">
                  <q-select
                    dense
                    v-model="insuredDetails.type"
                    borderless
                    class="required input-style col-5 input-field"
                    :options="contactTypes"
                    option-value="machineValue"
                    option-label="name"
                    map-options
                    emit-value
                    behavior="menu"
                    options-dense
                    label="Type"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select phone type'
                    ]"
                    :disable="isOfflineClientEdit"
                  />
                  <q-input
                    dense
                    v-model.number="insuredDetails.phone"
                    label="Phone"
                    borderless
                    class="required input-style col-6 input-field"
                    mask="(###) ###-####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length == 14) ||
                        'Please enter the phone number'
                    ]"
                    :disable="isOfflineClientEdit"
                  />
                </div>
                <q-input
                  dense
                  v-model="insuredDetails.email"
                  borderless
                  class="required input-style input-field"
                  label="Email"
                  lazy-rules
                  :rules="[
                    val =>
                      validateEmail(val) ||
                      'You have entered an invalid email address!'
                  ]"
                  :disable="isOfflineClientEdit"
                />
                <div class="row">
                  <p class="q-mx-none q-my-auto q-ml-xs">
                    Add additional phone number(s)
                  </p>
                  <q-toggle
                    class="q-ml-auto"
                    v-model="addAditionalPhoneNumberToggle"
                    @input="onaddAditionalPhoneNumberToggle"
                    :disable="isOfflineClientEdit"
                  />
                </div>
                <div v-if="addAditionalPhoneNumberToggle">
                  <div
                    class="row justify-between"
                    v-for="(addPhone, index) in phoneNumber"
                    v-if="index >= 0"
                  >
                    <q-select
                      v-model="phoneNumber[index].type"
                      borderless
                      dense
                      class="required input-style col-5"
                      label="Type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      map-options
                      options-dense
                      behavior="menu"
                      emit-value
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                      :disable="isOfflineClientEdit"
                    />

                    <q-input
                      v-model.number="phoneNumber[index].number"
                      label="Phone"
                      mask="(###) ###-####"
                      borderless
                      class="required col-6 input-style"
                      lazy-rules
                      style="height: 55px"
                      :rules="[
                        val =>
                          (val && val.length == 14) ||
                          'Please enter the phone number'
                      ]"
                      :disable="isOfflineClientEdit"
                    />
                  </div>
                  <div class="row justify-between q-ml-xs q-my-sm">
                    <q-btn
                      :disabled="isAddMorePhoneDisabled"
                      outline
                      class="q-mt-sm"
                      @click="addAnotherContact"
                      color="primary"
                      label="Add"
                      :disable="isOfflineClientEdit"
                    />
                    <q-btn
                      v-if="phoneNumber.length > 1"
                      outline
                      @click="RemoveAnotherContact"
                      class="q-mt-sm"
                      color="primary"
                      label="Remove"
                      :disable="isOfflineClientEdit"
                    />
                  </div>
                </div>
                <div class="row">
                  <p class="q-mx-none q-ml-xs q-my-auto">
                    Is there a Co-insured?
                  </p>
                  <q-toggle
                    class="q-ml-auto"
                    v-model="isThereaCoInsuredToggle"
                    :disable="isOfflineClientEdit"
                  />
                </div>

                <div v-if="isThereaCoInsuredToggle" style="font-size: 20px">
                  <span class="form-heading q-ml-xs">Co-insured Details</span>
                  <q-select
                    dense
                    v-model="honorific2.value"
                    borderless
                    class="required input-style input-field"
                    :options="titles"
                    option-value="value"
                    option-label="value"
                    map-options
                    @input="setTitleName(2)"
                    emit-value
                    options-dense
                    behavior="menu"
                    label="Title"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select the Title'
                    ]"
                    :disable="isOfflineClientEdit"
                  />
                  <q-input
                    dense
                    v-model="coInsuredDetails.fname"
                    label="First Name"
                    borderless
                    class="input-style input-field"
                    :disable="isOfflineClientEdit"
                  />
                  <q-input
                    dense
                    v-model="coInsuredDetails.lname"
                    borderless
                    class="input-style input-field"
                    label="Last Name"
                    :disable="isOfflineClientEdit"
                  />
                  <div class="row justify-between">
                    <q-select
                      dense
                      v-model="coInsuredDetails.type"
                      borderless
                      class="required col-5 input-style input-field"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      map-options
                      emit-value
                      behavior="menu"
                      options-dense
                      label="Type"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                      :disable="isOfflineClientEdit"
                    />
                    <q-input
                      dense
                      v-model.number="coInsuredDetails.phone"
                      label="Phone"
                      borderless
                      class="input-style col-6 input-field"
                      mask="(###) ###-####"
                      lazy-rules
                      :rules="[
                        val =>
                          nonRequiredPhoneNumber(val) ||
                          'Please enter the phone number'
                      ]"
                      :disable="isOfflineClientEdit"
                    />
                  </div>
                  <q-input
                    dense
                    v-model="coInsuredDetails.email"
                    input
                    type="email"
                    borderless
                    class="input-style input-field"
                    lazy-rules
                    :rules="[
                      val =>
                        validateNonRequiredEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                    label="Email"
                    :disable="isOfflineClientEdit"
                  />
                </div>
              </q-card>
              <q-card class="q-pa-md">
                <span class="form-heading q-ml-xs">Loss Address Details</span>
                <q-input
                  dense
                  borderless
                  class="required input-style input-field"
                  v-model="lossAddressName"
                  label="Enter  Loss Address Name "
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'This is a required field'
                  ]"
                  :disable="isOfflineClientEdit"
                />
                <q-select
                  dense
                  behavior="menu"
                  borderless
                  class="required input-style input-field"
                  v-model="property.value"
                  option-value="name"
                  option-label="name"
                  map-options
                  options-dense
                  emit-value
                  :options="propertyTypes"
                  @input="setTypes(propertyTypes, property)"
                  label="Property Type"
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please select the property type'
                  ]"
                  :disable="isOfflineClientEdit"
                />
                <q-input
                  dense
                  v-model="propertyDescription"
                  borderless
                  class="input-style input-field"
                  label="Description of Property"
                  :disable="isOfflineClientEdit"
                />
                <AutoCompleteAddress
                  :id="'ClientInfo'"
                  :address="clientAddressDetails"
                  :isDropBoxEnable="true"
                  :isChecksEnable="true"
                  :isAsteriskMark="true"
                  :value="true"
                  :view="'mobile'"
                />

                <div class="row">
                  <p class="q-mx-none q-my-auto">Tenant Occupied</p>
                  <q-toggle
                    class="q-ml-auto"
                    v-model="tenantOccupiedToggle"
                    @input="onTenantToggleOff"
                    :disable="isOfflineClientEdit"
                  />
                </div>

                <div v-if="tenantOccupiedToggle">
                  <q-input
                    dense
                    v-model="tenantOccupied.name"
                    label="Tenant Name"
                    borderless
                    class="required input-style input-field"
                    :disable="isOfflineClientEdit"
                  />

                  <div class="row justify-between">
                    <q-select
                      dense
                      v-model="tenantOccupied.type"
                      label="Type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      borderless
                      class="required input-style col-5 input-field"
                      map-options
                      options-dense
                      emit-value
                      behavior="menu"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                      :disable="isOfflineClientEdit"
                    />
                    <q-input
                      dense
                      borderless
                      class="required input-style col-6 input-field"
                      v-model.number="tenantOccupied.phone"
                      label="Phone"
                      mask="(###) ###-####"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length == 14) ||
                          'Please enter the phone number'
                      ]"
                      :disable="isOfflineClientEdit"
                    />
                  </div>
                </div>
              </q-card>
            </div>

            <div class="row justify-center q-pt-md">
              <q-btn
                class="single-next-button-style"
                label="Next"
                type="submit"
              />
            </div>
          </q-form>
          <!-- Mailing Address -->
          <q-form
            @submit="onNextButtonClick(1)"
            @reset="onBackButtonClick(1)"
            :hidden="step != 1"
            ref="mailingInfo"
          >
            <q-card class="q-pa-md form-card">
              <div class="row justify-between">
                <div class="col-8 form-heading">
                  Is the Mailing Address same as the Loss Address ?
                </div>
                <div>
                  <q-toggle
                    class="q-ml-auto"
                    v-model="isMailingAddressSameToggle"
                    @input="mailingAddressSame"
                    :disable="isOfflineClientEdit"
                  />
                </div>
              </div>
              <AutoCompleteAddress
                :id="'ClientMailing'"
                :address="mailingAddressDetails"
                :isDropBoxEnable="false"
                :isChecksEnable="true"
                :isAsteriskMark="true"
                :value="true"
                :view="'mobile'"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Insurance Info -->
          <q-form
            @submit="onNextButtonClick(2)"
            @reset="onBackButtonClick(2)"
            :hidden="step != 2"
            ref="insuranceInfo"
          >
            <div class="q-pa-sm form-card">
              <InsuranceInfo
                :insuranceDetails="insuranceDetails"
                :showAppraisal="false"
              />
            </div>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Loss Info -->
          <q-form
            @submit="onNextButtonClick(3)"
            @reset="onBackButtonClick(3)"
            :hidden="step != 3"
            ref="lossInfo"
          >
            <div class="form-card">
              <LossInfo
                :lossInfo="lossInfo"
                @lossAddressSame="lossAddressSame"
                :lossAddressToggleShow="true"
                :isMailingAddressEnable="true"
                :lossAddressSameAsClient="true"
                :isAddressRequired="true"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
            </div>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Property -->
          <q-form
            @submit="onNextButtonClick(4)"
            @reset="onBackButtonClick(4)"
            :hidden="step != 4"
            ref="property"
          >
            <q-card class="q-pa-md form-card" style="min-height: 400px">
              <div class="row">
                <div class="col-9 q-mt-md form-heading">
                  Is there damage to personal property?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.isThereDamageToPersonalPropertyToggle"
                  @input="onPersonalPropertyToggleButtonOff"
                  :disable="isOfflineClientEdit"
                />
              </div>
              <div
                class="row"
                v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Is the PA filling out the PPIF at this inspection?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.isPAFillingOutToggle"
                  @input="onPersonalPropertyToggleButtonOff"
                  :disable="isOfflineClientEdit"
                />
              </div>
              <!-- Persnol Property Damage List -->
              <div
                v-if="
                  lossInfo.isThereDamageToPersonalPropertyToggle &&
                  lossInfo.isPAFillingOutToggle
                "
              >
                <br />
                <div
                  v-if="lossInfo.ppDamagedItems.length >= 1"
                  flat
                  bordered
                  scroll
                  class="q-mt-xs"
                >
                  <div class="items-start q-gutter-md">
                    <div
                      v-for="(item, index) in lossInfo.ppDamagedItems"
                      v-if="lossInfo.ppDamagedItems.length"
                    >
                      <q-card class="q-pa-sm">
                        <div class="text-right">
                          <q-icon
                            class="q-ma-xs"
                            dense
                            color="primary"
                            name="create"
                            @click="OnEditPPdamageItem(index)"
                          />
                          <q-icon
                            v-if="lossInfo.ppDamagedItems.length >= 1"
                            class="q-ma-xs"
                            size="xs"
                            dense
                            color="primary"
                            name="close"
                            @click="deletePPDamagedItem(index)"
                          />
                        </div>
                        <div class="row justify-between">
                          <div>
                            <q-badge class="q-pa-sm" color="grey-6">
                              {{ item.radio }}</q-badge
                            >
                          </div>
                          <div class="text-bold text-capitalize q-pt-xs">
                            {{ item.name }}
                          </div>
                          <div class="q-pt-xs q-mr-sm text-bold">
                            {{ item.quantity }}
                          </div>
                        </div>
                        <div
                          class="text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-pr-xs"
                        >
                          <p>{{ item.desc }}</p>

                          <p>{{ item.itemDesc }}</p>
                        </div>
                        <div class="q-my-sm">
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Serial Number</div>
                            <div class="q-mr-sm">
                              {{ item.serialNumber ? item.serialNumber : '-' }}
                            </div>
                          </div>
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Purchase Date</div>
                            <div class="q-mr-sm">
                              {{ dateToShow(item.purchaseDate) }}
                            </div>
                          </div>
                        </div>
                        <q-separator />
                        <div class="q-my-sm row justify-between">
                          <div class="heading-light col-7">Purchase Price</div>

                          <div class="q-mr-sm">
                            <span class="heading-light">$ </span
                            >{{ item.purchasePrice }}
                          </div>
                        </div>
                        <div class="q-my-sm row justify-between">
                          <div class="heading-light col-7">
                            {{ item.radio }} Cost
                          </div>

                          <div class="q-mr-sm">
                            <span class="heading-light">$ </span>
                            {{
                              item.radio == 'Replace'
                                ? item.replaceCost
                                : item.repairCost
                            }}
                          </div>
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
                    :disabled="isOfflineClientEdit"
                    @click="addNewItem('property')"
                  >
                  </q-btn>
                </div>
              </div>
              <div
                class="row"
                v-if="
                  !lossInfo.isPAFillingOutToggle &&
                  lossInfo.isThereDamageToPersonalPropertyToggle
                "
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Is the adjuster going to fill out the PPIF at a later date?
                </div>
                <q-toggle
                  v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
                  class="q-ml-auto"
                  v-model="lossInfo.isAdjustorFillOutLaterDate"
                />
              </div>
              <div
                class="row"
                v-if="
                  !lossInfo.isAdjustorFillOutLaterDate &&
                  lossInfo.isThereDamageToPersonalPropertyToggle &&
                  !lossInfo.isAdjustorFillOutLaterDate &&
                  !lossInfo.isPAFillingOutToggle
                "
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Is the client going to prepare the PPIFs?
                </div>
                <q-toggle
                  v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
                  class="q-ml-auto"
                  v-model="lossInfo.isClientGoingToPreparePPIF"
                />
              </div>
              <div
                class="row"
                v-if="
                  lossInfo.isClientGoingToPreparePPIF &&
                  lossInfo.isPAFillingOutToggle == false &&
                  lossInfo.isAdjustorFillOutLaterDate == false
                "
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Do you want to send the insured a PPIF?
                </div>
                <q-toggle
                  v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
                  class="q-ml-auto"
                  v-model="lossInfo.doYouWantToSendInsuredPPIF"
                />
              </div>
              <div class="row" v-if="lossInfo.isPAFillingOutToggle == false">
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Was a PPIF provided to the insured?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.wasAppifProvidedToTheInsuredToggle"
                />
              </div>
              <div
                class="row"
                v-if="
                  lossInfo.isPAFillingOutToggle == false &&
                  lossInfo.wasAppifProvidedToTheInsuredToggle == false
                "
              >
                <div class="col-9 q-mx-none q-my-auto form-heading">
                  Does Claim Guru need to provide the insured with a PPIF?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="
                    lossInfo.doesTheOfficeNeedToProvidePpifToTheInsuredToggle
                  "
                />
              </div>
              <PropertyInfo
                :lossInfo="lossInfo"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Damage Structure -->
          <q-form
            @submit="onNextButtonClick(5)"
            @reset="onBackButtonClick(5)"
            :hidden="step != 5"
            ref="property"
          >
            <q-card class="q-pa-md form-card">
              <div class="row">
                <p class="q-mx-none q-my-auto form-heading">
                  Is there damage to other structures?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.isDamageOSToggle"
                  @input="onDamageOsToggleButtonOff"
                  :disable="isOfflineClientEdit"
                />
              </div>

              <div v-if="lossInfo.isDamageOSToggle">
                <br />
                <div
                  v-if="lossInfo.osDamagedItems.length >= 1"
                  flat
                  bordered
                  scroll
                  style="margin-top: 20px"
                >
                  <div class="items-start q-gutter-md">
                    <div
                      v-for="(item, index) in lossInfo.osDamagedItems"
                      v-if="lossInfo.osDamagedItems.length"
                    >
                      <q-card class="q-pa-sm">
                        <div class="text-right">
                          <q-icon
                            class="q-ma-xs"
                            dense
                            color="primary"
                            name="create"
                            @click="OnEditPPdamageItem(index)"
                          />
                          <q-icon
                            v-if="lossInfo.osDamagedItems.length >= 1"
                            class="q-ma-xs"
                            size="xs"
                            dense
                            color="primary"
                            name="close"
                            @click="deleteOsDamagedItems(index)"
                          />
                        </div>
                        <div class="row justify-between">
                          <div>
                            <q-badge class="q-pa-sm" color="grey-6">
                              {{ item.radio }}</q-badge
                            >
                          </div>
                          <div class="text-bold text-capitalize q-pt-xs">
                            {{ item.name }}
                          </div>
                          <div class="q-pt-xs q-mr-sm text-bold">
                            {{ item.quantity }}
                          </div>
                        </div>
                        <div
                          class="text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-px-xs"
                        >
                          <p>{{ item.desc }}</p>

                          <p>{{ item.itemDesc }}</p>
                        </div>
                        <div class="q-my-sm">
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Serial Number</div>
                            <div class="q-mr-sm">
                              {{ item.serialNumber ? item.serialNumber : '-' }}
                            </div>
                          </div>
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Purchase Date</div>
                            <div class="q-mr-sm">
                              {{ dateToShow(item.purchaseDate) }}
                            </div>
                          </div>
                        </div>
                        <q-separator />
                        <div class="q-my-sm row justify-between">
                          <div class="heading-light col-7">Purchase Price</div>

                          <div class="q-mr-sm">
                            <span class="heading-light">$ </span
                            >{{ item.purchasePrice }}
                          </div>
                        </div>

                        <div class="q-my-sm row justify-between">
                          <div class="heading-light col-7">
                            {{ item.radio }} Cost
                          </div>

                          <div class="q-mr-sm">
                            <span class="heading-light">$ </span>
                            {{
                              item.radio == 'Replace'
                                ? item.replaceCost
                                : item.repairCost
                            }}
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
                  @click="addNewItem('otherDamage')"
                  :disabled="isOfflineClientEdit"
                >
                </q-btn>
              </div>
              <PropertyInfo
                :lossInfo="lossInfo"
                @loss="lossValue"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Mortgage Info -->
          <q-form
            @submit="onNextButtonClick(6)"
            @reset="onBackButtonClick(6)"
            :hidden="step != 6"
            ref="mortgageInfo"
          >
            <q-card class="q-pa-md form-card">
              <MortgageForm
                :mortgage="mortgageInfo"
                :isThereSecondMortgage="true"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Expert /Vendor Info -->
          <q-form
            @submit="onNextButtonClick(7)"
            @reset="onBackButtonClick(7)"
            :hidden="step != 7"
            ref="vendorInfo"
          >
            <q-card class="q-pa-md form-card">
              <ExpertVendorInfo :expertVendorInfo="expertVendorInfo" />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Estimating Info -->
          <q-form
            @submit="onNextButtonClick(8)"
            @reset="onBackButtonClick(8)"
            :hidden="step != 8"
            ref="estimatingInfo"
          >
            <q-card class="q-pa-md form-card">
              <EstimatingInfo
                :estimatingInfo="estimatingInfo"
                :estimatorAssignToggle="true"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Contract Info Dialog -->
          <q-form
            @submit="onNextButtonClick(9)"
            @reset="onBackButtonClick(9)"
            :hidden="step != 9"
            ref="contractInfo"
          >
            <q-card class="q-pa-md form-card">
              <ContractInfo :contractInfo="contractInfo" />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Company Personnel Dialog-->
          <q-form
            @submit="onNextButtonClick(10)"
            @reset="onBackButtonClick(10)"
            :hidden="step != 10"
            ref="personnelInfo"
          >
            <q-card class="q-pa-md form-card">
              <CompanyPersonnel :companyPersonnel="companyPersonnel" />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <!-- Office Task -->
          <q-form
            @submit="createClientButtonClick()"
            @reset="onBackButtonClick(11)"
            :hidden="step != 11"
            ref="officeTaskInfo"
          >
            <div class="q-pa-md form-card">
              <OfficeTask :officeTask="officeTask" />
            </div>

            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn
                  class="next-button-style"
                  type="submit"
                  label="Create Client"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import AddressService from '@utils/country';
import ContractInfo from 'components/ContractInfo';
import CompanyPersonnel from 'components/CompanyPersonnel';
import OfficeTask from 'components/OfficeTask';
import EstimatingInfo from 'components/EstimatingInfo';
import PropertyInfo from 'components/PropertyInfo';
import LossInfo from 'components/LossInfo';
import ExpertVendorInfo from 'components/ExpertVendorInfo';
import InsuranceInfo from 'components/InsuranceInfo';
import { dateToSend, dateToShow, dateToShowWithTime } from '@utils/date';
import { sendPhoneNumber, showPhoneNumber } from '@utils/clickable';
import localDB, { getCollection } from '@services/dexie';

import {
  validateEmail,
  validateDate,
  validateTime,
  successMessage,
  errorMessage,
  nonRequiredPhoneNumber,
  validateNonRequiredEmail
} from '@utils/validation';
import { constants } from '@utils/constant';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import MortgageForm from 'components/MortgageForm';
import MortgagesList from 'components/MortgagesList';
import { date } from 'quasar';
const addressService = new AddressService();
export default {
  name: 'addClient',
  components: {
    CustomBar,
    VendorsList,
    AddVendor,
    AutoCompleteAddress,
    InsuranceInfo,
    LossInfo,
    ExpertVendorInfo,
    EstimatingInfo,
    ContractInfo,
    CompanyPersonnel,
    PropertyInfo,
    OfficeTask,
    MortgageForm,
    MortgagesList
  },
  data() {
    return {
      officeTasks: [],
      clientResponse: '',
      propertyID: '',
      onlineClientResponse: '',
      selectedClaim: {},
      step: 0,
      finalOfficeTask: [],
      stepClickValidTill: 0,
      tenantOccupiedToggle: false,
      tenantOccupied: {
        name: '',
        phone: '',
        type: ''
      },
      mortgageInfo: [
        {
          isSecondMortgageHome: false,
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: true,
          note: '',
          address: {},
          email: '',
          phone: ''
        }
      ],

      industryTypeValue: '',
      property: {
        value: '',
        id: '',
        machineValue: ''
      },
      propertyDescription: '',
      lossAddressName: '',
      isAddMorePhoneDisabled: false,
      contractInfo: {
        vendorsListDialog: false,
        vendorDialogFilterByIndustry: '',
        showVendorDialogFilters: false,
        addVendorDialog: false,

        vendorDialogName: '',

        sourceDetails: {
          id: '',
          type: '',
          details: '',
          mailingAddress: {},
          phone: {},
          email: '',
          companyName: ''
        },
        time: '',
        contractDate: '',
        firstContractDate: '',
        claimFeeRate: '',
        time: '',
        cancelledToggle: false,

        buttonGroup: 'dollar'
      },
      companyPersonnel: {
        options: [],
        notes: '',
        endDate: '',
        startDate: '',
        buttonGroup: 'dollar',
        claimFeeRate: '',
        isFieldDisable: true,
        personnel: {
          id: '',
          value: '',
          machineValue: ''
        },
        role: {
          machineValue: ''
        },

        personParty: {
          id: '',
          name: ''
        },
        notes: '',
        filterRole: []
      },
      industryType: {
        value: '',
        machineValue: ''
      },
      isCreateClientButtonDisabled: true,
      stepArr: [
        { name: 'Client Info', ref: 'clientInfo' },
        { name: 'Mailing Address', ref: 'mailingInfo' },
        { name: 'Insurance Info', ref: 'insuranceInfo' },
        { name: 'Loss Info', ref: 'lossInfo' },
        { name: 'Personal Property', ref: 'property' },
        { name: 'Damage Structure', ref: 'structure' },
        { name: 'Mortgage Info', ref: 'mortgageInfo' },
        { name: 'Expert/Vendor Info', ref: 'vendorInfo' },
        { name: 'Estimating Info', ref: 'estimatingInfo' },
        { name: 'Contract Info', ref: 'contractInfo' },
        { name: 'Company Personnel', ref: 'personnelInfo' },
        { name: 'Office Task', ref: 'officeTaskInfo' }
      ],
      vendorIndustriesOptions: [],
      lossAddressNameOptions: ['Others'],
      constants: constants,
      maximizedToggle: true,
      clientInfoDailog: false,
      primaryDetails: {
        isOrganization: false,
        organizationName: ''
      },
      honorific1: {
        id: '',
        value: 'Mr.',
        machineValue: 'mr_'
      },
      honorific2: {
        id: '',
        value: 'Mr.',
        machineValue: 'mr_'
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
        type: 'main',
        email: ''
      },
      coInsuredDetails: {
        fname: '',
        lname: '',
        phone: '',
        type: 'main',
        machineValue: '',
        email: ''
      },
      phoneNumber: [
        {
          type: 'main',
          number: ''
        }
      ],
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
        address1: '',
        address2: '',
        //This is Present in Payload but we are not taking any value like post offc number in form
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
      },
      lossInfo: {
        currentIndex: '',
        isEdit: 'noneditable',
        damageType: '',
        purchaseDate: '',
        purchasePrice: '',
        quantity: '',
        repairCost: null,
        replaceCost: null,
        PPDamageItemDescription: '',
        isPAFillingOutToggle: true,
        doYouWantToSendInsuredPPIF: false,
        isClientGoingToPreparePPIF: false,
        isAdjustorFillOutLaterDate: false,

        lossAddressNameDropdown: 'Others',

        wasAppifProvidedToTheInsuredToggle: false,
        doesTheOfficeNeedToProvidePpifToTheInsuredToggle: false,
        PPdamagedItemsDailog: false,
        ppDamagedItems: [],
        damagedItemsDailog: false,
        osDamagedItems: [],
        isDamageOSToggle: false,
        isThereDamageToPersonalPropertyToggle: false,
        femaClaimToggle: false,
        isStateOfEmergencyToggle: false,
        isTheHomeHabitable: false,
        lossAddressDetails: {
          houseNumber: '',
          addressCountry: '',
          addressRegion: '',
          addressLocality: '',
          postalCode: '',
          address1: '',
          address2: '',
          postOfficeBoxNumber: '4',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        isLossAddressSameAsClientToggle: false,
        repairReplaceRadio: 'Replace',
        serialNumber: '',
        PPDamageName: '',
        PPDamageDescription: '',
        PPDamagedItemCost: '',
        lossAddressName: '',
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
          machineValue: '',
          desc: ''
        },
        describeTheLoss: '',
        insuranceAdjustorPhone: '',
        insuranceAdjustorPhoneType: '',
        typeOfLoss: ''
      },

      insuranceDetails: {
        hasClaimBeenFilledToggle: false,
        isThisIsForcedPlacedPolicyToggle: false,
        policy: {
          id: '',
          value: '',
          machineValue: ''
        },
        type: '',
        details: '',
        id: '',
        policyCategory: {
          id: '',
          value: '',
          machineValue: ''
        },
        carrierName: '',
        carrierId: '',
        address: {},
        email: '',
        phone: '',
        hasAppraisalClause: false,
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
        priorPayment: ''
      },

      estimatingInfo: {
        doesAnEstimatorNeedToBeAssignedToggle: false,
        estimatorID: '',
        scopeTimeNeededInHours: '',
        scopeTimeNeededInMinutes: '',
        notesToEstimator: '',
        email: '',
        mailingAddress: {},
        name: '',
        phone: {}
      },
      insuranceInfoDialog: false,

      DidYouHavePoliceDeclarationToggle: false,

      typeOfLoss: [],
      expertVendorInfo: {
        isAlreadyHiredVendor: [{ industry: '', vendor: {} }],
        isHiredByClaimguru: [{ industry: '', vendor: {} }],
        anyOtherExpertHiredToggle: false,
        vendorExpertHiredToggle: false,
        notes: '',
        internalNotes: ''
      },
      officeTask: {
        officeActionRequired: false
      },
      mailingAddressDetails: {
        addressCountry: '',
        addressRegion: '',
        addressLocality: '',
        postalCode: '',
        address1: '',
        address2: '',
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
      },
      addAditionalPhoneNumberToggle: false,

      mailingAddressDialog: false,
      isMailingAddressSameToggle: false,
      isThereaCoInsuredToggle: false,
      states: [],
      countries: []
    };
  },

  async created() {
    if (!this.isOnline && this.editSelectedClient.id) {
      this.selectedClaim = await this.getSingleClaimDetails(
        this.editSelectedClient.id
      );
      this.propertyID = this.editSelectedClient.propertyID;

      this.officeTasks = await this.getClaimTasks(this.selectedClaim.id);

      if (this.editSelectedClient.id) {
        if (this.editSelectedClient.type) {
          this.client = this.editSelectedClient.type;
        }
        if (this.editSelectedClient.insuredInfo.primary.honorific) {
          this.honorific1 =
            this.editSelectedClient.insuredInfo.primary.honorific;
        }
        this.insuredDetails.fname = this.editSelectedClient.insuredInfo.primary
          .fname
          ? this.editSelectedClient.insuredInfo.primary.fname
          : '';
        this.insuredDetails.lname = this.editSelectedClient.insuredInfo.primary
          .lname
          ? this.editSelectedClient.insuredInfo.primary.lname
          : '';

        if (this.editSelectedClient.isOrganizationPolicyholder) {
          this.policyHolder.isPolicyHolder = this.editSelectedClient
            .isOrganizationPolicyholder
            ? this.editSelectedClient.isOrganizationPolicyholder
            : false;
        }
        if (this.editSelectedClient.isOrganization) {
          this.primaryDetails.isOrganization = true;
          this.primaryDetails.isOrganization = this.editSelectedClient
            .isOrganization
            ? this.editSelectedClient.isOrganization
            : '';
          this.primaryDetails.organizationName = this.editSelectedClient
            .organizationName
            ? this.editSelectedClient.organizationName
            : '';
        }
        if (this.editSelectedClient.insuredInfo.primary.phoneNumber) {
          this.insuredDetails.type = this.editSelectedClient.insuredInfo.primary
            .phoneNumber[0].type
            ? this.editSelectedClient.insuredInfo.primary.phoneNumber[0].type
            : '';
          this.insuredDetails.phone = this.editSelectedClient.insuredInfo
            .primary.phoneNumber[0].number
            ? this.editSelectedClient.insuredInfo.primary.phoneNumber[0].number
            : '';
        }
        if (this.editSelectedClient.insuredInfo.primary.email) {
          this.insuredDetails.email =
            this.editSelectedClient.insuredInfo.primary.email;
        }
        if (this.editSelectedClient.property) {
          this.property = this.editSelectedClient.property.propertyType
            ? this.editSelectedClient.property.propertyType
            : '';

          this.lossAddressName = this.editSelectedClient.property.name
            ? this.editSelectedClient.property.name
            : '';
          this.propertyDescription = this.editSelectedClient.property
            .propertyDesc
            ? this.editSelectedClient.property.propertyDesc
            : '';
        }
        if (this.editSelectedClient.insuredInfo.secondary) {
          this.isThereaCoInsuredToggle = true;

          if (this.editSelectedClient.insuredInfo.secondary.honorific) {
            this.honorific2 = {
              id: this.editSelectedClient.insuredInfo.secondary.honorific.id,
              value:
                this.editSelectedClient.insuredInfo.secondary.honorific.value,
              machineValue:
                this.editSelectedClient.insuredInfo.secondary.honorific
                  .machineValue
            };
          }

          this.coInsuredDetails.fname = this.editSelectedClient.insuredInfo
            .secondary.fname
            ? this.editSelectedClient.insuredInfo.secondary.fname
            : '';
          this.coInsuredDetails.lname = this.editSelectedClient.insuredInfo
            .secondary.lname
            ? this.editSelectedClient.insuredInfo.secondary.lname
            : '';
          if (this.editSelectedClient.insuredInfo.secondary.phoneNumber) {
            this.coInsuredDetails.type = this.editSelectedClient.insuredInfo
              .secondary.phoneNumber[0].type
              ? this.editSelectedClient.insuredInfo.secondary.phoneNumber[0]
                  .type
              : '';

            this.coInsuredDetails.phone = this.editSelectedClient.insuredInfo
              .secondary.phoneNumber[0].number
              ? showPhoneNumber(
                  this.editSelectedClient.insuredInfo.secondary.phoneNumber[0]
                    .number
                )
              : '';
          }

          this.coInsuredDetails.email = this.editSelectedClient.insuredInfo
            .secondary.email
            ? this.editSelectedClient.insuredInfo.secondary.email
            : '';
        }
        if (
          this.editSelectedClient.insuredInfo.phoneNumbers &&
          this.editSelectedClient.insuredInfo.phoneNumbers[0].number
        ) {
          this.addAditionalPhoneNumberToggle = true;
          this.phoneNumber = [];
          this.editSelectedClient.insuredInfo.phoneNumbers.forEach(val => {
            this.phoneNumber.push({
              type: val.type,
              number: showPhoneNumber(val.number)
            });
          });
        } else {
          this.addAditionalPhoneNumberToggle = false;
        }
        if (this.editSelectedClient.insuredInfo.tenantInfo) {
          this.tenantOccupiedToggle = true;
          this.tenantOccupied.name = this.editSelectedClient.insuredInfo
            .tenantInfo.name
            ? this.editSelectedClient.insuredInfo.tenantInfo.name
            : '';
          this.tenantOccupied.type = this.editSelectedClient.insuredInfo
            .tenantInfo.phoneNumber.type
            ? this.editSelectedClient.insuredInfo.tenantInfo.phoneNumber.type
            : '';
          this.tenantOccupied.phone = this.editSelectedClient.insuredInfo
            .tenantInfo.phoneNumber.number
            ? showPhoneNumber(
                this.editSelectedClient.insuredInfo.tenantInfo.phoneNumber
                  .number
              )
            : '';
        }
        // Client Address Editable & prefilled Details
        if (this.editSelectedClient.insuredInfo.mailingAddress) {
          this.clientAddressDetails.addressCountry = this.editSelectedClient
            .insuredInfo.mailingAddress.addressCountry
            ? this.editSelectedClient.insuredInfo.mailingAddress.addressCountry
            : null;
          this.clientAddressDetails.addressLocality =
            this.editSelectedClient.insuredInfo.mailingAddress.addressLocality;
          this.clientAddressDetails.addressRegion = this.editSelectedClient
            .insuredInfo.mailingAddress.addressRegion
            ? this.editSelectedClient.insuredInfo.mailingAddress.addressRegion
            : null;
          this.clientAddressDetails.houseNumber = this.editSelectedClient
            .insuredInfo.mailingAddress.houseNumber
            ? this.editSelectedClient.insuredInfo.mailingAddress.houseNumber
            : '';
          this.clientAddressDetails.postalCode = this.editSelectedClient
            .insuredInfo.mailingAddress.postalCode
            ? this.editSelectedClient.insuredInfo.mailingAddress.postalCode
            : '';
          this.clientAddressDetails.address1 = this.editSelectedClient
            .insuredInfo.mailingAddress.address1
            ? this.editSelectedClient.insuredInfo.mailingAddress.address1
            : '';
          this.clientAddressDetails.address2 = this.editSelectedClient
            .insuredInfo.mailingAddress.address2
            ? this.editSelectedClient.insuredInfo.mailingAddress.address2
            : '';

          if (
            this.editSelectedClient.insuredInfo.mailingAddress.dropBox &&
            this.editSelectedClient.insuredInfo.mailingAddress.dropBox.isPresent
          ) {
            this.clientAddressDetails.dropBox.isPresent =
              this.editSelectedClient.insuredInfo.mailingAddress.dropBox.isPresent;
            this.clientAddressDetails.dropBox.info =
              this.editSelectedClient.insuredInfo.mailingAddress.dropBox.info;
          }

          this.mailingAddressDetails =
            this.editSelectedClient.insuredInfo.mailingAddress;
        }
      }

      //Claim Data Pre-filling
      this.insuranceDetails.policyNumber = this.selectedClaim.policyInfo.number;
      // insurance Info stepper  pre-filling

      if (
        this.selectedClaim.policyInfo &&
        this.selectedClaim.policyInfo.carrier
      ) {
        this.insuranceDetails.carrierName =
          this.selectedClaim.policyInfo.carrier.value;
        this.insuranceDetails.carrierId =
          this.selectedClaim.policyInfo.carrier.id;
        this.insuranceDetails.address =
          this.selectedClaim.policyInfo.carrier.address;
        this.insuranceDetails.email = this.selectedClaim.policyInfo.carrier
          .email
          ? this.selectedClaim.policyInfo.carrier.email
          : '';
        this.insuranceDetails.phone = this.selectedClaim.policyInfo.carrier
          .phone
          ? this.selectedClaim.policyInfo.carrier.phone
          : '';
      }
      if (this.selectedClaim.policyInfo) {
        this.insuranceDetails.hasClaimBeenFilledToggle = this.selectedClaim
          .policyInfo.isClaimFiled
          ? this.selectedClaim.policyInfo.isClaimFiled
          : false;

        if (this.selectedClaim.policyInfo.isClaimFiled) {
          this.insuranceDetails.insuranceClaimNumber =
            this.selectedClaim.policyInfo.claimNumber;
        }

        this.insuranceDetails.isThisIsForcedPlacedPolicyToggle = this
          .selectedClaim.policyInfo.isForcedPlaced
          ? this.selectedClaim.policyInfo.isForcedPlaced
          : false;

        this.insuranceDetails.policyEffectiveDate = dateToShow(
          this.selectedClaim.policyInfo.effectiveDate
        );
        this.insuranceDetails.policyExpireDate = dateToShow(
          this.selectedClaim.policyInfo.expirationDate
        );
        if (this.selectedClaim.policyInfo.category) {
          this.insuranceDetails.policyCategory.id = this.selectedClaim
            .policyInfo.category.id
            ? this.selectedClaim.policyInfo.category.id
            : '';
          this.insuranceDetails.policyCategory.value = this.selectedClaim
            .policyInfo.category.value
            ? this.selectedClaim.policyInfo.category.value
            : '';
          this.insuranceDetails.policyCategory.machineValue = this.selectedClaim
            .policyInfo.category.machineValue
            ? this.selectedClaim.policyInfo.category.machineValue
            : '';
        }

        if (this.selectedClaim.policyInfo.type) {
          this.insuranceDetails.policy.id = this.selectedClaim.policyInfo.type
            .id
            ? this.selectedClaim.policyInfo.type.id
            : '';
          this.insuranceDetails.policy.value = this.selectedClaim.policyInfo
            .type.value
            ? this.selectedClaim.policyInfo.type.value
            : '';
          this.insuranceDetails.policy.machineValue = this.selectedClaim
            .policyInfo.type.machineValue
            ? this.selectedClaim.policyInfo.type.machineValue
            : '';
        }

        if (this.selectedClaim.policyInfo.limitCoverage) {
          this.insuranceDetails.dwellingLimitA = this.selectedClaim.policyInfo
            .limitCoverage.dwelling
            ? this.selectedClaim.policyInfo.limitCoverage.dwelling
            : null;
          this.insuranceDetails.contentsLimit = this.selectedClaim.policyInfo
            .limitCoverage.content
            ? this.selectedClaim.policyInfo.limitCoverage.content
            : null;
          this.insuranceDetails.otherStructureB = this.selectedClaim.policyInfo
            .limitCoverage.otherStructure
            ? this.selectedClaim.policyInfo.limitCoverage.otherStructure
            : null;
          this.insuranceDetails.lossOfUSD = this.selectedClaim.policyInfo
            .limitCoverage.lossOfUse
            ? this.selectedClaim.policyInfo.limitCoverage.lossOfUse
            : null;
        }

        this.insuranceDetails.deprecation = this.selectedClaim.policyInfo
          .depreciation
          ? this.selectedClaim.policyInfo.depreciation
          : null;
        this.insuranceDetails.deductible = this.selectedClaim.policyInfo
          .deductibleAmount
          ? this.selectedClaim.policyInfo.deductibleAmount
          : null;
        this.insuranceDetails.priorPayment = this.selectedClaim.policyInfo
          .priorPayment
          ? this.selectedClaim.policyInfo.priorPayment
          : null;
      }
      // Loss Info Stepper pre-filling
      if (this.selectedClaim.lossInfo) {
        this.lossInfo.reasonClaim = this.selectedClaim.lossInfo.claimReason
          ? this.selectedClaim.lossInfo.claimReason
          : '';
        this.lossInfo.severityOfClaimType = this.selectedClaim.lossInfo
          .serverity
          ? this.selectedClaim.lossInfo.serverity
          : '';
        this.lossInfo.nameOfEmergency = this.selectedClaim.lossInfo
          .emergencyName
          ? this.selectedClaim.lossInfo.emergencyName
          : '';
        this.lossInfo.dateOfLoss = dateToShow(this.selectedClaim.lossInfo.date)
          ? dateToShow(this.selectedClaim.lossInfo.date)
          : '';
        if (this.selectedClaim.lossInfo.cause) {
          this.lossInfo.causeOfLoss = this.selectedClaim.lossInfo.cause
            ? this.selectedClaim.lossInfo.cause
            : null;
        }

        this.lossInfo.femaClaimToggle = this.selectedClaim.lossInfo.isFEMA
          ? this.selectedClaim.lossInfo.isFEMA
          : false;
        this.lossInfo.isStateOfEmergencyToggle = this.selectedClaim.lossInfo
          .isEmergency
          ? this.selectedClaim.lossInfo.isEmergency
          : false;
        this.lossInfo.isTheHomeHabitable = this.selectedClaim.lossInfo
          .isHabitable
          ? this.selectedClaim.lossInfo.isHabitable
          : false;
        this.lossInfo.descriptionDwelling = this.selectedClaim.lossInfo.desc
          ? this.selectedClaim.lossInfo.desc
          : '';
      }

      // Personnel Property data pre-filling
      if (this.selectedClaim.damageInfo.personal) {
        this.lossInfo.isThereDamageToPersonalPropertyToggle = this.selectedClaim
          .damageInfo.personal.isDamaged
          ? this.selectedClaim.damageInfo.personal.isDamaged
          : false;
        this.lossInfo.isPAFillingOutToggle = this.selectedClaim.damageInfo
          .personal.isPPIFFillNow
          ? this.selectedClaim.damageInfo.personal.isPPIFFillNow
          : false;
        this.lossInfo.isAdjustorFillOutLaterDate = this.selectedClaim.damageInfo
          .personal.isPPIFFillLater
          ? this.selectedClaim.damageInfo.personal.isPPIFFillLater
          : false;
        this.lossInfo.isClientGoingToPreparePPIF = this.selectedClaim.damageInfo
          .personal.isClientPreparePPIF
          ? this.selectedClaim.damageInfo.personal.isClientPreparePPIF
          : false;
        this.lossInfo.doYouWantToSendInsuredPPIF = this.selectedClaim.damageInfo
          .personal.isPPIFSendToInsure
          ? this.selectedClaim.damageInfo.personal.isPPIFSendToInsure
          : false;

        if (this.selectedClaim.damageInfo.personal.items) {
          for (
            let index = 0;
            index < this.selectedClaim.damageInfo.personal.items.length;
            index++
          ) {
            this.lossInfo.ppDamagedItems[index] =
              this.selectedClaim.damageInfo.personal.items[index];
          }
        }
      }

      //Other Structure data pre-filling
      if (this.selectedClaim.damageInfo.otherStructure) {
        this.lossInfo.isDamageOSToggle = this.selectedClaim.damageInfo
          .otherStructure.isDamaged
          ? this.selectedClaim.damageInfo.otherStructure.isDamaged
          : false;
        if (this.selectedClaim.damageInfo.otherStructure.items) {
          for (
            let index = 0;
            index < this.selectedClaim.damageInfo.otherStructure.items.length;
            index++
          ) {
            this.lossInfo.osDamagedItems[index] =
              this.selectedClaim.damageInfo.otherStructure.items[index];
          }
        }
      }

      //mortgage info stepper pre-filling
      if (this.selectedClaim.mortgageInfo) {
        for (
          let index = 0;
          index < this.selectedClaim.mortgageInfo.length;
          index++
        ) {
          if (this.mortgageInfo[1]) {
            if (this.selectedClaim.mortgageInfo[0].isSecondMortgageHome) {
              this.mortgageInfo[0].isSecondMortgageHome = true;
            }
          }
          this.$set(
            this.mortgageInfo,
            index,
            this.selectedClaim.mortgageInfo[index]
          );
        }
      }
      // expert vendor info pre-filling

      if (this.selectedClaim.expertInfo) {
        if (this.selectedClaim.expertVendorInformation) {
          if (this.selectedClaim.expertVendorInformation.hiredToggle) {
            this.expertVendorInfo.anyOtherExpertHiredToggle = true;
          }
          if (this.selectedClaim.expertVendorInformation.alreadyHired) {
            this.expertVendorInfo.vendorExpertHiredToggle = true;
          }
          for (
            let index = 0;
            index <
            this.selectedClaim.expertVendorInformation.isHiredVendor.length;
            index++
          ) {
            this.expertVendorInfo.isAlreadyHiredVendor[index] =
              this.selectedClaim.expertVendorInformation.isHiredVendor[index];
          }

          for (
            let index = 0;
            index <
            this.selectedClaim.expertVendorInformation.alreadyHiredVendor
              .length;
            index++
          ) {
            this.expertVendorInfo.isHiredByClaimguru[index] =
              this.selectedClaim.expertVendorInformation.alreadyHiredVendor[
                index
              ];
          }
        }
        this.expertVendorInfo.notes = this.selectedClaim.expertInfo.notes
          ? this.selectedClaim.expertInfo.notes
          : '';
        this.expertVendorInfo.internalNotes = this.selectedClaim.expertInfo
          .internalNotes
          ? this.selectedClaim.expertInfo.internalNotes
          : '';
      }

      //estimating info stepper

      if (this.selectedClaim.estimatingInfo) {
        this.estimatingInfo.email = this.selectedClaim.estimatingInformation
          .email
          ? this.selectedClaim.estimatingInformation.email
          : '';
        this.estimatingInfo.mailingAddress = this.selectedClaim
          .estimatingInformation.mailingAddress
          ? this.selectedClaim.estimatingInformation.mailingAddress
          : null;
        this.estimatingInfo.name = this.selectedClaim.estimatingInformation.name
          ? this.selectedClaim.estimatingInformation.name
          : '';
        this.estimatingInfo.phone = this.selectedClaim.estimatingInformation
          .phone
          ? this.selectedClaim.estimatingInformation.phone
          : '';
        this.estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle = true;

        this.estimatingInfo.estimatorID =
          this.selectedClaim.estimatingInfo.estimatorID;
        this.estimatingInfo.notesToEstimator =
          this.selectedClaim.estimatingInfo.notesToEstimator;
        this.estimatingInfo.scopeTimeNeeded =
          this.selectedClaim.estimatingInfo.scopeTimeNeeded;
      }

      // Contract Info stepper pre-filling
      if (this.selectedClaim.contractInfo) {
        this.contractInfo.sourceDetails.id = this.selectedClaim.contractInfo
          .source.id
          ? this.selectedClaim.contractInfo.source.id
          : '';
        this.contractInfo.sourceDetails.type = this.selectedClaim.contractInfo
          .source.type
          ? this.selectedClaim.contractInfo.source.type
          : '';
        this.contractInfo.sourceDetails.details = this.selectedClaim
          .contractInfo.source.detail
          ? this.selectedClaim.contractInfo.source.detail
          : '';
        this.contractInfo.firstContractDate = dateToShowWithTime(
          this.selectedClaim.contractInfo.dateOfFirstContact
        );

        this.contractInfo.contractDate = dateToShow(
          this.selectedClaim.contractInfo.date
        );
        this.contractInfo.buttonGroup =
          this.selectedClaim.contractInfo.fees.type;

        this.contractInfo.claimFeeRate =
          this.selectedClaim.contractInfo.fees.rate;
      }
      if (this.selectedClaim.status) {
        this.contractInfo.cancelledToggle = this.selectedClaim.status
          .isCancelled
          ? this.selectedClaim.status.isCancelled
          : false;
      }

      //Company Personnal stepper data pre-filling
      if (this.selectedClaim.personnel) {
        this.companyPersonnel.personParty.id =
          this.selectedClaim.personnel[0] &&
          this.selectedClaim.personnel[0].personnelID
            ? this.selectedClaim.personnel[0].personnelID
            : '';
        this.companyPersonnel.personnel.value = this.selectedClaim.personnel[0]
          .role.value
          ? this.selectedClaim.personnel[0].role.value
          : '';
        this.companyPersonnel.personnel.machineValue = this.selectedClaim
          .personnel[0].role.machineValue
          ? this.selectedClaim.personnel[0].role.machineValue
          : '';
        this.companyPersonnel.personParty.name = this.selectedClaim.personnel[0]
          .name
          ? this.selectedClaim.personnel[0].name
          : '';
        this.companyPersonnel.buttonGroup =
          this.selectedClaim.personnel[0].fees.type;
        this.companyPersonnel.claimFeeRate =
          this.selectedClaim.personnel[0].fees.rate;
        this.companyPersonnel.startDate = dateToShow(
          this.selectedClaim.personnel[0].startDate
        );
        this.companyPersonnel.endDate = dateToShow(
          this.selectedClaim.personnel[0].endDate
        );
        this.companyPersonnel.notes = this.selectedClaim.personnel[0].note
          ? this.selectedClaim.personnel[0].note
          : '';
      }

      //Office Task Stepper Prefilling

      if (this.officeTasks && this.officeTasks.tasks) {
        this.officeTask.officeActionRequired = true;
        for (let index = 0; index < this.officeTasks.tasks.length; index++) {
          this.officeTaskActions[index] = this.officeTasks.tasks[index];
        }
      }
    }
    await this.getClientTypes();
    await this.getTitles();
    await this.getContactTypes();
    await this.getPropertyTypes();

    this.companyPersonnel.startDate =
      this.companyPersonnel.endDate =
      this.contractInfo.contractDate =
      this.insuranceDetails.policyEffectiveDate =
      this.lossInfo.dateOfLoss =
        date.formatDate(Date.now(), 'MM/DD/YYYY');
    if (this.isOnline) {
      this.contractInfo.firstContractDate = date.formatDate(
        Date.now(),
        'YYYY-MM-DD HH:mm A'
      );
    }

    this.insuranceDetails.policyExpireDate = date.formatDate(
      date.addToDate(Date.now(), {
        year: 1
      }),
      'MM/DD/YYYY'
    );

    if (this.selectedLead.id) {
      await this.getLeadDetails(this.selectedLead.id);
      if (this.selectedLead.leadSource && this.selectedLead.leadSource.id) {
        await this.getVendorDetails(this.selectedLead.leadSource.id);
      }

      this.honorific1 = {
        id: this.selectedLead.primaryContact.honorific.id,
        value: this.selectedLead.primaryContact.honorific.value,
        machineValue: this.selectedLead.primaryContact.honorific.machineValue
      };
      this.primaryDetails.isOrganization = this.selectedLead.isOrganization;
      if (this.primaryDetails.isOrganization) {
        this.primaryDetails.organizationName =
          this.selectedLead.organizationName;
      }
      this.insuredDetails.fname = this.selectedLead.primaryContact.fname;
      this.insuredDetails.lname = this.selectedLead.primaryContact.lname;
      this.insuredDetails.email = this.selectedLead.primaryContact.email;
      this.insuredDetails.phone =
        this.selectedLead.primaryContact.phoneNumber[0].number;
      this.insuredDetails.type =
        this.selectedLead.primaryContact.phoneNumber[0].type;
      this.clientAddressDetails.houseNumber =
        this.selectedLead.lossLocation.houseNumber;
      this.clientAddressDetails.addressCountry =
        this.selectedLead.lossLocation.addressCountry;
      this.clientAddressDetails.addressLocality =
        this.selectedLead.lossLocation.addressLocality;
      this.clientAddressDetails.addressRegion =
        this.selectedLead.lossLocation.addressRegion;
      this.clientAddressDetails.postalCode =
        this.selectedLead.lossLocation.postalCode;
      this.clientAddressDetails.address1 =
        this.selectedLead.lossLocation.address1;
      this.clientAddressDetails.address2 =
        this.selectedLead.lossLocation.address2;
      this.lossInfo.descriptionDwelling = this.selectedLead.lossDesc;
      if (this.selectedLead.leadSource) {
        this.contractInfo.sourceDetails.id = this.selectedLead.leadSource.id
          ? this.selectedLead.leadSource.id
          : '';
        this.contractInfo.sourceDetails.type = this.selectedLead.leadSource.type
          ? this.selectedLead.leadSource.type
          : 'none';
        this.contractInfo.sourceDetails.details = this.selectedVendor.name
          ? this.selectedVendor.name
          : '';
        this.contractInfo.sourceDetails.mailingAddress =
          this.selectedVendor.mailingAddress;
        this.contractInfo.sourceDetails.email == this.selectedVendor.email;
        this.contractInfo.sourceDetails.phone = this.selectedVendor.phoneNumber;
        this.contractInfo.sourceDetails.companyName =
          this.selectedVendor.companyName;
      }

      this.insuranceDetails.carrierName = this.selectedLead.carrier
        ? this.selectedLead.carrier.value
        : '';
      this.insuranceDetails.carrierId = this.selectedLead.carrier
        ? this.selectedLead.carrier.id
        : '';
      this.insuranceDetails.email = this.selectedLead.carrier
        ? this.selectedLead.carrier.email
        : '';
      this.insuranceDetails.address = this.selectedLead.carrier
        ? this.selectedLead.carrier.address
        : '';
      this.insuranceDetails.phone = this.selectedLead.carrier
        ? this.selectedLead.carrier.phoneNumber[0].number
        : '';
      this.insuranceDetails.policyNumber = this.selectedLead.policyNumber
        ? this.selectedLead.policyNumber
        : '';
      this.lossInfo.causeOfLoss.id = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.id
        : '';

      this.lossInfo.causeOfLoss.value = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.value
        : '';
      this.lossInfo.causeOfLoss.machineValue = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.machineValue
        : '';
      this.lossInfo.causeOfLoss.desc = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.desc
        : '';
      this.lossInfo.dateOfLoss = date.formatDate(
        this.selectedLead.dateofLoss,
        'MM/DD/YYYY'
      );
    }
  },

  computed: {
    ...mapGetters([
      'isOnline',
      'selectedVendor',
      'selectedLead',
      'contactTypes',
      'clientTypes',
      'titles',
      'vendors',
      'leadSources',
      'estimators',
      'propertyTypes',
      'policyTypes',
      'claimSeverity',
      'lossCauses',
      'claimReasons',
      'policyCategories',
      'vendorIndustries',
      'personnelRoles',
      'roleTypes',
      'userRoles',
      'vendorIndustries',
      'propertyTypes',
      'isOnline',
      'editSelectedClient',
      'getSelectedClaim',
      'isOfflineClientEdit',
      'claimTasks',
      'officeTaskActions'
    ])
  },

  methods: {
    ...mapActions([
      'getAllUsers',
      'getClaimRoles',
      'getVendorDetails',
      'addClient',
      'getClaimReasons',
      'getLossCauses',
      'getVendors',
      'getClientTypes',
      'getPolicyTypes',
      'getContactTypes',
      'getTitles',
      'getPolicyCategory',
      'getVendorIndustries',
      'getPropertyTypes',
      'getRoles',
      'getSeverityClaim',
      'addClaim',
      'getLeadDetails',
      'addMultipleTaskToClaim',
      'addIndustry',
      'getSingleClaimDetails',
      'editClientLocal',
      'editClaimLocal',
      'getClaimTasks',
      'editMultipleTaskToClaim'
    ]),
    ...mapMutations([
      'setSelectedLeadOffline',
      'setSelectedLeadOnline',
      'setSelectedClientOffline',
      'setSelectedEditClient',
      'setEditOfflineClientIcon'
    ]),
    successMessage,
    errorMessage,
    dateToShow,
    dateToShowWithTime,
    sendPhoneNumber,
    showPhoneNumber,
    nonRequiredPhoneNumber,
    validateNonRequiredEmail,
    onDamageOsToggleButtonOff() {
      if (!this.lossInfo.isDamageOSToggle) {
        this.lossInfo.osDamagedItems.length = 0;
      }
    },
    lossValue(value, index, damageType) {
      this.lossInfo[damageType][index] = value;
      this.lossInfo[damageType].push({
        name: '',
        desc: '',
        repairCost: '',
        replaceCost: '',
        serialNumber: '',
        radio: '',
        itemDesc: '',
        purchaseDate: '',
        purchasePrice: '',
        quantity: ''
      });
      this.lossInfo[damageType].pop();
    },
    onTenantToggleOff() {
      if (!this.tenantOccupiedToggle) {
        this.tenantOccupied.name = '';
        this.tenantOccupied.type = '';
        this.tenantOccupied.phone = '';
      }
    },
    onPersonalPropertyToggleButtonOff() {
      if (
        !this.lossInfo.isThereDamageToPersonalPropertyToggle ||
        !this.lossInfo.isPAFillingOutToggle
      ) {
        this.lossInfo.ppDamagedItems.length = 0;
      }
    },
    deleteDamagedItem(index) {
      this.$delete(this.lossInfo.osDamagedItems, index);
    },
    deletePPDamagedItem(index) {
      this.$delete(this.lossInfo.ppDamagedItems, index);
    },
    deleteOsDamagedItems(index) {
      this.$delete(this.lossInfo.osDamagedItems, index);
    },
    addNewItem(val) {
      this.lossInfo.isEdit = 'noneditable';
      this.lossInfo.quantity = '';
      this.lossInfo.PPDamageName = '';
      this.lossInfo.PPDamageDescription = '';
      this.lossInfo.serialNumber = '';
      this.lossInfo.purchasePrice = '';
      this.purchaseDate = date.formatDate(Date.now(), 'MM/DD/YYYY');
      this.lossInfo.repairReplaceRadio = '';
      this.lossInfo.repairCost = null;
      this.lossInfo.replaceCost = null;
      this.lossInfo.PPdamagedItemsDailog = true;
      if (val == 'otherDamage') {
        this.lossInfo.damageType = 'otherDamage';
      } else {
        this.lossInfo.damageType = 'property';
      }
    },
    OnEditPPdamageItem(index) {
      if (this.lossInfo.damageType == 'property') {
        this.lossInfo.isEdit = 'editable';

        this.lossInfo.currentIndex = index;
        this.lossInfo.quantity = this.lossInfo.ppDamagedItems[index].quantity;
        this.lossInfo.PPDamageName = this.lossInfo.ppDamagedItems[index].name;
        this.lossInfo.PPDamageDescription =
          this.lossInfo.ppDamagedItems[index].desc;
        this.lossInfo.serialNumber =
          this.lossInfo.ppDamagedItems[index].serialNumber;
        this.lossInfo.purchasePrice =
          this.lossInfo.ppDamagedItems[index].purchasePrice;
        this.purchaseDate = this.lossInfo.ppDamagedItems[index].purchaseDate;
        this.lossInfo.repairReplaceRadio =
          this.lossInfo.ppDamagedItems[index].radio;
        this.lossInfo.PPDamageItemDescription =
          this.lossInfo.ppDamagedItems[index].itemDesc;
        this.lossInfo.repairCost =
          this.lossInfo.ppDamagedItems[index].repairCost;
        this.lossInfo.replaceCost =
          this.lossInfo.ppDamagedItems[index].replaceCost;

        this.lossInfo.PPdamagedItemsDailog = true;
      } else {
        this.lossInfo.isEdit = 'editable';
        this.lossInfo.currentIndex = index;
        this.lossInfo.quantity = this.lossInfo.osDamagedItems[index].quantity;
        this.lossInfo.PPDamageName = this.lossInfo.osDamagedItems[index].name;
        this.lossInfo.PPDamageDescription =
          this.lossInfo.osDamagedItems[index].desc;
        this.lossInfo.serialNumber =
          this.lossInfo.osDamagedItems[index].serialNumber;
        this.lossInfo.purchasePrice =
          this.lossInfo.osDamagedItems[index].purchasePrice;
        this.purchaseDate = this.lossInfo.osDamagedItems[index].purchaseDate;
        this.lossInfo.repairReplaceRadio =
          this.lossInfo.osDamagedItems[index].radio;
        this.lossInfo.PPDamageItemDescription =
          this.lossInfo.osDamagedItems[index].itemDesc;
        this.lossInfo.repairCost =
          this.lossInfo.osDamagedItems[index].repairCost;
        this.lossInfo.replaceCost =
          this.lossInfo.osDamagedItems[index].replaceCost;

        this.lossInfo.PPdamagedItemsDailog = true;
      }
    },

    lossAddressSame() {
      if (this.lossInfo.isLossAddressSameAsClientToggle) {
        this.lossInfo.lossAddressDetails = this.clientAddressDetails;
      } else {
        if (this.selectedLead.id) {
          this.lossInfo.lossAddressDetails = {
            houseNumber: this.selectedLead.lossLocation.houseNumber,
            addressCountry: this.selectedLead.lossLocation.addressCountry,
            addressRegion: this.selectedLead.lossLocation.addressRegion,
            addressLocality: this.selectedLead.lossLocation.addressLocality,
            postalCode: this.selectedLead.lossLocation.postalCode,
            address1: this.selectedLead.lossLocation.address1,
            address2: this.selectedLead.lossLocation.address2,

            postOfficeBoxNumber: '',
            dropBox: {
              info: '',
              isPresent: false
            }
          };
        }
      }
    },

    // For adding multiple Contact Numbers in ClientInfo
    addAnotherContact() {
      let len = this.phoneNumber.length;

      if (this.phoneNumber[len - 1].number.length == 14) {
        this.phoneNumber.push({
          type: 'main',
          number: ''
        });
      } else {
        this.$q.notify({
          message: 'Please fill the above contact first',
          position: 'top',
          type: 'negative'
        });
      }
    },
    RemoveAnotherContact() {
      this.phoneNumber.pop();
    },
    validateEstimatingInfo() {
      if (this.estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle) {
        if (this.estimatingInfo.name) {
          this.step = this.step + 1;
        } else {
          this.$q.notify({
            message: 'Please Choose a estimator',
            position: 'top',
            type: 'negative'
          });
        }
      } else {
        this.step = this.step + 1;
      }
    },

    onaddAditionalPhoneNumberToggle() {
      if (this.addAditionalPhoneNumberToggle == false) {
        this.phoneNumber = [
          {
            type: '',
            number: ''
          }
        ];
      }
    },

    validateDate,
    validateTime,

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    //This function is used for setting the title name,machine value from its Id
    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.value === this['honorific' + val].value;
      });
      this['honorific' + val].machineValue = titleResult.machineValue;
      this['honorific' + val].id = titleResult.id;
    },
    //This function is used for seting the client Type and  Id from client Info

    setTypes(types, data, type) {
      const obj = types.find(item => {
        return item.value === data.name;
      });

      data.id = obj.id;
      data.machineValue = obj.machineValue;
    },

    /* Here If Malling address toggle is on , then the address of the client Info will set to maling Address too*/
    mailingAddressSame() {
      if (this.isMailingAddressSameToggle) {
        this.mailingAddressDetails = this.clientAddressDetails;
      } else {
        this.mailingAddressDetails = {
          addressCountry: '',
          addressRegion: '',
          addressLocality: '',
          postalCode: '',
          address1: '',
          address2: '',
          postOfficeBoxNumber: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        };
      }
    },

    //Creating Client (here currently  we are sending Source Detail blank ,later it will change as per client requirement)
    async createClientButtonClick() {
      /*********For changing each number in array to Formated number **************************/
      let phoneNumberArray = [];
      this.phoneNumber.forEach(val => {
        phoneNumberArray.push({
          type: val.type,
          number: sendPhoneNumber(val.number)
        });
      });
      const payload = {
        id: this.editSelectedClient.id,
        data: {
          isOrganization: this.primaryDetails.isOrganization,
          organizationName: this.primaryDetails.organizationName,
          leadID: this.selectedLead.id,

          type: {
            ...this.client
          },

          insuredInfo: {
            primary: {
              honorific: {
                id: this.honorific1.id,
                value: this.honorific1.value,
                machineValue: this.honorific1.machineValue
              },
              fname: this.insuredDetails.fname,
              lname: this.insuredDetails.lname,
              email: this.insuredDetails.email,
              phoneNumber: [
                {
                  type: this.insuredDetails.type,
                  number: sendPhoneNumber(this.insuredDetails.phone)
                }
              ]
            },
            secondary: {
              honorific: {
                id: this.honorific2.id,
                value: this.honorific2.value,
                machineValue: this.honorific2.machineValue
              },
              fname: this.coInsuredDetails.fname,
              lname: this.coInsuredDetails.lname,
              email: this.coInsuredDetails.email,
              phoneNumber: [
                {
                  type: this.coInsuredDetails.type,
                  number: sendPhoneNumber(this.coInsuredDetails.phone)
                }
              ]
            },
            mailingAddress: {
              ...this.mailingAddressDetails
            },

            phoneNumbers: phoneNumberArray,
            tenantInfo: {
              name: this.tenantOccupied.name,
              phoneNumber: {
                type: this.tenantOccupied.type,
                number: sendPhoneNumber(this.tenantOccupied.phone)
              }
            }
          },
          property: {
            name: this.lossAddressName,
            addressCountry: this.clientAddressDetails.addressCountry,
            addressLocality: this.clientAddressDetails.addressLocality,
            addressRegion: this.clientAddressDetails.addressRegion,
            postalCode: this.clientAddressDetails.postalCode,
            address1: this.clientAddressDetails.address1,
            address2: this.clientAddressDetails.address2,
            houseNumber: this.clientAddressDetails.houseNumber,
            propertyType: {
              ...this.property
            },
            dropBox: {
              info: this.clientAddressDetails.dropBox.info,
              isPresent: this.clientAddressDetails.dropBox.isPresent
            },
            propertyDesc: this.propertyDescription
          }
        }
      };

      /* if coInsuredDetails toggle is off it well not send the coInsured details */
      if (!this.isThereaCoInsuredToggle) {
        delete payload.data.insuredInfo.secondary;
      }
      if (!this.tenantOccupiedToggle) {
        delete payload.data.insuredInfo.tenantInfo;
      }
      if (!this.selectedLead.id) {
        delete payload.leadID;
      }

      if (!this.editSelectedClient.id) {
        var response = await this.addClient(payload.data);
        if (response.id)
          this.successMessage(constants.successMessages.CLIENT_CLAIM_CREATED);
        else this.errorMessage(constants.successMessages.CLIENT_CLAIM_FAILED);
      } else {
        var response = await this.editClientLocal(payload);
        if (response.id) {
          this.successMessage(constants.successMessages.CLIENT_INFO);
        } else
          this.successMessage(constants.successMessages.CLIENT_INFO_FAILED);
      }

      this.clientResponse = response;

      if (response && response.id) {
        const responseData = {
          id: response.id,
          propertyId: response.attributes
            ? response.attributes.propertyID
            : response.propertyID
        };

        this.setPayloadForClaim(responseData);
      } else {
        this.$router.push('/clients');
      }
    },

    /*Payload for Claim*/
    async setPayloadForClaim(responseData) {
      const payload = {
        id: this.selectedClaim.id,
        data: {
          client: {
            id: responseData.id,
            fname: this.insuredDetails.fname,
            lname: this.insuredDetails.lname
          },
          policyInfo: {
            carrier: {
              id: this.insuranceDetails.carrierId,
              value: this.insuranceDetails.carrierName,
              address: this.insuranceDetails.address,

              email: this.insuranceDetails.email,
              phone: this.insuranceDetails.email
            },
            number: this.insuranceDetails.policyNumber,
            isClaimFiled: this.insuranceDetails.hasClaimBeenFilledToggle,
            isForcedPlaced:
              this.insuranceDetails.isThisIsForcedPlacedPolicyToggle,
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
            effectiveDate: dateToSend(
              this.insuranceDetails.policyEffectiveDate
            ),
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
            declaration: {
              isDeclared: true,
              fileInfo: {
                id: '',
                value: ''
              }
            }
          },
          mortgageInfo: this.mortgageInfo,
          lossInfo: {
            property: {
              id:
                this.isOnline || !this.editSelectedClient.id
                  ? responseData.propertyId
                  : this.propertyID
            },

            claimReason: {
              ...this.lossInfo.reasonClaim
            },
            date: dateToSend(this.lossInfo.dateOfLoss),
            cause: this.lossInfo.causeOfLoss.value
              ? this.lossInfo.causeOfLoss
              : null,

            isFEMA: this.lossInfo.femaClaimToggle,
            isEmergency: this.lossInfo.isStateOfEmergencyToggle,
            emergencyName: this.lossInfo.nameOfEmergency,
            desc: this.lossInfo.descriptionDwelling,
            isHabitable: this.lossInfo.isTheHomeHabitable,
            serverity: {
              ...this.lossInfo.severityOfClaimType
            },
            OSDamageItems: this.lossInfo.osDamagedItems,
            isPPIF: this.lossInfo.wasAppifProvidedToTheInsuredToggle,
            isNeedPPIF:
              this.lossInfo.doesTheOfficeNeedToProvidePpifToTheInsuredToggle,
            hasHomeMortgage: this.lossInfo.isMortgageHomeToggle,
            isSecondClaim: false
          },
          damageInfo: {
            personal: {
              isDamaged: this.lossInfo.isThereDamageToPersonalPropertyToggle,
              isPPIFFillNow: this.lossInfo.isPAFillingOutToggle,
              isPPIFFillLater: this.lossInfo.isAdjustorFillOutLaterDate,
              isClientPreparePPIF: this.lossInfo.isClientGoingToPreparePPIF,
              isPPIFSendToInsure: this.lossInfo.doYouWantToSendInsuredPPIF,
              items: this.lossInfo.ppDamagedItems
            },
            otherStructure: {
              isDamaged: this.lossInfo.isDamageOSToggle,
              isPPIFFillNow: this.lossInfo.isPAFillingOutToggle,
              isPPIFFillLater: this.lossInfo.isAdjustorFillOutLaterDate,
              isClientPreparePPIF: this.lossInfo.isClientGoingToPreparePPIF,
              isPPIFSendToInsure: this.lossInfo.doYouWantToSendInsuredPPIF,
              items: this.lossInfo.osDamagedItems
            }
          },
          expertInfo: {
            vendors: [],
            notes: this.expertVendorInfo.notes,
            internalNotes: this.expertVendorInfo.internalNotes
          },

          contractInfo: {
            date: dateToSend(this.contractInfo.contractDate),
            fees: {
              type: this.contractInfo.buttonGroup,
              rate: this.contractInfo.claimFeeRate
                ? this.contractInfo.claimFeeRate
                : 0
            },

            dateOfFirstContact: dateToSend(this.contractInfo.firstContractDate),

            source: {
              id: this.contractInfo.sourceDetails.id,
              type: this.contractInfo.sourceDetails.type,
              detail: this.contractInfo.sourceDetails.details
            }
          },
          status: {
            isCancelled: this.contractInfo.cancelledToggle
          },
          expertVendorInformation: {
            isHiredVendor: this.expertVendorInfo.isAlreadyHiredVendor,
            alreadyHiredVendor: this.expertVendorInfo.isHiredByClaimguru,
            hiredToggle: this.expertVendorInfo.anyOtherExpertHiredToggle,
            alreadyHired: this.expertVendorInfo.vendorExpertHiredToggle
          },
          estimatingInformation: this.estimatingInfo,
          personnel: [
            {
              personnelID: this.companyPersonnel.personParty.id,
              name: this.companyPersonnel.personParty.name,
              role: {
                value: this.companyPersonnel.personnel.value.name,
                machineValue: this.companyPersonnel.personnel.value.machineValue
              },
              note: this.companyPersonnel.notes,
              fees: {
                type: this.companyPersonnel.buttonGroup,
                rate: this.companyPersonnel.claimFeeRate
                  ? this.companyPersonnel.claimFeeRate
                  : 0
              },
              startDate: dateToSend(this.companyPersonnel.startDate),
              endDate: dateToSend(this.companyPersonnel.endDate)
            }
          ]
        }
      };

      if (this.isOnline) {
        delete payload.data.expertVendorInformation;
        delete payload.data.estimatingInformation;
      }

      if (
        !this.companyPersonnel.personnel.value.name &&
        !this.companyPersonnel.personnel.value.machineValue
      ) {
        delete payload.data.personnel;
      }

      if (
        this.estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle &&
        this.estimatingInfo.estimatorID
      ) {
        payload.data.estimatingInfo = {
          estimatorID: this.estimatingInfo.estimatorID,
          scopeTimeNeeded:
            this.estimatingInfo.scopeTimeNeededInHours +
            '.' +
            this.estimatingInfo.scopeTimeNeededInMinutes,
          notesToEstimator: this.estimatingInfo.notesToEstimator
        };
      }
      if (
        this.expertVendorInfo.isAlreadyHiredVendor.length ||
        this.expertVendorInfo.isHiredByClaimguru.length
      ) {
        let vendorsAlreadyExist =
          this.expertVendorInfo.isAlreadyHiredVendor.map(val => ({
            id: val.vendor.id,
            value: val.vendor.value,
            isAlreadyHired: true
          }));
        let vendorsHired = this.expertVendorInfo.isHiredByClaimguru.map(
          val => ({
            id: val.vendor.id,
            value: val.vendor.value,
            isAlreadyHired: false
          })
        );
        if (vendorsAlreadyExist[0].id) {
          payload.data.expertInfo.vendors =
            vendorsAlreadyExist.concat(vendorsHired);
        } else {
          payload.data.expertInfo.vendors = vendorsHired;
        }
      }

      if (this.clientResponse.isCreate && this.clientResponse.offline) {
        var response = await this.addClaim(payload.data);
      } else if (this.editSelectedClient.id) {
        var response = await this.editClaimLocal(payload);
      } else if (!this.clientResponse.offline) {
        var response = await this.addClaim(payload.data);
      }

      if (response && response.id) {
        if (
          this.officeTask.officeActionRequired &&
          this.officeTask.actions &&
          this.officeTask.actions.length
        ) {
          this.addMultipleOfficeTask(response);
        } else {
          this.$router.push('/clients');
        }
      }
    },

    async addMultipleOfficeTask(response) {
      if (this.officeTask && this.officeTask.actions) {
        this.officeTask.actions.forEach(val => {
          if (val.isEnabled == true) {
            this.finalOfficeTask.push(val);
          }
        });
      }

      const payload = {
        id: response.id,
        tasks: this.finalOfficeTask
      };

      if (this.editSelectedClient.id) {
        var response = await this.editMultipleTaskToClaim(payload);
      } else {
        var response = await this.addMultipleTaskToClaim(payload);
      }

      if (response) {
        if (this.isOnline) {
          this.setSelectedLeadOnline();
        } else {
          this.setSelectedLeadOffline();
        }
        this.finalOfficeTask = [];
        this.$router.push('/clients');
        this.setEditOfflineClientIcon(false);
        this.editSelectedClient.id = '';
        this.propertyID = '';
      }
    },

    validateEmail,

    async onStepClick(index) {
      if (this.step < index) {
        const validation = await this.$refs[
          this.stepArr[this.step].ref
        ].validate();
        if (index <= this.stepClickValidTill) {
          if (validation) {
            this.step = index;
          }
        }
      } else {
        const validation = await this.$refs[
          this.stepArr[this.step].ref
        ].validate();
        if (validation) {
          this.step = index;
        }
      }
    },

    onNextButtonClick() {
      this.step++;
      switch (this.stepArr[this.step].ref) {
        case 'insuranceInfo':
          this.getPolicyTypes();
          this.getPolicyCategory();
          break;
        case 'lossInfo':
          this.getLossCauses();
          this.getClaimReasons();
          this.getSeverityClaim();
          break;
        case 'vendorInfo':
          this.getVendorIndustries();
          break;
        case 'personnelInfo':
          this.getClaimRoles();
          this.getAllUsers();
          break;
      }
      if (this.stepClickValidTill < this.step) {
        this.stepClickValidTill = this.step;
      }

      document.getElementById('step').scrollLeft += 50;
    },

    onBackButtonClick() {
      this.step--;
      document.getElementById('step').scrollLeft -= 50;
    }
  }
  /*----------------------end of method-----------------------------------*/
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;
  margin: 5px 0;
}
.input-field {
  height: 55px;
}
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}

.form-card {
  min-height: 250px;
  max-height: calc(100vh - 230px);
  overflow: scroll;
}

.stepper {
  .step {
    display: flex;
    overflow-x: auto;
    padding: 10px 10px 0 10px;

    .icon-div-selected {
      background: $primary;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }
    .icon-div-done {
      background: green;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }

    .icon-div {
      background: $grey;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }

    .label {
      text-transform: capitalize;
      text-align: center;
      font-size: x-small;
      margin-top: 10px;
    }
  }

  .form {
    height: calc(100vh - 140px);
    padding: 10px;
  }
}
</style>
