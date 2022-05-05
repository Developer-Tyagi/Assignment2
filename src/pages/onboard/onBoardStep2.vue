<template>
  <q-page class="poppinsFont min-height">
    <div class="row">
      <div
        class="col-xl-3 col-md-4 col-sm-12 col-xs-12 max-width"
        style="background-color: #f9e7d8"
      >
        <CustomSidebar step="2" />
      </div>
      <div class="col-xl-9 col-md-8 cols-sm-12 col-xs-12 bodyMinHeight">
        <q-separator class="seperator-color" />
        <div class="">
          <div class="column connectDriveContainer full-height">
            <div class="col-2 mt-40">
              <div class="text-h5 fontWeight600 titleLetterSpacing">
                Connect With Google Drive
              </div>
              <div
                class="q-mt-8 fontWeight400 subtitle2 normalLetterSpacing"
                style="color: #667085"
              >
                In order to provide full access to ClaimGuru, we need permission
                to connect to your Google account. We synchronize your ClaimGuru
                files with your Google Drive so you will retain full ownership
                over your data.
              </div>
            </div>

            <div class="row">
              <div class="mt-24 col-sm-12">
                <ConnectGoogleDrive :isPreviousClicked="isPreviousClicked" />
              </div>
            </div>

            <div
              class="col-lg-9 col-xl-9 col-md-9 col-sm-12 col-xs-12 row mt-404 q-mb-100 items-end justify-between align-start"
              style="position: relative"
            >
              <q-btn
                no-caps
                class="Back-Btn fontWeight600"
                @click="navigatePreviousStepper"
                >Back</q-btn
              >
              <q-btn
                class="fontWeight600 Next-Btn"
                no-caps
                @click="NextStepperValue"
                :disable="!(organization && organization.isDriveConnected)"
                >Next</q-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileFooter />
  </q-page>
</template>

