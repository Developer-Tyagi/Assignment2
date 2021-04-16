<template>
  <q-page>
    <div class="listing-height q-pa-md mobile-container-page">
      <div class="clients-list q-pa-md">
        <div class="row"></div>

        <span class="text-bold ">
          {{ selectedVendor.name ? selectedVendor.name : '-' }}
        </span>

        <div v-if="selectedVendor.address">
          <div>
            {{
              selectedVendor.address.houseNumber
                ? selectedVendor.address.houseNumber
                : '-'
            }}
            ,
            {{
              selectedVendor.address.streetAddress
                ? selectedVendor.address.streetAddress
                : '-'
            }}
          </div>
          <div>
            {{
              selectedVendor.address.addressLocality
                ? selectedVendor.address.addressLocality
                : '-'
            }}
            ,
            {{
              selectedVendor.address.addressRegion
                ? selectedVendor.address.addressRegion
                : '-'
            }}
          </div>
          <div>
            {{
              selectedVendor.address.addressCountry
                ? selectedVendor.address.addressCountry
                : '-'
            }},
            {{
              selectedVendor.address.postalCode
                ? selectedVendor.address.postalCode
                : '-'
            }}
          </div>
        </div>

        <div class="q-mt-xs" v-for="phone in selectedVendor.phoneNumber">
          <span v-if="phone.type">{{ phone.type }} : </span>
          <span
            class="clickLink"
            @click="onPhoneNumberClick(phone.number, $event)"
            >{{ phone.number }}</span
          >
        </div>
        <div class=" row ">
          <div v-if="selectedVendor.email">
            <span
              class="click-link"
              @click="onEmailClick(selectedVendor.email, $event)"
              >{{ selectedVendor.email }}</span
            >
          </div>
        </div>
        <div class=" q-mt-xs row" v-if="selectedVendor.info.website">
          <span class="text-bold"> Website:</span>

          {{ selectedVendor.info.website ? selectedVendor.info.website : '-' }}
        </div>

        <div class=" q-mt-xs" v-if="selectedVendor.info.notes">
          <span class="text-bold"> Notes: </span>
          {{ selectedVendor.info.notes ? selectedVendor.info.notes : '-' }}
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['selectedVendor'])
  },
  mounted() {
    this.getVendorDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions(['getVendorDetails']),
    onEmailClick,
    onPhoneNumberClick
  }
};
</script>
