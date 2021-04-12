<template>
  <q-page>
    <div class="listing-height">
      <div class=" q-mx-lg q-mt-md">
        <div class="row">
          <span class="text-primary">
            {{ getSelectedClaim.client.fname }}
            {{ getSelectedClaim.client.lname }}</span
          >
          <q-rating
            v-model="rating"
            class="q-ml-auto"
            size="1em"
            :max="1"
            color="primary"
          ></q-rating>
        </div>
        <div class="row">
          <div class="heading-light col-3 ">
            Name of the property
          </div>
          <div class="col  q-ml-md">
            {{
              getSelectedClaim.lossInfo.lossAddressName
                ? getSelectedClaim.lossInfo.lossAddressName
                : '-'
            }}
          </div>
        </div>
        <div class="row q-mt-sm ">
          <span class="heading-light col-3 "> Loss Address:</span>
          <span class="col-7 q-ml-md">
            {{
              getSelectedClaim.lossInfo.address.streetAddress
                ? getSelectedClaim.lossInfo.address.streetAddress
                : '-'
            }}
            {{
              getSelectedClaim.lossInfo.address.addressLocality
                ? getSelectedClaim.lossInfo.address.addressLocality
                : '-'
            }},
            {{
              getSelectedClaim.lossInfo.address.addressRegion
                ? getSelectedClaim.lossInfo.address.addressRegion
                : '-'
            }}
            <div>
              {{
                getSelectedClaim.lossInfo.address.addressCountry
                  ? getSelectedClaim.lossInfo.address.addressCountry
                  : '-'
              }},
              {{
                getSelectedClaim.lossInfo.address.postalCode
                  ? getSelectedClaim.lossInfo.address.postalCode
                  : '-'
              }}
            </div></span
          >
        </div>
        <div class="row  q-mt-sm">
          <span class="heading-light col-3"> Claim Email </span>
          <span
            class="q-ml-md col clickLink"
            @click="onEmailClick(getSelectedClaim.claimEmail, $event)"
          >
            {{
              getSelectedClaim.claimEmail ? getSelectedClaim.claimEmail : '-'
            }}</span
          >
        </div>
        <div class="row q-mt-sm ">
          <span class="heading-light col-3 "> Current Phase </span>
          <span class="q-ml-md col-8">
            {{
              getSelectedClaim.status.value
                ? getSelectedClaim.status.value
                : '-'
            }}</span
          >
        </div>
        <div class="row  q-mt-sm">
          <span class="heading-light col-3"> Loss Date </span>
          <span class="q-ml-md col">
            {{ getSelectedClaim.lossInfo.date | moment('MM/DD/YYYY') }}</span
          >
        </div>
        <div class="row q-mt-sm">
          <span class="heading-light col-3"> Loss Cause </span>
          <span class="q-ml-md col">
            {{
              getSelectedClaim.lossInfo.cause
                ? getSelectedClaim.lossInfo.cause.value
                : '-'
            }}</span
          >
        </div>
      </div>

      <q-card class="q-ma-md q-pa-md  ">
        <div class="row q-mt-sm ">
          <span class=" text-bold col q-ma-md "> Claim Summary</span>
          <q-icon name="edit" size="xs" color="primary" class="col-2 " />
        </div>
        <div class=" q-ml-md ">
          <div class="row q-mt-xs">
            <span class="heading-light col-3"> File Number </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.fileNumber ? getSelectedClaim.fileNumber : '-'
              }},
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Claim Number </span>
            <span class="q-ml-md col">
              {{ getSelectedClaim.number ? getSelectedClaim.number : '-' }},
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Policy Number </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Claim Reason </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.lossInfo.claimReason
                  ? getSelectedClaim.lossInfo.claimReason.value
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Claim Fees </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light "> Date of Contract </span>
            <span class="q-ml-md">
              MM/DD/YYYY
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light"> Date of Notified </span>
            <span class="q-ml-md">
              MM/DD/YYYY
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Open Since </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.sinceOpen ? getSelectedClaim.sinceOpen : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Loss Since </span>
            <span class="q-ml-md col">
              {{
                getSelectedClaim.sinceLoss ? getSelectedClaim.sinceLoss : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light "> Claim Timeline </span>
            <span class="q-ml-md">
              -
            </span>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light"> Loss Description </span>
            <span class="q-ml-md ">
              -
            </span>
          </div>
        </div>
      </q-card>

      <q-card class="q-ma-md q-pa-md ">
        <div class="row q-mt-sm ">
          <span class=" text-bold col q-ma-md "> Claim Deadlines</span>
          <q-icon name="edit" size="xs" color="primary" class="col-2" />
        </div>
        <div class=" q-ml-md ">
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
        <div class="row q-mt-sm ">
          <span class=" text-bold col q-ma-md "> Loss Details</span>
          <q-icon name="edit" size="xs" color="primary" class="col-2 " />
        </div>
        <div class=" q-ml-md ">
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
            <span class="q-ml-md col">
              -
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
          <div class="col-2 q-ml-md">
            <q-avatar
              class="q-ma-sm"
              color="primary"
              size="50px"
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

          <div class="row  q-ml-lg q-mt-sm">
            <div>
              {{
                getSelectedClaim.phases[index].value
                  ? getSelectedClaim.phases[index].value
                  : '-'
              }}<q-icon
                name="create"
                color="primary"
                class="edit"
                style=" margin-left: 200px;"
                size="xs"
              ></q-icon
              ><br />
              <div style="font-size:13px">
                Phase changed to
                {{
                  getSelectedClaim.phases[index].value
                    ? getSelectedClaim.attributes.phases[index].value
                    : '-'
                }}
              </div>
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
import moment from 'moment';

export default {
  name: 'Claims',
  components: { CustomBar },
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
