<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="listing-height q-pa-md mobile-container-page">
        <div class="clients-list q-pa-md">
          <div>
            <span class="form-heading"> Company Name:</span>
            {{ selectedVendor.name }}
          </div>
          <div>
            <span class="form-heading"> Industry:</span>
            {{ selectedVendor.industry.value }}
          </div>
          <div v-for="(contact, index) in selectedVendor.contact">
            <span class="form-heading">
              {{ contact.fname }}
              {{ contact.lname }}
            </span>
            <div v-for="phone in contact.phoneNumber">
              <p class="texts">
                <span class="form-heading"> Mobile: </span>
                <span
                  class="click-link"
                  @click="onPhoneNumberClick(phone.number, $event)"
                  >{{ phone.number ? phone.number : '-' }}</span
                >
              </p>
            </div>
            <p>
              <span class="form-heading"> Email: </span>
              <span
                class="click-link"
                @click="onEmailClick(contact.email, $event)"
                >{{ contact.email ? contact.email : '-' }}</span
              >
            </p>
          </div>
          <div v-if="selectedVendor.address">
            <span class="form-heading"> Address Details </span>
            <p class="texts">
              {{
                selectedVendor.address.streetAddress
                  ? selectedVendor.address.streetAddress
                  : '-'
              }},
              {{
                selectedVendor.address.houseNumber
                  ? selectedVendor.address.houseNumber
                  : '-'
              }}
            </p>
            <p class="texts">
              {{
                selectedVendor.address.addressRegion
                  ? selectedVendor.address.addressRegion
                  : '-'
              }}
              ,
              {{
                selectedVendor.address.postalCode
                  ? selectedVendor.address.postalCode
                  : '-'
              }}
            </p>
            <p class="texts">
              {{
                selectedVendor.address.addressCountry
                  ? selectedVendor.address.addressCountry
                  : '-'
              }}
            </p>
          </div>
          <p class="texts q-mt-sm">
            <span class="form-heading"> Website: </span>
            {{
              selectedVendor.info.website ? selectedVendor.info.website : '-'
            }}
          </p>
          <p class="texts">
            <span class="form-heading"> Notes: </span>
            {{ selectedVendor.info.notes ? selectedVendor.info.notes : '-' }}
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...mapGetters(['selectedVendor'])
  },

  methods: {
    ...mapActions(['getVendorDetails']),
    onEmailClick(email, e) {
      e.stopPropagation();
      if (email) {
        window.open('mailto:' + email);
      }
    },

    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open('tel:' + number);
      }
    }
  },
  mounted() {
    this.getVendorDetails(this.$route.params.id);
  }
};
</script>
