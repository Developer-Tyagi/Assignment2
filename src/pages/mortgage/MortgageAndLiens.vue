<template>
  <div>
    <div>
      <div v-if="mortgage.mortgages">
        <q-card
          class=" q-pa-sm q-mt-md"
          v-for="(mortgage, index) in mortgage.mortgages"
        >
          <div class="form-heading  text-capitalize q-mt-xs row">
            <span class="q-my-auto"> {{ mortgage.name }}</span>
            <q-icon
              size="xs"
              name="create "
              color="primary"
              class="q-ml-auto"
              @click="onEdit(index)"
            ></q-icon>
            <q-icon
              class="q-my-auto"
              name="delete"
              size="xs"
              color="primary"
              @click="onClickDelete(index)"
            />
          </div>
          <div class="row q-mt-sm">
            <div class="heading-light col-3">Address Details</div>
            <div class="col-7" v-if="mortgage.address">
              {{
                mortgage.address.houseNumber
                  ? mortgage.address.houseNumber
                  : '-'
              }}
              {{ mortgage.address.address1 ? mortgage.address.address1 : '-' }}
              <div v-if="mortgage.address.address2">
                {{ mortgage.address.address2 }}
              </div>
              <div>
                {{
                  mortgage.address.addressLocality
                    ? mortgage.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  mortgage.address.addressRegion
                    ? toGetStateShortName(mortgage.address.addressRegion)
                    : '-'
                }}

                {{
                  mortgage.address.postalCode
                    ? mortgage.address.postalCode
                    : '-'
                }}
                <q-icon
                  name="place"
                  color="primary"
                  @click="sendMap(mortgage.address)"
                  style="position: absolute; right: 20px"
                  size="sm"
                ></q-icon>
              </div>
            </div>
          </div>
          <div class="row q-mt-sm" v-if="mortgage.email">
            <span class="heading-light col-3"> Email </span>
            <span
              class="q-ml-none col clickLink"
              @click="onEmailClick(mortgage.email, $event)"
            >
              {{ mortgage.email ? mortgage.email : '-' }}</span
            >
          </div>
          <div class="row">
            <div class="heading-light col-3">Phone Number</div>
            <div class="q-mt-xs col-6 q-ml-none">
              <div class="row" v-for="phone in mortgage.phoneNumber">
                <div class="col-3">
                  {{ phone.type ? phone.type : '-' }}
                </div>
                <div
                  class="clickLink"
                  @click="onPhoneNumberClick(phone.number, $event)"
                >
                  {{ phone.number ? phone.number : '-' }}
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mt-sm q-mb-sm">
            <span class="heading-light col-3"> Notes: </span>
            <span class="col q-ml-none" v-if="mortgage.note">
              {{ mortgage.note ? mortgage.note : '-' }}</span
            >
          </div>
          <div class="row q-mt-sm" v-if="mortgage.loanNumber">
            <span class="heading-light col-3"> Loan Number: </span>
            <span class="q-ml-none col">
              {{ mortgage.loanNumber ? mortgage.loanNumber : '-' }}</span
            >
          </div>
          <div class="row q-mt-sm" v-if="mortgage.accountNumber">
            <span class="heading-light col-3"> Account Number: </span>
            <span class="q-ml-none col">
              {{ mortgage.accountNumber ? mortgage.accountNumber : '-' }}</span
            >
          </div>
        </q-card>
      </div>
      <div v-else class="full-height  text-center">
        <div class="q-mt-xs">
          <div style="color: #666666;">
            You haven't added a Mortgage yet.
          </div>
          <img
            class="text-center"
            src="~assets/add.svg"
            @click="mortgageInfoDialog = true"
            width="30px"
            height="30px"
          />
        </div>
      </div>
      <div class="row ">
        <div
          class="q-ml-auto q-mt-sm "
          v-if="!mortgageInfoDialog && mortgage.mortgages"
        >
          <q-btn
            @click="(mortgageInfoDialog = true), $emit('addMortgage', true)"
            label="Add Mortgage"
            color="primary"
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- Mortgage Dialog -->
    <q-dialog
      v-model="mortgageInfoDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="
            (mortgageInfoDialog = false), $emit('addMortgage', false)
          "
          :dialogName="'Mortagage Info'"
        />
        <div class="mobile-container-page q-pa-sm form-height">
          <q-form ref="estimatingInfoForm">
            <MortgageForm
              :mortgage="mortgageInfo"
              :isThereSecondMortgage="false"
              :isEdit="true"
            />
          </q-form>
        </div>
        <q-btn
          label="Save"
          class="single-next-button-style"
          @click="onSaveButtonClick"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <!-- Edit Mortgage Dialog  -->
    <q-dialog
      v-model="editMortgageInfoDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="
            (editMortgageInfoDialog = false), $emit('addMortgage', false)
          "
          :dialogName="' Edit Mortagage Info'"
        />
        <div class="mobile-container-page q-pa-sm form-height">
          <q-form ref="estimatingInfoForm">
            <MortgageForm
              :mortgage="editMortgageInfo"
              :isThereSecondMortgage="false"
              @mortgage="mortgage"
              :isEdit="true"
            />
          </q-form>
        </div>
        <q-btn
          label="Save"
          class="single-next-button-style"
          @click="onEditSaveButtonClick"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteAlertDialog">
      <q-card>
        <DeleteAlert
          @close="deleteAlertDialog = false"
          @onDelete="onDeleteMortgage"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import { constants } from '@utils/constant';
