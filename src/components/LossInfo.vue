<template>
  <div class="bg-white full-width">
    <!-- Loss Info -->

    <q-card class="q-pa-md q-ma-xs">
      <q-select
        dense
        behavior="menu"
        borderless
        class="required input-style"
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
        :disable="isOfflineClientEdit"
      />
    </q-card>

    <q-card class="q-ma-xs q-pa-md">
      <span class="form-heading q-ml-xs">Date of Loss</span>

      <div class="full-width">
        <q-input
          borderless
          class="required input-style input-field"
          dense
          v-model="lossInfo.dateOfLoss"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[val => val && dateLiesBetween(val)]"
          :disable="isOfflineClientEdit"
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
        dense
        borderless
        class="input-style input-field"
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
        :disable="isOfflineClientEdit"
      />

      <!--adding condition if any cause of value is selected then only we will show cause of description field and if user change the cause of loss then this description field will not get disappeared-->
      <q-input
        v-if="
          lossInfo.causeOfLoss.value && lossInfo.causeOfLoss.value != 'None'
        "
        borderless
        class="required input-style input-field"
        label="Cause of loss description"
        v-model="lossInfo.causeOfLoss.desc"
        lazy-rules
        :rules="[
          val =>
            (val && val.length > 0) ||
            'Please fill the cause of loss description'
        ]"
        :disable="isOfflineClientEdit"
      >
      </q-input>
    </q-card>
    <q-card class="q-ma-xs q-pa-md">
      <div class="row justify-between">
        <div class="form-heading q-mt-sm">Is the Home Habitable?</div>
        <q-toggle
          size="sm"
          v-model="lossInfo.isTheHomeHabitable"
          :disable="isOfflineClientEdit"
        />
      </div>
      <div class="row justify-between">
        <div class="form-heading q-mt-sm">FEMA Claim</div>
        <q-toggle
          size="sm"
          v-model="lossInfo.femaClaimToggle"
          :disable="isOfflineClientEdit"
        />
      </div>
      <div class="row justify-between">
        <p class="form-heading q-mt-sm">State of Emergency</p>
        <q-toggle
          size="sm"
          v-model="lossInfo.isStateOfEmergencyToggle"
          :disable="isOfflineClientEdit"
        />
      </div>
      <div v-if="lossInfo.isStateOfEmergencyToggle">
        <q-input
          dense
          borderless
          class="required input-style input-field"
          v-model="lossInfo.nameOfEmergency"
          label="Related to"
          :disable="isOfflineClientEdit"
        />
      </div>
      <q-select
        dense
        behavior="menu"
        v-model="lossInfo.severityOfClaimType.value"
        option-value="name"
        option-label="name"
        map-options
        borderless
        class="required input-style input-field"
        emit-value
        options-dense
        :options="claimSeverity"
        @input="setTypes(claimSeverity, lossInfo.severityOfClaimType)"
        label="Severity of Claim"
        :rules="[
          val =>
            (val && val.length > 0) || 'Please select the severity of claim'
        ]"
        :disable="isOfflineClientEdit"
      />
    </q-card>
    <q-card class="q-ma-xs q-pa-md">
      <span class="form-heading"
        >Loss Description to Dwelling <small style="color: red">*</small></span
      >
      <q-input
        type="textarea"
        borderless
        :disable="isOfflineClientEdit"
        class="required input-style full-width"
        rows="5"
        required
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
        address1: '',
        address2: '',
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
  },
  computed: {
    ...mapGetters([
      'policyTypes',
      'policyCategories',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity',
      'vendors',
      'isOfflineClientEdit'
    ])
  },
  methods: {
    ...mapActions(['getVendors', 'getAllConfigurationTableData', 'getRoles']),

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
          address1: '',
          address2: '',
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
.input-field {
  height: 55px;
}
</style>
