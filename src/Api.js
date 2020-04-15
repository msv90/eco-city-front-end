import axios from 'axios'

//axios.defaults.headers.common['X-CSRF-TOKEN'] = document.getElementById('csrf-token').content

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
//axios.defaults.baseURL = "http://local.eco-city.ru";

export default class Api {
}

Api.page = {
    list: () => axios.get('/api/page'),
    getByCode: pageCode => axios.get('/api/page/getByCode/' + pageCode ),
    getByCodes: data => axios.post('/api/page/getByCodes', data),
}

Api.review = {
    home: () => axios.get('/api/review/home'),
    list: (page) => axios.get('/api/review?page=' + page),
}

Api.category = {
    list: () => axios.get('/api/category'),
    getByAlias: alias => axios.get('/api/category/getByAlias/' + alias ),
}

Api.section = {
    getByCode: code => axios.get('/api/section/getByCode/' + code ),
}

Api.project = {
    list: (data) => axios.get('/api/project?' + data),
    calculateFilter: (data) => axios.get('/api/project/calculateFilter?' + data),
    getByAlias: alias => axios.get('/api/project/getByAlias/' + alias ),
    homePage: () => axios.get('/api/project/homePage'),
}

Api.form = {
    send: (form) => axios.post('/api/form/send', form)
}

Api.builtHouse = {
    list: (data) => axios.get('/api/built-house?' + data),
}

Api.keyValue = {
    getByKey: key => axios.get('/api/key-value/getByKey/' + key ),
}

Api.special = {
    list: (data) => axios.get('/api/special?count=' + data),
    getByAlias: (alias) => axios.get('/api/special/getByAlias/' + alias),
}

Api.seminar = {
    get: () => axios.get('/api/seminar'),
}


/*
Api.schedule = {
    get: (id) => axios.get("/api/schedule/" + id),
    update: (id, data) => axios.put("/api/schedule/" + id, data),
    add: (data) => axios.post("/api/schedule/", data),
    remove: (id) => axios.delete("/api/schedule/" + id),
}*/
