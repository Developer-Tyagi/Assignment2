<template>
  <q-page>
    <div class="bg-white full-width">
      <CustomBar
        :dialogName="'Add ' + componentName"
        @closeDialog="closeDialog(false)"
      />
      <q-form
        class="q-pa-lg"
        style="height: calc(100vh - 51px)"
        ref="vendorForm"
      >
        <div
          class="full-width"
          style="
            height: calc(100vh - 145px);
            overflow-y: auto;
            margin-bottom: 10px;
          "
        >
          <q-card class="q-ma-xs q-pa-sm">
            <q-input
              dense
              class="required"
              v-model="vendor.name"
              label=" Company Name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the company name'
              ]"
            />
            <div>
              <q-select
                dense
                class="full-width required"
                v-model="vendor.industry.value"
                use-input
                input-debounce="0"
                option-label="name"
                label=" Industry"
                :options="options"
                option-value="name"
                @filter="searchFilterBy"
                @input="setVendorIndustryName"
                behavior="menu"
                options-dense
                emit-value
                :disable="!industryFilterDisabled"
                lazy-rules
                options-dense
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Please select the industry type'
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
            </div>
            <div class="row justify-between">
              <q-select
                dense
                class="col-5"
                v-model="vendor.phoneNumber[0].type"
                :options="contactTypes"
                option-value="machineValue"
                option-label="name"
                map-options
                options-dense
                behavior="menu"
                label="Type"
                emit-value
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please select phone type'
                ]"
              />
              <q-input
                dense
                class="required col-6"
                v-model.number="vendor.phoneNumber[0].number"
                label="Phone"
                mask="(###) ###-####"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length == 14) || 'Please enter phone number'
                ]"
              />
            </div>
            <q-input
              dense
              class="required"
              v-model="vendor.email"
              type="email"
              label="Email"
              lazy-rules
              :rules="[
                val =>
                  validateEmail(val) ||
                  'You have entered an invalid email address!'
              ]"
            />
            <div
              class="row"
              v-if="componentName === constants.industries.CARRIER"
            >
              <p class="q-mx-none q-my-auto">
                <label> Can Claim be Filed by email</label>
              </p>
              <q-toggle
                class="q-ml-auto"
                v-model="vendor.meta.claimFiledByEmail"
              />
            </div>
          </q-card>
          <q-card class="q-ma-xs q-pa-sm q-mt-md">
            <p class="form-heading">Company's Address</p>
            <AutoCompleteAddress
              :id="'AddVendor'"
              :address="vendor.address"
              :isDropBoxEnable="false"
              :isChecksEnable="false"
              :value="true"
            />
          </q-card>
          <div>
            <q-card class="q-ma-xs q-pa-sm q-mt-md">
              <p class="form-heading">Contact Info</p>

              <div class="q-mt-sm">
                <q-select
                  dense
                  v-model="vendor.contact.honorific.id"
                  :options="titles"
                  option-label="value"
                  label="Title"
                  option-value="id"
                  @input="setTitleName(vendor.contact.honorific)"
                  emit-value
                  behavior="menu"
                  map-options
                  options-dense
                  class="input-extra-padding"
                />
                <q-input
                  dense
                  v-model="vendor.contact.fname"
                  label="First Name"
                />
                <q-input
                  dense
                  v-model="vendor.contact.lname"
                  label="Last Name"
                />
                <div class="row justify-between">
                  <q-select
                    dense
                    class="col-5"
                    v-model="vendor.contact.phoneNumber[0].type"
                    :options="contactTypes"
                    option-value="machineValue"
                    option-label="name"
                    label="Type"
                    behavior="menu"
                    emit-value
                    map-options
                    options-dense
                  />
                  <q-input
                    dense
                    class="col-6"
                    v-model.number="vendor.contact.phoneNumber[0].number"
                    label="Phone1"
                    mask="(###) ###-####"
                  />
                </div>
                <q-input
                  class="q-mb-md"
                  dense
                  v-model="vendor.contact.email"
                  novalidate="true"
                  label="Email"
                />
              </div>
            </q-card>
          </div>
          <q-card class="q-ma-xs q-pa-sm q-mt-md">
            <p class="form-heading">Other Info</p>
            <q-input
              dense
              v-model="vendor.info.website"
              label="Website"
              lazy-rules
              :rules="[val => validateUrl(val) || 'Please fill your website']"
            />
            <q-input
              class="q-mb-sm"
              dense
              v-model="vendor.info.notes"
              label="Notes"
            />
          </q-card>
        </div>

        <q-btn
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="onAddVendorButtonClick"
          size="'xl'"
        >
          Add {{ componentName }}
        </q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import AddressService from '@utils/country';
