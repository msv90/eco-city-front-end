import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('../views/Home.vue'),
            name: 'Home',
        },
        {
            path: '/kak-zakazat-dom/',
            component: () => import('../views/HomeOrder.vue'),
            name: 'HomeOrder',
        },
        {
            path: '/tech/',
            component: () => import('../views/tech/TechHome.vue'),
            name: 'TechHome',
        },
        {
            path: '/tech/:alias',
            component: () => import('../views/tech/TechCategory.vue'),
            name: 'TechCategory',
            props: true
        },
        {
            path: '/tech/:categoryAlias/:alias',
            component: () => import('../views/tech/TechArticle.vue'),
            name: 'TechArticle',
            props: true
        },
        {
            path: '/responses/',
            component: () => import('../views/Reviews.vue'),
            name: 'Reviews',
            //props: true
            props: (route) => ({ pageParam: route.query["PAGEN_1"] })
        },
        {
            path: '/proekty/',
            component: () => import('../views/projects/ProjectsList.vue'),
            name: 'ProjectsList',
            //props: true
            props: (route) => ({ filterQuery: route.query["filter"] })
        },
        {
            path: '/proekty/:alias',
            component: () => import('../views/projects/ProjectsDetail.vue'),
            name: 'ProjectsDetail',
            props: true
        },
        {
            path: '/proekty/:alias/postroennye-po-proektu',
            component: () => import('../views/projects/ProjectsHouses.vue'),
            name: 'ProjectsHouses',
            props: true
        },
        {
            path: '/postroennye-doma/',
            component: () => import('../views/builtHouses/BuiltHouses.vue'),
            name: 'BuiltHouses',
            //props: true
            props: (route) => ({ pageParam: route.query["PAGEN_1"] })
        },
        {
            path: '/postroennye-doma/na-karte/',
            component: () => import('../views/builtHouses/BuiltHousesMap.vue'),
            name: 'BuiltHousesMap',
        },
        {
            path: '/kontakty/',
            component: () => import('../views/Contacts.vue'),
            name: 'Contacts',
        },
        {
            path: '/novosti/',
            component: () => import('../views/News.vue'),
            name: 'News',
        },
        {
            path: '/obshhaya-informatsiya/',
            component: () => import('../views/About.vue'),
            name: 'About',
        },
        {
            path: '/special/',
            component: () => import('../views/specials/SpecialsList.vue'),
            name: 'SpecialsList',
        },
        {
            path: '/special/:alias',
            component: () => import('../views/specials/SpecialsDetail.vue'),
            name: 'SpecialsDetail',
            props: true
        },
        {
            path: '/seminars/',
            component: () => import('../views/Seminars.vue'),
            name: 'Seminars',
        },
        {
            path: '/architect/',
            component: () => import('../views/Architect.vue'),
            name: 'Architect',
        },
        /*{
            path: '/department/:id',
            component: () => import('./views/DepartmentEdit.vue'),
            name: 'DepartmentEdit',
            props: true
        },*/
    ]
})
