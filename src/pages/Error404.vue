<template>
  <div
    class="error-container bgNewPrimary window-height window-width overflow-auto"
  >
    <div class="flex">
      <img
        @click="$router.push('/')"
        class="cursor-pointer"
        :class="isMobile() ? 'app-claim-guru-logo' : 'web-claim-guru-logo'"
        :src="getImage('claimguru_new_logo.png')"
      />
    </div>
    <div
      :class="isMobile() ? 'app-error-container' : 'web-error-container'"
      class="text-center q-ma-md"
    >
      <div class="q-px-md">
        <img class="app-logo" :src="getImage('claimguru_error.svg')" />
      </div>
      <div class="full-width error-heading fontWeight600 text-h4 q-px-md">
        404 Error. Page not found.
      </div>
      <div
        class="full-width error-message text-h6 q-px-md fontWeight400 q-px-md"
      >
        Sorry, the content you are looking for doesn’t exist.
        <br v-if="!isMobile()" />
        Either it was removed or you’ve mistyped the link.
      </div>
      <div class="flex row-wrap button-container q-px-md">
        <q-btn
          to="/"
          no-caps
          flat
          class="bg-primary text-white fontWeight600 border-5 error-buttons"
          label="Go to Home"
        >
          <q-icon right size="16px" name="arrow_forward_ios" />
        </q-btn>
        <div class="button-spacing"></div>
        <q-btn
          no-caps
          flat
          class="bgNewPrimary secondary-border text-primary fontWeight600 border-5 error-buttons"
          label="Contact Us"
        />
      </div>
    </div>
    <footer v-if="isMobile()" class="full-width q-mb-md">
      <q-separator class="q-mb-md error-separator" />
      <span class="footer-position fontWeight400">
        © ClaimGuru
        <span>
          {{ currentYear() }}
        </span>
      </span>
    </footer>
    <div v-else></div>
  </div>
</template>

<script>
import { isMobile } from '@utils/common';

export default {
  name: 'Error404',
  created() {
    document.title = 'Page not found - claimguru';
  },
  methods: {
    isMobile,
    getImage(icon) {
      return require('../assets/' + icon);
    },
    currentYear() {
      let year = new Date().getFullYear();
      return year;
    }
  },
  destroyed() {
    document.title = 'claimguru';
  }
};
</script>

<style lang="scss" scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.app-error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #101828;
  .app-logo {
    height: 131px;
    width: 117.96px;
  }
  .error-heading {
    padding: 40px 0px 20px 0px;
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 0.75px;
  }
  .error-message {
    padding-bottom: 50px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.15px;
  }
}
.web-error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #101828;
  .app-logo {
    height: 231px;
    width: 208px;
  }
  .error-heading {
    padding-top: 30px;
    padding-bottom: 20px;
    line-height: 56px;
    letter-spacing: 0.75px;
  }
  .error-message {
    padding-bottom: 50px;
    line-height: 28px;
    letter-spacing: 0.15px;
  }
}
.footer-position {
  padding-left: 32px;
  color: #667085;
  float: left;
}
.error-separator {
  color: #d0d5dd;
}
.error-buttons {
  height: 40px;
  width: 160px;
  line-height: 24px;
  font-size: 16px;
}
.button-container {
  display: flex;
  flex-direction: row;
}
.button-spacing {
  margin-right: 25px;
}

@media (max-width: 377px) {
  .button-container {
    display: flex;
    flex-direction: column;
  }
  .button-spacing {
    margin-top: 25px;
    margin-right: 0px;
  }
}
</style>
