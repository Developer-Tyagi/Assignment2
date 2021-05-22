<template>
  <q-page>
    <q-icon
      @click="onClickTopMenu"
      name="more_vert"
      size="sm"
      class="icon-top"
    />

    <div class="vertical-center q-px-md q-py-sm ">
      <div class="row q-mt-sm">
        <q-icon name="picture_as_pdf" size="sm" color="primary" />
        <span class="q-pl-md "> {{ proofOfLoss.documents.name }}</span>
        <q-icon
          @click="onClickSideMenu"
          name="more_vert"
          size="sm"
          class="q-ml-auto"
        />
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
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Side Menu Items Dialog -->
    <q-dialog
      v-model="sideMenuOptionsDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <q-card style="width: 550px; height:200px">
        <q-card-section class="items-center form-heading q-ml-md">
          <div class="row q-ml-xl ">
            <div class="column q-ml-xl">
              <q-btn
                name="upload"
                icon="share"
                @click="(shareDialog = true), (sideMenuOptionsDialog = false)"
                text-color="primary"
                class="q-ml-sm"
              />
              <div class="form-heading q-ml-md">Share</div>
            </div>
            <div class="column">
              <q-btn
                class="q-ml-md"
                icon="delete"
                text-color="primary"
                style="width: 50px"
                @click="(alert = true), (sideMenuOptionsDialog = false)"
              />
              <div class="form-heading q-ml-md">
                Remove
              </div>
            </div>
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
      menuItemsOptions: false,
      sideMenuOptionsDialog: false,
      link: ''
    };
  },
  computed: {
    ...mapGetters(['proofOfLoss', 'selectedClaimId'])
  },

  created() {
    this.getProofOfLossDoc(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getProofOfLossDoc', 'approveProofOfLoss']),
    ...mapMutations(['setLoading']),
    onClickTopMenu() {
      this.menuItemsOptions = true;
      this.allFolder = true;
    },
    async onApprove() {
      await this.approveProofOfLoss(this.selectedClaimId);
      this.menuItemsOptions = false;
    },
    onClickSideMenu() {
      this.sideMenuOptionsDialog = true;
    }
  }
};
</script>
