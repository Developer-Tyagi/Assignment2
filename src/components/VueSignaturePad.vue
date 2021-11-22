<template>
  <div>
    <div class="row justify-center">
      <div class="col-12 q-mt-md row justify-center">
        <VueSignaturePad
          id="signature"
          width="300px"
          height="300px"
          ref="signaturePad"
          :images="imgs"
          :options="options"
        />
      </div>
    </div>

    <div class="q-mt-md">
      <div class="row q-gutter-md justify-center">
        <q-btn
          v-if="finalSignature != true && finshButtonOnlineSign == false"
          class="col-2"
          label="Skip"
          @click="skip"
          color="primary"
        />

        <q-btn
          class="col-2"
          :label="finalSignature == true ? 'Finish' : 'Submit'"
          @click="save"
          color="primary"
        />
        <q-btn
          v-if="finshButtonOnlineSign"
          class="col-2"
          label="Finish"
          @click="onFinishButtonClick"
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySignaturePad',
  props: {
    finalSignature: {
      type: Boolean
    },
    // this prop is being used in online mode signature only
    finshButtonOnlineSign: {
      type: Boolean
    }
  },

  computed: {
    options: function() {
      return {
        penColor: this.hex
      };
    }
  },
  data() {
    return {
      imgs: [],
      hex: '#000'
    };
  },

  methods: {
    skip() {
      this.$emit('skipSignature');
    },
    onFinishButtonClick() {
      this.$emit('finishSignature');
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.$refs.signaturePad.clearSignature();

      this.$emit('signData', data);

      this.imgs.push(data);
    }
  }
};
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, hsl(180, 4%, 5%), hsl(0, 0%, 1%));
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
