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
                        <li class="active">{{ title }}</li>
                    </ul>

                    <h1 class="rasdel_title">{{ title }}</h1>

                </div><!-- .header-->

                <div class="clear"></div>
                <!--for inner pages end-->



                <div v-html="howOrderHouse"></div>

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

    import LeftMenu from '../components/LeftMenu'
    import FeedbackForm from '../components/FeedbackForm'
    import FeedbackFormFooter from '../components/FeedbackFormFooter'
    import Api from '../Api.js'

    export default {
        name: 'HomeOrder',
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

        data(){
            return {
                howOrderHouse: null,

                //seo
                title: null,
                seoTitle: '',
                seoDescription: '',
                seoKeywords: ''
            }
        },

        created() {
            Api.page.getByCode("how_order_house").then(response => {
                if (response.status === 200)
                    this.howOrderHouse = response.data.data;
            })

            Api.section.getByCode('kak-zakazat-dom').then(response => {
                if(response.status === 200){
                    if('kak-zakazat-dom' in response.data) {
                        this.title = response.data['kak-zakazat-dom'].title
                        this.seoTitle = response.data['kak-zakazat-dom'].seo_title
                        this.seoDescription = response.data['kak-zakazat-dom'].seo_description
                        this.seoKeywords = response.data['kak-zakazat-dom'].seo_keywords
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
