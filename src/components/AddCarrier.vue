<template>
  <q-page>
    <div class="bg-white full-width">
      <CustomBar
        :dialogName="'Add Carrier'"
        @closeDialog="$emit('closeDialog', false)"
      />
      <div class="mobile-container-page form-color">
        <q-form
          class="q-px-lg"
          style="height: calc(100vh - 51px)"
          ref="carrierForm"
        >
          <div class="full-width rounded bg-white">
            <div class="rounded">
              <q-input
                dense
                borderless
                class="required input-style input-overlay "
                v-model="carrier.name"
                label="Carrier Name"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Please fill the carrier name'
                ]"
              />

              <div class="row justify-between">
                <q-select
                  dense
                  borderless
                  class="input-style input-overlay col-5"
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
                  borderless
                  class="input-style input-overlay required col-6"
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
                borderless
                class="input-style input-overlay required"
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
              <div class="row q-mx-sm">
                <p class="q-mx-none q-my-auto">
                  <label> Can Claim be Filed by email</label>
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="carrier.meta.claimFiledByEmail"
                />
              </div>
            </div>
            <div class="q-mt-sm">
              <p class="form-heading q-mx-sm">Carrier's Address</p>
              <AutoCompleteAddress
                :address="carrier.address"
                :isDropBoxEnable="false"
                :isChecksEnable="false"
                :value="true"
              />
            </div>
            <div>
              <div class="q-mt-md">
                <p class="form-heading q-mx-sm">Contact Info</p>

                <div class="q-mt-sm">
                  <q-select
                    dense
                    borderless
                    v-model="carrier.contact.honorific.value"
                    :options="titles"
                    option-label="value"
                    label="Title"
                    option-value="id"
                    @input="setTitleName(carrier.contact.honorific)"
                    emit-value
                    behavior="menu"
                    map-options
                    options-dense
                    class="input-style input-overlay input-extra-padding"
                  />
                  <q-input
                    dense
                    class="input-style input-overlay"
                    borderless
                    v-model="carrier.contact.fname"
                    label="First Name"
                  />
                  <q-input
                    borderless
                    dense
                    class="input-style input-overlay"
                    v-model="carrier.contact.lname"
                    label="Last Name"
                  />
                  <div class="row justify-between">
                    <q-select
                      dense
                      borderless
                      class="input-style input-overlay col-5"
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
                      borderless
                      class="input-style input-overlay col-6"
                      v-model.number="carrier.contact.phoneNumber[0].number"
                      label="Phone1"
                      mask="(###) ###-####"
                    />
                  </div>
                  <q-input
                    class="input-style input-overlay q-mb-md"
                    dense
                    borderless
                    v-model="carrier.contact.email"
                    lazy-rules
                    :rules="[
                      val =>
                        validateNonRequiredEmail(val) ||
                        'You have entered an invalid email address!'
                    ]"
                    label="Email"
                  />
                </div>
              </div>
            </div>
            <div class=" q-mt-md">
              <p class="form-heading q-mx-sm">Other Info</p>
              <q-input
                dense
                class="input-style input-overlay"
                borderless
                v-model="carrier.info.website"
                label="Website"
                lazy-rules
                :rules="[val => validateUrl(val) || 'Please fill your website']"
              />
              <q-input
                class="input-style input-overlay q-mb-sm"
                dense
                borderless
                v-model="carrier.info.notes"
                label="Notes"
              />
            </div>
          </div>
        </q-form>
      </div>
      <div class="row justify-center">
        <q-btn
          color="primary"
          style="width:90%"
          class=" q-mt-md single-next-button-style text-capitalize"
          @click="onAddCarrierButtonClick"
          size="'xl'"
          :label="isEdit ? 'SAVE' : 'Add Carrier'"
        >
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import AddressService from '@utils/country';
const addressService = new AddressService();
import { mapGetters, mapActions } from 'vuex';
import { constants } from '@utils/constant';
import { sendPhoneNumber } from '@utils/clickable';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import CustomBar from 'components/CustomBar';
import {
  validateEmail,
  validateNonRequiredEmail,
  validateUrl
} from '@utils/validation';

