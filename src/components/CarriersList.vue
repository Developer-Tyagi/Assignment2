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
      <q-btn @click="onAddButtonClick" flat><img src="~assets/add.svg"/></q-btn>
    </div>
    <div v-if="!loading">
      <q-scroll-area style="height:85vh">
        <q-infinite-scroll @load="onLoad" :offset="250" ref="infiniteScroll">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="md" />
            </div>
          </template>
          <div
            v-for="carrier in carrierList"
            :key="carrier.id"
            class="listing-item clients-list"
          >
            <q-item-section @click="onSelectCarrier(carrier, $event)">
              <span class="form-heading  fit-content">{{
                carrier.attributes.name
              }}</span>
              <div v-if="carrier.attributes.address">
                <div>
                  {{
                    carrier.attributes.address
                      ? carrier.attributes.address.houseNumber
                      : '-'
                  }}
                  {{
                    carrier.attributes.address.address1
                      ? carrier.attributes.address.address1
                      : '-'
                  }}
                </div>
                <div
                  v-if="
                    carrier.attributes.address &&
                      carrier.attributes.address.address2
                  "
                >
                  {{ carrier.attributes.address.address2 }}
                </div>
                <div class="row">
                  {{
                    carrier.attributes.address.addressLocality
                      ? carrier.attributes.address.addressLocality
                      : '-'
                  }}
                  ,
                  {{
                    carrier.attributes.address.addressRegion
                      ? toGetStateShortName(
                          carrier.attributes.address.addressRegion
                        )
                      : '-'
                  }}
                  {{
                    carrier.attributes.address.postalCode
                      ? carrier.attributes.address.postalCode
                      : '-'
                  }}
                  <q-icon
                    name="place"
                    class="q-ml-auto"
                    color="primary"
                    size="sm"
                    @click="sendMap(carrier.attributes.address, $event)"
                  ></q-icon>
                </div>
              </div>
              <div
                class="q-mt-xs fit-content"
                v-for="phone in carrier.attributes.phoneNumber"
                :key="phone.number"
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
                @click="onEmailClick(carrier.attributes.email, $event)"
                >{{ carrier.attributes.email }}</span
              >
            </q-item-section>
            <q-icon
              v-if="carrier.attributes.name === selectedCarrierName"
              name="done"
              size="xs"
              class="q-ml-auto"
            />
          </div>
          <div
            class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
            v-if="noMoreResults && carrierList.length != 0"
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
      carrierList: [],
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

  mounted() {
    this.getCarriers();
    this.getCarrierListData();
  },

  methods: {
    ...mapActions([
      'getCarriers',
      'addClaimCarrier',
      'getSelectedClaim',
      'carrierPagination'
    ]),
    toGetStateShortName,
    async getCarrierListData() {
      let params = {
        limit: CARRIER_LIST_LIMIT,
        offset: 0
      };
      this.loading = true;
      let data = await this.carrierPagination(params);
      this.carrierList = data;
      this.loading = false;
    },

    async onLoad(index, done) {
      let carrierListBeforeLoad = this.carrierList.length;
      let params = {
        limit: CARRIER_LIST_LIMIT,
        offset: index * CARRIER_LIST_LIMIT
      };
      if (carrierListBeforeLoad >= CARRIER_LIST_LIMIT) {
        let data = await this.carrierPagination(params);
        if (data.length > 0) {
          this.carrierList = this.carrierList.concat(data);
        }
      }
      let carrierListAfterLoad = this.carrierList.length;
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

    //this function is used for searching Carriers.
    async search(event) {
      this.params.name = event;
      let Data = await this.carrierPagination(this.params);
      this.carrierList = Data;
    },

    onAddButtonClick() {
      this.$emit('addCarrier', true);
    }
  }
};
</script>
