<template>
  <q-page>
    <div v-if="!isMobile()" class="row" style="height: calc(100vh - 125px);">
      <div class="col-3 q-px-xl q-pt-lg" style="background-color: #f9e7d8">
        <div class="text-bold text-h5  q-pt-sm">Account Setup</div>
        <div>
          <q-stepper
            class="no-shadow text-bold"
            v-model="step"
            vertical
            color="primary"
            inactive-color="primary"
            inactive-icon="adjust"
            active-icon="circle"
            animated
            style="background-color: #f9e7d8;"
          >
            <q-step
              :name="1"
              title="Step 1"
              caption=" Add Your Company Details"
              :done="step > 1"
            />

            <q-step
              :name="2"
              title="Step 2"
              caption="Connect With Google Drive"
              :done="step > 2"
            />

            <q-step
              :name="3"
              title="Step 3"
              caption="Add PhotoID Account Details (optional)"
              :done="step > 3"
            >
            </q-step>
          </q-stepper>
        </div>
      </div>
      <div class="col-9  q-px-xl">
        <div v-if="step == 0">
          <div class="column justify-center q-mt-xl">
            <q-img
              class="col self-center q-mt-xl"
              height="20%"
              width="20%"
              :src="getImage('onBoard-1.svg')"
            />
          </div>
          <div class="text-h5 text-bold text-center q-mx-xl q-px-xl q-mt-lg">
            Setup Your Account
          </div>
          <div
            class="text-center text-subtitle1 q-mx-xl q-px-xl q-mt-lg"
            style="color:#667085; "
          >
            Congratulations, you have successfully created your account! Next,
            we will collect some pertinent information to complete your account,
            so you can get the most out of our system.
          </div>
          <div class="row justify-center q-mt-lg rounded">
            <q-btn
              class=""
              style="border-radius:10px"
              color="primary"
              name=""
              label="Get Started"
              @click="getStarted"
            />
          </div>
        </div>
        <div v-if="step == 1">
          <div class="q-pt-lg q-px-xl" style="border-radius: 20px;">
            <div class="q-mt-sm justify-between">
              <div class="text-h5 text-weight-bold">Company Details</div>
              <div class="text-subtitle2 q-mt-sm" style="color:#667085">
                Fill out the form below with the information about your company.
              </div>
            </div>
            <div>
              <q-form ref="companyDetailsForm">
                <div class="q-mt-xl">
                  <div class="row text-subtitle1 text-weight-bold">
                    Company Name<span class="text-red">*</span>
                  </div>

                  <div class="row">
                    <q-input
                      dense
                      class="full-width"
                      input-class="text-subtitle1"
                      outlined
                      v-model="organization.name"
                      maxlength="128"
                      disable
                    />
                  </div>
                  <div class="row q-mt-sm full-width">
                    <div class="col q-mr-md">
                      <!-- company adminstrator changed to contact name -->
                      <div class="row text-subtitle1 text-weight-bold">
                        Company Contact
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        v-model="companyDetails.contactNumber"
                      />
                    </div>
                    <div class="col">
                      <!-- company adminstrator changed to contact name -->
                      <div class="row text-subtitle1 text-weight-bold">
                        Company Email
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        v-model="companyDetails.email"
                      />
                    </div>
                  </div>
                  <div class="col q-mt-md q-mr-md full-width">
                    <div class="row justify-between">
                      <div class="col text-subtitle1 text-weight-bold">
                        Company Address<span class="text-red">*</span>
                      </div>
                    </div>
                    <div v-if="companyDetails">
                      <AutoCompleteAddress
                        :id="'AddVendor1'"
                        :address="companyDetails"
                        :isDropBoxEnable="false"
                        :isChecksEnable="false"
                        :value="true"
                        :view="'custom'"
                        :readOnly="!editCompanyDetails"
                      />
                    </div>
                  </div>

                  <div class="q-mt-lg row justify-end">
                    <q-btn
                      class="col-1"
                      size="md"
                      color="primary"
                      label="Next"
                      @click="NextStepperValue"
                    />
                  </div>
                </div>
              </q-form>
            </div>
          </div>
        </div>
        <div v-if="step == 2" class="column full-height">
          <div class="col-2 q-mt-lg">
            <div class="text-h5 text-weight-bold ">
              Connect With Google Drive
            </div>
            <div class=" q-mt-lg subtitle2 q-pr-xl " style="color:#667085">
              In order to provide full access to ClaimGuru, we need permission
              to connect to your Google account. We synchronize your ClaimGuru
              files with your Google Drive so you will retain full ownership
              over your data.
            </div>
          </div>

          <div class="col-4">
            <div class="q-mt-lg">
              <q-btn
                @click="onRedirectToGoogleAuth()"
                flat
                class="row q-py-sm q-px-xl"
                style="width:400px; border:2px solid black; border-radius:10px"
              >
                <q-avatar>
                  <q-img
                    class="col"
                    :src="getImage('logos_google-drive.svg')"
                  />
                </q-avatar>
                <span class="col q-ml-xs text-subtitle1"
                  >Connect Google Drive</span
                >
              </q-btn>
            </div>
          </div>

          <div class="col row q-mt-sm q-mb-xl items-end justify-between">
            <div class="col-2">
              <q-btn
                color="primary"
                size="1.2em"
                style="border-radius:10px;"
                outline
                @click="navigatePreviousStepper"
                >Back</q-btn
              >
            </div>
            <div class="col-2">
              <q-btn
                color="primary"
                size="1.2em"
                style="border-radius:10px;"
                @click="NextStepperValue"
                >Next</q-btn
              >
            </div>
          </div>
        </div>
        <div v-if="step == 3" class="column full-height">
          <div class="col-3 q-mt-lg">
            <div class="text-h5 text-weight-bold q-mt-lg">
              PhotoID Account Details
            </div>
            <div class=" q-mt-lg text-h6 text-grey">
              <div class=" q-mt-lg subtitle2 q-pr-xl " style="color:#667085">
                If you are currently a PhotoID user, please complete your
                information below. If not, please consider signing up by
                <a class="text-orange" href="">clicking here</a>. Our
                partnership with PhotoID will enhance your user experience.
              </div>
            </div>
          </div>
          <div class="col-6 ">
            <div class="q-mt-lg">
              <q-form ref="editPhotoIDForm">
                <div class=" q-mt-lg ">
                  <div class="col q-pr-xl">
                    <div class="text-subtitle1 text-weight-bold q-mb-sm">
                      Account Email
                    </div>
                    <q-input
                      dense
                      input-class="text-subtitle1"
                      outlined
                      v-model="companyDetails.photoIdEmail"
                    />
                  </div>
                  <div class="col q-pr-xl">
                    <div
                      class="text-subtitle1 text-weight-bold q-mt-md q-mb-sm"
                    >
                      Account Api Key
                    </div>
                    <q-input
                      dense
                      class=""
                      input-class="text-subtitle1"
                      outlined
                      v-model="companyDetails.photoIdAPIKey"
                    />
                  </div>
                </div>
              </q-form>
            </div>
          </div>
          <div class="col row q-mt-sm q-mb-xl items-end justify-between">
            <div class="col-2">
              <q-btn
                color="primary"
                size="1.2em"
                style="border-radius:10px;"
                outline
                @click="navigatePreviousStepper"
                >Back</q-btn
              >
            </div>
            <div class="col-2">
              <q-btn
                color="primary"
                size="1.2em"
                style="border-radius:10px;"
                @click="NextStepperValue"
                >Next</q-btn
              >
            </div>
          </div>
        </div>

        <div v-if="step > 3">
          <div class="column justify-center q-mt-xl">
            <q-img
              class="col self-center q-mt-xl"
              height="20%"
              width="20%"
              :src="getImage('onBoard-2.svg')"
            />
          </div>
          <div class="text-h5 text-bold text-center q-mx-xl q-px-xl q-mt-lg">
            Account Setup Successful
          </div>
          <div class="text-center text-subtitle1 q-mx-xl q-px-xl q-mt-lg">
            We're excited for you to experience how ClaimGuru works for you!
          </div>
          <div class="row justify-center q-mt-lg rounded">
            <q-btn
              class="q-py-sm"
              style="border-radius:10px"
              no-caps
              color="primary"
              name=""
              label="Go to Home"
              icon-right="navigate_next"
              @click="goToHome"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="column">
      <div class="col q-pt-lg" style="background-color: #f9e7d8">
        <div class="text-bold text-h5 q-pl-md ">Account Setup</div>
        <div class="">
          <q-stepper
            class="no-shadow text-bold text-h3 q-pl-md"
            v-model="step"
            vertical
            color="primary"
            animated
            style="background-color: #f9e7d8;"
          >
            <q-step
              :name="1"
              title="Step 1"
              icon="circle"
              caption=" Add Your Company Details"
              :done="step > 1"
            />

            <q-step
              :name="2"
              title="Step 2"
              caption="Connect With Google Drive"
              icon="circle"
              :done="step > 2"
            />

            <q-step
              :name="3"
              title="Step 3"
              icon="circle"
              caption="Add PhotoID Account Details (optional)"
              :done="step > 3"
            >
            </q-step>
          </q-stepper>
        </div>
      </div>
      <div class="col q-px-xl">
        <div v-if="step == 0">
          <div class=" justify-center ">
            <q-img
              class="col self-center q-mt-xl"
              height="20%"
              width="50%"
              :src="getImage('onBoard-1.svg')"
            />
          </div>
          <div class="text-h5 text-bold text-center  q-px-sm q-mt-lg">
            Setup Your Account
          </div>
          <div class="text-center text-subtitle1  q-px-sm q-mt-lg">
            Congratulations, you have successfully created your account! Next,
            we will collect some pertinent information to complete your account,
            so you can get the most out of our system.
          </div>
          <div class="row justify-center q-mt-lg rounded">
            <q-btn
              class=""
              color="primary"
              name=""
              label="Get Started"
              @click="getStarted"
            />
          </div>
        </div>
        <div v-if="step == 1">
          <div class="q-mt-md " style="border-radius: 20px;">
            <div class=" justify-between">
              <div class="text-h5 text-weight-bold">Company Details</div>
              <div class="text-subtitle2 q-mt-sm">
                Fill out the form below with the information about your company.
              </div>
            </div>
            <div>
              <q-form ref="companyDetailsForm">
                <div class="q-mt-xl">
                  <div class="row text-subtitle1 text-weight-bold">
                    Company Name<span class="text-red">*</span>
                  </div>

                  <div class="row">
                    <q-input
                      dense
                      class="full-width"
                      input-class="text-subtitle1"
                      outlined
                      v-model="companyDetails.name"
                      :disable="!editCompanyDetails"
                      maxlength="128"
                      :rules="[
                        val => val.length > 0 || 'Please add company name'
                      ]"
                    />
                  </div>
                  <div class="row q-mt-sm full-width">
                    <div class="col q-mr-md">
                      <!-- company adminstrator changed to contact name -->
                      <div class="row text-subtitle1 text-weight-bold">
                        Company Contact
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        v-model="companyDetails.contactNumber"
                      />
                    </div>
                    <div class="col">
                      <!-- company adminstrator changed to contact name -->
                      <div class="row text-subtitle1 text-weight-bold">
                        Contact Email
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        v-model="companyDetails.email"
                      />
                    </div>
                  </div>
                  <div class="col q-mt-md q-mr-md full-width">
                    <div class="row justify-between">
                      <div class="col text-subtitle1 text-weight-bold">
                        Company Address<span class="text-red">*</span>
                      </div>
                    </div>
                    <div v-if="companyDetails">
                      <AutoCompleteAddress
                        :id="'AddVendor1'"
                        :address="companyDetails"
                        :isDropBoxEnable="false"
                        :isChecksEnable="false"
                        :value="true"
                        :view="'custom'"
                        :readOnly="!editCompanyDetails"
                      />
                    </div>
                  </div>

                  <div class="q-my-lg row justify-end">
                    <q-btn
                      class="col-4"
                      size="md"
                      color="primary"
                      label="Next"
                      @click="NextStepperValue"
                    />
                  </div>
                </div>
              </q-form>
            </div>
          </div>
        </div>
        <div v-if="step == 2">
          <div class="text-h5 text-bold q-mt-lg">
            Connect With Google Drive
          </div>
          <div class="q-mt-lg text-subtitle1 text-grey">
            In order to provide full access to ClaimGuru, we need permission to
            connect to your Google account. We synchronize your ClaimGuru files
            with your Google Drive so you will retain full ownership over your
            data.
          </div>
          <div>
            <div class="q-mt-lg">
              <q-btn
                flat
                class="row q-py-sm "
                style="border:2px solid black; border-radius:10px"
              >
                <q-avatar>
                  <q-img
                    class="col"
                    :src="getImage('logos_google-drive.svg')"
                  />
                </q-avatar>
                <span class="col q-ml-xs text-body1">Connect Google Drive</span>
              </q-btn>
            </div>
          </div>

          <div class="row q-mt-xl items-end justify-between">
            <div class="col-2">
              <q-btn color="primary" outline @click="navigatePreviousStepper"
                >Back</q-btn
              >
            </div>
            <div class="col-2">
              <q-btn color="primary" @click="NextStepperValue">Next</q-btn>
            </div>
          </div>
        </div>
        <div v-if="step == 3">
          <div class="text-h5 text-bold q-mt-lg">
            PhotoID Account Details
          </div>
          <div class="row q-mt-lg text-subtitle1 text-grey">
            <div class="text-justify">
              If you are currently a PhotoID user, please complete your
              information below. If not, please consider signing up by
              <a class="text-orange" href="">clicking here</a>. Our partnership
              with PhotoID will enhance your user experience.
            </div>
          </div>
          <q-form ref="editPhotoIDForm">
            <div class=" q-mt-lg ">
              <div class="col q-pr-xl">
                <div class="text-subtitle1 text-weight-bold q-mb-sm">
                  Account Email
                </div>
                <q-input
                  dense
                  input-class="text-subtitle1"
                  outlined
                  v-model="companyDetails.photoIdEmail"
                />
              </div>
              <div class="col q-pr-xl">
                <div class="text-subtitle1 text-weight-bold q-mt-md q-mb-sm">
                  Account Api Key
                </div>
                <q-input
                  dense
                  class=""
                  input-class="text-subtitle1"
                  outlined
                  v-model="companyDetails.photoIdAPIKey"
                />
              </div>
            </div>
          </q-form>
          <div class="row q-mt-xl justify-between">
            <div class="col-3">
              <q-btn color="primary" outline @click="navigatePreviousStepper"
                >Back</q-btn
              >
            </div>
            <div class="col-7">
              <q-btn color="primary" @click="NextStepperValue"
                >Complete Setup</q-btn
              >
            </div>
          </div>
        </div>

        <div v-if="step > 3">
          <div class="column justify-center q-mt-xl">
            <q-img
              class="col self-center q-mt-xl"
              height="20%"
              width="50%"
              :src="getImage('onBoard-2.svg')"
            />
          </div>
          <div class="text-h5 text-bold text-center  q-mt-lg">
            Account Setup Successful
          </div>
          <div class="text-center text-subtitle1  q-mt-lg">
            We're excited for you to experience how ClaimGuru works for you!
          </div>
          <div class="row justify-center q-mt-lg rounded">
            <q-btn
              class=""
              no-caps
              color="primary"
              name=""
              label="Go to Home"
              icon-right="navigate_next"
              @click="goToHome"
            />
          </div>
        </div>
      </div>

      <footer class="text-center q-my-md">
        <q-separator class="q-mt-md q-mb-md" />
        <span> © ClaimGuru 2022</span>
      </footer>
    </div>
  </q-page>
