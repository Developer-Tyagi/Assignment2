<template>
  <q-page>
    <div name="accountSummary">
      <q-card
        :class="isMobileResolution ? 'q-pa-md q-mt-20' : 'q-pa-20 q-mt-40'"
        class="summary-card"
      >
        <div class="flex-row justify-between items-center">
          <div class="details-title">Company Details</div>
          <div class="flex-row" v-if="!editCompanyDetails">
            <q-btn
              flat
              no-caps
              class="text-subtitle1 fontWeight600 primary-border flex-row items-center line-height-24"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              color="primary"
              label="Edit"
              @click="onEditClickOrganization"
            />
          </div>
        </div>
        <q-form greedy v-if="editCompanyDetails" ref="companyDetailsForm">
          <div
            class="flex-row full-width q-mt-20"
            :class="isMobileResolution ? 'flex-column' : ''"
          >
            <span>
              <span class="camera-container absolute-position">
                <q-btn
                  :ripple="false"
                  round
                  v-if="organizations && organizations.logo"
                  style="width: 0px"
                >
                  <q-img
                    class="camera-icon"
                    src="../../assets/edit-logo.svg"
                    alt="Camera"
                  />
                  <q-menu>
                    <q-list class="text-subtitle1 line-height-24 q-pa-sm">
                      <q-item
                        clickable
                        v-close-popup
                        @click="initiateLogoUpload()"
                        class="flex-row items-center"
                      >
                        <q-img
                          class="icon-20 q-mr-md"
                          src="../../assets/camera-flat.svg"
                          alt="Camera"
                        />
                        <q-item-section> Upload new logo </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="deleteLogo(organizations.logo)"
                        class="flex-row items-center"
                      >
                        <q-img
                          class="icon-20 q-mr-md"
                          src="../../assets/delete.svg"
                          alt="Camera"
                        />
                        <q-item-section> Remove logo </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>

                <q-img
                  v-else
                  @click="initiateLogoUpload()"
                  class="camera-icon cursor-pointer"
                  src="../../assets/camera.svg"
                  alt="Camera"
                />
              </span>
              <img
                v-if="organizations && organizations.logo"
                class="company-logo"
                :class="isMobileResolution ? 'image-60' : 'image-80'"
                :src="organizations.logo"
                alt="Company logo"
              />
              <img
                v-else
                :class="isMobileResolution ? 'image-60' : 'image-80'"
                :src="getImage('empty-company-logo.svg')"
                alt="Company logo"
              />
            </span>
            <div
              :class="
                isMobileResolution
                  ? 'details-container q-mt-20'
                  : 'company-details q-ml-lg'
              "
            >
              <div class="flex-column full-width">
                <div class="details-heading q-mb-6">Company Name</div>
                <q-input
                  input-class="details-content"
                  outlined
                  v-model.trim="organizations.users.fname"
                  placeholder="Company Name"
                  :maxlength="maxlengthConstants.companyName"
                  lazy-rules
                  :rules="[val => val.length > 0 || 'Please fill company name']"
                />
                <div
                  class="flex-row-wrap"
                  :class="isMobileResolution ? 'flex-column' : ''"
                >
                  <div
                    :class="
                      isMobileResolution ? '' : 'half-width q-pr-12 q-mt-xs'
                    "
                  >
                    <div class="details-heading q-mb-6">Company Contact</div>
                    <q-input
                      input-class="details-content"
                      outlined
                      placeholder="000 000 0000"
                      v-model="organizations.phoneNumber.number"
                      lazy-rules
                      :rules="[
                        val => val.length > 0 || 'Please fill contact number'
                      ]"
                    >
                      <template v-slot:prepend input-class="q-pr-none">
                        <vue-country-code
                          @onSelect="onSelect"
                          enabledCountryCode
                          defaultCountry="us"
                          :onlyCountries="['us']"
                          style="border: none; height: 40px; font-size: 16px"
                        >
                        </vue-country-code>
                      </template>
                    </q-input>
                  </div>
                  <div
                    :class="
                      isMobileResolution ? '' : 'half-width q-pl-12 q-mt-xs'
                    "
                  >
                    <div class="details-heading q-mb-6">Company Email</div>
                    <q-input
                      input-class="details-content"
                      outlined
                      v-model.trim="organizations.companyDetails.contactEmail"
                      placeholder="Company Email"
                      lazy-rules
                      :rules="[
                        val => val.length > 0 || 'Please fill company email',
                        val =>
                          validateEmail(val) ||
                          'Please enter valid email address'
                      ]"
                    />
                  </div>
                </div>
                <div
                  :class="isMobileResolution ? '' : 'q-mt-xs'"
                  class="details-heading q-mb-6"
                >
                  Company Address
                </div>
                <q-input
                  input-class="details-content"
                  outlined
                  v-model.trim="organizations.companyDetails.address.address1"
                  placeholder="Company Address"
                  lazy-rules
                  :rules="[val => val.length > 0 || 'Please fill address']"
                />

                <div
                  class="flex-row-wrap"
                  :class="isMobileResolution ? 'flex-column' : ''"
                >
                  <div
                    :class="
                      isMobileResolution ? '' : 'half-width q-pr-12 q-mt-xs'
                    "
                  >
                    <div class="details-heading q-mb-6">City</div>

                    <q-input
                      input-class="details-content"
                      outlined
                      v-model.trim="
                        organizations.companyDetails.address.addressLocality
                      "
                      placeholder="Enter City Here"
                      lazy-rules
                      :rules="[
                        val => val.length > 0 || 'Please fill city',
                        val => validateText(val) || 'Please enter valid city'
                      ]"
                    />
                  </div>
                  <div
                    :class="
                      isMobileResolution ? '' : 'half-width q-pl-12 q-mt-xs'
                    "
                  >
                    <div class="details-heading q-mb-6">State</div>

                    <q-select
                      dense
                      input-class="details-content"
                      outlined
                      v-model="
                        organizations.companyDetails.address.addressRegion
                      "
                      placeholder="State"
                      :options="states"
                      lazy-rules
                      :rules="[val => !!val || 'Please select the state']"
                    >
                      <template v-slot:selected>
                        <template
                          v-if="
                            organizations.companyDetails.address.addressRegion
                          "
                        >
                          <span class="details-content">
                            {{
                              organizations.companyDetails.address.addressRegion
                            }}
                          </span>
                        </template>
                        <template v-else>
                          <span class="placeholder-color"> Select State </span>
                        </template>
                      </template>
                    </q-select>
                  </div>
                </div>
                <div
                  class="flex-row-wrap"
                  :class="isMobileResolution ? 'flex-column' : ''"
                >
                  <div
                    :class="
                      isMobileResolution ? '' : 'half-width q-pr-12 q-mt-xs'
                    "
                  >
                    <div class="details-heading q-mb-6">Zipcode</div>

                    <q-input
                      input-class="details-content"
                      outlined
                      placeholder="Zipcode"
                      v-model="organizations.companyDetails.address.postalCode"
                      lazy-rules
                      mask="#####"
                      :rules="[val => val.length > 0 || 'Please fill zipcode']"
                    />
                  </div>
                  <div
                    :class="
                      isMobileResolution ? '' : 'half-width q-pl-12 q-mt-xs'
                    "
                  >
                    <div class="details-heading q-mb-6">Country</div>
                    <q-select
                      dense
                      input-class="details-content"
                      outlined
                      v-model="
                        organizations.companyDetails.address.addressCountry
                      "
                      :options="country"
                      behavior="menu"
                      lazy-rules
                      :rules="[val => !!val || 'Please select the country']"
                    >
                      <template v-slot:selected>
                        <template
                          v-if="
                            organizations.companyDetails.address.addressCountry
                          "
                        >
                          <span class="details-content">
                            {{
                              organizations.companyDetails.address
                                .addressCountry
                            }}
                          </span>
                        </template>
                        <template v-else>
                          <span class="placeholder-color">
                            Select Country
                          </span>
                        </template>
                      </template>
                    </q-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex-row items-center q-mt-sm"
            :class="isMobileResolution ? 'justify-between' : 'justify-end'"
          >
            <q-btn
              no-caps
              flat
              class="text-subtitle1 fontWeight600 line-height-24 text-primary primary-border flex-row items-center q-mr-lg"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              label="Cancel"
              @click="cancelCompanyDetailsUpdate"
            />
            <q-btn
              no-caps
              class="text-subtitle1 fontWeight600 line-height-24 text-white bg-primary"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              label="Save"
              @click="saveCompanyDetails"
            />
          </div>
        </q-form>
        <div v-else>
          <div class="flex-row full-width q-pt-lg">
            <img
              v-if="organizations && organizations.logo"
              class="company-logo"
              :class="isMobileResolution ? 'image-60' : 'image-80'"
              :src="organizations.logo"
              alt="Company logo"
            />
            <img
              v-else
              :class="isMobileResolution ? 'image-60' : 'image-80'"
              :src="getImage('empty-company-logo.svg')"
              alt="Company logo"
            />
            <div class="company-details q-ml-lg">
              <div class="flex-column full-width">
                <div class="details-heading">Company Name</div>
                <div class="details-content q-pt-sm">
                  {{ organizations.users.fname }}
                </div>
                <div
                  class="details-heading"
                  :class="isMobileResolution ? 'q-pt-md' : 'q-pt-lg'"
                >
                  Mobile
                </div>
                <div class="details-content q-pt-sm">
                  {{ organizations.phoneNumber.code }}
                  {{ showPhoneNumber(organizations.phoneNumber.number) }}
                </div>
                <div
                  class="details-heading"
                  :class="isMobileResolution ? 'q-pt-md' : 'q-pt-lg'"
                >
                  Email Address
                </div>
                <div class="details-content q-pt-sm ellipsis">
                  {{ organizations.companyDetails.contactEmail }}
                </div>
                <div
                  class="details-heading"
                  :class="isMobileResolution ? 'q-pt-md' : 'q-pt-lg'"
                >
                  Company Address
                </div>
                <div class="details-content q-pt-sm">
                  {{ organizations.companyDetails.address.address1 }},
                  {{ organizations.companyDetails.address.addressLocality }},
                  {{ organizations.companyDetails.address.addressRegion }},
                  {{ organizations.companyDetails.address.addressCountry }}
                  - {{ organizations.companyDetails.address.postalCode }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
      <q-card
        :class="isMobileResolution ? 'q-pa-md q-mt-20' : 'q-pa-20 q-mt-40'"
        class="summary-card"
      >
        <div class="flex-row justify-between items-center">
          <div class="details-title">Account Details</div>
          <div class="flex-row" v-if="!editAccountSummary">
            <q-btn
              flat
              no-caps
              class="text-subtitle1 fontWeight600 primary-border flex-row items-center line-height-24"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              color="primary"
              label="Edit"
              @click="onEditClick"
            />
          </div>
        </div>
        <q-form greedy v-if="editAccountSummary" ref="accountDetailsForm">
          <div
            class="flex-row-wrap"
            :class="isMobileResolution ? 'flex-column' : ''"
          >
            <div
              class="q-mt-20"
              :class="isMobileResolution ? '' : 'half-width q-pr-12'"
            >
              <div class="details-heading q-mb-6">First Name</div>
              <q-input
                input-class="details-content"
                outlined
                v-model.trim="users.fname"
                placeholder="First Name"
                :maxlength="maxlengthConstants.firstName"
                lazy-rules
                :rules="[val => !!val || 'Please fill first name']"
              />
            </div>
            <div
              :class="isMobileResolution ? '' : 'half-width q-pl-12 q-mt-20'"
            >
              <div class="details-heading q-mb-6">Last Name</div>
              <q-input
                input-class="details-content"
                outlined
                v-model.trim="users.lname"
                placeholder="Last Name"
                :maxlength="maxlengthConstants.lastName"
                lazy-rules
                :rules="[val => !!val || 'Please fill last name']"
              />
            </div>
            <div :class="isMobileResolution ? '' : 'full-width q-mt-sm'">
              <div class="details-heading q-mb-6">Email Address</div>
              <q-input
                input-class="details-content"
                outlined
                v-model.trim="users.email"
                placeholder="Email Address"
                lazy-rules
                :rules="[val => validateEmailid(val)]"
              />
              <span class="error-msg">{{ errorMSG }}</span>
            </div>
          </div>
          <div
            class="flex-row items-center q-mt-sm"
            :class="isMobileResolution ? 'justify-between' : 'justify-end'"
          >
            <q-btn
              no-caps
              flat
              class="text-subtitle1 fontWeight600 line-height-24 text-primary primary-border flex-row items-center q-mr-lg"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              label="Cancel"
              @click="cancelAccountDetailsUpdate"
            />
            <q-btn
              no-caps
              class="text-subtitle1 fontWeight600 line-height-24 text-white bg-primary"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              label="Save"
              @click="saveAccountDetails()"
            />
          </div>
        </q-form>
        <div v-else>
          <div class="flex-row-wrap full-width justify-between account-details">
            <div
              class="q-pt-lg"
              :class="
                isMobileResolution
                  ? 'details-container'
                  : 'quarter-container q-px-xs'
              "
            >
              <div class="details-heading">First Name</div>
              <div class="details-content q-pt-sm ellipsis">
                {{ users.fname }}
              </div>
            </div>
            <div
              :class="
                isMobileResolution
                  ? 'details-container q-pt-md'
                  : 'quarter-container q-px-xs q-pt-lg'
              "
            >
              <div class="details-heading">Last Name</div>
              <div class="details-content q-pt-sm ellipsis">
                {{ users.lname }}
              </div>
            </div>
            <div
              :class="
                isMobileResolution
                  ? 'details-container q-pt-md'
                  : 'half-container q-pt-lg'
              "
            >
              <div class="details-heading">Email Address</div>
              <div class="details-content q-pt-sm ellipsis">
                {{ users.email }}
              </div>
            </div>
            <span></span>
          </div>
        </div>
      </q-card>
      <q-card
        :class="isMobileResolution ? 'q-pa-md q-mt-20' : 'q-pa-20 q-mt-40'"
        class="summary-card"
      >
        <div class="flex-row justify-between items-center">
          <div class="details-title">Google Drive</div>
          <span></span>
        </div>
        <div v-if="organizations.isDriveConnected">
          <div class="flex-column details-container q-pt-lg">
            <div class="details-heading">Email</div>
            <div class="details-content q-pt-sm ellipsis">
              {{ organizations.driveEmail }}
            </div>
            <div
              class="flex-row justify-center items-center q-mt-lg google-drive"
            >
              <span class="text-center"
                >Connected to Google Drive
                <span>
                  <q-icon name="task_alt" color="teal" size="17px" /> </span
              ></span>
            </div>
          </div>
        </div>
      </q-card>
      <q-card
        :class="
          isMobileResolution
            ? 'q-pa-md q-mt-20 q-mb-20'
            : 'q-pa-20 q-mt-40 q-mb-40'
        "
        class="summary-card"
      >
        <div class="flex-row justify-between items-center">
          <div class="details-title">
            PhotoID Account
            <span class="text-grey1">(Optional)</span>
          </div>
          <div class="flex-row" v-if="!editPhotoIDDetails">
            <q-btn
              flat
              no-caps
              class="text-subtitle1 fontWeight600 primary-border flex-row items-center line-height-24"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              color="primary"
              label="Edit"
              @click="onEditClickOrganization('PHOTOIDFORM')"
            />
          </div>
        </div>
        <q-form greedy v-if="editPhotoIDDetails" ref="editPhotoIDForm">
          <div
            class="flex-row-wrap"
            :class="isMobileResolution ? 'flex-column' : ''"
          >
            <div
              class="q-mt-20"
              :class="isMobileResolution ? '' : 'half-width q-pr-12'"
            >
              <div class="details-heading q-mb-6">PhotoID Email</div>
              <q-input
                input-class="details-content"
                outlined
                v-model.trim="organizations.photoIDEmail"
                placeholder="PhotoID Email"
                lazy-rules
                :rules="[
                  val => val.length > 0 || 'Please fill photoid email',
                  val =>
                    validateEmail(val) || 'Please enter valid email address'
                ]"
              />
            </div>
            <div
              :class="isMobileResolution ? '' : 'half-width q-pl-12 q-mt-20'"
            >
              <div class="details-heading q-mb-6">PhotoID API Key</div>
              <q-input
                input-class="details-content"
                outlined
                v-model.trim="organizations.photoIDAPIKey"
                placeholder="PhotoID API Key"
                lazy-rules
                :rules="[
                  val => val.length > 0 || 'Please fill photoid api key'
                ]"
              />
            </div>
          </div>
          <div
            class="flex-row items-center q-mt-sm"
            :class="isMobileResolution ? 'justify-between' : 'justify-end'"
          >
            <q-btn
              no-caps
              flat
              class="text-subtitle1 fontWeight600 line-height-24 text-primary primary-border flex-row items-center q-mr-lg"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              label="Cancel"
              @click="cancelPhotoIDUpdate"
            />
            <q-btn
              no-caps
              class="text-subtitle1 fontWeight600 line-height-24 text-white bg-primary"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              label="Save"
              @click="savePhotoIDDetails()"
            />
          </div>
        </q-form>
        <div v-else>
          <div class="flex-row-wrap full-width">
            <div
              class="q-pt-lg"
              :class="
                isMobileResolution ? 'details-container' : 'half-container'
              "
            >
              <div class="details-heading">PhotoID Email</div>
              <div class="details-content q-pt-sm text-primary ellipsis">
                {{ organizations.photoIDEmail }}
              </div>
            </div>
            <div
              :class="
                isMobileResolution
                  ? 'details-container q-pt-md'
                  : 'half-container q-pt-lg'
              "
            >
              <div class="details-heading">PhotoID API Key</div>
              <div class="details-content q-pt-sm text-primary ellipsis">
                {{ organizations.photoIDAPIKey }}
              </div>
            </div>
          </div>
        </div>
      </q-card>
      <q-input
        ref="uploadImageFileInput"
        accept="image/jpg, image/png, image/jpeg"
        style="display: none"
        v-model="fileToUpload"
        type="file"
        @change="uploadLogo()"
      />
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { getCurrentUser } from 'src/utils/auth';
import { toGetStateShortName } from '@utils/common';
import {
  onPhoneNumberClick,
  onEmailClick,
  showPhoneNumber,
  sendPhoneNumber
} from '@utils/clickable';
import { validateEmail, validateUrl, validateText } from '@utils/validation';
import { constants } from '@utils/constant';
import AddressService from '@utils/country';

