<script setup>
import { ref } from "vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import router from "./router.js";

// refs
const items = ref([
  { route: "/", label: "Home", icon: "pi pi-fw pi-home" },
  {
    route: "/agent-status-chart",
    label: "Agent Status Chart",
    icon: "pi pi-fw pi-chart-bar",
  },
  {
    route: "/agent-status-table",
    label: "Agent Status Table",
    icon: "pi pi-fw pi-table",
  },
]);

// functions
function navigate(route) {
  router.push(route);
}
</script>

<template>
  <div class="card">
    <Tabs value="/">
      <TabList>
        <Tab
          v-for="tab in items"
          :key="tab.label"
          :value="tab.route"
          @click="navigate(tab.route)"
        >
          <i :class="tab.icon" />
          <span>{{ tab.label }}</span>
        </Tab>
      </TabList>
      <TabPanels>
        <router-view></router-view>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped></style>
