<template>
  <q-page>
    <div class="q-pa-md height-without-header">
      <!-- <q-card
        class="q-ma-xl q-pa-xl bg-grey-3 "
        style="height: calc(100vh - 220px)"
      >
        <div class=" column text-center">
          <div>
            <q-icon name="check_circle_outline" color="green" size="300px" />
          </div>
          <div class="text-bold text-h4">Check Your Email For Confirmation</div>
          <div class="q-my-md  text-h5 heading-light">
            An Email has seen send to with a link to activate you account
          </div>
          <div class="  text-h5 heading-light">
            Please check your spam or junk mail if you have not received it
            within the next 5 min..
          </div>
        </div>
      </q-card> -->
      <div class="row justify-center q-mt-xl">
        <div class="col-3 bg-white q-pa-md">
          <q-img
            class="web-menu-claim-guru-logo"
            :src="getImage('claimguru_new_logo.png')"
          />
        </div>
      </div>
      <div class="row justify-center text-h3 q-mt-lg">
        Thank You!
      </div>
      <div class="row justify-center text-h5 q-mt-lg">
        To setting up your account, please click on the link in the email we
        just sent to you!
      </div>
      <div class="row justify-center  q-mt-lg">
        <q-icon name="mail_outline" color="black" size="xl" />
        <q-icon name=" priority_high" color="primary" size="xl" />
      </div>
      <div class="row justify-center text-h5 q-mt-md">
        (Dont forget to check your Spam folder, if you don't see our email.)
      </div>
      <div class="row justify-center text-h5 q-mt-xl">
        If you want to grab ClaimGuru app, you can fing the link here!
      </div>
      <div class="row justify-center q-mt-xl">
        <div class="col-2 bg-white q-pa-md">
          <q-img
            class="web-menu-claim-guru-logo"
            :src="getImage('Mobile_app_store_badge.svg')"
          />
        </div>
        <div class="col-2 bg-white q-pa-md">
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.claimguru.app"
          >
            <q-img
              class="web-menu-claim-guru-logo"
              :src="getImage('Mobile_app_store_badge-1.svg')"
            />
          </a>
        </div>
      </div>
      <div class="row justify-center text-h5 q-mt-xl">
        <a href="" class="text-blue" style="text-decoration: underline">
          Need support? Click here
        </a>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  methods: {
    getImage(icon) {
      return require('../assets/' + icon);
    }
  }
};
</script>

<style lang="scss">
tr:nth-child(even) {
  background-color: $grey-3 !important;
}
</style>
