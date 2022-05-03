<template>
  <div
    @click="onRedirectToGoogleAuth()"
    class="flex-row justify-center items-center connect-google-drive"
  >
    <img class="drive-image" :src="getImage('logos_google-drive.svg')" />
    <span class="text-center"> Connect Google Drive </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConnectGoogleDrive',
  data() {
    return {};
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
}
</style>
