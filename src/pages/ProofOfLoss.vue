<template>
  <div>
    <div class="row">
      <q-icon
        @click="onClickTopMenu"
        name="more_vert"
        v-if="proofOfLoss.documents.length"
        size="sm"
        class="q-ml-auto"
      />
    </div>

    <div class="row q-mt-sm" v-if="proofOfLoss.documents.length">
      <div
        class="vertical-center q-px-md q-py-sm "
        v-for="(pol, index) in proofOfLoss.documents"
      >
        <q-icon name="picture_as_pdf" size="sm" color="primary" />
        <span class="q-pl-md" @click="onDocClick(pol.webViewLink)">
          {{ pol.name ? pol.name : '-' }}</span
        >
      </div>
    </div>
    <div v-else class="full-height full-width column">
      <div class="column absolute-center">
        <div style="color: #666666,align-items: center">
          no document found
        </div>
      </div>
    </div>
    <!-- Top Menu Items Dialog -->
    <q-dialog
      v-model="menuItemsOptions"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <q-card style="width: 350px">
        <q-card-section class="items-center">
          <div class="q-pa-md heading-light" @click="onApprove()">
            Approve
          </div>
          <div
            class="q-pa-md heading-light"
            @click="$router.push('/claim-details')"
          >
            Edit Claim Details
          </div>
          <div class="q-pa-md heading-light" @click="onRegenerateClick()">
            Regenerate
          </div>

          <div class="q-pa-md heading-light" @click="onUploadPOL">
            Upload Notarized POL
          </div>
          <div class="q-pa-md heading-light" @click="onSendingPOL()">
            Send Proof of Loss
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Alert Question Box -->
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section> </q-card-section>

        <q-card-section class="q-pt-none">
          do you want to send an estimate and proof of loss to carrier?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="alert = false"
          ></q-btn>
          <q-btn
            flat
            label="send"
            color="primary"
            v-close-popup
            @click="onSendClick()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'ProofOfLoss',
  data() {
    return {
      menuItemsDialog: false,
      menuItemsOptions: false,
      alert: false
    };
  },
  computed: {
    ...mapGetters(['proofOfLoss', 'selectedClaimId'])
  },

  created() {
    this.getProofOfLossDoc(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getProofOfLossDoc',
      'approveProofOfLoss',
      'regenerateProofOfLoss',
      'sendPOLToCarrier'
    ]),
    ...mapMutations(['setLoading']),
    onClickTopMenu() {
      this.menuItemsOptions = true;
      this.allFolder = true;
    },
    onSendingPOL() {
      this.alert = true;
    },
    async onSendClick() {
      const payload = {
        claimID: this.selectedClaimId,
        data: {}
      };
      await this.sendPOLToCarrier(payload);
      this.menuItemsOptions = false;
    },
    onUploadPOL() {
      this.$router.push('/pol-document/' + this.selectedClaimId);
    },
    onDocClick(link) {
      window.open(link);
    },
    async onApprove() {
      await this.approveProofOfLoss(this.selectedClaimId);
      this.menuItemsOptions = false;
    },
    async onRegenerateClick() {
      await this.regenerateProofOfLoss(this.selectedClaimId);
      this.menuItemsOptions = false;
    }
  }
};
</script>
