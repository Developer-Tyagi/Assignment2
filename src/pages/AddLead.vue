<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <q-btn
          flat
          dense
          class="color-grey"
          icon="arrow_back"
          aria-label="Back"
          @click="$router.push('/leads')"
        >
        </q-btn>
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
      <div class="q-pa-lg column" style="height: calc(100vh - 81px)">
        <div class="row">
          <p class="q-mx-none q-my-auto">Is this a new lead?</p>
          <q-toggle
            v-model="isNewLead"
            left-label
            color="orange"
            class="q-ml-auto"
          ></q-toggle>
        </div>
        <div v-if="!isNewLead">
          <q-separator></q-separator>
          <br />
          <p>If client already exists, select from list below</p>
          <q-select
            v-model="clientSelected"
            :options="clientsList"
            clearable
            key="id"
            option-value="id"
            label="Select existing client"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label
                    v-html="scope.opt.attributes.primaryContact.fname"
                  ></q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <q-btn
          label="Continue"
          color="primary"
          class="full-width q-mt-auto"
          @click="onContinue"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    getClients() {
      // API endpoint is hardcoded for testing.
      axios
        .get(
          "https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1/clients",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "",
            },
          }
        )
        .then(
          (response) => {
            this.clientsList = response["data"]["data"];
          },
          (error) => {
            this.showForm = false;
            this.showError("Sorry, Couldn't retrieve clients data");
          }
        );
    },
    onContinue() {
      this.$router.push("/add-lead-details");
    },
  },
  mounted() {
    this.getClients();
  },
  data() {
    return {
      clientSelected: "",
      isNewLead: true,
      clientsList: [],
    };
  },
};
</script>
<style>
</style>
