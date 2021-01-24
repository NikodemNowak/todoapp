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
    instance.post('/login', data).then(r => {
        localStorage.setItem("accessToken", r.data.accessToken)
        localStorage.setItem("refreshToken", r.data.refreshToken)
    })
}

export {
    getTaskLists,
    addTask,
    getTaskList,
    getStatuses,
    updateTask,
    updateTaskList,
    addUser,
    getUsers,
    loginUser
}