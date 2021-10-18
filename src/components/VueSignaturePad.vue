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
        <q-btn class="col-2" label="clear" @click="undo" color="primary" />
        <q-btn class="col-2" label="Save" @click="save" color="primary" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySignaturePad',

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
    undo() {
      this.$refs.signaturePad.undoSignature();
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
