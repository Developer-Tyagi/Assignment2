<template>
  <div
    class="flex-row full-width q-mt-20"
    :class="isMobileResolution ? 'flex-column' : ''"
  >
    <span>
      <span class="camera-container absolute-position">
        <q-btn
          :ripple="false"
          round
          v-if="organization && organization.logo"
          style="width: 0px"
        >
          <q-img
            class="camera-icon"
            src="../assets/edit-logo.svg"
            alt="Camera"
          />
          <q-menu :offset="menuPosition" content-class="logo-menu">
            <q-list class="text-subtitle1 line-height-24 q-pa-sm">
              <q-item
                clickable
                v-ripple
                v-close-popup
                @click="initiateLogoUpload()"
                class="flex-row items-center"
              >
                <q-img
                  class="icon-20 q-mr-md"
                  src="../assets/camera-flat.svg"
                  alt="Camera"
                />
                <q-item-section> Upload new logo </q-item-section>
              </q-item>
              <q-separator class="q-mx-md" />
              <q-item
                clickable
                v-ripple
                v-close-popup
                @click="deleteLogo(organization.logo)"
                class="flex-row items-center"
              >
                <q-img
                  class="icon-20 q-mr-md"
                  src="../assets/delete.svg"
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
          src="../assets/camera.svg"
          alt="Camera"
        />
      </span>
      <q-skeleton
        v-if="
          companyLogoUploadPercentage > 0 && companyLogoUploadPercentage <= 100
        "
        type="circle"
        :class="isMobileResolution ? 'image-60' : 'image-80'"
      />
      <span v-else>
        <img
          v-if="organization && organization.logo"
          class="company-logo"
          :class="isMobileResolution ? 'image-60' : 'image-80'"
          :src="organization.logo"
          alt="Company logo"
        />
        <img
          v-else
          :class="isMobileResolution ? 'image-60' : 'image-80'"
          :src="getImage('empty-company-logo.svg')"
          alt="Company logo"
        />
      </span>
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
          v-model.trim="companyDetailsObj.name"
          placeholder="Company Name"
          :maxlength="maxlengthConstants.companyName"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please fill company name'
          ]"
        />
        <div
          class="flex-row-wrap"
          :class="isMobileResolution ? 'flex-column' : ''"
        >
          <div :class="isMobileResolution ? '' : 'half-width q-pr-12 q-mt-xs'">
            <div class="details-heading q-mb-6">Company Contact</div>
            <q-input
              input-class="details-content"
              outlined
              placeholder="000 000 0000"
              v-model.trim="companyDetailsObj.phoneNumber.number"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill contact number'
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
          <div :class="isMobileResolution ? '' : 'half-width q-pl-12 q-mt-xs'">
            <div class="details-heading q-mb-6">Company Email</div>
            <q-input
              input-class="details-content"
              outlined
              v-model.trim="companyDetailsObj.email"
              placeholder="Company Email"
              lazy-rules
              :rules="[
                val =>
                  (companyDetailsObj.email ? validateEmail(val) : true) ||
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
          v-model.trim="companyDetailsObj.address.address1"
          placeholder="Company Address"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please fill address']"
        />

        <div
          class="flex-row-wrap"
          :class="isMobileResolution ? 'flex-column' : ''"
        >
          <div :class="isMobileResolution ? '' : 'half-width q-pr-12 q-mt-xs'">
            <div class="details-heading q-mb-6">City</div>

            <q-input
              input-class="details-content"
              outlined
              v-model.trim="companyDetailsObj.address.addressLocality"
              placeholder="Enter City Here"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill city',
                val => validateText(val) || 'Please enter valid city'
              ]"
            />
          </div>
          <div :class="isMobileResolution ? '' : 'half-width q-pl-12 q-mt-xs'">
            <div class="details-heading q-mb-6">State</div>

            <q-select
              dense
              input-class="details-content"
              outlined
              v-model="companyDetailsObj.address.addressRegion"
              placeholder="State"
              :options="states"
              lazy-rules
              :rules="[val => !!val || 'Please select the state']"
            >
              <template v-slot:selected>
                <template v-if="companyDetailsObj.address.addressRegion">
                  <span class="details-content">
                    {{ companyDetailsObj.address.addressRegion }}
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
          <div :class="isMobileResolution ? '' : 'half-width q-pr-12 q-mt-xs'">
            <div class="details-heading q-mb-6">Zipcode</div>

            <q-input
              input-class="details-content"
              outlined
              placeholder="Zipcode"
              v-model="companyDetailsObj.address.postalCode"
              lazy-rules
              mask="#####"
              :rules="[val => (val && val.length > 0) || 'Please fill zipcode']"
            />
          </div>
          <div :class="isMobileResolution ? '' : 'half-width q-pl-12 q-mt-xs'">
            <div class="details-heading q-mb-6">Country</div>
            <q-select
              dense
              input-class="details-content"
              outlined
              v-model="companyDetailsObj.address.addressCountry"
              :options="country"
              behavior="menu"
              lazy-rules
              :rules="[val => !!val || 'Please select the country']"
            >
              <template v-slot:selected>
                <template v-if="companyDetailsObj.address.addressCountry">
                  <span class="details-content">
                    {{ companyDetailsObj.address.addressCountry }}
                  </span>
                </template>
                <template v-else>
                  <span class="placeholder-color"> Select Country </span>
                </template>
              </template>
            </q-select>
          </div>
        </div>
      </div>
    </div>
    <q-input
      ref="uploadImageFileInput"
      accept="image/jpg, image/png, image/jpeg"
      style="display: none"
      v-model="fileToUpload"
      type="file"
      @change="uploadLogo()"
    />
  </div>
