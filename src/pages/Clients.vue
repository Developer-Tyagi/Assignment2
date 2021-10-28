<template>
  <q-page>
    <div>
      <div class="q-mt-sm row justify-center">
        <q-badge
          color="red "
          v-if="!organization.photoIDAPIKey && this.userRole == 'owner'"
        >
          PhotoId Key has not been added in the system
          <q-icon name="warning" color="white" class="q-ml-xs"></q-icon>
        </q-badge>
      </div>
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
        <q-btn @click="addClient" flat><img src="~assets/add.svg" /></q-btn>
      </div>
      <div class="mobile-container-page">
        <div class="clients-list" v-if="clients.length">
          <div class="clients-list" v-for="client in clients" :key="client.id">
            <q-item-section @click="onClientsListClick(client)">
              <div class="client-list-item">
                <div class="row form-heading q-pb-md">
                  <span>
                    {{ client['insuredInfo']['primary']['fname'] }}

                    {{ client['insuredInfo']['primary']['lname'] }}
                  </span>
                </div>
                <div class="row">
                  <span>
                    {{ client['meta'] ? client['meta']['totalClaims'] : 0 }}
                    Total Claims /
                    {{ client['meta'] ? client['meta']['openClaims'] : 0 }}
                    Open Claim
                  </span>
                </div>
                <div class="row">
                  <div
                    class="row"
                    v-if="client.insuredInfo.primary.phoneNumber"
                  >
                    <span
                      >Mob:
                      <span
                        class="clickLink"
                        @click="
                          onPhoneNumberClick(
                            client.insuredInfo.primary.phoneNumber[0].number,
                            $event
                          )
                        "
                      >
                        {{
                          showPhoneNumber(
                            client.insuredInfo.primary.phoneNumber[0].number
                          )
                        }}
                      </span>
                    </span>
                  </div>
                </div>
                <div><span>File No. 12345678</span></div>
                <div class="row justify-between">
                  <div>Status: {{ client.status ? client.status : '-' }}</div>
                  <div>
                    {{ dateWithTime(client.created) }}
                  </div>
                </div>
              </div>
            </q-item-section>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div style="color: #666666" class="text-center q-mt-auto">
            You haven't added a Client yet.
          </div>
          <img
            src="~assets/add.svg"
            alt="add_icon"
            width="80px"
            height="80px"
            @click="addClient"
            class="q-mb-auto q-mx-auto q-mt-sm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { dateWithTime } from '@utils/date';
import { onPhoneNumberClick, showPhoneNumber } from '@utils/clickable';
import localDB, { getCollection } from '@services/dexie';
import { getCurrentUser } from 'src/utils/auth';

export default {
  name: 'Clients',
  data() {
    return {
      userRole: '',
      searchText: '',
      openSearchInput: false
    };
  },

  computed: {
    ...mapGetters([
      'clients',
      'selectedClientId',
      'selectedLead',
      'isOnline',
      'editSelectedClient',
      ' isOfflineClientEdit',
      'organization'
    ])
  },

  async created() {
    const payload = {
      status: '',
      name: ''
    };
    this.getClients(payload);
    //only owner have the permission to view the organization info
    this.userRole = getCurrentUser().attributes.roles[0].machineValue;
    if (this.userRole == 'owner') {
      await this.getOrganization();
    }
  },
  methods: {
    ...mapActions(['getClients', 'getSingleClientDetails', 'getOrganization']),
    ...mapMutations([
      'setSelectedClient',
      'setSelectedClientOffline',
      'setEditOfflineClientIcon'
    ]),
    dateWithTime,
    onPhoneNumberClick,
    showPhoneNumber,
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    async onClientsListClick(client) {
      this.getSingleClientDetails(client.id);
      if (this.isOnline) {
        this.setSelectedClient(client);
        this.$router.push('/view-client/' + client.id);
      } else {
        this.setSelectedClientOffline(client);
        this.$router.push('/add-client');
        this.setEditOfflineClientIcon(true);
      }
    },
    addClient() {
      this.$router.push('/add-client');
      this.selectedLead.id = '';
    },

    search(e) {
      const payload = {
        name: this.searchText ? this.searchText : ''
      };
      this.getClients(payload);
    }
  }
};
</script>

<style lang="scss">
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
    p {
      margin: 0 0 6px;
    }
  }
}
</style>
