<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/leads')"
          style="margin: auto 0"
        />
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
            class="q-ml-auto "
          ></q-toggle>
        </div>
        <div v-if="!isNewLead">
          <q-separator></q-separator>
          <br />
          <p style="color:#666666;opacity:50%;font-size:12px">If client already exists, select from list below</p>
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
          class="full-width q-mt-auto text-capitalize"
          @click="onContinue"
          icon-right="arrow_right_alt"
          size="'xl'"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";

export default {
  methods: {
    onContinue() {
      this.$router.push("/add-lead-details");
    },
  },

  mounted() {},
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
