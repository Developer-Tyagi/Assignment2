<template>
  <q-page style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/dashboard')"
          style="margin: auto 0"
        />
        <div
          class="text-uppercase text-bold text-black q-mx-auto"
        >
          {{ $route.name }}
        </div>
        <img
          src="~assets/add.svg"
          alt=""
          @click="addClient"
          style="margin: auto 0"
        />        
      </q-toolbar>
    </q-header>
    <div class="clients-list" v-if="clients.length">
            <div class="actions-div">
                <q-input v-model="searchText" placeholder="Search" borderless @input="search($event)">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <div class="q-ml-auto row" @click="filterDialog = true">
                    <img src="~assets/filter.svg">Filters
                </div>
                <q-btn v-if="false" class="q-ml-auto" color="white" text-color="grey"  @click="clearFilter()" flat dense style="font-weight: 400">Clear</q-btn> 
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Clients",
  data() {
    return {
      searchText: "",
    };
  },

  computed: {
    ...mapGetters(["clients"]),
  },

  created() {
    this.getClients();
  },
  methods: {
    ...mapActions([
      "getClients",
    ]),

    addClient() {
      this.$router.push("/add-client");
    },
  },
};
</script>

<style lang="scss">
.clients-list{
    padding-top: 51px;
    color: #666666;
    .actions-div{
        display: flex;
        border-bottom: 1px solid #0000001f;
        padding: 0 20px ;
        align-items: center;
    }
    .vendor-list-item {
        padding: 20px;
        border-bottom: 1px solid lightgray;
        text-transform: capitalize;
        display: flex;
    }

}
</style>