</template>

<script>
import { constants } from '@utils/constant';
import { validateEmail, validateText } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import AddressService from '@utils/country';

const addressService = new AddressService();

export default {
  name: 'CompanyDetails',
  data() {
    return {
      maxlengthConstants: constants.maxLength,
      fileToUpload: [],
      menuPosition: [-60, 50],
      states: [],
      country: ['United States']
    };
  },
  props: {
    companyDetails: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'organization',
      'isMobileResolution',
      'companyLogoUploadPercentage'
    ]),
    companyDetailsObj: {
      get() {
        return this.companyDetails;
      },
      set(value) {
        this.$emit('update:companyDetails', value);
      }
    }
  },
  watch: {
    isMobileResolution(value) {
      if (value) {
        this.menuPosition = [-40, 30];
      } else {
        this.menuPosition = [-60, 50];
      }
    }
  },
  mounted() {
    this.companyDetailsObj.address.addressCountry = 'United States';
    this.onCountrySelect(this.companyDetailsObj.address.addressCountry);
  },
  methods: {
    validateEmail,
    validateText,
    ...mapActions([
      'getOrganization',
      'uploadCompanyLogo',
      'deleteFileFromFirebase',
      'updateCompanyLogo',
      'setNotification'
    ]),

    getImage(icon) {
      return require('../assets/' + icon);
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
    async deleteLogo(logoUrl) {
      await this.deleteFileFromFirebase({ url: logoUrl, showMsg: true });
      await this.updateCompanyLogo({
        logoURL: '',
        companyName: this.companyDetailsObj.name
      });
      await this.getOrganization();
    },
    onSelect({ name, iso2, dialCode }) {
      this.companyDetailsObj.phoneNumber.code = '';
      this.companyDetailsObj.phoneNumber.code = '+' + dialCode;
    },
    async onCountrySelect(country) {
      this.states = await addressService.getStates(country);
    }
  }
};
</script>
<style lang="scss" scoped>
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

@media screen and (max-width: 1023px) {
  .camera-container {
    .camera-icon {
      top: 30px;
      left: 30px;
    }
  }
}
</style>
