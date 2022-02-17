<template>
  <q-page class="column poppinsFont">
    <div class="col row" v-if="!isMobile()">
      <div class="col-6 bgNewPrimary">
        <div class="q-pl-lg q-py-md">
          <q-img
            class="web-menu-claim-guru-logo"
            :src="getImage('Logo.svg')"
            width="20%"
          />
        </div>
        <div class="q-mt-md text-h5 text-center q-px-lg fontWeight600">
          <div class="q-px-lg" style="font-size: 28px; background: #f9e7d8">
            The First and Only Catastrophe-Proof Claim Management System For
            Public Adjusters
          </div>
        </div>
        <div class="q-pt-lg">
          <div class="text-h6 fontWeight600 q-px-xl">
            <span
              v-if="
                isPackageSelected.id1 === '' && isPackageSelected.id2 === ''
              "
              >Pick Your Package</span
            >
            <span v-if="isPackageSelected.id1 === true"
              >Firm Package Selected</span
            >
            <span v-if="isPackageSelected.id2 === true"
              >Individual Package Selected</span
            >
          </div>
        </div>
        <div class="row justify-between q-mt-md test">
          <!-- card 1 -->
          <div
            class="card-border col q-mr-lg bg-white"
            @click="onPackageSelection('Firm')"
            :class="{ 'card-highlighter': isPackageSelected.id1 }"
          >
            <div
              v-if="isPackageSelected.id1"
              class="text-center fontWeight500 text-subtitle1"
              style="
                border-bottom: 1px solid #ef5926 !important;
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                background-color: #f9dfc8;
              "
            >
              Selected Package
            </div>
            <div class="q-px-lg">
              <div class="row justify-center q-py-md">
                <q-img :src="getImage('Featured icon (1).svg')" width="20%" />
              </div>

              <div class="text-h6 fontWeight500 text-center">Firm Package</div>
              <div class="text-h6 fontWeight500 text-center">
                $250
                <span class="text-grey fontWeight400 text-subtitle2"
                  >/month</span
                >
              </div>
              <div
                class="text-subtitle1 text-center fontWeight600 q-my-sm"
                style="color: #ef5926"
              >
                Start your 30 day free trial
              </div>
              <div
                class="q-ml-lg row text-subtitle1 fontWeight400 col-md-4 col-xs-12 col-sm-12"
                v-for="firmPackage in firmPackages"
                :key="firmPackage"
              >
                <q-img
                  class="q-mt-xs"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="8%"
                />
                <span class="q-ml-sm"> {{ firmPackage }} </span>
              </div>

              <div class="q-pt-md text-blue-grey fontWeight400 text-subtitle1">
                Additional licenses at $50/month
              </div>

              <div
                class="q-mt-lg q-mb-sm fontWeight400 text-blue-grey text-caption"
              >
                * Vendor roles are limited
              </div>
            </div>
          </div>
          <!-- card 2 -->
          <div
            class="card-border col column bg-white"
            @click="onPackageSelection('Individual')"
            :class="{ 'card-highlighter': isPackageSelected.id2 }"
          >
            <div
              v-if="isPackageSelected.id2"
              class="text-center fontWeight600 text-subtitle1"
              style="
                border-bottom: 1px solid #ef5926 !important;
                color: #ef5926;
                border-radius: 10px 10px 0 0;
                background-color: #f9dfc8;
              "
            >
              Selected Package
            </div>
            <div class="q-px-lg">
              <div class="row justify-center q-py-md">
                <q-img :src="getImage('Featured icon (2).svg')" width="20%" />
              </div>
              <div class="text-h6 fontWeight500 text-center">
                Individual Package
              </div>
              <div class="text-h6 fontWeight500 text-center">
                $125
                <span class="text-grey fontWeight400 text-subtitle2"
                  >/month</span
                >
              </div>
              <div
                class="text-subtitle1 fontWeight600 q-my-sm"
                style="font-family: Poppins; color: #ef5926"
              >
                Start your 30 day free trial
              </div>
              <div
                class="row text-subtitle1 fontWeight400"
                v-for="individualPackage in individualPackages"
                :key="individualPackage"
              >
                <q-img
                  class="q-mt-xs"
                  :src="getImage('check.svg')"
                  width="8%"
                  height="40%"
                />
                <span class="q-ml-sm"> {{ individualPackage }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="q-mt-sm q-pt-md q-px-xl">
          <div class="card-border bg-white q-mx-sm">
            <div class="row q-px-xl q-pt-md">
              <div class="col-1">
                <q-img :src="getImage('Featured icon.svg')" width="90%" />
              </div>
              <div class="col-7 text-h6 fontWeight500 text-left q-pt-sm">
                Enterprise Subscription
              </div>
              <div
                class="col text-subtitle1 fontWeight500 col-3 q-pt-sm text-right"
              >
                <a class="text-deep-orange" href="">Contact us</a>
              </div>
            </div>
            <div class="col-auto row q-px-xl q-my-lg">
              <div class="col-1 text-center">
                <q-img :src="getImage('check.svg')" width="40%" />
              </div>
              <div class="col">
                <span class="q-ml-xs text-subtitle1 fontWeight400"
                  >Custom setup for large firms with more than 8 paid roles
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="q-mx-lg q-mt-xl">
          <span class=""> © ClaimGuru 2022</span>
        </div>
      </div>
      <div class="col-6">
        <!-- signup form -->
        <div
          v-if="continueClick === false"
          class="q-pt-xl q-px-lg content-center bg-white"
        >
          <div class="q-pt-xl">
            <div class="col q-px-xl q-mx-xl">
              <q-linear-progress
                size="10px"
                :value="progress"
                style="border-radius: 10px"
              />
              <div class="q-mt-sm text-subtitle1 fontWeight600 text-grey">
                Step 1. Create an account
              </div>

              <div class="q-mt-lg text-h4 fontWeight500">Subscribe Now</div>
              <q-form class="q-mt-lg" @submit="onContinue()" ref="orgInfo">
                <label class="text-subtitle1 text-weight-bolder"
                  >First Name</label
                >
                <q-input
                  name="firstName"
                  v-model="data.user.contact.fname"
                  color="primary"
                  placeholder="Enter your First Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your first name'
                  ]"
                />

                <label class="text-subtitle1 text-weight-bolder"
                  >Last Name</label
                >
                <q-input
                  v-model="data.user.contact.lname"
                  name="lastName"
                  color="primary"
                  placeholder="Enter your Last Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your last name'
                  ]"
                />

                <label class="text-subtitle1 text-weight-bolder"
                  >Email Address</label
                >
                <q-input
                  v-model="data.user.email"
                  name="email"
                  color="primary"
                  placeholder="Enter Email Address"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val => validateEmail(val) || 'Please fill your email',
                    val =>
                      checkEmailExist(val) || 'This email is already in use'
                  ]"
                />
                <span class="text-red text-caption">{{ errorMSG }}</span>
                <br v-if="errorMSG" />
                <label class="text-subtitle1 text-weight-bolder"
                  >Password</label
                >
                <q-input
                  color="primary"
                  class="required full-width"
                  placeholder="Enter your Password"
                  v-model="data.user.password"
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val => (val && val.length > 0) || 'Please fill password',
                    val =>
                      (val && val.length > 7) ||
                      'Minimum password length is 8 character'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <label class="text-subtitle1 text-weight-bolder"
                  >Company Name</label
                >
                <q-input
                  v-model="data.company.name"
                  name="businessName"
                  color="primary"
                  placeholder="Enter your Company Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your company name'
                  ]"
                />
                <div class="q-mt-sm row justify-start text-caption">
                  <q-checkbox v-model="terms" lazy />
                  <label class="q-mt-sm">I agree to Claimguru's</label>
                  <a class="q-mt-sm q-ml-sm text-deep-orange" href=""
                    >Terms of use</a
                  >
                  <label class="q-mt-sm q-ml-sm q-mr-sm"> and</label>
                  <a class="q-mt-sm text-deep-orange" href="">Privacy Policy</a>
                </div>

                <div class="row justify-center q-mt-lg">
                  <q-btn
                    label="Continue"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="md"
                    class="full-width"
                    :disable="!terms"
                  />
                </div>
                <div class="row justify-center q-mt-md">
                  <div class="col-2"></div>
                  <div class="col-8 q-ml-md">
                    <label class="text-subtitle1"
                      >Already have an account?
                    </label>
                    <a href="/login" class="text-deep-orange text-subtitle1"
                      >Login</a
                    >
                  </div>
                  <div class="col-2"></div>
                </div>
              </q-form>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
        <div v-else class="q-pt-xl q-px-xl content-center bg-white">
          <div class="q-pt-xl q-mx-xl">
            <div class="q-mx-xl">
              <q-linear-progress size="10px" :value="progress1" />
              <div class="q-mt-sm text-subtitle1 text-bold text-grey">
                Step 2. Payment
              </div>
              <q-form class="q-mt-xl" @submit="onPaymentClick()" ref="orgInfo">
                <div>{{ displayErrors }}</div>
                <div class="text-h4 text-weight-bolder">Pay with card for</div>
                <div
                  v-if="isPackageSelected.id1 === true"
                  class="text-h4 text-weight-bolder"
                >
                  Firm Package
                </div>
                <div v-else class="text-h4 text-weight-bolder">
                  Individual Package
                </div>
                <div class="q-mt-lg"></div>
                <label class="text-subtitle1 text-weight-bold"
                  >Card Number</label
                >
                <div
                  id="card-number"
                  class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>

                <label class="text-subtitle1 text-weight-bold"
                  >Name on Card</label
                >
                <q-input
                  borderless
                  class="bg-white cardInfo text-body1 q-mt-xs q-mb-lg"
                  :class="
                    cardName == '' ? 'input-placeholder' : 'input-text-style'
                  "
                  ref="cardName"
                  name="name"
                  v-model="cardName"
                  maxlength="50"
                  id="card-name"
                  autocomplete="cc-name"
                  placeholder="Enter Name on Card"
                />

                <div class="row">
                  <div class="col q-pr-md">
                    <label class="text-subtitle1 text-weight-bold"
                      >Expiry Date</label
                    >
                    <div
                      id="card-expiry"
                      class="cardInfo text-body1 border-bottom-right q-mt-xs"
                    >
                      <!-- a Stripe Element will be inserted. -->
                    </div>
                  </div>
                  <div class="col q-pl-xs">
                    <label class="text-subtitle1 text-weight-bold">CVC</label>
                    <div
                      id="card-cvc"
                      class="cardInfo text-body1 border-bottom-right q-mt-xs"
                    >
                      <!-- a Stripe Element will be inserted. -->
                    </div>
                  </div>
                </div>

                <div class="q-mt-xl"></div>
                <div class="row">
                  <label class="column text-h5 text-weight-bolder"
                    >30 days free</label
                  >
                </div>
                <div class="row q-mt-sm">
                  <div class="col-6">
                    <label class="text-h6 text-weight-bold"
                      >After 30 days</label
                    >
                  </div>
                  <div class="col-6 q-mt-xs text-right">
                    <div
                      v-if="isPackageSelected.id1 === true"
                      class="text-subtitle1 text-grey-white"
                    >
                      $250/month *
                    </div>
                    <div v-else class="text-subtitle1 text-grey-white">
                      $125/month *
                    </div>
                  </div>
                </div>
                <div class="q-mt-md"></div>
                <div class="row justify-center">
                  <q-btn
                    label="Subscribe"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="22px"
                    class="full-width"
                  />
                </div>
                <div class="q-mt-md"></div>
                <div>
                  By clicking the ‘Subscribe’ button, you allow ClaimGuru to
                  charge your card for this payment, and you agree to
                  ClaimGuru’s
                  <a href="" class="text-deep-orange">Terms of Use</a> and
                  <a href="" class="text-deep-orange">Privacy Policy.</a>
                </div>
              </q-form>
              <div class="row justify-center q-my-md">
                <q-img :src="getImage('secure.svg')" width="20%" />
              </div>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-px-lg" v-if="isMobile()">
      <div class="row">
        <div
          class="col-6 q-pt-md q-pb-md"
          :style="$q.screen.gt.sm ? 'background: #f9e7d8' : 'background:#fff'"
        >
          <div>
            <q-img
              class="web-menu-claim-guru-logo"
              :src="getImage('Logo.svg')"
              width="80%"
            />
          </div>
        </div>
      </div>
      <div v-if="continueClick === false" class="row">
        <q-linear-progress
          size="5px"
          :value="progress"
          style="border-radius: 10px"
        />
        <div class="q-mt-sm text-subtitle1 text-bold text-grey">
          Step 1. Create an account
        </div>
      </div>
      <div v-else class="row">
        <q-linear-progress
          size="5px"
          :value="progress1"
          style="border-radius: 10px"
        />
        <div class="q-mt-sm text-subtitle1 text-bold text-grey">
          Step 2. Payment
        </div>
      </div>
      <div class="row" style="">
        <div
          class="col-md-6 col-sm-12 col-xs-12 q-pt-md"
          :style="$q.screen.gt.sm ? 'background: #f9e7d8' : 'background:#fff'"
        >
          <div class="row text-h6 text-bold text-center q-mt-md">
            <div class="col-md-10 offset-md-1" style="font-size: 28px">
              The First and Only Catastrophe-Proof Claim Management System For
              Public Adjusters
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="text-h6 text-bold col-md-10 offset-md-1">
              <span
                v-if="
                  isPackageSelected.id1 === '' && isPackageSelected.id2 === ''
                "
                >Pick Your Package</span
              >
              <span v-if="isPackageSelected.id1 === true"
                >Firm Package Selected</span
              >
              <span v-if="isPackageSelected.id2 === true"
                >Individual Package Selected</span
              >
            </div>
          </div>
          <!-- cards section -->
          <div class="q-mt-md">
            <div class="">
              <div
                class="card-border col-md-4 col-sm-12 col-xs-12 bg-white"
                @click="onPackageSelection('Firm')"
                :class="{ 'card-highlighter': isPackageSelected.id1 }"
              >
                <div
                  v-if="isPackageSelected.id1"
                  class="text-center q-py-sm text-bold text-subtitle1"
                  style="
                    border-bottom: 1px solid #ef5926 !important;
                    color: #ef5926;
                    border-radius: 10px 10px 0 0;
                    background-color: #f9dfc8;
                  "
                >
                  Selected Package
                </div>
                <div class="q-px-lg">
                  <div class="row justify-center q-py-md">
                    <div class="row justify-center">
                      <q-icon class="" size="5em">
                        <q-img :src="getImage('Featured icon (1).svg')" />
                      </q-icon>
                    </div>
                  </div>

                  <div class="text-h6 text-bold text-center">Firm Package</div>
                  <div class="text-h6 text-bold text-center">
                    $250 <span class="text-grey text-subtitle2">/month</span>
                  </div>
                  <div
                    class="text-h6 text-bold q-my-sm text-center"
                    style="font-family: Poppins; color: #ef5926"
                  >
                    Start your 30 day free trial
                  </div>
                  <div class="column items-center">
                    <div
                      class="q-my-sm cardItems"
                      v-for="firmPackage in firmPackages"
                      :key="firmPackage"
                    >
                      <div class="row justify-start">
                        <q-icon size="sm">
                          <q-img :src="getImage('check.svg')" />
                        </q-icon>
                        <span class="text-center q-ml-sm">
                          {{ firmPackage }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div
                    class="q-pt-md q-pl-md text-blue-grey text-subtitle1 text-center"
                  >
                    Additional licenses at $50/month
                  </div>

                  <div
                    class="q-mt-lg q-mb-lg q-ml-lg text-blue-grey text-caption text-start"
                  >
                    * Vendor roles are limited
                  </div>
                </div>
              </div>
            </div>
            <div class="q-mt-md">
              <div
                class="full-height card-border bg-white"
                @click="onPackageSelection('Individual')"
                :class="{ 'card-highlighter': isPackageSelected.id2 }"
              >
                <div
                  v-if="isPackageSelected.id2"
                  class="text-center q-py-sm text-bold text-subtitle1"
                  style="
                    border-bottom: 1px solid #ef5926 !important;
                    color: #ef5926;
                    border-radius: 10px 10px 0 0;
                    background-color: #f9dfc8;
                  "
                >
                  Selected Package
                </div>
                <div class="q-px-lg q-pb-lg">
                  <div class="row justify-center q-py-md">
                    <div class="row justify-center">
                      <q-icon class="" size="5em">
                        <q-img :src="getImage('Featured icon (2).svg')" />
                      </q-icon>
                    </div>
                  </div>
                  <div class="text-h6 text-bold text-center">
                    Individual Package
                  </div>
                  <div class="text-h6 text-bold text-center">
                    $125 <span class="text-grey text-subtitle2">/month</span>
                  </div>
                  <div
                    class="text-h6 text-bold q-my-sm text-center"
                    style="font-family: Poppins; color: #ef5926"
                  >
                    Start your 30 day free trial
                  </div>
                  <div
                    class="q-px-xl q-my-md text-center"
                    v-for="individualPackage in individualPackages"
                    :key="individualPackage"
                  >
                    <q-icon class="" size="sm">
                      <q-img class="" :src="getImage('check.svg')" />
                    </q-icon>
                    <span class="q-ml-sm"> {{ individualPackage }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-pt-md">
            <div class="card-border bg-white">
              <div class="q-px-md q-mt-lg">
                <div class="row justify-center">
                  <!-- <q-img :src="getImage('Featured icon.svg')" width="15%" /> -->
                  <q-icon class="" size="5em">
                    <q-img :src="getImage('Featured icon.svg')" />
                  </q-icon>
                </div>

                <div class="text-h6 text-bold text-center q-pt-sm">
                  Enterprise Subscription
                </div>
                <div class="text-h6 col-3 q-pt-sm text-center">
                  <a class="text-deep-orange" href="">Contact us</a>
                </div>
              </div>

              <div class="q-px-xl q-my-md text-center">
                <q-icon class="col self-center" size="sm">
                  <q-img class="col-3" :src="getImage('check.svg')" />
                </q-icon>

                <span class="col q-ml-md text-subtitle1"
                  >Custom setup for large firms with more than 8 paid roles
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- signup form -->
        <div
          v-if="continueClick === false"
          class="col-md-6 col-sm-12 col-xs-12 q-pt-md bg-white bg-white"
        >
          <div class="column full-height">
            <div class="col">
              <div class="q-mt-lg text-h4 text-weight-bolder">
                Subscribe Now
              </div>
              <q-form class="q-my-lg" @submit="onContinue()" ref="orgInfo">
                <label class="text-subtitle1 text-weight-bolder"
                  >First Name</label
                >
                <q-input
                  name="firstName"
                  v-model="data.user.contact.fname"
                  color="primary"
                  placeholder="Enter your First Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your first name'
                  ]"
                />

                <label class="text-subtitle1 text-weight-bolder"
                  >Last Name</label
                >
                <q-input
                  v-model="data.user.contact.lname"
                  name="lastName"
                  color="primary"
                  placeholder="Enter your Last Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your last name'
                  ]"
                />

                <label class="text-subtitle1 text-weight-bolder"
                  >Email Address</label
                >
                <q-input
                  v-model="data.user.email"
                  name="email"
                  color="primary"
                  placeholder="Enter Email Address"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val => validateEmail(val) || 'Please fill your email',
                    val =>
                      checkEmailExist(val) || 'This email is already in use'
                  ]"
                />
                <span class="text-red text-caption">{{ errorMSG }}</span>
                <br v-if="errorMSG" />

                <label class="text-subtitle1 text-weight-bolder q-mt-xs"
                  >Password</label
                >
                <q-input
                  color="primary"
                  class="required full-width"
                  placeholder="Enter your Password"
                  v-model="data.user.password"
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val => (val && val.length > 0) || 'Please fill password',
                    val =>
                      (val && val.length > 7) ||
                      'Minimum password length is 8 character'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <label class="text-subtitle1 text-weight-bolder"
                  >Company Name</label
                >
                <q-input
                  v-model="data.company.name"
                  name="businessName"
                  color="primary"
                  placeholder="Enter your Company Name"
                  outlined
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill your company name'
                  ]"
                />
                <div class="q-mt-sm row justify-start">
                  <q-checkbox v-model="terms" lazy />
                  <label class="q-mt-sm">I agree to Claimguru's</label>
                  <a class="q-mt-sm q-ml-sm text-deep-orange" href=""
                    >Terms of use</a
                  >
                  <label class="q-mt-sm q-ml-sm q-mr-sm"> and</label>
                  <a class="q-mt-sm text-deep-orange" href="">Privacy Policy</a>
                </div>

                <div class="row justify-center q-mt-lg">
                  <q-btn
                    label="Continue"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="md"
                    class="full-width"
                    :disable="!terms"
                  />
                </div>
                <div class="row justify-center q-mt-md">
                  <div class="text-subtitle1 text-center q-mb-xl">
                    Already have an account?
                    <a href="/login" class="text-deep-orange"> Login</a>
                  </div>
                </div>
              </q-form>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
        <div
          v-else
          class="col-md-6 col-sm-12 col-xs-12 bg-white q-pt-lg content-center bg-white"
        >
          <div class="row">
            <div>
              <q-form class="q-mt-lg" @submit="onPaymentClick()" ref="orgInfo">
                <div>{{ displayErrors }}</div>
                <div class="text-h4 text-weight-bolder">Pay with card for</div>
                <div
                  v-if="isPackageSelected.id1 === true"
                  class="text-h4 text-weight-bolder"
                >
                  Firm Package
                </div>
                <div v-else class="text-h4 text-weight-bolder">
                  Individual Package
                </div>
                <div class="q-mt-lg"></div>
                <label class="text-subtitle1 text-weight-bold"
                  >Card Number</label
                >
                <div
                  id="card-number"
                  class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>

                <label class="text-subtitle1 text-weight-bold"
                  >Name on Card</label
                >
                <q-input
                  borderless
                  class="bg-white cardInfo text-body1 q-mt-xs q-mb-lg"
                  :class="
                    cardName == '' ? 'input-placeholder' : 'input-text-style'
                  "
                  ref="cardName"
                  name="name"
                  v-model="cardName"
                  maxlength="50"
                  id="card-name"
                  autocomplete="cc-name"
                  placeholder="Enter Name on Card"
                />

                <div class="row">
                  <div class="col q-pr-md">
                    <label class="text-subtitle1 text-weight-bold"
                      >Expiry Date</label
                    >
                    <div
                      id="card-expiry"
                      class="cardInfo text-body1 border-bottom-right q-mt-xs"
                    >
                      <!-- a Stripe Element will be inserted. -->
                    </div>
                  </div>
                  <div class="col q-pl-xs">
                    <label class="text-subtitle1 text-weight-bold">CVC</label>
                    <div
                      id="card-cvc"
                      class="cardInfo text-body1 border-bottom-right q-mt-xs"
                    >
                      <!-- a Stripe Element will be inserted. -->
                    </div>
                  </div>
                </div>

                <div class="q-mt-xl"></div>
                <div class="row">
                  <label class="column text-h5 text-weight-bolder"
                    >30 days free</label
                  >
                </div>
                <div class="row q-mt-sm">
                  <div class="col-6">
                    <label class="text-h6 text-weight-bold"
                      >After 30 days</label
                    >
                  </div>
                  <div class="col-6 q-mt-xs text-right">
                    <div
                      v-if="isPackageSelected.id1 === true"
                      class="text-subtitle1 text-grey-white"
                    >
                      $250/month *
                    </div>
                    <div v-else class="text-subtitle1 text-grey-white">
                      $125/month *
                    </div>
                  </div>
                </div>
                <div class="q-mt-md"></div>
                <div class="row justify-center">
                  <q-btn
                    label="Subscribe"
                    no-caps
                    type="submit"
                    color="deep-orange"
                    size="md"
                    class="full-width"
                  />
                </div>
                <div class="q-mt-md"></div>
                <div>
                  By clicking the ‘Subscribe’ button, you allow ClaimGuru to
                  charge your card for this payment, and you agree to
                  ClaimGuru’s
                  <a href="" class="text-deep-orange">Terms of Use</a> and
                  <a href="" class="text-deep-orange">Privacy Policy.</a>
                </div>
              </q-form>
              <div class="row justify-center q-my-lg">
                <q-img :src="getImage('secure.svg')" width="40%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center q-my-md">
        <q-separator class="q-mt-md q-mb-md" />
        <span> © ClaimGuru 2022</span>
      </div>
    </div>
  </q-page>
