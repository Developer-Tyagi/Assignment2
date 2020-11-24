<template>
  <div class="options-reveal" v-touch-swipe.left.right="handler">
    <div :style="style" class="_wrapper">
      <slot />
    </div>
    <div class="_options">
      <button
        v-for="option in options"
        @click="option.action()"
        :style="background-color: red;"
      >
        {{ option.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { dom } from "quasar";
const { width } = dom;

export default {
  name: "SliderButton",
  props: ["options"],
  data() {
    return { opened: false };
  },
  computed: {
    style() {
      if (this.opened) {
        const optionsAmount = this.options.length * 100;
        let { height, width } = viewport();
        console.log(height, width);
        console.log(optionsAmount);
        const props = cssTransform(`translateX(-${optionsAmount}px)`);
        return Object.keys(props).reduce((carry, key) => {
          return `${carry}${key}: ${props[key]}; `;
        }, "");
      }
      return "";
    },
  },
  methods: {
    handler(obj) {
      if (obj.direction === "right") this.opened = false;
      if (obj.direction === "left") this.opened = true;
    },
  },
};
</script>   

<style lang="stylus" >
.options-reveal {
  position: relative;

  ._wrapper {
    position: relative;
    z-index: 2;
    transition: all 100ms ease-out;
  }

  ._options {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;

    > button {
      margin: 0;
      padding: 0;
      border: none;
      border-left: thin solid white;
      width: 100px;
      height: 100%;
      background-color: gray;
    }
  }
}
</style>