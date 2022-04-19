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
        <q-form v-if="editCompanyDetails" ref="companyDetailsForm">
          <div
            class="flex-row full-width q-pt-lg"
            :class="isMobileResolution ? 'flex-column' : ''"
          >
            <span>
              <span class="camera-container absolute-position">
                <q-img
                  @click="initiateLogoUpload()"
                  class="camera-icon"
                  src="../../assets/camera.svg"
                  alt="Camera"
                />
              </span>
              <img
                v-if="organizations.logo"
                :class="isMobileResolution ? 'image-60' : 'image-80'"
                :src="organizations.logo"
                alt="Company logo"
              />
              <q-avatar
                v-else
                :class="isMobileResolution ? 'image-60' : 'image-80'"
                icon="person"
                font-size="2.5rem"
                class="text-white bg-grey"
              >
              </q-avatar>
            </span>
            <div
              :class="
                isMobileResolution
                  ? 'details-container q-mt-lg'
                  : 'company-details q-ml-lg'
              "
            >
              <div class="flex-column full-width">
                <div class="details-heading q-mb-6">Company Name</div>
                <q-input
                  input-class="details-content"
                  outlined
                  v-model.trim="organizations.users.fname"
                  placehoder="Company Name"
                  maxlength="128"
                  lazy-rules
                  :rules="[val => val.length > 0 || 'Please add company name']"
                />
              </div>
            </div>
          </div>

          <div
            class="flex-row items-center"
            :class="
              isMobileResolution
                ? 'justify-between q-mt-sm'
                : 'justify-end q-mt-20'
            "
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
              @click="onSaveEditedButtonOrganization"
            />
          </div>

          <div class="q-mt-xl">
            <!-- <div class="row text-subtitle1 text-weight-bold">
              Company Name<span class="text-red">*</span>
            </div>

            <div class="row">
              <q-input
                dense
                class="full-width"
                input-class="text-subtitle1"
                outlined
                v-model="organizations.users.fname"
                :disable="!editCompanyDetails"
                maxlength="128"
                lazy-rules
                :rules="[val => val.length > 0 || 'Please add company name']"
              />
            </div> -->

            <div class="col q-mt-sm q-mr-md full-width">
              <div class="row justify-between">
                <div class="col text-subtitle1 text-weight-bold">
                  Address<span class="text-red">*</span>
                </div>
              </div>
              <div v-if="organizations.companyDetails.address">
                <AutoCompleteAddress
                  :id="'AddVendor1'"
                  :address="organizations.companyDetails.address"
                  :isDropBoxEnable="false"
                  :isChecksEnable="false"
                  :value="true"
                  :view="'custom'"
                  :readOnly="!editCompanyDetails"
                />
              </div>
            </div>
            <div class="col">
              <div class="row"></div>
            </div>

            <div class="row q-mt-sm full-width">
              <div class="col">
                <div class="row text-subtitle1 text-weight-bold">
                  Company website
                </div>
                <q-input
                  dense
                  class="full-width"
                  input-class="text-subtitle1"
                  outlined
                  v-model.trim="organizations.website"
                  :disable="!editCompanyDetails"
                  lazy-rules
                  :rules="[
                    val =>
                      validateUrl(val) || 'You have entered an invalid URL!'
                  ]"
                />
              </div>
            </div>
            <div class="row q-mt-sm full-width">
              <div class="col q-mr-md">
                <div class="row text-subtitle1 text-weight-bold">
                  Contact Name
                </div>
                <q-input
                  dense
                  class="full-width"
                  input-class="text-subtitle1"
                  outlined
                  :disable="!editCompanyDetails"
                />
              </div>
              <div class="col">
                <div class="row text-subtitle1 text-weight-bold">
                  Contact Email
                </div>
                <q-input
                  dense
                  class="full-width"
                  input-class="text-subtitle1"
                  outlined
                  v-model.trim="organizations.companyDetails.contactEmail"
                  :disable="!editCompanyDetails"
                />
              </div>
            </div>

            <!-- <div class="q-mt-lg row justify-end" v-if="editCompanyDetails">
              <q-btn
                class="col-1 q-mr-sm"
                size="md"

                color="white"
                label="Cancel"
                @click="cancelCompanyDetailsUpdate"
              />
              <q-btn
                class="col-1"
                size="md"
                color="primary"
                label="Save"
                @click="onSaveEditedButtonOrganization"
              />
            </div> -->
          </div>
        </q-form>
        <div v-else>
          <div class="flex-row full-width q-pt-lg">
            <img
              v-if="organizations.logo"
              :class="isMobileResolution ? 'image-60' : 'image-80'"
              :src="organizations.logo"
              alt="Company logo"
            />
            <q-avatar
              v-else
              :class="isMobileResolution ? 'image-60' : 'image-80'"
              icon="person"
              font-size="2.5rem"
              class="text-white bg-grey"
            >
            </q-avatar>
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
                  {{ organizations.phoneNumber.number }}
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
                  {{ organizations.companyDetails.address.address2 }},
                  {{ organizations.companyDetails.address.addressLocality }},
                  {{ organizations.companyDetails.address.addressRegion }}
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
        <q-form v-if="editAccountSummary" ref="accountSummaryForm">
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
                placehoder="First Name"
                maxlength="128"
                lazy-rules
                :rules="[val => !!val || 'Please fill your first name']"
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
                placehoder="Last Name"
                maxlength="128"
                lazy-rules
                :rules="[val => !!val || 'Please fill your last name']"
              />
            </div>
            <div :class="isMobileResolution ? '' : 'full-width q-mt-sm'">
              <div class="details-heading q-mb-6">Email Address</div>
              <q-input
                input-class="details-content"
                outlined
                v-model.trim="users.email"
                placehoder="Email Address"
                lazy-rules
                :rules="[val => validateEmailid(val)]"
              />
              <span class="error-msg">{{ errorMSG }}</span>
            </div>
          </div>
          <div
            class="flex-row items-center"
            :class="
              isMobileResolution
                ? 'justify-between q-mt-sm'
                : 'justify-end q-mt-sm'
            "
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
              @click="cancelAccountSummaryUpdate"
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
              @click="onSaveEditedButton()"
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
          <div
            v-if="organizations.isDriveConnected && !editingDriveDetails"
            class="flex-row"
          >
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
              @click="editingDriveDetails = true"
            />
          </div>
        </div>
        <div v-if="organizations.isDriveConnected && !editingDriveDetails">
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
        <div v-else>
          <div
            class="flex-row justify-center items-center q-mt-lg connect-google-drive"
          >
            <q-img
              class="drive-image"
              :src="getImage('logos_google-drive.svg')"
            />
            <span class="text-center"> Connect Google Drive </span>
          </div>
          <div
            v-if="editingDriveDetails"
            class="flex-row items-center q-mt-20"
            :class="isMobileResolution ? 'justify-start' : 'justify-end '"
          >
            <q-btn
              no-caps
              flat
              class="text-subtitle1 fontWeight600 line-height-24 text-primary primary-border flex-row items-center"
              :class="
                isMobileResolution
                  ? 'border-radius-5 height-40 q-px-xs'
                  : 'border-radius-10 height-50 q-px-md'
              "
              label="Cancel"
              @click="editingDriveDetails = false"
            />
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
        <q-form v-if="editPhotoIDDetails" ref="editPhotoIDForm">
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
                placehoder="PhotoID Email"
                lazy-rules
                :rules="[
                  val => val.length > 0 || 'Please add PhotoID Email',
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
                placehoder="PhotoID API Key"
                lazy-rules
                :rules="[val => val.length > 0 || 'Please add PhotoID API Key']"
              />
            </div>
          </div>
          <div
            class="flex-row items-center"
            :class="
              isMobileResolution
                ? 'justify-between q-mt-sm'
                : 'justify-end q-mt-sm'
            "
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
              @click="onSavePhotoIDForm()"
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
        accept=".jpg,.png,.jpeg,image/*"
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
import { validateEmail, validateUrl } from '@utils/validation';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  name: 'AccountSummary',
  components: { AutoCompleteAddress },

  data() {
    return {
      paid: false,
      editAccountSummary: false,
      editCompanyDetails: false,
      editPhotoIDDetails: false,
      editingDriveDetails: false,
      isEditable: false,
      columns: [
        {
          name: 'paidUserName',
          label: 'Paid Users',
          align: 'left',
          field: row => row.paidUserName
        },
        {
          name: 'unPaidUserName',
          label: 'UnPaid Users',
          align: 'left',
          field: row => row.unPaidUserName
        }
      ],
      data: [],
      assignee: '',
      value: {},
      userId: '',
      selectedRole: '',
      organizations: {
        name: '',
        companyDetails: {
          address: {
            address1: '',
            address2: '',
            addressLocality: '',
            addressRegion: '',
            postalCode: ''
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
          roles: [],
          mailingAddress: {
            houseNumber: '',
            addressLocality: '',
            addressRegion: '',
            postOfficeBoxNumber: '',
            postalCode: '',
            address1: '',
            address2: '',
            dropBox: {
              info: '',
              isPresent: false
            }
          }
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
        roles: [],
        mailingAddress: {
          houseNumber: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          address1: '',
          address2: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        }
      },
      fileToUpload: [],
      errorMSG: ''
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
      'checkExistingEmail'
    ]),
    ...mapMutations(['webMenuSubOptionTab']),
    validateEmail,
    validateUrl,

    async onSaveEditedButtonOrganization() {
      const success = await this.$refs.companyDetailsForm.validate();
      if (
        success &&
        this.organizations.companyDetails.address.address1.length > 0
      ) {
        const payload = {
          data: {
            name: this.organizations.users.fname,
            // photoIDAPIKey: this.organizations.photoIDAPIKey,
            // photoIDEmail: this.organizations.photoIDEmail,
            address: {
              addressCountry: 'USA',
              address1: this.organizations.companyDetails.address.address1,
              address2: this.organizations.companyDetails.address.address2,
              addressLocality:
                this.organizations.companyDetails.address.addressLocality,
              addressRegion:
                this.organizations.companyDetails.address.addressRegion,
              postalCode: this.organizations.companyDetails.address.postalCode
            },
            email: this.organizations.companyDetails.email
          }
        };
        await this.updateUserForOrganization(payload);
        await this.getOrganization();
        this.editCompanyDetails = false;
        // this.editPhotoIDDetails = false;
      }
    },

    async onSavePhotoIDForm() {
      const success = await this.$refs.editPhotoIDForm.validate();
      if (success) {
        const payload = {
          data: {
            name: this.organization.name,
            photoIDEmail: this.organizations.photoIDEmail,
            photoIDAPIKey: this.organizations.photoIDAPIKey
          }
        };
        await this.updateUserForOrganization(payload);
        await this.getOrganization();
        this.editPhotoIDDetails = false;
      }
    },

    async onSaveEditedButton() {
      const success = await this.$refs.accountSummaryForm.validate();

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
            // mailingAddress: this.users.mailingAddress,
            // phoneNumber: {
            //   type: this.users.contact.type,
            //   number: sendPhoneNumber(this.users.contact.number)
            // }
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
        // this.users.contact.type = this.user.phoneNumber.type;
        // this.users.contact.number = showPhoneNumber(
        //   this.user.phoneNumber.number
        // );

        // this.users.mailingAddress = this.user.mailingAddress;
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
    cancelAccountSummaryUpdate() {
      this.errorMSG = '';
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      this.users.email = this.user.email;
      // if (this.user.phoneNumber) {
      //   this.users.contact.type = this.user.phoneNumber.type;
      //   this.users.contact.number = this.user.phoneNumber.number;
      // }

      // if (this.user.mailingAddress) {
      //   this.users.mailingAddress.addressRegion =
      //     this.user.mailingAddress.addressRegion;
      //   this.users.mailingAddress.addressLocality =
      //     this.user.mailingAddress.addressLocality;
      //   this.users.mailingAddress.houseNumber =
      //     this.user.mailingAddress.houseNumber;
      //   this.users.mailingAddress.address1 = this.user.mailingAddress.address1;
      //   this.users.mailingAddress.address2 = this.user.mailingAddress.address2;
      //   this.users.mailingAddress.postalCode =
      //     this.user.mailingAddress.postalCode;
      // }

      this.editAccountSummary = false;
    },
    cancelCompanyDetailsUpdate() {
      this.editCompanyDetails = false;
      this.organizations.users.fname = this.organization.name;
      // this.organizations.users.lname = this.organization.photoIDAPIKey;

      // this.organizations.users.contact.number = this.organization.website;
      //this.organizations.users.email = this.organization.photoIDEmail;
      if (this.organization.billingInfo) {
        this.organizations.users.mailingAddress.addressRegion =
          this.organization.billingInfo.address.addressRegion;
        this.organizations.users.mailingAddress.addressLocality =
          this.organization.billingInfo.address.addressLocality;
        this.organizations.users.mailingAddress.houseNumber =
          this.organization.billingInfo.address.houseNumber;
        this.organizations.users.mailingAddress.address1 =
          this.organization.billingInfo.address.address1;
        this.organizations.users.mailingAddress.address2 =
          this.organization.billingInfo.address.address2;
        this.organizations.users.mailingAddress.postalCode =
          this.organization.billingInfo.address.postalCode;
      }
    },
    cancelPhotoIDUpdate() {
      this.editPhotoIDDetails = false;
      this.organizations.photoIDAPIKey = this.organization.photoIDAPIKey;
      this.organizations.photoIDEmail = this.organization.photoIDEmail;
    },
    copyUserAddress() {
      this.organizations.users.mailingAddress = this.user.mailingAddress;
    },
    getImage(icon) {
      return require('../../assets/' + icon);
    },
    initiateLogoUpload() {
      this.$refs.uploadImageFileInput.$el.click();
    },
    uploadLogo() {
      // TODO
      // Add file this.fileToUpload[0]
      // console.log(this.fileToUpload[0])
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

  async created() {
    document.title = 'Account Summary - claimguru';
    this.getAllUsers();

    this.paidUnpaidUserDetails;

    this.getAllConfigurationTableData({ name: 'phone_types' });
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      this.userId = getCurrentUser().id;
    }
    // assign values to this.users
    if (this.user) {
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      // if (this.user.phoneNumber) {
      //   this.users.contact.type = this.user.phoneNumber.type;
      //   this.users.contact.number = this.user.phoneNumber.number;
      // }
      // if (this.user.mailingAddress) {
      //   this.users.mailingAddress.addressRegion =
      //     this.user.mailingAddress.addressRegion;
      //   this.users.mailingAddress.addressLocality =
      //     this.user.mailingAddress.addressLocality;
      //   this.users.mailingAddress.houseNumber =
      //     this.user.mailingAddress.houseNumber;
      //   this.users.mailingAddress.address1 = this.user.mailingAddress.address1;
      //   this.users.mailingAddress.address2 = this.user.mailingAddress.address2;
      //   this.users.mailingAddress.postalCode =
      //     this.user.mailingAddress.postalCode;
      // }
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

      // this.organizations.users.contact.number = this.organization.website;
      this.organizations.users.email = this.organization.photoIDEmail;
      if (this.organization.address) {
        this.organizations.companyDetails.address.address1 =
          this.organization.address.address1;
        this.organizations.companyDetails.address.address2 =
          this.organization.address.address2;
        this.organizations.companyDetails.address.addressRegion =
          this.organization.address.addressRegion;
        this.organizations.companyDetails.address.postalCode =
          this.organization.address.postalCode;
        this.organizations.companyDetails.address.addressLocality =
          this.organization.address.addressLocality;
      }
      if (this.organization.email) {
        this.organizations.companyDetails.contactEmail =
          this.organization.email;
      }
      if (this.organization.phoneNumber) {
        this.organizations.phoneNumber = this.organization.phoneNumber;
        this.organizations.phoneNumber.number = showPhoneNumber(
          this.organization.phoneNumber.number
        );
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
.drive-image {
  height: 24px;
  width: 27px;
  margin-right: 10px;
}
.connect-google-drive {
  height: 44px;
  width: 331px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #0c0c0c;
  border: 1px solid #0c0c0c;
  box-sizing: border-box;
  border-radius: 8px;
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
  .connect-google-drive {
    height: 40px;
    width: calc(100% - 0px);
    max-width: 331px;
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
