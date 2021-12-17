<template>
  <div>
    <!-- Mortgage Form -->

    <div v-if="mortgage[0].value">
      <q-card
        bordered
        @click="isOfflineClientEdit ? '' : onChooseMortgageClick"
        class="q-my-md q-pa-md"
      >
        <div class="text-bold">{{ mortgage[0].value }}</div>
        <div v-if="mortgage[0].address && mortgage[0].address.address1">
          <div>
            {{ mortgage[0].address ? mortgage[0].address.houseNumber : '-' }}
            {{
              mortgage[0].address.address1 ? mortgage[0].address.address1 : '-'
            }}
          </div>
          <div v-if="mortgage[0].address && mortgage[0].address.address2">
            {{ mortgage[0].address.address2 }}
          </div>
          <div class="row">
            {{
              mortgage[0].address.addressLocality
                ? mortgage[0].address.addressLocality
                : '-'
            }}
            ,
            {{
              mortgage[0].address.addressRegion
                ? toGetStateShortName(mortgage[0].address.addressRegion)
                : '-'
            }}
            {{
              mortgage[0].address.postalCode
                ? mortgage[0].address.postalCode
                : '-'
            }}
          </div>
        </div>
        <div>
          Phone:
          <span
            class="clickLink"
            @click="onPhoneNumberClick(mortgage[0].phone, $event)"
          >
            {{
              mortgage[0].phone ? showPhoneNumber(mortgage[0].phone) : '-'
            }}</span
          >
        </div>
        <div>
          Email:<span
            class="clickLink"
            @click="onEmailClick(mortgage[0].email, $event)"
          >
            {{ mortgage[0].email }}</span
          >
        </div>
      </q-card>
    </div>
    <div v-else>
      <q-btn
        style="width: 100%"
        no-caps
        outline
        class="custom-select"
        rounded
        @click="mortgageList = true"
        label="Click for choosing a Mortgage"
        :disable="isOfflineClientEdit"
      />
    </div>
    <q-input
      dense
      borderless
      class="input-style input-field"
      v-model="mortgage[0].loanNumber"
      label="Loan Number"
      :disable="isOfflineClientEdit"
    />
    <q-input
      dense
      borderless
      class="input-style input-field"
      v-model="mortgage[0].accountNumber"
      label="Account Number"
      :disable="isOfflineClientEdit"
    />
    <div class="q-ml-xs q-mt-sm form-heading">Notes</div>
    <q-input
      type="textarea"
      rows="3"
      class="q-pt-md required input-style input-overlay full-width"
      borderless
      v-model="mortgage[0].note"
      style="resize: none"
      :disable="isOfflineClientEdit"
    />
    <div class="row q-mt-sm q-ml-xs" v-if="isThereSecondMortgage">
      <span class="form-heading"> Is there a 2nd mortgage on the home? </span>
      <q-toggle
        class="q-ml-auto"
        v-model="mortgage[0].isSecondMortgageHome"
        @input="onSecondMortgageToggle"
        :disable="isOfflineClientEdit"
      />
    </div>
    <div v-if="mortgage[0].isSecondMortgageHome">
      <q-btn
        @click="onChooseMortgageClick(1)"
        v-if="!mortgage[1].value"
        rounded
        outline
        style="width: 100%"
        class="q-mt-md"
        label="Click for choosing a Second Mortgage"
      />
      <div>
        <q-card
          bordered
          v-if="mortgage[1].value"
          @click="onClickSecondMortgage"
          class="q-my-md q-pa-md"
        >
          <div class="text-bold">{{ mortgage[1].value }}</div>
          <div v-if="mortgage[1].address && mortgage[1].address.address1">
            <div>
              {{ mortgage[1].address ? mortgage[1].address.houseNumber : '-' }}
              ,
              {{
                mortgage[1].address.address1
                  ? mortgage[1].address.address1
                  : '-'
              }}
            </div>
            <div v-if="mortgage[1].address && mortgage[1].address.address2">
              {{ mortgage[1].address.address2 }}
            </div>
            <div class="row">
              {{
                mortgage[1].address.addressLocality
                  ? mortgage[1].address.addressLocality
                  : '-'
              }}
              ,
              {{
                mortgage[1].address.addressRegion
                  ? toGetStateShortName(mortgage[1].address.addressRegion)
                  : '-'
              }}

              {{
                mortgage[1].address.postalCode
                  ? mortgage[1].address.postalCode
                  : '-'
              }}
            </div>
          </div>
          <div>
            Phone:
            <span
              class="clickLink"
              @click="onPhoneNumberClick(mortgage[1].phone, $event)"
            >
              {{ mortgage[1].phone }}</span
            >
          </div>
          <div>
            Email:<span
              class="clickLink"
              @click="onEmailClick(mortgage[1].email, $event)"
            >
              {{ mortgage[1].email }}</span
            >
          </div>
        </q-card>
      </div>

      <q-input
        dense
        borderless
        class="input-style input-field"
        v-model="mortgage[1].loanNumber"
        label="Loan Number"
        :disable="isOfflineClientEdit"
      />
      <q-input
        dense
        borderless
        class="input-style input-field"
        v-model="mortgage[1].accountNumber"
        label="Account Number"
        :disable="isOfflineClientEdit"
      />
      <div class="q-ml-xs q-mt-sm form-heading">Notes</div>
      <q-input
        type="textarea"
        rows="3"
        class="q-pt-md required input-style input-overlay full-width"
        borderless
        v-model="mortgage[1].note"
        style="resize: none"
        :disable="isOfflineClientEdit"
      />
    </div>
    <!-- Mortgage List -->
    <q-dialog
      v-model="mortgageList"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Mortgages'"
          @closeDialog="mortgageList = false"
        />
        <MortgagesList
          selectMortgage="true"
          @addMortagage="addMortgageDialog = true"
          @afterSelecting="onSelectingMortgageList"
        />
      </q-card>
    </q-dialog>

    <!-- Add Mortgage  -->
    <q-dialog
      v-model="addMortgageDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddMortgage
          @closeDialog="addMortgageDialog = false"
          :componentName="constants.industries.MORTGAGE"
          :isEdit="false"
          @onCloseAddMortgage="onCloseAddMortgageDialogBox"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CustomBar from 'components/CustomBar';
