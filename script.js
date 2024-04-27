function Task1() {
    console.log('Task 1:');
    console.log('statement 1');
    console.log('statement 2');
    console.log('statement 3');
    console.log('statement 4');
}

Task1();

function Task2() {
    console.log('Task 2:');
    console.log('statement 1');
    console.log('statement 2');
    setTimeout(()=> {
        console.log('callback function is fired');
    }, 5000);
    console.log('statement 3');
    console.log('statement 4');
    
}

Task2();

//Task 3 - XMLHTTPRequest
const request = new XMLHttpRequest();
request.addEventListener('readystatechange', ()=> {
    if(request.readyState === 4 ){
        console.log(request.responseText);
    } 
});
request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
request.send();

//Task 4 - Callback
const getTodos = (callback)=> {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', ()=> {
        if(request.readyState === 4 && request.status === 200){
            callback(undefined, request.responseText);
        } else if (request.readyState === 4){
            callback('could not fetch data', undefined);
        }
    });
    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
    request.send();
}
getTodos((err, data)=> {
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
})

//Task5 - Promise
const getTodos1 = () => {
    return new Promise((resolve, reject)=> {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', ()=> {
            if(request.readyState === 4 && request.status === 200){
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else if (request.readyState === 4) {
                reject('could not fetch data')
            }
        });
        request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
        request.send()
    })
}

getTodos1()
.then(data => {console.log('promise resolved', data)})
.catch(err => {console.log('promise rejected', err)});

//Task6 - Fetch

fetch( 'https://jsonplaceholder.typicode.com/todos/1')
.then((response)=> {
    console.log('resolved:', response);
    const data = response.json();
    return data;
})
.catch(err => {
    console.log('could not fetch data') 
});

//Task 7 - Bonus
const getTodos2 = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if(response.status !== 200){
        throw new Error('cannot fetch the data')
    }
    const data = await response.json();
    return data;
}
getTodos2()
.then(data => {console.log('resolved', data)})
.catch(err => {console.log('rejected', err.message)});