<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认照片" width="120" align="center">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="height:70px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" icon="el-icon-bottom" v-if="row.isSale==1" @click="cancel(row)"></el-button>
          <el-button type="info" size="mini" icon="el-icon-top" v-else @click="sale(row)"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      style="text-align:center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total">
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="show" direction="rtl" :before-close="handleClose" :with-header="false" size='50%'>
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag type="success" v-for="attr in skuInfo.skuSaleAttrValueList" :key="attr.id" style="margin-right:10px">{{attr.saleAttrId}}-{{attr.saleAttrValueId}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="width:100%;height:100%">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page:1,
      limit:10,
      records:[],
      total:0,
      skuInfo:{},
      show:false
    }
  },
  mounted(){
    this.getSkuList()
  },
  methods:{
    // 获取sku列表数据
    async getSkuList(pages=1){
      this.page=pages
      const {page,limit} = this
      let result = await this.$API.sku.reqSkuList(page,limit)
      if(result.code==200){
        this.records=result.data.records
        this.total=result.data.total
      }
    },
    handleSizeChange(size){
      this.limit=size
      this.getSkuList()
    },
    // 上架
    async sale(row){
      let result = await this.$API.sku.reqSale(row.id)
      if (result.code==200) {
        this.$message({type:'success',message:'上架成功'})
        row.isSale=1
        // this.getSkuList(this.page)
      }else{
        this.$message({type:'error',message:'上架失败'})
      }
    },
    // 下架
    async cancel(row){
      let result = await this.$API.sku.reqCancel(row.id)
      if (result.code==200) {
        this.$message({type:'success',message:'下架成功'})
        // this.getSkuList(this.page)
        row.isSale=0
      }else{
        this.$message({type:'error',message:'下架失败'})
      }
    },
    // 按钮
    edit(){
        this.$message({type:'info',message:'正在开发中'})
    },
    // 获取sku详情
    async getSkuInfo(sku){
      this.show=true
      let result = await this.$API.sku.reqSkuById(sku.id)
      if(result.code==200){
        this.skuInfo=result.data
      }
    },
    // 抽屉关闭回调
    handleClose(){
      this.show=false
      this.skuInfo={}
    }
  }
};
</script>

<style scoped>
  .el-row .el-col-5{
    font-size:18px;
    text-align: right;
    margin-right: 20px;
  }
  .el-row .el-col-16{
    margin: 2px 0;
    font-size:14px;
    color: rgb(141, 141, 141);
  }
  .el-row{
    margin: 20px 0;
  }
</style>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .el-carousel__button{
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
  }
  .el-carousel__container{
    width: 400px;
    border: 1px silver solid;
  }
  .el-carousel__indicators--horizontal{
    left:40%
  }
</style>