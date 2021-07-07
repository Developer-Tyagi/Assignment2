<template>
  <q-page>
    <div class="bg-white full-width">
      <CustomBar
        :dialogName="'Add Vendor'"
        @closeDialog="$emit('closeDialog', false)"
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
              v-model="vendor.companyName"
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
                dense
                class="required col-6"
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
          </q-card>
          <q-card class="q-ma-xs q-pa-sm q-mt-md">
            <p class="form-heading">Company's Address</p>
            <AutoCompleteAddress
              :id="'AddVendor'"
              :address="vendor.mailingAddress"
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
                  v-model="vendor.contact.honorific.value"
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
              v-model="vendor.website"
              label="Website"
              lazy-rules
              :rules="[val => validateUrl(val) || 'Please fill your website']"
            />
            <q-input
              class="q-mb-sm"
              dense
              v-model="vendor.notes"
              label="Notes"
            />
          </q-card>
        </div>

        <q-btn
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="onAddVendorButtonClick"
          size="'xl'"
          :label="isEdit ? 'SAVE' : 'Add Vendor'"
        >
        </q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { constants } from '@utils/constant';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import CustomBar from 'components/CustomBar';
import { validateEmail, validateUrl, successMessage } from '@utils/validation';

export default {
  name: 'AddVendor',

  props: {
    isEdit: {
      type: Boolean
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
            id: '602a5eaa312a2b57ac2b00ad',
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
          streetAddress: '',
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

    async onAddVendorButtonClick() {
      const success = await this.$refs.vendorForm.validate();
      if (success) {
        if (!this.isEdit) {
          if (!this.vendor.mailingAddress.streetAddress) {
            delete this.vendor.mailingAddress;
          }
          const response = await this.addVendor(this.vendor);
          this.getVendors();
          if (response.id) {
            this.vendor.id = response.id;
            this.$emit('onCloseAddVendor', this.vendor);
            this.$emit('closeDialog', true);
          }
        } else {
          this.vendor.id = this.selectedVendor.id;
          await this.editVendorInfo(this.vendor);
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
