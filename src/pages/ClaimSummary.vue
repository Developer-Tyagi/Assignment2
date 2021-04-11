<template>
  <q-page>
    <div class="mobile-container-page">
      <div class="q-pa-md">
        <div class="form-heading">File Number</div>
        {{
          getSelectedClaim.attributes.policyInfo.number
            ? getSelectedClaim.attributes.policyInfo.number
            : '-'
        }}
        <div class="form-heading">
          Loss Addresss

          {{
            getSelectedClaim.attributes.lossInfo.address.postalCode
              ? getSelectedClaim.attributes.lossInfo.address.postalCode
              : '-'
          }}
        </div>
        <div>
          {{
            getSelectedClaim.attributes.lossInfo.address.streetAddress
              ? getSelectedClaim.attributes.lossInfo.address.streetAddress
              : '-'
          }},
          {{
            getSelectedClaim.attributes.lossInfo.address.houseNumber
              ? getSelectedClaim.attributes.lossInfo.address.houseNumber
              : '-'
          }}
        </div>
        <div>
          {{
            getSelectedClaim.attributes.lossInfo.address.addressCountry
              ? getSelectedClaim.attributes.lossInfo.address.addressCountry
              : '-'
          }}
        </div>
      </div>

      <div class="client-list-item">
        <div class="row justify-between">
          <div class=" text-bold">Claim Summary</div>

          <div>
            <q-icon class="q-my-auto " name="edit" size="sm" color="primary" />
          </div>
        </div>
        <br />
        <div class="form-heading">Claim Number</div>
        <div>
          {{
            getSelectedClaim.attributes.policyInfo.claimNumber
              ? getSelectedClaim.attributes.policyInfo.claimNumber
              : '-'
          }}
        </div>

        <div class="form-heading">Claim Fee -</div>
        <div class="form-heading">Date Notified -</div>
        <div class="form-heading">
          Reason for Claim
        </div>
        <div>
          {{
            getSelectedClaim.attributes.lossInfo.claimReason.value
              ? getSelectedClaim.attributes.lossInfo.claimReason.value
              : '-'
          }}
        </div>

        <div class="form-heading">Source Of Claim</div>
        -
        <div class="form-heading">Contract Date</div>
        -
        <div class="form-heading">Date Of First Contract</div>
        -
        <div class="form-heading">Time Of First Contract</div>
        -
        <div class="form-heading">Days Open</div>
        -
        <div class="form-heading">Since Loss</div>
        -
        <div class="form-heading">Since Notification</div>
        -
      </div>
      <q-separator /><br />
      <div class="client-list-item">
        <div class="row justify-between">
          <div class=" text-bold">Claim Deadlines</div>

          <div>
            <q-icon class="q-my-auto " name="edit" size="sm" color="primary" />
          </div>
        </div>
        <div class="form-heading">Tolling Date / Statute Deadlines</div>
        -
        <div class="form-heading">Recoverable Depreciation Due</div>

        -
        <div class="form-heading">CRN Deadline</div>

        -
      </div>
      <div class="client-list-item">
        <div class="row justify-between">
          <div class=" text-bold">Loss Details</div>

          <div>
            <q-icon class="q-my-auto " name="edit" size="sm" color="primary" />
          </div>
        </div>
        <div class="form-heading">Date / Time of Loss</div>
        -
        <div class="form-heading">Peril</div>

        -
        <div class="form-heading">Related To</div>
        -
        <div class="form-heading">Estimated Loss Amount</div>
        -
        <div class="form-heading">Property Value at Time of Loss</div>
        -
        <div class="form-heading">Description Of Loss</div>

        {{
          getSelectedClaim.attributes.lossInfo.desc
            ? getSelectedClaim.attributes.lossInfo.desc
            : '-'
        }}
        desc
      </div>

      <div class="client-list-item">
        <div class=" text-bold">Claim TimeLines</div>
        <br />
        <div class="row">
          <q-avatar
            color="primary"
            size="50px"
            font-size="20px"
            text-color="white"
          >
            5 Jan
          </q-avatar>
          <div class="form-heading q-ml-xl">Settled</div>
          <div class="q-my-auto q-ml-md">Phase Changed to Settled</div>
          <q-icon name="edit" class="q-my-auto q-mr-lg" color="primary" />
        </div>
      </div>

      <div class="client-list-item">
        <div class=" text-bold">
          <p>Related Claims</p>
          <div class="form-heading ">File ID</div>
          -<br />
          <div class="form-heading ">Status</div>
          {{
            getSelectedClaim.attributes.status.isCancelled
              ? getSelectedClaim.attributes.status.isCancelled
              : '-'
          }}
          <div class="form-heading ">Date Of Loss</div>
          {{ getSelectedClaim.attributes.lossInfo.date | moment('DD/MM/YYYY') }}

          <div class="form-heading ">Peril</div>
          -
          <div class="form-heading ">Carrier</div>
          {{
            getSelectedClaim.attributes.policyInfo.carrier.value
              ? getSelectedClaim.attributes.policyInfo.carrier.value
              : '-'
          }}

          <div class="form-heading ">Adjustor</div>
          -
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';

export default {
  name: 'Claims',
  components: { CustomBar },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['getSelectedClaim', 'setClientProperty', 'selectedClaimId']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapMutations(['setSelectedClaimId']),

    ...mapActions(['getSingleClaimDetails'])
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin-top: 20px;
}
.client-list-item {
  padding: 20px;
  background-color: #f4f4f4;
  text-transform: capitalize;
  p {
    margin: 0 0 6px;
  }
}
</style>