import MortgagesList from 'components/MortgagesList';
import { mapGetters } from 'vuex';
import { constants } from '@utils/constant';
import { showPhoneNumber } from '@utils/clickable';
import AddMortgage from 'components/AddMortgage';
import { toGetStateShortName } from '@utils/common';
export default {
  name: 'Mortgage',
  components: {
    CustomBar,
    MortgagesList,
    AddMortgage
  },
  props: {
    mortgage: {
      type: Array
    },
    isThereSecondMortgage: {
      type: Boolean
    },
    isEdit: {
      type: Boolean
    }
  },
  data() {
    return {
      isSecondMortgageHome: false,
      selectedIndex: 0,
      addMortgageDialog: false,
      constants: constants,
      mortgageList: false
    };
  },
  computed: {
    ...mapGetters(['isOfflineClientEdit'])
  },

  methods: {
    showPhoneNumber,
    toGetStateShortName,
    onClickSecondMortgage() {
      if (!this.isOfflineClientEdit) {
        this.mortgageList = true;
      }
    },
    onSelectMortgageClick() {
      this.mortgage.mortgageList = true;
      this.mortgage.addMortgageDialog = true;
    },
    onChooseMortgageClick(index) {
      if (!this.isOfflineClientEdit) {
        this.selectedIndex = index;
        this.mortgageList = true;
      }
    },
    onSecondMortgageToggle() {
      if (this.mortgage[0].isSecondMortgageHome) {
        this.mortgage.push({
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: false,
          note: ''
        });
      } else {
        this.mortgage.pop();
      }
    },
    onCloseAddMortgageDialogBox(mortgage) {
      this.mortgage[this.selectedIndex].id = mortgage.id;
      this.mortgage[this.selectedIndex].value = mortgage.name;
      this.mortgage[this.selectedIndex].address = mortgage.address;
      this.mortgage[this.selectedIndex].email = mortgage.email;
      this.mortgage[this.selectedIndex].phone = mortgage.phoneNumber
        ? mortgage.phoneNumber[0].number
        : '';
      this.mortgageList = false;
      this.addMortgageDialog = false;
    },
    openAddMortgageDialog() {
      this.mortgage.addMortgageDialog = true;
    },
    onSelectingMortgageList(mortgage) {
      this.mortgage[this.selectedIndex].id = mortgage.id;
      this.mortgage[this.selectedIndex].value = mortgage.name;
      this.mortgage[this.selectedIndex].address = mortgage.address;
      this.mortgage[this.selectedIndex].email = mortgage.email;
      this.mortgage[this.selectedIndex].phone = mortgage.phoneNumber
        ? mortgage.phoneNumber[0].number
        : '';
      this.mortgageList = false;
    }
  }
};
</script>
