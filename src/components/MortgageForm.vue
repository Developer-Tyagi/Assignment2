<template>
  <div>
    <!-- Mortgage Form -->
    <div class="custom-select" v-if="!mortgage[0].value">
      <div class="select-text" @click="mortgageList = true">
        Click for choosing a Mortgage
      </div>
    </div>

    <div>
      <q-card
        bordered
        v-if="mortgage[0].value"
        @click="onChooseMortgageClick(0)"
        class="q-my-md q-pa-md"
      >
        <div class="text-bold">{{ mortgage[0].value }}</div>
        <div v-if="mortgage[0].address && mortgage[0].address.streetAddress">
          <div>
            {{ mortgage[0].address ? mortgage[0].address.houseNumber : '-' }}
            ,
            {{
              mortgage[0].address.streetAddress
                ? mortgage[0].address.streetAddress
                : '-'
            }}
          </div>
          <div>
            {{
              mortgage[0].address.addressLocality
                ? mortgage[0].address.addressLocality
                : '-'
            }}
            ,
            {{
              mortgage[0].address.addressRegion
                ? mortgage[0].address.addressRegion
                : '-'
            }}
          </div>
          <div class="row">
            {{
              mortgage[0].address.addressCountry
                ? mortgage[0].address.addressCountry
                : '-'
            }}
            -
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
            {{ mortgage[0].phone }}</span
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

    <q-input dense v-model="mortgage[0].loanNumber" label="Loan Number" />
    <q-input dense v-model="mortgage[0].accountNumber" label="Account Number" />
    <div class="form-heading">Notes</div>
    <textarea
      rows="5"
      class="full-width"
      v-model="mortgage[0].notes"
      style="resize: none"
    />
    <div class="row" v-if="isThereSecondMortgage">
      <span class="form-heading"> Is there a 2nd mortgage on the home? </span>

      <q-toggle
        class="q-ml-auto"
        v-model="isSecondMortgageHome"
        @input="onSecondMortgageToggle"
      />
    </div>
    <div v-if="isSecondMortgageHome">
      <div
        class="custom-select"
        @click="onChooseMortgageClick(1)"
        v-if="!mortgage[1].value"
      >
        <div class="select-text">Click for choosing a Second Mortgage</div>
      </div>

      <div>
        <q-card
          bordered
          v-if="mortgage[1].value"
          @click="mortgageList = true"
          class="q-my-md q-pa-md"
        >
          <div class="text-bold">{{ mortgage[1].value }}</div>
          <div v-if="mortgage[1].address && mortgage[1].address.streetAddress">
            <div>
              {{ mortgage[1].address ? mortgage[1].address.houseNumber : '-' }}
              ,
              {{
                mortgage[1].address.streetAddress
                  ? mortgage[1].address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                mortgage[1].address.addressLocality
                  ? mortgage[1].address.addressLocality
                  : '-'
              }}
              ,
              {{
                mortgage[1].address.addressRegion
                  ? mortgage[1].address.addressRegion
                  : '-'
              }}
            </div>
            <div class="row">
              {{
                mortgage[1].address.addressCountry
                  ? mortgage[1].address.addressCountry
                  : '-'
              }}
              -
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

      <q-input dense v-model="mortgage[1].loanNumber" label="Loan Number" />
      <q-input
        dense
        v-model="mortgage[1].accountNumber"
        label="Account Number"
      />
      <div class="form-heading">Notes</div>
      <textarea
        rows="5"
        class="full-width"
        v-model="mortgage[1].notes"
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
  created() {},
  methods: {
    ...mapActions(['']),
    onSelectMortgageClick() {
      this.mortgage.mortgageList = true;
      this.mortgage.addMortgageDialog = true;
    },
    onChooseMortgageClick(index) {
      this.selectedIndex = index;
      this.mortgageList = true;
    },
    onSecondMortgageToggle() {
      if (this.isSecondMortgageHome) {
        this.mortgage.push({
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: false,
          notes: ''
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
