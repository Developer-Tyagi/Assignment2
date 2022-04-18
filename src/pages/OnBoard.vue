<template>
  <q-page class="poppinsFont min-height">
    <div class="row">
      <div
        class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12"
        style="background-color: #f9e7d8"
      >
        <CustomSidebar step="1" />
      </div>

      <div class="col-xl-9 col-lg-9 col-md-8 cols-sm-12 col-xs-12">
        <q-separator class="seperator-color" />
        <div class="q-px-xl">
          <div v-if="step == 0">
            <div class="column justify-center">
              <q-img
                class="col self-center mt-120 image-h-216 image-w-252"
                :src="getImage('onBoard-1.svg')"
              />
            </div>
            <div
              class="text-h5 fontColor text-center letter-spacing-15 q-mx-xl q-px-xl mt-43"
            >
              Set Up Your Account
            </div>
            <div
              class="text-center fontWeight400 text-subtitle1 letter-spacing-15 q-mx-xl q-px-xl SubTextfontSize"
            >
              Congratulations, you have successfully created your account! Next,
              we will collect some pertinent information to complete your
              account so you can get the most out of our system.
            </div>
            <div class="row justify-center rounded">
              <q-btn
                class="StartButton"
                style="border-radius: 10px"
                no-caps
                name=""
                label="Get Started"
                @click="getStarted"
              />
            </div>
            <div class="row border-top">
              <!-- <q-separator class="q-mt-md " /> -->
              <div
                class="col-sm-12 md-hide lg-hide xl-hide ml-31 text-footer q-px-32 q-pb-18"
                style="background-color: white"
              >
                © ClaimGuru<span> {{ CurrentYear }} </span>
              </div>
            </div>
          </div>
          <div v-if="step == 1">
            <div class="q-pt-lg px-15 pr-50" style="border-radius: 20px">
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
                    <div class="row text-subtitle1 fontWeight600">
                      Company Name
                    </div>

                    <div class="row">
                      <q-input
                        dense
                        class="full-width"
                        input-class="input-subtitle1"
                        style="background: #e8edf2"
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
                          style="border-radius: 8px; height: 44px"
                          placeholder="Company Email"
                          outlined
                          v-model="companyDetails.email"
                          :rules="[
                            val => val.length > 0 || 'Please add email address',
                            val =>
                              validateEmail(val) ||
                              'You have entered an invalid email address!'
                          ]"
                        />
                      </div>
                    </div>
                    <div
                      class="col-xs-12 col-sm-12 com-md-12 mt-30 q-mr-md full-width"
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

                    <div
                      class="row justify-end"
                      style="margin-top: 60px; padding-bottom: 100px"
                    >
                      <q-btn
                        class="col-1 Next-Btn"
                        size="md"
                        color="primary"
                        label="Next"
                        no-caps
                        @click="NextStepperValue"
                      />
                    </div>
                    <div class="row border-top">
                      <!-- <q-separator class="q-mt-md " /> -->
                      <div
                        class="col-sm-12 md-hide lg-hide xl-hide ml-31 text-footer q-px-32 q-pb-18"
                        style="background-color: white"
                      >
                        © ClaimGuru<span> {{ CurrentYear }} </span>
                      </div>
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
          </div>
          <div v-if="step == 2" class="column pl-62 pr-110 full-height">
            <div class="col-2 mt-24">
              <div class="text-h5 fontWeight600">Connect With Google Drive</div>
              <div
                class="q-mt-lg fontWeight400 subtitle2"
                style="color: #667085"
              >
                In order to provide full access to ClaimGuru, we need permission
                to connect to your Google account. We synchronize your ClaimGuru
                files with your Google Drive so you will retain full ownership
                over your data.
              </div>
            </div>

            <div class="col-4">
              <div class="mt-24">
                <q-btn
                  v-if="this.checkConnection == false"
                  @click="onRedirectToGoogleAuth()"
                  class="row connectWithGoogle"
                >
                  <q-avatar>
                    <q-img
                      class="col"
                      style="width: 26px; height: 24px; margin-top: -15px"
                      :src="getImage('logos_google-drive.svg')"
                    />
                  </q-avatar>
                  <span
                    class="col q-ml-xs mb-15 fontWeight500"
                    style="margin-bottom: 15px color: #0C0C0C"
                    >Connect Google Drive</span
                  >
                </q-btn>
                <div
                  v-else
                  class="row justify-center"
                  style="
                    width: 345px;
                    height: 44px;
                    border: solid 1px #039855;
                    background-color: #d1fadf;
                    border-radius: 8px;
                  "
                >
                  <span class="q-pt-sm text-center" style="color: #039855"
                    >Connected to Google Drive
                    <span>
                      <q-icon name="task_alt" color="teal" size="sm" /> </span
                  ></span>
                </div>
              </div>
            </div>

            <div
              class="col-lg-9 col-xl-9 col-md-9 col-sm-12 col-xs-12 row mt-404 q-mb-xl items-end justify-between"
              style="position: relative"
            >
              <q-btn
                style="border-radius: 10px"
                no-caps
                class="Back-Btn"
                @click="navigatePreviousStepper"
                >Back</q-btn
              >

              <q-btn
                style="border-radius: 10px"
                class="fontWeight600 Next-Btn"
                no-caps
                @click="NextStepperValue"
                :disable="!checkConnection"
                >Next</q-btn
              >
            </div>
            <div class="row border-top">
              <!-- <q-separator class="q-mt-md " /> -->
              <div
                class="col-sm-12 md-hide lg-hide xl-hide ml-31 text-footer q-px-32 q-pb-18"
                style="background-color: white"
              >
                © ClaimGuru<span> {{ CurrentYear }} </span>
              </div>
            </div>
          </div>
          <div v-if="step == 3" class="column full-height">
            <div class="col-3 q-mt-lg q-mx-md">
              <div class="photoId-Text">PhotoID Account Details</div>
              <div class="column Bottom-photoId-text">
                <div class="text-justify">
                  <li>
                    If you are currently a PhotoID user, please complete your
                    information below.
                  </li>
                </div>
                <div class="text-justify">
                  <li>
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
                  <li>
                    Our partnership with PhotoID will enhance your user
                    experience.
                  </li>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="q-mt-lg mx-15">
                <q-form ref="editPhotoIDForm">
                  <div class="q-mt-lg">
                    <div class="col q-pr-xl">
                      <div class="text-subheading q-mb-sm">Account Email</div>
                      <q-input
                        dense
                        input-class="photoId-Inputtext"
                        placeholder="Company Email Address"
                        outlined
                        v-model="companyDetails.photoIdEmail"
                      />
                    </div>
                    <div class="col q-pr-xl">
                      <div class="text-subheading q-mt-md q-mb-sm">Api Key</div>
                      <q-input
                        dense
                        class="PhotoId-input"
                        input-class="photoId-Inputtext"
                        outlined
                        placeholder="Account API Key"
                        v-model="companyDetails.photoIdAPIKey"
                      >
                        <template v-slot:append>
                          <q-avatar style="width: 13px; height: 13px">
                            <img :src="getImage('IconHelp.svg')" />
                          </q-avatar>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
            <div
              class="col row q-mt-sm q-mb-xl q-mr-xl ml-15 mt-333 items-end justify-between"
            >
              <q-btn no-caps class="Back-Btn" @click="navigatePreviousStepper"
                >Back</q-btn
              >

              <q-btn
                class="completeSetup-Btn"
                style="border-radius: 10px"
                no-caps
                @click="NextStepperValue"
                >Complete Setup</q-btn
              >
            </div>
            <div class="row border-top">
              <!-- <q-separator class="q-mt-md " /> -->
              <div
                class="col-sm-12 md-hide lg-hide xl-hide ml-31 text-footer q-px-32 q-pb-18"
                style="background-color: white"
              >
                © ClaimGuru<span> {{ CurrentYear }} </span>
              </div>
            </div>
          </div>

          <div v-if="step > 3">
            <div class="column justify-center q-mt-xl">
              <q-img
                class="col self-center q-mt-xl onBoardLogo"
                :src="getImage('onBoard-2.svg')"
              />
            </div>
            <div class="col-sm-12 col-xs-12">
              <div class="setup-success-text text-center mx-40 q-px-xl">
                Account Setup Successful
              </div>
              <div
                class="text-center setup-success-SubText mx-40 q-px-xl"
                style="color: #667085"
              >
                We're excited for you to experience all that ClaimGuru has to
                offer!
              </div>
              <div class="row justify-center mt-43 rounded">
                <q-btn
                  class="GoHome-btn"
                  no-caps
                  name=""
                  label="Go to Home"
                  icon-right="navigate_next"
                  @click="goToHome"
                />
              </div>
              <div class="row border-top">
                <!-- <q-separator class="q-mt-md " /> -->
                <div
                  class="col-sm-12 md-hide lg-hide xl-hide ml-31 text-footer q-px-32 q-pb-18"
                  style="background-color: white"
                >
                  © ClaimGuru<span> {{ CurrentYear }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <customFooterMain /> -->
    </div>
  </q-page>
</template>
<script>
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { mapGetters, mapActions } from 'vuex';
import CustomSidebar from 'components/CustomSidebar';
// import customFooterMain from '../components/CustomFooterMain.vue'
// import { isMobile } from '@utils/common';
import { validateEmail } from '@utils/validation';
import { LocalStorage } from 'quasar';

const tokenName = 'access_token';

export default {
  meta() {
    return {
      title: this.metaTitle
    };
  },
  components: {
    AutoCompleteAddress,
    CustomSidebar
    // customFooterMain
  },
  data() {
    return {
      metaTitle: 'Setup - claimguru',
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

  mounted() {
    // const pageName = document.getElementsByTagName("title")[0]
    //  pageName.innerHTML = "Claimguru - Setup"
  },

  methods: {
    ...mapActions([
      'getOrganization',
      'updateUserForOrganization',
      'toRedirectGoogleAuth1',
      'setOnboard',
      'getUserInfo'
    ]),
    // isMobile,
    validateEmail,
    getImage(icon) {
      return require('../assets/' + icon);
    },
    onRedirectToGoogleAuth() {
      this.toRedirectGoogleAuth1();
    },
    getStarted() {
      this.step = 1;
    },
    goToHome() {
      this.$router.push('/admin');
      LocalStorage.clear(tokenName);
    },
    onSelect({ name, iso2, dialCode }) {
      this.dialCode = dialCode;
    },
    async NextStepperValue() {
      if (this.step == 1 || this.step == 3) {
        if (this.step == 1) {
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
            this.step = this.step + 1;
          }
        }
        if (this.step == 3) {
          var payload = {
            data: {
              name: this.organization.name,
              photoIDEmail: this.companyDetails.photoIdEmail,
              photoIDAPIKey: this.companyDetails.photoIdAPIKey
            }
          };
          await this.updateUserForOrganization(payload);
          await this.getOrganization();
          var payload1 = {
            isCompleted: true
          };
          await this.setOnboard(payload1);
          this.step = this.step + 1;
        }
      } else if (this.step === 2) {
        this.step = this.step + 1;
      }
    },
    navigatePreviousStepper() {
      this.step = this.step - 1;
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
    this.step = 0;
    await this.getOrganization();
    if (this.organization) {
      this.companyDetails.name = this.organization.name;
      // console.log(685,this.organization.address.address1, "addresss111", );
      if (this.organization) {
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
      this.step = 0;
      // this.checkConnection = true;
      if (this.$route.query.googleConnect == 'true') {
        this.checkConnection = true;
      } else {
        let data = await this.getUserInfo();
        if (data.attributes.onboard.isCompleted == true) {
          // console.log("6755555");
          this.$router.push('/dashboard');
          // if (isMobile()) {
          //   this.$router.push('/dashboard');
          // } else {
          //   this.$router.push('/admin');
          // }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.poppinsFont {
  font-family: poppins;
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
    margin-left: 0px !important;
    margin-right: 0px !important;
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
