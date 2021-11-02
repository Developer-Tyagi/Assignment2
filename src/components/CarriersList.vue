<template>
  <div>
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
      <q-btn @click="onAddButtonClick" flat
        ><img src="~assets/add.svg"
      /></q-btn>
    </div>
    <div v-if="!loading">
      <q-scroll-area class="scroll-area">
        <q-infinite-scroll @load="onLoad" :offset="250" ref="infiniteScroll">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="md" />
            </div>
          </template>
          <div
            v-for="(carrier, index) in carriers"
            :key="index"
            class="listing-item clients-list"
          >
            <q-item-section @click="onSelectCarrier(carrier, $event)">
              <span class="form-heading fit-content">{{ carrier.name }}</span>
              <div v-if="carrier.address">
                <div>
                  {{ carrier.address ? carrier.address.houseNumber : '-' }}
                  {{
                    carrier.address.address1 ? carrier.address.address1 : '-'
                  }}
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
                    carrier.address.postalCode
                      ? carrier.address.postalCode
                      : '-'
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
              <div
                class="q-mt-xs fit-content"
                v-for="(phone, index) in carrier.phoneNumber"
                :key="index"
              >
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
          <div
            class="
              no-more-results-msg
              border-bottom-secondary
              text-body1 text-h5 text-center text-manatee
            "
            v-if="noMoreResults"
          >
            <span class="bg-whiteSmoke q-px-sm">No more results</span>
          </div>
        </q-infinite-scroll>
      </q-scroll-area>
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
const CARRIER_LIST_LIMIT = 20;
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
      loading: true,
      noMoreResults: false,
      params: {
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters(['carriers', 'selectedClaimId'])
  },
  created() {
    this.getCarriers();
    this.getCarrierListData();
  },

  methods: {
    ...mapActions(['getCarriers', 'addClaimCarrier', 'getSelectedClaim']),
    toGetStateShortName,
    async getCarrierListData() {
      let params = {
        limit: CARRIER_LIST_LIMIT,
        offset: 0
      };
      this.loading = true;
      await this.getCarriers(params);
      this.loading = false;
    },

    async onLoad(index, done) {
      let carrierListBeforeLoad = this.carriers.length;
      let params = {
        limit: CARRIER_LIST_LIMIT,
        offset: index * CARRIER_LIST_LIMIT
      };
      if (carrierListBeforeLoad >= CARRIER_LIST_LIMIT) {
        await this.getCarriers(params);
      }
      let carrierListAfterLoad = this.carriers.length;
      if (
        carrierListBeforeLoad == carrierListAfterLoad ||
        carrierListAfterLoad - carrierListBeforeLoad < CARRIER_LIST_LIMIT
      ) {
        if (carrierListBeforeLoad > 0) {
          this.noMoreResults = true;
        }
        this.$refs.infiniteScroll.stop();
      }
      done();
    },

    onSearchBackButtonClick() {
      this.searchText = '';
      this.getCarrierListData();
      this.noMoreResults = false;
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

    //this function is used for searching Carriers.
    async search(event) {
      this.params.name = event;
      if (this.params.name == '') {
        this.getCarrierListData();
        this.noMoreResults = false;
      } else await this.getCarriers(this.params);
    },

    onAddButtonClick() {
      this.$emit('addCarrier', true);
    }
  }
};
</script>