<script>
import CustomSidebar from 'components/CustomSidebar';
import MobileFooter from 'components/MobileFooter.vue';
import { mapGetters, mapActions } from 'vuex';
import ConnectGoogleDrive from 'components/ConnectGoogleDrive';
export default {
  meta() {
    return {
      title: this.metaTitle
    };
  },
  data() {
    return {
      metaTitle: 'Connect With Google Drive - claimguru',
      isPreviousClicked: false
    };
  },
  components: {
    CustomSidebar,
    ConnectGoogleDrive,
    MobileFooter
  },
  methods: {
    ...mapActions(['getUserInfo']),
    async NextStepperValue() {
      // this.checkConnection = true;
      this.$router.push('/onboarding/step3');
    },
    navigatePreviousStepper() {
      this.$router.push('/onboarding/step1');
    }
  },
  computed: {
    ...mapGetters(['organization']),
    CurrentYear() {
      const d = new Date();
      let year = d.getFullYear();
      return year;
    }
  },
  async created() {
    if (this.$route.query.googleConnect == 'true') {
      // this.checkConnection = true;
    } else {
      let data = await this.getUserInfo();
      if (data.attributes.onboard.isCompleted == true) {
        this.$router.push('/dashboard');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.connectDriveContainer {
  margin-left: 62px;
  margin-right: 110px;
  max-width: 120rem !important;
  @media (max-width: 1023px) {
    margin-left: 15px;
    margin-right: 15px;
  }
}
.ticIcon {
  height: 20px;
  width: 20px;
  margin-left: 10px;
}
.connectDriveText {
  margin-bottom: 15px;
  margin-left: 10px;
  color: #0c0c0c;
  text-transform: capitalize !important;
}
.poppinsFont {
  font-family: poppins;
}
.step1Logon {
  width: 32px !important;
  height: 32px !important;
}
.q-page-container {
  margin: 0 auto !important;
  max-width: 120rem !important;
}
.min-height {
  min-height: auto !important;
}
.fontWeight600 {
  font-weight: 600;
}
.stepWorking {
  width: 32px !important;
  height: 32px !important;
  border: 2px solid #ffffff;
  border-radius: 16px;
  background: #ef5926;
}
.fontWeight500 {
  font-weight: 500;
}
.mt-8 {
  margin-top: 8px;
}
.fontWeight400 {
  font-weight: 400;
}
.formHeight {
  height: 580px;
}
.fontColor {
  color: #101828;
  font-weight: 600;
}
.inside-text {
  border-bottom: px solid #e5e5e5 !important;
}
.mt-43 {
  margin-top: 43px;
}
.mt-24 {
  margin-top: 30px;
  @media (max-width: 1024px) {
    margin-top: 20px;
  }
}
.mb-15 {
  margin-bottom: 15px;
}
.mx-15 {
  margin-left: 0px;
  margin-right: 0px;
}
.image-h-216 {
  height: 216px;
}
.q-mt-43 {
  margin-top: 34px;
}
.mt-120 {
  margin-top: 120px;
}
.px-15 {
  padding-left: 0px;
  padding-right: 0px;
}
.image-w-252 {
  width: 252px;
}
.mx-40 {
  margin-left: 102px;
  margin-right: 70px;
}
.SubTextfontSize {
  color: #667085;
  font-size: 14px;
  margin-top: 5px;
  line-height: 20px;
  // max-width: 517px;
  padding-left: 40px;
  padding-right: 40px;
}
.input-subtitle1 {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #101828;
}
.dFlex {
  display: flex;
}
.Account-setup-text {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #0c0c0c;
}
.q-px-32 {
  padding-left: 40px;
}
.pr-50 {
  padding-right: 50px;
}
.mt-60 {
  margin-top: 60px;
}
.dropdowLogo {
  margin-top: 18px;
  width: 10px;
  height: 7px;
  margin-left: 5px;
  background-size: auto !important;
}
.StartButton {
  margin-top: 43px;
  margin-bottom: 43px;
  width: 153px;
  height: 50px;
  font-family: 'Poppins-semiBold';
  background: #ef5926;
  font-style: normal;
  box-shadow: none !important;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #ffffff;
}
.Next-button {
  width: 118px;
  height: 50px;
}
.GoHome-btn {
  width: 177px;
  height: 50px;
  background: #ef5926;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 100px;
}
.overflowhidden {
  overflow-x: hidden;
}
.setup-success-text {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #101828;
  letter-spacing: 00.15px;
  margin-top: 43px;
}
.setup-success-SubText {
  margin-top: 6px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  letter-spacing: 00.15px;
}
.pr-20 {
  padding-right: 20px;
}
.onBoardLogo {
  width: 322px;
  height: 189px;
}
.Step-text {
  font-family: 'poppins-medium';
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
}
.letter-spacing-75 {
  letter-spacing: 0.75px;
}
.letter-spacing-15 {
  letter-spacing: 0.15px;
}
.Step-Subtext {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #6e6e6e;
  letter-spacing: 0.15px;
  padding-right: 10px;
}
.seperator-color {
  background-color: #f7f7f7;
  height: 2px;
}
.mb-30 {
  margin-bottom: 30px;
}
.coonectWithgoogle {
  width: 331px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #0c0c0c;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #0c0c0c;
}
.text-5 {
  font-size: 20px;
  color: #0c0c0c;
  letter-spacing: 0.75px;
}
.mt-50 {
  margin-top: 27px;
}
.mt-30 {
  margin-top: 30px;
}
.text-subtitle1 {
  margin-bottom: 6px;
}
.connectWithGoogle {
  width: 331px !important;
  height: 44px !important;
  background: #ffffff !important;
  border: 1px solid #0c0c0c !important;
  box-sizing: border-box !important;
  border-radius: 8px !important;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  align-items: flex-start;
  /* identical to box height, or 150% */
  display: flex;
  // align-items: center;
}
.mt-40 {
  margin-top: 40px;
}
.inside-text {
  font-family: 'Poppins';
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 16px !important;
  line-height: 24px !important;
  align-items: center !important;
  color: #8a90a0 !important;
}
.input-size {
  width: 390px;
  height: 44px;
}
::v-deep .q-layout__section--marginal {
  background-color: white;
  border-top: none;
}
::v-deep .items-center {
  align-items: center;
}
::v-deep {
  .q-btn__wrapper {
    min-height: 1.572em;
  }
  .q-btn__wrapper:before {
    box-shadow: none;
  }
}
::v-deep .q-field__messages {
  line-height: 4px;
}
::v-deep .absolute-full {
  background-size: auto;
}
::v-deep .absolute-full {
  background-size: inherit !important;
}
.q-pl-32 {
  padding-left: 15px;
}
.q-pb-18 {
  padding-bottom: 18px;
}
.text-subtitle2 {
  color: #667085;
  line-height: 20px !important;
  font-size: 14px;
}
.mt-333 {
  margin-top: 333px;
}
.height-40px {
  height: 46px;
}
.pl-62 {
  padding-left: 2px;
}
.pr-110 {
  padding-right: 50px;
}
.mt-404 {
  margin-top: 484px;
  @media (max-width: 768px) {
    margin-top: 60px;
  }
}
.Back-Btn {
  width: 101px !important;
  height: 50px !important;
  border-radius: 10px;
  // padding: 10px, 30px, 10px, 30px !important;
  border: 2px solid #ef5926;
  background: #ffffff;
  color: #ef5926 !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  align-items: flex-start;
  line-height: 24px !important;

  .q-btn__content {
    top: 10px;
    left: 30px;
  }

  @media (max-width: 1023px) {
    width: 81px !important;
    height: 40px !important;
    // padding: 8px 20px !important;
    border-radius: 5px !important;
    .q-btn__content {
      line-height: 24px !important;
      top: 8px !important;
      left: 20px !important;
    }
  }
}
.connectedGooglebtn {
  width: 351px;
  height: 44px;
}
.Next-Btn {
  width: 118px !important;
  height: 50px !important;
  border-radius: 10px;
  padding: 8px, 20px, 8px, 20px !important;
  background: #ef5926;
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  line-height: 24px;

  @media (max-width: 1023px) {
    width: 95px !important;
    height: 40px !important;
    line-height: 24px !important;
    border-radius: 5px !important;
  }
}
.completeSetup-Btn {
  width: 175px !important;
  height: 50px !important;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background: #ef5926;
  border-radius: 10px;
}
.photoId-Text {
  margin-top: 31px;
  font-weight: 600;
  font-size: 24px;
  color: #101828;
  letter-spacing: 0.75px;
}
.Bottom-border {
  border-bottom: 2px #f9dfc8 !important;
  transform: rotate(-0.15deg);
}
.Bottom-photoId-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  letter-spacing: 0.15px;
}
.text-subheading {
  letter-spacing: 00.15px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #101828;
}
.photoId-Inputtext {
  font-weight: 500 !important;
  font-size: 16px !important;
  line-height: 24px !important;
  display: flex;
  align-items: center;
  color: #8a90a0 !important;
}

@media (max-width: 1023px) {
  .q-mb-100 {
    margin-bottom: 100px;
  }
}

@media screen and (max-width: 800px) {
  .q-px-32 {
    padding-left: 32px;
    padding-top: 0px;
  }
  .q-pr-lg {
    padding-right: 0px;
  }
  .q-px-xl {
    padding-left: 0px;
    padding-right: 0px;
  }

  .Account-setup-text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #0c0c0c;
  }
}
@media only screen and (min-width: 1440px) {
  .max-width {
    max-width: 480px;
  }
}
@media (max-width: 600px) {
  .q-mt-8 {
    margin-top: 6px;
  }
  .q-px-32 {
    padding-left: 15px;
    padding-top: 15px;
  }
  .mt-8 {
    margin-top: 4px;
  }
  .q-pl-32 {
    padding-left: 15px;
  }
  .q-px-xl {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  }
  ::v-deep .items-center {
    align-content: flex-start;
  }
  .q-pb-18 {
    padding-bottom: 18px;
  }
  .q-mt-43 {
    margin-top: 24px;
  }
  .mt-30 {
    margin-top: 20px;
  }
  .q-mx-xl {
    padding-left: 0px;
    padding-right: 0px;
  }
  .q-px-xl {
    padding-left: 0px;
    padding-right: 0px;
  }
  .q-pr-lg {
    padding-right: 0px;
  }
  .height-40px {
    height: 24px;
  }
  .px-15 {
    padding-left: 15px;
    padding-right: 15px;
  }

  .mt-120 {
    margin-top: 40px;
  }
  .completeSetup-Btn {
    margin-right: -30px;
    width: 172px !important;
    height: 40px !important;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    background: #ef5926;
    border-radius: 10px;
  }
  .ml-15 {
    margin-left: 15px;
  }
  .q-pr-xl {
    padding-right: 0px;
  }
  .mx-40 {
    margin-left: 15px;
    margin-right: 15px;
  }
  .PhotoId-input {
    width: 345px;
    height: 44px;
  }

  .GoHome-btn {
    width: 157px;
    height: 40px;
    background: #ef5926;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;
    margin-bottom: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .mt-333 {
    margin-top: 60px;
  }
  .input-size {
    width: 345px;
    height: 44px !important;
  }
  .pr-50 {
    padding-right: 15px;
  }
  .mx-15 {
    margin-left: 15px;
    margin-right: 15px;
  }
  .StartButton {
    margin-top: 43px;
    margin-bottom: 43px;
    width: 133px;
    height: 40px;
    font-family: 'Poppins-semiBold';
    border-radius: 5px !important;
    font-style: normal;
    background: #ef5926;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #ffffff;
    box-shadow: none !important;
  }
  .Next-button {
    width: 95px;
    height: 40px;
  }
  .mt-50 {
    margin-top: 27px;
  }
  .pl-62 {
    padding-left: 15px;
  }
  .pr-110 {
    padding-right: 15px;
  }
  .mt-40 {
    margin-top: 25px;
    // margin-left: 4px;
  }
  .align-start {
    align-items: flex-start;
  }
  ::v-deep {
    .items-center {
      align-content: center;
    }
  }
  .connectedGooglebtn {
    width: 345px;
    height: 45px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .q-mt-8 {
    margin-top: 8px !important;
  }
  .q-px-32 {
    padding-left: 15px;
    padding-top: 15px;
  }
  .q-mx-xl {
    padding-left: 0px;
    padding-right: 0px;
  }
  .q-px-xl {
    padding-left: 62px;
    padding-right: 60px;
  }
  .px-15 {
    padding-left: 15px;
    padding-right: 15px;
  }
}
@media only screen and (width: 320px) {
  .connectedGooglebtn {
    width: 287px;
    height: 45px;
    margin-right: 0px;
  }

  .connectWithGoogle {
    width: 290px !important;
    height: 40px !important;
    background: #ffffff !important;
    border: 1px solid #0c0c0c !important;
    box-sizing: border-box !important;
    border-radius: 8px !important;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    align-items: flex-start;
    /* identical to box height, or 150% */
    display: flex;
    // align-items: center;
  }
}
@media only screen and (min-width: 1024px) {
  .q-px-32 {
    padding-left: 32px;
    padding-top: 0px;
  }
}
@media only screen and (width: 1440px) {
  .q-px-32 {
    padding-left: 32px;
    padding-top: 0px;
  }
  .q-px-xl {
    padding-left: 60px;
    padding-right: 60px;
  }
}
</style>
