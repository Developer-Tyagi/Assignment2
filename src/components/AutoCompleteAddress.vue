<template>
  <div>
    <input
      type="text"
      id="autocomplete"
      class="input-autocomplete"
      v-model="addressAutoComplete"
      placeholder="AutoComplete address"
      :disabled="isFieldsDisable"
    />
    <div class="row justify-between">
      <q-input
        :class="isRequired ? 'required col-3' : ''"
        v-model="address.houseNumber"
        label="House/Flat No"
        lazy-rules
        :rules="[
          val => checkValidations(val) || 'Please fill the house or flat no'
        ]"
      />
      <q-input
        :class="isRequired ? 'required col-8' : ''"
        v-model="address.streetAddress"
        label="Street"
        lazy-rules
        :rules="[
          val => checkValidations(val) || 'Please fill the street address'
        ]"
      />
    </div>
    <q-input
      :class="isRequired ? 'required' : ''"
      v-model="address.addressLocality"
      label="City"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the city']"
    />
    <q-select
      :class="isRequired ? 'required' : ''"
      v-model="address.addressRegion"
      :options="states"
      label="State"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the state']"
    />
    <q-select
      :class="isRequired ? 'required' : ''"
      v-model="address.addressCountry"
      :options="countries"
      label="Country"
      @input="onCountrySelect(address.addressCountry)"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the country']"
    />
    <q-input
      :class="isRequired ? 'required' : ''"
      v-model="address.postalCode"
      label="ZIP Code"
      lazy-rules
      :rules="[val => checkValidations(val) || 'Please fill the zip code']"
    />
    <div class="row" v-if="isDropBoxEnable">
      <p class="q-mx-none q-my-auto">Gate / Dropbox</p>
      <q-toggle
        class="q-ml-auto"
        v-model="address.dropBox.isPresent"
        :disable="!isAddressFieldEnable"
      />
    </div>
    <q-input
      v-if="address.dropBox.isPresent && isDropBoxEnable"
      v-model="address.dropBox.info"
      class="required"
      label="Gate/ Dropbox"
      :disable="!isAddressFieldEnable"
      :rules="[val => checkValidations(val)]"
    />
  </div>
</template>
<script>
import AddressService from '@utils/country';
const addressService = new AddressService();
export default {
  name: 'AutoCompleteAddress',
  props: {
    isRequired: false,
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
    }
  },

  data() {
    return {
      addressAutoComplete: '',
      autocomplete: {},
      isAddressFieldEnable: false,
      countries: [],
      states: []
    };
  },

  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { types: ['geocode'] }
    );
    this.getGeoLocation;
    this.autocomplete.addListener('place_changed', this.fillInAddress);
    this.countries = addressService.getCountries();
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

    getGeoLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          this.autocomplete.setBounds(circle.getBounds());
        });
      }
    },

    fillInAddress() {
      const place = this.autocomplete.getPlace().address_components;
      this.address.streetAddress =
        this.getPlaceName('route', place) >= 0
          ? place[this.getPlaceName('route', place)].long_name
          : '';
      this.address.addressLocality = this.getPlaceName(
        'administrative_area_level_2',
        place
      )
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
      this.states = addressService.getStates(this.address.addressCountry);
      this.isAddressFieldEnable = true;
      this.addressAutoComplete = '';
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
  margin-left: auto;
  border: 0;
  line-height: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #c2c2c2;
  outline: none;
  position: relative;
  text-transform: capitalize;
  &::placeholder {
    font-size: 16px;
  }

  &:focus {
    border-bottom: 2px solid #f05a26;

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
