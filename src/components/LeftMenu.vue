<template>
    <aside class="left-sidebar">
        <!--<a href="#" class="logo">&nbsp;</a>-->
        <router-link :to="{name: 'Home'}" class="logo"></router-link>
        <div class="show_phone"><a href="tel:+78129506050">+7 (812) 950-60-50</a></div>
        <div class="menubutton" @click="showMenu">Меню <img src="/images/arrow_down.png" /></div>

        <ul class="leftmenu" v-if="menu">
            <li v-for="link in menu" v-bind:key="link.id">
                <router-link :to="{name: link.router_link}" :class="currentRoute['name'] === link.router_link ? 'selected' : ''">{{ link.text }}</router-link>
            </li>
        </ul>
        <div class="seminars_menu" v-if="specialPage === 'seminar'">
            <router-link :to="{path: '/seminars'}">
                Семинары<span>бесплатно</span>
            </router-link>
        </div>
        <div class="seminars_menu" v-if="specialPage === 'architect'">
            <router-link :to="{path: '/architect'}">
                Запись к архитектору<span>бесплатно</span>
            </router-link>
        </div>
        <ul class="leftmenu_child" v-if="miniMenu">

            <li v-for="link in miniMenu" v-bind:key="link.id">
                <router-link :to="{name: link.router_link}" :class="currentRoute['name'] === link.router_link ? 'selected menu-element-counter' : 'menu-element-counter'">
                    {{ link.text }}
                    <span class="menu-counter" v-if="typeof link['counter'] !== 'undefined'">{{ link.counter }}</span>
                </router-link>
            </li>

        </ul>


        <!--<div class="region"><span>Ваш регион: </span>Санкт-Петербург</div>-->
        <div class="region_spacer">
        </div>

        <feedback-form-left></feedback-form-left>

    </aside><!-- .left-sidebar -->
</template>

<script>

    import FeedbackFormLeft from './FeedbackFormLeft'
    import Api from '../Api'

    export default {
        name: 'LeftMenu',

        data() {
            return {
                currentRoute: this.$router.currentRoute,
                showMenuFlag: false,
                specialPage: null
            }
        },

        components: {
            "feedback-form-left": FeedbackFormLeft
        },

        computed: {
            menu() {
                //console.log(this.$router.currentRoute)
                return this.$store.getters["menu/Menu"];
            },
            miniMenu() {
                return this.$store.getters["minimenu/MiniMenu"];
            }
        },

        methods: {
            showMenu() {
                let leftMenu = document.querySelector('.leftmenu')
                if(leftMenu && (leftMenu.style.display === 'none' || !leftMenu.style.display)){
                    leftMenu.style.display = 'block'
                } else {
                    leftMenu.style.display = 'none'
                }

                let leftMenuChild = document.querySelector('.leftmenu_child')
                if(leftMenuChild && (leftMenuChild.style.display === 'none' || !leftMenuChild.style.display)){
                    leftMenuChild.style.display = 'block'
                } else {
                    leftMenuChild.style.display = 'none'
                }
            }
        },

        mounted(){
            Api.keyValue.getByKey('SWITCHING_SECTION').then(response => {
                if(response.status === 200){
                    if('value' in response.data && response.data.value.length > 0)
                        this.specialPage = response.data.value
                    else
                        this.specialPage = 'architect'
                }
            }).catch(() => {
                this.specialPage = 'architect'
            })
        }
    }
</script>

<style scoped>
    .menu-counter {
        position: absolute;
        top: 0;
        right: -22px;
        color: white;
        border: 1px solid red;
        border-radius: 100%;
        width: 15px;
        height: 15px;
        background-color: red;
        line-height: 15px;
        margin-top: 2px;
        font-size: 10px;
    }

    .menu-element-counter {
        position: relative;
    }
</style>