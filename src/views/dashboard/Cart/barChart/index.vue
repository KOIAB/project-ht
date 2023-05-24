<template>
<!-- 容器 -->
  <div class="charts" ref="charts">

  </div>
</template>

<script>
import *as echarts from 'echarts'
export default {
    name:'lineCharts',
    mounted(){
        // 初始化echarts实例
        let lineCharts=echarts.init(this.$refs.charts)
        // 配置数据
        lineCharts.setOption({
            xAxis:{
                show:false,
                type: 'category',
            },
            yAxis:{
                show:false,
            },
            // 系列
            series:[
                {
                    type:'bar',
                    data:[78,30,88,12,35,27,85,75,10,75],
                }
            ],
            // 布局
            grid:{
                left:-12,
                top:0,
                right:0,
                bottom:0
            }
        })
    }
}
</script>

<style>
.charts {
    width: 280px;
    height: 100%;
}

</style>