import DeleteAlert from 'components/DeleteAlert';
import { toGetStateShortName } from '@utils/common';
import AddMortgage from 'components/AddMortgage';
import { successMessage } from '@utils/validation';
import MortgageForm from 'components/MortgageForm';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
export default {
  name: 'MortgageAndLiens',
  components: {
    CustomBar,
    MortgageForm,
    ClaimDetail,
    AddMortgage,
    DeleteAlert
  },
  data() {
    return {
      deleteAlertDialog: false,
      id: '',
      mortgageID: '',
      mortgageInfoDialog: false,
      editMortgageInfoDialog: false,
      constants: constants,
      mortgageInfo: [
        {
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: true,
          note: ''
        }
      ],
      editMortgageInfo: [
        {
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: true,
          note: ''
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['mortgage', 'selectedClaimId', 'mortgages'])
  },
  created() {
    this.getMortgage(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getMortgages',
      'addMortgage',
      'getMortgage',
      'updateMortgageInfo',
      'deleteClaimMortgageInfo'
    ]),
    toGetStateShortName,
    onEdit(index) {
      this.mortgageInfoDialog = false;
      this.$emit('addMortgage', true);
      this.editMortgageInfoDialog = true;
      this.editMortgageInfo[0].id = this.mortgage.mortgages[index].id;
      this.editMortgageInfo[0].value = this.mortgage.mortgages[index].name;
      this.editMortgageInfo[0].address = this.mortgage.mortgages[index].address;
      this.editMortgageInfo[0].phoneNumber = this.mortgage.mortgages[
        index
      ].phoneNumber;
      this.editMortgageInfo[0].email = this.mortgage.mortgages[index].email;

      this.editMortgageInfo[0].loanNumber = this.mortgage.mortgages[
        index
      ].loanNumber;
      this.editMortgageInfo[0].accountNumber = this.mortgage.mortgages[
        index
      ].accountNumber;
      this.editMortgageInfo[0].isPrimary = this.mortgage.mortgages[
        index
      ].isPrimary;
      this.editMortgageInfo[0].notes = this.mortgage.mortgages[index].note;
      this.id = this.mortgage.mortgages[index].id;
      this.mortgageID = this.mortgage.mortgages[index].mortgageID;
    },
    async onEditSaveButtonClick() {
      const payload = {
        claimID: this.selectedClaimId,
        mortgageID: this.id,
        data: {
          mortgage: {
            mortgageID: this.mortgageID,
            loanNumber: this.editMortgageInfo[0].loanNumber,
            accountNumber: this.editMortgageInfo[0].accountNumber,
            isPrimary: this.editMortgageInfo[0].isPrimary,
            note: this.editMortgageInfo[0].notes
          }
        }
      };
      await this.updateMortgageInfo(payload);
      this.editMortgageInfoDialog = false;
      this.getMortgage(this.selectedClaimId);
    },
    onClickDelete(index) {
      this.deleteAlertDialog = true;
      this.valueIndex = index;
    },
    async onDeleteMortgage() {
      const mortgage = {
        claimID: this.selectedClaimId,
        mortgageID: this.mortgage.mortgages[this.valueIndex].id
      };
      await this.deleteClaimMortgageInfo(mortgage);
      this.getMortgage(this.selectedClaimId);
    },
    onNameClick(value) {
      this.$router.push('/vendor-details/' + value);
    },
    openAddMortgageDialog() {
      this.mortgageListDialog = true;
      this.getMortgages(this.selectedClaimId);
    },
    successMessage,
    onPhoneNumberClick,
    onEmailClick,
    sendMap,
    async onSaveButtonClick() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          mortgage: {
            mortgageID: this.mortgageInfo[0].id,
            value: this.mortgageInfo[0].value,
            loanNumber: this.mortgageInfo[0].loanNumber,
            accountNumber: this.mortgageInfo[0].accountNumber,
            isPrimary: this.mortgageInfo[0].isPrimary,
            note: this.mortgageInfo[0].notes
          }
        }
      };

      await this.addMortgage(payload);
      this.successMessage(constants.successMessages.MORTGAGE);
      this.mortgageInfoDialog = false;
      this.getMortgage(this.selectedClaimId);
      this.mortgageInfo[0].id = '';
      this.mortgageInfo[0].value = '';
      this.mortgageInfo[0].loanNumber = '';
      this.mortgageInfo[0].accountNumber = '';
      this.mortgageInfo[0].note = '';
    }
  }
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
