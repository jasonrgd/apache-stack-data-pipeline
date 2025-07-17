<script setup>
import { ref, provide, onMounted, onUnmounted } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PieChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ProductService as ReportService } from "../service/ReportService.js";

use([
  BarChart,
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  PieChart,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
]);

provide(THEME_KEY, "light");

// variables
let intervalId;

// refs
const selectedChartType = ref({ name: "Pie Char", code: "pie" });
const chartTypes = ref([
  { name: "Pie Char", code: "pie" },
  { name: "Bar Chart", code: "bar" },
]);
const chartData = ref([]);
const pieChartOption = ref({
  title: {
    text: "Agent status",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Agent status",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: chartData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const barChartOption = ref({
  title: {
    text: "Agent status",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  dataset: {
    source: chartData,
  },
  xAxis: {
    type: "category",
    axisLabel: { interval: 0, rotate: 30 },
  },
  yAxis: {},
  series: {
    type: "bar",
    encode: { x: "name", y: "value" },
  },
});

// functions
function random() {
  return Math.round(300 + Math.random() * 700) / 10;
}

// lifecycle
onMounted(() => {
  console.log("mounted");

  chartData.value = ReportService.getAgentStatusChartData();

  // Refresh every 60 seconds
  intervalId = setInterval(() => {
    console.log("refresh chart data");
    chartData.value = ReportService.getAgentStatusChartData();
  }, 5 * 1000);
});

onUnmounted(() => {
  console.log("unmounted");

  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <Panel header="Options" toggleable>
    <Select
      v-model="selectedChartType"
      :options="chartTypes"
      optionLabel="name"
      placeholder="Select a chart type"
      class="w-full md:w-56"
    />
  </Panel>

  <Panel header="Dasboard">
    <v-chart
      v-if="selectedChartType.code === 'pie'"
      class="chart"
      :option="pieChartOption"
      autoresize
    />
    <v-chart
      v-if="selectedChartType.code === 'bar'"
      class="chart"
      :option="barChartOption"
      autoresize
    />
  </Panel>
</template>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>
