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

    <div class="mobile-container-page" v-if="carriers.length">
      <div
        v-for="carrier in carriers"
        :key="carrier.id"
        class="carrier-list-item clients-list  "
        style="overflow-y: auto;"
      >
        <q-item-section v-if="carrierDetails">
          <span class="text-bold" @click="onVendorNameClick(carrier)">{{
            carrier.name
          }}</span>
          <div v-if="carrier.address">
            <div>
              {{ carrier.address ? carrier.address.houseNumber : '-' }} ,
              {{
                carrier.address.streetAddress
                  ? carrier.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                carrier.address.addressLocality
                  ? carrier.address.addressLocality
                  : '-'
              }}
              ,
              {{
                carrier.address.addressRegion
                  ? carrier.address.addressRegion
                  : '-'
              }}
            </div>
            <div class="row">
              {{
                carrier.address.addressCountry
                  ? carrier.address.addressCountry
                  : '-'
              }}
              -
              {{
                carrier.address.postalCode ? carrier.address.postalCode : '-'
              }}
              <q-icon
                name="place"
                class="q-ml-auto"
                color="primary"
                size="sm"
                @click="sendMap(carrier.address)"
              ></q-icon>
            </div>
          </div>
          <div class="q-mt-xs" v-for="phone in carrier.phoneNumber">
            <span v-if="phone.type">{{ phone.type }} : </span>
            <span
              class="clickLink"
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ phone.number }}</span
            >
          </div>
          <span
            class="click-link"
            @click="onEmailClick(carrier.email, $event)"
            >{{ carrier.email }}</span
          >
        </q-item-section>
        <span v-else
          ><span class="text-bold">{{ carrier.name }}</span>
          <div v-if="carrier.address">
            <div>
              {{ carrier.address ? carrier.address.houseNumber : '-' }}
              {{
                carrier.address.streetAddress
                  ? carrier.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                carrier.address.addressLocality
                  ? carrier.address.addressLocality
                  : '-'
              }},{{
                carrier.address.addressRegion
                  ? carrier.address.addressRegion
                  : '-'
              }}
            </div>
            <div class="row">
              {{
                carrier.address.addressCountry
                  ? carrier.address.addressCountry
                  : '-'
              }}
              <q-icon
                name="place"
                class="q-ml-auto "
                color="primary"
                size="sm"
                @click="sendMap(carrier.address)"
              ></q-icon>
            </div>
          </div>
          <div class="q-mt-xs" v-for="phone in carrier.phoneNumber">
            <span v-if="phone.type">{{ phone.type }} : </span>
            <span
              class="clickLink"
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ phone.number }}</span
            >
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
export default {
  name: 'CarriersList',
  props: ['carrierDetails'],
  data() {
    return {
      searchText: '',

      params: {
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters(['carriers'])
  },

  mounted() {
    this.getCarriers();
  },

  methods: {
    ...mapActions(['getCarriers']),
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    onEmailClick,
    onPhoneNumberClick,
    sendMap,

    onVendorNameClick(carrier) {
      this.$router.push('/carrier-details/' + carrier.id);
    },

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

<style lang="scss">
.carrier-list-item {
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
  display: flex;
}
</style>
