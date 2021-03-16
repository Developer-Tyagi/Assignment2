<template>
  <q-bar style="background: whitesmoke; height: 51px">
    <img src="~assets/close.svg" @click="onCloseIconClick" />
    <q-space />
    <div class="text-uppercase text-bold text-black">{{ dialogName }}</div>
    <q-space />
    <img src="~assets/close.svg" class="no-visibility" />
  </q-bar>
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
