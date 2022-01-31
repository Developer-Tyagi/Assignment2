<template>
  <q-page>
    <div class="bg-white full-width">
      <CustomBar
        :dialogName="'Add Carrier'"
        @closeDialog="$emit('closeDialog', false)"
      />
      <div class="mobile-container-page">
        <q-form class="q-pa-md" ref="carrierForm">
          <q-card class="bg-white q-pa-sm q-px-md">
            <div class="rounded">
              <q-input
                dense
                :disable="isDisabled()"
                borderless
                class="required input-style input-overlay"
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
                  :disable="isDisabled()"
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
                  :disable="contactOnly"
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
                :disable="contactOnly"
                borderless
                class="input-style input-overlay"
                v-model="carrier.email"
                type="email"
                label="Email"
                lazy-rules
                :rules="[
                  val =>
                    validateNonRequiredEmail(val) ||
                    'You have entered an invalid email address!'
                ]"
              />
              <div class="row q-mt-sm justify-between">
                <div class="q-my-auto">Can Claim be Filed by email</div>
                <q-toggle v-model="carrier.meta.claimFiledByEmail" />
              </div>
            </div>
            <div class="">
              <div class="form-heading">Carrier's Address</div>
              <div class="q-mt-xs">
                <AutoCompleteAddress
                  :id="'CarrierAddress'"
                  :readOnly="isDisabled()"
                  :address="carrier.address"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                  :value="true"
                  :view="'mobile'"
                />
              </div>
            </div>
            <div>
              <div class="q-mt-md">
                <p class="form-heading">Contact Info</p>

                <div class="q-mt-sm">
                  <q-select
                    borderless
                    :disable="isDisabled()"
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
                    class="input-style input-overlay"
                    borderless
                    :disable="isDisabled()"
                    v-model="carrier.contact.fname"
                    label="First Name"
                  />
                  <q-input
                    borderless
                    class="input-style input-overlay"
                    v-model="carrier.contact.lname"
                    :disable="isDisabled()"
                    label="Last Name"
                  />
                  <div class="row justify-between">
                    <q-select
                      borderless
                      class="input-style input-overlay col-5"
                      v-model="carrier.contact.phoneNumber[0].type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      :disable="isDisabled()"
                      label="Type"
                      behavior="menu"
                      emit-value
                      map-options
                      options-dense
                    />
                    <q-input
                      borderless
                      class="input-style input-overlay col-6"
                      v-model.number="carrier.contact.phoneNumber[0].number"
                      label="Phone1"
                      :disable="isDisabled()"
                      mask="(###) ###-####"
                    />
                  </div>
                  <q-input
                    class="input-style input-overlay q-mb-md"
                    dense
                    :disable="isDisabled()"
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
            <div class="q-mt-md">
              <p class="form-heading">Other Info</p>
              <q-input
                dense
                class="input-style input-overlay"
                borderless
                :disable="isDisabled()"
                v-model="carrier.info.website"
                label="Website"
                lazy-rules
                :rules="[val => validateUrl(val) || 'Please fill your website']"
              />
              <q-input
                class="input-style input-overlay q-mb-sm"
                dense
                type="textarea"
                :disable="isDisabled()"
                borderless
                v-model="carrier.info.notes"
                label="Notes"
              />
            </div>
          </q-card>
        </q-form>
      </div>
      <div class="row justify-center">
        <q-btn
          class="q-mt-md single-next-button-style text-capitalize"
          @click="onAddCarrierButtonClick"
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
    //this prop is being used when we edit a lead
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
      isEditable: false,
      canEditContactOnly: false,
      contactOnly: false,
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
    //pre-filling all the data when we edit a lead
    if (this.isEdit) {
      this.carrier.name = this.selectedCarrier.name;
      this.carrier.email = this.selectedCarrier.email;
      if (this.selectedCarrier.phoneNumber[0]) {
        this.carrier.phoneNumber[0].number =
          this.selectedCarrier.phoneNumber[0].number;
        this.carrier.phoneNumber[0].type =
          this.selectedCarrier.phoneNumber[0]?.type || '';
      }
      this.carrier.meta.claimFiledByEmail =
        this.selectedCarrier.meta.claimFiledByEmail;
      if (this.selectedCarrier.address) {
        // if (
        //   this.selectedCarrier.address.dropBox &&
        //   this.selectedCarrier.address.dropBox.isPresent
        // ) {
        //   this.carrier.address.dropBox.isPresent =
        //     this.selectedCarrier.address.dropBox.isPresent;
        // }
        this.carrier.address = this.selectedCarrier.address;
      }

      this.isEditable = this.selectedCarrier.isEditable;
      this.canEditContactOnly = this.selectedCarrier.canEditContactOnly;

      if (this.selectedCarrier.contact) {
        this.carrier.contact.fname = this.selectedCarrier.contact?.fname || '';
        this.carrier.contact.lname = this.selectedCarrier.contact?.lname || '';
        this.carrier.contact.phoneNumber =
          this.selectedCarrier.contact?.phoneNumber || '';
        this.carrier.contact.email = this.selectedCarrier.contact?.email || '';
      }
      this.carrier.info.website = this.selectedCarrier.info?.website || '';
      this.carrier.info.notes = this.selectedCarrier.info?.notes || '';
    }
    this.getAllConfigurationTableData({ name: 'honorifics' });
    this.getAllConfigurationTableData({ name: 'phone_types' });
  },

  methods: {
    ...mapActions([
      'addCarrier',
      'getAllConfigurationTableData',
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

      if (this.isEdit) {
        (payload.isEditable = this.isEditable),
          (payload.canEditContactOnly = this.canEditContactOnly);
      }
      if (success) {
        if (!this.isEdit) {
          if (!this.carrier.address.address1) {
            delete payload.address;
          }
          const response = await this.addCarrier(payload);
          const params = {
            hideLoader: false,
            limit: 20,
            offset: 0
          };
          this.getCarriers(params);

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
    },
    isDisabled() {
      if (this.isEditable == true) {
        this.contactOnly = false;
        return false;
      } else if (this.canEditContactOnly == true) {
        this.contactOnly = false;
        return true;
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
