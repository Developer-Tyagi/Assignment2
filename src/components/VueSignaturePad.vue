<template>
  <div id="app">
    <VueSignaturePad
      width="1500px"
      height="1500px"
      ref="signaturePad"
      :options="{ onBegin, onEnd }"
    />
  </div>
</template>
<script>
export default {
  methods: {
    onBegin() {
      console.log('=== Begin ===');
    },
    onEnd() {
      console.log('=== End ===');
    }
  }
};
</script>
