<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/dashboard')"
      :showAddButton= "false"
    />
    </q-toolbar>
       
    </q-header>
   
    <div class="column full-height" style="padding:71px 20px 20px 20px">
      <q-card class="form-card q-pa-md" style="padding-top:51px;text-align:center;">
           <div @click= "publicAdjustorInfoDialog = true" style="  font-size:20px" >
             Public Adjustor Info
             </div><q-separator/>
               <div @click= "clientInfoDailog = true" style="font-size:20px">
               Client Info
             </div>  <br>
               <div @click= "mailingAddressDialog = true" style="font-size:20px">
            Mailing Address
             </div>  <br>
               <div @click= "insuranceInfoDialog = true" style=" font-size:20px">
             Insurance Info
             </div> <br> 
               <div @click= "lossInfoDialog = true" style=" font-size:20px">
             Loss Info
             </div>  <br>
               <div @click= "mortgageInfoDialog = true" style="font-size:20px">
             Mortgage Info
             </div>  <br>
               <div @click= "estimatingInfoDialog = true" style="font-size:20px">
             Estimating Info
             </div>  <br>
               <div @click= "expertVendorInfoDialog = true" style=" font-size:20px">
             Expert/Vendor  Info
             </div>  <br>
                 <div @click= "officeTaskDialog = true" style=" font-size:20px">
            Office Task
             </div>  <br>
                    <div @click= "documentsDialog = true" style=" font-size:20px">
            Documents
             </div>  <br>
          <q-btn class="full-width q-mt-auto" name="save">Create Client</q-btn>
      </q-card>
           
    </div>
            <q-dialog
      v-model= "publicAdjustorInfoDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      
    >
     <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="closeDialog(publicAdjustorInfoDialog)"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
         Public Adjustor INfo
        </div>
      </q-toolbar>
    </q-header>
        
 <q-card class="form-card q-pa-md" style="padding-top:51px;margin-left:15px;margin-right:15px">
        <q-card-section>
          
          <div class="text-h7">Select Public Adjustor You Want to Assign to. </div>
         
          <q-select 
           v-model="AdjustorTypes.type"
           :options= "AdjustorTypes"
            label="Select Public Adjustor"
         />
        </q-card-section >
        <div v-if="AdjustorTypes.type== 'Self'">
        <div style="font-size: 15px; font-weight: bold">My Details</div><br>
       <div style="font-size:15px; margin-left:10px">22/12/2020</div>
       <div style="font-size:15px; margin-left:10px;font-weight:bold">David Jones</div>
       <div style="font-size:15px; margin-left:10px">davidjones@company.com</div>
       <div style="font-size:15px; margin-left:10px">Mobile- +1(650) XXXXX98</div>
       <div style="font-size:15px; margin-left:10px">License Number- 12345677</div><br>
        <div class="row">
          <p style="font-size:15px">Is it company lead </p>
          
         <q-toggle class="q-ml-auto"
      v-model= "isItCompanyLeadToggle"
      
      />
        </div>
        <q-separator/><br>
        <div style="font-size:15px;">Default Fee Rate - 20%</div><br>
        <div style="font-size:20px;">Adjustors Fee Type</div>
        <div class="row">
         <div class="q-pa-md ">
     <q-btn
      padding="xs"
      color="primary"
      icon="eva-percent"
    />
    </div>
  <div class="q-pa-md ">
    <div class="text-purple q-gutter-md">
     
       <q-btn
      padding="xs"
      color="primary"
      icon="monetization_on"
      />
    </div>
  </div>
   <div class="q-pa-md ">
    <div class="text-purple q-gutter-md">
      <q-btn
      padding="xs"
      color="primary"
      icon="query_builder"
    />
    
    </div>
  </div>
  </div>
  
  <div style="font-size:15px; font-weight: bold">Adjusters Fee Rate</div><br>
  <q-separator/>
  <br>
  <div class = "row"  style="font-size:20px; ">
