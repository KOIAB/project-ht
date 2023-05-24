<template>
<!-- 容器 -->
  <div class="charts" ref="charts">

  </div>
</template>

<script>
import *as echarts from 'echarts'
export default {
    name:'progressCharts',
    mounted(){
        // 初始化echarts实例
        let lineCharts=echarts.init(this.$refs.charts)
        // 配置数据
        lineCharts.setOption({
            xAxis:{
                show:false,
                // 最小值与最大值的设置
                min:0,
                max:100
            },
            yAxis:{
                show:false,
                // 均分
                type: 'category',
            },
            // 系列
            series:[
                {
                    type:'bar',
                    data:[78],
                    // 柱状图宽度
                    barWidth:10,
                    color:'yellowgreen',
                    // 背景颜色
                    showBackground:true,
                    backgroundStyle:{
                        color:'#eee'
                    },
                    // 文本
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right',
                        color:'yellowgreen'
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

<style>
.charts {
    width: 280px;
    height: 100%;
}

</style>