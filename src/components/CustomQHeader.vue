<template>
  <q-header bordered class="bg-white">
    <q-toolbar class="row bg-white">
      <q-btn
        v-if="$route.name == 'dashboard'"
        flat
        dense
        class="color-grey"
        icon="menu"
        aria-label="Menu"
        @click="onMenuButtonClick"
      >
      </q-btn>
      <q-btn
        v-else="$route.name != 'dashboard'"
        flat
        dense
        class="color-grey"
        icon="arrow_back"
        aria-label="Back"
        @click="onBackToLastNavigation"
      >
      </q-btn>
      <div class="text-uppercase text-bold text-black q-mx-auto">
        {{ $route.name }}
      </div>
      <q-btn
        v-if="icon"
        flat
        dense
        round
        class="color-grey"
        :[icon]="icon"
        :[aria-label]="label"
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
    sidePanel(newVal) {
      this.isLeftSidePanelOpen = newVal;
    },
  },

  methods: {
    onBackToLastNavigation() {
      this.$router.go(-1);
    },

    onMenuButtonClick() {
      this.isLeftSidePanelOpen = !this.isLeftSidePanelOpen;
      this.$emit("drawerSwitch", this.isLeftSidePanelOpen);
    },
  },
};
</script>