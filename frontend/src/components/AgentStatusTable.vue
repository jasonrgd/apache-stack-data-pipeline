<script setup>
import { onMounted, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ProductService as ReportService } from "../service/ReportService.js"; // optional

// refs
const tableData = ref([]);
const loading = ref(true);

// lifecycle
onMounted(() => {
  console.log("mounted");

  tableData.value = ReportService.getAgentStatusTableData();
  loading.value = false;
});
</script>

<template>
  <Panel header="Options" toggleable> </Panel>

  <Panel header="Options">
    <DataTable
      :value="tableData"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      :loading="loading"
      tableStyle="min-width: 50rem"
    >
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
      </template>
      <Column field="code" header="Code" sortable style="width: 25%"></Column>
      <Column field="name" header="Name" sortable style="width: 25%"></Column>
      <Column
        field="category"
        header="Category"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="quantity"
        header="Quantity"
        sortable
        style="width: 25%"
      ></Column>
    </DataTable>
  </Panel>
</template>

<style scoped></style>
