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
          <CompanyDetails :companyDetails.sync="companyDetails" />

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
              flat
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
              v-if="organization && organization.logo"
              class="company-logo"
              :class="isMobileResolution ? 'image-60' : 'image-80'"
              :src="organization.logo"
              alt="Company logo"
            />
            <img
              v-else-if="organization && organization.logo == ''"
              :class="isMobileResolution ? 'image-60' : 'image-80'"
              :src="getImage('empty-company-logo.svg')"
              alt="Company logo"
            />
            <q-skeleton
              v-else
              type="circle"
              :class="isMobileResolution ? 'image-60' : 'image-80'"
            />

            <div class="company-details q-ml-lg">
              <div class="flex-column full-width">
                <div class="details-heading">Company Name</div>
                <div class="details-content q-pt-sm ellipsis-3-lines">
                  {{ companyDetails.name }}
                </div>
                <div
                  class="details-heading"
                  :class="isMobileResolution ? 'q-pt-md' : 'q-pt-lg'"
                >
                  Mobile
                </div>
                <div class="details-content q-pt-sm">
                  {{ companyDetails.phoneNumber.code }}
                  {{ showPhoneNumber(companyDetails.phoneNumber.number) }}
                </div>
                <div
                  class="details-heading"
                  :class="isMobileResolution ? 'q-pt-md' : 'q-pt-lg'"
                >
                  Email Address
                </div>
                <div class="details-content q-pt-sm ellipsis">
                  {{ companyDetails.email }}
                </div>
                <div
                  class="details-heading"
                  :class="isMobileResolution ? 'q-pt-md' : 'q-pt-lg'"
                >
                  Company Address
                </div>
                <div class="details-content q-pt-sm ellipsis-3-lines">
                  {{ companyDetails.address.address1 }},
                  {{ companyDetails.address.addressLocality }},
                  {{ companyDetails.address.addressRegion }},
                  {{ companyDetails.address.addressCountry }}
                  - {{ companyDetails.address.postalCode }}
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
              flat
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
        <div class="q-pt-lg">
          <ConnectGoogleDrive />
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
                  val => (val && val.length > 0) || 'Please fill photoid email',
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
                  val =>
                    (val && val.length > 0) || 'Please fill photoid api key'
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
              flat
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
import CompanyDetails from 'components/CompanyDetails';
import ConnectGoogleDrive from 'components/ConnectGoogleDrive';

// import AddressService from '@utils/country';

// const addressService = new AddressService();

export default {
  name: 'AccountSummary',
  components: { CompanyDetails, ConnectGoogleDrive },
  data() {
    return {
      editAccountSummary: false,
      editCompanyDetails: false,
      editPhotoIDDetails: false,
      userId: '',
      organizations: {
        name: '',
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
      country: ['United States'],
      // menuPosition: [-60, 50]
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
      }
    };
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'organization',
      'allUsers',
      'paidUnpaidUserDetails',
      'isMobileResolution'
      // 'companyLogoUploadPercentage'
    ])
  },
  watch: {
    organization(value) {
      if (this.organizations.logo !== value.logo) {
        this.organizations.logo = value.logo;
      }
    }
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
      this.companyDetails.name = this.organization.name;
      this.organizations.photoIDAPIKey = this.organization.photoIDAPIKey;
      this.organizations.photoIDEmail = this.organization.photoIDEmail;
      this.organizations.isDriveConnected = this.organization.isDriveConnected;
      this.organizations.driveEmail = this.organization.driveEmail;
      this.organizations.logo = this.organization.logo;

      // this.organizations.users.email = this.organization.photoIDEmail;

      if (this.organization.address) {
        this.companyDetails.address = this.organization.address;
      }
      if (this.organization.email) {
        this.companyDetails.email = this.organization.email;
      }
      if (this.organization.phoneNumber) {
        this.companyDetails.phoneNumber = this.organization.phoneNumber;
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
      if (success && this.companyDetails.address.address1.length > 0) {
        const payload = {
          data: this.companyDetails
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
      this.companyDetails.name = this.organization.name;
      this.companyDetails.email = this.organization.email;
      this.companyDetails.phoneNumber = this.organization.phoneNumber;

      if (this.organization.address) {
        this.companyDetails.address = this.organization.address;
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
      if (
        this.fileToUpload[0].type.includes('png') ||
        this.fileToUpload[0].type.includes('jpg') ||
        this.fileToUpload[0].type.includes('jpeg')
      ) {
        await this.uploadCompanyLogo({
          file: this.fileToUpload[0],
          companyName: this.organization.name
        });
      } else {
        this.setNotification({
          type: 'negative',
          message: 'Only .png, .jpg and .jpeg file types are allowed'
        });
      }

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
.quarter-conta iner {
  width: calc((100vw - 428px) / 4 - 0px);
}
.half-container {
  width: calc((100vw - 428px) / 2 - 0px);
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

@media screen and (max-width: 1023px) {
  .account-details {
    display: flex;
    flex-direction: column;
  }
}
</style>
