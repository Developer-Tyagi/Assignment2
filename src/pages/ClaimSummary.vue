<template>
  <q-page>
    <div class="mobile-container-page ">
      <div class="q-pa-md">
        <span class="form-heading">File Number</span><br />
        {{
          getSelectedClaim.data.attributes.policyInfo.number
            ? getSelectedClaim.data.attributes.policyInfo.number
            : '-'
        }}
        <br /><br />
        <span class="form-heading">Loss Addresss</span><br />
        {{
          getSelectedClaim.data.attributes.lossInfo.address.postalCode
            ? getSelectedClaim.data.attributes.lossInfo.address.postalCode
            : '-'
        }}<br />
        {{
          getSelectedClaim.data.attributes.lossInfo.address.streetAddress
            ? getSelectedClaim.data.attributes.lossInfo.address.streetAddress
            : '-'
        }},
        {{
          getSelectedClaim.data.attributes.lossInfo.address.houseNumber
            ? getSelectedClaim.data.attributes.lossInfo.address.houseNumber
            : '-'
        }}<br />
        {{
          getSelectedClaim.data.attributes.lossInfo.address.addressCountry
            ? getSelectedClaim.data.attributes.lossInfo.address.addressCountry
            : '-'
        }}
      </div>
      <div class="client-list-item">
        <span class=" text-bold"> <p>Claim Summary</p> </span><br />
        <span class="form-heading">Claim Number</span><br />
        {{
          getSelectedClaim.data.attributes.policyInfo.claimNumber
            ? getSelectedClaim.data.attributes.policyInfo.claimNumber
            : '-'
        }}<br /><br />
        <span class="form-heading">Claim Fee</span><br />
        -<br />
        <span class="form-heading">Date Notified</span><br />
        -<br />
        <span class="form-heading">Reason for Claim</span><br />
        {{
          getSelectedClaim.data.attributes.lossInfo.claimReason.value
            ? getSelectedClaim.data.attributes.lossInfo.claimReason.value
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
        <span class=" text-bold"> <p>Claim Deadlines</p> </span><br />
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
        -<br /><br />
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
          <span class="form-heading text-center">Settled</span><br />
          <span>Phase Changed to Settled</span><br />
          <q-icon name="edit" color="primary" />
        </div>
      </div>
      <div class="client-list-item">
        <span class=" text-bold"> <p>Related Claims</p> </span><br />
        <span class="form-heading ">File ID</span><br />
        -<br />
        <span class="form-heading ">Status</span><br />
        -<br />
        <span class="form-heading ">Date Of Loss</span><br />
        {{
          getSelectedClaim.data.attributes.lossInfo.date | moment('DD/MM/YYYY')
        }}
        <br />
        <span class="form-heading ">Peril</span><br />
        -<br />
        <span class="form-heading ">Carrier</span><br />
        -<br />
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
  // name: 'Claims',
  components: { CustomBar },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['getSelectedClaim']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    console.log(this.getSelectedClaim, 342);
    this.getSingleClaimDetails();
  },
  methods: {
    ...mapActions(['getSingleClaimDetails']),
    ...mapMutations([''])
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
