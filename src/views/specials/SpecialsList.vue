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
                        <li class="active" v-if="title">{{ title }}</li>
                    </ul>


                    <h1 class="rasdel_title" v-if="title">{{ title }}</h1>


                </div><!-- .header-->

                <div class="clear"></div>

                <div class="wrap">
                    <div class="news-list" v-if="specialList">
                        <div class="news-item" v-for="special in specialList" :key="special.id">
                            <div class="news_picture">
                                <a href=""><img
                                    class="preview_picture"
                                    border="0"
                                    :src="special.image"
                                style="float:left"
                                /></a>
                            </div>
                            <div class="news_text">

                                <h2>
                                    <router-link :to="{path: '/special/' + special.alias}" title="Главная">
                                        {{ special.title }}
                                    </router-link>
                                </h2>
                                <div v-html="special.preview_text"></div>
                                <br>
                            </div>
                        </div>
                    </div>

                </div>


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



                <div class="hide">
                    <div class="title">
                        Давайте начнем!
                    </div>

                    <p>
                        Чтобы стать заказчиком, позвоните <strong>(812) 950-60-50</strong> или оставьте заявку на обратный звонок.
                    </p>


                </div>

            </div>
        </main>
    </div>
</template>

<script>

    import LeftMenu from '../../components/LeftMenu'
    import FeedbackForm from '../../components/FeedbackForm'
    import Api from '../../Api'

    export default {
        name: 'SpecialsList',
        components: {
            "left-menu": LeftMenu,
            "feedback-form": FeedbackForm
        },

        methods: {
            printPage(){
                window.print()
            }
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
                //seo
                title: null,
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
                specialList: null
            }
        },

        mounted() {

            Api.section.getByCode('special').then(response => {
                if(response.status === 200){
                    if('special' in response.data) {
                        this.title = response.data['special'].title
                        this.seoTitle = response.data['special'].seo_title
                        this.seoDescription = response.data['special'].seo_description
                        this.seoKeywords = response.data['special'].seo_keywords
                    } else if ('home' in response.data) {
                        this.title = response.data['home'].title
                        this.seoTitle = response.data['home'].seo_title
                        this.seoDescription = response.data['home'].seo_description
                        this.seoKeywords = response.data['home'].seo_keywords
                    }
                }
            })

            Api.special.list(0).then(response => {
                if(response.status === 200){
                    this.specialList = response.data
                }
            })


        },

    }
</script>
