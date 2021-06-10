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
        <q-btn @click="addClient" flat><img src="~assets/add.svg"/></q-btn>
      </div>
      <div class="mobile-container-page">
        <div class="clients-list" v-if="clients.length">
          <div class="clients-list" v-for="client in clients" :key="client.id">
            <q-item-section @click="onClientsListClick(client)">
              <div class="client-list-item">
                <div class="row text-bold q-pb-md">
                  <span>
                    {{ client['insuredInfo']['primary']['fname'] }}

                    {{ client['insuredInfo']['primary']['lname'] }}
                  </span>
                </div>
                <div class="row">
                  <span>
                    {{ client['meta'] ? client['meta']['totalClaims'] : 0 }}
                    Total Claims /
                    {{ client['meta'] ? client['meta']['openClaims'] : 0 }} Open
                    Claim
                  </span>
                </div>
                <div class="row">
                  <div class="row">
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
                        {{ client.insuredInfo.primary.phoneNumber[0].number }}
                      </span>
                    </span>
                  </div>
                </div>
                <div><span>File No. 12345678</span></div>
                <div class="row justify-between">
                  <div>Status: {{ client.status }}</div>
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
import { onPhoneNumberClick } from '@utils/clickable';

export default {
  name: 'Clients',
  data() {
    return {
      searchText: '',
      openSearchInput: false
    };
  },

  computed: {
    ...mapGetters(['clients', 'selectedClientId', 'selectedLead'])
  },

  created() {},
  methods: {
    ...mapActions(['getClients', 'getSingleClientDetails']),
    ...mapMutations(['setSelectedClientId', 'setSelectedLead']),
    dateWithTime,
    onPhoneNumberClick,
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    onClientsListClick(client) {
      this.setSelectedClientId(client.id);

      this.$router.push('/view-client');
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
