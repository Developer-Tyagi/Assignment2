<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-separator vertical></q-separator>
        <q-btn
          @click="mortgageObject.mortgageInfoDialog = true"
          flat
          class="q-ml-auto q-mt-md"
          ><img src="~assets/addMortgage.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page ">
        <ClaimDetail />
      </div>
    </div>
    <!-- Mortgage Dialog -->
    <q-dialog
      v-model="mortgageObject.mortgageInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="mortgageObject.mortgageInfoDialog = false"
          :dialogName="'Mortagage Info'"
        />
        <div class="mobile-container-page q-pa-sm form-height  ">
          <q-form ref="estimatingInfoForm">
            <MortgageForm
              :mortgageInfo="mortgageObject"
              :isThereSecondMortgageToggle="false"
              :isSelect="true"
            />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onSaveButtonClick"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import { constants } from '@utils/constant';
import AddMortgage from 'components/AddMortgage';
import { successMessage } from '@utils/validation';
import MortgageForm from 'components/MortgageForm';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';
export default {
  components: {
    CustomBar,
    MortgageForm,
    ClaimDetail,
    AddMortgage
  },
  data() {
    return {
      mortgageListDialog: false,
      constants: constants,
      mortgageObject: {
        addMortgageDialog: false,
        mortgageList: false,
        vendorsListDialog: false,
        vendorDialogFilterByIndustry: '',
        showVendorDialogFilters: false,
        addVendorDialog: false,
        vendorDialogName: '',
        valueName: '',
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
      }
    };
  },
  computed: {
    ...mapGetters(['mortgage', 'selectedClaimId', 'mortgages'])
  },
  created() {
    // this.getMortgage(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getMortgages', 'addMortgage']),
    onNameClick(value) {
      this.$router.push('/vendor-details/' + value);
    },
    openAddMortgageDialog() {
      this.mortgageObject.mortgageListDialog = true;
      this.getMortgages(this.selectedClaimId);
    },
    successMessage,
    onPhoneNumberClick,
    onEmailClick,
    async onSaveButtonClick() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          mortgage: {
            mortgageID: this.mortgageObject.mortgageDetails[0].id,
            // value: this.mortgageInfo.mortgageDetails[0].value,
            loanNumber: this.mortgageObject.mortgageDetails[0].loanNumber,
            accountNumber: this.mortgageObject.mortgageDetails[0].accountNumber,
            isPrimary: this.mortgageObject.mortgageDetails[0].isPrimary,
            notes: this.mortgageObject.mortgageDetails[0].notes
          }
        }
      };
      await this.addMortgage(payload);
      this.successMessage(constants.successMessages.MORTGAGE);
      this.mortgageObject.mortgageInfoDialog = false;
      this.getMortgage(this.selectedClaimId);
      this.mortgageObject.mortgageDetails[0].id = '';
      this.mortgageObject.mortgageDetails[0].value = '';
      this.mortgageObject.mortgageDetails[0].loanNumber = '';
      this.mortgageObject.mortgageDetails[0].accountNumber = '';
      this.mortgageObject.mortgageDetails[0].notes = '';
    }
  }
};
</script>
