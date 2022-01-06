<template>
  <q-page>
    <div class="bg-white full-width">
      <CustomBar
        :dialogName="componentName"
        @closeDialog="$emit('closeDialog', false)"
      />
      <div class="mobile-container-page form-color">
        <q-form
          class="q-px-lg"
          style="height: calc(100vh - 51px)"
          ref="vendorForm"
        >
          <div class="full-width rounded bg-white">
            <div class="rounded">
              <q-input
                dense
                class="input-style input-overlay required"
                borderless
                v-model="vendor.companyName"
                label=" Company Name"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Please fill the company name'
                ]"
              />
              <div>
                <q-select
                  dense
                  borderless
                  class="input-style input-overlay required"
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
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please select the industry type '
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
                  borderless
                  class="input-style input-overlay col-5"
                  v-model="vendor.phoneNumber.type"
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
                  borderless
                  dense
                  class="input-style input-overlay required col-6"
                  v-model.number="vendor.phoneNumber.number"
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
                borderless
                dense
                class="input-style input-overlay required"
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
            </div>
            <div class="q-mt-md">
              <p class="q-px-sm form-heading">Company's Address</p>
              <AutoCompleteAddress
                :id="'AddVendor'"
                :address="vendor.mailingAddress"
                :isDropBoxEnable="false"
                :isChecksEnable="false"
                :value="true"
                :view="'mobile'"
              />
            </div>
            <div>
              <div class="q-py-sm q-mt-md">
                <p class="form-heading q-mx-sm">Contact Info</p>

                <div class="q-mt-sm">
                  <q-select
                    borderless
                    v-model="vendor.contact.honorific.value"
                    :options="titles"
                    option-label="value"
                    label="Title"
                    option-value="value"
                    @input="setTitleName(vendor.contact.honorific)"
                    emit-value
                    behavior="menu"
                    map-options
                    options-dense
                    class="input-style input-overlay input-extra-padding"
                  />
                  <q-input
                    borderless
                    class="input-overlay input-style"
                    v-model="vendor.contact.fname"
                    label="First Name"
                  />
                  <q-input
                    borderless
                    class="input-style input-overlay"
                    v-model="vendor.contact.lname"
                    label="Last Name"
                  />
                  <div class="row justify-between">
                    <q-select
                      borderless
                      class="input-style input-overlay col-5"
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
                      borderless
                      class="input-style input-overlay col-6"
                      v-model.number="vendor.contact.phoneNumber[0].number"
                      label="Phone1"
                      mask="(###) ###-####"
                    />
                  </div>
                  <q-input
                    borderless
                    class="input-style input-overlay q-mb-md"
                    dense
                    v-model="vendor.contact.email"
                    label="Email"
                    lazy-rules
                    :rules="[
                      val =>
                        validateNonRequiredEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="q-py-sm q-mt-md">
              <p class="form-heading q-mx-sm">Other Info</p>
              <q-input
                dense
                borderless
                class="input-style input-overlay"
                v-model="vendor.website"
                label="Website"
                lazy-rules
                :rules="[val => validateUrl(val) || 'Please fill your website']"
              />
              <q-input
                borderless
                class="input-style q-mb-sm input-overlay"
                type="textarea"
                v-model="vendor.notes"
                label="Notes"
              />
            </div>
          </div>
        </q-form>
      </div>
      <div class="row justify-center">
        <q-btn
          color="primary"
          class="q-mt-md single-next-button-style text-capitalize"
          @click="onAddVendorButtonClick"
          :label="isEdit ? 'SAVE' : 'Add Vendor'"
        >
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { constants } from '@utils/constant';
import { sendPhoneNumber } from '@utils/clickable';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import CustomBar from 'components/CustomBar';
import {
  validateEmail,
  validateNonRequiredEmail,
  validateUrl,
  successMessage
} from '@utils/validation';

