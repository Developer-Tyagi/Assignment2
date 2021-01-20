<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/clients')"
      :showAddButton="false"
    />
<div class="column full-height" style="padding:51px 20px 20px 20px">
      <div class="q-pa-md column full-height">
        <div class="createClientInfo" style="font-size:15px">
          <div class="form-list"
            @click="clientInfoDailog = true" >
            Client Info
          </div>  
          <div
        class="form-list"
      @click="mailingAddressDialog = true"
          >
          Mailing Address
          </div>
          <div
          class="form-list"
          @click="insuranceInfoDialog = true"
          >
            Insurance Info
          </div>
          <div
        class="form-list"
          @click="lossInfoDialog = true"
          >
            Loss Info
          </div>
          <div
          class="form-list"
          @click="mortgageInfoDialog = true"
          >
            Mortgage Info
          </div>
    
          <div
        class="form-list"
            @click="documentsDialog = true"
          >
            Documents
          </div>
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
    //client info
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
          <div class="q-page bg-white " style="min-height: 630px;">
            <div
              class="full-width"
              style="
            height: calc(100vh - 145px);
            overflow-y: auto;
            margin-bottom: 10px;
            padding-top:40px;
          "
            >
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
                  :rules="[(val) => (val && val.length > 0) || '']"
                />
                <div
                  v-else-if="sourceDetails.type == 'vendor' "
                  class="custom-select"
                  @click="vendorsListDialog = true"
                >
                  <div class="select-text">
                    {{
                      sourceDetails.id
                        ? sourceDetails.details
                        : "Select Lead Source"
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
                @input="setTypes(clientTypes,client)"
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
          

  <q-input v-model="insuredDetails.fname" 
                  lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the First name'
                ]"
              label="First Name" />
              <q-input v-model="insuredDetails.lname" 
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the Last name'
                ]"
                label="Last Name" />
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
                  val => (val && val.length == 10) || 'Please fill the phone number'
                ]"
                  style="width: 55%"
                /> </div>
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
                <p class="q-mx-none q-my-auto">
                  Is there a Co-insured?
                </p>
                <q-toggle class="q-ml-auto" v-model="isThereaCoInsuredToggle" />
              </div>
              <br />
              <div v-if="isThereaCoInsuredToggle" style="font-size:20px;">
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
                <q-input v-model="coInsuredDetails.fname" label="First Name" />
                <q-input v-model="coInsuredDetails.lname" label="Last Name" />
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
                  val => (val && val.length == 10) || 'Please fill the phone number'
                ]"
                    style="width:55%;"
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
                  v-model="additionalPhoneNumberToggle"
                />
              </div>
              <div v-if="additionalPhoneNumberToggle">
                <div class="row">
                  <q-select
                    v-model="additionalPhoneNumber.type1"
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
                    v-model="additionalPhoneNumber.phone2"
                    label="Phone2"
                    type="number"
                      lazy-rules
                :rules="[
                  val => (val && val.length == 10) || 'Please fill the phone number'
                ]"
                    style="width:55%;margin-left:auto"
/>
                  </div>
                <div class="row">
                  <q-select
                  v-model="additionalPhoneNumber.type2"
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
                  v-model="additionalPhoneNumber.phone3"
                    label="Phone3"
                    type="number"
                      lazy-rules
                :rules="[
                  val => (val && val.length == 10) || 'Please fill the phone number'
                ]"
                    style="width:55%"
                  />
                </div>
              </div>
              <br />
              <span class="form-heading">Address Details</span>
              <AutoCompleteAddress :address="clientInfoAddressDetails"/>
              <div class="row">
                <p class="q-mx-none q-my-auto">
                  Gate / Dropbox
                </p>
                <q-toggle class="q-ml-auto" v-model="clientInfoAddressDetails.gateDropbox" />
              </div>
              <div v-if="clientInfoAddressDetails.gateDropbox">
                <q-input
                  v-model="clientInfoAddressDetails.gateDropboxInfo"
                  label="Gate / Dropbox Info"
                />
              </div>
              <div class="row">
                <p class="q-mx-none q-my-auto">
                  Tenent Occupied
                </p>
              <q-toggle class="q-ml-auto" v-model="tenantOccupiedToggle" />
              </div>
              <div v-if="tenantOccupiedToggle">
                <q-input v-model="tenantOccupied.name" label="Tenant Name" />
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
                  <q-input v-model="tenantOccupied.phone" label="Phone"    style="width:55%;margin-left:auto"/>
                </div>
              </div>
              <br />
            </div>
          </div>
