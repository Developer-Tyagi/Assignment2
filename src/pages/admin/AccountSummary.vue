<template>
  <q-page>
    <div name="accountSummary">
      <q-card
        class="q-pa-xl"
        style="
          border-radius: 20px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        "
      >
        <div class="row justify-between">
          <div class="text-h5 text-weight-bold">Account Summary</div>
          <div>
            <a
              @click="onEditClick"
              class="text-primary cursor-pointer text-subtitle1 text-weight-bold q-mr-xs"
            >
              Edit
              <i class="text-primary fas fa-edit"></i>
            </a>
          </div>
        </div>
        <q-form ref="accountSummaryForm">
          <div class="q-mt-xl">
            <!-- Name -->
            <div class="row">
              <div class="col q-mr-md">
                <div class="row text-subtitle1 text-weight-bold">
                  First Name<span class="text-red">*</span>
                </div>
                <!-- {{users}} -->
                <div class="row">
                  <q-input
                    dense
                    class="full-width"
                    input-class="text-subtitle1"
                    outlined
                    v-model="users.fname"
                    :disable="!editAccountSummary"
                    lazy-rules
                    maxlength="128"
                    :rules="[
                      val => val.length > 0 || 'Please add first name',
                      val => validateText(val) || 'Please enter valid name'
                    ]"
                  />
                </div>
              </div>
              <div class="col">
                <div class="row text-subtitle1 text-weight-bold">
                  Last Name<span class="text-red">*</span>
                </div>
                <div class="row">
                  <q-input
                    dense
                    class="full-width"
                    input-class="text-subtitle1"
                    outlined
                    v-model="users.lname"
                    :disable="!editAccountSummary"
                    lazy-rules
                    maxlength="128"
                    :rules="[
                      val => val.length > 0 || 'Please add last name',
                      val => validateText(val) || 'Please enter valid last name'
                    ]"
                  />
                </div>
              </div>
            </div>
            <!-- address -->
            <div class="q-mt-sm full-width">
              <div class="col">
                <div class="row text-subtitle1 text-weight-bold">
                  Address<span class="text-red">*</span>
                </div>

                <div>
                  <AutoCompleteAddress
                    :id="'AddVendor'"
                    :address="users.mailingAddress"
                    :isDropBoxEnable="false"
                    :isChecksEnable="false"
                    :value="true"
                    :view="'custom'"
                    :readOnly="!editAccountSummary"
                  />
                </div>
              </div>
            </div>
            <div class="row q-mt-sm full-width">
              <div class="col q-mr-md">
                <div class="text-subtitle1 text-weight-bold">
                  Mobile<span class="text-red">*</span>
                </div>
                <div class="col clickable text-primary">
                  <q-input
                    dense
                    class="full-width"
                    input-class="text-subtitle1"
                    outlined
                    v-model="users.contact.number"
                    :disable="!editAccountSummary"
                    lazy-rules
                    mask="(###) ### - ####"
                    unmasked-value
                    :rules="[
                      val => val.length > 0 || 'Please add contact number',
                      val =>
                        val.length > 9 || 'Mobile number must contain 10 digit'
                    ]"
                  />
                </div>
              </div>
              <div class="col">
                <div class="text-bold">
                  <div class="row text-subtitle1 text-weight-bold">
                    Email Address<span class="text-red">*</span>
                  </div>
                </div>
                <!-- @click="onEmailClick(user.email, $event)" -->
                <div class="row">
                  <div class="col clickable text-primary">
                    <q-input
                      dense
                      class="full-width"
                      input-class="text-subtitle1"
                      outlined
                      v-model="users.email"
                      :rules="[
                        val => val.length > 0 || 'Please add email address',
                        val =>
                          validateEmail(val) ||
                          'You have entered an invalid email address!'
                      ]"
                      :disable="!editAccountSummary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-mt-lg row justify-end" v-if="editAccountSummary">
            <q-btn
              class="col-1 q-mr-sm"
              size="md"
              text-color="black"
              color="white"
              label="Cancel"
              @click="cancelAccountSummaryUpdate"
            />
            <q-btn
              class="col-1"
              size="md"
              color="primary"
              label="Save"
              @click="onSaveEditedButton"
            />
          </div>
        </q-form>
      </q-card>
      <q-card
        class="q-pa-xl q-mt-xl"
        style="
          border-radius: 20px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        "
      >
        <div class="row justify-between">
          <div class="text-h5 text-weight-bold">Company Details</div>
          <div>
            <a
              @click="onEditClickOrganization"
              class="text-primary cursor-pointer text-subtitle1 text-weight-bold q-mr-xs"
            >
              Edit
              <i class="text-primary fas fa-edit"></i>
            </a>
          </div>
        </div>
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
                v-model="organizations.users.fname"
                :disable="!editCompanyDetails"
                maxlength="128"
                :rules="[val => val.length > 0 || 'Please add company name']"
              />
            </div>

            <div class="col q-mt-sm q-mr-md full-width">
              <div class="row justify-between">
                <div class="col text-subtitle1 text-weight-bold">
                  Address<span class="text-red">*</span>
                </div>
                <div
                  v-if="editCompanyDetails"
                  class="col row items-center justify-end"
                >
                  <a
                    @click="copyUserAddress"
                    class="text-primary text-subtitle cursor-pointer"
                    >Copy from above
                  </a>
                  <q-icon color="primary" name="content_copy" />
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
                  v-model="organizations.website"
                  :disable="!editCompanyDetails"
                  :rules="[
                    val =>
                      validateUrl(val) || 'You have entered an invalid URL!'
                  ]"
                />
              </div>
            </div>
            <div class="row q-mt-sm full-width">
              <div class="col q-mr-md">
                <!-- company adminstrator changed to contact name -->
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
                <!-- company adminstrator changed to contact name -->
                <div class="row text-subtitle1 text-weight-bold">
                  Contact Email
                </div>
                <q-input
                  dense
                  class="full-width"
                  input-class="text-subtitle1"
                  outlined
                  v-model="organizations.companyDetails.contactEmail"
                  :disable="!editCompanyDetails"
                />
              </div>
            </div>
            <div class="q-mt-lg row justify-end" v-if="editCompanyDetails">
              <q-btn
                class="col-1 q-mr-sm"
                size="md"
                text-color="black"
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
            </div>
          </div>
        </q-form>
      </q-card>
      <q-card
        class="q-pa-xl q-mt-xl"
        style="
          border-radius: 20px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        "
      >
        <div class="row justify-between">
          <div class="text-h5 text-weight-bold">
            <img
              class="vertical-middle"
              height="30px;"
              width="30px;"
              src="~assets/photo_ID_app.png"
            />
            ID Account Information (<a
              class="text-primary"
              href="https://photoidapp.net/"
              target="_blank"
              >signup</a
            >)
          </div>
          <div>
            <a
              @click="onEditClickOrganization('PHOTOIDFORM')"
              class="text-primary cursor-pointer text-subtitle1 text-weight-bold q-mr-xs"
              >Edit
              <i class="text-primary fas fa-edit"></i>
            </a>
          </div>
        </div>
        <q-form ref="editPhotoIDForm">
          <div class="row q-mt-lg full-width">
            <div class="col q-mr-md">
              <div class="row text-subtitle1 text-weight-bold">
                Account Email
              </div>
              <q-input
                dense
                class="full-width"
                input-class="text-subtitle1"
                outlined
                v-model="organizations.photoIDEmail"
                :disable="!editPhotoIDDetails"
              />
            </div>
            <div class="col">
              <div class="row text-subtitle1 text-weight-bold">
                Account Api Key
              </div>
              <q-input
                dense
                class="full-width"
                input-class="text-subtitle1"
                outlined
                v-model="organizations.photoIDAPIKey"
                :disable="!editPhotoIDDetails"
              />
            </div>
          </div>
          <div v-if="this.editPhotoIDDetails" class="q-mt-lg row justify-end">
            <q-btn
              class="col-1 q-mr-sm"
              size="md"
              label="Cancel"
              text-color="black"
              color="white"
              @click="cancelPhotoIDUpdate"
            />
            <q-btn
              class="col-1"
              size="md"
              color="primary"
              label="Save"
              @click="onSaveEditedButtonOrganization"
            />
          </div>
        </q-form>
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
import { validateEmail, validateText, validateUrl } from '@utils/validation';
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
        photoIDAPIKey: '',
        photoIDEmail: '',
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
      }
    };
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'organization',
      'allUsers',
      'paidUnpaidUserDetails'
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
      'updateAccessToken'
    ]),
    ...mapMutations(['webMenuSubOptionTab']),
    validateEmail,
    validateText,
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
            photoIDAPIKey: this.organizations.photoIDAPIKey,
            photoIDEmail: this.organizations.photoIDEmail,
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
        this.editPhotoIDDetails = false;
      }
    },

    async onSaveEditedButton() {
      const success = await this.$refs.accountSummaryForm.validate();

      if (success && this.users.mailingAddress.address1.length > 0) {
        const payload = {
          id: this.userId,
          data: {
            contact: {
              fname: this.users.fname,
              lname: this.users.lname
            },
            email: this.users.email,
            role: this.users.roles,
            mailingAddress: this.users.mailingAddress,
            phoneNumber: {
              type: this.users.contact.type,
              number: sendPhoneNumber(this.users.contact.number)
            }
          }
        };
        this.editAccountSummary = false;
        await this.updateAccessToken(this.users.email);
        await this.editUserProfile(payload);
        await this.getUserInfo();
        this.user = getCurrentUser().attributes;
        this.users.fname = this.user.contact.fname;
        this.users.lname = this.user.contact.lname;
        this.users.contact.type = this.user.phoneNumber.type;
        this.users.contact.number = showPhoneNumber(
          this.user.phoneNumber.number
        );
        this.users.email = this.user.email;
        this.users.mailingAddress = this.user.mailingAddress;
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
      this.users.fname = this.user.contact.fname;
      this.users.lname = this.user.contact.lname;
      if (this.user.phoneNumber) {
        this.users.contact.type = this.user.phoneNumber.type;
        this.users.contact.number = this.user.phoneNumber.number;
      }

      this.users.email = this.user.email;
      if (this.user.mailingAddress) {
        this.users.mailingAddress.addressRegion =
          this.user.mailingAddress.addressRegion;
        this.users.mailingAddress.addressLocality =
          this.user.mailingAddress.addressLocality;
        this.users.mailingAddress.houseNumber =
          this.user.mailingAddress.houseNumber;
        this.users.mailingAddress.address1 = this.user.mailingAddress.address1;
        this.users.mailingAddress.address2 = this.user.mailingAddress.address2;
        this.users.mailingAddress.postalCode =
          this.user.mailingAddress.postalCode;
      }

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
      this.organizations.users.lname = this.organization.photoIDAPIKey;
      this.organizations.users.email = this.organization.photoIDEmail;
    },
    copyUserAddress() {
      this.organizations.users.mailingAddress = this.user.mailingAddress;
    }
  },

  async created() {
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
      if (this.user.phoneNumber) {
        this.users.contact.type = this.user.phoneNumber.type;
        this.users.contact.number = this.user.phoneNumber.number;
      }
      if (this.user.mailingAddress) {
        this.users.mailingAddress.addressRegion =
          this.user.mailingAddress.addressRegion;
        this.users.mailingAddress.addressLocality =
          this.user.mailingAddress.addressLocality;
        this.users.mailingAddress.houseNumber =
          this.user.mailingAddress.houseNumber;
        this.users.mailingAddress.address1 = this.user.mailingAddress.address1;
        this.users.mailingAddress.address2 = this.user.mailingAddress.address2;
        this.users.mailingAddress.postalCode =
          this.user.mailingAddress.postalCode;
      }
      this.users.email = this.user.email;
    }
    await this.getOrganization();

    if (this.organization) {
      this.organizations.users.fname = this.organization.name;
      this.organizations.photoIDAPIKey = this.organization.photoIDAPIKey;
      this.organizations.photoIDEmail = this.organization.photoIDEmail;

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
    }
  }
};
</script>
