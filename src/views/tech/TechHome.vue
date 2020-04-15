<template>
    <div class="container">

        <left-menu></left-menu>

        <main class="content">
            <div class="content_spacer">


                <!--for inner pages-->
                <div class="header">
                    <feedback-form v-if="title" :title="title"></feedback-form>

                    <ul class="breadcrumbs">
                        <li>
                            <router-link :to="{path: '/'}" title="Главная">
                                Главная
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li class="active">Плюсы и Минусы СИП</li>
                    </ul>


                    <h1 class="rasdel_title">{{ title }}</h1>


                    <ul class="submenu">

                        <li v-for="category in categories" v-bind:key="category">
                            <router-link :to="{path: '/tech/' + category.alias}">
                                {{ category.top_menu_title }}
                            </router-link>
                        </li>

                    </ul>


                </div><!-- .header-->

                <div class="clear"></div>
                <!--for inner pages end-->

                <div v-html="content"></div>

                <feedback-form-footer></feedback-form-footer>

                <!-- .content --> <!-- .container--> <!-- .middle-->
                <div class="footer">
                    <div class="soc_link">
                        <a class="vk" href="http://vk.com/ecocity78" target="_blank"><img width="39" alt="vk" src="/images/vk.jpg" height="39"></a>
                    </div>
                    <div class="contact_block">
                        <span class="phone">+7 (812) 950-60-50 </span> <span class="email">e-mail: <a href="mailto:info@eco-city.spb.ru">info@eco-city.spb.ru</a></span> <br style="margin-bottom: 0; line-height: 10px;">
                    </div>
                    <div class="copyright">
                        Группа компаний "Eco-City"<br style="margin-bottom: 0; line-height: 6px;">
                        © 2017
                    </div>
                </div>
                <!-- .footer --> <!-- .wrapper -->
                <div class="overlay">
                </div>



            </div>
        </main>
    </div>
</template>

<script>
    // @ is an alias to /src

    import LeftMenu from '../../components/LeftMenu'
    import FeedbackForm from '../../components/FeedbackForm'
    import FeedbackFormFooter from '../../components/FeedbackFormFooter'
    import Api from '../../Api.js'

    export default {
        name: 'TechHome',
        components: {
            "left-menu": LeftMenu,
            "feedback-form": FeedbackForm,
            "feedback-form-footer": FeedbackFormFooter
        },

        metaInfo() {
            return {
                title: this.seoTitle,
                meta: [
                    {
                        vmid: 'description',
                        name: 'description',
                        content: this.seoDescription,
                    },
                    {
                        vmid: 'keywords',
                        name: 'keywords',
                        content: this.seoKeywords,
                    }
                ]
            }
        },

        data() {
            return {
                categories: null,
                content: null,

                //seo
                title: null,
                seoTitle: '',
                seoDescription: '',
                seoKeywords: ''
            }
        },

        computed: {

        },

        created(){
            Api.category.list().then(response => {
                if (response.status === 200)
                    this.categories = response.data;

            })

            Api.page.getByCode("sip_prons_and_cons").then(response => {
                if (response.status === 200)
                    this.content = response.data.data;
            })

            Api.section.getByCode('tech').then(response => {
                if(response.status === 200){
                    if('tech' in response.data) {
                        this.title = response.data['tech'].title
                        this.seoTitle = response.data['tech'].seo_title
                        this.seoDescription = response.data['tech'].seo_description
                        this.seoKeywords = response.data['tech'].seo_keywords
                    } else if ('home' in response.data) {
                        this.title = response.data['home'].title
                        this.seoTitle = response.data['home'].seo_title
                        this.seoDescription = response.data['home'].seo_description
                        this.seoKeywords = response.data['home'].seo_keywords
                    }
                }
            })
        }
    }
</script>
