<template>
  <div>
    <!-- el网格布局 -->
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
                <Detail title='总销售额' count='￥ 126560'>
                    <!-- 作用域插槽结构 -->
                    <template slot="charts">
                        <div class="text">
                            <span>周同比&nbsp;&nbsp;&nbsp;56.67%&nbsp;</span>
                            <svg t="1684314604450" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4112" width="12" height="12"><path d="M928 721.8L510.8 304.5l-416 416 833.2 1.3z m0 0" p-id="4113" fill="#d81e06"></path></svg>
                            <span>日同比&nbsp;&nbsp;&nbsp;19.96%&nbsp;</span>
                            <svg t="1684314707394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4361" width="12" height="12"><path d="M94.8 304.5L512 721.8l416-416-833.2-1.3z m0 0" p-id="4362" fill="#1afa29"></path></svg>
                        </div>
                    </template>
                    <template slot="footer">
                        <span>日销售量￥ 12423</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card> 
                <Detail title='访问量' count='88460'>
                    <template slot="charts">
                        <lineCharts/>
                    </template>
                    <template slot="footer">
                        <span>日访问量 1234</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title='支付笔数' count='88460'>
                    <template slot="charts">
                        <barCharts/>
                    </template>
                    <template slot="footer">
                        <span>转换率 64%</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title='运营活动效果' count='78%'>
                    <template slot="charts">
                        <progressCharts/>
                    </template>
                    <template slot="footer">
                        <span>周同比&nbsp;&nbsp;&nbsp;56.67%&nbsp;</span>
                        <svg t="1684314604450" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4112" width="12" height="12"><path d="M928 721.8L510.8 304.5l-416 416 833.2 1.3z m0 0" p-id="4113" fill="#d81e06"></path></svg>
                        <span>日同比&nbsp;&nbsp;&nbsp;19.96%&nbsp;</span>
                        <svg t="1684314707394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4361" width="12" height="12"><path d="M94.8 304.5L512 721.8l416-416-833.2-1.3z m0 0" p-id="4362" fill="#1afa29"></path></svg>
                    </template>
                </Detail>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineCharts from './lineChart'
import barCharts from './barChart'
import progressCharts from './progressChart'
export default {
    name:'Cart',
    components:{
        Detail,
        lineCharts,
        barCharts,
        progressCharts
    }
}
</script>

<style>

</style>