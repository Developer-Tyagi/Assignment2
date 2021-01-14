<template>
  <q-page style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/settings')"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
        <img src="~assets/add.svg" alt="" @click="addInspectionDialog = true" />
      </q-toolbar>
    </q-header>

    <div style="padding-top: 51px" class="full-height">
      <div v-if="inspectionTypes.length" class="q-pa-md">
        <div
          v-for="inspectionType in inspectionTypes"
          :key="inspectionType.id"
          class="inspection-list-item"
        >
          {{ inspectionType.machineValue }}
        </div>
      </div>
      <div v-else class="column full-height">
        <div style="color: #666666" class="text-center q-mt-auto">
          You haven't added Inspection yet.
        </div>
        <img
          src="~assets/add.svg"
          alt="add_icon"
          width="80px"
          height="80px"
          @click="addInspectionDialog = true"
          style="margin-top: 10px"
          class="q-mb-auto q-mx-auto"
        />
      </div>
    </div>
    <q-dialog
      v-model="addInspectionDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-bar>
          <img src="~assets/close.svg" @click="closeInspetionDialog" />
          <q-space />
          <div class="text-uppercase text-bold text-black">
            Add Inspection Type
          </div>
          <q-space />
        </q-bar>
        <div class="q-pa-md column" style="height: calc(100% - 51px)">
          <div style="height: calc(100% - 50px); ">
            <q-card
              class="inspection-card"
              v-for="(subtype, index) in inspectionType.subtypes"
              :key="index"
            >
              <q-input
                v-model="inspectionType.name"
                placeholder="Type of Inspection"
                v-if="index == 0"
              />
              <q-input
                placeholder="Sub Type of Inspection"
                v-model="inspectionType.subtypes[index].name"
              />
              <div class="slider-div">
                <label>Duration(hr)</label>
                <q-slider
                  v-model="inspectionType.subtypes[index].duration"
                  label-always
                  markers
                  :min="0"
                  :max="4"
                  :step="0.5"
                />
              </div>
            </q-card>

            <div
              @click="onAddSubTypeButtonClick"
              class="q-pa-md text-capitalize"
            >
              + another subtype of inspection
            </div>
          </div>
          <q-btn
            label="save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="onAddInspection"
            size="'xl'"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      addInspectionDialog: false,
      inspectionType: {
        value: "",
        subtypes: [
          {
            value: "",
            duration: 1,
            unit: "hour"
          }
        ]
      }
    };
  },

  created() {
    this.getInspectionTypes();
  },
  computed: {
    ...mapGetters(["inspectionTypes"])
  },

  methods: {
    ...mapActions(["getInspectionTypes", "addInspectionTypes"]),

    onAddSubTypeButtonClick() {
      const length = this.inspectionType.subtypes.length;
      if (
        this.inspectionType.subtypes[length - 1].name &&
        this.inspectionType.name
      ) {
        this.inspectionType.subtypes.push({
          name: "",
          duration: 0,
          unit: "hour"
        });
      } else {
        this.$q.notify({
          message: "Please fill the above details first",
          position: "top",
          type: "negative"
        });
      }
    },

    onAddInspection() {
      if (!this.inspectionType.subtypes[0].name) {
        this.inspectionType.subtypes[0].name = this.inspectionType.name;
      }
      this.addInspectionTypes(this.inspectionType).then(() => {
        this.closeInspetionDialog();
        this.getInspectionTypes();
      });
    },

    closeInspetionDialog() {
      this.addInspectionDialog = false;
      this.inspectionType = {
        name: "",
        subtypes: [
          {
            name: "",
            duration: 1,
            unit: "hour"
          }
        ]
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.inspection-list-item {
  color: #666666;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
}

.q-bar {
  height: 50px;
}

.inspection-card {
  padding: 16px 24px;
  margin-top: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  &:first-child {
    margin-top: 0px;
  }

  .slider-div {
    height: 80px;
    margin-top: 10px;

    .q-slider {
      margin-top: 30px;
    }
  }
  // ::-webkit-scrollbar {
  //   width: 0px;
  //   background: transparent; /* make scrollbar transparent */
  // }
}
</style>
