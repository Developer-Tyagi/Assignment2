<template>
  <q-page>
    <div class="bg-white full-width">
      <CustomBar
        :dialogName="'Add Mortgage'"
        @closeDialog="closeDialog(false)"
      />
      <div class="mobile-container-page form-color">
        <q-form
          class="q-pa-lg"
          style="height: calc(100vh - 51px)"
          ref="mortgageForm"
        >
          <div class="full-width  rounded bg-white">
            <div class=" rounded">
              <q-input
                dense
                borderless
                class="input-style input-overlay  required"
                v-model="mortgage.name"
                label=" Mortgage Name"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Please fill the mortgage name'
                ]"
              />

              <div class="row justify-between">
                <q-select
                  dense
                  borderless
                  class=" input-style input-overlay  col-5"
                  v-model="mortgage.phoneNumber[0].type"
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
                  class="input-style input-overlay  required col-6"
                  v-model.number="mortgage.phoneNumber[0].number"
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
                class="input-style input-overlay  required"
                v-model="mortgage.email"
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
              <p class="form-heading q-mx-sm">Mortgage Address</p>
              <AutoCompleteAddress
                :address="mortgage.address"
                :isDropBoxEnable="false"
                :isChecksEnable="false"
                :value="true"
              />
            </div>
            <div>
              <div class=" q-mt-md">
                <p class="q-mx-sm form-heading">Contact Info</p>

                <div class="q-mt-sm ">
                  <q-select
                    dense
                    borderless
                    v-model="mortgage.contact.honorific.value"
                    :options="titles"
                    option-label="value"
                    label="Title"
                    option-value="value"
                    @input="setTitleName(mortgage.contact.honorific)"
                    emit-value
                    behavior="menu"
                    map-options
                    options-dense
                    class="input-style input-overlay input-extra-padding"
                  />
                  <q-input
                    dense
                    class="input-style input-overlay "
                    borderless
                    v-model="mortgage.contact.fname"
                    label="First Name"
                  />
                  <q-input
                    dense
                    borderless
                    class="input-style input-overlay "
                    v-model="mortgage.contact.lname"
                    label="Last Name"
                  />
                  <div class="row justify-between">
                    <q-select
                      dense
                      class="input-style input-overlay  col-5"
                      v-model="mortgage.contact.phoneNumber[0].type"
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
                      class="input-style input-overlay  col-6"
                      v-model.number="mortgage.contact.phoneNumber[0].number"
                      label="Phone1"
                      mask="(###) ###-####"
                    />
                  </div>
                  <q-input
                    class="input-style input-overlay q-mb-md"
                    dense
                    borderless
                    v-model="mortgage.contact.email"
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
            <div class=" q-py-sm  q-mt-md">
              <p class="form-heading q-mx-sm">Other Info</p>
              <q-input
                dense
                borderless
                class="input-style input-overlay"
                v-model="mortgage.info.website"
                label="Website"
                lazy-rules
                :rules="[val => validateUrl(val) || 'Please fill your website']"
              />
              <q-input
                borderless
                class="input-style input-overlay  q-mb-sm"
                dense
                v-model="mortgage.info.notes"
                label="Notes"
              />
            </div>
          </div>
          <div></div>
        </q-form>
      </div>
      <div class="rounded-footer">
        <q-btn
          color="primary"
          class="button-width-90 q-mt-md rounded  text-capitalize"
          @click="onAddMortgageButtonClick"
          size="'xl'"
          :label="isEdit ? 'SAVE' : 'Add Mortgage'"
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
  name: 'AddMortgage',
  props: {
    isEdit: {
      type: Boolean
    }
  },
  components: { AutoCompleteAddress, CustomBar },

  data() {
    return {
      constants: constants,
      options: '',
      countries: [],
      states: [],
      mortgage: {
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
          houseNumber: '',
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
    ...mapGetters(['contactTypes', 'titles', 'selectedMortgage'])
  },

  mounted() {
    if (this.isEdit) {
      this.mortgage.name = this.selectedMortgage.name;
      this.mortgage.email = this.selectedMortgage.email;
      this.mortgage.phoneNumber[0].number = this.selectedMortgage.phoneNumber[0].number;
      this.mortgage.phoneNumber[0].type = this.selectedMortgage.phoneNumber[0].type;
      if (this.selectedMortgage.address) {
        this.mortgage.address = this.selectedMortgage.address;
      }
      this.mortgage.contact.fname = this.selectedMortgage.contact.fname;
      this.mortgage.contact.lname = this.selectedMortgage.contact.lname;
      this.mortgage.contact.phoneNumber = this.selectedMortgage.contact.phoneNumber;
      this.mortgage.contact.email = this.selectedMortgage.contact.email;
      this.mortgage.info.website = this.selectedMortgage.info.website;
      this.mortgage.info.notes = this.selectedMortgage.info.notes;
    }

    this.getTitles();
    this.getContactTypes();
  },

  methods: {
    ...mapActions([
      'addClaimMortgage',
      'getTitles',
      'getContactTypes',
      'getMortgages',
      'editMortgageInfo',
      'getMortgageDetails'
    ]),
    validateEmail,
    validateUrl,
    validateNonRequiredEmail,
    sendPhoneNumber,
    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.value === selectedTitle.value;
      });

      selectedTitle.id = selected.id;
      selectedTitle.machineValue = selected.machineValue;
    },

    async onAddMortgageButtonClick() {
      const success = await this.$refs.mortgageForm.validate();
      const payload = {
        id: this.mortgage.id,
        name: this.mortgage.name,
        email: this.mortgage.email,
        phoneNumber: [
          {
            type: this.mortgage.phoneNumber[0].type,
            number: sendPhoneNumber(this.mortgage.phoneNumber[0].number)
          }
        ],
        meta: {
          claimFiledByEmail: this.mortgage.meta.claimFiledByEmail
        },
        contact: {
          fname: this.mortgage.contact.fname,
          lname: this.mortgage.contact.lname,
          email: this.mortgage.contact.email,
          honorific: {
            id: this.mortgage.contact.honorific.id,
            value: this.mortgage.contact.honorific.value,
            machineValue: this.mortgage.contact.honorific.machineValue
          },
          phoneNumber: [
            {
              type: this.mortgage.contact.phoneNumber[0].type,
              number: sendPhoneNumber(
                this.mortgage.contact.phoneNumber[0].number
              )
            }
          ]
        },
        address: this.mortgage.address,
        info: {
          website: this.mortgage.info.website,
          notes: this.mortgage.info.notes
        }
      };
      if (success) {
        if (!this.isEdit) {
          if (!this.mortgage.address.streetAddress) {
            delete payload.address;
          }
          const response = await this.addClaimMortgage(payload);
          this.getMortgages();
          if (response.id) {
            this.mortgage.id = response.id;
            payload.id = response.id;
            this.$emit('onCloseAddMortgage', payload);
            this.closeDialog(true);
          }
        } else {
          this.mortgage.id = this.selectedMortgage.id;
          payload.id = this.selectedMortgage.id;
          await this.editMortgageInfo(payload);
          this.closeDialog(true);
          this.getMortgageDetails(this.mortgage.id);
        }
      }
    },

    closeDialog(flag) {
      this.$emit('closeDialog', flag);
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
