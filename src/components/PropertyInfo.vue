<template>
  <div class="bg-white full-width">
    <!-- Damaged Items Dialog Box -->
    <q-dialog
      v-model="lossInfo.damagedItemsDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="lossInfo.damagedItemsDailog = false"
          :dialogName="'Add Items'"
        />
        <div class="mobile-container-page-without-search">
          <div class="form-height">
            <div class="q-page bg-white">
              <div class="full-width">
                <q-input dense v-model="lossInfo.OSDamageName" label="Name" />
                <q-input
                  dense
                  v-model="lossInfo.OSDamageDescription"
                  label="Description"
                  autogrow
                />
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="lossInfo.OSDamagedItemCost"
                  label="Item Cost"
                >
                  <template v-slot:prepend>
                    <q-icon name="$" color="primary" class="q-mb-sm"></q-icon>
                  </template>
                </q-input>
              </div>
              <br />
            </div>
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            size="'xl'"
            @click="addDamagedItems"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>
    <!-- PP Damaged Items Dialog Box -->
    <q-dialog
      v-model="lossInfo.PPdamagedItemsDailog"
      persistent
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
            <q-card class=" q-ma-sm q-pa-sm ">
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
                    class="required full-width "
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
                      v-model.number="lossInfo.PPDamagedItemCost"
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
                  class="row justify-between q-my-sm "
                  v-if="lossInfo.repairReplaceRadio == 'Replace'"
                >
                  <div class="q-mt-sm q-ml-sm">Replace Cost</div>
                  <div>
                    <q-input
                      class="required"
                      dense
                      type="number"
                      v-model.number="lossInfo.PPDamagedItemCost"
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
            class="full-width q-mt-auto text-capitalize"
            @click="addPPDamagedItems"
            size="'xl'"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>

    <q-card class="q-pa-sm q-mt-sm">
      <div v-if="lossInfo.isDamageOSToggle">
        <br />
        <div
          v-if="lossInfo.osDamagedItems.length >= 1"
          flat
          bordered
          scroll
          style="margin-top: 20px"
        >
          <div class="items-start q-gutter-md">
            <div
              v-for="(item, index) in lossInfo.osDamagedItems"
              v-if="lossInfo.osDamagedItems.length"
            >
              <q-card flat bordered>
                <div class="text-right">
                  <q-icon
                    v-if="lossInfo.osDamagedItems.length >= 1"
                    size="xs"
                    class="q-ma-xs"
                    dense
                    color="primary"
                    name="close"
                    @click="deleteDamagedItem(index)"
                  />
                </div>
                <div>
                  <div class="row">
                    <div class="text-bold q-ml-sm text-capitalize q-pt-xs">
                      {{ item.name }}
                    </div>
                    <div class="q-ml-auto q-pt-xs" style="margin-right: 30px">
                      {{ '$' + item.cost }}
                    </div>
                  </div>
                  <div
                    class="q-ml-sm text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-px-xs q-ma-xs"
                  >
                    <p>{{ item.desc }}</p>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
        <q-btn
          label="add item"
          name="add"
          class="q-mt-sm"
          icon="add"
          size="sm"
          color="primary"
          @click="lossInfo.damagedItemsDailog = true"
        >
        </q-btn>
      </div>
      <div class="row">
        <div class=" col-8  q-mt-md form-heading">
          Is there damage to personal operty?
        </div>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.isThereDamageToPersonalPropertyToggle"
          @input="onPersonalPropertyToggleButtonOff"
        />
      </div>
      <div class="row" v-if="lossInfo.isThereDamageToPersonalPropertyToggle">
        <div class="col-8  q-mx-none q-my-auto form-heading">
          Is the PA filling out the PPIF at this inspection?
        </div>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.isPAFillingOutToggle"
          @input="onPersonalPropertyToggleButtonOff"
        />
      </div>

      <!-- Persnol Property Damage List -->
      <div
        v-if="
          lossInfo.isThereDamageToPersonalPropertyToggle &&
            lossInfo.isPAFillingOutToggle
        "
      >
        <br />
        <div
          v-if="lossInfo.ppDamagedItems.length >= 1"
          flat
          bordered
          scroll
          class="q-mt-xs"
        >
          <div class="items-start q-gutter-md">
            <div
              v-for="(item, index) in lossInfo.ppDamagedItems"
              v-if="lossInfo.ppDamagedItems.length"
            >
              <q-card class="q-pa-sm">
                <div class="text-right">
                  <q-icon
                    class="q-ma-xs"
                    dense
                    color="primary"
                    name="create"
                    @click="OnEditPPdamageItem(index)"
                  />
                  <q-icon
                    v-if="lossInfo.ppDamagedItems.length >= 1"
                    class="q-ma-xs"
                    size="xs"
                    dense
                    color="primary"
                    name="close"
                    @click="deletePPDamagedItem(index)"
                  />
                </div>
                <div class="row justify-between">
                  <div>
                    <q-badge class="q-pa-sm" color="grey-6">
                      {{ item.radio }}</q-badge
                    >
                  </div>
                  <div class="text-bold  text-capitalize q-pt-xs">
                    {{ item.name }}
                  </div>
                  <div class="q-pt-xs q-mr-sm text-bold">
                    {{ item.quantity }}
                  </div>
                </div>
                <div
                  class="q-ml-sm text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-px-xs q-ma-xs"
                >
                  <p>{{ item.desc }}</p>
                </div>
                <div class="q-my-sm">
                  <div class="row justify-between  q-my-sm">
                    <div class="heading-light ">
                      Serial Number
                    </div>
                    <div class="q-mr-sm">
                      {{ item.serialNumber ? item.serialNumber : '-' }}
                    </div>
                  </div>
                  <div class="row   justify-between q-my-sm">
                    <div class="heading-light  ">Purchase Date</div>
                    <div class="q-mr-sm">
                      {{ item.purchaseDate }}
                    </div>
                  </div>
                </div>
                <q-separator />
                <div class="q-my-sm row justify-between">
                  <div class="heading-light col-4">Purchase Price</div>
                  <div class="heading-light ">$</div>
                  <div class=" q-mr-sm ">
                    {{ item.purchasePrice }}
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
        <div>
          <q-btn
            label="add item"
            name="add"
            class="q-mt-sm"
            icon="add"
            size="sm"
            color="primary"
            @click="lossInfo.PPdamagedItemsDailog = true"
          >
          </q-btn>
        </div>
      </div>
      <div
        class="row"
        v-if="
          !lossInfo.isPAFillingOutToggle &&
            lossInfo.isThereDamageToPersonalPropertyToggle
        "
      >
        <div class="col-8  q-mx-none q-my-auto form-heading">
          Is the adjuster going to fill out the PPIF at a later date?
        </div>
        <q-toggle
          v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
          class="q-ml-auto"
          v-model="lossInfo.isAdjustorFillOutLaterDate"
        />
      </div>
      <div
        class="row"
        v-if="
          !lossInfo.isAdjustorFillOutLaterDate &&
            lossInfo.isThereDamageToPersonalPropertyToggle &&
            !lossInfo.isAdjustorFillOutLaterDate &&
            !lossInfo.isPAFillingOutToggle
        "
      >
        <div class="col-8  q-mx-none q-my-auto form-heading">
          Is the client going to prepare the PPIFs?
        </div>
        <q-toggle
          v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
          class="q-ml-auto"
          v-model="lossInfo.isClientGoingToPreparePPIF"
        />
      </div>
      <div
        class="row"
        v-if="
          lossInfo.isClientGoingToPreparePPIF &&
            lossInfo.isPAFillingOutToggle == false
        "
      >
        <div class="col-8  q-mx-none q-my-auto form-heading">
          Do you want to send the insured a PPIF?
        </div>
        <q-toggle
          v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
          class="q-ml-auto"
          v-model="lossInfo.doYouWantToSendInsuredPPIF"
        />
      </div>
      <div class="row" v-if="lossInfo.isPAFillingOutToggle == false">
        <div class="col-8  q-mx-none q-my-auto form-heading">
          Was a PPIF provided to the insured?
        </div>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.wasAppifProvidedToTheInsuredToggle"
        />
      </div>
      <div
        class="row"
        v-if="
          lossInfo.isPAFillingOutToggle == false &&
            lossInfo.wasAppifProvidedToTheInsuredToggle == false
        "
      >
        <div class=" col-9 q-mx-none q-my-auto form-heading">
          Does Claim Guru need to provide the insured with a PPIF?
        </div>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.doesTheOfficeNeedToProvidePpifToTheInsuredToggle"
        />
      </div>
    </q-card>
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
import AddVendor from 'components/AddVendor';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import MortgageForm from 'components/MortgageForm';

