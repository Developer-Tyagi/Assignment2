<template>
  <div class="fullscreen bgNewPrimary">
    <div class="flex column">
      <div class="flex row">
        <img
          :class="isMobile() ? 'app-claim-guru-logo' : 'web-claim-guru-logo'"
          :src="getImage('claimguru_new_logo.png')"
        />
      </div>
      <div
        :class="isMobile() ? 'app-error-container' : 'web-error-container'"
        class="flex column justify-center items-center text-center q-px-sm"
      >
        <div class="flex row">
          <img class="app-logo" :src="getImage('claimguru_error.svg')" />
        </div>
        <div class="flex row error-heading fontWeight600 text-h4">
          404 Error. Page not found.
        </div>
        <div class="flex row error-message text-h6">
          Sorry, the content you are looking for doesn’t exist.
          <br v-if="!isMobile()" />
          Either it was removed or you’ve mistyped the link.
        </div>
        <div class="flex row">
          <q-btn
            to="/"
            no-caps
            flat
            class="bg-primary text-white fontWeight600 q-mr-md q-px-xs"
            label="Go to Home"
          >
            <q-icon right size="16px" name="arrow_forward_ios" />
          </q-btn>
          <q-btn
            no-caps
            flat
            class="bgNewPrimary secondary-border text-primary fontWeight600 q-px-xs"
            label="Contact Us"
          />
        </div>
      </div>
      <footer v-if="isMobile()" class="q-mb-md">
        <q-separator class="q-mb-md error-separator" />
        <span class="footer-position"> © ClaimGuru 2022</span>
      </footer>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@utils/common';

export default {
  name: 'Error404',
  created() {
    console.log(isMobile());
  },
  methods: {
    isMobile,
    getImage(icon) {
      return require('../assets/' + icon);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-error-container {
  height: calc(100vh - 120.5px);
  .app-logo {
    height: 131px;
    width: 117.96px;
  }
  .error-heading {
    padding: 40px 0px 20px 0px;
    font-size: 32px;
  }
  .error-message {
    padding-bottom: 50px;
    font-size: 16px;
  }
}
.web-error-container {
  height: calc(100vh - 67px);
  .app-logo {
    height: 231px;
    width: 208px;
  }
  .error-heading {
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .error-message {
    padding-bottom: 50px;
  }
}
.footer-position {
  padding-left: 32px;
  color: #667085;
}
.error-separator {
  color: #d0d5dd;
}
</style>
