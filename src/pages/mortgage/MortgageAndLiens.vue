<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-separator vertical></q-separator>
        <q-btn @click="onAddMortgageClick" flat class="q-ml-auto q-mt-md"
          ><img src="~assets/addMortgage.svg"
        /></q-btn>
      </div>

      <div class="mobile-container-page ">
        <ClaimDetail />
        <q-card class="q-ma-md q-pa-md" v-if="selectedMortgage">
          <span class="text-bold text-h7 q-ml-xs" v-model="nameMortgageDone">
            {{ selectedMortgage.name ? selectedMortgage.name : '-' }}
          </span>
          <div class="row q-mt-sm">
            <span class="heading-light col-3">Address Details </span>

            <span class="col-7 q-ml-md" v-if="selectedMortgage.address">
              {{
                selectedMortgage.address.houseNumber
                  ? selectedMortgage.address.houseNumber
                  : '-'
              }}
              ,
              {{
                selectedMortgage.address.streetAddress
                  ? selectedMortgage.address.streetAddress
                  : '-'
              }}

              <div>
                {{
                  selectedMortgage.address.addressLocality
                    ? selectedMortgage.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  selectedMortgage.address.addressRegion
                    ? selectedMortgage.address.addressRegion
                    : '-'
                }}
              </div>
              <div>
                {{
                  selectedMortgage.address.addressCountry
                    ? selectedMortgage.address.addressCountry
                    : '-'
                }},
                {{
                  selectedMortgage.address.postalCode
                    ? selectedMortgage.address.postalCode
                    : '-'
                }}
                <q-icon
                  name="place"
                  color="primary"
                  @click="sendMap(selectedMortgage.address)"
                  class="edit-icon"
                ></q-icon></div
            ></span>
          </div>
          <div class="row q-mt-sm" v-if="selectedMortgage.email">
            <span class="heading-light col-3"> Email </span>
            <span
              class="q-ml-md col clickLink"
              @click="onEmailClick(selectedMortgage.email, $event)"
            >
              {{ selectedMortgage.email ? selectedMortgage.email : '-' }}</span
            >
          </div>
          <div
            class="row q-mt-sm "
            v-for="phone in selectedMortgage.phoneNumber"
          >
            <span class="heading-light col-3"> Phone Number </span>
            <span class="col q-ml-md" v-if="phone.type">
              {{ phone.type }} :
              <span
                class="clickLink "
                @click="onPhoneNumberClick(phone.number, $event)"
                >{{ phone.number ? phone.number : '-' }}</span
              ></span
            >
          </div>
          <div class="row  q-mt-sm" v-if="selectedMortgage.info">
            <span class="heading-light col-3"> Website: </span>
            <span class="q-ml-md col ">
              {{
                selectedMortgage.info.website
                  ? selectedMortgage.info.website
                  : '-'
              }}</span
            >
          </div>
          <div class="row  q-mt-sm" v-if="selectedMortgage.info">
            <span class="heading-light col-3"> Notes: </span>
            <span class="q-ml-md col ">
              {{
                selectedMortgage.info.notes ? selectedMortgage.info.notes : '-'
              }}</span
            >
          </div>
        </q-card>
        <div v-else class="full-height full-width column ">
          <div class=" column absolute-center">
            <div
              style="color: #666666,align-items: center; margin-top:200px"
              class="q-mt-xl"
            >
              You haven't added a Mortgage yet.
            </div>
            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              width="130px"
              height="100px"
              @click="onAddMortgageClick"
            />
          </div>
        </div>
      </div>
      <!-- Mortgage List Dialog -->
      <q-dialog
        v-model="mortgageInfoDialog"
        persistent
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <CustomBar
            @closeDialog="mortgageInfoDialog = false"
            :dialogName="'Mortagage Info'"
          />
          <div class="q-pa-sm">
            <q-form ref="estimatingInfoForm">
              <MortgagesList
                @addCarrier="openAddMortgageDialog"
                :mortgageDetails="false"
                @onCloseMortgageSelect="onCloseMortgageList"
                :demo="nameMortgageDone"
              />
            </q-form>
          </div>
        </q-card>
      </q-dialog>
      <!-- Add Mortgage Dialog -->
      <q-dialog
        v-model="addMortgageDialog"
        persistent
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <AddMortgage
            @closeDialog="closeAddMortgageDialog"
            :componentName="constants.industries.MORTGAGE"
            :isEdit="false"
            @onSelectMortgage="onSelect"
          />
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import { constants } from '@utils/constant';
import { successMessage } from '@utils/validation';
import MortgagesList from 'components/MortgagesList';
import AddMortgage from 'components/AddMortgage';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';

export default {
  components: {
    CustomBar,
    MortgagesList,
    ClaimDetail,
    AddMortgage
  },
  data() {
    return {
      addMortgageDialog: false,
      mortgageInfoDialog: false,
      constants: constants,
      nameMortgageDone: ''
    };
  },
  computed: {
    ...mapGetters([
      'mortgage',
      'selectedClaimId',
      'vendors',
      'selectedMortgage'
    ])
  },
  created() {
    this.getMortgage(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getMortgage',
      'getVendors',
      'addMortgage',
      'getMortgageDetails'
    ]),
    onAddMortgageClick() {
      this.mortgageInfoDialog = true;
      this.nameMortgageDone = this.selectedMortgage.name;
    },
    onNameClick(value) {
      this.$router.push('/vendor-details/' + value);
    },
    async onCloseMortgageList() {
      this.mortgageInfoDialog = false;
    },
    async onSelect(id) {
      this.mortgageInfoDialog = false;
      await this.getMortgageDetails(id);
      this.nameMortgageDone = '';
    },
    openAddMortgageDialog(e) {
      this.addMortgageDialog = e;
    },
    closeAddMortgageDialog(e) {
      this.addMortgageDialog = false;
    },
    successMessage,
    onPhoneNumberClick,
    onEmailClick,
    sendMap
  }
};
</script>
