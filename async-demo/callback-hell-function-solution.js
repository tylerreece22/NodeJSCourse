// Asynchronous Callbacks which causes CALLBACK HELL
console.log('Before')
getUser(1, getRepositories)
console.log('After')

function getRepositories(user) {
    getRepositories(user.githubUsername, getCommits)
}

function getCommits(repos) {
    getCommits(repos[0], displayCommits)
    console.log(repos)
}

function displayCommits(commits) {
    console.log(commits)
}

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