const addressService = new AddressService();

export default {
  name: 'AccountSummary',

  data() {
    return {
      editAccountSummary: false,
      editCompanyDetails: false,
      editPhotoIDDetails: false,
      userId: '',
      organizations: {
        name: '',
        companyDetails: {
          address: {
            address1: '',
            address2: '',
            addressLocality: '',
            addressRegion: '',
            postalCode: '',
            addressCountry: ''
          },
          contactEmail: ''
        },
        phoneNumber: {
          code: '',
          number: '',
          type: ''
        },
        photoIDAPIKey: '',
        photoIDEmail: '',
        isDriveConnected: false,
        driveEmail: '',
        logo: '',
        users: {
          fname: '',
          lname: '',
          email: '',
          roles: []
        }
      },
      users: {
        fname: '',
        lname: '',
        contact: {
          type: 'main',
          number: ''
        },
        email: '',
        roles: []
      },
      fileToUpload: [],
      errorMSG: '',
      maxlengthConstants: constants.maxLength,
      states: [],
      country: ['United States']
    };
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'organization',
      'allUsers',
      'paidUnpaidUserDetails',
      'isMobileResolution'
    ])
  },
  watch: {
    organization(value) {
      if (this.organizations.logo !== value.logo) {
        if (this.organizations.logo) {
          this.deleteFileFromFirebase({
            url: this.organizations.logo,
            showMsg: false
          });
        }
        this.organizations.logo = value.logo;
      }
    }
  },

  mounted() {
    this.organizations.companyDetails.address.addressCountry = 'United States';
    this.onCountrySelect(
      this.organizations.companyDetails.address.addressCountry
    );
  },

  async created() {
    document.title = 'Account Summary - claimguru';
    this.getAllUsers();

    this.getAllConfigurationTableData({ name: 'phone_types' });
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
    // assign values to this.users
    if (this.user) {
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      this.users.email = this.user.email;
    }
    await this.getOrganization();

    if (this.organization) {
      this.organizations.users.fname = this.organization.name;
      this.organizations.photoIDAPIKey = this.organization.photoIDAPIKey;
      this.organizations.photoIDEmail = this.organization.photoIDEmail;
      this.organizations.isDriveConnected = this.organization.isDriveConnected;
      this.organizations.driveEmail = this.organization.driveEmail;
      this.organizations.logo = this.organization.logo;

      this.organizations.users.email = this.organization.photoIDEmail;
      if (this.organization.address) {
        this.organizations.companyDetails.address.address1 =
          this.organization.address.address1;
        this.organizations.companyDetails.address.addressRegion =
          this.organization.address.addressRegion;
        this.organizations.companyDetails.address.postalCode =
          this.organization.address.postalCode;
        this.organizations.companyDetails.address.addressLocality =
          this.organization.address.addressLocality;
        this.organizations.companyDetails.address.addressCountry =
          this.organization.address.addressCountry;
      }
      if (this.organization.email) {
        this.organizations.companyDetails.contactEmail =
          this.organization.email;
      }
      if (this.organization.phoneNumber) {
        this.organizations.phoneNumber = this.organization.phoneNumber;
      }
    }
  },

  methods: {
    toGetStateShortName,
    onPhoneNumberClick,
    onEmailClick,
    showPhoneNumber,
    sendPhoneNumber,
    toUpperCase(plan) {
      return plan[0].toUpperCase() + plan.slice(1);
    },
    ...mapActions([
      'getAllConfigurationTableData',
      'editUserInfo',
      'editUserProfile',
      'getUserInfo',
      'getAllUsers',
      'getRoles',
      'getPermissions',
      'getOrganization',
      'updateUserForOrganization',
      'updateAccessToken',
      'checkExistingEmail',
      'uploadCompanyLogo',
      'deleteFileFromFirebase',
      'updateCompanyLogo',
      'setNotification',
      'verifyPhotoidAccount'
    ]),
    ...mapMutations(['webMenuSubOptionTab']),
    validateEmail,
    validateUrl,
    validateText,

    async saveCompanyDetails() {
      const success = await this.$refs.companyDetailsForm.validate();
      if (
        success &&
        this.organizations.companyDetails.address.address1.length > 0
      ) {
        const payload = {
          data: {
            name: this.organizations.users.fname,
            address: {
              address1: this.organizations.companyDetails.address.address1,
              addressLocality:
                this.organizations.companyDetails.address.addressLocality,
              addressRegion:
                this.organizations.companyDetails.address.addressRegion,
              addressCountry:
                this.organizations.companyDetails.address.addressCountry,
              postalCode: this.organizations.companyDetails.address.postalCode
            },
            email: this.organizations.companyDetails.contactEmail,
            phoneNumber: {
              code: this.organizations.phoneNumber.code,
              number: this.organizations.phoneNumber.number,
              type: 'pager'
            }
          }
        };
        await this.updateUserForOrganization(payload);
        await this.getOrganization();
        this.editCompanyDetails = false;
      }
    },

    async savePhotoIDDetails() {
      const success = await this.$refs.editPhotoIDForm.validate();
      if (success) {
        const payload = {
          data: {
            name: this.organization.name,
            photoIDEmail: this.organizations.photoIDEmail,
            photoIDAPIKey: this.organizations.photoIDAPIKey
          }
        };
        let accountExists = await this.verifyPhotoidAccount(payload.data);
        if (accountExists) {
          await this.updateUserForOrganization(payload);
          await this.getOrganization();
          this.editPhotoIDDetails = false;
        }
      }
    },

    async saveAccountDetails() {
      const success = await this.$refs.accountDetailsForm.validate();

      if (success) {
        const payload = {
          id: this.userId,
          data: {
            contact: {
              fname: this.users.fname,
              lname: this.users.lname
            },
            email: this.users.email,
            role: this.users.roles
          }
        };
        this.editAccountSummary = false;
        if (this.users.email !== this.user.email) {
          await this.updateAccessToken(this.users.email);
        }
        await this.editUserProfile(payload);
        await this.getUserInfo();
        this.user = getCurrentUser().attributes;
        this.users.fname = this.user.contact.fname;
        this.users.lname = this.user.contact.lname;
        this.users.email = this.user.email;
        this.errorMSG = '';
      }
    },

    onEditClick() {
      this.editAccountSummary = true;
    },
    onEditClickOrganization(val) {
      if (val == 'PHOTOIDFORM') {
        this.editPhotoIDDetails = true;
      } else {
        this.editCompanyDetails = true;
      }
    },
    cancelAccountDetailsUpdate() {
      this.errorMSG = '';
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      this.users.email = this.user.email;
      this.editAccountSummary = false;
    },
    cancelCompanyDetailsUpdate() {
      this.editCompanyDetails = false;
      this.organizations.users.fname = this.organization.name;
      this.organizations.companyDetails.contactEmail = this.organization.email;
      this.organizations.phoneNumber = this.organization.phoneNumber;

      if (this.organization.address) {
        this.organizations.companyDetails.address.address1 =
          this.organization.address.address1;
        this.organizations.companyDetails.address.addressRegion =
          this.organization.address.addressRegion;
        this.organizations.companyDetails.address.addressLocality =
          this.organization.address.addressLocality;
        this.organizations.companyDetails.address.addressCountry =
          this.organization.address.addressCountry;
        this.organizations.companyDetails.address.postalCode =
          this.organization.address.postalCode;
      }
    },
    cancelPhotoIDUpdate() {
      this.editPhotoIDDetails = false;
      this.organizations.photoIDAPIKey = this.organization.photoIDAPIKey;
      this.organizations.photoIDEmail = this.organization.photoIDEmail;
    },
    getImage(icon) {
      return require('../../assets/' + icon);
    },
    initiateLogoUpload() {
      this.$refs.uploadImageFileInput.$el.click();
    },
    async uploadLogo() {
      await this.uploadCompanyLogo({
        file: this.fileToUpload[0],
        companyName: this.organization.name
      });
      this.fileToUpload = [];
    },
    async validateEmailid(val) {
      let email_exist = true;
      if (this.user.email !== this.users.email && val) {
        email_exist = await this.checkExistingEmail(val);
      }
      let email_valid = await this.validateEmail(val);
      let go_exist = false;
      let go_valid = false;
      let go_empty = false;

      if (email_exist) {
        go_exist = true;
      } else {
        go_exist = false;
        this.errorMSG = 'This email is already in use.';
      }
      if (email_valid) {
        go_valid = true;
      } else {
        go_valid = false;
        this.errorMSG = 'Please enter valid email address';
      }
      if (val == '') {
        go_empty = false;
        this.errorMSG = 'Please fill your email address';
      } else {
        go_empty = true;
      }
      if (go_exist && go_valid && go_empty) {
        this.errorMSG = '';
        return true;
      } else {
        return false;
      }
    },
    async deleteLogo(logoUrl) {
      await this.deleteFileFromFirebase({ url: logoUrl, showMsg: true });
      await this.updateCompanyLogo({
        logoURL: '',
        companyName: this.organization.name
      });
      await this.getOrganization();
    },
    onSelect({ name, iso2, dialCode }) {
      this.organizations.phoneNumber.code = '';
      this.organizations.phoneNumber.code = '+' + dialCode;
    },
    async onCountrySelect(country) {
      this.states = await addressService.getStates(country);
    }
  },

  destroyed() {
    document.title = 'claimguru';
  }
};
</script>
<style lang="scss" scoped>
.summary-card {
  box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 20px;
}
.company-details {
  width: calc(100vw - 508px);
}
.details-container {
  width: calc(100vw - 404px);
}
.quarter-container {
  width: calc((100vw - 404px) / 4 - 0px);
}
.half-container {
  width: calc((100vw - 404px) / 2 - 0px);
}
.google-drive {
  height: 44px;
  width: 351px;
  border: solid 1px #039855;
  color: #039855;
  background-color: #d1fadf;
  border-radius: 8px;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
}
.camera-container {
  position: absolute;
  .camera-icon {
    z-index: 1;
    top: 50px;
    left: 50px;
    height: 30px;
    width: 30px;
  }
}
.error-msg {
  position: absolute;
  color: #c10015 !important;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 12px !important;
  margin-left: 8px;
  margin-top: -12px;
}
.company-logo {
  border: 1px solid #000000;
  border-radius: 75px;
}

@media screen and (max-width: 1023px) {
  .details-title {
    font-size: 20px;
    line-height: 24px;
  }
  .company-details {
    width: calc(100vw - 146px);
  }
  .account-details {
    display: flex;
    flex-direction: column;
  }
  .google-drive {
    height: 40px;
    width: calc(100% - 0px);
    max-width: 313px;
  }
  .details-container {
    width: calc(100vw - 62px);
  }
  .camera-container {
    .camera-icon {
      top: 30px;
      left: 30px;
    }
  }
}
</style>
