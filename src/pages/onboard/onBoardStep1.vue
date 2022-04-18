<template>
  <q-page class="poppinsFont min-height">
    <div class="row">
      <div
        class="col-md-4 col-sm-12 col-xs-12"
        style="background-color: #f9e7d8"
      >
        <CustomSidebar step="0" />
      </div>
      <div class="col-md-8 cols-sm-12 col-xs-12">
        <q-separator class="seperator-color" />
        <div class="q-px-xl">
          <div>
            <div class="pt-40 px-15 pr-50" style="border-radius: 20px">
              <div class="q-mt-sm justify-between">
                <div class="text-h5 fontWeight600">Company Details</div>
                <div
                  class="text-subtitle2 fontWeight400 q-mt-sm"
                  style="color: #667085"
                >
                  Fill out the form below with the information about your
                  company.
                </div>
              </div>
              <div class="formHeight">
                <q-form ref="companyDetailsForm">
                  <div class="mt-30">
                    <div
                      class="row text-subtitle1 fontWeight600"
                      style="margin-bottom: 8px"
                    >
                      Company Name
                    </div>

                    <div class="row">
                      <q-input
                        dense
                        class="full-width"
                        input-class="input-subtitle1"
                        style="background: #e8edf2; font-size: 16px"
                        outlined
                        v-model="companyDetails.name"
                        maxlength="128"
                        disable
                      />
                    </div>
                    <div class="row mt-30">
                      <div class="col-12 col-md-6 col-lg-6 col-xl-6 q-pr-lg">
                        <!-- company adminstrator changed to contact name -->
                        <div class="row text-subtitle1 fontWeight600">
                          Company Contact
                        </div>
                        <q-input
                          dense
                          class=""
                          input-class="inside-text"
                          outlined
                          v-model="companyDetails.contactNumber"
                          lazy-rules
                          :rules="[
                            val => val.length > 0 || 'Please add contact number'
                          ]"
                        >
                          <template v-slot:prepend>
                            <vue-country-code
                              @onSelect="onSelect"
                              :preferredCountries="['us']"
                              enabledCountryCode
                              defaultCountry="us"
                              enableSearchField
                              style="border: none; height: 40px"
                            >
                            </vue-country-code>
                          </template>
                        </q-input>
                      </div>
                      <div
                        class="col-xl-6 col-lg-6 col-xs-12 col-sm-12 col-md-6"
                      >
                        <!-- company adminstrator changed to contact name -->
                        <div class="row text-subtitle1 fontWeight600">
                          Company Email
                        </div>
                        <q-input
                          dense
                          class=""
                          input-class=" inside-text"
                          style="border-radius: 8px"
                          placeholder="Company Email"
                          outlined
                          v-model="companyDetails.email"
                          :rules="[
                            val => val > 0 || 'Please add email address',
                            val =>
                              validateEmail(val) ||
                              'You have entered an invalid email address!'
                          ]"
                        />
                      </div>
                    </div>
                    <div
                      class="col-xs-12 col-sm-12 com-md-12 mt-25 q-mr-md full-width"
                    >
                      <div class="row justify-between">
                        <div class="col text-subtitle1 fontWeight600">
                          Company Address
                        </div>
                      </div>
                      <div v-if="companyDetails">
                        <AutoCompleteAddress
                          :id="'AddVendor1'"
                          :address="companyDetails.address"
                          :isDropBoxEnable="false"
                          :isChecksEnable="false"
                          :value="true"
                          :view="'custom'"
                          :readOnly="!editCompanyDetails"
                        />
                      </div>
                    </div>

                    <div class="row justify-end mtAndBottom">
                      <q-btn
                        class="col-1 Next-Btn"
                        size="md"
                        color="primary"
                        label="Next"
                        no-caps
                        @click="NextStepperValue"
                      />
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row border-top">
      <!-- <q-separator class="q-mt-md " /> -->
      <div
        class="col-sm-12 md-hide lg-hide xl-hide ml-31 text-footer"
        style="background-color: white"
      >
        © ClaimGuru<span> {{ CurrentYear }} </span>
      </div>
    </div>
  </q-page>
</template>

<script>
import AutoCompleteAddress from 'components/AutoCompleteAddress';
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
      metaTitle: 'Step1 - claimguru',
      width: window.innerWidth,
      step: 0,
      companyDetails: {
        address: {
          address1: '',
          addressLocality: '',
          addressRegion: '',
          country: '',
          postalCode: ''
        },
        isDropBoxEnable: false,
        photoIdEmail: '',
        photoIdAPIKey: '',
        contactNumber: '',
        email: ''
      },
      editCompanyDetails: true,
      dialCode: '',
      checkConnection: false
    };
  },
  components: {
    AutoCompleteAddress,
    CustomSidebar
  },
  methods: {
    ...mapActions(['getUserInfo', 'getOrganization']),
    validateEmail,
    getImage(icon) {
      return require('../../assets/' + icon);
    },
    onSelect({ name, iso2, dialCode }) {
      this.dialCode = dialCode;
    },
    getStarted() {
      this.$router.push('/onBoarding/step1');
    },
    async NextStepperValue() {
      {
        const success = await this.$refs.companyDetailsForm.validate();
        if (success) {
          let dc = '+' + this.dialCode;
          var payload = {
            data: {
              name: this.organization.name,
              address: {
                addressCountry: this.companyDetails.address.country,
                address1: this.companyDetails.address.address1,
                addressLocality: this.companyDetails.address.addressLocality,
                addressRegion: this.companyDetails.address.addressRegion,
                postalCode: this.companyDetails.address.postalCode
              },
              phoneNumber: {
                type: 'pager',
                code: dc,
                number: this.companyDetails.contactNumber
              },
              email: this.companyDetails.email
            }
          };

          await this.updateUserForOrganization(payload);
          await this.getOrganization();
          this.$router.push('/onBoarding/step2');
        }
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
      this.companyDetails.contactNumber = this.organization.phoneNumber
        ? this.organization.phoneNumber.number
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
.q-px-32 {
  padding-left: 40px;
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
::v-deep .vue-country-select .dropdown-item {
  font-family: 'Poppins';
  font-style: normal;
  color: #101828;
  font-weight: 100;
  font-size: 14px;
  line-height: 24px;
}
::v-deep .vue-country-select .dropdown-list {
  width: 355px !important;
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
  }
  .ml-31 {
    padding-left: 31px !important;
    margin-top: 19px;
    margin-bottom: 19px;
  }

  .mb-30 {
    margin-bottom: 30px;
  }
}

@media screen and (min-width: 1024px) {
  .q-px-32 {
    padding-left: 32px;
    margin-top: 19px;
    margin-bottom: 19px;
  }
  .border-top {
    border-top: 1px solid #e5e5e5;
  }

  .ml-31 {
    margin-left: 31px !important;
    margin-top: 19px;
    margin-bottom: 19px;
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
  .border-top {
    border-top: 1px solid #e5e5e5;
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
  // .height-40px {height: 24px;}
}
@media only screen and (max-width: 1023px) {
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
  .pt-40 {
    padding-top: 40px;
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
  .mtAndBottom {
    margin-top: 60px;
    margin-bottom: 101px;
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
  .pt-40 {
    padding-top: 40px;
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
  .border-top {
    border-top: 0px;
  }
  .mtAndBottom {
    margin-top: 60px;
    margin-bottom: 10px;
  }
}
</style>
