<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="full-height">
        <div class="clients-list q-ma-md listing-height">
          <div class="q-mb-lg">
            <q-icon name="create" color="primary" class="edit-icon"></q-icon>
            <p class="heading">Policy Holder Details</p>
            <p class="texts">
              {{ selectedLead['primaryContact']['fname'] }}
              {{ selectedLead.primaryContact.lname }}
            </p>
            <p class="texts">
              Mobile:
              <span
                class="click-link"
                v-if="selectedLead.primaryContact.phoneNumber"
                @click="
                  onPhoneNumberClick(
                    selectedLead.primaryContact.phoneNumber[0].number,
                    $event
                  )
                "
                >{{
                  selectedLead.primaryContact.phoneNumber[0].number
                    ? selectedLead.primaryContact.phoneNumber[0].number
                    : '-'
                }}</span
              ><span v-else> - </span>
            </p>
            <p class="texts">
              Email:
              <span
                class="click-link"
                v-if="selectedLead.primaryContact.email"
                @click="onEmailClick(selectedLead.primaryContact.email, $event)"
                >{{
                  selectedLead.primaryContact.email
                    ? selectedLead.primaryContact.email
                    : '-'
                }}</span
              ><span v-else> - </span>
            </p>

            <p class="heading">Loss Address</p>
            <p class="texts">
              {{
                selectedLead.lossLocation.streetAddress
                  ? selectedLead.lossLocation.streetAddress
                  : '-'
              }}
            </p>
            <p class="texts">
              {{
                selectedLead.lossLocation.addressRegion
                  ? selectedLead.lossLocation.addressRegion
                  : '-'
              }}
            </p>
            <p class="texts">
              {{ selectedLead.lossLocation.addressRegion }}-{{
                selectedLead.lossLocation.postalCode
              }}
            </p>
            <p class="texts">{{ selectedLead.lossLocation.addressCountry }}</p>

            <p class="heading">Loss Details</p>

            <span class="texts"> Date of Loss :</span
            ><span class="text-Discription">
              &nbsp;&nbsp;{{ selectedLead.dateofLoss | moment('DD/MM/YYYY') }}
            </span>
            <br />
            <span class="texts"> Description : </span>
            <span class="text-Discription">
              &nbsp;&nbsp;{{
                selectedLead.lossDesc ? selectedLead.lossDesc : '-'
              }}</span
            >

            <p class="heading">Policy Details</p>
            <span class="texts"> Carrier Name :</span
            ><span class="text-Discription"
              >&nbsp;&nbsp;{{
                selectedLead['carrier'] ? selectedLead['carrier']['value'] : '-'
              }}
            </span>
            <br />
            <span class="texts"> Policy No : </span
            ><span class="text-Discription"
              >&nbsp;&nbsp;{{
                selectedLead.policyNumber ? selectedLead.policyNumber : '-'
              }}
            </span>

            <p class="heading">Inspection Type</p>
            <p class="texts">
              &nbsp;&nbsp;{{
                selectedLead.inspectionInfo.value
                  ? selectedLead.inspectionInfo.value
                  : '-'
              }}
            </p>

            <p class="heading">Lead Source</p>
            <p class="texts">
              &nbsp;&nbsp;{{
                selectedLead.leadSource.type
                  ? selectedLead.leadSource.type
                  : '-'
              }}
            </p>
            <p class="texts">
              &nbsp;&nbsp;{{
                selectedLead.leadSource.detail
                  ? selectedLead.leadSource.detail
                  : '-'
              }}
            </p>

            <p class="heading">Loss Site Visiting On</p>
            <p class="texts">
              &nbsp;&nbsp;{{
                selectedLead.visited ? selectedLead.visited : '-'
              }}
            </p>

            <p class="heading">Notes</p>
            <p class="texts">{{ selectedLead.notes }}</p>
          </div>
        </div>
        <q-btn
          label="Schedule Visit"
          class="fixed-bottom q-my-md q-mx-auto"
          color="primary"
          size="md"
          style="width: 90%"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';

export default {
  computed: {
    ...mapGetters(['selectedLead'])
  },

  methods: {
    ...mapActions(['getLeadDetails', 'removeSelectedLeadDetails']),
    onEmailClick,

    onPhoneNumberClick
  },
  mounted() {
    this.getLeadDetails(this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.edit-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
}

.heading {
  font-size: 15px;
  font-weight: bold;
  margin: 16px 0 8px 0;
}

.text-Discription {
  margin-bottom: 0;
  font-size: 13px;

  text-align: left;
}
</style>
