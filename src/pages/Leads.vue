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
            label="New Leads"
            class="text-capitalize"
          ></q-tab>
          <q-tab
            name="oldLeads"
            label="Old Leads"
            class="text-capitalize"
          ></q-tab>
        </q-tabs>
        <q-tab-panels v-model="panel" animated>
          <q-tab-panel name="newLeads" class="q-pa-none">
            <q-list>
              <q-item
                @click="onLeadListClick(lead)"
                v-for="lead in activeLeads"
                :key="lead.id"
                clickable
                v-ripple
                class="lead-list-item"
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
          <q-tab-panel name="oldLeads" class="q-pa-none">
            <q-list>
              <q-item
                @click="onLeadListClick(lead)"
                v-for="lead in archivedLeads"
                :key="lead.id"
                clickable
                v-ripple
                class="lead-list-item"
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
                    <span class="q-ml-auto">{{}}</span>
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
      <div v-else class="full-height q-ma-auto">
        <div style="color: #666666" class="text-center">
          You haven't added a Lead yet.
        </div>
        <img
          src="~assets/add.svg"
          alt="add_icon"
          width="80px"
          height="80px"
          @click="addLead"
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
      openSearchInput: false,
      searchText: "",
      leadTabs: [
        { value: "newLeads", label: "New Leads" },
        { value: "oldLeads", label: "Old Leads" },
      ],
      panel: "newLeads",
      // Initialize the leads json
      activeLeads: [
        {
          type: "",
          id: "",
          attributes: {
            isOrganization: true,
            organizationName: "",
            primaryContact: {
              fname: "",
              lname: "",
              email: "",
              phoneNumber: [
                {
                  type: "",
                  number: "",
                },
              ],
            },
            lastVisted: "",
            visited: [],
          },
        },
      ],
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
  },

  mounted() {
    this.getActiveLeads();
  },
};
</script>
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

.q-tab {
  padding: 0;
}

.q-tab__content {
  width: 100%;
}

.lead-list-item {
  background-color: #f4f4f4;
  border-bottom: 4px solid white;
}
</style>