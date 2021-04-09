<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-separator vertical></q-separator>
        <q-btn
          @click="mortgageInfo.mortgageInfoDialog = true"
          flat
          class="q-ml-auto"
          ><img src="~assets/addMortgage.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page ">
        <div
          class="clients-list q-ma-sm"
          v-if="mortgage.attributes.mortgageInfo.length"
        >
          <div
            class="clients-list"
            v-for="(mortgage, index) in mortgage.attributes.mortgageInfo"
          >
            <div class="client-list-item">
              <div class="form-heading">
                {{ mortgage.value }}
              </div>
              <div>
                <div v-if="mortgage.address">
                  {{
                    mortgage.address.streetAddress
                      ? mortgage.address.streetAddress
                      : '-'
                  }}
                  <div>
                    {{
                      mortgage.address.addressRegion
                        ? mortgage.address.addressRegion
                        : '-'
                    }},
                    {{
                      mortgage.address.addressCountry
                        ? mortgage.address.addressCountry
                        : '-'
                    }}
                    <div>
                      {{
                        mortgage.address.addressLocality
                          ? mortgage.address.addressLocality
                          : '-'
                      }}
                    </div>
                    <div>
                      {{
                        mortgage.address.houseNumber
                          ? mortgage.address.houseNumber
                          : '-'
                      }}
                    </div>
                  </div>
                </div>
                <div
                  v-for="(contact, index) in mortgage.contact"
                  v-if="mortgage.contact"
                >
                  <div class="form-heading">
                    {{ contact.fname ? contact.fname : '-' }}
                    {{ contact.lname ? contact.lname : '-' }}
                  </div>
                  <p class="texts">
                    Email:
                    <span
                      class="clickLink"
                      @click="onEmailClick(contact.email, $event)"
                    >
                      {{ contact.email ? contact.email : '-' }}
                    </span>
                  </p>
                  <div
                    v-for="phone in contact.phoneNumber"
                    v-if="mortgage.contact"
                  >
                    <p class="texts">
                      Mobile: {{ phone.type }},
                      <span
                        class="clickLink"
                        @click="onPhoneNumberClick(phone.number, $event)"
                      >
                        {{ phone.number }}
                      </span>
                    </p>
                  </div>
                  <q-separator />
                </div>
              </div>
              <div class="q-mt-sm">
                <span class="form-heading "> Loan Number :</span>
                {{ mortgage.loanNumber ? mortgage.loanNumber : '-' }}
              </div>
              <div>
                <span class="form-heading"> Account Number :</span>
                {{ mortgage.accountNumber ? mortgage.accountNumber : '-' }}
              </div>
            </div>
          </div>
        </div>

        <div v-else class="full-height full-width column">
          <div class="column absolute-center">
            <div style="color: #666666,align-items: center">
              You haven't added a Mortgage yet.
            </div>

            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              width="130px"
              height="100px"
              @click="mortgageInfo.mortgageInfoDialog = true"
            />
          </div>
        </div>
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
import { constants } from '@utils/constant';
import { successMessage } from '@utils/validation';
import Mortgage from 'components/Mortgage';
export default {
  components: {
    CustomBar,
    Mortgage
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
    successMessage,
    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open('tel:' + number);
      }
    },
    onEmailClick(email, e) {
      e.stopPropagation();
      if (email) {
        window.open('mailto:' + email);
      }
    },
    async onSaveButtonClick() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          mortgageInfo: {
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
