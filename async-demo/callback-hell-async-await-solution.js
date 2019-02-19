// getUser(1, (user) => {
//     console.log('User', user)
//     getRepositories(user.githubUsername, (repos) => {
//         console.log('Repos', repos)
//         getCommits(repos[0], (commits) => {
//             console.log('Commits', commits)
//         })
//     })
// })

// Promise-based Approach
// getUser(1)
//     .then(user => getRepositories(user.githubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(e => console.log('Error', e.message))

// Async and Await
async function displayCommits() {
    try {
        const user = await getUser(1)
        const repos = await getRepositories(user.githubUsername)
        const commits = await getCommits(repos[0])
        console.log(commits)
    }
    catch (e) {
        console.log('Error', e.message)
    }
}

displayCommits();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from the database...')
            resolve({id: id, githubUsername: 'tyler'})
        }, 2000)
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling Github API...")
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling Github repository API for commits...")
            resolve(['commit1', 'commit2', 'commit3', "commit4"])
        }, 2000)
    })
}

