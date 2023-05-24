<template>
<div>
    <div class="header">
        <span>{{title}}</span>
        <svg t="1684309870645" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2843" width="16" height="16"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m36.571429 268.190476v292.571428h-73.142858V438.857143h73.142858z m0-121.904762v73.142857h-73.142858v-73.142857h73.142858z" p-id="2844" fill="#8a8a8a"></path></svg>
    </div>

    <div class="content">
        <span class="one">{{data1}}</span>
        <span class="two">{{data2}}</span>
        <slot name="content"></slot>
        
    </div>

    <div class="footer">
        <div class="charts" ref="charts"></div>
    </div>
  </div>
    
</template>

<script>
import *as echarts from 'echarts'
export default {
    name:'lineCharts',
    data() {
        return {
            charts:null,
            // data:[78,7,88,12,35,27,85,75,10,75]
        }
    },
    props:['title','data1','data3','data2'],
   /*  props:{
        'data3':Array,
        'title':String,
        'data1':Number,
        'data2':Number,
    }, */
    /* watch:{
        data3:{
            immediate:true,
            handler(newValue,oldValue){
                console.log(newValue);
                this.data=newValue
                this.getCharts()
            }
        }
    }, */
    computed:{
    },
    mounted(){
        this.charts = echarts.init(this.$refs.charts)
        this.getCharts()
    },
    methods:{
        getCharts(){
            // 配置数据
        this.charts.setOption({
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
                    data:JSON.parse(this.data3),
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
}
</script>

<style scoped>
 .charts{
    width: 100%;
    height: 60px;
 }
  .header{
    display: flex;
    margin-bottom: 20px;
  }
 .header span{
    margin-right: 10px;
    color: rgb(166, 166, 166);
    font-size: 14px;
 }
 .content .one{
    font-size: 18px;
    margin-right: 30px;
 }
 .content .two{
    font-size: 14px;
    color: rgb(166, 166, 166);
 }
</style>