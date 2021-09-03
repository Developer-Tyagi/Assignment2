<template>
  <div>
    <div>
      <div v-if="estimator.estimator">
        <q-card class="q-pa-md">
          <div class="form-heading">
            {{ estimator.estimator.name ? estimator.estimator.name : '-' }}
          </div>

          <div class="row q-mt-sm">
            <span class="heading-light col-2"> Email</span>
            <span
              class="q-ml-lg col clickLink"
              @click="onEmailClick(estimator.estimator.email, $event)"
            >
              {{
                estimator.estimator.email ? estimator.estimator.email : '-'
              }}</span
            >
          </div>
          <div class="row q-mt-sm" v-if="estimator.estimator.phoneNumber">
            <span class="heading-light col-2"> Phone Number</span>
            <span
              class="q-ml-lg col clickLink"
              @click="
                onPhoneNumberClick(estimator.estimator.phoneNumber[0], $event)
              "
            >
              {{
                estimator.estimator.phoneNumber[0].type
                  ? estimator.estimator.phoneNumber[0].type
                  : '-'
              }}
              {{
                estimator.estimator.phoneNumber[0].number
                  ? estimator.estimator.phoneNumber[0].number
                  : '-'
              }}</span
            >
          </div>
        </q-card>
      </div>
      <div v-else class="full-height full-width">
        <div class="absolute-center">
          <div style="color: #666666; width: 110%; margin-top: 120px">
            You haven't added a estimator yet.
          </div>
          <img
            class="q-mx-lg q-pt-sm"
            src="~assets/add.svg"
            alt="add_icon"
            @click="addEstimatorDialog = true"
            width="130px"
            height="100px"
          />
        </div>
      </div>
    </div>
    <!-- Add Estimator Dialog  -->

    <q-dialog
      v-model="addEstimatorDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addEstimatorDialog = false"
          :dialogName="'Estimating Info'"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <EstimatingInfo
              :estimatingInfo="estimatorInfo"
              :estimatorAssignToggle="false"
            />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="single-next-button-style"
          size="'xl'"
          @click="validateEstimatingInfo"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EstimatingInfo from 'components/EstimatingInfo';
import CustomBar from 'components/CustomBar';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';
import ClaimDetail from 'components/ClaimDetail';
export default {
  name: 'ClaimEstimatingInfo',
  components: {
    EstimatingInfo,
    CustomBar,
    ClaimDetail
  },
  data() {
    return {
      addEstimatorDialog: false,
      estimatorInfo: {
        doesAnEstimatorNeedToBeAssignedToggle: true,
        estimatorID: '',
        scopeTimeNeeded: '',
        notesToTheEstimator: ''
      }
    };
  },

  computed: {
    ...mapGetters(['estimator', 'selectedClaimId'])
  },

  created() {
    this.getEstimateInfo(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getEstimateInfo', 'addClaimEstimator']),
    onPhoneNumberClick,
    onEmailClick,
    async validateEstimatingInfo() {
      if (this.estimatorInfo.doesAnEstimatorNeedToBeAssignedToggle) {
        if (this.estimatorInfo.name) {
          const payload = {
            claimID: this.selectedClaimId,
            data: {
              estimator: {
                estimatorID: this.estimatorInfo.estimatorID,
                scopeTimeNeeded: this.estimatorInfo.scopeTimeNeeded,
                notesToTheEstimator: this.estimatorInfo.notesToTheEstimator
              }
            }
          };
          await this.addClaimEstimator(payload);
          this.getEstimateInfo(this.selectedClaimId);
          this.addEstimatorDialog = false;
        } else {
          this.$q.notify({
            message: 'Please Choose a estimator',
            position: 'top',
            type: 'negative'
          });
        }
      }
    },
    onClickUploadDocument() {
      this.$router.push('/document-upload');
    }
  }
};
</script>
