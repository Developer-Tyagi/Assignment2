<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/dashboard')"
      @addButton="addClient"
      :showAddButton="true"
    />
    <div class="clients" v-if="clientsList.length">
      <div class="actions-div">
        <q-input
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
          alt=""
          v-if="searchText"
          @click="onSearchBackButtonClick"
          style="margin: 0 0 0 20px"
        />
        <!-- <div class="q-ml-auto row" @click="filterDialog = true">
          <img src="~assets/filter.svg" />Filters
        </div>
        <q-btn
          v-if="false"
          class="q-ml-auto"
          color="white"
          text-color="grey"
          @click="clearFilter()"
          flat
          dense
          style="font-weight: 400"
          >Clear</q-btn
        > -->
      </div>

      <div class="clients-list">
        <div
          class="q-px-md q-pt-sm"
          v-for="clientsList in clientsList"
          :key="clientsList.id"
        >
          <div class="client-list-item">
            <div class="row">
              <span>
                {{ clientsList['insuredInfo']['primary']['fname'] }}
                {{ clientsList['insuredInfo']['primary']['lname'] }}
              </span>

              <q-icon class="q-ml-auto" size="sm" name="more_vert"></q-icon>
            </div>
            <div class="row">
              <span
                >Mob:
                <span>
                  {{ clientsList.insuredInfo.primary.phoneNumber[0].number }}
                </span>
              </span>
            </div>
            <div><span>File No. 12345678</span></div>
            <div>Status: Negotiation</div>
          </div>
        </div>
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
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomHeader from 'components/CustomHeader';

export default {
  name: 'Clients',
  components: { CustomHeader },
  data() {
    return {
      searchText: '',
      openSearchInput: false
    };
  },

  computed: {
    ...mapGetters(['clientsList'])
  },

  created() {
    this.getClientsList();
  },
  methods: {
    ...mapActions(['getClientsList']),
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    addClient() {
      this.$router.push('/add-client');
    },

    search(e) {
      this.getClientsList(this.searchText ? this.searchText : '');
    }
  }
};
</script>

<style lang="scss">
.clients {
  padding-top: 51px;
  height: calc(100% - 51px);
  .actions-div {
    display: flex;
    border-bottom: 1px solid #0000001f;
    padding: 0 20px;
    align-items: center;
  }
  .clients-list {
    color: #666666;
    margin-bottom: 20px;
    height: calc(100% - 20px);
    overflow: scroll;

    .client-list-item {
      padding: 20px;
      background-color: lightgray;
      text-transform: capitalize;
      p {
        margin: 0 0 6px;
      }
    }
  }
}
</style>
