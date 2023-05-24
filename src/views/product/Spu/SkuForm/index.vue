<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{spu.spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="名称" width="width">
            <template slot-scope="{row,$index}">
              <span>{{row.imgName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" v-if="row.isDefault==0" @click="changeDefault($index)">设为默认</el-button>
              <el-button size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'SkuForm',
    data() {
      return {
        spuImageList:[],
        spuSaleAttrList:[],
        attrInfoList:[],
        skuInfo:{
          // 父组件给的数据
          "category3Id": 0,
          "spuId": 0,
          "tmId": 0,
          // 需要收集的数据
          "price": 0,
          "weight": "",
          "skuName": "",
          "skuDefaultImg": "string",//默认图片
          "skuDesc": "",
          // 平台属性
          "skuAttrValueList": [
            // {
            //   // "attrId": 0,
            //   // "valueId": 0,
            // }
          ],
          // 销售属性
          "skuImageList": [
            // {
            //   "imgName": "string",
            //   "imgUrl": "string",
            //   "isDefault": "string",
            //   "skuId": 0,
            //   "spuImgId": 0
            // }
          ],
          // 销售属性
          "skuSaleAttrValueList": [
            // {
            //   "saleAttrId": 0,
            //   "saleAttrValueId": 0,
            // }
          ]   
        },
        spu:{},
        // 收集勾选图片数据,带给服务器还要加一个字段isDefualt
        imageList:[]
      }
    },
    methods:{
      async getData(category1Id,category2Id,spu){
        this.skuInfo.category3Id=spu.category3Id
        this.skuInfo.spuId=spu.id
        this.skuInfo.tmId=spu.tmId
        this.spu=spu
        // 获取图片数据
        let result = await this.$API.spu.reqSpuImageList(spu.id)
        if(result.code==200){
          let list=result.data
          list.forEach(item=>{
            item.isDefault = 0
          })
          this.spuImageList=list
        }
        // 获取销售属性数据
        let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
        if(result1.code==200){
          this.spuSaleAttrList=result1.data
        }
        // 获取平台属性数据
        let result2 = await this.$API.spu.reqAttrInfoList(category1Id,category2Id,spu.category3Id)
        if(result2.code==200){
          this.attrInfoList=result2.data
        }
      },
      // table表格复选框按钮事件
      handleSelectionChange(params){
        // params是所勾选的元素，带给服务器还要加一个字段isDefualt
        this.imageList=params
      },
      // 排他
      changeDefault($index){
        this.spuImageList.forEach(item=>{
          item.isDefault=0
        })
        this.spuImageList[$index].isDefault=1
        // 收集默认图片地址
        this.skuInfo.skuDefaultImg=this.spuImageList[$index].imgUrl
      },
      // 取消按钮回调
      cancel(){
        // 触发自定义事件，场景为0
        this.$emit('changeScene',{scene:0,flag:'修改'})
        // 清除数据，避免数据回显
        Object.assign(this._data,this.$options.data())
      },
      // 保存按钮回调
      async save(){
        // 整理参数
        // 平台属性(最好拿出来，这样就不用考虑响应式了)
        const {attrInfoList,skuInfo,spuSaleAttrList,imageList} =this
        /* attrInfoList.forEach(item=>{
          // 当前平台属性用户进行了选择
          if(item.attrIdAndValueId){
            const [attrId,valueId] = item.attrIdAndValueId.split(':')
            skuInfo.skuAttrValueList.push({attrId,valueId})
          }
        }) */
        skuInfo.skuAttrValueList=attrInfoList.reduce((prev,item)=>{
            if(item.attrIdAndValueId){
              const [attrId,valueId] = item.attrIdAndValueId.split(':')
              prev.push({attrId,valueId})
            }
            return prev
        },[])
        // 销售属性
        skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
            if(item.attrIdAndValueId){
              const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(':')
              prev.push({saleAttrId,saleAttrValueId})
            }
            return prev
        },[])
        // 整理图片数据
        skuInfo.skuImageList=imageList.map(item=>{
          return {
            imgName:item.imgName,
            imagUrl:item.imagUrl,
            isDefault:item.isDefault,
            spuImgId:item.id
          }
        })
        // 发请求
        let result = await this.$API.spu.reqAddSku(skuInfo)
        if(result.code==200){
          this.$message({type:'success',message:'添加SKU成功'})
          // 触发自定义事件，场景为0
          this.$emit('changeScene',{scene:0,flag:'修改'})
          // 清除数据，避免数据回显
          Object.assign(this._data,this.$options.data())
        }else{
          this.$message({type:'error',message:'添加SKU失败'})
        }
      }
    },
}
</script>

<style>

</style>