<template>
    <aside class="left-sidebar">
        <!--<a href="#" class="logo">&nbsp;</a>-->
        <router-link :to="{name: 'Home'}" class="logo"></router-link>
        <div class="show_phone"><a href="tel:+78129506050">+7 (812) 950-60-50</a></div>
        <div class="menubutton">Меню <img src="images/arrow_down.png" /></div>

        <ul class="leftmenu" v-if="menu">
            <li v-for="link in menu" v-bind:key="link">
                <router-link :to="{name: link.router_link}" :class="currentRoute['name'] === link.router_link ? 'selected' : ''">{{ link.text }}</router-link>
            </li>
        </ul>
        <div class="seminars_menu">
            <a href="/seminars/">Семинары<span>бесплатно</span></a>
        </div>
        <ul class="leftmenu_child">

            <li><a href="#" class="selected">Новости со строек</a></li>
            <li><a href="#">Акции</a></li>
            <li><a href="#">Информация</a></li>

        </ul>


        <!--<div class="region"><span>Ваш регион: </span>Санкт-Петербург</div>-->
        <div class="region_spacer">
        </div>

        <div class="left_bottom">
            <div class="soc_link">
                <a class="vk" href="http://vk.com/ecocity78" target="_blank"><img width="39" height="39" alt="vk" src="images/vk.jpg"></a>
            </div>

            <div class="contact_block">
                <span class="phone">+7 (812) 950-60-50</span>
                <span class="phone"><a class="forma-link cboxElement"  href="#callback">Заказать звонок</a></span>

                <span class="email"><br><span>e-mail: </span><a href="mailto:info@eco-city.spb.ru">info@eco-city.spb.ru</a></span>
                <br style="margin-bottom: 0; line-height: 10px;">
            </div>
            <div class="copyright">Группа компаний "Eco-City"<br style="margin-bottom: 0; line-height: 6px;">&copy; 2018</div>
        </div>

    </aside><!-- .left-sidebar -->
</template>

<script>
    export default {
        name: 'CategoriesMenu',

        data() {
            return {
                currentRoute: this.$router.currentRoute
            }
        },

        computed: {
            menu() {
                console.log(this.$router.currentRoute)
                return this.$store.getters["menu/Menu"];
            }
        },
    }
</script>
