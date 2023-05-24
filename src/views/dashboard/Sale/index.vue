<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <!-- 头部左侧 -->
         <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
            <el-tab-pane label="销售额" name="sale"></el-tab-pane>
            <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="right">
            <span @click="setDay">本日</span>
            <span @click="setWeek">本周</span>
            <span @click="setMonth">本月</span>
            <span @click="setYear">本年</span>
            <el-date-picker class="date" size='mini'
                v-model="date"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始月份"
                end-placeholder="结束月份">
            </el-date-picker>
        </div>
    </div>
    <div class="body">
        <el-row :gutter="10">
            <el-col :span="18">
                <div class="charts" ref="charts"></div>
            </el-col>
            <el-col :span="6">
                <span>门店{{title}}排名</span>
                <ul>
                    <li>
                        <span class="rindex">1</span>
                        <span class="one">肯德基</span>
                        <span class="tow">323,234</span>
                    </li>
                    <li>
                        <span class="rindex">2</span>
                        <span class="one">麦当劳</span>
                        <span class="tow">323,234</span>
                    </li>
                    <li>
                        <span class="rindex">3</span>
                        <span class="one">肯德基</span>
                        <span class="tow">323,234</span>
                    </li>
                    <li>
                        <span >4</span>
                        <span class="one">海底捞</span>
                        <span class="tow">323,234</span>
                    </li>
                    <li>
                        <span >5</span>
                        <span class="one">汉堡王</span>
                        <span class="tow">323,234</span>
                    </li>
                    <li>
                        <span >6</span>
                        <span class="one">德克士</span>
                        <span class="tow">323,234</span>
                    </li>
                    <li>
                        <span >7</span>
                        <span class="one">真功夫</span>
                        <span class="tow">323,234</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
  </el-card>
</template>

<script>
import *as echarts from 'echarts'
import dayjs from 'dayjs'
import {mapState} from 'vuex'
export default {
    name:'Sale',
    data() {
        return {
            activeName:'sale',
            cahrts:null,
            date:''
        }
    },
    computed:{
        title(){
            return this.activeName=='sale'?'销售额':'访问量'
        },
        ...mapState({
            listState: state=> state.home.list
        })
    },
    mounted(){
        this.createCharts()
    },
    watch:{
        
    },
    methods:{
        createCharts(){
            this.charts = echarts.init(this.$refs.charts)
            this.charts.setOption({
                title:{
                    text:this.title+'趋势',
                    textStyle:{
                        fontSize:14
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                xAxis:{
                     type: 'category',
                    data: this.activeName=='sale'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis:{
                    min:0,
                    max:500
                },
                series:[
                    {
                        type:'bar',
                        // 柱状图宽度
                        barWidth:30,
                        data:[400,90,200,390,390,30,400,90,200,390,390,30]
                    }
                ],
                  grid: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    containLabel: true
                },
            })
        },
        handleClick(){
            this.charts.setOption({
                title:{
                    text:this.title+'趋势'
                },
                xAxis:{
                    data: this.activeName=='sale'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis,
                },
                series:[
                    {
                        type:'bar',
                        // 柱状图宽度
                        barWidth:30,
                        data:this.activeName=='sale'?this.listState.orderFullYear:this.listState.userFullYear
                    }
                ]
            })
        },
        setDay(){
            const day = dayjs().format('YYY-MM-DD')
            this.date=[day,day]
        },
        setWeek(){
            const start = dayjs().day(1).format('YYY-MM-DD')
            const end = dayjs().day(7).format('YYY-MM-DD')
            this.date=[start,end]
        },
        setMonth(){
            const start = dayjs().startOf('month').format('YYY-MM-DD')
            const end = dayjs().endOf('month').format('YYY-MM-DD')
            this.date=[start,end]
        },
        setYear(){
            const start = dayjs().startOf('year').format('YYY-MM-DD')
            const end = dayjs().endOf('year').format('YYY-MM-DD')
            this.date=[start,end]
        }
    }
}
</script>

<style scoped> 
.box-card{
    margin:10px 0;
}
/* 深度选择器 可以将自定义属性取消 */
>>>.el-card__header{
  border-bottom: none;
}
>>>.el-card__body{
    padding: 0 20px 40px;
}
>>>.el-tabs__item{
  font-size: 16px;
}
.clearfix{
    position: relative;
    display: flex;
}
.tab{
    width: 100%;
}
.right{
    position: absolute;
    right: 0;
    font-size: 14px;
}
.right span{
    margin:0 10px;
}
.date{
    width:220px;
    margin:0 20px
}
.charts{
    width: 100%;
    height: 300px;
}
ul{
    list-style: none;
    width: 100%;
    height: 250px;
    padding: 0 0 0 8px;
}
.body span{
    font-size: 14px;
}
ul li{
    height: 17%;
    display: flex;
    justify-content: space-between;
}
ul li .one{
    margin-right: 100px;
}
.rindex{
    width: 15px;
    height: 15px;
    border-radius:50% ;
    background: black;
    color: white;
    padding-left: 3px;
}
</style>