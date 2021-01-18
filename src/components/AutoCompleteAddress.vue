<template>
  <div class="row">
    <q-input v-model="lossDetails.address2" label="House/Flat No" />
    <input
      type="text"
      id="autocomplete"
      class="input-autocomplete"
      v-model="address.street"
      placeholder="Street"
      @focus="getGeoLocation"
    />
  </div>
  <q-input
    v-model="address.city"
    label="City"
    lazy-rules
    :rules="[val => (val && val.length > 0) || 'Please fill the city']"
  ></q-input>
  <q-select
    v-model="address.state"
    :options="states"
    label="State"
    lazy-rules
    :rules="[val => (val && val.length > 0) || 'Please fill the state']"
  />
  <q-select
    v-model="address.country"
    :options="countries"
    label="Country"
    @input="onCountrySelect(lossDetails.country)"
    lazy-rules
    :rules="[val => (val && val.length > 0) || 'Please fill the country']"
  />
  <q-input
    v-model="address.postalCode"
    label="ZIP Code"
    lazy-rules
    :rules="[val => (val && val.length > 0) || 'Please fill the zip code']"
  />
</template>
<script>
import AddressService from "@utils/country";
const addressService = new AddressService();
export default {
  name: "AutoCompleteAddress",
  props: [],
  data() {
    return {};
  }
};
</script>