</template>
<script>
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { isMobile } from '@utils/common';
export default {
  components: { AutoCompleteAddress },
  data() {
    return {
      step: 0,
      companyDetails: {
        address: {
          address1: '',
          address2: '',
          addressLocality: '',
          addressRegion: '',
          postalCode: ''
        },
        isDropBoxEnable: false,
        photoIdEmail: '',
        photoIdAPIKey: '',
        contactNumber: '',
        email: ''
      },
      editCompanyDetails: true
    };
  },
  methods: {
    ...mapActions([
      'getOrganization',
      'updateUserForOrganization',
      'toRedirectGoogleAuth'
    ]),
    isMobile,
    getImage(icon) {
      return require('../assets/' + icon);
    },
    onRedirectToGoogleAuth() {
      this.toRedirectGoogleAuth();
    },
    getStarted() {
      this.step = 1;
    },
    goToHome() {
      this.$router.push('/admin');
    },
    async NextStepperValue() {
      if (this.step == 1 || this.step == 3) {
        if (this.step == 1) {
          var payload = {
            data: {
              name: this.organization.name,
              address: {
                addressCountry: 'USA',
                address1: this.companyDetails.address1,
                address2: this.companyDetails.address2,
                addressLocality: this.companyDetails.addressLocality,
                addressRegion: this.companyDetails.addressRegion,
                postalCode: this.companyDetails.postalCode
              },
              phoneNumber: {
                type: 'pager',
                code: '+1',
                number: this.companyDetails.contactNumber
              },
              email: this.companyDetails.email
            }
          };
        }
        if (this.step == 3) {
          var payload = {
            data: {
              name: this.organization.name,
              photoIDEmail: this.companyDetails.photoIdEmail,
              photoIDAPIKey: this.companyDetails.photoIdAPIKey
            }
          };
        }

        await this.updateUserForOrganization(payload);
        await this.getOrganization();
      }
      this.step = this.step + 1;
    },
    navigatePreviousStepper() {
      this.step = this.step - 1;
    }
  },
  computed: {
    ...mapGetters(['organization'])
  },
  async created() {
    await this.getOrganization();
  }
};
</script>
