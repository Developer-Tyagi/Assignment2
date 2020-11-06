<template>
  <q-page padding>
    <div class="addLead">
      <q-btn round color="orange" icon="add" @click="addLead"></q-btn>
    </div>
    <h5>{{message}}</h5>
    <q-tabs
      v-model="panel"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="newLeads" label="New Leads"></q-tab>
      <q-tab name="oldLeads" label="Old Leads"></q-tab>
    </q-tabs>
    <q-separator></q-separator>
    <q-tab-panels v-model="panel" animated>
      <q-tab-panel name="newLeads">
        <q-list bordered separator>
          <q-item
            @click="updateName({id:lead.id,updates:{type:lead.attributes.primaryContact.email}})"
            v-for="(lead) in leadsData"
            :key="lead.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
              >{{lead.attributes.primaryContact.fname.charAt(0)}}</q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{lead.attributes.primaryContact.fname}} {{lead.attributes.primaryContact.lname}}</q-item-label>
              <q-item-label caption lines="1">{{lead.attributes.primaryContact.email}}</q-item-label>
              <q-item-label caption lines="1">{{lead.attributes.primaryContact.phoneNumber.number}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <div v-if="lead.attributes.lastVisted===''">
                <small>
                  <q-item-label>Schedule to visit</q-item-label>
                </small>

                <q-icon name="sync" color="red"></q-icon>
              </div>
              <div v-else>
                <small>
                  <q-item-label>Visited on {{lead.attributes.lastVisted}}</q-item-label>
                </small>
                <q-icon name="sync" color="green"></q-icon>
              </div>
              <div>
                <q-icon name="insert_invitation" color="blue" size="md"></q-icon>
                <q-icon name="library_books" color="black" size="md" @click="takeNotes"></q-icon>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="oldLeads">
        <q-list bordered separator>
          <q-item
            @click="updateName({id:lead.id,updates:{type:lead.attributes.primaryContact.email}})"
            v-for="(lead) in leadsData"
            :key="lead.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
              >{{lead.attributes.primaryContact.fname.charAt(0)}}</q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{lead.attributes.primaryContact.fname}} {{lead.attributes.primaryContact.lname}}</q-item-label>
              <q-item-label caption lines="1">{{lead.attributes.primaryContact.email}}</q-item-label>
              <q-item-label caption lines="1">{{lead.attributes.primaryContact.phoneNumber.number}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <div v-if="lead.attributes.lastVisted===''">
                <small>
                  <q-item-label>Schedule to visit</q-item-label>
                </small>

                <q-icon name="sync" color="red"></q-icon>
              </div>
              <div v-else>
                <small>
                  <q-item-label>Visited on {{lead.attributes.lastVisted}}</q-item-label>
                </small>
                <q-icon name="sync" color="green"></q-icon>
              </div>
              <div>
                <q-icon name="insert_invitation" color="blue" size="md"></q-icon>
                <q-icon name="library_books" color="black" size="md" @click="takeNotes"></q-icon>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Leads",
  computed: {
    ...mapGetters("leadStore", ["leads"])
  },
  methods: {
    ...mapActions("leadStore", ["updateName"]),
    takeNotes() {
      this.$q
        .dialog({
          title: "Notes",
          message: "Write relevant information about this new lead."
        })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    },
    getLeads: function(event) {
      // API endpoint is hardcoded for testing.
      axios
        .get("https://api.claimguru.cilalabs.dev/v1/leads", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(
          response => {
            console.log(response);
            this.leadsData = response["data"]["data"];
          },
          error => {
            console.log(error);
            this.showForm = false;
            this.showError("Sorry, Couldn't retrieve profile data");
          }
        );
    },
    addLead() {
      this.$router.push("/add-lead");
    }
  },
  mounted() {
    this.getLeads();
  },
  data() {
    return {
      leadTabs: [
        { value: "newLeads", label: "New Leads" },
        { value: "oldLeads", label: "Old Leads" }
      ],
      message: "Leads",
      panel: "newLeads",
      // Initialize the leads json
      leadsData: [
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
              phoneNumber: {
                type: "",
                number: ""
              }
            },
            lastVisted: "",
            visited: [],
            leadTabs: "newLeadTab"
          }
        }
      ]
    };
  }
};
</script>

<style>
img {
  display: block;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}
.addLead {
  position: absolute;
  right: 20px;
}
</style>
