<template>
  <div>
    <div class="q-my-auto row ">
      <q-icon
        :style="selectedCarrier.isEditable == false ? 'visibility:hidden;' : ''"
        size="xs"
        name="create "
        color="primary"
        class="q-ml-auto"
        @click="onEdit"
      ></q-icon>

      <q-icon
        :style="selectedCarrier.isEditable == false ? 'visibility:hidden;' : ''"
        class="q-my-auto"
        name="delete"
        size="xs"
        color="primary"
        @click="onDelete"
      />
    </div>
    <div class="row q-mt-sm">
      <span class="heading-light col-4">Address Details</span>
      <span class="col-7 q-ml-md" v-if="selectedCarrier.address">
        {{
          selectedCarrier.address.houseNumber
            ? selectedCarrier.address.houseNumber
            : '-'
        }}
        ,
        {{
          selectedCarrier.address.streetAddress
            ? selectedCarrier.address.streetAddress
            : '-'
        }}
        <div>
          {{
            selectedCarrier.address.addressLocality
              ? selectedCarrier.address.addressLocality
              : '-'
          }}
          ,
          {{
            selectedCarrier.address.addressRegion
              ? selectedCarrier.address.addressRegion
              : '-'
          }}
        </div>
        <div>
          {{
            selectedCarrier.address.addressCountry
              ? selectedCarrier.address.addressCountry
              : '-'
          }},
          {{
            selectedCarrier.address.postalCode
              ? selectedCarrier.address.postalCode
              : '-'
          }}
          <q-icon
            name="place"
            color="primary"
            @click="sendMap(selectedCarrier.address)"
            class="edit-icon"
          ></q-icon></div
      ></span>
    </div>

    <div class="row q-mt-sm" v-if="selectedCarrier.email">
      <span class="heading-light q-mt-none col-xs-4 lightHeading"> Email </span>
      <span
        class="q-ml-md col clickLink"
        @click="onEmailClick(selectedCarrier.email, $event)"
      >
        {{ selectedCarrier.email ? selectedCarrier.email : '-' }}</span
      >
    </div>
    <div class="row q-mt-sm" v-for="phone in selectedCarrier.phoneNumber">
      <span class="heading-light q-mt-none col-xs-4 lightHeading">
        Phone Number
      </span>
      <span class="col q-ml-md" v-if="phone.type">
        {{ phone.type }} :
        <span
          class="clickLink"
          @click="onPhoneNumberClick(phone.number, $event)"
          >{{ phone.number }}</span
        ></span
      >
    </div>
    <div class="row q-mt-sm" v-if="selectedCarrier.info">
      <span class="heading-light col-4"> Website: </span>
      <span class="q-ml-md col">
        {{
          selectedCarrier.info.website ? selectedCarrier.info.website : '-'
        }}</span
      >
    </div>
    <div class="row q-mt-sm" v-if="selectedCarrier.info">
      <span class="heading-light col-4"> Notes: </span>
      <span class="q-ml-md col">
        {{
          selectedCarrier.info.notes ? selectedCarrier.info.notes : '-'
        }}</span
      >
    </div>

    <q-dialog
      v-model="addCarrierDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddCarrier
          @closeDialog="closeAddCarrierDialog"
          :componentName="constants.industries.CARRIER"
          :isEdit="true"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
import AddCarrier from 'components/AddCarrier';
import { constants } from '@utils/constant';
export default {
  name: 'CarrierCompanyInfo',
  components: { AddCarrier },
  data() {
    return { addCarrierDialog: false, constants: constants };
  },
  computed: {
    ...mapGetters(['selectedCarrier'])
  },
  mounted() {
    this.getCarrierDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions(['getCarrierDetails', 'deleteCarrierInfo']),
    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    onEdit() {
      this.addCarrierDialog = true;
    },
    async onDelete() {
      const carrier = {
        id: this.$route.params.id
      };
      await this.deleteCarrierInfo(carrier);
      this.$router.push('/carriers');
    },
    closeAddCarrierDialog() {
      this.addCarrierDialog = false;
    }
  }
};
</script>
