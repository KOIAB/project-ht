<template>
  <div>
    <!-- 布局 -->
   <el-row>
    <!-- 卡片 -->
        <el-col :span="12" style="padding-right:10px">
            <Search/>
        </el-col>

        <el-col :span="12">
            <Category/>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './Search'
import Category from './Category'
export default {
    name:'Observe',
    components:{
        Search,
        Category
    }
}
</script>

<style scoped>
</style>