<template>
  <q-page-container style="padding: 0">
    <q-page class="q-pa-xl">
      <p>Set the distance you want to travel(miles)</p>
      <div class="row">
        <q-slider
          v-model="value"
          :min="0"
          :max="100"
          :step="20"
          snap
          label
          label-always
          color="light-blue"
          class="full-width"
        />
        <q-btn
          color="light-blue"
          label="SAVE"
          class="single-next-button-style"
        ></q-btn>
      </div>
    </q-page>
  </q-page-container>
</template>
<script>
export default {
  name: 'PreferredDistance',
  data() {
    return {
      value: 0
    };
  }
};
</script>
