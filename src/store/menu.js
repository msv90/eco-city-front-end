//import Vue from 'vue'


export default {
    namespaced: true,
    state: {
        menu: {
            home_order: {
                router_link: 'HomeOrder',
                text: 'Как заказать дом',
            },
            projects: {
                router_link: 'ProjectsList',
                text: 'Готовые проекты',
            },
            tech: {
                router_link: 'TechHome',
                text: 'Плюсы и Минусы СИП',
            },
            builtHouse: {
                router_link: 'BuiltHousesMap',
                text: 'Построенные дома',
            },
            reviews: {
                router_link: 'Reviews',
                text: 'Отзывы',
            },
            contacts: {
                router_link: 'Contacts',
                text: 'Контакты',
            }
        }
    },
    getters: {
        Menu: state => {
            return state.menu
        },
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
}
