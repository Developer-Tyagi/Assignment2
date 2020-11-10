<template>
  <q-layout view="lhr lpR lfr">
    <CustomQHeader></CustomQHeader>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import CustomQHeader from "../components/custom-components/CustomQHeader";

export default {
  name: "SettingsLayout",
  data() {
    return {
      isLeftSidePanelOpen: false,
    };
  },

  components: {
    CustomQHeader,
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },

    backToLastNavigation() {
      this.$router.go(-1);
    },
  },
};
</script>
