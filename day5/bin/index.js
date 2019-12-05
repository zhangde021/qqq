

const Koa=require("koa")
const app=new Koa()
const path=require("path")
// const static=require("koa-static")
const query = require("../db/index.js")
const bodyParser = require('koa-bodyparser'); 
const Router =require("koa-router")
 var router = new Router();
// app.use(static(path.join(__dirname,"public")))

app.use(bodyParser());

app
    .use(router.routes())
    .use(router.allowedMethods());
//查找数据库数据
router.get("/api/list",async (ctx,next)=>{
    try{
        let list = await query("select * from datas");
        console.log(list)
        ctx.body={
            code:1,
            data:list
        }


    }catch(e){
        ctx.body={
            code:0,
            msg:e
        }

    }
  
    console.log(ctx.body)
})
//给数据库添加数据
router.post("/api/add", async (ctx,next)=>{
    console.log(ctx.request.body)
    let { name, paw } = ctx.request.body
  
    if(name&&paw){
  let user = await query("select * from datas where name=? ",[name])
        //    console.log(user)
      if(user.length){
          ctx.body={
              code:2,
              msg:"此用户已存在,请重新注册"
          }
      }else{
            try{
            await query("insert into datas (name,paw) values (?,?)",[name,paw])
               ctx.body={
                   code:1,
                   msg:"添加成功"
               }

        }catch(e){
          ctx.body={
              code:0,
              msg:e
          }
        }
      }

    
    }else{
        ctx.body={
            code:2,
            msg:"缺失参数"
        }
    }
})
//删
router.get("/api/del", async (ctx,next)=>{
    let {id}=ctx.query
    if(id){
        await query("delete from datas where id=?", [id])
        ctx.body={
            code:1,
            msg:"删除成功"
        }
    }else{
        ctx.body = {
            code: 2,
            msg: "缺失参数"
        }
    }
})

//修改  
  router.post("/api/update", async (ctx)=>{
      let { name, paw,id } = ctx.request.body 
           if(name&&paw){
               try{
               await query("updata datas set name=?,paw=? where id=?",[name,paw,id])
                 ctx.body={
                     code:1,
                     msg:"修改成功"
                 }

               }catch(e){
          ctx.body={
            code:2,
            msg:"修改失败"
            }
               }

           }else{
               ctx.body={
                   code:2,
                   msg:"缺失参数"
               }
           }
  })  
// 分页 

   router.get("/api/userlist",async (ctx)=>{
       let {pagenum=1,limit=2}=ctx.query;
       try{
           let startIndex = (pagenum-1)*limit
           let total=await query("select count(*) from datas");
           let list = await query(`select * from datas limit ${startIndex},${limit}`)
            ctx.body={
                code:1,
                data:list,
                total:total[0]["count(*)"]
            }

       }catch(e){
           ctx.body={
               code:0,
               msg:e
           }
       }
   })


app.listen(3000,()=>{
    console.log("服务启动成功")
})
