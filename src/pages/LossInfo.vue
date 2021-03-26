<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="q-pa-lg column full-height">
        <!-- This is for showing the Loss Info details   -->

        <q-card class="q-pa-md q-mt-md full-width">
          <div class="row">
            <span class="form-heading">Loss Info</span><br />
            <q-icon
              name="create"
              color="primary"
              class="edit-icon q-my-auto"
            ></q-icon>
          </div>
          <br />
          <span class="form-heading">Address :</span>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['lossInfo', 'selectedClaimId'])
  },
  created() {
    console.log(this.selectedClaimId, 1212);
    this.getLossInfo(this.selectedClaimId);
  },
  methods: { ...mapActions(['getLossInfo']) }
};
</script>
<style lang="scss" scoped></style>
