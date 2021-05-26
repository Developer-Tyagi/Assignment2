<template>
  <q-page>
    <div class="row" v-if="!addEstimatorDialog">
      <q-btn
        size="sm"
        name="create"
        class="add-icon"
        flat
        @click="addEstimatorDialog = true"
        ><img src="~assets/add.svg"
      /></q-btn>
    </div>
    <ClaimDetail />
    <div>
      <q-card class="q-pa-md q-ma-md">
        <div class="text-bold">
          {{ estimator.estimator.fname }} {{ estimator.estimator.lname }}
        </div>

        <div class="row q-mt-sm">
          <span class="heading-light col-2"> Email</span>
          <span
            class="q-ml-lg col clickLink"
            @click="onEmailClick(estimator.estimator.email, $event)"
          >
            {{ estimator.estimator.email }}</span
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
            {{ estimator.estimator.phoneNumber[0].type }}
            {{ estimator.estimator.phoneNumber[0].number }}</span
          >
        </div>
      </q-card>
    </div>
    <!-- Add Estimator Dialog  -->

    <q-dialog
      v-model="addEstimatorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addEstimatorDialog = false"
          :dialogName="'Estimating Info'"
        />
        <div class="q-ma-md mobile-container-page listing-height">
          <q-form>
            <EstimatingInfo :estimatingInfo="estimatorInfo" />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="full-width  text-capitalize"
          size="'xl'"
          @click="validateEstimatingInfo"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EstimatingInfo from 'components/EstimatingInfo';
import CustomBar from 'components/CustomBar';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';
import ClaimDetail from 'components/ClaimDetail';
export default {
  components: {
    EstimatingInfo,
    CustomBar,
    ClaimDetail
  },
  data() {
    return {
      addEstimatorDialog: false,
      estimatorInfo: {
        doesAnEstimatorNeedToBeAssignedToggle: false,
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
