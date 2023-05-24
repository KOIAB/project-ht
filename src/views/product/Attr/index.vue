<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show='!isShowTable'/>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin-right: 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addArreValue" :disabled='!attrInfo.attrName'>添加属性值</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table style="width: 100%;margin:20px 0" border :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop='prop' label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <!-- 这里的结构需要用到span和input的切换 -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" 
              @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)"  style="display:block">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop='prop' label="操作" width="width">
            <template slot-scope="{row,$index}">
               <!--气泡确认框  -->
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm='deleteAttrValue($index)'>
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled='attrInfo.attrValueList.length<1'>保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash里的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      // 收集新增属性|修改属性使用
      attrInfo:{
        "attrName": "",
        "attrValueList": [
          // {
          //   "attrId": 0,//属性Id
          //   "valueName": ""
          // }
        ],
        "categoryId": 0,//3Id
        "categoryLevel": 3,
      }
    };
  },
  methods: {
    getCategoryId(getCategoryId) {
      if (getCategoryId.leval == 1) {
        this.category1Id = getCategoryId.categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (getCategoryId.leval == 2) {
        this.category2Id = getCategoryId.categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类id有了
        this.category3Id = getCategoryId.categoryId;
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值
    addArreValue(){
      this.attrInfo.attrValueList.push({
        attrId:this.attrInfo.id,// attrId:是相应的属性的id，目前还没有相应的属性id，所以带undefined
        valueName:'',
        flag:true,//flag属性：给每一个属性添加一个flag标记，用户查看模式与编辑模式之间切换，自己的flag控制自己的模式切换，flag是响应式数据
      })
      this.$nextTick(()=>{
        let index = this.attrInfo.attrValueList.length-1
        this.$refs[index].focus()
      })
    },
    // 添加属性按钮回调
    addAttr(){
      this.isShowTable = false//切换table显示与隐藏
      // 清除数据
      this.attrInfo={
        "attrName": "",
        "attrValueList": [],
        "categoryId": this.category3Id,//3Id
        "categoryLevel": 3,
      }
    },
    // 修改属性回调
    updateAttr(row){
      this.isShowTable = false
      // 修改数据
      this.attrInfo=cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item=>{
        // 这样写可以给属性添加flag，但是不是响应式的
        // item.flag=false
        // 应为vue无法探测到普通的新增property
        this.$set(item,'flag',false)
      })
    },
    // 失去焦点的回调
    toLook(row){
      // 新增属性值不能为空
      if(row.valueName.trim()==''){
        this.$message('请正常输入属性值')
        return
      }
      // 新增属性值不能重复,返回布尔值
      let isRepat=this.attrInfo.attrValueList.some(item=>{
        if(row!=item){
          return item.valueName==row.valueName//相等为真
        }
      })
      if(isRepat){
        this.$message('请勿重复输入属性值')
        return
      }
      row.flag=false
    },
    // 点击span的回调
    toEdit(row,index){
      row.flag=true
      // 获取input节点，实现自动聚焦
      // 注意，点击span的时候，切换为inpu，但是浏览器的重绘需要时间，我们不可能一点击span就获取到input
      // 此事件的节点渲染完毕会执行一次
      this.$nextTick(()=>{
        // 表单元素的聚焦
        this.$refs[index].focus()
      })
    },
    // 删除属性值
    deleteAttrValue(index){
      // 当前删除属性是不需要发请求的
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 保存按钮进行添加或修改属性
    async addOrUpdateAttr(){
      // 整理参数，如果用户添加了很多属性值，属性值为空不应该提交，不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        // 返回一个新的数据
        // 过滤掉属性值不为空的
        if(item.valueName!=''){
          delete item.flag;
          return true
        }
      })
      // 发请求
      let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
      if(result.code==200){
        // 展示平台属性列表
        this.isShowTable=true
        // 提示消息
        this.$message({type:'success',message:'保存成功！'}) 
        // 保存成功再次获取平台属性进行展示
        this.getAttrList()
      }else{
        this.$message({type:'error',message:'保存失败！'})
      }
    },
    // 删除属性回调
    async deleteAttr(row){
      try {
        await this.$API.attr.reqDeleteAttr(row.id)
        this.$message({type:'success',message:'删除属性成功！'})
        this.getAttrList()
      } catch (error) {
        this.$message({type:'error',message:'删除属性失败！'})
      }
    }
  },
};
</script>

<style scoped>
</style>