</template>
<script>
const stripe = Stripe(`${process.env.STRIPE_API_KEY}`);
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { constants } from '@utils/constant';
import { validateEmail } from '@utils/validation';
import { isMobile } from '@utils/common';
import { getToken, getCurrentUser } from '@utils/auth';

export default {
  data() {
    return {
      isPwd: true,
      errorMSG: '',
      data: {
        type: constants.ORGANIZATION,
        company: {
          name: '',
          plan: {}
        },
        user: {
          email: '',
          password: '',
          contact: {
            fname: '',
            lname: ''
          }
        },
        stripeToken: '',
        isTermsAccepted: false
      },
      firmPackages: [
        '3 Claims Manager',
        '1 Office Manager',
        '3 Office Staff',
        'Unlimited Vendors *'
      ],
      individualPackages: ['1 Claims Manager', '1 Office Manager'],
      progress: 0.5,
      progress1: 1,
      terms: false,
      continueClick: false,
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      isPackageSelected: {
        id1: '',
        id2: ''
      },
      displayErrors: ''
    };
  },
  methods: {
    ...mapActions([
      'getAllPlans',
      'createUserForOrganization',
      'checkExistingEmail'
    ]),

    isMobile,
    ...mapMutations(['setLoading', 'setNotifications']),
    getImage(icon) {
      return require('../assets/' + icon);
    },

    async checkEmailExist(val) {
      let res = await this.checkExistingEmail(val);
      if (res) {
        this.errorMSG = '';
      } else {
        this.errorMSG =
          'This email is already in use. Please choose another or login from your mobile';
      }
      return res;
    },
    validateEmail,
    async onContinue() {
      if (
        !(
          this.isPackageSelected.id1 === true ||
          this.isPackageSelected.id2 === true
        )
      ) {
        this.$q.notify({
          message: 'Please select a package to continue',
          position: 'center'
        });
      } else {
        this.continueClick = true;
        this.data.isTermsAccepted = true;
        let interval = setTimeout(() => {
          this.setPaymentPage();
          clearTimeout(interval);
        }, 0);
      }
    },
    onPackageSelection(id) {
      if (id === 'Firm') {
        this.isPackageSelected.id1 = true;
        this.isPackageSelected.id2 = false;
        this.data.company.plan = {
          value: 'Firm Package',
          machineValue: 'firm_package',
          stripePriceID: 'price_1KRbkoEK8DUf1aFSK6zeWcfk',
          stripeProductID: 'prod_L7rTDXkekxbZsk',
          trialPeriodDays: 30
        };
      } else {
        this.isPackageSelected.id1 = false;
        this.isPackageSelected.id2 = true;
        this.data.company.plan = {
          value: 'Individual Package',
          machineValue: 'individual_package',
          stripePriceID: 'price_1KRblCEK8DUf1aFSJIkhcVoG',
          stripeProductID: 'prod_L7rU5fIcFUNOPr',
          trialPeriodDays: 30
        };
      }
    },
    setPaymentPage() {
      const elements = stripe.elements();
      const style = {
        base: {
          iconColor: '#0057d2',
          color: '#525151',
          fontWeight: 500,
          fontSize: '16px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#aaaaaa'
          }
        },
        complete: {
          color: '#525151'
        },
        invalid: {
          color: 'red',
          iconColor: 'red'
        }
      };
      this.cardNumber = elements.create('cardNumber', {
        style: style,
        showIcon: true
      });
      this.cardNumber.mount('#card-number');

      this.cardExpiry = elements.create('cardExpiry', {
        style: style
      });

      this.cardExpiry.mount('#card-expiry');

      this.cardCvc = elements.create('cardCvc', {
        style: style
      });
      this.cardCvc.mount('#card-cvc');

      const displayErrors = document.getElementById('card-errors', {
        style: style
      });

      this.contentClass = '';
    },
    onPaymentClick() {
      this.checkCardValidity();
    },
    async checkCardValidity() {
      this.setLoading(true);
      var token = '';
      var displayError;
      await this.createToken().then(function (result) {
        if (result.error) {
          displayError = document.getElementById('card-errors');
          if (result.error) {
            displayError.textContent = result.error.message;
          } else {
            displayError.textContent = '';
          }
        } else {
          // Send the token to your server
          token = result.token.id;
        }
      });
      if (displayError !== undefined) {
        this.setLoading(false);
        return;
      }
      this.data.stripeToken = token;
      const res = await this.createUserForOrganization(this.data);
      if (res) {
        this.$router.push('/setup');
      }
      //this.setLoading(false);
    },
    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName };
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData);
    }
  },

  computed: {
    ...mapGetters(['plans', 'contactTypes', 'planInfo'])
  },

  async created() {
    if (getToken() && getCurrentUser()) {
      if (isMobile()) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/admin');
      }
    }
    await this.getAllPlans();
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
.test {
  @media only screen and (max-width: 1500px) {
    padding-left: 48px;
    padding-right: 48px;
  }
  @media only screen and (min-width: 1500px) {
    padding-left: 80px;
    padding-right: 80px;
  }
}
.my-card {
  border-radius: 10px;
  @media only screen and (max-width: $breakpoint-md-max) {
    max-width: 450px;
    box-sizing: border-box;
    max-height: 530px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 350px;
    box-sizing: border-box;
    max-height: 530px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 300px;
    box-sizing: border-box;
    max-height: 530px;
  }
}
.card-highlighter {
  border-radius: 10px;
  border: 1px solid #ef5926 !important;
}
.cardItems {
  width: 30%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 60%;
  }
}
.card-border {
  border-radius: 10px;
  border: 1px solid #b9bcc6;
}

#card-errors {
  color: red;
  margin-top: 10px;
  max-width: 431px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 900px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 431px;
  }
}

::v-deep {
  .input-placeholder {
    .q-placeholder {
      color: grey !important;
    }
  }
  .input-text-style {
    .q-field__native {
      color: #525151 !important;
    }
  }
  .cardInfo {
    padding: 12.5px 14px;
    border: 1px solid;
    border-radius: 8px;
    height: 50px;
    .q-field__native {
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
    }
    .q-field__control,
    .q-field__marginal {
      height: 26px;
    }
    .q-field--auto-height,
    .q-field__native {
      min-height: 0px;
    }
  }
}
</style>
