const p = new Promise((resolve, reject) => {
    //Do some async stuff
    setTimeout(()=>{
        // resolve(1);
        reject(new Error('message'))
    }, 2000)
})

p.then(result => console.log('Result', result))
.catch(err => console.log('Error', err.message))