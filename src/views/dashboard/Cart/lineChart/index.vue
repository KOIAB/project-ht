<template>
<!-- 容器 -->
  <div class="charts" ref="charts">

  </div>
</template>

<script>
import *as echarts from 'echarts'
export default {
    name:'barCharts',
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
                    type:'line',
                    data:[78,7,88,12,35,27,85,75,10,75],
                    // 折线平滑
                    smooth:true,
                    // 拐点消失
                    itemStyle:{
                        opacity:0
                    },
                    // 线的颜色
                    lineStyle:{
                        color:'rgb(133, 120, 211)'
                    },
                    // 填充颜色(渐变)
                    areaStyle:{
                        color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color:'rgb(133, 120, 211)' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                        }
                    }
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

<style scoped>
.charts {
    width: 280px;
    height: 100%;
}

</style>