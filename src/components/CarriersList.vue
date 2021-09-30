<template>
  <div class="mobile-container-page-without-search">
    <div class="actions-div">
      <q-input
        dense
        v-model="searchText"
        placeholder="Search"
        borderless
        @input="search($event)"
        class="full-width"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <img
        src="~assets/close.svg"
        v-if="searchText"
        @click="onSearchBackButtonClick"
        style="margin: 0 20px"
      />
      <q-separator vertical></q-separator>
      <q-btn @click="onAddButtonClick" flat><img src="~assets/add.svg"/></q-btn>
    </div>

    <div class="mobile-container-page" v-if="carriers.length">
      <div
        v-for="carrier in carriers"
        :key="carrier.id"
        class="listing-item clients-list"
        style="overflow-y: auto"
      >
        <q-item-section @click="onSelectCarrier(carrier, $event)">
          <span class="form-heading  fit-content">{{ carrier.name }}</span>
          <div v-if="carrier.address">
            <div>
              {{ carrier.address ? carrier.address.houseNumber : '-' }}
              {{ carrier.address.address1 ? carrier.address.address1 : '-' }}
            </div>
            <div v-if="carrier.address && carrier.address.address2">
              {{ carrier.address.address2 }}
            </div>
            <div class="row">
              {{
                carrier.address.addressLocality
                  ? carrier.address.addressLocality
                  : '-'
              }}
              ,
              {{
                carrier.address.addressRegion
                  ? toGetStateShortName(carrier.address.addressRegion)
                  : '-'
              }}
              {{
                carrier.address.postalCode ? carrier.address.postalCode : '-'
              }}
              <q-icon
                name="place"
                class="q-ml-auto"
                color="primary"
                size="sm"
                @click="sendMap(carrier.address, $event)"
              ></q-icon>
            </div>
          </div>
          <div class="q-mt-xs fit-content" v-for="phone in carrier.phoneNumber">
            <span v-if="phone.type">{{ phone.type }} : </span>
            <span
              class="clickLink"
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ showPhoneNumber(phone.number) }}</span
            >
          </div>
          <span
            class="click-link fit-content"
            @click="onEmailClick(carrier.email, $event)"
            >{{ carrier.email }}</span
          >
        </q-item-section>
        <q-icon
          v-if="carrier.name === selectedCarrierName"
          name="done"
          size="xs"
          class="q-ml-auto"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { toGetStateShortName } from '@utils/common';
import {
  onEmailClick,
  onPhoneNumberClick,
  sendMap,
  showPhoneNumber
} from '@utils/clickable';
export default {
  name: 'CarriersList',
  props: [
    'showCarrierDetails',
    'selectCarrier',
    'carrierName',
    'claimCarrier',
    'selectedCarrierName'
  ],

  data() {
    return {
      searchText: '',
      params: {
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters(['carriers', 'selectedClaimId'])
  },

  mounted() {
    this.getCarriers();
  },

  methods: {
    ...mapActions(['getCarriers', 'addClaimCarrier', 'getSelectedClaim']),
    toGetStateShortName,

    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },

    async onSelectCarrier(carrier, e) {
      e.stopPropagation();
      if (this.claimCarrier) {
        const payload = {
          id: this.selectedClaimId,
          data: {
            carrier: {
              carrierID: carrier.id
            }
          }
        };
        await this.addClaimCarrier(payload);
      }
      if (this.selectCarrier) {
        this.$emit('afterSelecting', carrier);
      } else {
        this.$router.push('/carrier-details/' + carrier.id);
      }
    },
    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    showPhoneNumber,

    search(event) {
      this.params.name = event;
      this.getCarriers(this.params);
    },

    onAddButtonClick() {
      this.$emit('addCarrier', true);
    }
  }
};
</script>