const addressService = new AddressService();
import { mapGetters, mapActions } from 'vuex';
import { constants } from '@utils/constant';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import CustomBar from 'components/CustomBar';
import { validateEmail, validateUrl, successMessage } from '@utils/validation';

export default {
  name: 'AddVendor',
  props: ['componentName', 'selectedIndustryType'],

  components: { AutoCompleteAddress, CustomBar },

  data() {
    return {
      constants: constants,
      industryFilterDisabled: false,
      options: '',
      countries: [],
      states: [],
      isShowRemoveButton: false,
      vendor: {
        name: '',
        email: '',
        industry: { value: null, id: '', machineValue: '' },
        phoneNumber: [
          {
            type: 'main',
            number: ''
          }
        ],
        meta: {
          claimFiledByEmail: false
        },
        contact: {
          fname: '',
          lname: '',
          email: '',
          honorific: {
            id: '602a5eaa312a2b57ac2b00ad',
            value: 'Mr.',
            machineValue: 'mr_'
          },
          phoneNumber: [
            {
              type: 'main',
              number: ''
            }
          ]
        },
        address: {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        info: {
          website: '',
          notes: ''
        }
      }
    };
  },

  computed: {
    ...mapGetters(['contactTypes', 'vendorIndustries', 'titles'])
  },

  mounted() {
    this.getVendorIndustries();
    this.getTitles();
    this.getContactTypes();

    if (this.componentName === constants.industries.CARRIER) {
      let industryType = this.vendorIndustries.find(
        o => o.machineValue === constants.industries.CARRIER
      );
      if (industryType.name && industryType.id) {
        this.vendor.industry.value = industryType.name;
        this.vendor.industry.id = industryType.id;
        this.vendor.industry.machineValue = industryType.machineValue;
      }
    }

    if (this.componentName === constants.industries.EXPERTVENDOR) {
      let industryType = this.vendorIndustries.find(
        o => o.machineValue === this.selectedIndustryType.machineValue
      );
      if (industryType.name && industryType.id) {
        this.vendor.industry.value = industryType.name;
        this.vendor.industry.id = industryType.id;
        this.vendor.industry.machineValue = industryType.machineValue;
      }
    } else if (
      this.componentName === constants.industries.MORTGAGE ||
      this.componentName === constants.industries.SECONDARYMORTGAGE
    ) {
      let industryType = this.vendorIndustries.find(
        o => o.machineValue === constants.industries.MORTGAGE
      );

      if (industryType.name && industryType.id) {
        this.vendor.industry.value = industryType.name;
        this.vendor.industry.id = industryType.id;
        this.vendor.industry.machineValue = industryType.machineValue;
      }
    }
  },

  methods: {
    ...mapActions([
      'addVendor',
      'getVendorIndustries',
      'getTitles',
      'getContactTypes',
      'getVendors'
    ]),
    validateEmail,
    validateUrl,
    successMessage,
    searchFilterBy(val, update) {
      this.vendor.industry.value = null;
      if (val === ' ') {
        update(() => {
          this.options = this.vendorIndustries;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.options = this.vendorIndustries.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.id === selectedTitle.id;
      });

      selectedTitle.value = selected.title;
      selectedTitle.machineValue = selected.machineValue;
    },

    setVendorIndustryName() {
      const selectedName = this.vendor.industry.value;
      const result = this.vendorIndustries.find(obj => {
        return obj.name === selectedName;
      });
      this.vendor.industry.value = result.name;

      this.vendor.industry.id = result.id;
      this.vendor.industry.machineValue = result.machineValue;
    },

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    async onAddVendorButtonClick() {
      const success = await this.$refs.vendorForm.validate();
      if (success) {
        const response = await this.addVendor(this.vendor);
        this.successMessage(constants.successMessages.VENDOR);
        if (response) {
          this.vendor.id = response.id;
          this.$emit('onCloseAddVendor', true, this.vendor, this.componentName);
          this.closeDialog(true);
        }
      }
    },

    closeDialog(flag) {
      this.$emit('closeDialog', flag);
    }
  },

  created() {
    if (this.componentName == constants.industries.VENDOR) {
      this.industryFilterDisabled = true;
    }
    if (this.componentName == constants.industries.EXPERTVENDOR) {
      this.industryFilterDisabled = false;
    }

    this.options = this.vendorIndustries;
    this.countries = addressService.getCountries();
    this.onCountrySelect('United States');
  }
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
