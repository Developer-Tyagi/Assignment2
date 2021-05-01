<template>
  <div>
    <!-- Mortgage Form -->
    <div class="custom-select" v-if="!mortgageInfo.mortgageName">
      <div class="select-text" @click="mortgageList = true">
        Click for choosing a Mortgage
      </div>
    </div>

    <div>
      <q-card
        bordered
        v-if="mortgageInfo.mortgageName"
        @click="onChooseMortgageClick(index)"
        class="q-my-md q-pa-md"
      >
        <div class="text-bold">{{ mortgageInfo.mortgageName }}</div>
        <div v-if="mortgageInfo.address && mortgageInfo.address.streetAddress">
          <div>
            {{ mortgageInfo.address ? mortgageInfo.address.houseNumber : '-' }}
            ,
            {{
              mortgageInfo.address.streetAddress
                ? mortgageInfo.address.streetAddress
                : '-'
            }}
          </div>
          <div>
            {{
              mortgageInfo.address.addressLocality
                ? mortgageInfo.address.addressLocality
                : '-'
            }}
            ,
            {{
              mortgageInfo.address.addressRegion
                ? mortgageInfo.address.addressRegion
                : '-'
            }}
          </div>
          <div class="row">
            {{
              mortgageInfo.address.addressCountry
                ? mortgageInfo.address.addressCountry
                : '-'
            }}
            -
            {{
              mortgageInfo.address.postalCode
                ? mortgageInfo.address.postalCode
                : '-'
            }}
          </div>
        </div>
        <div>
          Phone:
          <span
            class="clickLink"
            @click="onPhoneNumberClick(mortgageInfo.phone, $event)"
          >
            {{ mortgageInfo.phone }}</span
          >
        </div>
        <div>
          Email:<span
            class="clickLink"
            @click="onEmailClick(mortgageInfo.email, $event)"
          >
            {{ mortgageInfo.email }}</span
          >
        </div>
      </q-card>
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
    <div class="row" v-if="isThereSecondMortgage">
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
        @click="onChooseMortgageClick(index)"
        v-if="!mortgageInfo.mortgageName"
      >
        <div class="select-text">Click for choosing a Second Mortgage</div>
      </div>

      <div>
        <q-card
          bordered
          v-if="mortgageInfo.mortgageName"
          @click="mortgageList = true"
          class="q-my-md q-pa-md"
        >
          <div class="text-bold">{{ mortgageInfo.mortgageName }}</div>
          <div
            v-if="mortgageInfo.address && mortgageInfo.address.streetAddress"
          >
            <div>
              {{
                mortgageInfo.address ? mortgageInfo.address.houseNumber : '-'
              }}
              ,
              {{
                mortgageInfo.address.streetAddress
                  ? mortgageInfo.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                mortgageInfo.address.addressLocality
                  ? mortgageInfo.address.addressLocality
                  : '-'
              }}
              ,
              {{
                mortgageInfo.address.addressRegion
                  ? mortgageInfo.address.addressRegion
                  : '-'
              }}
            </div>
            <div class="row">
              {{
                mortgageInfo.address.addressCountry
                  ? mortgageInfo.address.addressCountry
                  : '-'
              }}
              -
              {{
                mortgageInfo.address.postalCode
                  ? mortgageInfo.address.postalCode
                  : '-'
              }}
            </div>
          </div>
          <div>
            Phone:
            <span
              class="clickLink"
              @click="onPhoneNumberClick(mortgageInfo.phone, $event)"
            >
              {{ mortgageInfo.phone }}</span
            >
          </div>
          <div>
            Email:<span
              class="clickLink"
              @click="onEmailClick(mortgageInfo.email, $event)"
            >
              {{ mortgageInfo.email }}</span
            >
          </div>
        </q-card>
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
      v-model="mortgageList"
      persistent
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
      persistent
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
    mortgage: {
      type: Array
    },
    isThereSecondMortgage: {
      type: Boolean
    }
  },
  data() {
    return {
      selectedIndex: 0,
      addMortgageDialog: false,
      constants: constants,
      mortgageList: false
    };
  },
  created() {
    console.log(this.mortgageInfo, 'mortgage');
  },
  methods: {
    ...mapActions(['']),
    onSelectMortgageClick() {
      this.mortgageInfo.mortgageList = true;
      this.mortgageInfo.addMortgageDialog = true;
    },
    onChooseMortgageClick(index) {
      this.selectedIndex = index;
      this.mortgageList = true;
    },
    onSecondMortgageToggle() {
      if (this.mortgageInfo.isSecondMortgageHome) {
        this.mortgageInfo.mortgageDetails.push({
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: false,
          notes: ''
        });
        console.log(this.mortgageInfo.mortgageDetails, 'ARRAY');
      } else {
        this.mortgageInfo.mortgageDetails.pop();
      }
    },
    onCloseAddMortgageDialogBox(mortgage) {
      this.mortgageInfo.mortgageId = mortgage.id;
      this.mortgageInfo.mortgageName = mortgage.name;
      this.mortgageInfo.address = mortgage.address;
      this.mortgageInfo.email = mortgage.email;
      this.mortgageInfo.phone = mortgage.phoneNumber
        ? mortgage.phoneNumber[0].number
        : '';
      this.mortgageList = false;
      this.addMortgageDialog = false;
    },
    openAddMortgageDialog() {
      this.mortgageInfo.addMortgageDialog = true;
    },
    onSelectingMortgageList(mortgage) {
      this.mortgageInfo.mortgageId = mortgage.id;
      this.mortgageInfo.mortgageName = mortgage.name;
      this.mortgageInfo.address = mortgage.address;
      this.mortgageInfo.email = mortgage.email;
      this.mortgageInfo.phone = mortgage.phoneNumber
        ? mortgage.phoneNumber[0].number
        : '';
      this.mortgageList = false;
    }
  }
};
</script>
