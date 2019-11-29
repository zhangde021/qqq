## 1> 用npm 发包
   # 先建一个文件夹  创建package.js文件 ,再建一个入口文件index.js  
   # 把npm的淘宝镜像改成国外的   国外：http://registry.npmjs.org/    淘宝：https://registry.npm.taobao.org
   # 登录  npm login   输入用户 ,密码,邮箱  
   #  发包  npm publish  
   #   删除包  (只能在发包的24小时内才能删除)  npm unpublish  包名 --force


## 2> commonjs规范 :
  # 抛出模块 :
  # module.exports 和 exports 的区别 和关系:

   # exports是module.exports 的别名  

   # module.exports : 后写的会覆盖先写的

   # exports : 以属性的形势添加,不能直接赋值;
   # 引入模块:require() 默认他会找 module.exports  抛出的内容 (对象)
   # require()  两种引入方式     路径     包名



## 3> git  
# git init  生成git环境  一个项目中.git文件只能有一个
  #  git clone  路径  先把 文件荡下来 
 #   git add .   要传的所有文件
 #  git commit -m "描述"   描述文件
 #  git push origin master   把文件push到github 中 

