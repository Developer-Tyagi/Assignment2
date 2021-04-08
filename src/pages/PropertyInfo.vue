<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-btn @click="addNewPropertyDialog = true" flat class="q-ml-auto"
          ><img src="~assets/add.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page form-height ">
        <div class="clients-list" v-if="setClientProperty.length">
          <!-- This is for showing the Property details  -->
          <div
            class="clients-list"
            v-for="i in setClientProperty.length"
            :key="setClientProperty.id"
          >
            <div v-if="setClientProperty">
              <div class="row  justify-end">
                <div class="col-5 row justify-between">
                  <q-btn
                    class="  q-mt-sm"
                    color="primary"
                    style="width:90px; font-size:9px;"
                    @click="
                      $router.push(`/add-claim/${setClientProperty[i - 1].id}`)
                    "
                  >
                    Add Claim</q-btn
                  >
                  <q-icon
                    size="sm"
                    name="create"
                    color="primary"
                    class=" q-mx-md q-mt-xs"
                    @click="editClientInfoDailog = true"
                  ></q-icon>
                </div>
              </div>
              <div class="client-list-item">
                <span class="form-heading">
                  {{
                    setClientProperty[i - 1].attributes.name
                      ? setClientProperty[i - 1].attributes.name
                      : '-'
                  }}
                </span>

                <br />
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
                <q-separator
                  v-if="setClientProperty[i - 1].attributes.claims"
                />
                <div
                  class="q-mt-sm"
                  v-for="claim in setClientProperty[i - 1].attributes.claims"
                  :key="claim.id"
                >
                  <q-item-section @click="onClickClaimNumber(claim)">
                    <div class="row">
                      <span class="text-bold">Last Updated on : </span>
                      {{ claim.updated | moment('DD/MM/YYYY') }}
                      <q-badge class="q-ml-auto">{{
                        claim.status ? claim.status : '-'
                      }}</q-badge
                      ><br />
                    </div>
                    <div class="text-bold q-mt-xs">File Number:</div>
                    {{ claim.fileNumber ? claim.fileNumber : '-' }}
                    <span class="text-bold q-mt-xs">Claim Number: </span
                    ><span @click="onClickClaimNumber(claim)" class="click-link"
                      >{{ claim.number ? claim.number : '-' }}
                    </span>

                    <div class="text-bold q-mt-xs">
                      Current Phase:
                    </div>
                    {{ claim.phase ? claim.phase : '-' }}
                  </q-item-section>
                  <q-separator />
                </div>
              </div>
              <q-separator />
            </div>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div class="column absolute-center">
            <div style="color: #666666,align-items: center">
              You haven't added a property yet.
            </div>

            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              width="130px"
              height="100px"
              @click="addNewPropertyDialog = true"
            />
          </div>
        </div>
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
          @closeDialog="addNewPropertyDialog = false"
          :dialogName="'Add New Property'"
        />
        <div class="mobile-container-page-without-search q-pa-md">
          <q-form ref="propertyAddressForm" class="form-height">
            <q-input
              dense
              class="full-width"
              v-model="propertyName"
              label=" Property Name"
            />
            <q-select
              dense
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
                  (val && val.length > 0) || 'Please select the property type'
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
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import moment from 'moment';
import { successMessage } from '@utils/validation';

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
    if (!this.selectedClientId) {
      this.$router.push('/clients');
    }
    this.getPropertyTypes();
    this.getSingleClientProperty(this.selectedClientId);
  },
  computed: {
    ...mapGetters([
      'setClientProperty',
      'selectedClientId',
      'propertyTypes',
      'selectedClientId',
      'selectedClaimId'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },
  methods: {
    ...mapActions([
      'getSingleClientProperty',
      'getPropertyTypes',
      'addPropertyAddress'
    ]),
    ...mapMutations(['setSelectedClaimId']),
    onClickClaimNumber(claim) {
      this.setSelectedClaimId(claim.id);

      this.$router.push('/claim-details');
    },
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
            name: this.propertyName,
            addressCountry: this.propertyAddressDetails.addressCountry,
            addressLocality: this.propertyAddressDetails.addressLocality,
            addressRegion: this.propertyAddressDetails.addressRegion,
            postalCode: this.propertyAddressDetails.postalCode,
            streetAddress: this.propertyAddressDetails.streetAddress,
            houseNumber: this.propertyAddressDetails.houseNumber
          }
        };
        await this.addPropertyAddress(payload);

        this.successMessage('Property Address Updated Successfully!');
        this.addNewPropertyDialog = false;
        this.propertyName = '';
        this.propertyAddressDetails.addressCountry = '';
        this.propertyAddressDetails.addressLocality = '';
        this.propertyAddressDetails.addressRegion = '';
        this.propertyAddressDetails.postalCode = '';
        this.propertyAddressDetails.streetAddress = '';
        this.propertyAddressDetails.houseNumber = '';
        this.property.id = '';
        this.property.value = '';
        this.property.machineValue = '';

        this.getSingleClientProperty(this.selectedClientId);
        this.$router.push('/property-details');
      }
    },
    successMessage
  }
};
</script>

<style lang="scss">
.form-height {
  height: calc(100vh - 150px);
  overflow: auto;
  margin: 10px;
}
</style>
