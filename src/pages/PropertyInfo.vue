<template>
  <q-page>
      <div>
    <div class="actions-div"> 
   
     
  <div class="q-mt-xl"> <q-btn class=" " @click="addNewPropertyDialog = true" flat
          ><img src="~assets/add.svg"
        /></q-btn></div></div>
     </div>
    <div class="q-pa-md">
   <!-- This is for showing the Property details  -->
    <div class="mobile-container-page">
  <div
          class="clients-list  full-width  "
          v-for="i in setClientProperty.length"
          :key="setClientProperty.id"
        > <div class="q-pl-lg">
          <div class="row ">
            <span class="form-heading col-10">Property Name</span><br />
            <q-icon
            size="xs"
             name="create"
              color="primary"
              class=" col q-pt-xs"
              @click="editClientInfoDailog = true"
            ></q-icon>
          </div>

          {{
            setClientProperty[i - 1].attributes.name
              ? setClientProperty[i - 1].attributes.name
              : '-'
          }}<br />

          {{
            setClientProperty[i - 1].attributes.streetAddress
              ? setClientProperty[i - 1].attributes.streetAddress
              : '-'
          }}<br />
          {{
            setClientProperty[i - 1].attributes.addressRegion
              ? setClientProperty[i - 1].attributes.addressRegion
              : '-'
          }}
          {{
            setClientProperty[i - 1].attributes.addressCountry
              ? setClientProperty[i - 1].attributes.addressCountry
              : '-'
          }}<br />
          {{
            setClientProperty[i - 1].attributes.addressLocality
              ? setClientProperty[i - 1].attributes.addressLocality
              : '-'
          }}<br />
          {{
            setClientProperty[i - 1].attributes.houseNumber
              ? setClientProperty[i - 1].attributes.houseNumber
              : '-'
          }}<br />

          <span class="form-heading ">Property Type</span><br />
          {{
            setClientProperty[i - 1].type ? setClientProperty[i - 1].type : '-'
          }}<br />
          <q-separator />
          <span class="form-heading">Claim </span><br />
          <span class="form-heading"
            >Current Phase:
           <span class="form-heading ">   {{
           claimsData.status
          }}</span>
          <br/> </span>
          {{
              claimsData.number
               
            }}<br/>
          
          {{
            claimsData.fileNumber
           }}<br />

       
        <span class="form-heading ">   {{
            claimsData.phase
          }}</span>
          </br/>
          <q-separator class="q-mt-md"/>
        </div>
        <q-separator class="q-mt-lg"/>
        </div>
        </div>
      
 <!-- This Dialog Box is for adding a new property  -->

<q-dialog
          v-model="addNewPropertyDialog"
          persistent
          :maximized="true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <CustomBar
            />
              <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="addNewPropertyDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Add New Property
            </div>
          </q-toolbar>
        </q-header>
            <div class="mobile-container-page-without-search q-ma-sm">
              <q-form ref="propertyAddressForm" class="form-height">
                <q-input
                  class="full-width"
                  v-model="propertyName"
                  label=" Property Name"
                />
                <q-select
                  class="required"
                  v-model="property.id"
                  option-value="id"
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
                />
                <AutoCompleteAddress
                  :address="propertyAddressDetails"
                  :isDropBoxEnable="false"
                  :isChecksEnable="true"
                  :isAsteriskMark="true"
                />
              </q-form>
              <q-btn
                label="Save"
                color="primary"
                class="button-width-90"
                @click="onSaveButtonClick"
                size="'xl'"
              />
            </div>
          </q-card>
        </q-dialog>
      </div>
    </div>
   
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  name: 'PropertyInfo',

  data() {
    return {
      propertyAddressDetails: {
        houseNumber: '',
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
      addNewPropertyDialog: false,
      propertyName: '',
      property: {
        value: '',
        id: '',
        machineValue: ''
      }
    };
  },
  components: { CustomBar, AutoCompleteAddress },
  created() {
  this.getPropertyTypes();
 this.getSingleClientProperty(this.selectedClientId);
 },
  computed: {
    ...mapGetters(['setClientProperty', 'selectedClientId', 'propertyTypes','selectedClientId','claimsData'])
},

  methods: {
   ...mapActions(['getSingleClientProperty', 'getPropertyTypes','addPropertyAddress']),

    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    },
    async onSaveButtonClick() {
      let success = true;
      success = await this.$refs.propertyAddressForm.validate();
      if (success) {
           const payload = {
          id: this.selectedClientId,
          clientData: {
            name:  this.propertyName,
            addressCountry: this.propertyAddressDetails.addressCountry,
            addressLocality: this.propertyAddressDetails.addressLocality,
            addressRegion:this.propertyAddressDetails.addressRegion,
            postalCode: this.propertyAddressDetails.postalCode,
            streetAddress:  this.propertyAddressDetails.streetAddress,
            houseNumber: this.propertyAddressDetails.houseNumber,
            claims:[{
                number:"",
                fileNumber:"",
                status:"",
                phase:""
            }]
          }
           }
        await this.addPropertyAddress(payload);
        this.successMessage();
       this.addNewPropertyDialog = false;
       this.getSingleClientProperty(this.selectedClientId);
 }
    },
    successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Property Address Updated Successfully!`,
        position: 'center'
      });
    },
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin-top: 20px;
}
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
    p {
      margin: 0 0 6px;
    }
  }
}
</style>
