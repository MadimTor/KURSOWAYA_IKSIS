const mas = new Array();

function test(N) {
    N = 10000;
    const startDate = Date.now();

    for (let i = 0; i < N; i++) {
        const dateOld = Date.now();
        //console.log("ping")
        (async () => {
            let deptNo = document.getElementById("deptNo").value;
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let hireDate = document.getElementById("hireDate").value;
            let salary = document.getElementById("salary").value;

            let http = new XMLHttpRequest();
            http.open("POST", "http://localhost:8080/employees", false);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(JSON.stringify({
                deptNo: deptNo,
                firstName: firstName,
                lastName: lastName,
                hireDate: hireDate,
                salary: salary
            }));

            //let response = JSON.parse(http.responseText)

            mas.push(`${Date.now() - dateOld}: ${http.responseText}`)
            console.log(`${Date.now() - dateOld}: ${http.responseText}`);
        })();
    }
    const interval = setInterval(() => {
        if (N == mas.length) {
            clearInterval(interval);
            test(N+100)
        }
        console.log(`${Date.now() - startDate}: ${N - mas.length}`);
        const elem = document.getElementById('form');
        elem.value += `${Date.now() - startDate}: ${N - mas.length}`;
    }, 1000)
}