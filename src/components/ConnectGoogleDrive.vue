<template>
  <div>
    <div v-if="organization && organization.isDriveConnected">
      <div class="flex-column details-container">
        <div class="details-heading">Email</div>
        <div class="details-content q-pt-sm ellipsis">
          {{ organization.driveEmail }}
        </div>
        <div class="flex-row justify-center items-center q-mt-lg google-drive">
          <span class="text-center"
            >Connected to Google Drive
            <span> <q-icon name="task_alt" color="teal" size="17px" /> </span
          ></span>
        </div>
      </div>
    </div>
    <div
      v-else
      @click="onRedirectToGoogleAuth()"
      class="flex-row justify-center items-center connect-google-drive cursor-pointer"
    >
      <img class="drive-image" :src="getImage('logos_google-drive.svg')" />
      <span class="text-center"> Connect Google Drive </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ConnectGoogleDrive',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['organization'])
  },
  methods: {
    ...mapActions(['toRedirectGoogleAuth2']),
    getImage(icon) {
      return require('../assets/' + icon);
    },
    onRedirectToGoogleAuth() {
      let redirectURL = window.location.href;
      this.toRedirectGoogleAuth2(redirectURL);
    }
  }
};
</script>
<style lang="scss" scoped>
.drive-image {
  height: 24px;
  width: 27px;
  margin-right: 10px;
}
.google-drive {
  height: 44px;
  width: 351px;
  border: solid 1px #039855;
  color: #039855;
  background-color: #d1fadf;
  border-radius: 8px;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
}
.connect-google-drive {
  height: 44px;
  width: 331px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #0c0c0c;
  border: 1px solid #0c0c0c;
  box-sizing: border-box;
  border-radius: 8px;
  letter-spacing: 0.15px;
}
@media screen and (max-width: 1023px) {
  .connect-google-drive {
    height: 40px;
    width: calc(100% - 0px);
    max-width: 331px;
  }
  .google-drive {
    height: 40px;
    width: calc(100% - 0px);
    max-width: 313px;
  }
}
</style>
