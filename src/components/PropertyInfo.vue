<template>
  <div class="bg-white full-width">
    <!-- PP Damaged Items Dialog Box -->
    <q-dialog
      v-model="lossInfo.PPdamagedItemsDailog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="lossInfo.PPdamagedItemsDailog = false"
          :dialogName="'Add Items'"
        />
        <div class="mobile-container-page-without-search">
          <div class="form-height">
            <q-card class="q-ma-sm q-pa-sm">
              <q-form ref="PropertyInfo">
                <div class="row justify-between">
                  <div class="q-ml-sm q-mt-sm">Quantity</div>
                  <div>
                    <q-input
                      class="required"
                      dense
                      v-model.number="lossInfo.quantity"
                      label="Quantity"
                      type="number"
                      :rules="[val => val || 'Please fill the Quantity']"
                    />
                  </div>
                </div>
                <div class="row justify-between">
                  <div class="q-ml-sm q-mt-sm">Name of item</div>
                  <div>
                    <q-input
                      class="required"
                      dense
                      v-model="lossInfo.PPDamageName"
                      label="Name of item"
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please fill Item Name'
                      ]"
                    />
                  </div>
                </div>
                <div class="row justify-between">
                  <div class="q-ml-sm q-mt-sm">Serial Number</div>
                  <div>
                    <q-input
                      dense
                      v-model="lossInfo.serialNumber"
                      label="Serial Number"
                    />
                  </div>
                </div>
                <div class="q-ml-sm q-mt-sm">Description of Damages</div>
                <div class="q-ma-sm">
                  <textarea
                    class="required full-width"
                    dense
                    v-model="lossInfo.PPDamageDescription"
                    label="Description of Damages"
                    rows="3"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please fill Description of Damages'
                    ]"
                  />
                </div>
                <div class="q-ml-sm q-mt-sm">Description of Items</div>
                <div class="q-ma-sm">
                  <textarea
                    class="required full-width"
                    v-model="lossInfo.PPDamageItemDescription"
                    label="Description of Item"
                    rows="3"
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Please fill Description of Item'
                    ]"
                  />
                </div>
                <div class="row justify-between q-ml-sm">
                  <div class="q-mt-sm">Purchase Price</div>
                  <div>
                    <q-input
                      class="required"
                      dense
                      type="number"
                      v-model.number="lossInfo.purchasePrice"
                      label="Purchase Price"
                      :rules="[val => val || 'Please fill  Purchase Price']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="$" color="primary"></q-icon> </template
                    ></q-input>
                  </div>
                </div>

                <q-radio
                  v-model="lossInfo.repairReplaceRadio"
                  val="Repair"
                  label="Repair"
                  :rules="[val => val || 'Please fill Replace Cost']"
                ></q-radio>
                <q-radio
                  class="q-ml-none"
                  v-model="lossInfo.repairReplaceRadio"
                  val="Replace"
                  label="Replace"
                ></q-radio>
                <div
                  class="row justify-between q-my-sm"
                  v-if="lossInfo.repairReplaceRadio == 'Repair'"
                >
                  <div class="q-mt-sm q-ml-sm">Repair Cost</div>
                  <div>
                    <q-input
                      class="required"
                      dense
                      type="number"
                      v-model.number="lossInfo.repairCost"
                      label="Repair Cost"
                      :rules="[val => val || 'Please fill repair cost']"
                    >
                      <template v-slot:prepend>
                        <q-icon
                          name="$"
                          color="primary"
                          class="q-mb-sm"
                        ></q-icon> </template
                    ></q-input>
                  </div>
                </div>
                <div
                  class="row justify-between q-my-sm"
                  v-if="lossInfo.repairReplaceRadio == 'Replace'"
                >
                  <div class="q-mt-sm q-ml-sm">Replace Cost</div>
                  <div>
                    <q-input
                      class="required"
                      dense
                      type="number"
                      v-model.number="lossInfo.replaceCost"
                      label="Replace Cost"
                      :rules="[val => val || 'Please fill Replace Cost']"
                    >
                      <template v-slot:prepend>
                        <q-icon
                          name="$"
                          color="primary"
                          class="q-mb-sm"
                        ></q-icon> </template
                    ></q-input>
                  </div>
                </div>

                <div class="text-bold q-mt-md">Purchase date</div>
                <div class="full-width">
                  <q-input
                    class="required"
                    v-model="lossInfo.purchaseDate"
                    mask="##/##/####"
                    label="MM/DD/YYYY"
                    lazy-rules
                    :rules="[
                      val =>
                        (validateDate(val) && val && val.length > 0) ||
                        'Invalid date!'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        size="sm"
                        color="primary"
                        class="cursor-pointer"
                      >
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="lossInfo.purchaseDate"
                            @input="() => $refs.qDateProxy.hide()"
                            mask="MM/DD/YYYY"
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </q-form>
            </q-card>
            <br />
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90 text-capitalize"
            @click="addPPDamagedItems()"
            size="'xl'"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import AddressService from '@utils/country';
import { date } from 'quasar';
import { constants } from '@utils/constant';
import CustomBar from 'components/CustomBar';
import VendorsList from 'components/VendorsList';
import { validateDate } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import { dateToSend } from '@utils/date';
import AddVendor from 'components/AddVendor';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import MortgageForm from 'components/MortgageForm';

