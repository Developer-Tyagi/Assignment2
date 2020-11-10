<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div v-if="!inspections.length">
          <h6>You haven't added Inspection yet.</h6>
          <q-icon name="add_circle_outline" style="font-size: 100px" />
        </div>
        <div v-else></div>
        <q-btn
          label="Bottom"
          icon="keyboard_arrow_down"
          color="primary"
          @click="open('bottom')"
        />
        <q-dialog v-model="dialog" :position="position">
          <q-card class="full-width full-height">
            <q-card-section class="row items-center no-wrap">
              <div></div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      inspections: [],
      dialog: false,
      position: "top",
    };
  },

  methods: {
    open(position) {
      this.position = position;
      this.dialog = true;
    },
  },
};
</script>  