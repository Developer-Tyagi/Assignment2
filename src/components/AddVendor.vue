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
          <q-input
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

          <p class="form-heading">Company's Contact Person Details</p>
          <q-select
            class="required"
            v-model="vendor.contact[0].honorific.id"
            :options="titles"
            label="Title"
            option-label="value"
            option-value="id"
            map-options
            behavior="menu"
            options-dense
            emit-value
            @input="setTitleName(vendor.contact[0].honorific)"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please choose the Title'
            ]"
          />
          <q-input
            class="required"
            v-model="vendor.contact[0].fname"
            label="First Name"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please fill the first name'
            ]"
          />
          <q-input v-model="vendor.contact[0].lname" label="Last Name" />
          <div class="row justify-between">
            <q-select
              class="required col-5"
              v-model="vendor.contact[0].phoneNumber[0].type"
              :options="contactTypes"
              option-value="machineValue"
              option-label="name"
              map-options
              options-dense
              label="Type"
              emit-value
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please select phone type'
              ]"
            />
            <q-input
              class="required col-6"
              v-model.number="vendor.contact[0].phoneNumber[0].number"
              label="Phone"
              mask="(###) ###-####"
              lazy-rules
              :rules="[
                val => (val && val.length == 14) || 'Please enter phone number'
              ]"
            />
          </div>
          <q-input
            class="required"
            v-model="vendor.contact[0].email"
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

          <p class="form-heading">Company's Address</p>
          <AutoCompleteAddress
            :address="vendor.address"
            :isDropBoxEnable="false"
            :isChecksEnable="false"
          />
          <p class="form-heading">Company's Phone & Website</p>
          <div v-for="(contactInfo, index) in vendor.contact" v-if="index >= 1">
            <div class="q-mt-sm">
              <q-select
                class="required"
                v-model="contactInfo.honorific.id"
                :options="titles"
                option-label="value"
                label="Title"
                option-value="id"
                @input="setTitleName(contactInfo.honorific)"
                emit-value
                behavior="menu"
                map-options
                options-dense
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please select the Title'
                ]"
              />
              <q-input
                v-model="contactInfo.fname"
                label="First Name"
                :ref="`fname-${index}`"
              />
              <q-input v-model="contactInfo.lname" label="Last Name" />
              <div class="row justify-between">
                <q-select
                  class="required col-5"
                  v-model="contactInfo.phoneNumber[0].type"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  label="Type"
                  emit-value
                  map-options
                  options-dense
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please select phone type'
                  ]"
                />
                <q-input
                  class="required col-6"
                  v-model.number="contactInfo.phoneNumber[0].number"
                  label="Phone1"
                  mask="(###) ###-####"
                  :ref="`number-${index}`"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length == 14) || 'Please enter phone number'
                  ]"
                />
              </div>
              <q-input
                v-model="contactInfo.email"
                novalidate="true"
                label="Email"
              />
            </div>
          </div>
          <div class="row">
            <q-btn
              outline
              class="q-mt-sm"
              @click="addAnotherContact"
              color="primary"
              label="Add"
              style="margin-right: auto"
            />

            <q-btn
              outline
              @click="removeAnotherContact"
              class="q-mt-sm"
              color="primary"
              label="Remove"
              v-if="isShowRemoveButton"
            />
          </div>

          <q-input v-model="vendor.info.website" label="Website" />
          <q-input v-model="vendor.info.notes" label="Notes" />
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
import { validateEmail } from '@utils/validation';

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
        industry: { value: null, id: '', machineValue: '' },

        meta: {
          claimFiledByEmail: false
        },
        contact: [
          {
            fname: '',
            lname: '',
            email: '',
            honorific: {
              id: '',
              value: '',
              machineValue: ''
            },
            phoneNumber: [
              {
                type: '',
                number: ''
              }
            ],
            isPrimary: true
          },
          {
            fname: '',
            lname: '',
            email: '',
            honorific: {
              id: '',
              value: '',
              machineValue: ''
            },
            phoneNumber: [
              {
                type: '',
                number: ''
              }
            ]
          }
        ],
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
    console.log(this.componentName);
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
        o => o.name === this.selectedIndustryType
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
      'getContactTypes'
    ]),
    validateEmail,

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

    removeAnotherContact() {
      const len = this.vendor.contact.length;
      if (len === 3) {
        this.isShowRemoveButton = false;
      }

      this.vendor.contact.pop();
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

    addAnotherContact() {
      const len = this.vendor.contact.length;
      if (
        this.vendor.contact[len - 1].fname &&
        this.vendor.contact[len - 1].phoneNumber[0].number
      ) {
        this.isShowRemoveButton = true;
        this.vendor.contact.push({
          fname: '',
          lname: '',
          email: '',
          honorific: {
            id: '',
            value: '',
            machineValue: ''
          },
          phoneNumber: [
            {
              type: '',
              number: ''
            }
          ]
        });
      } else {
        if (!this.vendor.contact[len - 1].fname) {
          this.$nextTick(() => {
            this.$refs[`fname-${len - 1}`][0].$el.focus();
          });
        } else if (!this.vendor.contact[len - 1].phoneNumber[0].number) {
          this.$nextTick(() => {
            this.$refs[`number-${len - 1}`][0].$el.focus();
          });
        }
        this.$q.notify({
          message: 'Please fill this detail first',
          position: 'top',
          type: 'negative'
        });
      }
    },

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    async onAddVendorButtonClick() {
      const success = await this.$refs.vendorForm.validate();
      if (success) {
        const response = await this.addVendor(this.vendor);
        if (response) {
          if (this.vendor.industry.value === 'Carrier') {
            let params = {
              industry: 'carrier',
              name: ''
            };
            await this.getVendors(params);

            const selected = this.vendors.find(obj => {
              return obj.name === this.vendor.name;
            });

            this.$emit(
              'onCloseAddVendor',
              true,
              selected,
              this.vendor.industry.value
            );
          }
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
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin: 24px 0;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
