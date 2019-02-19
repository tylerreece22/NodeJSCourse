// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

sendCustomerEmail();

async function sendCustomerEmail() {
    const customer = await getCustomer(1)
    console.log('Customer', customer)
    if (customer.isGold) {
        const movies = await getTopMovies()
        console.log('Top movies', movies)
        await sendEmail(customer.email, movies)
        console.log('Email sent...')
    }
}

function getCustomer(id) {
    return new Promise((resolve) => {
        console.log('Getting customer...')
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);
    })
}

function getTopMovies() {
    return new Promise((resolve) => {
        console.log('Getting top movies...')
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    })
}

function sendEmail(email, movies) {
    return new Promise((resolve) => {
        console.log('Sending email...')
        setTimeout(() => {
            resolve();
        }, 4000);
    })
}