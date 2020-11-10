<template>
  <q-header bordered>
    <q-toolbar class="row">
      <q-btn
        v-if="currentRouteName == 'dashboard'"
        flat
        dense
        class="color-grey"
        icon="menu"
        aria-label="Menu"
        @click="onMenuButtonClick"
      >
      </q-btn>
      <q-btn
        v-else="currentRouteName != 'dashboard'"
        flat
        dense
        class="color-grey"
        icon="arrow_back"
        aria-label="Back"
        @click="backToLastNavigation"
      >
      </q-btn>
      <div class="text-uppercase text-bold text-black q-mx-auto">
        {{ currentRouteName }}
      </div>
      <q-btn
        v-if="icon"
        flat
        dense
        round
        class="color-grey"
        v-bind:icon="icon"
        v-bind:aria-label="label"
        @click="this.$emit('myEvent')"
      >
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "CustomQHeader",
  data() {
    return {
      isLeftSidePanelOpen: false,
    };
  },
  props: {
    icon: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    sidePanel: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    sidePanel: function (newVal, oldVal) {
      this.isLeftSidePanelOpen = newVal;
    },
  },

  methods: {
    backToLastNavigation() {
      this.$router.go(-1);
    },

    onMenuButtonClick() {
      this.isLeftSidePanelOpen = !this.isLeftSidePanelOpen;
      this.$emit("drawerSwitch", this.isLeftSidePanelOpen);
    },
  },

  computed: {
    currentRouteName() {
      return this.$router.history.current.path.substring(1);
    },
  },
};
</script>