export default {
  name: 'AddCarrier',

  props: {
    isEdit: {
      type: Boolean
    },
    selectedIndustryType: {
      type: String
    }
  },

  components: { AutoCompleteAddress, CustomBar },

  data() {
    return {
      constants: constants,
      options: '',
      countries: [],
      states: [],
      carrier: {
        id: '',
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
        address: {
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
        info: {
          website: '',
          notes: ''
        }
      }
    };
  },

  computed: {
    ...mapGetters(['contactTypes', 'titles', 'selectedCarrier'])
  },

  mounted() {
    if (this.isEdit) {
      this.carrier.name = this.selectedCarrier.name;
      this.carrier.email = this.selectedCarrier.email;
      this.carrier.phoneNumber[0].number = this.selectedCarrier.phoneNumber[0].number;
      this.carrier.phoneNumber[0].type = this.selectedCarrier.phoneNumber[0].type;
      if (this.selectedCarrier.address) {
        this.carrier.address = this.selectedCarrier.address;
      }
      this.carrier.contact.fname = this.selectedCarrier.contact.fname;
      this.carrier.contact.lname = this.selectedCarrier.contact.lname;
      this.carrier.contact.phoneNumber = this.selectedCarrier.contact.phoneNumber;
      this.carrier.contact.email = this.selectedCarrier.contact.email;
      this.carrier.info.website = this.selectedCarrier.info.website;
      this.carrier.info.notes = this.selectedCarrier.info.notes;
    }
    this.getTitles();
    this.getContactTypes();
  },

  methods: {
    ...mapActions([
      'addCarrier',
      'getTitles',
      'getContactTypes',
      'getCarriers',
      'getCarrierDetails',
      'editCarrierInfo'
    ]),
    validateEmail,
    validateUrl,
    validateNonRequiredEmail,
    sendPhoneNumber,
    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.id === selectedTitle.id;
      });

      selectedTitle.value = selected.title;
      selectedTitle.machineValue = selected.machineValue;
    },

    async onAddCarrierButtonClick() {
      const success = await this.$refs.carrierForm.validate();
      const payload = {
        id: this.carrier.id,
        name: this.carrier.name,
        email: this.carrier.email,
        phoneNumber: [
          {
            type: this.carrier.phoneNumber[0].type,
            number: sendPhoneNumber(this.carrier.phoneNumber[0].number)
          }
        ],
        meta: {
          claimFiledByEmail: this.carrier.meta.claimFiledByEmail
        },
        contact: {
          fname: this.carrier.contact.fname,
          lname: this.carrier.contact.lname,
          email: this.carrier.contact.email,
          honorific: {
            id: this.carrier.contact.honorific.id,
            value: this.carrier.contact.honorific.value,
            machineValue: this.carrier.contact.honorific.machineValue
          },
          phoneNumber: [
            {
              type: this.carrier.contact.phoneNumber[0].type,
              number: sendPhoneNumber(
                this.carrier.contact.phoneNumber[0].number
              )
            }
          ]
        },
        address: this.carrier.address,
        info: {
          website: this.carrier.info.website,
          notes: this.carrier.info.notes
        }
      };

      if (success) {
        if (!this.isEdit) {
          if (!this.carrier.address.address1) {
            delete payload.address;
          }
          const response = await this.addCarrier(payload);
          this.getCarriers();
          if (response.id) {
            this.carrier.id = response.id;
            payload.id = response.id;
            if (this.claimCarrier) {
              this.$emit('onAddCarrier', this.carrier.id);
            }
            this.$emit('closeDialog', true);
            this.$emit('onCloseAddCarrier', payload);
          }
        } else {
          this.carrier.id = this.selectedCarrier.id;
          payload.id = this.selectedCarrier.id;
          await this.editCarrierInfo(payload);
          this.getCarrierDetails(this.carrier.id);
          this.$emit('closeDialog', true);
        }
      }
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
