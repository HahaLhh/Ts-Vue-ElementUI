<template>
  <div ref="mychart" class="chart" :style="{width:chartWidth,height:chartHeight}"></div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
//引入图表 组件
import echarts from "echarts";

@Component
export default class Charts extends Vue {
  //接收图表类型 line/bar/pie
  @Prop({ type: String, default: "line" }) readonly chartType!: String;
  //接收数据
  @Prop(Object) chartData!: String | null;

  //定义宽度和高度
  @Provide() chartWidth: String = "";
  @Provide() chartHeight: String = "";

  created() {
    this.generatorWidthAndHeight();
  }
  generatorWidthAndHeight() {
    //图表生成高度和宽度
    //计算页面宽度/高度 留白
    this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
  }
  //加载完成之前
  mounted() {
    this.drawChart();
  }
  drawChart() {
    //实例化echart对象
    //隶属于HTMLCanvasElement 才能绘制
    let chart = echarts.init((this as any).$refs.mychart as HTMLCanvasElement);
    if (chart == undefined) {
      console.log("echart init dom is failed");
      //结束
      return;
    }
    switch (this.chartType) {
      case "line":
        chart.setOption((this as any).generatorLineOption());
        break;
      case "bar":
        chart.setOption((this as any).generatorBarOption());
        break;
      case "pie":
        chart.setOption((this as any).generatorPieOption());
        break;
      default:
        console.log(`chartType ${this.chartType} is invalid`);
        break;
    }
  }
  //line
  generatorLineOption() {
    // 绘制折线图
    return {
      //标题
      title: {
        //主标题
        text: "近一周学习量",
        //副标题
        subtext: "test",
        //居中
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: "line",
          //平滑
          smooth: true
        }
      ],
      //工具
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      }
    };
  }
  //bar
  generatorBarOption() {
    //制作柱状图
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          //柱状图
          type: "bar",
          //柱状图之间的宽度
          barWidth: "20%"
        }
      ],
      //更改柱状图颜色
      color: ["#3398DB"],
      //鼠标进入后 工具
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      //布局
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%"
      }
    };
  }
  //pie
  generatorPieOption() {
    // 处理数据
    let pieData = [];
    for (const index in (this as any).chartData.xAxisData) {
      pieData.push({
        value: (this as any).chartData.yAxisData[index],
        name: (this as any).chartData.xAxisData[index]
      });
    }

    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      //文本提示
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: (this as any).chartData.xAxisData
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          //大小
          radius: "55%",
          //位置
          center: ["50%", "60%"],
          data: pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
}
</script>