export default {
  name: 'PropertyInfo',
  components: {
    CustomBar
  },

  props: {
    damageType: {
      type: String
    },
    lossInfo: {
      type: Object
    },

    policyDate: {
      type: Object
    }
  },

  data() {
    return {
      mortgageInfo: {
        vendorsListDialog: false,
        vendorDialogFilterByIndustry: '',
        showVendorDialogFilters: false,
        addVendorDialog: false,
        vendorDialogName: '',
        valueName: '',
        isSecondMortgageHome: false,
        isMortgageHomeToggle: false,
        mortgageInfoDialog: false,
        mortgageDetails: [
          {
            id: '',
            value: '',
            loanNumber: '',
            accountNumber: '',
            isPrimary: true,
            notes: ''
          }
        ]
      },
      constants: constants,
      lossAddressDetails: {
        houseNumber: '',
        addressCountry: '',
        addressRegion: '',
        addressLocality: '',
        postalCode: '',
        streetAddress: '',
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
      },

      lossAddressNameOptions: ['Others']
    };
  },
  created() {
    this.lossInfo.purchaseDate = date.formatDate(Date.now(), 'MM/DD/YYYY');
    this.$emit('isMortgageDetails', false);

    // this.getVendors(this.$route.params.id);
  },
  computed: {
    ...mapGetters([
      'policyTypes',
      'policyCategories',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity',
      'vendors'
    ])
  },
  methods: {
    ...mapActions([
      'getVendors',
      'getClaimReasons',
      'getSeverityClaim',
      'getRoles'
    ]),

    lossDateOption(dateopn) {
      return dateopn <= date.formatDate(Date.now(), 'YYYY/MM/DD');
    },

    dateLiesBetween(val) {
      if (
        Date.parse(val) <= Date.parse(this.policyDate.policyExpireDate) &&
        Date.parse(val) >= Date.parse(this.policyDate.policyEffectiveDate)
      ) {
        return true;
      } else {
        return false;
      }
    },

    validateDate,
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    },

    async addPPDamagedItems() {
      const success = await this.$refs.PropertyInfo.validate();
      if (success) {
        if (this.lossInfo.damageType == 'property') {
          if (this.lossInfo.isEdit == 'editable') {
            this.lossInfo.ppDamagedItems[this.lossInfo.currentIndex] = {
              name: this.lossInfo.PPDamageName,
              desc: this.lossInfo.PPDamageDescription,
              serialNumber: this.lossInfo.serialNumber,
              radio: this.lossInfo.repairReplaceRadio,
              repairCost: this.lossInfo.repairCost,
              replaceCost: this.lossInfo.replaceCost,
              itemDesc: this.lossInfo.PPDamageItemDescription,
              purchaseDate: this.lossInfo.purchaseDate,
              purchasePrice: this.lossInfo.purchasePrice,
              quantity: this.lossInfo.quantity
            };
            this.$emit(
              'loss',
              this.lossInfo.ppDamagedItems[this.lossInfo.currentIndex],
              this.lossInfo.currentIndex,
              'ppDamagedItems'
            );
          } else {
            this.lossInfo.ppDamagedItems.push({
              name: this.lossInfo.PPDamageName,
              desc: this.lossInfo.PPDamageDescription,
              repairCost: this.lossInfo.repairCost,
              replaceCost: this.lossInfo.replaceCost,
              serialNumber: this.lossInfo.serialNumber,
              radio: this.lossInfo.repairReplaceRadio,
              itemDesc: this.lossInfo.PPDamageItemDescription,
              purchaseDate: dateToSend(this.lossInfo.purchaseDate),
              purchasePrice: this.lossInfo.purchasePrice,
              quantity: this.lossInfo.quantity
            });
          }
        } else {
          if (this.lossInfo.isEdit == 'editable') {
            this.lossInfo.osDamagedItems[this.lossInfo.currentIndex] = {
              name: this.lossInfo.PPDamageName,
              desc: this.lossInfo.PPDamageDescription,
              serialNumber: this.lossInfo.serialNumber,
              radio: this.lossInfo.repairReplaceRadio,
              repairCost: this.lossInfo.repairCost,
              replaceCost: this.lossInfo.replaceCost,
              itemDesc: this.lossInfo.PPDamageItemDescription,
              purchaseDate: dateToSend(this.lossInfo.purchaseDate),
              purchasePrice: this.lossInfo.purchasePrice,
              quantity: this.lossInfo.quantity
            };
            this.$emit(
              'loss',
              this.lossInfo.osDamagedItems[this.lossInfo.currentIndex],
              this.lossInfo.currentIndex,
              'osDamagedItems'
            );
          } else {
            this.lossInfo.osDamagedItems.push({
              name: this.lossInfo.PPDamageName,
              desc: this.lossInfo.PPDamageDescription,
              repairCost: this.lossInfo.repairCost,
              replaceCost: this.lossInfo.replaceCost,
              serialNumber: this.lossInfo.serialNumber,
              radio: this.lossInfo.repairReplaceRadio,
              itemDesc: this.lossInfo.PPDamageItemDescription,
              purchaseDate: dateToSend(this.lossInfo.purchaseDate),
              purchasePrice: this.lossInfo.purchasePrice,
              quantity: this.lossInfo.quantity
            });
          }
        }

        this.lossInfo.PPdamagedItemsDailog = false;
        this.lossInfo.PPDamageName = '';
        this.lossInfo.PPDamageDescription = '';
        this.lossInfo.serialNumber = '';
        this.lossInfo.PPDamagedItemCost = '';
        this.lossInfo.repairReplaceRadio = 'Replace';
        this.lossInfo.PPDamageItemDescription = '';

        this.lossInfo.purchasePrice = '';
        this.lossInfo.quantity = '';
      }
    },

    lossAddressSameToggleClick() {
      if (this.lossInfo.isLossAddressSameAsClientToggle) {
        this.$emit('lossAddressSame', true);
      } else {
        this.lossInfo.lossAddressDetails = {
          addressCountry: '',
          addressRegion: '',
          addressLocality: '',
          postalCode: '',
          streetAddress: '',
          postOfficeBoxNumber: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}
</style>
