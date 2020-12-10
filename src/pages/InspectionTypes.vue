<template>
  <q-page  style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/settings')"
          style="margin: auto 0"
        />
        <div
          class="text-uppercase text-bold text-black q-mx-auto"
        >
          {{ $route.name }}
        </div>
        <img
          src="~assets/add.svg"
          alt=""
          @click="$router.push('/add-inspection-type')"
        />
        </q-input>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px" class="full-height column">
        <div style="color: #666666" class="text-center q-mt-auto">
          You haven't added Inspection yet.
        </div>
        <img
          src="~assets/add.svg"
          alt="add_icon"
          width="80px"
          height="80px"
          @click="$router.push('/add-inspection-type')"
          style="margin-top: 10px"
          class="q-mb-auto q-mx-auto"
        />
        <!-- @click="dialog = true" -->
      </div>
    </div>
    <!-- <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

      </q-card>
    </q-dialog> -->
  </q-page>
 
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false
    };
  },

  computed: {},

  methods: {
    
  },
};
</script>  