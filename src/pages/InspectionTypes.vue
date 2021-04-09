<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-input
          dense
          v-model="searchText"
          placeholder="Search"
          borderless
          style="width: 100%"
          @input="search($event)"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <img
          src="~assets/close.svg"
          v-if="searchText"
          @click="onSearchBackButtonClick"
          style="margin: 0 20px"
        />
        <q-separator vertical></q-separator>
        <q-btn @click="addInspectionDialog = true" flat
          ><img src="~assets/add.svg" />
        </q-btn>
      </div>
      <div v-if="inspectionTypes.length" class="mobile-container-page">
        <div
          v-for="inspectionType in inspectionTypes"
          :key="inspectionType.id"
          class="inspection-list-item"
        >
          {{ inspectionType.value }}
        </div>
      </div>
      <div v-else class="column mobile-container-page">
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
      <q-card class="bg-white ">
        <CustomBar
          :dialogName="'Add Inspection Type'"
          @closeDialog="closeInspetionDialog"
        />

        <div class="q-pa-md column height-without-header ">
          <div style="height: calc(100% - 50px) ">
            <q-card
              class="inspection-card"
              v-for="(subtype, index) in inspectionType.subtypes"
              :key="index"
            >
              <q-input
                dense
                v-model="inspectionType.value"
                placeholder="Type of Inspection"
                v-if="index == 0"
              />
              <q-input
                dense
                placeholder="Sub Type of Inspection"
                v-model="inspectionType.subtypes[index].value"
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
import { mapActions, mapGetters } from 'vuex';
import CustomBar from 'components/CustomBar';
export default {
  components: { CustomBar },
  data() {
    return {
      searchText: '',
      addInspectionDialog: false,
      inspectionType: {
        value: '',
        subtypes: [
          {
            value: '',
            duration: 0.5,
            unit: 'hour'
          }
        ]
      }
    };
  },

  created() {
    this.getInspectionTypes();
  },
  computed: {
    ...mapGetters(['inspectionTypes'])
  },

  methods: {
    ...mapActions(['getInspectionTypes', 'addInspectionTypes']),

    onAddSubTypeButtonClick() {
      const length = this.inspectionType.subtypes.length;
      if (
        this.inspectionType.subtypes[length - 1].value &&
        this.inspectionType.value
      ) {
        this.inspectionType.subtypes.push({
          value: '',
          duration: 0.5,
          unit: 'hour'
        });
      } else {
        this.$q.notify({
          message: 'Please fill the above details first',
          position: 'top',
          type: 'negative'
        });
      }
    },

    onAddInspection() {
      if (!this.inspectionType.subtypes[0].value) {
        this.inspectionType.subtypes[0].value = this.inspectionType.value;
      }
      this.addInspectionTypes(this.inspectionType).then(() => {
        this.closeInspetionDialog();
        this.getInspectionTypes();
      });
    },

    closeInspetionDialog() {
      this.addInspectionDialog = false;
      this.inspectionType = {
        value: '',
        subtypes: [
          {
            value: '',
            duration: 1,
            unit: 'hour'
          }
        ]
      };
    },

    search(e) {},

    onSearchBackButtonClick() {
      this.searchText = '';
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
