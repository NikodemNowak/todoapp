import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {'Content-Type': 'application/json'}
})

instance.interceptors.request.use(request => {
    const token = localStorage.getItem("accessToken")
    if (token != null) {
        request.headers = {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
    }

    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

instance.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
})

function getTaskLists() {
    return instance.get('/tasks/lists').then(r => r.data)
}

function addTask(data) {
    instance.post('/tasks', data).then(r => console.log(r))
}

function getTaskList(id) {
    return instance.get('/tasks/lists/' + id).then(r => r.data)
}

function getStatuses() {
    return instance.get('/tasks/statuses').then(r => r.data)
}

function updateTask(data) {
    instance.patch('/tasks', data).then(r => console.log(r))
}

function updateTaskList(data, id) {
    instance.patch('/tasks/lists/' + id).then(r => console.log(r))
}

function addUser(data) {
    instance.post('/users', data).then(r => console.log(r))
}

function getUsers() {
    return instance.get('/users').then(r => r.data)
}

function loginUser(data) {
    let result = true
    instance.post('/login', data).then(r => {
        localStorage.setItem("accessToken", r.data.accessToken)
        localStorage.setItem("refreshToken", r.data.refreshToken)
        console.log(r)
    }).catch(reason => {
        console.log(reason)
        result = false
    })

    return result
}

function resetPassword(data) {
    instance.post('/users/reset-password', data).then(r => console.log(r))
}

function changeData(data) {
    instance.post('/users/change-data', data).then(r => console.log(r))
}

function deleteUser() {
    instance.delete('/users').then(r => console.log(r))
}

function getUsername() {
    return instance.get('/users/username').then(r => r.data)
}

function isAuthenticated() {
    if (localStorage.getItem("accessToken") == null || localStorage.getItem("refreshToken") == null) {
        return false
    }
    instance.post('/token/verify', {accessToken: localStorage.getItem("accessToken")}).then(r=>{
        console.log(r)
        return true
    }).catch(reason => {
        instance.post('/token/refresh', {refreshToken: localStorage.getItem("refreshToken")}).then(r => {
            console.log(r)
            localStorage.setItem("accessToken", r.data.accessToken)
            return true
        }).catch(reason1 => {
            return false
        })
    })
}

export {
    instance,
    getTaskLists,
    addTask,
    getTaskList,
    getStatuses,
    updateTask,
    updateTaskList,
    addUser,
    getUsers,
    loginUser,
    resetPassword,
    changeData,
    deleteUser,
    getUsername,
    isAuthenticated
}