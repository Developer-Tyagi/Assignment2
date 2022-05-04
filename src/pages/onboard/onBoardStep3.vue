<template>
  <q-page class="poppinsFont min-height">
    <div class="row">
      <div
        class="col-xl-3 col-md-4 col-sm-12 col-xs-12 max-width"
        style="background-color: #f9e7d8"
      >
        <CustomSidebar step="3" />
      </div>
      <div class="col-xl-9 col-md-8 cols-sm-12 col-xs-12 bodyMinHeight">
        <q-separator class="seperator-color" />
        <div class="photoIdContainer">
          <div class="column full-height">
            <div class="mx-15">
              <div class="photoId-Text">PhotoID Account Details</div>
              <div class="column Bottom-photoId-text mt-4">
                <div class="text-justify">
                  <li class="style-type-none">
                    If you are currently a PhotoID user, please complete your
                    information below.
                  </li>
                </div>
                <div class="text-justify">
                  <li class="style-type-none">
                    If not, please consider signing up by
                    <a
                      class="text-orange"
                      href="https://photoidapp.net/"
                      target="”_blank”"
                      >clicking here</a
                    >.
                  </li>
                </div>
                <div class="text-justify">
                  <li class="style-type-none">
                    Our partnership with PhotoID will enhance your user
                    experience.
                  </li>
                </div>
              </div>
            </div>
            <div>
              <div class="q-mt-30 mx-15">
                <q-form greedy ref="editPhotoIDForm">
                  <div class="">
                    <div class="col q-pr-xl">
                      <div class="text-subheading q-mb-6">Account Email</div>
                      <q-input
                        dense
                        input-class="photoId-Inputtext"
                        placeholder="Company Email Address"
                        outlined
                        v-model.trim="companyDetails.photoIdEmail"
                        lazy-rules
                        :rules="[
                          val =>
                            !!val || 'Please fill your photoid email address',
                          val =>
                            validateEmail(val) ||
                            'Please enter valid email address'
                        ]"
                      />
                    </div>
                    <div class="col q-pr-xl">
                      <div class="text-subheading mt30 q-mb-6">Api Key</div>
                      <q-input
                        class="PhotoId-input"
                        input-class="photoId-Inputtext"
                        outlined
                        placeholder="Account API Key"
                        v-model.trim="companyDetails.photoIdAPIKey"
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please fill photoid api key'
                        ]"
                      >
                        <template v-slot:append>
                          <q-avatar style="width: 16px; height: 16px">
                            <img :src="getImage('IconHelp.svg')" />
                            <q-tooltip
                              anchor="bottom middle"
                              self="top middle"
                              :offset="[10, 10]"
                            >
                              <strong>Enter API key in this field</strong>
                            </q-tooltip>
                          </q-avatar>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
            <div
              class="col row q-mt-sm q-mb-100 q-mr-xl ml-15 mt-323 items-end justify-between"
            >
              <q-btn no-caps class="Back-Btn" @click="navigatePreviousStepper"
                >Back</q-btn
              >

              <q-btn class="completeSetup-Btn" no-caps @click="NextStepperValue"
                >Complete Setup</q-btn
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
import { validateEmail, successMessage, errorMessage } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
export default {
  meta() {
    return {
      title: this.metaTitle
    };
  },
  data() {
    return {
      metaTitle: 'PhotoID Account Details - claimguru',
      companyDetails: {
        photoIdEmail: '',
        photoIdAPIKey: ''
      },
      editCompanyDetails: true,
      dialCode: '',
      checkConnection: false
    };
  },
  components: {
    CustomSidebar,
    MobileFooter
  },
  methods: {
    ...mapActions([
      'getUserInfo',
      'getOrganization',
      'updateUserForOrganization',
      'verifyPhotoidAccount'
    ]),
    getImage(icon) {
      return require('../../assets/' + icon);
    },
    navigatePreviousStepper() {
      this.companyDetails.photoIdAPIKey = this.organization.photoIDAPIKey;
      this.companyDetails.photoIdEmail = this.organization.photoIDEmail;
      this.$router.push('/onboarding/step2');
    },
    async NextStepperValue() {
      if (
        this.companyDetails.photoIdEmail &&
        this.companyDetails.photoIdAPIKey
      ) {
        const payload = {
          data: {
            name: this.organization.name,
            photoIDEmail: this.companyDetails.photoIdEmail,
            photoIDAPIKey: this.companyDetails.photoIdAPIKey
          }
        };
        let accountExists = await this.verifyPhotoidAccount(payload.data);
        if (accountExists) {
          await this.updateUserForOrganization(payload);
          this.successMessage('PhotoID account details updated');
          this.$router.push('/onboarding/step4');
        }
      } else if (
        (!this.companyDetails.photoIdEmail &&
          this.companyDetails.photoIdAPIKey) ||
        (!this.companyDetails.photoIdAPIKey && this.companyDetails.photoIdEmail)
      ) {
        this.errorMessage('Please provide all details');
      } else {
        this.$router.push('/onboarding/step4');
      }
    },
    validateEmail,
    successMessage,
    errorMessage
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
    await this.getOrganization();
    if (this.organization) {
      if (this.organization) {
        this.companyDetails.photoIdEmail = this.organization.photoIDEmail;
        this.companyDetails.photoIdAPIKey = this.organization.photoIDAPIKey;
      }
      //   let data = await this.getUserInfo();
      //   if (data.attributes.onboard.isCompleted == true) {
      //     this.$router.push('/dashboard');
      //   }
    }
  }
};
</script>

