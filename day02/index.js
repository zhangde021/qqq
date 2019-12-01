#!/usr/bin/env node


const program = require('commander');
const package = require("./package.json")
const inquirer = require("inquirer")
const fs = require("fs")

program.version(package.version, "-v,--version")
    .option("-a,--add", "add new user")
program.parse(process.argv)

if (program.add) {
    var data = fs.readFileSync("./list.json");
    data = JSON.parse(data.toString())


    const programlist = [
        {
            type: "input",
            message: "姓名:",
            name: "name",
            default: "test-user"
        },
        {
            type: "list",
            message: "性别:",
            name: "mag",
            choices: ["男", "女"],
            filter: function (val) {
                return val
            }
        },
        {
            type: "input",
            message: "身份证号:",
            name: "ip",
            validate: function (val) {
                console.log(val);
                
                if (val.match(/\d{18}/g) && data.some(item => item.ip == val) == false) {
                    return true
                }
                return "身份证号已经被注册"
            }
        }


    ];
    inquirer.prompt(programlist).then(answers => {
        console.log(answers)
        data.push(answers);
        fs.writeFileSync("./list.json", JSON.stringify(data));
    })

}




