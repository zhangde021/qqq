#! /usr/bin/env node


let argv=process.argv.slice(2)

let {version}=require("../package.json")

let port=8080

if(argv[0]==="-v"||argv[0]=="--version"){
    console.log(version)
}else{
    port = argv[1] ? argv[1] : port
    app.listen(port,()=>{
        console.log("服务启动成功")
    })
}




