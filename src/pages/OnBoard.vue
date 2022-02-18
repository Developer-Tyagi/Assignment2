<template>
  <q-page class="poppinsFont">
    <div v-if="!isMobile()" class="row" style="height: calc(100vh - 125px)">
      <div class="col-3 q-px-xl q-pt-lg" style="background-color: #f9e7d8">
        <div class="fontWeight600 text-h5 q-pt-sm">Account Setup</div>
        <!-- <div>
          <q-stepper
            class="no-shadow text-bold"
            v-model="step"
            vertical
            color="primary"
            inactive-color="primary"
            inactive-icon="adjust"
            active-icon="circle"
            animated
            style="background-color: #f9e7d8"
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
        </div> -->
        <!-- custom stepper -->
        <div class="column q-mt-md">
          <div class="col">
            <div class="row">
              <q-icon
                v-if="step == 0"
                name="adjust"
                color="primary"
                size="md"
              />
              <q-icon v-if="step == 1" color="primary" size="md">
                <q-img :src="getImage('step_active.svg')" />
              </q-icon>
              <q-icon class="q-ml-xs" v-if="step > 1" color="primary" size="sm">
                <q-img :src="getImage('step_done.svg')" />
              </q-icon>
              <div class="q-ml-sm">
                <div>Step 1</div>
                <div class="text-grey">Add Your Company Details</div>
              </div>
            </div>
            <div
              class="q-ml-md"
              style="border-left: 2px solid #ef5926; height: 40px"
            ></div>
          </div>
          <div class="col q-mt-sm">
            <div class="row">
              <q-icon v-if="step < 2" name="adjust" color="primary" size="md" />
              <q-icon v-if="step == 2" color="primary" size="md">
                <q-img :src="getImage('step_active.svg')" />
              </q-icon>
              <q-icon class="q-ml-xs" v-if="step > 2" color="primary" size="sm">
                <q-img :src="getImage('step_done.svg')" />
              </q-icon>
              <div class="q-ml-sm">
                <div>Step 2</div>
                <div class="text-grey">Connect With Google Drive</div>
              </div>
            </div>
            <div
              class="q-ml-md"
              style="border-left: 2px solid #ef5926; height: 40px"
            ></div>
          </div>
          <div class="col q-mt-sm">
            <div class="row">
              <q-icon v-if="step < 3" name="adjust" color="primary" size="md" />
              <q-icon v-if="step == 3" color="primary" size="md">
                <q-img :src="getImage('step_active.svg')" />
              </q-icon>
              <q-icon class="q-ml-xs" v-if="step > 3" color="primary" size="sm">
                <q-img :src="getImage('step_done.svg')" />
              </q-icon>
              <div class="q-ml-sm">
                <div>Step 3</div>
                <div class="text-grey">
                  Add PhotoID Account Details (optional)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 q-px-xl">
        <div v-if="step == 0">
          <div class="column justify-center q-mt-xl">
            <q-img
              class="col self-center q-mt-xl"
              height="20%"
              width="20%"
              :src="getImage('onBoard-1.svg')"
            />
          </div>
          <div
            class="text-h5 fontWeight600 text-center q-mx-xl q-px-xl q-mt-lg"
          >
            Setup Your Account
          </div>
          <div
            class="text-center fontWeight400 text-subtitle1 q-mx-xl q-px-xl q-mt-lg"
            style="color: #667085"
          >
            Congratulations, you have successfully created your account! Next,
            we will collect some pertinent information to complete your account,
            so you can get the most out of our system.
          </div>
          <div class="row justify-center q-mt-lg rounded">
            <q-btn
              class="fontWeight600"
              style="border-radius: 10px"
              color="primary"
              name=""
              label="Get Started"
              @click="getStarted"
            />
          </div>
        </div>
        <div v-if="step == 1">
          <div class="q-pt-lg q-px-xl" style="border-radius: 20px">
            <div class="q-mt-sm justify-between">
              <div class="text-h5 fontWeight600">Company Details</div>
              <div
                class="text-subtitle2 fontWeight400 q-mt-sm"
                style="color: #667085"
              >
                Fill out the form below with the information about your company.
              </div>
            </div>
            <div>
              <q-form ref="companyDetailsForm">
                <div class="q-mt-xl">
                  <div class="row text-subtitle1 fontWeight600">
                    Company Name<span class="text-red">*</span>
                  </div>

                  <div class="row">
                    <q-input
                      dense
                      class="full-width"
                      input-class="text-subtitle1"
                      style="background: #e8edf2"
                      outlined
                      v-model="companyDetails.name"
                      maxlength="128"
                      disable
                    />
                  </div>
                  <div class="row q-mt-sm full-width">
                    <div class="col q-mr-md">
                      <!-- company adminstrator changed to contact name -->
                      <div class="row text-subtitle1 fontWeight600">
                        Company Contact
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
                        outlined
                        v-model="companyDetails.contactNumber"
                        lazy-rules
                        maxlength="10"
                        :rules="[
                          val => val.length > 0 || 'Please add contact number',
                          val =>
                            val.length > 9 ||
                            'Mobile number must contain 10 digit'
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
                    <div class="col">
                      <!-- company adminstrator changed to contact name -->
                      <div class="row text-subtitle1 fontWeight600">
                        Company Email
                      </div>
                      <q-input
                        dense
                        class="full-width"
                        input-class="text-subtitle1"
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
                  <div class="col q-mt-md q-mr-md full-width">
                    <div class="row justify-between">
                      <div class="col text-subtitle1 fontWeight600">
                        Company Address<span class="text-red">*</span>
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

                  <div class="q-mt-lg row justify-end">
                    <q-btn
                      class="col-1 fontWeight600"
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
            <div class="text-h5 fontWeight600 text-weight-bold">
              Connect With Google Drive
            </div>
            <div
              class="q-mt-lg fontWeight400 subtitle2 q-pr-xl"
              style="color: #667085"
            >
              In order to provide full access to ClaimGuru, we need permission
              to connect to your Google account. We synchronize your ClaimGuru
              files with your Google Drive so you will retain full ownership
              over your data.
            </div>
          </div>

          <div class="col-4">
            <div class="q-mt-lg">
              <q-btn
                v-if="this.checkConnection == true"
                @click="onRedirectToGoogleAuth()"
                class="row q-py-sm q-px-xl"
                style="
                  width: 440px;
                  border: 2px solid black;
                  border-radius: 10px;
                "
              >
                <q-avatar>
                  <q-img
                    class="col"
                    :src="getImage('logos_google-drive.svg')"
                  />
                </q-avatar>
                <span class="col q-ml-xs text-subtitle1 fontWeight500"
                  >Connect Google Drive</span
                >
              </q-btn>
              <div
                v-else
                class="row justify-center"
                style="
                  width: 350px;
                  height: 45px;
                  border: solid 1px #039855;
                  background-color: #d1fadf;
                  border-radius: 10px;
                "
              >
                <span
                  class="q-pt-sm text-center text-subtitle1 fontWeight500"
                  style="color: #039855"
                  >Connected to Google Drive
                  <span>
                    <q-icon name="task_alt" color="teal" size="sm" /> </span
                ></span>
              </div>
            </div>
          </div>

          <div class="col row q-mt-sm q-mb-xl items-end justify-between">
            <q-btn
              color="primary"
              size="1.2em"
              style="border-radius: 10px"
              outline
              class="fontWeight600"
              @click="navigatePreviousStepper"
              >Back</q-btn
            >

            <q-btn
              color="primary"
              size="1.2em"
              style="border-radius: 10px"
              class="fontWeight600"
              @click="NextStepperValue"
              :disable="!checkConnection"
              >Next</q-btn
            >
          </div>
        </div>
        <div v-if="step == 3" class="column full-height">
          <div class="col-3 q-mt-lg">
            <div class="text-h5 fontWeight600 q-mt-lg">
              PhotoID Account Details
            </div>
            <div class="column q-mt-lg fontWeight400 text-subtitle1 text-grey">
              <div class="text-justify">
                <li>
                  If you are currently a PhotoID user, please complete your
                  information below.
                </li>
              </div>
              <div class="text-justify">
                <li>
                  If not, please consider signing up by
                  <a class="text-orange" href="https://photoidapp.net/"
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
            <div class="q-mt-lg">
              <q-form ref="editPhotoIDForm">
                <div class="q-mt-lg">
                  <div class="col q-pr-xl">
                    <div class="text-subtitle1 fontWeight600 q-mb-sm">
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
                    <div class="text-subtitle1 fontWeight600 q-mt-md q-mb-sm">
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
            <q-btn
              color="primary"
              size="1.2em"
              style="border-radius: 10px"
              class="fontWeight600"
              outline
              @click="navigatePreviousStepper"
              >Back</q-btn
            >

            <q-btn
              color="primary"
              size="1.2em"
              class="fontWeight600"
              style="border-radius: 10px"
              @click="NextStepperValue"
              >Complete Setup</q-btn
            >
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
          <div
            class="text-h5 fontWeight600 text-center q-mx-xl q-px-xl q-mt-lg"
          >
            Account Setup Successful
          </div>
          <div
            class="text-center text-subtitle1 q-mx-xl q-px-xl q-mt-lg"
            style="color: #667085"
          >
            We're excited for you to experience how ClaimGuru works for you!
          </div>
          <div class="row fontWeight600 justify-center q-mt-lg rounded">
            <q-btn
              class="q-py-sm"
              style="border-radius: 10px"
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
        <div class="fontWeight600 text-h5 q-pl-md">Account Setup</div>
        <div class="">
          <div class="column q-mt-md q-pl-md q-pb-lg">
            <div class="col">
              <div class="row">
                <q-icon
                  v-if="step == 0"
                  name="adjust"
                  color="primary"
                  size="md"
                />
                <q-icon v-if="step == 1" color="primary" size="md">
                  <q-img :src="getImage('step_active.svg')" />
                </q-icon>
                <q-icon
                  class="q-ml-xs"
                  v-if="step > 1"
                  color="primary"
                  size="sm"
                >
                  <q-img :src="getImage('step_done.svg')" />
                </q-icon>
                <div class="q-ml-sm">
                  <div>Step 1</div>
                  <div class="text-grey">Add Your Company Details</div>
                </div>
              </div>
              <div
                class="q-ml-md"
                style="border-left: 2px solid #ef5926; height: 40px"
              ></div>
            </div>
            <div class="col q-mt-sm">
              <div class="row">
                <q-icon
                  v-if="step < 2"
                  name="adjust"
                  color="primary"
                  size="md"
                />
                <q-icon v-if="step == 2" color="primary" size="md">
                  <q-img :src="getImage('step_active.svg')" />
                </q-icon>
                <q-icon
                  class="q-ml-xs"
                  v-if="step > 2"
                  color="primary"
                  size="sm"
                >
                  <q-img :src="getImage('step_done.svg')" />
                </q-icon>
                <div class="q-ml-sm">
                  <div>Step 2</div>
                  <div class="text-grey">Connect With Google Drive</div>
                </div>
              </div>
              <div
                class="q-ml-md"
                style="border-left: 2px solid #ef5926; height: 40px"
              ></div>
            </div>
            <div class="col q-mt-sm">
              <div class="row">
                <q-icon
                  v-if="step < 3"
                  name="adjust"
                  color="primary"
                  size="md"
                />
                <q-icon v-if="step == 3" color="primary" size="md">
                  <q-img :src="getImage('step_active.svg')" />
                </q-icon>
                <q-icon
                  class="q-ml-xs"
                  v-if="step > 3"
                  color="primary"
                  size="sm"
                >
                  <q-img :src="getImage('step_done.svg')" />
                </q-icon>
                <div class="q-ml-sm">
                  <div>Step 3</div>
                  <div class="text-grey">
                    Add PhotoID Account Details (optional)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col q-pa-sm">
        <div v-if="step == 0">
          <div class="justify-center">
            <q-img
              class="col self-center q-mt-xl"
              height="20%"
              width="50%"
              :src="getImage('onBoard-1.svg')"
            />
          </div>
          <div class="text-h5 fontWeight600 text-center q-px-sm q-mt-lg">
            Setup Your Account
          </div>
          <div
            class="text-center fontWeight400 text-subtitle1 q-px-sm q-mt-lg"
            style="color: #667085"
          >
            Congratulations, you have successfully created your account! Next,
            we will collect some pertinent information to complete your account,
            so you can get the most out of our system.
          </div>
          <div class="row justify-center q-mt-lg rounded">
            <q-btn
              class="fontWeight600"
              color="primary"
              name=""
              label="Get Started"
              @click="getStarted"
            />
          </div>
        </div>
        <div v-if="step == 1" class="q-px-md">
          <div class="q-mt-md" style="border-radius: 20px">
            <div class="justify-between">
              <div class="text-h5 fontWeight600">Company Details</div>
              <div
                class="text-subtitle2 fontWeight400 q-mt-sm"
                style="color: #667085"
              >
                Fill out the form below with the information about your company.
              </div>
            </div>
            <div>
              <q-form ref="companyDetailsForm">
                <div class="q-mt-xl">
                  <div class="row text-subtitle1 fontWeight600">
                    Company Name<span class="text-red">*</span>
                  </div>

                  <div class="row">
                    <q-input
                      dense
                      class="full-width"
                      input-class="text-subtitle1"
                      outlined
                      v-model="companyDetails.name"
                      style="background: #e8edf2; height: 40px"
                      disable
                      maxlength="128"
                      :rules="[
                        val => val.length > 0 || 'Please add company name'
                      ]"
                    />
                  </div>
                  <div class="column q-mt-sm full-width">
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
                        maxlength="10"
                        lazy-rules
                        :rules="[
                          val => val.length > 0 || 'Please add contact number',
                          val =>
                            val.length > 9 ||
                            'Mobile number must contain 10 digit'
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
                        :rules="[
                          val => val.length > 0 || 'Please add email address',
                          val =>
                            validateEmail(val) ||
                            'You have entered an invalid email address!'
                        ]"
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
                        :address="companyDetails.address"
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
                      class="fontWeight600"
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
        <div v-if="step == 2" class="q-px-md">
          <div class="text-h5 fontWeight600 text-bold q-mt-lg">
            Connect With Google Drive
          </div>
          <div
            class="q-mt-lg fontWeight400 q-mb-md text-grey"
            style="color: #667085"
          >
            In order to provide full access to ClaimGuru, we need permission to
            connect to your Google account. We synchronize your ClaimGuru files
            with your Google Drive so you will retain full ownership over your
            data.
          </div>
          <div>
            <div class="q-mt-lg">
              <q-btn
                v-if="this.checkConnection == true"
                @click="onRedirectToGoogleAuth()"
                class="row q-py-sm q-px-xl"
                style="
                  width: 440px;
                  border: 2px solid black;
                  border-radius: 10px;
                "
              >
                <q-avatar>
                  <q-img
                    class="col"
                    :src="getImage('logos_google-drive.svg')"
                  />
                </q-avatar>
                <span class="col q-ml-xs text-subtitle1 fontWeight500"
                  >Connect Google Drive</span
                >
              </q-btn>
              <div
                v-else
                class="row justify-center"
                style="
                  width: 350px;
                  height: 45px;
                  border: solid 1px #039855;
                  background-color: #d1fadf;
                  border-radius: 10px;
                "
              >
                <span
                  class="q-pt-sm text-center text-subtitle1 fontWeight500"
                  style="color: #039855"
                  >Connected to Google Drive
                  <span>
                    <q-icon name="task_alt" color="teal" size="sm" /> </span
                ></span>
              </div>
            </div>
          </div>

          <div class="row q-mt-xl items-end justify-between">
            <div class="col-2">
              <q-btn
                color="primary"
                class="fontWeight600"
                outline
                @click="navigatePreviousStepper"
                >Back</q-btn
              >
            </div>
            <div class="col-2">
              <q-btn
                color="primary"
                class="fontWeight600"
                :disable="!checkConnection"
                @click="NextStepperValue"
                >Next</q-btn
              >
            </div>
          </div>
        </div>
        <div v-if="step == 3" class="q-px-md">
          <div class="text-h5 fontWeight600 q-mt-lg">
            PhotoID Account Details
          </div>
          <div class="column q-mt-lg fontWeight400 text-grey">
            <div class="text-justify">
              If you are currently a PhotoID user, please complete your
              information below.
            </div>
            <div class="text-justify">
              If not, please consider signing up by
              <a class="text-orange" href="https://photoidapp.net/"
                >clicking here</a
              >.
            </div>
            <div class="text-justify">
              Our partnership with PhotoID will enhance your user experience.
            </div>
          </div>
          <q-form ref="editPhotoIDForm">
            <div class="q-mt-lg">
              <div class="col q-pr-xl">
                <div class="text-subtitle1 fontWeight600 q-mb-sm">
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
                <div class="text-subtitle1 fontWeight600 q-mt-md q-mb-sm">
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
            <q-btn
              color="primary"
              class="fontWeight600"
              outline
              @click="navigatePreviousStepper"
              >Back</q-btn
            >
            <q-btn
              color="primary"
              class="fontWeight600"
              @click="NextStepperValue"
              >Complete Setup</q-btn
            >
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
          <div class="text-h5 fontWeight600 text-center q-mt-lg">
            Account Setup Successful
          </div>
          <div
            class="text-center fontWeight400 text-subtitle1 q-mt-lg"
            style="color: #667085"
          >
            We're excited for you to experience how ClaimGuru works for you!
          </div>
          <div class="row fontWeight600 justify-center q-mt-lg rounded">
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
import { validateEmail } from '@utils/validation';
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
      editCompanyDetails: true,
      dialCode: '',
      checkConnection: true
    };
  },
  methods: {
    ...mapActions([
      'getOrganization',
      'updateUserForOrganization',
      'toRedirectGoogleAuth1'
    ]),
    isMobile,
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
                  addressCountry: 'USA',
                  address1: this.companyDetails.address.address1,
                  address2: this.companyDetails.address.address2,
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
    ...mapGetters(['organization'])
  },
  async created() {
    this.step = 0;
    await this.getOrganization();
    if (this.organization) {
      this.companyDetails.name = this.organization.name;
      this.companyDetails.address.address1 = this.organization.address.address1;
      this.companyDetails.address.address2 = this.organization.address.address2;
      this.companyDetails.address.addressLocality =
        this.organization.address.addressLocality;
      this.companyDetails.address.addressRegion =
        this.organization.address.addressRegion;
      this.companyDetails.address.postalCode =
        this.organization.address.postalCode;
      this.companyDetails.contactNumber = this.organization.phoneNumber.number;
      this.companyDetails.email = this.organization.email;
      this.companyDetails.photoIdEmail = this.organization.photoIDEmail;
      this.companyDetails.photoIdAPIKey = this.organization.photoIDAPIKey;
      this.step = 2;
      if (this.$route.query.googleConnect == 'true') {
        this.checkConnection = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.poppinsFont {
  font-family: poppins;
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
</style>
