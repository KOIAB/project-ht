<template>
  <div>
    <el-card>
      <div slot="header">
        <div class="category-header">
          <span>销售额类别占比</span>
          <el-radio-group v-model="radio1">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div>
        <div class="charts" ref="charts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import *as echarts from 'echarts'
export default {
  name: "Category",
  data() {
    return {
        radio1:''
    }
  },
  mounted(){
    let mycharts=echarts.init(this.$refs.charts)
    mycharts.setOption({
        title:{
            text:'视频',
            subtext:1048,
            left:'center',
            top:'center'
        },
        tooltip: {
        trigger: 'item'
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'outside'
            },
            labelLine: {
                show: true
            },
            data: [
                { value: 1048, name: '视频' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ]
            }
        ]
    });
    // 绑定事件
    mycharts.on('mouseover',(params)=>{
        // 获取鼠标移上的数据
        const {name,value} = params.data
        // 重新设置标题
        mycharts.setOption({
            title:{
                text:name,
                subtext:value,
            }
        })
    })
  }
};
</script>

<style scoped>
.category-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.charts{
    width: 100%;
    height: 300px;
}
</style>