<span class="material-icons">
info
</span>

     <div> Needs approval from company</div>
     </div>
  </div>


  <div v-else v-else-if="AdjustorTypes.type =='Public Adjustor 01' ">
    <div style="font-size: 15px; margin-left:10px">Public Adjustor 01 Details</div><br>
       <div style="font-size:15px; margin-left:10px">22/12/2020</div>
       <div style="font-size:15px; margin-left:10px;font-weight:bold">Public Adjustor 01</div>
       <div style="font-size:15px; margin-left:10px">publicadjustor01@company.com</div>
       <div style="font-size:15px; margin-left:10px">Mobile- +1(650) XXXXX98</div>
       <div style="font-size:15px; margin-left:10px">License Number- 12345677</div><br>
        <div class="row">
          <p style="font-size:15px">Is it company lead </p>
          
         <q-toggle class="q-ml-auto"
      v-model= "isItCompanyLeadToggle"
      
      />
        </div>
        <q-separator></q-separator><br>
        <div style="font-size:15px; margin-left:25px">Default Fee Rate - 20%</div><br>
        <div style="font-size:20px; margin-left:25px;font-weight:bold">Adjustors Fee Type</div>
        <div class="row">
         <div class="q-pa-md ">
     <q-btn
      padding="xs"
      color="primary"
      icon="eva-percent"
    />
    </div>
  <div class="q-pa-md ">
    <div class="text-purple q-gutter-md">
       <q-btn
      padding="xs"
      color="primary"
      icon="monetization_on"
      />
    </div>
  </div>
   <div class="q-pa-md ">
    <div class="text-purple q-gutter-md">
      <q-btn
      padding="xs"
      color="primary"
      icon="query_builder"
    />
    </div>
  </div>
  </div>
  
  <div style="font-size:20px; margin-left:25px">Adjusters Fee Rate</div><br>
  <q-separator/>
  <br>
  <div class = "row"  style="font-size:20px; margin-left:10px">
<span class="material-icons">
info
</span>
     <div> Needs approval from company</div>
     </div>
  </div>
  <div v-else></div>
  
  
  
   <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize "
          
          size="'xl'"
        ></q-btn>
 </q-card>
    
    </q-dialog>

  <q-dialog 
      v-model= "clientInfoDailog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar>
         <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="text-uppercase text-bold">CLIENT  INFO</div>
        </q-bar>
