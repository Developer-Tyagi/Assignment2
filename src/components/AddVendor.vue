<template>
  <q-page class="bg-white full-width">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/close.svg"
          alt="back-arrow"
          @click="closeDialog(false)"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          ADD NEW {{ componentName }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
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
            v-model="vendor.name"
            label=" Company Name"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please fill the first name'
            ]"
          />
          <div>
            <q-select
              class="full-width"
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
              emit-value
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the first name'
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
            v-model="vendor.contact[0].honorific.id"
            :options="titles"
            label="Title"
            option-label="value"
            option-value="id"
            map-options
            emit-value
            @input="setTitleName(vendor.contact[0].honorific)"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please choose the Title'
            ]"
          />
          <q-input
            v-model="vendor.contact[0].fname"
            label="First Name"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please fill the first name'
            ]"
          />
          <q-input v-model="vendor.contact[0].lname" label="Last Name" />
          <div class="row">
            <q-select
              v-model="vendor.contact[0].phoneNumber[0].type"
              :options="contactTypes"
              option-value="machineValue"
              option-label="name"
              label="Type"
              style="width: 40%; margin-right: auto"
              emit-value
            />
            <q-input
              v-model="vendor.contact[0].phoneNumber[0].number"
              label="Phone"
              type="number"
              style="width: 55%"
            />
          </div>
          <q-input
            v-model="vendor.contact[0].email"
            type="email"
            label="Email"
            borderless
          />
          <div class="row" v-if="componentName === 'carrier'">
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
                v-model="contactInfo.honorific.id"
                :options="titles"
                option-label="value"
                label="Title"
                option-value="id"
                @input="setTitleName(contactInfo.honorific)"
                emit-value
                map-options
              />
              <q-input
                v-model="contactInfo.fname"
                label="First Name"
                :ref="`fname-${index}`"
              />
              <q-input v-model="contactInfo.lname" label="Last Name" />
              <div class="row">
                <q-select
                  v-model="contactInfo.phoneNumber[0].type"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  label="Type"
                  style="width: 40%; margin-right: auto"
                  emit-value
                />
                <q-input
                  v-model="contactInfo.phoneNumber[0].number"
                  label="Phone1"
                  type="number"
                  style="width: 55%"
                  :ref="`number-${index}`"
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
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  name: 'AddVendor',
  props: ['componentName'],

  components: { AutoCompleteAddress },

  data() {
    return {
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
    if (this.componentName && this.componentName === 'carrier') {
      let industryType = this.vendorIndustries.find(
        o => o.machineValue === 'carrier'
      );
      if (industryType.name && industryType.id) {
        this.vendor.industry.value = industryType.name;
        this.vendor.industry.id = industryType.id;
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
          this.closeDialog(true);
        }
      }
    },

    closeDialog(flag) {
      this.$emit('closeDialog', flag);
    }
  },

  created() {
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
