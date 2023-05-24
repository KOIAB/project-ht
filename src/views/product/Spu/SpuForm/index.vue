<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 
          list-type：文件列表类型
          :on-preview：图片预览时触发
          :on-remove：图片删除时触发
          file-list:展示照片墙数据，必须有name，和url属性
          :on-preview：图片预览功能（props传递函数）
          :on-remove：删除图片时会触发
         -->
        <el-upload
          action="dev-api/admin/product/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="120px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- 
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
               -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm(row)">
              </el-input>
              <!--  @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="120px">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddOrUpdateSpu">保存</el-button>
        <el-button @click="cansul">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 存储spu信息属性
      spu:{
        "category3Id": 0,
        "description": "",
        "spuName": "",
        "tmId": '',
        "spuImageList": [
          
        ],
        "spuSaleAttrList": [
          
        ],
      },
      tradeMarkList:[],
      spuImageList:[],
      saleAttrList:[],
      attrIdAndAttrName:'',//收集未选择的销售属性id
    };
  },
  computed:{
    unSelectSaleAttr(){
      // 数组的过滤
      let result = this.saleAttrList.filter(item=>{
        // evey方法返回bool值
        return this.spu.spuSaleAttrList.every(item1=>{
          return item.name!=item1.saleAttrName
        })
      })
      return result
    }
  },
  methods: {
    // 删除图片时触发
    handleRemove(file, fileList) {
      // file代表删除的那张图对象，fileList：剩下的图片的spuImageList
      console.log(file, fileList);
      // 收集照片墙图片的数据(对于照片墙而言：有name，url字段，对于服务器而言不需要这两个字段)
      this.spuImageList=fileList
    },
    // 图片上传成功的回调response：上传是否成功以及图片在服务器上的路径，服务器返回的信息, file：上传图片的信息(对象里的字段是element规定的), fileList：上传成功后所有图片的信息
    handleSuccess(response, file, fileList){
      this.spuImageList=fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加新的销售属性
    addSaleAttr(){
      // 把收集到的attrIdAndAttrName进行分割
      let [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':')
      // 向spu对象的spuSaleAttrList数组添加对象
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 清空attrIdAndAttrName
      this.attrIdAndAttrName=''
    },
    // 添加属性值按钮回调
    addSaleAttrValue(row){
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
    },
    // 失去焦点回调
    handleInputConfirm(row){
      const {baseSaleAttrId,saleAttrName,inputValue} = row
      // 新增销售属性值的名称不能未空
      if(inputValue==''){
        this.$message({type:'error',message:'输入的属性值不能为空'})
        return;
      }
      // 新增销售属性值的名称不能重复
      let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)//只要有一个等于就是false
      if(!result){
        this.$message({type:'error',message:'输入的属性值不能重复'})
        return;
      }
      let newAttrValue = {baseSaleAttrId,saleAttrName,saleAttrValueName:inputValue}
      row.spuSaleAttrValueList.push(newAttrValue)
      row.inputVisible=false
    },
    // 保存按钮回调
    async AddOrUpdateSpu(){
      // 整理参数，照片墙（imgName,imgUrl）
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return{
          imgName:item.name,
          imgUrl:item.response?item.response.data:item.url
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if(result.code==200){
        this.$message({type:'success',message:'保存成功'})
        
        // 回到场景0
        this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
      }else{
        this.$message({type:'error',message:'保存失败'})
      }
    },
    // 取消按钮的回调
    cansul(){
        this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
    },
    //初始化spuForm数据
    async initSpuData(spu){
        // 获取spu信息数据
        let spuResult = await this.$API.spu.reqSpu(spu.id)
        if(spuResult.code==200){
            this.spu=spuResult.data
        }
        // 获取品牌信息
        let tradeMarkResult =await this.$API.spu.reqTradeMarkList()
        if(tradeMarkResult.code==200){
           this.tradeMarkList=tradeMarkResult.data 
        }
        // 获取spu图片
        let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
        if(spuImageResult.code==200){
            let listArr =spuImageResult.data
            listArr.forEach(item=>{
              item.name=item.imgName
              item.url=item.imgUrl
            })
            this.spuImageList=listArr
        }
        // 获取平台全部销售属性
        let saleResult =await this.$API.spu.reqbaseSaleAttrList()
        if(saleResult.code==200){
            this.saleAttrList=saleResult.data
        }
    },
    //点击添加spu按钮的时候， 初始化数据
    async addSpuData(category3Id){
      //  清空数据
      // this._data,可以操作data中响应式数据
      // this.$options.data()，可以获取配置对象，配置对象的data函数执行，返回响应式数据为空
      Object.assign(this._data,this.$options.data())
      this.spu.category3Id=category3Id
      // 获取品牌信息
        let tradeMarkResult =await this.$API.spu.reqTradeMarkList()
        if(tradeMarkResult.code==200){
           this.tradeMarkList=tradeMarkResult.data 
        }
        // 获取平台全部销售属性
        let saleResult =await this.$API.spu.reqbaseSaleAttrList()
        if(saleResult.code==200){
            this.saleAttrList=saleResult.data
        }
    }
  },
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>