<template>
  <q-page>
    <div class="listing-height">
      <ClaimDetail />
      <q-card
        class="q-ma-sm q-pa-sm"
        v-for="(damage, index) in damageInfo.damageItemInfo.personal"
      >
        <div class="row justify-between">
          <div>
            <q-badge class="q-pa-sm" color="grey-6">
              {{ damage.isRepaired == true ? 'Repair' : 'Replace' }}
            </q-badge>
          </div>
          <div class="text-bold  text-capitalize q-pt-xs">
            {{ damage.name }}
          </div>
          <div class="q-pt-xs q-mr-sm ">
            <q-icon name="create" color="primary" @click="onClickEdit(index)" />
          </div>
        </div>

        <div
          class="q-ml-sm text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-px-xs q-ma-xs"
        >
          <p>{{ damage.desc }}</p>
        </div>
        <div class="q-my-sm">
          <div class="row justify-between  q-my-sm">
            <div class="heading-light ">
              Quantity
            </div>
            <div class="q-mr-sm">
              {{ damage.quantity }}
            </div>
          </div>
          <div class="row justify-between  q-my-sm">
            <div class="heading-light ">
              Serial Number
            </div>
            <div class="q-mr-sm">
              {{ damage.serialNumber }}
            </div>
          </div>
          <div class="row   justify-between q-my-sm">
            <div class="heading-light  ">Purchase Date</div>
            <div class="q-mr-sm">
              {{ damage.purchaseDate | moment('DD/MM/YYYY') }}
            </div>
          </div>
        </div>
        <q-separator />
        <div class="q-my-sm row justify-between">
          <div class="heading-light ">Purchase Price</div>
          <div class="heading-light ">$</div>
          <div class="">
            {{ damage.purchasePrice }}
          </div>
        </div>
      </q-card>
    </div>
    <q-dialog
      v-model="PPdamagedItemsDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card>
          <CustomBar
            @closeDialog="PPdamagedItemsDailog = false"
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
              class="full-width q-mt-lg text-capitalize"
              size="'xl'"
            ></q-btn>
          </div>
        </q-card>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import PropertyInfo from 'components/PropertyInfo';
import moment from 'moment';
import { date } from 'quasar';
import { dateToShow } from '@utils/date';

export default {
  name: 'PersonalProperty',
  components: { CustomBar, ClaimDetail, PropertyInfo },
  // props: {
  //   lossInfo: {
  //     type: Object
  //   },
  //   mortgageInfo: {
  //     type: Object
  //   },
  //   isMailingAddressEnable: {
  //     type: Boolean,
  //     required: false
  //   },
  //   lossAddressToggleShow: {
  //     type: Boolean,
  //     required: false
  //   },
  //   isAddressRequired: {
  //     type: Boolean,
  //     required: false
  //   },
  //   lossAddressSameAsClient: {
  //     type: Boolean,
  //     required: false
  //   },
  //   policyDate: {
  //     type: Object
  //   }
  // },
  data() {
    return {
      PPdamagedItemsDailog: false,
      lossInfo: {
        purchaseDate: '',
        purchasePrice: '',
        quantity: '',
        PPDamageItemDescription: '',

        PPdamagedItemsDailog: false,
        ppDamagedItems: [],

        repairReplaceRadio: 'Replace',
        serialNumber: '',
        PPDamageName: '',
        PPDamageDescription: '',
        PPDamagedItemCost: ''
      }
    };
  },

  computed: {
    ...mapGetters([
      'getSelectedClaim',
      'setClientProperty',
      'selectedClaimId',
      'lossCauses',
      'damageInfo'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getDamageInfo(this.selectedClaimId);
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }

    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getSingleClaimDetails', 'editClaimInfo', 'getDamageInfo']),
    onClickEdit(index) {
      console.log(index);
      this.PPdamagedItemsDailog = true;
    }
  }
};
</script>
