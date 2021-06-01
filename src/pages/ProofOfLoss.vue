<template>
  <q-page>
    <q-icon
      @click="onClickTopMenu"
      name="more_vert"
      size="sm"
      class="icon-top"
    />

    <div class="vertical-center q-px-md q-py-sm ">
      <div class="row q-mt-sm" v-if="proofOfLoss.documents.length">
        <q-icon name="picture_as_pdf" size="sm" color="primary" />
        <span
          class="q-pl-md"
          @click="onDocClick(proofOfLoss.documents.webViewLink)"
        >
          {{
            proofOfLoss.documents.name ? proofOfLoss.documents.name : '-'
          }}</span
        >
      </div>

      <div v-else class="full-height full-width column">
        <div class="column absolute-center">
          <div style="color: #666666,align-items: center">
            no document found
          </div>
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
              </div>
          <div class="q-pa-md heading-light" @click="onUploadPOL">
           Upload Notarized POL
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      menuItemsDialog: false,
      menuItemsOptions: false
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
      'regenerateProofOfLoss'
    ]),
    ...mapMutations(['setLoading']),
    onClickTopMenu() {
      this.menuItemsOptions = true;
      this.allFolder = true;
    },
    onUploadPOL(){
this.$router.push('/pol-document/'+this.selectedClaimId)
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
