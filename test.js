const config = require('./config.json')
const fs = require('fs');
const axios = require('axios');
const { PassThrough } = require('stream');

// let student = [['asd', 'asdasd', 1]]
// student.push(['qweqwe', 'qwe', 1123])
// let data = JSON.stringify(student);
// fs.writeFileSync('student-2.json', data);
// let rawdata = fs.readFileSync('student-2.json');
// let student2 = JSON.parse(rawdata);
//console.log(parseInt(Math.random() * (12 - 1) + 1));

function make_employee_collection(count)
{
    let collect = []
    for (let i = 0; i < count; i++)
    {
    let deptNo = parseInt(Math.random() * (1 - 1) + 1);
    let firstName = randomString(Math.random() * (10 - 3) + 3, 'A');
    let lastName = randomString(Math.random() * (10 - 3) + 3, 'A');
    let salary = parseInt(Math.random() * (1000000 - 10000) + 10000);

    let year = parseInt(Math.random() * (2021 - 1980) + 1980);
    let month = parseInt(Math.random() * (12 - 1) + 1);
    let day = parseInt(Math.random() * (30 - 1) + 1);
    if (month < 10)
    {
        month = "0" + month
    }    
    if (day < 10)
    {
        day = "0" + day
    }
    let hireDate = year + "-" + month + "-" + day; 

    
        collect.push({deptNo: deptNo, firstName: firstName, lastName: lastName, hireDate: hireDate, salary: salary})
    }
    let data = JSON.stringify(collect, null, 2);
    fs.writeFileSync('collection.json', data);
    collect = []
}

function randomString(len, an)
{
    an = an&&an.toLowerCase();
    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
    for(;i++<len;){
      var r = Math.random()*(max-min)+min <<0;
      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
    }
    return str;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function main(stop_flag, count, step, elapse_time, percent_of_fails){
    
    if (stop_flag === false){
        
        make_employee_collection(count);
        let rawdata = fs.readFileSync('collection.json');
        let collect_for_post = JSON.parse(rawdata);

        var results_collection = new Array();

        (async () => {

            for (let i = 0; i < count; i++){
                (async () => {
                    let dateOld = Date.now();
                    if ((Math.random() * (100 - 1) + 1) > 50){
                        var cfg_for_ax = {
                            method: 'get',
                            url: 'http://localhost:8080/employees',
                            headers: { }
                            };
                    }
                    else{
                        var cfg_for_ax = {
                            method: 'post',
                            url: 'http://localhost:8080/employees',
                            headers: {'Content-Type': 'application/json'},
                            data: (collect_for_post[i])
                            };
                    }
                    axios(cfg_for_ax)
                    .then(function (response) {
                        //console.log(`${i}: ${Date.now() - dateOld}: ${response.status}`);
                        results_collection.push([Date.now() - dateOld, response.status])
                    })
                    .catch(function (error) {
                        //console.log(JSON.stringify(error.status));
                        results_collection.push([Date.now() - dateOld, 502])
                    });
                })()
                await sleep(0);
            }

        })()
        

            setTimeout(()=> {
               // console.log(results_collection.length)
                let fails = 0
                for (let i = 0; i < results_collection.length; i++){
                    if (results_collection[i][0] > elapse_time || results_collection[i][1] != 200 || results_collection.length != count){
                        fails += 1;
                    }
                    console.log(`${results_collection[i]}`)
                }
                console.log(`${fails / (count/100)}`)
                if (fails / (count/100) > percent_of_fails){
                    main(true, count)
                }
                else{
                    main(false, count+step, step, elapse_time, percent_of_fails)
                }
            }, count*20)
    }
    else{
        console.log(`Сервер может выдержать не более ${count} пользователей`)
    }
}


main(false, config.settings.start_count, config.settings.step, config.settings.elapse_time, config.settings.percent_of_fails)