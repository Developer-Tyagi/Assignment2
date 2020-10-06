<template>
    <q-page>
    <h5>ADD NEW LEAD</h5>
      <q-option-group
        v-model="panel"
        inline
        :options=addLeadTabs
      ></q-option-group>
<q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
      <q-tab-panel name="primary">   
      <q-input v-model="fname" label="First Name"/>
      <q-input v-model="lname" label="Last Name"/>
      <q-input v-model="phone" label="Phone"/>
      <q-input v-model="mobile" label="Mobile"/>
      <q-input v-model="email" label="Email"/>
      <q-toggle v-model="isOrg" label="Is policyholder an organisation?" left-label></q-toggle>
      <div v-if="isOrg">
            <q-input v-model="organisation" label="Organisation Name"/>
       </div>    
       </q-tab-panel>
        <q-tab-panel name="lossDetails">
          <label>Loss Details</label>
          <q-input v-model="lossDesc" label="Brief description of loss"/>
          <br>
          <label>Loss Location</label>
          <q-input v-model="address1" label="Address1"/>
          <q-input v-model="address2" label="Address2"/>
          <q-select v-model="city" :options=[] label="City"></q-select>
          <q-select v-model="state" :options=[] label="State"></q-select>
           <q-select v-model="country" :options=[] label="State"></q-select>
          <q-input v-model="zipcode" label="ZIP Code"/>
        </q-tab-panel>

        <q-tab-panel name="insurance">
          <label>Insurance Details</label>
          <q-input v-model="carrier" label="Carrier Name"/>
          <q-input v-model="policyNumber" label="Policy Number"/>
          <br>
          <label>Scheduling</label>
           <br>
         <q-toggle v-model="isScheduling" label="Is automatic scheduling needed?" left-label></q-toggle>
        </q-tab-panel>
      <q-tab-panel name="other">
          <q-input v-model="notes" label="Notes"/>
          <br>
          <label>Additional info good to know</label>
           <q-select v-model="leadSource" :options=leadSourceList label="Choose the Lead source"></q-select>
           <q-input v-model="leadSourceDetails" label="Details"/>
        </q-tab-panel>
      </q-tab-panels>
       <div>
        <q-btn label="Back" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        <q-btn label="Add Lead" type="submit" color="primary"></q-btn>
      </div>
 </q-form>
    </q-page>   
</template>
<script>
import axios from 'axios';
export default {
  methods: {
    onSubmit () {
      console.log('entering in submit');
      // Hardcoding api end point for testing.
      axios
            .post(
              'https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1/leads',
              {
                data: {
                  type: 'leads',
                  attributes: {
                  "isOrganization": false,
          "primaryContact": {
              "fname": this.fname,
              "lname": this.lname,
              "email": this.email,
              "phoneNumber": {
                  "type": "home",
                  "number": this.phone
              }
          },
          "lossLocation": {
              "addressCountry": this.country,
              "addressLocality": this.city,
              "addressRegion": this.state,
              "postOfficeBoxNumber": this.address1,
              "postalCode": this.zipcode,
              "streetAddress":  this.address1,
          },
          "lossDesc": this.lossDesc,
          "carrier": this.lossDesc,
          "policyNumber": this.policyNumber,
          "isAutomaticScheduling": this.isScheduling
                  },
                },
              },
              {
                headers: {
                  'Content-Type': 'application/vnd.api+json',
                  Accept: 'application/vnd.api+json',
                },
              }
            )
            .then((responseData) => {
              console.log(this.email)
              console.log('Successfully added lead');
            })
            .catch(function(error) {
              console.log('Error :  ' + error);
            });
            console.log('exiting in submit');
        
    },
    onReset () {
      this.$router.push('/leads');
    }
 },  
  data () {
    return {
      addLeadTabs : [
          { value: 'primary', label: 'PRIMARY CONTACT' },
          { value: 'lossDetails', label: 'LOSS DETAILS' },
          { value: 'insurance', label: 'INSURANCE & SCHEDULING' },
          { value: 'other', label: 'OTHERS' }
      ]  ,
      panel: 'primary',
      isOrg : false, 
      organisation: '',
      fname : '',
      lname: '',
      phone: '',
      mobile: '',
      email: '',
      country: '',
      lossDesc: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      carrier: '',
      policyNumber: '',
      notes: '',
      leadSourceDetails: '',
      isScheduling : false,
      leadSource : '',
      leadSourceList: [
        {
          label: 'Prior Client',
          value: 'priorClient'
        },
        {
          label: 'Vendor',
          value: 'vendor'
        },
        {
          label: 'Affliate',
          value: 'Peter'
        },
        {
          label: 'Referral',
          value: 'referral'
        },
        {
          label: 'Advertisement',
          value: 'advertisement'
        },
        {
          label: 'Google',
          value: 'google'
        }
      ],
    }
  }
}
</script>
