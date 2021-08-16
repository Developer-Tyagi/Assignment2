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
        class=" input-style  input-autocomplete"
        style="  margin: 0 -6px 0 -6px;"
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
        v-model="address.streetAddress"
        label="Street"
        lazy-rules
        :rules="[
          val => checkValidations(val) || 'Please fill the street address'
        ]"
        :disable="isOfflineClientEdit"
      />
    </div>
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
    <q-select
      dense
      borderless
      :class="{ required: isAsteriskMark }"
      class="input-style input-overlay"
      v-model="address.addressCountry"
      label="Country"
      behavior="menu"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the country']"
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
        v-model="address.streetAddress"
        label="Street"
        lazy-rules
        :rules="[
          val => checkValidations(val) || 'Please fill the street address'
        ]"
        :disable="isOfflineClientEdit"
      />
    </div>
    <div class="row justify-between">
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
        class="q-ml-sm"
        style="width: 46%"
        label="State"
        behavior="menu"
        lazy-rules
        :rules="[val => checkValidations(val) || 'Please fill the state']"
        :disable="isOfflineClientEdit"
      />
    </div>
    <div class="row justify-between">
      <q-select
        dense
        outlined
        :class="{ required: isAsteriskMark }"
        v-model="address.addressCountry"
        label="Country"
        behavior="menu"
        style="width: 46%"
        lazy-rules
        :rules="[val => checkValidations(val) || 'Please fill the country']"
        :disable="isOfflineClientEdit"
      />

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
    }
  },

  data() {
    return {
      addressAutoComplete: '',
      addressAutoComplete2: '',
      autocomplete: {},
      autocomplete2: {},
      countries: [],
      states: []
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
      this.address.streetAddress =
        this.getPlaceName('route', place) >= 0
          ? place[this.getPlaceName('route', place)].long_name
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
  width: 100%;
  // border: 0;
  line-height: 24px;
  padding: 16px 0;
  // border-bottom: 1px solid #c2c2c2;
  // outline: none;
  position: relative;
  text-transform: capitalize;
  &::placeholder {
    font-size: 16px;
  }

  &:focus {
    // border-bottom: 2px solid #f05a26;

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
