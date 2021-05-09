<template>
  <q-page>
    <div class="bg-white full-width">
      <CustomBar
        :dialogName="'Add Mortgage'"
        @closeDialog="closeDialog(false)"
      />
      <q-form
        class="q-pa-lg"
        style="height: calc(100vh - 51px)"
        ref="mortgageForm"
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
                class="col-5"
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
                class="required col-6"
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
              class="required"
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
          </q-card>
          <q-card class="q-ma-xs q-pa-sm q-mt-md">
            <p class="form-heading">Mortgage Address</p>
            <AutoCompleteAddress
              :address="mortgage.address"
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
                  v-model="mortgage.contact.honorific.value"
                  :options="titles"
                  option-label="value"
                  label="Title"
                  option-value="id"
                  @input="setTitleName(mortgage.contact.honorific)"
                  emit-value
                  behavior="menu"
                  map-options
                  options-dense
                  class="input-extra-padding"
                />
                <q-input
                  dense
                  v-model="mortgage.contact.fname"
                  label="First Name"
                />
                <q-input
                  dense
                  v-model="mortgage.contact.lname"
                  label="Last Name"
                />
                <div class="row justify-between">
                  <q-select
                    dense
                    class="col-5"
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
                    class="col-6"
                    v-model.number="mortgage.contact.phoneNumber[0].number"
                    label="Phone1"
                    mask="(###) ###-####"
                  />
                </div>
                <q-input
                  class="q-mb-md"
                  dense
                  v-model="mortgage.contact.email"
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
              v-model="mortgage.info.website"
              label="Website"
              lazy-rules
              :rules="[val => validateUrl(val) || 'Please fill your website']"
            />
            <q-input
              class="q-mb-sm"
              dense
              v-model="mortgage.info.notes"
              label="Notes"
            />
          </q-card>
        </div>
        <div>
          <q-btn
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onAddMortgageButtonClick"
            size="'xl'"
          >
            Add Mortgage
          </q-btn>
        </div>
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

    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.id === selectedTitle.id;
      });

      selectedTitle.value = selected.title;
      selectedTitle.machineValue = selected.machineValue;
    },

    async onAddMortgageButtonClick() {
      const success = await this.$refs.mortgageForm.validate();
      if (success) {
        if (!this.isEdit) {
          const response = await this.addClaimMortgage(this.mortgage);
          this.getMortgages();
          if (response) {
            this.mortgage.id = response.id;
            this.$emit('onCloseAddMortgage', this.mortgage);
            this.closeDialog(true);
          }
        } else {
          this.mortgage.id = this.selectedMortgage.id;
          await this.editMortgageInfo(this.mortgage);
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
