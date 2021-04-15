<template>
  <q-page>
    <div class="listing-height">
      <ClaimDetail />
      <q-card class="q-ma-md q-pa-md  ">
        <div class="row q-ml-xs">
          <span class="text-bold col q-mt-xs"> Claim Summary</span>
        </div>
        <div class=" q-ml-xs">
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> File Number </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.fileNumber ? getSelectedClaim.fileNumber : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Claim Number </span>
            <span class="q-ml-md col">
              {{ getSelectedClaim.number ? getSelectedClaim.number : '-' }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Policy Number </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Claim Reason </span>
            <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
              {{
                getSelectedClaim.lossInfo.claimReason
                  ? getSelectedClaim.lossInfo.claimReason.value
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Claim Fees </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light "> Date of Contract </span>
            <span class="q-ml-md" v-if="getSelectedClaim.contractInfo">
              {{
                getSelectedClaim.contractInfo.dateOfFirstContact
                  | moment('MM/DD/YYYY')
              }}
            </span>
            <span class="q-ml-md" v-else> MM/DD/YYYY</span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light"> Date of Notified </span>
            <span class="q-ml-md" v-if="getSelectedClaim.contractInfo">
              {{ getSelectedClaim.contractInfo.date | moment('MM/DD/YYYY') }}
            </span>
            <span v-else class="q-ml-md"> MM/DD/YYYY</span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Open Since </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.sinceOpen ? getSelectedClaim.sinceOpen : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Loss Since </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.sinceLoss ? getSelectedClaim.sinceLoss : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Claim Timeline </span>
            <span class="q-ml-md"> - </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4"> Loss Description </span>
            <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
              {{
                getSelectedClaim.lossInfo.desc
                  ? getSelectedClaim.lossInfo.desc
                  : '-'
              }}
            </span>
          </div>
        </div>
      </q-card>

      <q-card class="q-ma-md q-pa-md ">
        <div class="row q-ml-xs ">
          <span class="text-bold col q-mt-xs"> Claim Deadlines</span>
        </div>
        <div class=" q-ml-xs ">
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Tolling Date / Statute Deadline
            </span>
            <span class="q-ml-md col"> - </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Recoverable Depreciation Due
            </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              CRN Deadline
            </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
        </div>
      </q-card>

      <q-card class="q-ma-md q-pa-md  ">
        <div class="row q-ml-xs">
          <span class="text-bold col q-mt-xs"> Loss Details</span>
        </div>
        <div class=" q-ml-xs ">
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Date & Time of Loss
            </span>
            <span class="q-ml-md col">
              MM/DD/YYYY
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Peril
            </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              CRN Deadline
            </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Estimated Loss Amount
            </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Property Value at Time of Loss
            </span>
            <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
              {{
                getSelectedClaim.lossInfo.propertyDesc
                  ? getSelectedClaim.lossInfo.propertyDesc
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-4">
              Description of Loss
            </span>
            <span class="q-ml-md col-4">
              -
            </span>
          </div>
        </div>
      </q-card>

      <div class="form-heading q-ml-md col q-mb-md">Claim Timeline</div>
      <div v-for="(phase, index) in getSelectedClaim.phases">
        <div class="row">
          <div class="col-2 q-ml-md ">
            <q-avatar
              class="q-ma-sm "
              size="50px"
              style="background-color:#ECA74C"
              font-size="15px"
              text-color="white"
            >
              <span>
                {{
                  getSelectedClaim.phases[index].created
                    ? getSelectedClaim.phases[index].created
                    : '-' | moment('D MMM')
                }}</span
              >
            </q-avatar>
          </div>
          <div class="col row q-ml-lg q-mt-sm ">
            <div class="col-10">
              <span class="text-bold">
                {{
                  getSelectedClaim.phases[index].value
                    ? getSelectedClaim.phases[index].value
                    : '-'
                }}</span
              >
            </div>

            <q-icon
              name="create"
              color="primary"
              class="col "
              size="xs"
            ></q-icon>

            <div class="q-mb-xl heading-light">
              Phase changed to
              {{
                getSelectedClaim.phases[index].value
                  ? getSelectedClaim.phases[index].value
                  : '-'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import moment from 'moment';

export default {
  name: 'Claims',
  components: { CustomBar, ClaimDetail },
  data() {
    return { rating: 1 };
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
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getSingleClaimDetails'])
  }
};
</script>
