<template>
  <q-page class="poppinsFont min-height">
    <div class="row">
      <div
        class="col-xl-3 col-md-4 col-sm-12 col-xs-12 max-width"
        style="background-color: #f9e7d8"
      >
        <CustomSidebar step="1" />
      </div>
      <div class="col-xl-9 col-md-8 cols-sm-12 col-xs-12 bodyMinHeight">
        <q-separator class="seperator-color" />
        <div class="q-px-xl px-15 pr-50">
          <div class="justify-between">
            <div class="text-h5 fontWeight600 mt-40 titleLetterSpacing">
              Company Details
            </div>
            <div
              class="text-subtitle2 fontWeight400 normalLetterSpacing"
              style="color: #667085"
            >
              Fill out the form below with the information about your company.
            </div>
          </div>
          <div>
            <q-form greedy v-if="editCompanyDetails" ref="companyDetailsForm">
              <CompanyDetails :companyDetails.sync="companyDetails" />
              <div class="row justify-end">
                <q-btn
                  class="col-1 Next-Btn"
                  size="md"
                  color="primary"
                  label="Next"
                  no-caps
                  @click="NextStepperValue"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
    <MobileFooter />
  </q-page>
</template>

<script>
import CompanyDetails from 'components/CompanyDetails';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import MobileFooter from 'components/MobileFooter.vue';
import CustomSidebar from 'components/CustomSidebar';
import { validateEmail } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
export default {
  meta() {
    return {
      title: this.metaTitle
    };
  },
  data() {
    return {
      metaTitle: 'Company Details - claimguru',
      width: window.innerWidth,
      step: 0,
      companyDetails: {
        name: '',
        address: {
          address1: '',
          addressLocality: '',
          addressRegion: '',
          addressCountry: '',
          postalCode: ''
        },
        email: '',
        phoneNumber: {
          code: '',
          number: '',
          type: 'pager'
        }
      },
      editCompanyDetails: true,
      dialCode: '',
      checkConnection: false
    };
  },
  components: {
    CompanyDetails,
    AutoCompleteAddress,
    CustomSidebar,
    MobileFooter
  },
  methods: {
    ...mapActions([
      'getUserInfo',
      'getOrganization',
      'updateUserForOrganization'
    ]),
    validateEmail,
    getImage(icon) {
      return require('../../assets/' + icon);
    },
    onSelect({ name, iso2, dialCode }) {
      this.dialCode = dialCode;
    },
    getStarted() {
      this.$router.push('/onboarding/step1');
    },
    validateEmailManually(val) {
      if (val.length < 2) {
        this.errorMSG = 'Please enter the valid address';
        return false;
      } else {
        this.errorMSG = '';
        return true;
      }
    },
    async NextStepperValue() {
      const success = await this.$refs.companyDetailsForm.validate();

      if (success && this.companyDetails.address.address1.length > 0) {
        var payload = {
          data: this.companyDetails
        };

        await this.updateUserForOrganization(payload);
        await this.getOrganization();
        this.$router.push('/onboarding/step2');
        // }
      }
    },
    onResize(e) {
      this.width = window.innerWidth;
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
    let data = await this.getUserInfo();
    await this.getOrganization();
    if (data.attributes.onboard.isCompleted == true) {
      this.$router.push('/dashboard');
    }
    if (this.organization) {
      this.companyDetails.name = this.organization.name;
      this.companyDetails.address.address1 = this.organization.address
        ? this.organization.address.address1
        : '';
      this.companyDetails.address.addressLocality = this.organization.address
        ? this.organization.address.addressLocality
        : '';
      this.companyDetails.address.addressRegion = this.organization.address
        ? this.organization.address.addressRegion
        : '';
      this.companyDetails.address.postalCode = this.organization.address
        ? this.organization.address.postalCode
        : '';
      if (this.organization.phoneNumber) {
        this.companyDetails.phoneNumber = this.organization.phoneNumber;
      }
      this.companyDetails.address.country = this.organization.address
        ? this.organization.address.addressCountry
        : '';
      this.companyDetails.email = this.organization.email;
      this.companyDetails.photoIdEmail = this.organization.photoIDEmail;
      this.companyDetails.photoIdAPIKey = this.organization.photoIDAPIKey;
    }
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  input {
    color: #101828 !important;
  }
  input::placeholder {
    color: #8a90a0;
    font-size: 16px !important;
    font-weight: 500 !important;
  }
}
.poppinsFont {
  font-family: poppins;
}
.step1Logon {
  width: 32px !important;
  height: 32px !important;
  border: 2px solid #ef5926;
  border-radius: 16px;
}
.q-py-38 {
  padding-top: 38px;
  padding-bottom: 38px;
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
.image-w-252 {
  width: 252px;
}
.mx-40 {
  margin-left: 102px;
  margin-right: 70px;
}
.companyNameInput {
  border-radius: 8px;
}
// ::v-deep.companyNameInput.q-field--outlined .q-field__control::before {
//   border: none !important;
// }
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
  font-size: 16px !important;
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
.formContainer {
  margin-left: 24px;
  @media (max-width: 1439px) {
    margin-left: 12px;
    // max-width: 700px;
  }
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
::v-deep .q-layout__section--marginal {
  background-color: white;
  border-top: none;
}
::v-deep .q-btn__wrapper:before {
  box-shadow: none;
}
::v-deep .q-field__messages {
  line-height: 10px;
}
::v-deep .absolute-full {
  background-size: auto;
}
::v-deep .absolute-full {
  background-size: inherit !important;
}
::v-deep .vue-country-select .dropdown-item {
  font-family: 'Poppins';
  font-style: normal;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 400;
  padding: 14px 8px;
  font-size: 14px;
  letter-spacing: 0.13118px;
  line-height: 24px;
}
.q-pl-32 {
  padding-left: 15px;
}
.q-pb-18 {
  padding-bottom: 18px;
}
.text-subtitle2 {
  color: #667085;
  margin-top: 4px;
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
  border-radius: 10px;
  padding: 8px, 20px, 8px, 20px !important;
  background: rgba(239, 89, 38, 0.5);
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  margin-top: 40px;
  margin-bottom: 15px;
  line-height: 24px;

  @media (max-width: 1024px) {
    width: 95px !important;
    height: 40px !important;
    border-radius: 5px !important;
    margin-top: 42px;
    margin-bottom: 15px;
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

@media screen and (max-width: 1024px) {
  .mb-30 {
    margin-bottom: 30px;
  }

  ::v-deep .vue-country-select .dropdown-list {
    width: 84vw !important;
  }
}

@media screen and (min-width: 1024px) {
  ::v-deep .vue-country-select .dropdown-list {
    width: 25vw !important;
  }
}

@media screen and (max-width: 800px) {
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

  ::v-deep .vue-country-select .dropdown-list {
    width: calc(100vw - 45px) !important;
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
  .height-40px {
    height: 24px;
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
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
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
}
@media only screen and (max-width: 1024px) {
  .q-px-32 {
    padding-left: 32px;
    padding-top: 18px;
  }
  .mt-125 {
    margin-top: 125px;
  }
  .q-pr-lg {
    padding-right: 0px;
  }
  .mt-40 {
    margin-top: 40px;
  }
  .mt-25 {
    margin-top: 0px;
  }
  .px-15 {
    padding-left: 15px;
    padding-right: 15px;
  }
  .heighT {
    // height: -webkit-fill-available
  }
}

@media only screen and (min-width: 1440px) {
  .max-width {
    max-width: 480px;
  }
}

.heighT {
  // height: auto
}
@media only screen and (min-width: 1024px) {
  .q-px-32 {
    padding-left: 32px;
    padding-top: 0px;
  }
  .formHeight {
    height: 580px;
  }
  .mt-40 {
    margin-top: 40px;
  }
  .mt-25 {
    margin-top: 10px;
  }
  .pr-50 {
    padding-right: 50px;
  }
  .q-px-xl {
    padding-left: 62px;
    padding-right: 60px;
  }
}
</style>
