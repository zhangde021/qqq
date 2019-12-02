const Koa =require("koa")
const app=new Koa();

const static=require("koa-static")


app.use(static(path.join(process.cwd())))

app.use(async (ctx,next)=>{
    let startTime=new Date()*1
    console.log("第一层开始")
    await next();
    console.log("第一层结束")
    let endTime=new Date()*1
    let times =endTime-startTime
    console.log(times)
})
app.use(async (ctx, next) => {
    console.log("第二层开始")
    await next();
    console.log("第二层结束")
})
function bodly(){
    return new Promise((resolve,reject)=>{
 setTimeout(()=>{
        // console.log(111)
     resolve("111")
    },5000)

    })
   
}
app.use(async (ctx, next) => {
    console.log("第三层开始")
 let info= await bodly()
   console.log(info)
    console.log("第三层结束")
})
app.listen("3030",()=>{
    console.log("端口号3030")
})









