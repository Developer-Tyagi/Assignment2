<template>
  <q-page class="poppinsFont min-height">
    <div class="row" style="height: calc(100vh - 119px)">
      <div style="width: 100%">
        <div
          class="dFlex justify-between lg-hide xl-hide md-hide Bottom-border"
        >
          <div
            class=""
            v-if="$route.name == 'onBoarding'"
            style="background-color: #f9e7d8"
          >
            <q-img size="1em" src="~assets/Logo.svg" class="LogoSize" />
          </div>
          <div class="justify-end">
            <div class="row justify-end dFlex pr-20">
              <q-avatar
                size="3em"
                font-size="2.5rem"
                icon="person"
                class="text-white bg-grey"
              >
              </q-avatar>
              <q-img src="~assets/Icondown.svg" class="dropdowLogo" />
            </div>
          </div>
        </div>
        <div class="Account-setup-text mt-50">Account Setup</div>
        <!-- custom stepper -->
        <div class="column q-mt-43">
          <div class="col">
            <div class="row">
              <!-- <q-icon
                name="adjust"
                color="primary"
                size="md"
              /> -->

              <!-- <q-img size="1em" src="~assets/_StepIconWithBorder.svg" v-if="step == 1" class="step1Logon" /> -->
              <q-icon
                name="adjust"
                color="primary"
                v-if="step == 0"
                size="md"
              />
              <q-img
                size="1em"
                src="~assets/stepWorking.svg"
                class="stepWorking"
                v-if="step == 1"
              />
              <q-img
                size="1em"
                src="~assets/_Step1done.svg"
                class="step1Logon"
                v-if="step == 2 || step == 3 || step == 4"
              />

              <div class="q-ml-sm">
                <div class="Step-text">Step 1</div>
                <div class="Step-Subtext">Add Your Company Details</div>
              </div>
            </div>
            <div
              class="q-ml-md height-40px"
              style="border-left: 2px solid #ef5926; margin-top: -14px"
            ></div>
          </div>
          <div class="col">
            <div class="row">
              <q-icon
                name="adjust"
                color="primary"
                v-if="step == 1 || step == 0"
                size="md"
              />
              <!-- <q-img size="1em" src="~assets/_StepIconWithBorder.svg" v-if="step == 2" class="step1Logon" /> -->
              <q-img
                size="1em"
                src="~assets/stepWorking.svg"
                class="stepWorking"
                v-if="step == 2"
              />
              <q-img
                size="1em"
                src="~assets/_Step1done.svg"
                class="step1Logon"
                v-if="step == 3 || step == 4"
              />
              <div class="q-ml-sm">
                <div class="Step-text">Step 2</div>
                <div class="Step-Subtext">Connect With Google Drive</div>
              </div>
            </div>
            <div
              class="q-ml-md height-40px"
              style="border-left: 2px solid #ef5926; margin-top: -14px"
            ></div>
          </div>
          <div class="col">
            <div class="row">
              <q-icon
                name="adjust"
                color="primary"
                size="md"
                v-if="step == 0 || step == 1 || step == 2"
              />
              <q-img
                size="1em"
                src="~assets/stepWorking.svg"
                class="stepWorking"
                v-if="step == 3"
              />
              <!-- <q-img size="1em" src="~assets/_StepIconWithBorder.svg" class="step1Logon"  v-if="step == 3"/> -->
              <q-img
                size="1em"
                src="~assets/_Step1done.svg"
                class="step1Logon"
                v-if="step == 4"
              />
              <div class="q-ml-sm">
                <div class="Step-text">Step 3</div>
                <div class="Step-Subtext">
                  Add PhotoID Account Details
                  <span v-if="width >= 1203">(optional)</span>
                </div>
                <div class="Step-Subtext" v-if="width < 1203">(optional)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      width: window.innerWidth
    };
  },
  props: {
    step: String
  },
  methods: {
    onResize(e) {
      this.width = window.innerWidth;
    }
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss" scoped>
.poppinsFont {
  font-family: poppins;
}
.step1Logon {
  width: 32px !important;
  height: 32px !important;
  // border: 2px solid #EF5926;
  // border-radius: 16px;
}
.stepWorking {
  width: 32px !important;
  height: 32px !important;
  border: 2px solid #ffff;
  border-radius: 16px;
}
.q-page-container {
  margin: 0 auto !important;
  max-width: 120rem;
}
.min-height {
  min-height: auto !important;
}
.fontWeight600 {
  font-weight: 600;
}
.fontWeight500 {
  font-weight: 500;
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
  margin-bottom: 00px;
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
  height: 40px !important;
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
.mt-24 {
  margin-top: 24px;
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
.text-footer {
  font-weight: 400;
  color: #667085;
  font-size: 14px;
}
.border-top {
  border-top: 0px;
}
::v-deep .q-layout__section--marginal {
  background-color: white;
  border-top: none;
}
::v-deep .q-btn__wrapper:before {
  box-shadow: none;
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
.ml-31 {
  padding-left: 16px !important;
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
  padding-right: 50;
}
.mt-404 {
  margin-top: 404px;
}
.Back-Btn {
  width: 101px !important;
  height: 50px !important;
  border-radius: 10px !important;
  padding: 10px, 30px, 10px, 30px !important;
  border: 2px solid #ef5926;
  background: #ffffff;
  color: #ef5926 !important;
  font-weight: 500 !important;
  font-size: 16px !important;
  align-items: flex-start;
}
.Next-Btn {
  width: 118px !important;
  height: 50px !important;
  border-radius: 10px !important;
  padding: 8px, 20px, 8px, 20px !important;
  background: rgba(239, 89, 38, 0.5);
  color: #ffffff !important;
  font-weight: 500 !important;
  font-size: 16px !important;
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

@media screen and (max-width: 1022px) {
  .border-top {
    border-top: 1px solid #e5e5e5;
    margin-left: -50px;
    margin-right: -50px;
  }
  .ml-31 {
    margin-left: 15px !important;
  }

  .mb-30 {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 800px) {
  .q-px-32 {
    padding-left: 32px;
    padding-top: 0px;
  }
  .border-top {
    border-top: 1px solid #e5e5e5;
    margin-left: -50px;
    margin-right: -50px;
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
@media only screen and (max-width: 600px) {
  .q-px-32 {
    padding-left: 15px;
    padding-top: 15px;
  }
  .q-pl-32 {
    padding-left: 15px;
  }
  .q-px-xl {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  }
  .q-pb-18 {
    padding-bottom: 18px;
  }
  .q-mt-43 {
    margin-top: 24px;
  }
  .mt-30 {
    margin-top: 16px;
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
  .border-top {
    border-top: 1px solid #e5e5e5;
    margin-left: -15px !important;
    margin-right: -15px !important;
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
  .mt-404 {
    margin-top: 60px;
  }
  .mt-24 {
    margin-top: 16px;
  }
  .Back-Btn {
    width: 81px !important;
    height: 40px !important;
    border-radius: 5px !important;
    padding: 8px, 20px, 8px, 20px !important;
    border: 2px solid #ef5926;
    color: #ef5926 !important;
    font-weight: 600 !important;
    font-size: 16px !important;
  }
  .Next-Btn {
    width: 95px !important;
    height: 40px !important;
    border-radius: 10px !important;
    padding: 8px, 20px, 8px, 20px !important;
    background: #ef5926;
    color: #ffffff !important;
    font-weight: 600 !important;
    font-size: 16px !important;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  // .border-top {
  //   border-top: 1px solid #e5e5e5;
  // }
  // .q-px-32 {padding-left: 15px;}
  .q-px-32 {
    padding-left: 15px;
    padding-top: 15px;
  }
  .q-px-xl {
    padding-left: 15px;
    padding-right: 15px;
  }
  .q-mx-xl {
    padding-left: 0px;
    padding-right: 0px;
  }
  .q-px-xl {
    padding-left: 40px;
    padding-right: 40px;
  }
  .px-15 {
    padding-left: 15px;
    padding-right: 15px;
  }
  // .height-40px {height: 24px;}
}
@media only screen and (width: 1024px) {
  .q-px-32 {
    padding-left: 32px;
    padding-top: 0px;
  }
  .heighT {
    // height: -webkit-fill-available
  }
}

.heighT {
  // height: auto
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
  .border-top {
    border-top: 0px;
  }
}
</style>