<q-btn
          @click="clientInfoDailog = false"
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    //mailing address
    <q-dialog
      v-model="mailingAddressDialog"
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
              @click="mailingAddressDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Mailing Address
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white " style="min-height: 630px;">
            <div
              class="full-width"
              style="
            height: calc(100vh - 145px);
          margin-bottom: 10px;
            padding-top:40px;
          "
            >
              <div
                class="column full-height"
                style="padding:30px 20px 20px 20px"
              >
                <div class="row">
                  <p class="q-mx-none q-my-auto">
                    Is the mailing address same? 
                  </p>
                <q-toggle
                    class="q-ml-auto"
                    v-model="isMailingAddressSameToggle"
                  @input="sameAddressAsClient"
                  />
                </div>
                <AutoCompleteAddress :address="mailingAddressDetails"/>
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
    //insurance Info
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
          <div class="q-page bg-white " style="min-height: 630px;">
            <div
              class="full-width"
              style="
            height: calc(100vh - 145px);
            overflow-y: auto;
            margin-bottom: 10px;
            padding-top:40px;
          "
            >
          <span class="stepper-heading">Insurance Carrier</span>

              <div
                v-model="insuranceDetails.carrierName"
                class="custom-select"
                @click="onAddVendorDialogClick('carrier')"
              >
                <div class="select-text">
                  {{
                    insuranceDetails.carrierName
                      ? insuranceDetails.carrierName
                      : "Enter Carrier Details"
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
                  <p class="q-mx-none q-my-auto">
                    Has claim been filed?
                  </p>
          <q-toggle
                    class="q-ml-auto"
                    v-model="hasClaimBeenFilledToggle"
                  />
                </div>
              <div class="row">
                  <p class="q-mx-none q-my-auto" >
                    Is this is a Foced-Placed policy?
                  </p>
                <q-toggle
                    class="q-ml-auto"
                    v-model="isThisIsForcedPlacedPolicyToggle"     
                  />                                           
                </div>
                <span class="form-heading">Policy Effective date</span>
            <q-input v-model="insuranceDetails.policyEffectiveDate" type = "date"  /><br>
              <span class="form-heading">Policy Expiry date
          </span>
            <q-input v-model="insuranceDetails.policyExpireDate" type = "date"  />
                <q-select
            v-model="insuranceDetails.policyCategory.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="policyCategories"
                @input="setTypes(policyCategories,insuranceDetails.policyCategory)"
                label="Policy Category"
              />
  <q-select
            v-model="insuranceDetails.property.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="propertyTypes"
                @input="setTypes(propertyTypes,insuranceDetails.property)"
              label="Property Type"
              />
              <div class="row">
                <p class="q-mx-none q-my-auto"> Dwelling Limit (A)</p>
                <q-input
              type="number"
                  v-model="insuranceDetails.dwellingLimitA"
                placeholder="Dwelling Limit (A)" 
                  prefix="$"
                  style="margin-left:40px;width:50%"
                />
              </div>
              <div class="row">
              <p class="q-mx-none q-my-auto"> Other Structure (B)</p>
          <q-input
        type="number"
                  v-model="insuranceDetails.otherStructureB"
                placeholder="Other Structure (B)"
                prefix="$"
                step="0.01"  min="0" max="10"
                style="margin-left:40px;width:50%"
                />
                </div>
                <div class="row">
              <p class="q-mx-none q-my-auto">Contents Limit (C)</p>
                <q-input
            type="number"
                  v-model="insuranceDetails.contentsLimit"
                placeholder="Contents Limit (C)"
                  prefix="$"
                  step="0.01"  min="0" max="10"
                  style="margin-left:40px;width:50%"
                />
                </div>
                <div class="row">
              <p class="q-mx-none q-my-auto">Loss of Use Limit (D)</p>
            <q-input
                      type="number"
                  v-model="insuranceDetails.lossOfUSD"
                  placeholder="Loss of Use Limit (D)"
                  prefix="$"
                step="0.01"  min="0" max="10"
                  style="margin-left:20px;width:50%"
                />
                </div>
                  <div class="row">
              <p class="q-mx-none q-my-auto">Depreciation</p>
                  <q-input
                    type="number"
                  v-model="insuranceDetails.deprecation"
                placeholder="Depreciation"
                    prefix="$"
                      step="0.01"  min="0" max="10"
                  style="margin-left:70px;width:50%"
                />
                </div>
                <div class="row">
              <p class="q-mx-none q-my-auto">Deductible</p>
                <q-input
                    type="number"
                  v-model="insuranceDetails.deductible"
                placeholder="Deductible"
                    prefix="$"
                    step="0.01"  min="0" max="10"
                  style="margin-left:80px;width:50%"
                />
                </div>
                <div class="row">
              <p class="q-mx-none q-my-auto">Prior payment by insured</p>
              <q-input
                  type="number"
                  v-model="insuranceDetails.priorPayment"
                placeholder="Prior payment by insured"
                    prefix="$"
                    step="0.01"  min="0" max="10"
                  style="margin-left:10px;width:50%"
                />
                </div>
                <br>
          <span class="form-heading">Reason for Limits/Denial</span>
    <div class="floating-label">
  <textarea required class="full-width" v-model="insuranceDetails.reasonsOfLD"></textarea>
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
    //loss info
    <q-dialog
      v-model="lossInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top:20px">
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
          <div class="q-page bg-white " style="min-height: 630px;">
            <div
              class="full-width"
              style="
            height: calc(100vh - 145px);
            overflow-y: auto;
            margin-bottom: 10px;
            padding-top:40px;
          "
            >
            <div class="row">
              <p class="q-mx-none q-my-auto">
                  Loss Address Same As Client's?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isLossAddressSameAsClientToggle"
                />
              </div>
              <AutoCompleteAddress :address="lossInfo.lossAddressDetails"/>
            <q-input 
            v-model="lossAddressName"
          label="Loss Address Name"
            lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'This is a required field'
                ]"/>
          <q-select
            v-model="lossInfo.property.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="propertyTypes"
                @input="setTypes(propertyTypes,lossInfo.property)"

                label="Property Type"
              />
      <q-input v-model="lossInfo.propertyDescription" label="Description of Property" />
          <q-select
            v-model="lossInfo.reasonClaim.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="claimReasons"
                @input="setTypes(claimReasons,lossInfo.reasonClaim)"
                label="Reason for Claim"
              /><br>
<span class="form-heading">Date of Loss</span>
<q-input v-model="lossInfo.dateOfLoss" type = "date"      placeholder="Date of Loss" />
          
            <q-select
            v-model="lossInfo.causeOfLoss.id"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                :options="lossCauses"
                @input="setTypes(lossCauses,lossInfo.causeOfLoss)"
                label="Cause of Loss"
              /><br>
        <span class="form-heading">Deadline Date</span>
          <q-input v-model="lossInfo.deadlineDate" type = "date"      placeholder="Deadline Date" /><br>
              <span class="form-heading">Recov. Deprec. Deadline</span>
              <q-input v-model="lossInfo.recovDeadline" type = "date"      placeholder="Recov. Deprec. Deadline" /><br>
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
                <q-toggle class="q-ml-auto" v-model="isStateOfEmergencyToggle" />
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
                @input="setTypes(claimSeverity,lossInfo.severityOfClaimType)"
                label="Severity of Claim"
              /><br>
<q-input v-model="lossInfo.descriptionDwelling" label="Loss Description to Dwelling" /><br>
            <div class="row">
                <p style="q-mx-none q-my-auto">
              Is there damage to other structures?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isDamageOSToggle"
                />
              </div>
            <q-input v-if="isDamageOSToggle" v-model="lossInfo.damageDescription"  label="Damage items description" />
              
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
                <p style="q-mx-none q-my-auto">Is there a mortgage on the home?</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="IsMortgageHomeToggle"
                />
              </div>
              <div class="row">
                <p style="q-mx-none q-my-auto">Is there a second claim to file?</p>
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
    // mortgage info
    <q-dialog
      v-model="mortgageInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top:20px">
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
          <div class="q-page bg-white " style="min-height: 620px;">
            <div
              class="full-width"
              style="
            height: calc(100vh - 145px);
            overflow-y: auto;
            margin-bottom: 10px;
            padding-top:40px;
          "
            >
            <q-input
              v-model="mortgageDetails.companyName"
              label="Mortgage Company Name"
            />
            <q-input v-model="mortgageDetails.loanNumber" label="Loan Number" />
            <q-input
              v-model="mortgageDetails.dob"
              label="Date of Birth of Primary Mortgagee"
            /><br />

            <span class="form-heading">
              Last 4 Primary Mortgagee's Social Security<br> Numbers
            </span>
            <q-input
              v-model="mortgageDetails.socialSecurityNumber1"
              label="Social Security Number 1"
            />
            <q-input
              v-model="mortgageDetails.socialSecurityNumber2"
              label="Social Security Number 2"
            />
            <q-input
              v-model="mortgageDetails.socialSecurityNumber3"
              label="Social Security Number 3"
            />
            <q-input
              v-model="mortgageDetails.socialSecurityNumber4"
              label="Social Security Number 4"
            /><br />
            <div class="row">
              <p style="font-size:15px">Is there a 2nd mortgage on the home?</p>

              <q-toggle
                class="q-ml-auto"
                v-model="isTherea2ndMortgageOnTheHomeToggle"
              />
            </div>
            <div v-if="isTherea2ndMortgageOnTheHomeToggle">
              <q-input
                v-model="mortgageDetails.secondCompanyName"
                label="2nd Mortgage Company Name"
              />
              <q-input
                v-model="mortgageDetails.secondLoanNumber"
                label="2nd Mortgage Loan Number"
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
            @click="mortgageInfoDialog = false"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    
  </q-page>
</template>

<script>
import CustomHeader from "components/CustomHeader";
import { validateEmail } from "@utils/validation";
import { mapGetters,mapActions,mapMutations} from "vuex";
import AutoCompleteAddress from "components/AutoCompleteAddress";


export default {
  name: "addClient",
  components: { CustomHeader, AutoCompleteAddress },
  data() {
    return {
      lossAddressName:"",
      clientInfoDailog: false,
      insuranceInfoDialog: false,
      mortgageInfoDialog: false,
      mailingAddressDialog: false,
      lossInfoDialog: false,
      documentsDialog: false,
      
      policyHolder:{
        isPolicyHolder:false,
        policyHolderName:"",
      },
      primaryDetails: {
        isOrganization: false,
        organizationName: "",
      },
      honorific1: {
        id: "",
        title: "",
      },
      honorific2: {
        id: "",
        title: "",
      },
      sourceDetails: {
        id: "",
        type: "",
        details: "",
      },
      client: {
        type: "",
        id:""
      },
      insuredDetails: {
        fname: "",
        lname: "",
        phone: "",
        type: "",
        email: "",      
      },
      coInsuredDetails: {
        fname: "",
        lname: "",
        phone: "",
        type: "",
        email: ""
      },
      additionalPhoneNumber: {
        phone2: "",
        phone3: "",
        phone: "",
        type1: "",
        type2: ""
      },
      clientInfoAddressDetails: {
        houseNumber: "",
        streetAddress: "",  
        addressLocality: "",
        addressLocality: "",
        postalCode: "",
        addressCountry: "",
        gateDropbox:false,
        gateDropboxInfo:""
      },
      tenantOccupied: {
        name: "",
        phone: "",
        type: ""
      },
      mailingAddressDetails: {
        houseNumber: "",
        streetAddress: "",  
        addressLocality: "",
        addressLocality: "",
        postalCode: "",
        addressCountry: "",
        gateDropbox:false,
        gateDropboxInfo:""  
      },
      lossInfo: {
        dateOfLoss: "",
        propertyDescription:"",
        reasonClaim:{
          type:"",
          id:"",
        },
        lossAddressDetails: {
          houseNumber: "",
          streetAddress: "",  
          addressLocality: "",
          addressLocality: "",
          postalCode: "",
          addressCountry: "",
        },
        deadlineDate:"",
        recovDeadline:"",
        nameOfEmergency: "",
        descriptionDwelling:"",
        damageDescription:"",
        property: {
          type: "",
          id:""
        },
        insuranceAdjustorName: "",
        whereDidTheLossOccur: "",
        other: "",
        severityOfClaimType: {
          id:"",
          value: "",
        },
        causeOfLoss: {
          type: "",
          id:"",
        },
        describeTheLoss: "",
        insuranceAdjustorPhone: "",
        insuranceAdjustorPhoneType: "",
        typeOfLoss: ""
      },
      insuranceDetails:{
        property:{
        id:"",
        type:"",
        },
        type:"",
        details:"",
        id:"",
        policyCategory:{
          id:"",
          type:"",
        },
      carrierName:"",
        carrierId: "",
        insuranceCarrierNumber:"",
        policyNumber:"",
        policyEffectiveDate: "",
        policyExpireDate:"",
      dwellingLimitA:"",
      contentsLimit:"",
      otherStructureB:"",
      lossOfUSD:"", 
      deprecation:"",
    deductible:"",
    priorPayment:"",
      reasonsOfLD:"",
      },
      mortgageDetails: {
        companyName: "",
        loanNumber: "",
        dob: "",
        socialSecurityNumber1: "",
        socialSecurityNumber2: "",
        socialSecurityNumber3: "",
        socialSecurityNumber4: "",
        secondCompanyName: "",
        secondLoanNumber: ""
      },

      additionalPhoneNumberToggle: false,
      tenantOccupiedToggle: false,
      isDamageOSToggle:false,

      isMailingAddressSameToggle: false,
      isThereaCoInsuredToggle: false,
      hasClaimBeenFilledToggle:false,
      isThisIsForcedPlacedPolicyToggle: false,
      DidYouHavePoliceDeclarationToggle: false,
      isStateOfEmergencyToggle: false,
      isTheHomeHabitable: false,
      isThereDamageToPersonalPropertyToggle: false,
      wasAppifProvidedToTheInsuredToggle: false,
    
      doesTheOfficeNeedToProvidePpifToTheInsuredToggle: false,
      IsMortgageHomeToggle: false,
      isLossAddressSameAsClientToggle:false,
      lossAddress:"",
      isThereAsecondClaimToFileToggle: false,
      
      typeOfLoss: [],
      vendorDialogFilterByIndustry: "",
    hasAvendorOfExpertHiredTypes: ["A", "B"],
      isTherea2ndMortgageOnTheHomeToggle: false,
      doesAnEstimatorNeedToBeAssignedToggle: false,
      estimatingInformationClaim2Toggle: false,
      hasAvendorOfExpertHiredToggle: false,
      anyOtherExpertHiredToggle: false,
      doYouReferAnyVendorToggle: false,
      femaClaimToggle: false,
      additionalOfficeTaskRequiredToggle: false,
      officeActionRequiredTypes: [],
      officeTaskRequiredTypes: [],
    };
  },

created() {
  this.getClientTypes();
  this.getPropertyTypes();
  this.getLossCauses();
  this.getSeverityClaim();
  this.getPolicyCategory();
  this.getClaimReasons();
  this.getContactTypes();
  this.getTitles();
  if(this.selectedLead.id){
this.insuredDetails.fname = this.selectedLead.primaryContact.fname;
this.insuredDetails.lname = this.selectedLead.primaryContact.lname;
this.insuredDetails.email = this.selectedLead.primaryContact.email;
this.insuredDetails.phone = this.selectedLead.primaryContact.phoneNumber[0].number;
this.insuredDetails.type = this.selectedLead.primaryContact.phoneNumber[0].type;
this.sourceDetails.type = this.selectedLead.leadSource.type
this.insuranceDetails.policyNumber =this.selectedLead.policyNumber
this.insuranceDetails.carrierName = this.selectedLead.carrier.value;
} 
},
  computed: {
  ...mapGetters(["selectedLead","leadSources","contactTypes","clientTypes","propertyTypes","policyCategories","claimSeverity","lossCauses","claimReasons","titles"])
  },
methods: {
    ...mapActions (["addClient","addClaim","getClientTypes","getPropertyTypes","getSeverityClaim","getPolicyCategory","getLossCauses","getClaimReasons", "getContactTypes", "getTitles",]),
    ...mapMutations(["setSelectedLead"]),
    
  setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.id === this['honorific'+val].id;
      });
      this['honorific'+val].title = titleResult.title;
    },
    
    setTypes(types,data){
        const obj = types.find(item => {
          return item.id === data.id;
        }) 
          data.id = obj.id;
      data.types = obj.machineName;
    },

    sameAddressAsClient(){
      this.mailingAddressDetails = this.clientInfoAddressDetails
    },
          

    onChangingSourceType() {
      this.sourceDetails.id = "";
      this.sourceDetails.details = "";
    },

  async  createClientButtonClick() {
//   const payload = {
//         isOrganization:this.primaryDetails.isOrganization,
//         organizationName:this.primaryDetails.organizationName,
//         isOrganizationPolicyholder: this.policyHolder.isPolicyHolder,
//     source: {
//         id: "",
//           type: this.sourceDetails.type,
//           detail: "",  
//       },
//         type: {
//           id: this.client.id,
//           value: this.client.type,
//         },
//       insuredInfo: {
//           primary:{
//             honorific: {
//                     id: this.honorific1.id,
//                         value: this.honorific1.title
//                     },
//             fname: this.insuredDetails.fname,
//             lname: this.insuredDetails.lname,
//             email: this.insuredDetails.email,
//             phoneNumber : [
//               {
//                 type: this.insuredDetails.type,
//                 number: this.insuredDetails.phone,
//               }
//             ]
//           },
//         secondary:{
//               honorific: {
//                       id:this.honorific2.id,
//                         value: this.honorific2.title,
//                     },
//           fname: this.coInsuredDetails.fname,
//           lname: this.coInsuredDetails.lname,
//           email : this.coInsuredDetails.email,
//           phoneNumber: [
//             {
//               type:  this.coInsuredDetails.type,
//               number: this.coInsuredDetails.phone,
//             }
//           ]
//           },
//           address: {
//               addressCountry: this.addressDetails.state,
//               addressLocality: this.addressDetails.city,
//                 addressRegion: this.addressDetails.apartmentNumber,
//                   postOfficeBoxNumber: "",
//                     postalCode: this.addressDetails.zip,
//                     streetAddress:  this.addressDetails.streetNumber,
//                     dropBox:this.gateDropbox.info,
//           },
//             mailingAddress: {
//                     addressCountry: this.mailingAddressDetails.country,
//                     addressLocality: this.mailingAddressDetails.city,
//                     addressRegion: this.mailingAddressDetails.apartmentNumber,
//                     postOfficeBoxNumber: "",
//                     postalCode: this.mailingAddressDetails.zip,
//                     streetAddress: this.addressDetails.streetNumber,
//                     dropBoxInfo: this.mailingAddressSameInfo.dropBox,
//                 },
//                 phoneNumbers: [
//                     {
//                         type: this.additionalPhoneNumber.type1,
//                         number: this.additionalPhoneNumber.phone2,
//                     },
//                     {
//                       type: this.additionalPhoneNumber.type2,
    
//                   number: this.additionalPhoneNumber.phone3,
//                     },

//                 ],
//                   tenantInfo: {
//                     name:  "",
//                     phoneNumber: {
//                         type:  "",
//                         number: "",
//                     }
//                 }
//         },
//       }
//       if(this.tenantOccupiedToggle){
//         payload.insuredInfo.tenantInfo.name = this.tenantOccupied.name;
//       payload.insuredInfo.tenantInfo.phoneNumber.type =  this.tenantOccupied.type;
//       payload.insuredInfo.tenantInfo.phoneNumber.number= this.tenantOccupied.phone;
//       } else {
//         delete payload.insuredInfo.tenantInfo
//       }
//       if (this.sourceDetails.type == "vendor") {
//         payload.source.id = this.sourceDetails.id;
//       } else {
//         payload.source.detail = this.sourceDetails.details;
//       }
//       const response= await this.addClient(payload)
//       if(response&& response.id){
//       this.setPayloadForLoss(response.id)
// }

// },
// async setPayloadForLoss(clientId)
// {
//     const payload1 = {
// client: {
//   id: "",
//   fname:"",
//   lname:"",
// },
// policyInfo:{
//   carrier: {
//     id:this.insuranceDetails.id,
//     value:this.insuranceDetails.type,
//   },
//   number: this.insuranceDetails.policyNumber,
//   isClaimFiled:this.hasClaimBeenFilledToggle,
//   isForcedPlaced:this.isThisIsForcedPlacedPolicyToggle,
//   claimNumber: "",
//   category: {
//     id:this.insuranceDetails.policyCategory.id,
//     value:this.insuranceDetails.policyCategory.type,
//   },
//   type:{
// id:this.insuranceDetails.property.id,
// value:this.insuranceDetails.property.type,
//   },
//   effectiveDate:this.insuranceDetails.policyEffectiveDate,
//   expirationDate: this.insuranceDetails.policyExpireDate,
//   limitCoverage: {
//     dwelling:"",
//     content:"",
//     lossOfUse:"",
//   },
//   deductibleAmount:"",
//   depreciation:"",
//   priorPayment:"",
//   limitReason:"",
//   declaration:{
//     isDeclared:"",
//     fileInfo:{
//       id:"",
//       value:"",
//     }
//   }
// },
// mortgageInfo:[
//   {
//     id: "",
//     value: "",
//       loanNumber: "",
//       accountNumber: "",
//       isPrimary: "",
//       notes:"",
//   },
//   {
//     id: "",
//     value: "",
//     loanNumber: "",
//     accountNumber: "",
//     notes:""
//                 }
// ],
// lossInfo:{
//   address: {
//     addressCountry:"",
//     addressLocality:"",
//     addressRegion:"",
//     postOfficeBoxNumber:"",
//     postalCode: "",
//     streetAddress:"",    
//   },
//   propertyType:{
//     id:this.lossInfo.property.id,
//     value:this.lossInfo.property.type
//   },
//   propertyDesc:this.lossInfo.propertyDescription,
//   claimReason:{
//     id:this.lossInfo.reasonClaim.id,
//     value:this.lossInfo.reasonClaim.type,
//   },
//   date:this.lossInfo.dateOfLoss,
//   cause:{
//     id:this.lossInfo.causeOfLoss.id,
//     value:this.lossInfo.causeOfLoss.type,
//   },
//   deadlineDate:this.lossInfo.deadlineDate,
//   recovDDate: this.lossInfo.recovDeadline,
//   isFEMA:this.femaClaimToggle,
//   isEmergency:this.isStateOfEmergencyToggle,
//   emergencyName:this.lossInfo.nameOfEmergency,
//   desc:this.descriptionDwelling,
//   isHabitable:this.isTheHomeHabitable,
//   serverity:{
//     id:this.lossInfo.severityOfClaimType.id,
//     value:this.lossInfo.severityOfClaimType.type,
//   },
//   isOSDamaged:this.isDamageOSToggle,
//   OSDamageDesc:this.lossInfo.damageDescription,
//   isPPDamaged:this.isThereDamageToPersonalPropertyToggle,
//   isPPIF:this.wasAppifProvidedToTheInsuredToggle,
//   isNeedPPIF:this.doesTheOfficeNeedToProvidePpifToTheInsuredToggle,
//   hashHomeMortgage:this.IsMortgageHomeToggle,
//   isSecondClaim:this.isThereAsecondClaimToFileToggle,
// }
// }

// this.addClaim(payload1).then(()=> this.setSelectedLead())

},

  validateEmail,
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
  border-bottom: 1px solid #D3D3D3;
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