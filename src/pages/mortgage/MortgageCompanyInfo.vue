<template>
  <q-page>
    <div class="listing-height q-pa-md mobile-container-page">
      <span class="text-bold text-h6 q-ml-md">
        {{ selectedMortgage.name ? selectedMortgage.name : '-' }}
      </span>
      <q-card class="q-ma-sm q-pa-sm">
        <div class="q-my-auto row q-mt-xs">
          <q-icon
            :style="
              selectedMortgage.isEditable == false ? 'visibility:hidden;' : ''
            "
            size="xs"
            name="create "
            color="primary"
            class="q-ml-auto"
            @click="onEdit"
          ></q-icon>

          <q-icon
            class="q-my-auto"
            name="delete"
            size="xs"
            color="primary"
            @click="onDelete"
          />
        </div>
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
        <div class="row q-mt-sm" v-for="phone in selectedMortgage.phoneNumber">
          <span class="heading-light col-3"> Phone Number </span>
          <span class="col q-ml-md" v-if="phone.type">
            {{ phone.type }} :
            <span
              class="clickLink"
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ phone.number ? phone.number : '-' }}</span
            ></span
          >
        </div>
        <div class="row q-mt-sm" v-if="selectedMortgage.info">
          <span class="heading-light col-3"> Website: </span>
          <span class="q-ml-md col">
            {{
              selectedMortgage.info.website
                ? selectedMortgage.info.website
                : '-'
            }}</span
          >
        </div>
        <div class="row q-mt-sm" v-if="selectedMortgage.info">
          <span class="heading-light col-3"> Notes: </span>
          <span class="q-ml-md col">
            {{
              selectedMortgage.info.notes ? selectedMortgage.info.notes : '-'
            }}</span
          >
        </div>
      </q-card>
    </div>

    <q-dialog
      v-model="addMortgageDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddMortgage
          @closeDialog="closeAddMortgageDialog"
          :componentName="constants.industries.MORTGAGE"
          :isEdit="true"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
import AddMortgage from 'components/AddMortgage';
import { constants } from '@utils/constant';
export default {
  name: 'Mortgage',
  components: { AddMortgage },
  data() {
    return {
      addMortgageDialog: false,
      constants: constants
    };
  },
  computed: {
    ...mapGetters(['selectedMortgage'])
  },
  mounted() {
    this.getMortgageDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions([
      'getMortgageDetails',
      'deleteMortgageInfo',
      'editMortgageInfo'
    ]),
    sendMap,
    onEmailClick,
    onPhoneNumberClick,

    closeAddMortgageDialog(e) {
      this.addMortgageDialog = false;
    },
    async onDelete() {
      const mortgage = {
        id: this.$route.params.id
      };
      await this.deleteMortgageInfo(mortgage);
      this.$router.push('/mortgages');
    },
    onEdit() {
      this.addMortgageDialog = true;
    }
  }
};
</script>
