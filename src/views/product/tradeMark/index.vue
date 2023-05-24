<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px" @click="showDialog">添加</el-button>
    <!-- 
      表格组件 
      data:表格组件将来需要展示的数据---数组类型
      boder:表格添加边框属性
      data:要展示的数据
      cloumn的属性
      lable：显示标题
      width:对应列的宽度
      aligin：标题对齐方式
      注意：elemenUI当中table组件展示数据是一列一列进行展示的
    -->
    <el-table style="width: 100%" border :data="list">
      <!-- 代表几列 -->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column label="品牌LOGO" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      分页器 
      当前第几页，数据总条数，连续页码数
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      current-page:代表分页器当前第几页
      tatal：代表分页器一共需要展示几条数据
      page-size：代表分页器一页需要展示多少条数据
      page-sizes：可以设置每一页展示多少条数据
      page-count:按钮数（连续页码+2）
      layout：实现分页器布局
    -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :page-count="7"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 
      对话框 
      :visible.sync:控制对话框显示与隐藏
      :model:把表单的数据收集到哪个身上,将来表单验证要用
      :action:设置图片上传的地址
      :on-success:可以检测到图片上传成功，上传成功会执行一次
      :before-upload：上传图片之前会执行一次
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
    -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form表单 -->
      <el-form style="width:80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
        
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdataTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradMark",
  data() {
    // 自定义校验规则
    let validateTmName=(rule,value,callback)=>{
      if(value.length<2||value.length>10){
        callback(new Error('品牌名称为2-10位'))
      }else{
        callback()
      }
    }
    return {
      page: 1, //分页器第几页
      limit: 3, //当前分页器展示数据条数
      total: 0, //总共数据条数
      list: [], //列表展示数组
      dialogFormVisible:false,//对话框显示与隐藏
      tmForm:{
        tmName:'',
        logoUrl:''
      },//收集品牌信息
      // 表单验证规则 :model="tmForm"el-form上必须有
      rules:{
        // 品牌名称验证规则
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // 自定义校验规则
          { validator: validateTmName , trigger: 'change'}
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌图片', trigger: 'change' }
        ],
      }
    };
  },
  // 组件挂载完毕发请求
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表数据(默认参数是1)
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构出参数(对象解构参数名要一致)
      const { page, limit } = this;
      // 获取品牌列表接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 分页器某一页展示数据条数发生 变化时触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 显示对话框
    showDialog(){
      // 清除数据
      this.tmForm={tmName:'',logoUrl:''}
      this.dialogFormVisible=true
    },
    // 修改某一个品牌
    updateTradeMark(row){
      // 显示对话框
      this.dialogFormVisible=true
      // tmForm存储的就是服务器返回的信息，浅拷贝list遍历的item(row)(list[0]对象，所以指向同一个地址)和tmForm指向同一个地址
      // this.tmForm=row错误
      this.tmForm={...row}
    },
    //upload上传图片回调
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // res, file上传成功之后服务器返回的数据
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl=res.data
    },
      // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 添加按钮
    addOrUpdataTradeMark(){
      // 当全部验证字段通过，再去书写业务逻辑
      this.$refs.ruleForm.validate(async (success)=>{
        if(success){
          this.dialogFormVisible = false
          // 发请求：添加品牌，修改品牌
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if(result.code==200){
            // 弹出 信息：添加品牌成功，修改品牌成功
            this.$message({
              type:'success',
              message:this.tmForm.id?'修改品牌成功':'添加品牌成功',
            })
            // 重新获取品牌列表，没有传参默认第一页（pager=1）
            this.getPageList(this.page)
          }else{
            alert('添加品牌失败')
            }
        }else{
          console.log('error submit!!');
          return false
        }
      })
    },
    // 删除品牌
    deleteTradeMark(row){
      this.$confirm(`你确定删除${row.tmName}品牌`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code==200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getPageList(this.list.length>1?this.page:this.page-1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style scoped>
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>