<template>
  <div
    :class="{
      'mobile-container-page-without-search': !$q.platform.is.iphone
    }"
  >
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

    <div class="mobile-container-page" v-if="mortgages.length">
      <div
        v-for="mortgage in mortgages"
        :key="mortgage.id"
        class="mortgage-list-item clients-list  "
        style="overflow-y: auto;"
      >
        <q-item-section v-if="mortgageDetails">
          <span class="text-bold" @click="onMortgageNameClick(mortgage)">{{
            mortgage.name
          }}</span>
          <div v-if="mortgage.address">
            <div>
              {{ mortgage.address ? mortgage.address.houseNumber : '-' }} ,
              {{
                mortgage.address.streetAddress
                  ? mortgage.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                mortgage.address.addressLocality
                  ? mortgage.address.addressLocality
                  : '-'
              }}
              ,
              {{
                mortgage.address.addressRegion
                  ? mortgage.address.addressRegion
                  : '-'
              }}
            </div>
            <div class="row">
              {{
                mortgage.address.addressCountry
                  ? mortgage.address.addressCountry
                  : '-'
              }}
              -
              {{
                mortgage.address.postalCode ? mortgage.address.postalCode : '-'
              }}
              <q-icon
                name="place"
                class="q-ml-auto"
                color="primary"
                size="sm"
                @click="sendMap(mortgage.address)"
              ></q-icon>
            </div>
          </div>
          <div class="q-mt-xs" v-for="phone in mortgage.phoneNumber">
            <span v-if="phone.type">{{ phone.type }} : </span>
            <span
              class="clickLink"
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ phone.number }}</span
            >
          </div>
          <span
            class="click-link"
            @click="onEmailClick(mortgage.email, $event)"
            >{{ mortgage.email }}</span
          >
        </q-item-section>
        <q-item-section v-else @click="onSelectMortgage(mortgage.id)"
          ><span class="text-bold">{{ mortgage.name }}</span>

          <div v-if="mortgage.address">
            <div>
              {{ mortgage.address ? mortgage.address.houseNumber : '-' }}
              {{
                mortgage.address.streetAddress
                  ? mortgage.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                mortgage.address.addressLocality
                  ? mortgage.address.addressLocality
                  : '-'
              }},{{
                mortgage.address.addressRegion
                  ? mortgage.address.addressRegion
                  : '-'
              }}
            </div>
            <div class="row">
              {{
                mortgage.address.addressCountry
                  ? mortgage.address.addressCountry
                  : '-'
              }}
            </div>
          </div>
          <div class="q-mt-xs" v-for="phone in mortgage.phoneNumber">
            <span v-if="phone.type">{{ phone.type }} : </span>
            <span
              class="clickLink"
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ phone.number }}</span
            >
          </div>
        </q-item-section>
        <q-icon
          v-if="mortgage.name === demo"
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
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
export default {
  name: 'MortgagesList',
  props: ['mortgageDetails', 'demo'],
  data() {
    return {
      searchText: '',
      params: {
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters(['mortgages', 'selectedMortgage'])
  },

  mounted() {
    this.getMortgages();
  },

  methods: {
    ...mapActions(['getMortgages', 'getMortgageDetails']),
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    onEmailClick,
    onPhoneNumberClick,
    sendMap,

    onMortgageNameClick(mortgage) {
      this.$router.push('/mortgage-details/' + mortgage.id);
    },
    async onSelectMortgage(id) {
      await this.getMortgageDetails(id);
      this.$emit('onCloseMortgageSelect', true);
    },

    search(event) {
      this.params.name = event;
      this.getMortgages(this.params);
    },
    onAddButtonClick() {
      this.$emit('addCarrier', true);
    }
  }
};
</script>

<style lang="scss">
.mortgage-list-item {
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
  display: flex;
}
</style>
