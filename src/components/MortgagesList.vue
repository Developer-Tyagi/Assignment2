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
      <q-btn @click="onAddButtonClick" flat
        ><img src="~assets/add.svg"
      /></q-btn>
    </div>

    <!--code for Pagination in Mortgage List-->
    <div class="mobile-container-page" v-if="mortgages.length">
      <div v-if="!loading">
        <q-scroll-area class="scroll-area">
          <q-infinite-scroll @load="onLoad" :offset="250" ref="infiniteScroll">
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="md" />
              </div>
            </template>
            <div
              v-for="mortgage in mortgages"
              :key="mortgage.id"
              class="listing-item clients-list"
              style="overflow-y: auto"
            >
              <q-item-section @click="onSelectMortgage(mortgage, $event)">
                <span class="form-heading fit-content">{{
                  mortgage.name
                }}</span>
                <div v-if="mortgage.address">
                  <div>
                    {{ mortgage.address ? mortgage.address.houseNumber : '-' }}
                    {{
                      mortgage.address.address1
                        ? mortgage.address.address1
                        : '-'
                    }}
                  </div>
                  <div v-if="mortgage.address && mortgage.address.address2">
                    {{ mortgage.address.address2 }}
                  </div>
                  <div class="row">
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
                      class="q-ml-auto"
                      color="primary"
                      size="sm"
                      @click="sendMap(mortgage.address, $event)"
                    ></q-icon>
                  </div>
                </div>
                <div
                  class="q-mt-xs fit-content"
                  v-for="phone in mortgage.phoneNumber"
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
                  @click="onEmailClick(mortgage.email, $event)"
                  >{{ mortgage.email }}</span
                >
              </q-item-section>
              <q-icon
                v-if="mortgage.name === selectedMortgageName"
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
const MORTGAGE_LIST_LIMIT = 20; //mortgage limit
export default {
  name: 'MortgagesList',
  props: ['showMortgageDetails', 'selectMortgage', 'selectedMortgageName'],
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
    ...mapGetters(['mortgages', 'selectedMortgage'])
  },
  async mounted() {
    this.getMortgagesListData();
  },

  methods: {
    ...mapActions(['getMortgages', 'getMortgageDetails']),
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    toGetStateShortName,

    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    showPhoneNumber,
    //code for pagination.
    async getMortgagesListData() {
      let params = {
        limit: MORTGAGE_LIST_LIMIT,
        offset: 0
      };
      this.loading = true;
      await this.getMortgages(params);
      this.loading = false;
    },

    async onLoad(index, done) {
      let leadListBeforeLoad = this.mortgages.length;
      let params = {
        limit: MORTGAGE_LIST_LIMIT,
        offset: index * MORTGAGE_LIST_LIMIT
      };
      if (leadListBeforeLoad >= MORTGAGE_LIST_LIMIT) {
        await this.getMortgages(params);
      }

      let leadListAfterLoad = this.mortgages.length;
      if (
        leadListBeforeLoad == leadListAfterLoad ||
        leadListAfterLoad - leadListBeforeLoad < MORTGAGE_LIST_LIMIT
      ) {
        if (leadListBeforeLoad > 0) {
          this.noMoreResults = true;
        }
        this.$refs.infiniteScroll.stop();
      }

      done();
    },

    onMortgageNameClick(mortgage, e) {
      if (this.showMortgageDetails) {
        e.stopPropagation();
        this.$router.push('/mortgage-details/' + mortgage.id);
      }
    },

    async onSelectMortgage(mortgage, e) {
      if (this.selectMortgage) {
        e.stopPropagation();
        this.$emit('afterSelecting', mortgage);
      } else {
        this.$router.push('/mortgage-details/' + mortgage.id);
      }
    },

    search(event) {
      if (!event) {
        // if there is no input in the search bar
        this.getMortgagesListData();
        this.noMoreResults = false;
      } else {
        this.params.name = event;
        this.getMortgages(this.params);
      }
    },

    onAddButtonClick() {
      this.$emit('addMortagage', true);
    }
  }
};
</script>
