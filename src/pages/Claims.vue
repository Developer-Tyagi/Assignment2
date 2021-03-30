<template>
  <q-page>
    <div>
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
          v-if="searchText"
          @click="onSearchBackButtonClick"
          style="margin: 0 20px"
        />

        <div class="q-ml-auto row q-pr-md" @click="filterDialog = true">
          <img src="~assets/filter.svg" />
        </div>
        <q-separator vertical></q-separator>
        <q-btn @click="addClaim" flat><img src="~assets/add.svg"/></q-btn>
      </div>
      <div class="mobile-container-page">
        <div class="clients-list q-ma-sm" v-if="claims.length">
          <div
            class="clients-list"
            v-for="(claim, index) in claims"
            :key="claim.id"
          >
            <div class="client-list-item">
              <div class="row form-heading">
                {{ claim.attributes.client.fname }}
                {{ claim.attributes.client.lname }}
                <span class="q-ml-auto">
                  {{ claim.attributes.created | moment('DD/MM/YYYY') }}</span
                >
              </div>
              <span>
                Claim No.
                <span class="q-ml-xs">
                  {{
                    claim.attributes.number ? claim.attributes.number : '-'
                  }}</span
                > </span
              ><br />
              <span>
                Carrier :

                <span class="q-ml-xs">
                  {{
                    claim.attributes.carrier ? claim.attributes.carrier : '-'
                  }}</span
                >
              </span>
              <br />

              <div class="row q-pt-xs">
                <span> Status: </span>
                <span class="text-bold q-ml-xs"> Open</span>
                <q-rating
                  v-model="ratingModel"
                  class="q-ml-auto"
                  size="1em"
                  :max="1"
                  color="primary"
                ></q-rating>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div class="column absolute-center">
            <div style="color: #666666,align-items: center">
              You haven't added a Claim yet.
            </div>

            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              width="130px"
              height="100px"
              @click="addClaim"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'Claims',
  data() {
    return {
      filterDialog: false,
      params: {
        name: ''
      },
      ratingModel: 2,
      searchText: '',
      openSearchInput: false
    };
  },

  computed: {
    ...mapGetters(['claims']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getClaims();
  },
  methods: {
    ...mapActions(['getClaims']),

    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },

    addClaim() {},
    search(event) {
      this.params.name = event;
      this.getClaims(this.params);
    }
  }
};
</script>

<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
  }
}
</style>
