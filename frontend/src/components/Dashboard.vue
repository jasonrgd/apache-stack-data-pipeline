<template>
  <div>
    <h2>Live Activities in Last Hour (per minute)</h2>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const chart = ref(null)
let chartInstance = null

const fetchDataAndRender = async () => {
  try {
    const query = `
      SELECT
        FLOOR(__time TO MINUTE) AS minute,
        COUNT(*) AS total_activities
      FROM activities
      WHERE __time >= CURRENT_TIMESTAMP - INTERVAL '1' HOUR
      GROUP BY 1
      ORDER BY 1
    `
    const response = await axios.post('/druid/v2/sql/', {
      query
    })

    // Druid SQL API returns array of objects like { minute: '2025-07-14T01:12:00.000Z', total_activities: 12 }
    const data = response.data

    const times = data.map(row => new Date(row.minute).toLocaleTimeString())
    const counts = data.map(row => row.total_activities)

    chartInstance.setOption({
      xAxis: {
        type: 'category',
        data: times
      },
      yAxis: {
        type: 'value',
        name: 'Total Activities'
      },
      series: [{
        data: counts,
        type: 'line',
        smooth: true,
        areaStyle: {}
      }],
      tooltip: {
        trigger: 'axis'
      }
    })
  } catch (err) {
    console.error('Failed to fetch or render data', err)
  }
}

onMounted(() => {
  chartInstance = echarts.init(chart.value)
  fetchDataAndRender()

  // Refresh every 60 seconds
  setInterval(fetchDataAndRender, 60 * 1000)
})
</script>
