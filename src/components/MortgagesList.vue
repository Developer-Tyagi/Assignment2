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
        class="mortgage-list-item clients-list"
        style="overflow-y: auto"
      >
        <q-item-section @click="onSelectMortgage(mortgage, $event)">
          <span class="text-bold fit-content">{{ mortgage.name }}</span>
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
                @click="sendMap(mortgage.address, $event)"
              ></q-icon>
            </div>
          </div>
          <div
            class="q-mt-xs fit-content"
            v-for="phone in mortgage.phoneNumber"
          >
            <span v-if="phone.type">{{ phone.type }} : </span>
            <span
              class="clickLink"
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ phone.number }}</span
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
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
export default {
  name: 'MortgagesList',
  props: ['showMortgageDetails', 'selectMortgage', 'selectedMortgageName'],
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
      this.params.name = event;
      this.getMortgages(this.params);
    },

    onAddButtonClick() {
      this.$emit('addMortagage', true);
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