<style lang="scss" scoped>
.photoIdContainer {
  padding-left: 62px;
  padding-right: 62px;
  @media (max-width: 1024px) {
    padding-left: 15px;
    padding-right: 15px;
  }
}
::v-deep {
  input {
    color: #101828 !important;
  }
  .q-field__messages {
    margin-top: 3px !important;
  }
  .q-field--with-bottom {
    padding-bottom: 0px !important;
  }
  li.style-type-none::marker {
    margin-right: 5px !important;
    // width: 8px !important;
  }
}
.poppinsFont {
  font-family: poppins;
}
.step1Logon {
  width: 32px !important;
  height: 32px !important;
}
.stepWorking {
  width: 32px !important;
  height: 32px !important;
  border: 2px solid #ffffff;
  border-radius: 16px;
}
.q-mb-6 {
  margin-bottom: 6px;
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
.text-orange {
  color: #ef5926 !important;
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
.q-mb-100 {
  margin-bottom: 100px;
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
::v-deep .q-layout__section--marginal {
  background-color: white;
  border-top: none;
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
::v-deep .q-field__native {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #8a90a0;
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
.mt-323 {
  margin-top: 323px;
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
  line-height: 24px;
  border-radius: 10px !important;
  padding: 10px, 30px, 10px, 30px !important;
  border: 2px solid #ef5926;
  background: #ffffff;
  color: #ef5926 !important;
  font-weight: 600 !important;
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
  line-height: 32px;
}
.q-mt-30 {
  margin-top: 35px;
}
.mt-4 {
  margin-top: 4px;
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
  @media (max-width: 768px) {
    letter-spacing: 0;
  }
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
  // color: #101828 !important;
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
  ::v-deep .q-field__marginal {
    font-size: 18px !important;
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
@media only screen and (max-width: 600px) {
  .q-px-32 {
    padding-left: 15px;
    padding-top: 15px;
  }

  .q-mt-30 {
    margin-top: 25px;
  }
  .mt30 {
    margin-top: 16px;
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
    border-radius: 5px;
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
  .q-field__native {
    // width: 345px;
    // height: 44px;
    color: #101828 !important;
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
  .mt-323 {
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
    line-height: 24px;
    border: 2px solid #ef5926;
    color: #ef5926 !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    line-height: 24px;
  }
  .Next-Btn {
    width: 95px !important;
    height: 40px !important;
    border-radius: 10px !important;
    // padding: 8px 20px 8px 20px !important;
    background: #ef5926;
    color: #ffffff !important;
    font-weight: 600 !important;
    font-size: 16px !important;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .mt30 {
    margin-top: 30px;
  }
  .q-mt-30 {
    margin-top: 30px;
  }
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
