
<template>
<div class="home">
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="用户名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="密码"
      prop="paw">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
         操作
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">删除</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="dialogFormVisible = true">添加</el-button>
      </template>
    </el-table-column>
  </el-table>

 <el-pagination
        background
        layout="prev, pager, next"
        :page-size="limit"
        :total="total"
        @current-change="change"
        >
    </el-pagination>
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.paw" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="curAdd">确 定</el-button>
        </div>
    </el-dialog>
      </div>
</template>

<script>
import axios from "axios"
  export default {
    data() {
      return {
        tableData: [],
    
        pagenum:1,
        limit:2,
        total:0,
        dialogFormVisible : false,
        form:{
          name:"",
          paw:""
        },
         formLabelWidth: '120px'
      }
    },
    created(){
this.getData()
       
    },

    
    methods: {

      getData(){
  axios.get("/api/userlist",{pagenum:this.tableData.pagenum,limit:this.tableData.limit}).then((res)=>{
          if(res.data.code==1){
             this.tableData=res.data.data
          }
          
         
         })
      },
      handleDelete(row) {
     this.dialogFormVisible = true
     this.form={...row}
      },
   handleEdit(row) {
       axios.get("/api/del",{params:{id:row.id}}).then(res=>{
         if(res.data.code==1){
           alert("删除成功")
           this.getData()
         }else{
           alert(res.data.msg)
         }
       })
      }
    },

change(curPage){
  console.log(curPage)
  this.pagenum=curPage
  this.getData()
},
curAdd(){
  if(this.form.name&&this.form.paw){
    let url=""
    if(this.form.id||this.form.id==0){
url="/api/upd"
    }else{
      url="/api/add"
    }

    axios.post(url,{...this.form}).then(res=>{
      if(res.data.code==1){
        alert(res.data.msg);
        this.getData()
      }else{
        alert(res.data.msg)
      }
  this.dialogFormVisible = false;
  this.form = {
                    username:'',
                    password:'',
                    phone:'',
                    id:''
                }
    })
  }else{
    alert("参数错误")
  }
}



  }
</script>

<style scoped lang='scss'>

</style>