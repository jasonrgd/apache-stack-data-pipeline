import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./components/HomeView.vue";
import AgentStatusChart from "./components/AgentStatusChart.vue";
import AgentStatusTable from "./components/AgentStatusTable.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/agent-status-chart", component: AgentStatusChart },
  { path: "/agent-status-table", component: AgentStatusTable },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
