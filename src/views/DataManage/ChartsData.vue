<template>
  <div class="Chart-data">
    <!-- v-model="tabPosition" 默认x先显示 name为line的  -->
    <!-- chartType 传递图表类型 -->
    <el-tabs type="border-card" v-model="tabPosition">
      <el-tab-pane label="折线图" name="line">
        <Charts :chartData="chartData" chartType="line"></Charts>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">
        <Charts :chartData="chartData" chartType="bar"></Charts>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">
        <Charts :chartData="chartData" chartType="pie"></Charts>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import Charts from "../../components/Charts.vue";

@Component({
  components: { Charts }
})
export default class ChartData extends Vue {
  @Provide() tabPosition: string = "line";
  @Provide() chartData: any = {
    //横向 x轴
    xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //纵向 y轴
    yAxisData: [820, 932, 901, 934, 1290, 1330, 1320]
  };
}
</script>