<q-card-section>
           <div class="column full-height" style="padding:30px 20px 20px 20px">
          <div>
          <q-input v-model="client.sourceOfLead" label="Source of Lead" />
         </div>
         
          <q-select
            v-model="client.type"
            :options="ClientTypes"
            label="Client Type"
          />
          <div style="font-size: 20px;">Insured Details</div>
       <q-input v-model="insuredDetails.fname" label="First Name" />
        <q-input v-model="insuredDetails.lname" label="Last Name" />
        
      <div class="row">
            <q-input
       v-model="insuredDetails.phone"
              label="Phone"
              type="number"
              style="width: 65%"
            />
           <q-select
             v-model="insuredDetails.type"
               :options="insuredTypes"
              label="Type"
              style="width: 30%; margin-left: auto"
            />
          </div>

      <q-input   v-model="insuredDetails.email" label="Email" />


       <div class="row">
       <p class="q-mx-none q-my-auto" style="font-size:20px">Is there a Co-insured</p>
        <q-toggle class="q-ml-auto"
      v-model= "isThereaCoInsuredToggle"
       />
        </div>
      <br>
        <div v-if= "isThereaCoInsuredToggle"  style="font-size:20px;">Co-Insured Details
         <q-input  v-model="coInsuredDetails.fname" label="First Name" />
         <q-input v-model="coInsuredDetails.lname" label="Last Name" />
         
         <div class="row">
            <q-input
        v-model="coInsuredDetails.phone"
              label="Phone"
              type="number"
              style="width: 65%"
            />
            <q-select
             v-model="coInsuredDetails.type"
               :options="coInsuredTypes"
              label="Type"
              style="width: 30%; margin-left: auto"
            />
          </div>
      <q-input v-model="coInsuredDetails.email" input type="email" label="Email" />
         </div>
         </div>
        <div class="row">
     <p class="q-mx-none q-my-auto" style="font-size:20px">Add aditional phone number(s)</p>
          <q-toggle class="q-ml-auto"
          v-model= "addAditionalPhoneNumberToggle"
           />

        </div>
        <div v-if= "addAditionalPhoneNumberToggle" >
          <div class="row">
     <q-input v-model="addAditionalPhoneNumber.phone2" label="Phone2" />
    <q-select
    v-model="addAditionalPhoneNumber.type1"
               :options="addAdditionalPhoneNumber1Types"
              label="Type"
              style="width: 30%; margin-left: auto"
      />
        </div>
          <div class="row">
     <q-input v-model="addAditionalPhoneNumber.phone3" label="Phone3" />
    <q-select
      v-model="addAditionalPhoneNumber.type2"
               :options="addAdditionalPhoneNumber2Types"
              label="Type"
              style="width: 30%; margin-left: auto"
            />
        </div>
        </div>
        <br>
        <div style="font-size:20px;">Address Details</div>
        <q-input v-model="addressDetails.streetNumber" label="Street Number" />
        <q-input v-model="addressDetails.apartmentNumber" label="Unit or Apartment Number" />
        <q-input v-model="addressDetails.city" label="City" />
        <q-input v-model="addressDetails.state" label="State" />
        <q-input v-model="addressDetails.zip" label="ZIP" />
   <div class="row">
          <p class="q-mx-none q-my-auto" style="font-size:20px">Gate / Dropbox </p>
          
         <q-toggle class="q-ml-auto"
      v-model= "gateDropboxToggle"
      
      />
        </div>
        <div v-if= "gateDropboxToggle">
        <q-input v-model= "gateDropbox.info" label="Gate ? Dropbox Info" />
        </div>
        <div class="row">
          <p class="q-mx-none q-my-auto" style="font-size:20px">Tenent Occupied</p>
          
         <q-toggle class="q-ml-auto"
      v-model= "tenantOccupiedToggle"
      
      />
        </div>
        <div v-if="tenantOccupiedToggle">
        <q-input v-model="tanentOccupied .name" label="Tenant Name" />
        <div class="row">
        <q-input v-model="tanentOccupied.phone" label="Phone" />
         <q-select
         v-model="tanentOccupied.type"
               :options="tenantOccupiedTypes"
              label="Type"
              style="width: 30%; margin-left: auto"
            />
        </div>
        </div>
        <br>
     
        <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          
          size="'xl'"
        ></q-btn>
       
        </q-card-section>
       
      </q-card>

  </q-dialog>
   <q-dialog 
      v-model= "mailingAddressDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar>
          

         
          <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="text-uppercase text-bold">MAILING ADDRESS</div>
        </q-bar>

        <q-card-section>
           <div class="column full-height" style="padding:30px 20px 20px 20px">
           <div class="row">
          <p class="q-mx-none q-my-auto" style="font-size:20px">Is the mailing address same </p>
          
         <q-toggle class="q-ml-auto"
      v-model= "isMailingAddressSameToggle"
      
      />
        </div>
         <q-input v-model="mailingAddressDetails.streetAddress" label="Street Address" />
           <q-input v-model="mailingAddressDetails.apartmentNumber" label="Unit or Apartment Number" />
         <q-select
         v-model="mailingAddressDetails.city"
           :options= "CityTypes"
            label="City"
         />
            <q-select
              v-model="mailingAddressDetails.state"
           :options= "StateTypes"
            label="State"
         />
         <q-input v-model="mailingAddressDetails.zip" label="ZIP" />
     
        </div>
        
        <br>
         <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="saveButtonClick"
          size="'xl'"
        ></q-btn>
        </q-card-section>
       
      </q-card>

  </q-dialog>
    <q-dialog 
      v-model= "insuranceInfoDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar>
        

         
          <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="text-uppercase text-bold">INSURANCE INFO</div>
        </q-bar>

        <q-card-section>
           <div class="column full-height" style="padding:30px 20px 20px 20px">
           <div class="row">
          <p class="q-mx-none q-my-auto" style="font-size:15px">Is this is a Foced-Placed policy </p>
          
         <q-toggle class="q-ml-auto"
      v-model= "isThisIsForcedPlacedPolicyToggle"
      
      />
        </div>
         
         <q-select
         v-model="forcedPlacedPolicyDetails.policyType"
           :options= "PolicyTypes"
            label="Type of Policy"
         />
       
         <q-input v-model="forcedPlacedPolicyDetails.policyInceptionDate" label="Policy Inception Date" />
        <q-input v-model="forcedPlacedPolicyDetails.policyExpirationDate" label="Policy Expiration Date" />
         <q-input v-model="forcedPlacedPolicyDetails.otherPolicyType" label="Other Policy Type" />
          <q-input v-model="forcedPlacedPolicyDetails.insuranceCarrier" label="Insurance Carrier" />
           <q-input v-model="forcedPlacedPolicyDetails.policyNumber" label="Policy Number" /> 
           <q-input v-model="forcedPlacedPolicyDetails.policyDeductibleAmount" label="Policy deductible amount" /> 
           <div class="row">
          <p class="q-mx-none q-my-auto" style="font-size:15px">Did you have the policy's Declaration</p>
          
         <q-toggle class="q-ml-auto"
      v-model= "DidYouHavePoliceDeclarationToggle"
      
      />
        </div>
        <q-separator></q-separator>
        </div>
        
        <br>
          <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="saveButtonClick"
          size="'xl'"
        ></q-btn>
        </q-card-section>
       
      </q-card>

  </q-dialog>
   <q-dialog 
      v-model= "lossInfoDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar >
          

         
          <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
     <div class="text-uppercase text-bold text-black q-mx-auto">LOSS INFO</div>
        </q-bar>

        <q-card-section>
               
           <div class="column full-height" style="padding:30px 20px 20px 20px">
          
         <q-input v-model="lossInfo.dateOfLoss" label="Date of Loss" />
           
         <q-select
         v-model="lossInfo.claimType"
           :options= "ClaimTypes"
            label="Claim Type"
         /><br>
           <div class="row">
          <p style="font-size:15px">Is this a State of Emergency Claim </p>
          <q-toggle class="q-ml-auto"
      v-model= "isThisStateOfEmergencyClaimToggle"
    />
        </div>
          <div class="row">
          <p style="font-size:15px"> State of Emergency </p>
          <q-toggle class="q-ml-auto"
      v-model= "stateOfEmergencyToggle"
    />
    </div>
    <div v-if= "stateOfEmergencyToggle">
      <q-input v-model="lossInfo.nameOfEmergency" label="Name of Emergency"/>
      <q-input v-model="lossInfo.claim" label="Claim (%)"/>
    </div>
        
           <div class="row">
          <p style="font-size:15px"> Has the claim been filed</p>
          <q-toggle class="q-ml-auto"
      v-model= "hasClaimFiledToggle"
    />
        </div>
     <q-input v-model="lossInfo.claimNumber" label="Claim Number" /><br>
      <div class="row">
          <p style="font-size:15px">Do you know the Insurance<br>
             Adjuster's Information</p>
          <q-toggle class="q-ml-auto"
      v-model= "doYouKnowInsuranceAdjustorInformationToggle"
    />
        </div>
        <div v-if="doYouKnowInsuranceAdjustorInformationToggle">
        <q-input v-model="lossInfo.insuranceAdjustorName" label="Insurance Adjuster's Name" />
        </div>
        <div class="row">
       <q-input v-model="lossInfo.insuranceAdjustorPhone" label="Insurance Adjuster's Phone" />   
       <q-select
       v-model="lossInfo.insuranceAdjustorPhoneType"
           :options= "insuranceAdjustorPhoneType"
            label="Type"
             style="width: 30%; margin-left: auto"
         />
        </div>
         <q-input v-model="lossInfo.whereDidTheLossOccur" label="Where did the loss occur" />
         <q-select 
         v-model="lossInfo.typeOfLoss"
           :options= "typeOfLoss"
            label="Type of Loss"
         
         />
          <q-input v-model="lossInfo.other" label="Other" />
          <q-select 
          v-model="lossInfo.severityOfClaimType"
           :options= "severityOfClaimTypes"
            label="Severity of Claim"
          />
          <br>
          <div class="row">
            <p style="font-size:15px">Is the home habitable</p>
            <q-toggle class="q-ml-auto"
            v-model= "isTheHomeHabitable"
            />
          </div>
          <q-input v-model="lossInfo.causeOfLoss" label="Cause of Loss" />
       <q-input v-model="lossInfo.describeTheLoss" label="Describe the Loss" />
       <br>
         <div class="row">
            <p style="font-size:15px">Is there damage to personal property</p>
            <q-toggle class="q-ml-auto"
            v-model= "isThereDamageToPersonalPropertyToggle"
            />
          </div>
    <div class="row">
            <p style="font-size:15px">Was a PPIF provided to the insured</p>
            <q-toggle class="q-ml-auto"
            v-model= "wasAppifProvidedToTheInsuredToggle"
            />
          </div>
            <div class="row">
            <p style="font-size:15px">Does the office need to provide a<br> PPIF to the insured</p>
            <q-toggle class="q-ml-auto"
            v-model= "doesTheOfficeNeedToProvidePpifToTheInsuredToggle"
            />
          </div>
           <div class="row">
            <p style="font-size:15px">Is there a mortgage on the home</p>
            <q-toggle class="q-ml-auto"
            v-model= "IsThereAmortgageOnTheHomeToggle"
            />
          </div>
           <div class="row">
            <p style="font-size:15px">Is there a second claim to file</p>
            <q-toggle class="q-ml-auto"
            v-model= "isThereAsecondClaimToFileToggle"
            />
          </div>
        </div>
        <q-separator/>
        <br>
         <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="saveButtonClick"
          size="'xl'"
        ></q-btn>
        </q-card-section>
       
      </q-card>

  </q-dialog>
    <q-dialog 
      v-model= "mortgageInfoDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar>
          

         
          <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="text-uppercase text-bold">MORTGAGE INFO</div>
        </q-bar>

        <q-card-section>
           <div class="column full-height" style="padding:30px 20px 20px 20px">
         
         <q-input v-model="mortgageDetails.companyName" label="Mortgage Company Name" />
           <q-input v-model="mortgageDetails.loanNumber" label="Loan Number" />
             <q-input v-model="mortgageDetails.dob" label="Date of Birth of Primary Mortgagee" /><br>
      
           <div style="font-size:15px">Last 4 Primary Mortgagee's Social Security Numbers</div>
          <q-input v-model="mortgageDetails.socialSecurityNumber1" label="Social Security Number 1" />
        <q-input v-model="mortgageDetails.socialSecurityNumber2" label="Social Security Number 2" />
        <q-input v-model="mortgageDetails.socialSecurityNumber3" label="Social Security Number 3" />
        <q-input v-model="mortgageDetails.socialSecurityNumber4" label="Social Security Number 4" /><br>
       <div class="row" >
          <p style="font-size:15px">Is there a 2nd mortgage on the home </p>
          
         <q-toggle class="q-ml-auto"
      v-model= "isTherea2ndMortgageOnTheHomeToggle"
       />
        </div>
        <div v-if="isTherea2ndMortgageOnTheHomeToggle">
  
        <q-input v-model="mortgageDetails.secondCompanyName" label="2nd Mortgage Company Name" />
           <q-input v-model="mortgageDetails.secondLoanNumber" label="2nd Mortgage Loan Number" />
           
        </div>
        </div>
        <br>
       <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="saveButtonClick"
          size="'xl'"
        ></q-btn>
        </q-card-section>
       
      </q-card>

  </q-dialog>
   <q-dialog 
      v-model= "estimatingInfoDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar>
          

         
          <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="text-uppercase text-bold">ESTIMATING INFO</div>
        </q-bar>

        <q-card-section>
           <div class="column full-height" style="padding:30px 20px 20px 20px">
         
         
       <div class="row">
          <p style="font-size:15px">Does an estimator need to be<br>assigned </p>
          
         <q-toggle class="q-ml-auto"
      v-model= "doesAnEstimatorNeedToBeAssignedToggle"
       />
        </div>
        <q-input v-model="estimatingInfo.estimatorToBeAssigned" label="Estimator to be assigned" />
           <q-input v-model="estimatingInfo.scopeTimeNeeded" label="Scope time needed" />
           <q-input v-model="estimatingInfo.notesToTheEstimator" label="Notes to the estimator" /><br>
            <div class="row">
          <p style="font-size:15px">Estimating Information Claim 2</p>
          
         <q-toggle class="q-ml-auto"
      v-model= "estimatingInformationClaim2Toggle"
       />
        </div>
        </div>
        
        <br>
  <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="saveButtonClick"
          size="'xl'"
        ></q-btn>
        </q-card-section>
       
      </q-card>

  </q-dialog>
  <q-dialog 
      v-model= "expertVendorInfoDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar>
          

         
          <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="text-uppercase text-bold">EXPERT / VENDOR INFO</div>
        </q-bar>

        <q-card-section>
           <div class="column full-height" style="padding:30px 20px 20px 20px">
         
         
       <div class="row">
          <p style="font-size:20px">Has a Vendor of Expert hired</p>
          
         <q-toggle class="q-ml-auto"
      v-model= "hasAvendorOfExpertHiredToggle"
       />
        </div>
        <div v-if= "hasAvendorOfExpertHiredToggle">
             <q-select
             v-model="expertVendorInfo.expertType"
           :options= "hasAvendorOfExpertHiredTypes"
            label="Select Vendor / Expert Type"
         />
        </div>
        
            <div class="row">
          <p style="font-size:20px">Any other Expert hired</p>
          
         <q-toggle class="q-ml-auto"
      v-model= "anyOtherExpertHiredToggle"
       />
        </div>
          <div class="row">
          <p style="font-size:20px">Do you refer any Vendor</p>
          
         <q-toggle class="q-ml-auto"
      v-model= "doYouReferAnyVendorToggle"
       />
        </div>
        </div>
        
        <br>
          <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="saveButtonClick"
          size="'xl'"
        ></q-btn>
        </q-card-section>
       
      </q-card>

  </q-dialog>
  <q-dialog 
      v-model= "officeTaskDialog"
      persistent
      :maximized= "maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
   >
   <q-card class= "bg-white text-black">
        <q-bar>
        <q-btn dense flat icon="close" v-close-popup >
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="text-uppercase text-bold">OFFICE TASK</div>
        </q-bar>

        <q-card-section>
           <div class="column full-height" style="padding:30px 20px 20px 20px">
         
          <q-select
          v-model="officeTask.officeActionTypes"
           :options= "officeActionRequiredTypes"
            label="Office Action Required"
         />
         <q-select
         v-model="officeTask.officeTaskTypes"
           :options= "officeTaskRequiredTypes"
            label="Office Task Required"
         /><br>
       <div class="row">
          <p style="font-size:20px">Additional Office Task Required</p>
          
         <q-toggle class="q-ml-auto"
      v-model= "additionalOfficeTaskRequiredToggle"
       />
        </div>
       
        
        </div>
        
        <br>
         <q-btn
          label="Save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="saveButtonClick"
          size="'xl'"
        ></q-btn>
        </q-card-section>
       
      </q-card>

  </q-dialog>
  
  </q-page>
