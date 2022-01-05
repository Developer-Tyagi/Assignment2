<template>
  <div v-if="!view">
    <div
      v-if="!isFieldsDisable"
      :class="{
        'no-visibility': isFieldsDisable,
        visibility: !isFieldsDisable
      }"
    >
      <input
        type="text"
        :id="'id' + id"
        class="input-style input-overlay input-autocomplete"
        style="margin-left: -1%"
        :v-model="'model' + id"
        placeholder="AutoComplete address"
        :disabled="isFieldsDisable"
        :disable="isOfflineClientEdit"
      />
    </div>
    <div class="row justify-between">
      <q-input
        borderless
        dense
        :class="{ required: isAsteriskMark }"
        class="input-style input-overlay col-3"
        v-model="address.houseNumber"
        label="House/Flat No"
        lazy-rules
        :rules="[
          val => checkValidations(val) || 'Please fill the house or flat no'
        ]"
        :disable="isOfflineClientEdit"
      />
      <q-input
        dense
        borderless
        :class="{ required: isAsteriskMark }"
        class="input-style input-overlay col-8"
        v-model="address.address1"
        label="Address 1"
        lazy-rules
        :rules="[val => checkValidations(val) || 'Please fill the  Address 1']"
        :disable="isOfflineClientEdit"
      />
    </div>
    <!--this should be done once address-2 field is added in backend api-->
    <q-input
      dense
      borderless
      class="input-style input-overlay"
      style="height: 60px"
      v-model="address.address2"
      label="Address 2"
      :disable="isOfflineClientEdit"
    />
    <q-input
      dense
      borderless
      :class="{ required: isAsteriskMark }"
      class="input-style input-overlay"
      v-model="address.addressLocality"
      label="City"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the city']"
      :disable="isOfflineClientEdit"
    />

    <q-select
      dense
      borderless
      :class="{ required: isAsteriskMark }"
      v-model="address.addressRegion"
      :options="states"
      class="input-style input-overlay"
      label="State"
      behavior="menu"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the state']"
      :disable="isOfflineClientEdit"
    />
    <q-input
      borderless
      dense
      :class="{ required: isAsteriskMark }"
      class="input-style input-overlay"
      v-model="address.postalCode"
      label="ZIP Code"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the zip code']"
      :disable="isOfflineClientEdit"
    />
    <div class="row" v-if="isDropBoxEnable">
      <p class="q-mx-none q-my-auto">Gate / Dropbox</p>
      <q-toggle
        class="q-ml-auto"
        v-model="address.dropBox.isPresent"
        @input="onToggleButtonOff"
        :disable="isOfflineClientEdit"
      />
    </div>
    <q-input
      dense
      borderless
      v-if="address.dropBox.isPresent && isDropBoxEnable"
      v-model="address.dropBox.info"
      class="input-style input-overlay required"
      label="Gate/ Dropbox"
      :rules="[val => checkValidations(val) || 'Please fill the dropbox info']"
    />
  </div>
  <div class="" v-else-if="view == 'custom'">
    <div
      :class="{
        'no-visibility': isFieldsDisable,
        visibility: !isFieldsDisable
      }"
    >
      <input
        required
        type="text"
        borderless
        :id="'id' + id"
        class="full-width input-autocomplete"
        v-model="address.address1"
        v-bind:disabled="this.readOnly"
        style="border: 1px solid #d3d3d3; border-radius: 4px; height: 40px"
        @keydown="validateAddress(address.address1)"
        @blur="validateAddress(address.address1)"
      />
      <span class="q-pl-sm" style="color: #c10015 !important; font-size: 11px">
        {{ errorMSG }}
      </span>
      <q-input
        type="text"
        outlined
        class="q-mt-sm"
        dense
        :disable="this.readOnly"
        style="border-radius: 4px; height: 46px"
        v-model="address.address2"
      />
    </div>
    <div class="row q-mt-sm">
      <div class="col q-mr-md">
        <div class="row text-subtitle1 text-weight-bold">
          City<span class="text-red">*</span>
        </div>
        <q-input
          dense
          outlined
          :class="{ required: isAsteriskMark }"
          v-model="address.addressLocality"
          :disable="this.readOnly"
          lazy-rules
          :rules="[
            val => val.length > 0 || 'Please fill the city',
            val => validateText(val) || 'Please enter valid city'
          ]"
        />
      </div>
      <div class="col q-mr-md">
        <div class="row text-subtitle1 text-weight-bold">
          State<span class="text-red">*</span>
        </div>
        <q-select
          dense
          outlined
          :disable="this.readOnly"
          :class="{ required: isAsteriskMark }"
          v-model="address.addressRegion"
          :options="states"
          behavior="menu"
          lazy-rules
          :rules="[val => val.length > 0 || 'Please fill the state']"
        />
      </div>
      <div class="col q-mr-sm">
        <div class="row text-subtitle1 text-weight-bold">
          ZIP Code<span class="text-red">*</span>
        </div>
        <q-input
          outlined
          dense
          :disable="this.readOnly"
          :class="{ required: isAsteriskMark }"
          v-model="address.postalCode"
          lazy-rules
          :rules="[
            val => val.length > 0 || 'Please fill the zip code',
            val =>
              validateAlphaNumericText(val) || 'Please enter valid ZIP code'
          ]"
        />
      </div>
    </div>

    <div class="row justify-between"></div>
    <div class="row" v-if="isDropBoxEnable">
      <p class="q-mx-none q-my-auto">Gate / Dropbox</p>
      <q-toggle
        class="q-ml-auto"
        v-model="address.dropBox.isPresent"
        @input="onToggleButtonOff"
        :disable="isOfflineClientEdit"
      />
    </div>
    <q-input
      dense
      v-if="address.dropBox.isPresent && isDropBoxEnable"
      v-model="address.dropBox.info"
      class="required"
      label="Gate/ Dropbox"
      :rules="[val => checkValidations(val) || 'Please fill the dropbox info']"
    />
  </div>
  <div class="" v-else-if="view == 'mobile'">
    <div
      :class="{
        'no-visibility': isFieldsDisable,
        visibility: !isFieldsDisable
      }"
    >
      <input
        required
        type="text"
        borderless
        :id="'id' + id"
        class="full-width input-autocomplete input-style input-overlay"
        v-model="address.address1"
        v-bind:disabled="this.readOnly"
        @keydown="validateAddress(address.address1)"
        @blur="validateAddress(address.address1)"
      />
      <span class="q-pl-sm" style="color: #c10015 !important; font-size: 11px">
        {{ errorMSG }}
      </span>
      <input
        type="text"
        borderless
        class="full-width input-autocomplete input-style input-overlay"
        dense
        :disable="this.readOnly"
        v-model="address.address2"
      />
    </div>
    <div class="row q-ml-sm">
      <div class="col q-mr-md">
        <!-- <div class="row text-subtitle1 text-weight-bold">
          City<span class="text-red">*</span>
        </div> -->
        <q-input
          dense
          borderless
          :class="{ required: isAsteriskMark }"
          class="input-style input-overlay"
          v-model="address.addressLocality"
          :disable="this.readOnly"
          lazy-rules
          label="City"
          :rules="[
            val => val.length > 0 || 'Please fill the city',
            val => validateText(val) || 'Please enter valid city'
          ]"
        />
      </div>
      <div class="col q-mr-md">
        <!-- <div class="row text-subtitle1 text-weight-bold">
          State<span class="text-red">*</span>
        </div> -->
        <q-select
          dense
          borderless
          :disable="this.readOnly"
          :class="{ required: isAsteriskMark }"
          class="input-style input-overlay"
          v-model="address.addressRegion"
          :options="states"
          behavior="menu"
          label="State"
          lazy-rules
          :rules="[val => val.length > 0 || 'Please fill the state']"
        />
      </div>
      <div class="col q-mr-sm">
        <!-- <div class="row text-subtitle1 text-weight-bold">
          ZIP Code<span class="text-red">*</span>
        </div> -->
        <q-input
          borderless
          dense
          :disable="this.readOnly"
          :class="{ required: isAsteriskMark }"
          class="input-style input-overlay"
          v-model="address.postalCode"
          lazy-rules
          label="Zip code"
          :rules="[
            val => val.length > 0 || 'Please fill the zip code',
            val =>
              validateAlphaNumericText(val) || 'Please enter valid ZIP code'
          ]"
        />
      </div>
    </div>

    <div class="row justify-between"></div>
    <div class="row" v-if="isDropBoxEnable">
      <p class="q-mx-none q-my-auto">Gate / Dropbox</p>
      <q-toggle
        class="q-ml-auto"
        v-model="address.dropBox.isPresent"
        @input="onToggleButtonOff"
        :disable="isOfflineClientEdit"
      />
    </div>
    <q-input
      dense
      v-if="address.dropBox.isPresent && isDropBoxEnable"
      v-model="address.dropBox.info"
      class="required"
      label="Gate/ Dropbox"
      :rules="[val => checkValidations(val) || 'Please fill the dropbox info']"
    />
  </div>

  <div class="q-pa-sm" v-else>
    <div
      :class="{
        'no-visibility': isFieldsDisable,
        visibility: !isFieldsDisable
      }"
    >
      <input
        type="text"
        borderless
        :id="'id' + id"
        class="input-autocomplete"
        :v-model="'model' + id"
        :disabled="isFieldsDisable"
        placeholder="AutoComplete address"
        style="border: 1px solid #d3d3d3; border-radius: 4px; height: 46px"
      />
    </div>
    <div class="row justify-between q-mt-sm">
      <q-input
        outlined
        dense
        :class="{ required: isAsteriskMark }"
        style="width: 46%"
        v-model="address.houseNumber"
        label="House/Flat No"
        lazy-rules
        :rules="[
          val => checkValidations(val) || 'Please fill the house or flat no'
        ]"
        :disable="isOfflineClientEdit"
      />
      <q-input
        dense
        outlined
        :class="{ required: isAsteriskMark }"
        style="width: 46%"
        v-model="address.address1"
        label="Address 1"
        lazy-rules
        :rules="[val => checkValidations(val) || 'Please fill the Address 1']"
        :disable="isOfflineClientEdit"
      />
    </div>
    <div class="row justify-between">
      <q-input
        dense
        class="q-mb-md"
        outlined
        :class="{ required: isAsteriskMark }"
        style="width: 46%"
        v-model="address.address2"
        label="Address 2"
        :disable="isOfflineClientEdit"
      />
      <q-input
        dense
        outlined
        :class="{ required: isAsteriskMark }"
        style="width: 46%"
        v-model="address.addressLocality"
        label="City"
        lazy-rules
        :rules="[val => checkValidations(val) || 'Please fill the city']"
        :disable="isOfflineClientEdit"
      />

      <q-select
        dense
        outlined
        :class="{ required: isAsteriskMark }"
        v-model="address.addressRegion"
        :options="states"
        style="width: 46%"
        label="State"
        behavior="menu"
        lazy-rules
        :rules="[val => checkValidations(val) || 'Please fill the state']"
        :disable="isOfflineClientEdit"
      />
    </div>
    <div class="row justify-between">
      <q-input
        outlined
        dense
        style="width: 46%"
        :class="{ required: isAsteriskMark }"
        v-model="address.postalCode"
        label="ZIP Code"
        lazy-rules
        :rules="[val => checkValidations(val) || 'Please fill the zip code']"
        :disable="isOfflineClientEdit"
      />
    </div>
    <div class="row" v-if="isDropBoxEnable">
      <p class="q-mx-none q-my-auto">Gate / Dropbox</p>
      <q-toggle
        class="q-ml-auto"
        v-model="address.dropBox.isPresent"
        @input="onToggleButtonOff"
        :disable="isOfflineClientEdit"
      />
    </div>
    <q-input
      dense
      v-if="address.dropBox.isPresent && isDropBoxEnable"
      v-model="address.dropBox.info"
      class="required"
      label="Gate/ Dropbox"
      :rules="[val => checkValidations(val) || 'Please fill the dropbox info']"
    />
  </div>
