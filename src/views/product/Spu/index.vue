<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <!-- 三级联动组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0" />
    </el-card>
    <!-- 底部有三部分进行切换 -->
    <el-card style="margin-bottom: 20px">
      <!-- 展示spu列表的结构 -->
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 静态title -->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看该spu的全部sku" @click="handler(row)"></hint-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- 
           @size-change="handleSizeChange"某一页条数发生变化就触发
          @current-change="handleCurrentChange"点击页码就触发，并且自动注入参数
         -->
        <el-pagination
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total">
        </el-pagination>
      </div>
      <!-- Dialog -->
      <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" @close='close'>
        <el-table :data="skuList" v-loading="loading">
          <el-table-column label="名称" prop="skuName"></el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
          <el-table-column label="重量" prop="weight"></el-table-column>
          <el-table-column label="默认图片">
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" style="height:100px">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <SpuForm v-show="scene==1" @changeScene='changeScene' ref="spu"/>
      <SkuForm v-show="scene==2" @changeScene='changeScene' ref="sku"/>
    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: "Spu",
  data() {
    return {
      // 分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性,通过scene控制
      // show: true,
      page:1,
      limit:3,
      records:[],//spu列表数据
      total:0,//一共有几条数据
      scene:0,//0:展示SPU列表数据，1：添加修改spu，2：展示添加sku表单
      dialogTableVisible:false,//控制对话框的显示与隐藏
      spu:{},//第三个按钮传入的数据
      skuList:[],
      loading:true
    };
  },
  components:{
    SpuForm,
    SkuForm
  },
  methods: {
    // 获取id自定义事件 categoryId:获取到一二三级id，leval：区分几级id
    getCategoryId({ categoryId, leval }) {
      if (leval == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (leval == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取spu的列表进行展示
        this.getSpuList()
      }
    },
    // 获取spu的方法
    async getSpuList(pages=1){
      this.page=pages
      const {page,limit,category3Id} = this
      let result = await this.$API.spu.reqSpuList(page,limit,category3Id);
      if(result.code==200){
        this.records=result.data.records
        this.total=result.data.total
      }
    },
    // 点击分页器页码的回调,也可以把getSpuList作为该事件回调
    /* handleCurrentChange(page){
      this.page=page
      this.getSpuList()
    } */
    // 展示数据条数发生变化时的回调
    handleSizeChange(size){
      this.limit=size
      this.getSpuList()
    },
    // 添加spu按钮的回调
    addSpu(){
      this.scene=1
      // 通知子组件发请求
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 修改某一个spu
    updateSpu(row){
      // this.show=false
      this.scene=1
      // 获取子组件SpuForm的实例
      this.$refs.spu.initSpuData(row)
    },
    // 自定义事件回调
    changeScene({scene,flag}){
      this.scene=scene
      // 重新获取spu列表数据
      if(flag=='修改'){
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
    },
    // 删除spu按钮回调
    async deleteSpu(row){
      let result=await this.$API.spu.reqDeleteSpu(row.id)
      if(result.code==200){
        this.$message({type:'success',message:'删除成功'})
        this.getSpuList(this.records.length>1?this.page:this.page-1)
      }else{
        this.$message({type:'error',message:'删除失败'})
      }
    },
    // 添加SKU按钮的回调
    addSku(row){
      // 切换场景
      this.scene=2
      // 父组件调用子组件的方法，让子组件发请求，还可以传数据给子组件
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)
    },
    // 点击查看sku列表按钮
    async handler(row){
      this.dialogTableVisible=true
      this.spu=row
      // 获取sku列表数据进行展示
      let result = await this.$API.spu.reqSkuList(row.id)
      if(result.code==200){
        this.skuList=result.data
        this.loading=false
      }
    },
    // 关闭sku列表回调
    close(){
      this.skuList=[]
      this.loading=true
    }
  },
};
</script>

<style scoped>
</style>