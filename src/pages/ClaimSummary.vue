<template>
  <q-page>
    <div class="mobile-container-page ">
      <div class="q-pa-md">
        <span class="form-heading">File Number</span><br />
        {{
          getSelectedClaim.attributes.policyInfo.number
            ? getSelectedClaim.attributes.policyInfo.number
            : '-'
        }}
        <br /><br />
        <span class="form-heading">Loss Addresss</span><br />
        {{
          getSelectedClaim.attributes.lossInfo.address.postalCode
            ? getSelectedClaim.attributes.lossInfo.address.postalCode
            : '-'
        }}<br />
        {{
          getSelectedClaim.attributes.lossInfo.address.streetAddress
            ? getSelectedClaim.attributes.lossInfo.address.streetAddress
            : '-'
        }},
        {{
          getSelectedClaim.attributes.lossInfo.address.houseNumber
            ? getSelectedClaim.attributes.lossInfo.address.houseNumber
            : '-'
        }}<br />
        {{
          getSelectedClaim.attributes.lossInfo.address.addressCountry
            ? getSelectedClaim.attributes.lossInfo.address.addressCountry
            : '-'
        }}
      </div>

      <div class="client-list-item">
        <div class="row justify-between">
          <div class=" text-bold">Claim Summary</div>

          <div>
            <q-icon class="q-my-auto " name="edit" size="sm" color="primary" />
          </div>
        </div>
        <br />
        <span class="form-heading">Claim Number</span><br />
        <div>
          {{
            getSelectedClaim.attributes.policyInfo.claimNumber
              ? getSelectedClaim.attributes.policyInfo.claimNumber
              : '-'
          }}
        </div>
        <br />
        <span class="form-heading">Claim Fee</span><br />
        -<br />
        <span class="form-heading">Date Notified</span><br />
        -<br />
        <span class="form-heading">Reason for Claim</span><br />
        {{
          getSelectedClaim.attributes.lossInfo.claimReason.value
            ? getSelectedClaim.attributes.lossInfo.claimReason.value
            : '-'
        }}<br /><br />
        <span class="form-heading">Source Of Claim</span><br />
        -<br /><br />
        <span class="form-heading">Contract Date</span><br />
        -<br /><br />
        <span class="form-heading">Date Of First Contract</span><br />
        -<br /><br />
        <span class="form-heading">Time Of First Contract</span><br />
        -<br />
        <span class="form-heading">Days Open</span><br />
        -<br />
        <span class="form-heading">Since Loss</span><br />
        -<br />
        <span class="form-heading">Since Notification</span><br />
        -<br />
      </div>
      <q-separator /><br />
      <div class="client-list-item">
        <div class="row justify-between">
          <div class=" text-bold">Claim Deadlines</div>

          <div>
            <q-icon class="q-my-auto " name="edit" size="sm" color="primary" />
          </div>
        </div>
        <span class="form-heading">Tolling Date / Statute Deadlines</span><br />
        -<br />
        <span class="form-heading">Recoverable Depreciation Due</span><br />
        -<br />
        <span class="form-heading">CRN Deadline</span><br />
        -<br />
      </div>
      <div class="client-list-item">
        <div class="row justify-between">
          <div class=" text-bold">Loss Details</div>

          <div>
            <q-icon class="q-my-auto " name="edit" size="sm" color="primary" />
          </div>
        </div>
        <span class="form-heading">Date / Time of Loss</span><br />
        -<br /><br />
        <span class="form-heading">Peril</span><br />
        -<br /><br />
        <span class="form-heading">Related To</span><br />
        -<br /><br />
        <span class="form-heading">Estimated Loss Amount</span><br />
        -<br /><br />
        <span class="form-heading">Property Value at Time of Loss</span><br />
        -<br /><br />
        <span class="form-heading">Description Of Loss</span><br />
        {{
          getSelectedClaim.attributes.lossInfo.desc
            ? getSelectedClaim.attributes.lossInfo.desc
            : '-'
        }}
        <br /><br />desc
      </div>

      <div class="client-list-item">
        <span class=" text-bold"> <p>Claim TimeLines</p> </span><br />
        <div class="row">
          <q-avatar
            color="primary"
            size="50px"
            font-size="20px"
            text-color="white"
          >
            5 Jan
          </q-avatar>
          <span class="form-heading q-ml-xl">Settled</span><br />
          <span class="q-my-auto q-ml-md">Phase Changed to Settled</span><br />
          <q-icon name="edit" class="q-my-auto q-mr-lg" color="primary" />
        </div>
      </div>

      <div class="client-list-item">
        <span class=" text-bold"> <p>Related Claims</p> </span><br />
        <span class="form-heading ">File ID</span><br />
        -<br />
        <span class="form-heading ">Status</span><br />
        {{
          getSelectedClaim.attributes.status.isCancelled
            ? getSelectedClaim.attributes.status.isCancelled
            : '-'
        }}<br /><br />
        <span class="form-heading ">Date Of Loss</span><br />
        {{ getSelectedClaim.attributes.lossInfo.date | moment('DD/MM/YYYY') }}
        <br /><br />
        <span class="form-heading ">Peril</span><br />
        -<br />
        <span class="form-heading ">Carrier</span><br />
        {{
          getSelectedClaim.attributes.policyInfo.carrier.value
            ? getSelectedClaim.attributes.policyInfo.carrier.value
            : '-'
        }}
        <br /><br />
        <span class="form-heading ">Adjustor</span><br />
        -<br />
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
    ...mapActions(['getSingleClaimDetails']),
    ...mapMutations(['setSelectedClaimId'])
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
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
