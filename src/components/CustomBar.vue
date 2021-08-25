<template>
  <q-header style="background: whitesmoke; height: 51px">
    <div class="row">
      <div class="q-py-md q-pl-md">
        <img src="~assets/close.svg" @click="onCloseIconClick" />
      </div>
      <q-space />
      <div class="text-uppercase q-py-md text-center text-bold text-black">
        {{ dialogName }}
      </div>
      <q-space />
      <img src="~assets/close.svg" class="no-visibility" />
    </div>
  </q-header>
</template>
<script>
import AddressService from '@utils/country';
const addressService = new AddressService();
export default {
  name: 'CustomBar',
  props: {
    dialogName: {
      type: String,
      required: false
    }
  },

  methods: {
    onCloseIconClick() {
      this.$emit('closeDialog', true);
    }
  }
};
</script>
<style lang="scss"></style>