</template>

<script>
import CustomHeader from "components/CustomHeader";
export default {
  
  name: "AddClient",
  components: { CustomHeader },
 data () {

   return {
   
      publicAdjustorInfoDialog: false,
      AdjustorTypes: ["Self","Public Adjustor 01"],
      maximizedToggle: true,
     clientInfoDailog: false,
   
     ClientTypes:["Client A","Client B"],

      client: {
        sourceOfLead: "",
        type: "",
      },
       insuredDetails: {
        fname: "",
        lname: "",
        phone:"",
        type: "",
        email:"",
        },
         coInsuredDetails: {
       fname: "",
        lname: "",
        phone:"",
        type: "",
        email:"",
        },
          addAditionalPhoneNumber: {
       phone2: "",
        phone3: "",
        phone:"",
        type1: "",
        type2:"",
        },
        addressDetails: {
        streetNumber: "",
        apartmentNumber: "",
        city: "",
        state: "",
        zip: "",
        },
        gateDropbox: {
        info: ""
        },
        tanentOccupied: {
        name: "",
        phone: "",
        type: "",
        },
        mailingAddressDetails: {
         streetNumber:"",
         apartmentNumber: "",
         city:"",
         state: "",
         zip: "",
        },
        forcedPlacedPolicyDetails: {
        policyInceptionDate:"",
        policyExpirationDate:"",
        otherPolicyType:"",
        insuranceCarrier:"",
        policyNumber:"",
        policyDeductibleAmount:"",
        },
        lossInfo: {
      dateOfLoss:"",
       claimType:"",
      nameOfEmergency:"",
     claim:"",
    claimNumber:"",
   insuranceAdjustorName:"",
   whereDidTheLossOccur:"",
   other:"",
   severityOfClaimType:"",
  causeOfLoss:"",
  describeTheLoss:"",
  insuranceAdjustorPhone: "",
  insuranceAdjustorPhoneType: "",
typeOfLoss: ""
        },
        mortgageDetails:{
        companyName:"",    
          loanNumber:"",  
           dob:"",  
         socialSecurityNumber1:"",  
         socialSecurityNumber2:"",  
         socialSecurityNumber3:"",  
         socialSecurityNumber4:"",  
          secondCompanyName:"",  
          secondLoanNumber: "",  
},
        estimatingInfo: {
                estimatorToBeAssigned:"",
                  scopeTimeNeeded:"",
                notesToTheEstimator:"",
                },
        expertVendorInfo:{
                expertType:"",
        },
        officeTask: {
                    officeActionTypes: "",
                    officeTaskTypes:"",
        },
     isItCompanyLeadToggle:false,
     addAditionalPhoneNumberToggle:false,
     gateDropboxToggle:false,
     tenantOccupiedToggle:false,
     mailingAddressDialog:false,
     isMailingAddressSameToggle:false,
     isThereaCoInsuredToggle:false,
     CityTypes:["Toronto","Brampton"],
     StateTypes:["California","Washington"],
     insuranceInfoDialog:false,
    isThisIsForcedPlacedPolicyToggle:false,
     PolicyTypes:["A","B"],
     DidYouHavePoliceDeclarationToggle:false,
     lossInfoDialog:false,
     ClaimTypes:["A","B","C"],
     isThisStateOfEmergencyClaimToggle:false,
     stateOfEmergencyToggle:false,
     hasClaimFiledToggle:false,
     isTheHomeHabitable:false,
     isThereDamageToPersonalPropertyToggle:false,
     wasAppifProvidedToTheInsuredToggle:false,
     doYouKnowInsuranceAdjustorInformationToggle:true,
     doesTheOfficeNeedToProvidePpifToTheInsuredToggle:false,
     IsThereAmortgageOnTheHomeToggle:false,
     isThereAsecondClaimToFileToggle:false,
     insuranceAdjustorPhoneType:["A","B","C"],
     typeOfLoss:["A","B"],
     coInsuredTypes:["A","B"],
     insuredTypes:["A","B"],
     tenantOccupiedTypes:["A","B"],
     addAdditionalPhoneNumber1Types:["A","B"],
     addAdditionalPhoneNumber2Types:["A","B"],
     hasAvendorOfExpertHiredTypes:["A","B"],
     severityOfClaimTypes:["A","B"],
     mortgageInfoDialog:false,
     isTherea2ndMortgageOnTheHomeToggle:false,
    estimatingInfoDialog:false,
    doesAnEstimatorNeedToBeAssignedToggle:false,
    estimatingInformationClaim2Toggle:false,
    expertVendorInfoDialog:false,
    hasAvendorOfExpertHiredToggle:false,    
    anyOtherExpertHiredToggle:false,
    doYouReferAnyVendorToggle:false,
    officeTaskDialog:false,
    additionalOfficeTaskRequiredToggle:false,
    officeActionRequiredTypes:["A","B","C"],
    officeTaskRequiredTypes:["A","B","C"],
    documentsDialog:false,
    
   }
   
 },
methods: {
  saveButtonClick() {

  },
  closeDialog(val) {
    console.log(val);
val=false;
console.log(val,2);
  }
}
};
</script>
<style lang="sass" >
   
</style>
