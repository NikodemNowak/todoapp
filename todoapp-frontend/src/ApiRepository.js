import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {'Content-Type': 'application/json'}
})

instance.interceptors.request.use(request => {
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

export {
    getTaskLists,
    addTask
}