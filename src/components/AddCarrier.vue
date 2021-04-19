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
        ref="carrierForm"
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
              v-model="carrier.name"
              label=" Company Name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the company name'
              ]"
            />

            <div class="row justify-between">
              <q-select
                dense
                class="col-5"
                v-model="carrier.phoneNumber[0].type"
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
                v-model.number="carrier.phoneNumber[0].number"
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
              v-model="carrier.email"
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
                v-model="carrier.meta.claimFiledByEmail"
              />
            </div>
          </q-card>
          <q-card class="q-ma-xs q-pa-sm q-mt-md">
            <p class="form-heading">Company's Address</p>
            <AutoCompleteAddress
              :address="carrier.address"
              :isDropBoxEnable="false"
              :isChecksEnable="false"
              :value="true"
            />
          </q-card>
          <div>
            <q-card class="q-ma-xs q-pa-sm  q-mt-md">
              <p class="form-heading">Contact Info</p>

              <div class="q-mt-sm">
                <q-select
                  dense
                  v-model="carrier.contact.honorific.id"
                  :options="titles"
                  option-label="value"
                  label="Title"
                  option-value="id"
                  @input="setTitleName(carrier.contact.honorific)"
                  emit-value
                  behavior="menu"
                  map-options
                  options-dense
                  class="input-extra-padding"
                />
                <q-input
                  dense
                  v-model="carrier.contact.fname"
                  label="First Name"
                />
                <q-input
                  dense
                  v-model="carrier.contact.lname"
                  label="Last Name"
                />
                <div class="row justify-between">
                  <q-select
                    dense
                    class="col-5 "
                    v-model="carrier.contact.phoneNumber[0].type"
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
                    v-model.number="carrier.contact.phoneNumber[0].number"
                    label="Phone1"
                    mask="(###) ###-####"
                  />
                </div>
                <q-input
                  class="q-mb-md"
                  dense
                  v-model="carrier.contact.email"
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
              v-model="carrier.info.website"
              label="Website"
              lazy-rules
              :rules="[val => validateUrl(val) || 'Please fill your website']"
            />
            <q-input
              class="q-mb-sm"
              dense
              v-model="carrier.info.notes"
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
import { validateEmail, validateUrl } from '@utils/validation';

export default {
  name: 'AddVendor',
  props: ['componentName', 'selectedIndustryType'],

  components: { AutoCompleteAddress, CustomBar },

  data() {
    return {
      constants: constants,

      options: '',
      countries: [],
      states: [],
      carrier: {
        name: '',
        email: '',
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
    ...mapGetters(['contactTypes', 'titles'])
  },

  mounted() {
    this.getTitles();
    this.getContactTypes();
  },

  methods: {
    ...mapActions([
      'addCarrier',
      'getTitles',
      'getContactTypes',
      'getCarriers'
    ]),
    validateEmail,
    validateUrl,

    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.id === selectedTitle.id;
      });

      selectedTitle.value = selected.title;
      selectedTitle.machineValue = selected.machineValue;
    },

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    async onAddVendorButtonClick() {
      const success = await this.$refs.carrierForm.validate();

      if (success) {
        const response = await this.addCarrier(this.carrier);
        this.getCarriers();
        if (response) {
          this.carrier.id = response.id;
          this.$emit(
            'onCloseAddVendor',
            true,
            this.carrier,
            this.componentName
          );
          this.closeDialog(true);
        }
      }
    },

    closeDialog(flag) {
      this.$emit('closeDialog', flag);
    }
  },

  created() {
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
