<template>
  <div class="bg-white full-width">
    <!-- Loss Info -->
    <q-card class="q-pa-sm">
      <q-select
        dense
        behavior="menu"
        class="required"
        v-model="lossInfo.reasonClaim.value"
        option-value="name"
        option-label="name"
        map-options
        use-input
        input-debounce="0"
        options-dense
        emit-value
        :options="claimReasonOptions"
        @input="setTypes(claimReasons, lossInfo.reasonClaim)"
        @filter="searchFilterBy"
        label="Reason for Claim"
        :rules="[
          val => (val && val.length > 0) || 'Please select the reason for claim'
        ]"
      />
    </q-card>
    <q-card class="q-pa-sm q-mt-sm">
      <span class="form-heading">Date of Loss</span>

      <div class="full-width">
        <q-input
          class="required"
          dense
          v-model="lossInfo.dateOfLoss"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[val => dateLiesBetween(val)]"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              size="sm"
              color="primary"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy2"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="lossInfo.dateOfLoss"
                  @input="() => $refs.qDateProxy2.hide()"
                  mask="MM/DD/YYYY"
                  :options="lossDateOption"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <q-select
        class="input-extra-padding"
        dense
        behavior="menu"
        v-model="lossInfo.causeOfLoss.value"
        option-value="name"
        option-label="name"
        map-options
        options-dense
        use-input
        input-debounce="0"
        emit-value
        :options="lossCauseOptions"
        @input="setTypes(lossCauses, lossInfo.causeOfLoss)"
        @filter="searchByCause"
        label="Cause of Loss"
      />

      <q-input
        v-if="lossInfo.causeOfLoss.id"
        class="required"
        label="Cause of loss description"
        v-model="lossInfo.causeOfLoss.desc"
        lazy-rules
        :rules="[
          val =>
            (val && val.length > 0) ||
            'Please fill the cause of loss description'
        ]"
      >
      </q-input>

      <span class="form-heading">Deadline Date</span>

      <div class="full-width">
        <q-input
          dense
          v-model="lossInfo.deadlineDate"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[val => validateDate(val) || 'Invalid date!']"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              size="sm"
              color="primary"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy3"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="lossInfo.deadlineDate"
                  @input="() => $refs.qDateProxy3.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <br />
      <span class="form-heading">Recov. Deprec. Deadline</span>

      <div class="full-width">
        <q-input
          dense
          v-model="lossInfo.recovDeadline"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[
            val => (val.length > 0 && validateDate(val)) || 'Invalid date!'
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
                ref="qDateProxy4"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="lossInfo.recovDeadline"
                  @input="() => $refs.qDateProxy4.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </q-card>
    <q-card class="q-pa-sm q-mt-sm">
      <div class="row">
        <p class="q-my-auto form-heading">Is the Home Habitable?</p>
        <q-toggle class="q-ml-auto" v-model="lossInfo.isTheHomeHabitable" />
      </div>
      <div class="row">
        <p class="q-mx-none q-my-auto form-heading">FEMA Claim</p>
        <q-toggle class="q-ml-auto" v-model="lossInfo.femaClaimToggle" />
      </div>
      <div class="row">
        <p class="q-my-auto form-heading">State of Emergency</p>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.isStateOfEmergencyToggle"
        />
      </div>
      <div v-if="lossInfo.isStateOfEmergencyToggle">
        <q-input dense v-model="lossInfo.nameOfEmergency" label="Related to" />
      </div>
      <q-select
        class="required"
        dense
        behavior="menu"
        v-model="lossInfo.severityOfClaimType.value"
        option-value="name"
        option-label="name"
        map-options
        emit-value
        options-dense
        :options="claimSeverity"
        @input="setTypes(claimSeverity, lossInfo.severityOfClaimType)"
        label="Severity of Claim"
        :rules="[
          val =>
            (val && val.length > 0) || 'Please select the severity of claim'
        ]"
      />
    </q-card>
    <q-card class="q-pa-sm q-mt-sm">
      <span class="form-heading"
        >Loss Description to Dwelling <small style="color: red">*</small></span
      >
      <textarea
        rows="5"
        required
        class="full-width"
        v-model="lossInfo.descriptionDwelling"
        style="resize: none"
      />
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
  name: 'LossInfo',
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
      claimReasonOptions: [],
      lossCauseOptions: [],
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
      if (
        date.formatDate(Date.now(), 'YYYY/MM/DD') <
        date.formatDate(this.policyDate.policyExpireDate, 'YYYY/MM/DD')
      ) {
        return (
          dateopn >=
            date.formatDate(
              this.policyDate.policyEffectiveDate,
              'YYYY/MM/DD'
            ) && dateopn <= date.formatDate(Date.now(), 'YYYY/MM/DD')
        );
      } else {
        return (
          dateopn >=
            date.formatDate(
              this.policyDate.policyEffectiveDate,
              'YYYY/MM/DD'
            ) &&
          dateopn <=
            date.formatDate(this.policyDate.policyExpireDate, 'YYYY/MM/DD')
        );
      }
    },

    searchFilterBy(val, update) {
      this.lossInfo.reasonClaim.id = null;
      if (val === ' ') {
        update(() => {
          this.claimReasonOptions = this.claimReasons;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.claimReasonOptions = this.claimReasons.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    dateLiesBetween(val) {
      if (validateDate(val)) {
        if (Date.parse(val) < Date.parse(this.policyDate.policyEffectiveDate)) {
          return 'Date is before policy effective date';
        } else if (
          Date.parse(val) > Date.parse(this.policyDate.policyExpireDate)
        ) {
          return 'Date is after policy expiry date';
        } else {
          return true;
        }
      } else {
        return 'Invalid date';
      }
    },
    searchByCause(val, update) {
      this.lossInfo.causeOfLoss.id = null;
      if (val === ' ') {
        update(() => {
          this.lossCauseOptions = this.lossCauses;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.lossCauseOptions = this.lossCauses.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    validateDate,
    setTypes(types, data) {
      console.log(data, 4334);
      const obj = types.find(item => {
        return item.name === data.value;
      });

      data.machineValue = obj.machineValue;
      data.id = obj.id;
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
