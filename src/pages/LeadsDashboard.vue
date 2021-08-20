<template>
  <q-page>
    <div>
      <div class="mobile-container-page-without-search">
        <div class="row q-pa-sm">
          <q-card dark class="lead-dashboard-card" @click="onClickNewLead">
            <div class="value">{{ leadStatic.new }}</div>

            <div class="text">New Leads</div>
          </q-card>
          <q-card
            dark
            class="lead-dashboard-card"
            @click="onConvertedLeadClick"
          >
            <div class="value">{{ leadStatic.converted }}</div>

            <div class="text">Converted Leads</div>
          </q-card>
          <q-card dark class="lead-dashboard-card" @click="onDeadLeadClick">
            <div class="value">{{ leadStatic.dead }}</div>
            <div class="text">Dead Leads</div>
          </q-card>
        </div>
        <div class="q-pa-md">
          <q-card>
            <div class="q-pa-lg">
              <div
                style="font-size: 16px; font-weight: bold; text-align: center"
              >
                Lead Phase Chart
              </div>
              <div style="color: #999999; font-size: 14px; text-align: center">
                Last 30 Days
              </div>
            </div>
            <BarChartComponent :chartData="datacollection" :options="options" />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="scss">
.lead-dashboard-card {
  display: flex;
  flex-direction: column;
  background-color: $primary;
  width: calc(33.33% - 10px);
  height: 150px;
  padding: 25px 10px;
  margin: 5px;
  .value {
    font-size: 32px;
    text-align: center;
  }
  .text {
    font-size: 14px;
    text-align: center;
    line-height: 18px;
  }
}
</style>

<script>
import BarChartComponent from 'components/BarChart';

import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    BarChartComponent
  },
  data() {
    return {
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    ...mapActions([
      'getLeadStatistics',
      'getActiveLeadsList',
      'getArchivedLeadsList'
    ]),
    ...mapMutations(['setConvertedLead']),
    fillData() {
      this.datacollection = {
        labels: [
          'New Lead',
          'Scheduled',
          // 'Visited',
          // 'Follow up ',
          'Leads Converted',
          'Dead Leads'
        ],
        datasets: [
          {
            backgroundColor: '#F84400',

            data: [
              this.leadStatic.new,
              this.leadStatic.scheduled,
              // 15,
              // 10,
              this.leadStatic.converted,
              this.leadStatic.dead
            ]
          }
        ]
      };
    },
    onClickNewLead() {
      this.$store.commit('setShowConvertButton', true);
      this.$router.push('/leads');
      const payload = {
        new: '',
        status: ''
      };
      this.setConvertedLead('Active');
      this.getActiveLeadsList(payload);
      this.getArchivedLeadsList();
    },
    onDeadLeadClick() {
      this.$router.push('/leads');
      const payload = {
        searchString: '',
        name: '',
        phase: 'archived'
      };
      this.setConvertedLead('Dead');
      this.getActiveLeadsList(payload);
    },
    onConvertedLeadClick() {
      this.$store.commit('setShowConvertButton', false);
      this.$router.push({ path: '/leads' });

      const payload = {
        searchString: '',
        name: '',
        phase: 'Converted'
      };
      this.setConvertedLead('Converted');
      this.getActiveLeadsList(payload);
    }
  },
  computed: {
    ...mapGetters(['leadStatic']),
    myStyles() {
      return {
        height: '600px'
      };
    }
  }
};
</script>