export default {
  name: 'AddVendor',

  props: {
    isEdit: {
      type: Boolean
    },
    componentName: {
      type: String
    },
    industryValue: {
      type: Object
    },
    selectedIndustryType: {
      type: String
    }
  },
  components: { AutoCompleteAddress, CustomBar },

  data() {
    return {
      constants: constants,
      industryFilterDisabled: false,
      options: '',
      isShowRemoveButton: false,
      vendor: {
        type: 'user',
        email: '',
        phoneNumber: {
          type: 'main',
          number: ''
        },
        contact: {
          fname: '',
          lname: '',
          email: '',
          honorific: {
            id: '',
            value: 'Mr',
            machineValue: 'mr'
          },

          phoneNumber: [
            {
              type: 'main',
              number: ''
            }
          ]
        },
        roles: [
          {
            value: 'Vendor',
            machineValue: 'vendor'
          }
        ],
        mailingAddress: {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          address1: '',
          address2: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        id: '',
        companyName: '',

        industry: { value: null, id: '', machineValue: '' },

        meta: {
          claimFiledByEmail: false
        },

        website: '',
        notes: ''
      }
    };
  },

  computed: {
    ...mapGetters([
      'contactTypes',
      'vendorIndustries',
      'titles',
      'selectedVendor'
    ])
  },

  mounted() {
    if (this.isEdit) {
      if (this.selectedVendor.industry) {
        this.vendor.industry = this.selectedVendor.industry;
      }

      this.vendor.contact.honorific = this.selectedVendor.contact.honorific;

      this.vendor.companyName = this.selectedVendor.companyName;
      this.vendor.email = this.selectedVendor.email;
      this.vendor.phoneNumber.number = this.selectedVendor.phoneNumber.number;
      this.vendor.phoneNumber.type = this.selectedVendor.phoneNumber.type;
      if (this.selectedVendor.mailingAddress) {
        this.vendor.mailingAddress = this.selectedVendor.mailingAddress;
      }
      this.vendor.contact.fname = this.selectedVendor.contact.fname;
      this.vendor.contact.lname = this.selectedVendor.contact.lname;
      this.vendor.contact.phoneNumber = this.selectedVendor.contact.phoneNumber;
      this.vendor.contact.email = this.selectedVendor.contact.email;
      this.vendor.website =
        this.selectedVendor && this.selectedVendor.website
          ? this.selectedVendor.website
          : '';
      this.vendor.notes =
        this.selectedVendor && this.selectedVendor.notes
          ? this.selectedVendor.notes
          : '';
    }
    this.getTitles();
  },

  methods: {
    ...mapActions([
      'addVendor',
      'getVendorIndustries',
      'getTitles',
      'getContactTypes',
      'getVendors',
      'getVendorDetails',
      'editVendorInfo'
    ]),
    validateEmail,
    validateNonRequiredEmail,
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
        return obj.value === selectedTitle.value;
      });

      selectedTitle.id = selected.id;
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

    async onAddVendorButtonClick() {
      const success = await this.$refs.vendorForm.validate();

      const payload = {
        type: 'user',
        email: this.vendor.email,
        phoneNumber: {
          type: this.vendor.phoneNumber.type,
          number: sendPhoneNumber(this.vendor.phoneNumber.number)
        },
        contact: {
          fname: this.vendor.contact.fname,
          lname: this.vendor.contact.lname,
          email: this.vendor.contact.email,
          honorific: {
            id: this.vendor.contact.honorific.id,
            value: this.vendor.contact.honorific.value,
            machineValue: this.vendor.contact.honorific.machineValue
          },

          phoneNumber: [
            {
              type: this.vendor.contact.phoneNumber[0].type,
              number: sendPhoneNumber(this.vendor.contact.phoneNumber[0].number)
            }
          ]
        },
        roles: [
          {
            value: 'Vendor',
            machineValue: 'vendor'
          }
        ],
        mailingAddress: this.vendor.mailingAddress,
        id: this.vendor.id,
        companyName: this.vendor.companyName,

        industry: {
          value: this.vendor.industry.value,
          id: this.vendor.industry.id,
          machineValue: this.vendor.industry.machineValue
        },

        meta: {
          claimFiledByEmail: this.vendor.claimFiledByEmail
        },

        website: this.vendor.website,
        notes: this.vendor.notes
      };

      if (success) {
        if (!this.isEdit) {
          if (!this.vendor.mailingAddress.address1) {
            delete payload.mailingAddress;
          }

          const response = await this.addVendor(payload);
          this.getVendors();
          if (response.id) {
            this.vendor.id = response.id;
            payload.id = response.id;
            this.$emit('onCloseAddVendor', payload);
            this.$emit('closeDialog', true);
          }
        } else {
          this.vendor.id = this.selectedVendor.id;
          payload.id = this.selectedVendor.id;

          await this.editVendorInfo(payload);
          this.$emit('closeDialog', true);
          this.getVendorDetails(this.vendor.id);
        }
      }
    }
  },

  created() {
    this.getContactTypes();
    this.industryFilterDisabled = true;
    this.options = this.vendorIndustries;
    if (this.industryValue) {
      this.vendor.industry.value = this.industryValue.name;
      this.vendor.industry.machineValue = this.industryValue.machineValue;
      this.industryFilterDisabled = false;
    }
  }
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
