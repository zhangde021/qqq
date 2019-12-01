#! /usr/bin/env node


const program=require("commander")
const http=require("http")
const package=require("../package.json")
program.version(package.version,"-v,-cersion")
.option("-p,-postHttp","npm server")
program.parse(process.argv[2])
if(process.argv[2]=="-p"||process.argv[2]==undefined){
   var hostName="127.0.0.1"
   var port=process.argv[3]==undefined?8080:process.argv[3]
   var server=http.createServer((req,res)=>{
       res.setHeader("Content-Type","text/plain");
       res.end("hello nodejs")
   });
   server.listen(port,hostName,()=>{
       console.log(`服务器运行在http://${hostName}:${port}`)
   })
}