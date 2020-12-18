<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader @backButton="$router.push('/dashboard')"
    @addButton="$router.push("/add-client");" />
    <div class="clients" v-if="clients.length">
      <div class="actions-div">
        <q-input
          v-model="searchText"
          placeholder="Search"
          borderless
          @input="search($event)"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="q-ml-auto row" @click="filterDialog = true">
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
        >
      </div>
      <div class="clients-list">
        <div class="q-px-md q-pt-sm" v-for="client in clients" :key="client">
          <div class="client-list-item">
            <div class="row">
              <span>John Smith</span
              ><q-icon class="q-ml-auto" size="sm" name="more_vert"></q-icon>
            </div>
            <p>+1 (1212) 121212</p>
            <div><span>File No. 12345678</span> <span> </span></div>
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
import { mapGetters, mapActions } from "vuex";
import CustomHeader from "components/CustomHeader";

export default {
  name: "Clients",
  components: { CustomHeader },
  data() {
    return {
      searchText: ""
      // clients: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },

  computed: {
    ...mapGetters(["clients"])
  },

  created() {
    this.getClients();
  },
  methods: {
    ...mapActions(["getClients"])
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
