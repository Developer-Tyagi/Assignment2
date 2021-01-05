<template>
  <q-page>
    <CustomHeader
      @backButton="$router.push('/dashboard')"
      :showAddButton="false"
    />
    <div style="padding-top: 51px; height: calc(100vh); overflow: auto">
      <div class="row q-pa-sm">
        <q-card dark class="my-card" @click="$router.push('/leads')">
          <div class="value">0</div>
          <div class="text">New Leads</div>
        </q-card>
        <q-card dark class="my-card">
          <div class="value">6</div>
          <div class="text">Converted Leads</div>
        </q-card>
        <q-card dark class="my-card">
          <div class="value">2</div>
          <div class="text">Dead Leads</div>
        </q-card>
      </div>
      <div class="q-pa-md">
        <q-card>
          <div class="q-pa-lg">
            <div style="font-size: 16px; font-weight: bold; text-align: center">
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
  </q-page>
</template>
<style lang="scss" scoped>
.my-card {
  display: flex;
  flex-direction: column;
  background-color: #1b2854;
  width: calc(33.33% - 10px);
  height: 150px;
  padding: 25px 20px;
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
import BarChartComponent from "components/BarChart";
import CustomHeader from "components/CustomHeader";

export default {
  components: {
    BarChartComponent,
    CustomHeader
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
    fillData() {
      this.datacollection = {
        labels: [
          "New Lead",
          "Scheduled",
          "Visited",
          "Follow up ",
          "Leads Converted",
          "Dead Leads"
        ],
        datasets: [
          {
            backgroundColor: "#1B2854",
            data: [5, 8, 15, 10, 7, 3]
          }
        ]
      };
    }
  },
  computed: {
    myStyles() {
      return {
        height: "600px"
      };
    }
  }
};
</script>
