function test() {
    const startDate = Date.now();
    
    const axios = require('axios');

    var config = {
    method: 'get',
    url: 'http://localhost:8080/employees',
    headers: { }
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.status));
    })
    .catch(function (error) {
    console.log(error);
    });


    console.log(`${Date.now() - startDate}`);

}
const fs = require('fs');
function test2222() {
    const startDate = Date.now();
    
    const axios = require('axios');
    let rawdata = fs.readFileSync('collection.json');
    let collect_for_post = JSON.parse(rawdata);
    console.log(collect_for_post[8])
    var config = {
    method: 'post',
    url: 'http://localhost:8080/employees',
    headers: {'Content-Type': 'application/json'},
    data: (collect_for_post[1])
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.status));
    })
    .catch(function (error) {
    //console.log(error);
    });


    //console.log(`${Date.now() - startDate}`);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const axios = require('axios');

(async () => {
for (let i = 0; i < 100; i++){
    (async () => {
        
        let dateOld = Date.now();
            var cfg_for_ax = {
                method: 'get',
                url: 'http://localhost:8080/employees',
                headers: { }
                };
        

        axios(cfg_for_ax)
        .then(function (response) {
            console.log(`${i}: ${Date.now() - dateOld}: ${response.status}`);
            //results_collection.push([Date.now() - dateOld, response.status])
        })
        .catch(function (error) {
            console.log(JSON.stringify(error.status));
            //results_collection.push([Date.now() - dateOld, 502])
        });

        
    })()
    await sleep(1)
}

})()