export default {
  name: 'PropertyInfo',
  components: {
    CustomBar,
    VendorsList,
    AddVendor,
    AutoCompleteAddress,
    MortgageForm
  },

  props: {
    lossInfo: {
      type: Object
    },
    mortgageInfo: {
      type: Object
    },
    isMailingAddressEnable: {
      type: Boolean,
      required: false
    },
    lossAddressToggleShow: {
      type: Boolean,
      required: false
    },
    isAddressRequired: {
      type: Boolean,
      required: false
    },
    lossAddressSameAsClient: {
      type: Boolean,
      required: false
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

    this.getVendors(this.$route.params.id);
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
    OnEditPPdamageItem(index) {
      this.lossInfo.quantity = this.lossInfo.ppDamagedItems[index].quantity;
      this.lossInfo.PPDamageName = this.lossInfo.ppDamagedItems[index].name;
      this.lossInfo.PPDamageDescription = this.lossInfo.ppDamagedItems[
        index
      ].desc;
      this.lossInfo.serialNumber = this.lossInfo.ppDamagedItems[
        index
      ].serialNumber;
      this.lossInfo.purchasePrice = this.lossInfo.ppDamagedItems[
        index
      ].purchasePrice;
      this.lossInfo.purchaseDate = this.lossInfo.ppDamagedItems[
        index
      ].purchaseDate;
      this.lossInfo.repairReplaceRadio = this.lossInfo.ppDamagedItems[
        index
      ].radio;

      this.lossInfo.PPdamagedItemsDailog = true;
    },

    onDamageOsToggleButtonOff() {
      if (!this.lossInfo.isDamageOSToggle) {
        this.lossInfo.osDamagedItems.length = 0;
      }
    },
    onPersonalPropertyToggleButtonOff() {
      if (
        !this.lossInfo.isThereDamageToPersonalPropertyToggle ||
        !this.lossInfo.isPAFillingOutToggle
      ) {
        this.lossInfo.ppDamagedItems.length = 0;
      }
    },
    closeAddVendorDialog(e) {
      this.mortgageInfo.addVendorDialog = false;
      // this.getVendors();
      if (e) {
        this.mortgageInfo.vendorsListDialog = false;
      } else {
        this.mortgageInfo.vendorsListDialog = true;
      }
    },

    onToggleButtonClick() {
      if (this.mortgageInfo.mortgageDetails.length > 1) {
        this.mortgageInfo.mortgageDetails.pop();
      }
      if (!this.mortgageInfo.isMortgageHomeToggle) {
        this.mortgageInfo.isSecondMortgageHome = false;
        this.mortgageInfo.mortgageDetails = [
          {
            id: '',
            value: '',
            loanNumber: '',
            accountNumber: '',
            isPrimary: true,
            notes: ''
          }
        ];
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
    deleteDamagedItem(index) {
      this.$delete(this.lossInfo.osDamagedItems, index);
    },
    deletePPDamagedItem(index) {
      this.$delete(this.lossInfo.ppDamagedItems, index);
    },
    onSecondMortgageToggle() {
      if (this.lossInfo.isSecondMortgageHome) {
        this.lossInfo.mortgageDetails.push({
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: false,
          notes: ''
        });
      } else {
        this.lossInfo.mortgageDetails.pop();
      }
    },
    onMortgageToggleButtonClick() {
      if (this.lossInfo.mortgageDetails.length > 1) {
        this.lossInfo.mortgageDetails.pop();
      }
      if (!this.mortgageInfo.isMortgageHomeToggle) {
        this.lossInfo.isSecondMortgageHome = false;
        this.lossInfo.mortgageDetails = [
          {
            id: '',
            value: '',
            loanNumber: '',
            accountNumber: '',
            isPrimary: true,
            notes: ''
          }
        ];
      }
    },
    async addPPDamagedItems() {
      const success = await this.$refs.PropertyInfo.validate();
      if (success) {
        this.lossInfo.PPdamagedItemsDailog = false;
        this.lossInfo.ppDamagedItems.push({
          name: this.lossInfo.PPDamageName,
          desc: this.lossInfo.PPDamageDescription,
          cost: this.lossInfo.PPDamagedItemCost,
          serialNumber: this.lossInfo.serialNumber,
          radio: this.lossInfo.repairReplaceRadio,
          itemDesc: this.lossInfo.PPDamageItemDescription,
          purchaseDate: this.lossInfo.purchaseDate,
          purchasePrice: this.lossInfo.purchasePrice,
          quantity: this.lossInfo.quantity
        });
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
    addDamagedItems() {
      this.lossInfo.osDamagedItems.push({
        name: this.lossInfo.OSDamageName,
        desc: this.lossInfo.OSDamageDescription,
        cost: this.lossInfo.OSDamagedItemCost
      });

      this.lossInfo.damagedItemsDailog = false;
      this.lossInfo.OSDamageName = '';
      this.lossInfo.OSDamageDescription = '';
      this.lossInfo.OSDamagedItemCost = '';
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
