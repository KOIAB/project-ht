<template>
    <el-card>
        <div slot="header">
            <div class="search-header">
                <span>线上热门搜索</span>
                
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item >双皮奶</el-dropdown-item>
                        <el-dropdown-item >蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <div>
            <el-row :gutter="10">
                <el-col :span="12">
                    <lineCharts title="人均搜索次数" data3='[78,7,88,12,35,27,85,75,10,75]' data1='2.7' data2='26.2'>
                        <template slot="content">
                            <svg t="1684314604450" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4112" width="12" height="12"><path d="M928 721.8L510.8 304.5l-416 416 833.2 1.3z m0 0" p-id="4113" fill="#d81e06"></path></svg>
                        </template>
                    </lineCharts>
                </el-col>
                <el-col :span="12">
                    <lineCharts title="搜索用户数" data3='[5,7,88,12,35,27,85,75,10,75]' data1='12321' data2='17.1'>
                        <template slot="content">
                            <svg t="1684314707394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4361" width="12" height="12"><path d="M94.8 304.5L512 721.8l416-416-833.2-1.3z m0 0" p-id="4362" fill="#1afa29"></path></svg>
                        </template>
                    </lineCharts>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table  style="width: 100%" >
                <el-table-column label="排名" width="180">
                </el-table-column>
                <el-table-column label="搜索关键字" width="180">
                </el-table-column>
                <el-table-column label="用户数" sortable >
                </el-table-column>
                <el-table-column label="周涨幅" sortable >
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
              <el-pagination class="pagination"
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
        </div>
    </el-card>
</template>

<script>
import  lineCharts from './lineCharts'
export default {
    name:'Search',
    components:{
        lineCharts
    }
}
</script>

<style>
 .search-header{
    display: flex;
    justify-content: space-between;
 }
 .pagination{
    float: right;
 }

</style>