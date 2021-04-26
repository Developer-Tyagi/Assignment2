<template>
  <div>
    <!-- Mortgage Form -->
    <div
      class="custom-select"
      v-model="mortgageInfo.mortgageDetails[0].id"
      @click="onSelectMortgageClick"
    >
      <div class="select-text">
        {{
          mortgageInfo.mortgageDetails[0].value
            ? mortgageInfo.mortgageDetails[0].value
            : 'Enter Mortgage Company'
        }}
      </div>
    </div>
    <q-input
      dense
      v-model="mortgageInfo.mortgageDetails[0].loanNumber"
      label="Loan Number"
    />
    <q-input
      dense
      v-model="mortgageInfo.mortgageDetails[0].accountNumber"
      label="Account Number"
    />
    <div class="form-heading">Notes</div>
    <textarea
      rows="5"
      class="full-width"
      v-model="mortgageInfo.mortgageDetails[0].notes"
      style="resize: none"
    />
    <div class="row" v-if="mortgageInfo.isThereSecondMortgageToggle">
      <span class="form-heading"> Is there a 2nd mortgage on the home? </span>

      <q-toggle
        class="q-ml-auto"
        v-model="mortgageInfo.isSecondMortgageHome"
        @input="onSecondMortgageToggle"
      />
    </div>
    <div v-if="mortgageInfo.isSecondMortgageHome">
      <div
        class="custom-select"
        v-model="mortgageInfo.mortgageDetails[1].id"
        @click="onAddVendorDialogClick(constants.industries.SECONDARYMORTGAGE)"
      >
        <div class="select-text">
          {{
            mortgageInfo.mortgageDetails[1].value
              ? mortgageInfo.mortgageDetails[1].value
              : 'Enter Mortgage Company'
          }}
        </div>
      </div>
      <q-input
        dense
        v-model="mortgageInfo.mortgageDetails[1].loanNumber"
        label="Loan Number"
      />
      <q-input
        dense
        v-model="mortgageInfo.mortgageDetails[1].accountNumber"
        label="Account Number"
      />
      <div class="form-heading">Notes</div>
      <textarea
        rows="5"
        class="full-width"
        v-model="mortgageInfo.mortgageDetails[1].notes"
        style="resize: none"
      />
    </div>
    <!-- Mortgage List -->
    <q-dialog
      v-model="mortgageInfo.mortgageList"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Mortgages'"
          @closeDialog="mortgageInfo.mortgageList = false"
        />
        <MortgagesList
          @addCarrier="openAddMortgageDialog"
          :mortgageDetails="false"
          @onSelectMortgage="onSelectMortgage"
        />
      </q-card>
    </q-dialog>

    <!-- Add Mortgage List -->
    <q-dialog
      v-model="mortgageInfo.addMortgageDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddMortgage
          @closeDialog="mortgageInfo.addMortgageDialog = false"
          :componentName="constants.industries.MORTGAGE"
          :isEdit="false"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CustomBar from 'components/CustomBar';
import MortgagesList from 'components/MortgagesList';
import { mapGetters, mapActions } from 'vuex';
import { constants } from '@utils/constant';
import AddMortgage from 'components/AddMortgage';
export default {
  name: 'Mortgage',
  components: {
    CustomBar,
    MortgagesList,
    AddMortgage
  },
  props: {
    mortgageInfo: {
      type: Object
    }
  },
  data() {
    return {
      constants: constants
    };
  },
  // computed: { ...mapGetters(['']) },
  methods: {
    ...mapActions(['']),
    onSelectMortgageClick() {
      this.mortgageInfo.mortgageList = true;
    },
    onSelectMortgage(mortgage) {},
    openAddMortgageDialog() {
      this.mortgageInfo.addMortgageDialog = true;
    }
  }
};
</script>
