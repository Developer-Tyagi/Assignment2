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
        @click="onClickDelete"
      />
    </div>
    <div class="row q-mt-sm">
      <span class="heading-light col-4" v-if="selectedCarrier.address"
        >Address Details</span
      >
      <span class="col-7 q-ml-md" v-if="selectedCarrier.address">
        {{
          selectedCarrier.address.houseNumber
            ? selectedCarrier.address.houseNumber
            : '-'
        }}
        {{
          selectedCarrier.address.address1
            ? selectedCarrier.address.address1
            : '-'
        }}
        <div v-if="selectedCarrier.address.address2">
          {{ selectedCarrier.address.address2 }}
        </div>
        <div>
          {{
            selectedCarrier.address.addressLocality
              ? selectedCarrier.address.addressLocality
              : '-'
          }}
          ,
          {{
            selectedCarrier.address.addressRegion
              ? toGetStateShortName(selectedCarrier.address.addressRegion)
              : '-'
          }}
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
      <span class="heading-light q-mt-none col-xs-4 ">Company Email </span>
      <span
        class="q-ml-md col clickLink"
        @click="onEmailClick(selectedCarrier.email, $event)"
      >
        {{ selectedCarrier.email ? selectedCarrier.email : '-' }}</span
      >
    </div>
    <div class="row q-mt-sm" v-for="phone in selectedCarrier.phoneNumber">
      <span class="heading-light q-mt-none col-xs-4 ">
        Company Number
      </span>
      <span class="col q-ml-md" v-if="phone.type">
        {{ phone.type }} :
        <span
          class="clickLink"
          @click="onPhoneNumberClick(phone.number, $event)"
          >{{ phone.number ? showPhoneNumber(phone.number) : '' }}</span
        ></span
      >
    </div>
    <!--here is any one field like fname,email,lname,phone is present then only we display contact info row, otherwise hide this contact info row-->
    <div
      class="q-mt-sm row"
      v-if="
        selectedCarrier.contact &&
          (selectedCarrier.contact.fname ||
            selectedCarrier.contact.email ||
            selectedCarrier.contact.phoneNumber[0].number)
      "
    >
      <div class="heading-light q-mt-none col-xs-4 ">
        Contact Info
      </div>
      <div class="column q-ml-md ">
        {{ selectedCarrier ? selectedCarrier.contact.fname : '-' }}
        {{ selectedCarrier ? selectedCarrier.contact.lname : '-' }}
        <div
          class="clickLink"
          @click="onEmailClick(selectedCarrier.contact.email, $event)"
        >
          {{ selectedCarrier ? selectedCarrier.contact.email : '-' }}
        </div>
        <div
          v-if="selectedCarrier.contact && selectedCarrier.contact.phoneNumber"
          class="clickLink"
          @click="
            onPhoneNumberClick(
              selectedCarrier.contact.phoneNumber[0].number,
              $event
            )
          "
        >
          {{
            selectedCarrier.contact.phoneNumber
              ? showPhoneNumber(selectedCarrier.contact.phoneNumber[0].number)
              : '-'
          }}
        </div>
      </div>
    </div>
    <div
      class="row q-mt-sm"
      v-if="selectedCarrier.info && selectedCarrier.info.website"
    >
      <span class="heading-light col-4"> Website: </span>
      <span class="q-ml-md col"> {{ selectedCarrier.info.website }}</span>
    </div>
    <div
      class="row q-mt-sm"
      v-if="selectedCarrier.info && selectedCarrier.info.notes"
    >
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
    <q-dialog v-model="deleteAlertDialog">
      <q-card>
        <DeleteAlert
          @close="deleteAlertDialog = false"
          @onDelete="onCarrierDelete"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
import AddCarrier from 'components/AddCarrier';
import { toGetStateShortName } from '@utils/common';
import { constants } from '@utils/constant';
import DeleteAlert from 'components/DeleteAlert';
import { showPhoneNumber } from '@utils/clickable';
export default {
  name: 'CarrierCompanyInfo',
  components: { AddCarrier, DeleteAlert },
  data() {
    return {
      deleteAlertDialog: false,
      addCarrierDialog: false,
      constants: constants
    };
  },
  computed: {
    ...mapGetters(['selectedCarrier'])
  },

  methods: {
    ...mapActions(['getCarrierDetails', 'deleteCarrierInfo']),
    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    showPhoneNumber,
    toGetStateShortName,
    onEdit() {
      this.addCarrierDialog = true;
    },
    onClickDelete() {
      this.deleteAlertDialog = true;
    },
    async onCarrierDelete() {
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