</template>
<script>
import AddressService from '@utils/country';
const addressService = new AddressService();
import {
  validateEmail,
  validateText,
  validateAlphaNumericText
} from '@utils/validation';
import { mapGetters } from 'vuex';
export default {
  name: 'AutoCompleteAddress',
  props: {
    isAsteriskMark: {
      type: Boolean,
      required: false
    },
    id: {
      type: String
    },
    value: {
      type: Boolean
    },
    address: {
      type: Object,
      dropBox: {
        info: '',
        isPresent: false
      }
    },
    isDropBoxEnable: {
      type: Boolean,
      required: true
    },
    isChecksEnable: {
      type: Boolean,
      required: true
    },
    isFieldsDisable: {
      type: Boolean,
      required: false
    },
    view: {
      type: String
    },
    readOnly: {
      type: Boolean
    }
  },

  data() {
    return {
      addressAutoComplete: '',
      addressAutoComplete2: '',
      autocomplete: {},
      autocomplete2: {},
      countries: [],
      states: [],
      errorMSG: ''
    };
  },
  computed: {
    ...mapGetters(['isOfflineClientEdit'])
  },
  mounted() {
    this.address.addressCountry = 'United States';
    this.onCountrySelect(this.address.addressCountry);
    this['obj' + this.id] = new google.maps.places.Autocomplete(
      document.getElementById('id' + this.id),
      {
        types: ['geocode'],
        componentRestrictions: { country: 'us' }
      }
    );
    this['obj' + this.id].addListener('place_changed', this.fillInAddress);
  },

  methods: {
    validateText,
    validateAlphaNumericText,
    validateAddress(val) {
      if (val.length < 2) {
        this.errorMSG = 'Please enter the valid address';
        return false;
      } else {
        this.errorMSG = '';
        return true;
      }
    },
    checkValidations(val) {
      if (this.isChecksEnable) {
        if (val && val.length > 0) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    onToggleButtonOff() {
      if (!this.address.dropBox.isPresent) {
        this.address.dropBox.info = '';
      }
    },

    fillInAddress() {
      const place = this['obj' + this.id].getPlace().address_components;

      this.address.address1 =
        this.getPlaceName('route', place) >= 0
          ? place[this.getPlaceName('street_number', place)].long_name +
            ', ' +
            place[this.getPlaceName('route', place)].long_name
          : '';

      this.address.addressLocality = this.getPlaceName('locality', place)
        ? place[this.getPlaceName('locality', place)].long_name
        : place[this.getPlaceName('administrative_area_level_2', place)]
            .long_name
        ? place[this.getPlaceName('administrative_area_level_2', place)]
            .long_name
        : '';
      this.address.addressRegion = this.getPlaceName(
        'administrative_area_level_1',
        place
      )
        ? place[this.getPlaceName('administrative_area_level_1', place)]
            .long_name
        : '';

      this.address.addressCountry = this.getPlaceName('country', place)
        ? place[this.getPlaceName('country', place)].long_name
        : '';

      this.address.postalCode = this.getPlaceName('postal_code', place)
        ? place[this.getPlaceName('postal_code', place)].long_name
        : '';

      if (this.getPlaceName('street_number', place) >= 0) {
        this.address.houseNumber =
          place[this.getPlaceName('street_number', place)].long_name;
      }
      this.states = addressService.getStates(this.address.addressCountry);
    },

    getPlaceName(key, value) {
      for (let i = 0; i < value.length; i++) {
        let index = value[i].types.indexOf(key);
        if (index != -1) {
          return i;
        }
      }
    },

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    }
  }
};
</script>
<style lang="scss">
.input-autocomplete {
  width: 102%;
  // border: 0;
  line-height: 24px;

  padding: 15px 10px;
  border-bottom: 1px solid #c2c2c2;
  outline: none;
  position: relative;
  text-transform: capitalize;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    &::placeholder {
      font-size: 12px;
      position: absolute;

      color: #f05a26;
    }
  }
}

.pac-container {
  z-index: 10000000;
}

.pac-icon {
  display: none;
}

.pac-item {
  font-size: 16px;
  padding: 4px 10px;

  &:hover {
    background-color: #ececec;
  }
}
</style>
