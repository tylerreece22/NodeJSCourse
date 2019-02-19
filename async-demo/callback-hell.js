// Asynchronous Callbacks which causes CALLBACK HELL
console.log('Before')
getUser(1, (user) => {
    console.log('User', user)
    getRepositories(user.githubUsername, (repos) => {
        console.log('Repos', repos)
        getCommits(repos[0], (commits) => {
            console.log('Commits',commits)
        })
    })
})
console.log('After')

// Synchronous
console.log('Before')
const user = getUser(1)
const repos = getRepositories(user.githubUsername)
const commits = getCommits(repos[0])
console.log('After')

// DOES NOT WORK WITH ARROW FUNCTIONS UNLESS THEY ARE ON TOP OF THE FILE
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from the database...')
        callback({id: id, githubUsername: 'tyler'})
    }, 2000)
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log("Calling Github API...")
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000)

}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log("Calling Github repository API for commits...")
        callback(['commit1', 'commit2', 'commit3', "commit4"])
    }, 2000)
}
