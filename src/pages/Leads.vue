<template>
  <q-page style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/leads-dashboard')"
          style="margin: auto 0"
        />
        <div
          class="text-uppercase text-bold text-black q-mx-auto"
          v-if="!openSearchInput"
        >
          {{ $route.name }}
        </div>
        <img
          src="~assets/search.svg"
          alt="Search icon"
          @click="openSearchInput = true"
          style="margin: 0"
          v-if="
            (activeLeads.length > 0 || archivedLeads.length > 0) &&
            !openSearchInput
          "
        />
        <img
          src="~assets/add.svg"
          alt=""
          @click="addLead"
          style="margin: 0 0 0 20px"
          v-if="!openSearchInput"
        />
        <q-input
          v-model="searchText"
          v-if="openSearchInput"
          placeholder="Search for leads"
          style="width: 80%; margin: 0 10%"
          clearable
          @input="filterLeads(false, $event)"
          @clear="filterLeads(true)"
        >
        </q-input>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px" class="full-height row">
      <div
        class="full-width"
        v-if="activeLeads.length > 0 || archivedLeads.length > 0"
      >
        <q-tabs
          v-model="panel"
          dense
          class="q-mt-md"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            name="newLeads"
            :label="newLeadsLabel"
            class="text-capitalize"
          ></q-tab>
          <q-tab
            name="oldLeads"
            :label="oldLeadsLabel"
            class="text-capitalize"
          ></q-tab>
        </q-tabs>
        <q-tab-panels v-model="panel" animated>
          <q-tab-panel name="newLeads" class="q-pa-none">
            <q-list>
              <div
                class="lead-list-item"
                v-for="lead in activeLeads"
                :key="lead.id"
              >
                <div class="button-left" @click="onArchiveButtonClick(lead.id)">
                  <div class="button-yellow">
                    <span class="text-white q-my-auto q-mx-auto">Archive</span>
                  </div>
                </div>
                <q-item
                  @click="onLeadListClick(lead)"
                  clickable
                  v-ripple
                  class="lead-list-details"
                  v-touch-swipe.mouse:6e-3:150:50="
                    (data) => onListSwipe(data, lead)
                  "
                  :class="{
                    swipeRight: lead.isLeftOptionOpen,
                    swipeLeft: lead.isRightOptionOpen,
                  }"
                >
                  <q-item-section>
                    <div class="row">
                      <span
                        >{{ lead.attributes.primaryContact.fname }}
                        {{ lead.attributes.primaryContact.lname }}</span
                      >
                      <span class="q-ml-auto">Visting On</span>
                    </div>
                    <div class="row">
                      <span
                        >Mob:
                        <span
                          v-if="
                            lead.attributes.primaryContact.phoneNumber &&
                            lead.attributes.primaryContact.phoneNumber.length
                          "
                        >
                          {{
                            lead.attributes.primaryContact.phoneNumber[0].number
                          }}
                        </span>
                      </span>
                      <span class="q-ml-auto" v-if="lead.attributes.lastVisted">
                        {{ lead.attributes.lastVisted | moment("DD/MM/YYYY") }}
                      </span>
                      <span v-else class="q-ml-auto"> - </span>
                    </div>
                    <div>
                      Date of Loss:
                      <span v-if="lead.attributes.dateofLoss">{{
                        lead.attributes.dateofLoss &&
                        lead.attributes.dateofLoss | moment("DD/MM/YYYY")
                      }}</span>
                      <span v-else> - </span>
                    </div>
                    <div class="q-mt-md row">
                      <span>New Lead in Inspection</span>
                      <span class="q-ml-auto">
                        <q-icon name="restore_page"></q-icon>
                      </span>
                    </div>
                  </q-item-section>
                </q-item>
                <div class="button-right">
                  <div class="button-yellow">
                    <span class="text-white q-my-auto q-mx-auto"
                      >Schedule Visit</span
                    >
                  </div>
                  <div class="button-orange">
                    <span class="text-white q-my-auto q-mx-auto"
                      >Create Client</span
                    >
                  </div>
                </div>
              </div>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="oldLeads" class="q-pa-none">
            <q-list>
              <q-item
                v-for="lead in archivedLeads"
                :key="lead.id"
                clickable
                v-ripple
                class="lead-list-details"
              >
                <q-item-section>
                  <div class="row">
                    <span
                      >{{ lead.attributes.primaryContact.fname }}
                      {{ lead.attributes.primaryContact.lname }}</span
                    >
                    <span class="q-ml-auto">Visting On</span>
                  </div>
                  <div class="row">
                    <span
                      >Mob:
                      <span
                        v-if="
                          lead.attributes.primaryContact.phoneNumber &&
                          lead.attributes.primaryContact.phoneNumber.length
                        "
                      >
                        {{
                          lead.attributes.primaryContact.phoneNumber[0].number
                        }}
                      </span>
                    </span>
                    <span class="q-ml-auto" v-if="lead.attributes.lastVisted">
                      {{ lead.attributes.lastVisted | moment("DD/MM/YYYY") }}
                    </span>
                    <span v-else class="q-ml-auto"> - </span>
                  </div>
                  <div>
                    Date of Loss:
                    <span v-if="lead.attributes.dateofLoss">{{
                      lead.attributes.dateofLoss &&
                      lead.attributes.dateofLoss | moment("DD/MM/YYYY")
                    }}</span>
                    <span v-else> - </span>
                  </div>
                  <div class="q-mt-md row">
                    <span>New Lead in Inspection</span>
                    <span class="q-ml-auto">
                      <q-icon name="restore_page"></q-icon>
                    </span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <div v-else class="full-height full-width column">
        <div style="color: #666666" class="text-center q-mt-auto">
          You haven't added a Lead yet.
        </div>
        <img
          src="~assets/add.svg"
          alt="add_icon"
          width="80px"
          height="80px"
          @click="addLead"
          style="margin-top: 10px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  name: "Leads",
  data() {
    return {
      oldLeadsLabel: "",
      newLeadsLabel: "",
      openSearchInput: false,
      searchText: "",
      leadTabs: [
        { value: "newLeads", label: "New Leads" },
        { value: "oldLeads", label: "Old Leads" },
      ],
      panel: "newLeads",
      // Initialize the leads json
      activeLeads: [],
      archivedLeads: [],
    };
  },
  computed: {
    // ...mapGetters("lead", ["leads"]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
      }
    },
  },
  methods: {
    // ...mapActions("lead", ["updateName"]),

    getActiveLeads() {
      // API endpoint is hardcoded for testing.
      axios
        .get("https://api.claimguru.cilalabs.dev/v1/leads", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(
          (response) => {
            this.activeLeads = response["data"]["data"];
            this.copyActiveLeads = JSON.stringify(this.activeLeads);
            this.newLeadsLabel = "New Leads - " + this.activeLeads.length;
            this.getArchivedLeads();
          },
          (error) => {
            this.showForm = false;
          }
        );
    },

    getArchivedLeads() {
      axios
        .get("https://api.claimguru.cilalabs.dev/v1/leads?archive=true", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(
          (response) => {
            this.archivedLeads = response["data"]["data"];
            this.oldLeadsLabel = "Old Leads - " + this.archivedLeads.length;
          },
          (error) => {
            this.showForm = false;
          }
        );
    },

    addLead() {
      this.$router.push("/add-lead");
    },

    onLeadListClick(lead) {
      // updateName({
      //   id: lead.id,
      //   updates: { type: lead.attributes.primaryContact.email },
      // });
      this.$router.push("/details/" + lead.id);
    },

    filterLeads(closeModel, event) {
      if (event) {
        const pattern = new RegExp(event, "i");
        this.activeLeads = this.activeLeads.filter((val) => {
          return (
            pattern.test(val.attributes.primaryContact.fname) ||
            pattern.test(val.attributes.primaryContact.lname)
          );
        });
      } else {
        this.activeLeads = JSON.parse(this.copyActiveLeads);
        this.openSearchInput = false;
      }
    },

    onListSwipe(info, lead) {
      if (info.direction == "left") {
        if (lead["isLeftOptionOpen"]) {
          lead["isLeftOptionOpen"] = false;
          lead["isRightOptionOpen"] = false;
        } else {
          lead["isLeftOptionOpen"] = false;
          lead["isRightOptionOpen"] = true;
        }
      } else if (info.direction == "right") {
        if (lead.isRightOptionOpen) {
          lead["isLeftOptionOpen"] = false;
          lead["isRightOptionOpen"] = false;
        } else {
          lead["isLeftOptionOpen"] = true;
          lead["isRightOptionOpen"] = false;
        }
      }
      //@ToDO: need to find a solution for this.
      this.$forceUpdate();
    },

    onArchiveButtonClick(leadId) {
      axios
        .delete(`https://api.claimguru.cilalabs.dev/v1/leads/${leadId}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(
          (response) => {
            let index = this.activeLeads.findIndex(
              (item) => item.id === leadId
            );
            this.archivedLeads.push(this.activeLeads[index]);
            this.activeLeads.splice(index, 1);
            this.oldLeadsLabel = "Old Leads - " + this.archivedLeads.length;
          },
          (error) => {
            this.$q.notify("error");
          }
        );
    },
  },

  mounted() {
    this.getActiveLeads();
  },
};
</script>
<style lang="sass">
.lead-list-item
  position: relative

  .button-left
    position: absolute
    z-index: 1
    top: 0
    width: 200px
    left: 0
    bottom: 0
    display: flex
    justify-content: flex-start

  .button-right
    position: absolute
    z-index: 1
    top: 0
    right: 0
    width: 200px
    bottom: 0
    display: flex
    justify-content: flex-end

  .button-orange
    margin: 0
    padding: 0
    border: none
    display: flex
    flex-direction: column
    width: 100px
    height: calc(100% - 4px)
    background-color: #F05A26

  .button-yellow
    margin: 0
    padding: 0
    display: flex
    flex-direction: column
    border: none
    width: 100px
    height: calc(100% - 4px)
    background-color: #ECA74C

  .swipeRight
    transform: translateX(100px)
    transition: all 600ms ease-out
  .swipeLeft
    transition: all 1200ms ease-out
    transform: translateX(-200px)
</style>
<style lang="scss" scoped>
* {
  color: #333333;
}
img {
  display: block;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}

.lead-list-details {
  background-color: #f4f4f4;
  border-bottom: 4px solid white;
  position: relative;
  z-index: 2;
  transition: all 1200ms ease-out;
}
</style>
<style lang="scss">
.q-tab {
  padding: 0;

  .q-tab__content {
    width: 100% !important;
  }
}
</style>