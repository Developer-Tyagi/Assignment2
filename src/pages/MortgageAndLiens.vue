<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-separator vertical></q-separator>
        <q-btn
          @click="mortgageInfo.mortgageInfoDialog = true"
          flat
          class="q-ml-auto q-mt-md"
          ><img src="~assets/addMortgage.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page ">
        <ClaimDetail />
        <!-- Mortgage Dialog -->
        <q-dialog
          v-model="mortgageInfo.mortgageInfoDialog"
          persistent
          :maximized="true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <CustomBar
              @closeDialog="mortgageInfo.mortgageInfoDialog = false"
              :dialogName="'Mortagage Info'"
            />
            <div class="mobile-container-page q-pa-sm form-height  ">
              <q-form ref="estimatingInfoForm">
                <Mortgage
                  :mortgageInfo="mortgageInfo"
                  :isThereSecondMortgageToggle="false"
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
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import { constants } from '@utils/constant';
import { successMessage } from '@utils/validation';
import Mortgage from 'components/Mortgage';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';

export default {
  components: {
    CustomBar,
    Mortgage,
    ClaimDetail
  },
  data() {
    return {
      constants: constants,
      mortgageInfo: {
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
    ...mapGetters(['mortgage', 'selectedClaimId', 'vendors'])
  },
  created() {
    this.getMortgage(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getMortgage', 'getVendors', 'addMortgage']),
    onNameClick(value) {
      this.$router.push('/vendor-details/' + value);
    },
    successMessage,
    onPhoneNumberClick,
    onEmailClick,
    async onSaveButtonClick() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          mortgage: {
            id: this.mortgageInfo.mortgageDetails[0].id,
            value: this.mortgageInfo.mortgageDetails[0].value,
            loanNumber: this.mortgageInfo.mortgageDetails[0].loanNumber,
            accountNumber: this.mortgageInfo.mortgageDetails[0].accountNumber,
            isPrimary: this.mortgageInfo.mortgageDetails[0].isPrimary,
            notes: this.mortgageInfo.mortgageDetails[0].notes
          }
        }
      };
      await this.addMortgage(payload);
      this.successMessage(constants.successMessages.MORTGAGE);
      this.mortgageInfo.mortgageInfoDialog = false;
      this.getMortgage(this.selectedClaimId);

      this.mortgageInfo.mortgageDetails[0].id = '';
      this.mortgageInfo.mortgageDetails[0].value = '';
      this.mortgageInfo.mortgageDetails[0].loanNumber = '';
      this.mortgageInfo.mortgageDetails[0].accountNumber = '';
      this.mortgageInfo.mortgageDetails[0].notes = '';
    }
  }
};
</script>
