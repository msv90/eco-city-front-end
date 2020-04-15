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
                        <li class="active" >{{ title }}</li>
                    </ul>


                    <h1 class="rasdel_title">{{ title }}</h1>



                </div><!-- .header-->

                <div class="clear"></div>

                <div id="wrap" class="info_catalog">

                    <div class="page-navigation">
                        <!--<span class="page-title">Показать:</span>
                        <a class="" href="/responses/?showcount=14">14</a>
                        <a class="" href="/responses/?showcount=26">26</a>
                        <a class="" href="/responses/?showcount=38">38</a>
                        <a class="" href="/responses/?showcount=all">Все</a>-->

                        <span class="page-number" v-if="arPages">
                            <template v-for="page in arPages">
                                <span class="modern-page-first current" :key="page.str" v-if="page.current">{{ page.str }}</span>
                                <router-link :to="{name: 'Reviews', query: { PAGEN_1: page.page }}"
                                             :title="page.str" :key="page.str" v-else>
                                    {{ page.str }}
                                </router-link>
                            </template>
                        </span>
                    </div>
                    <div class="responses_list">
                        <ul v-if="reviews">
                            <li v-for="(review, i) in reviews" :key="review.id" :class="i % 2 ? 'greyLine' : ''">
                                <div class="top">
                                    <span class="name">{{ review.client_name }}</span>
                                </div>

                                <div class="text">
                                    <div class="date"></div>
                                    <p class="title">{{ review.title }}</p>

                                    <p>{{ review.text }}</p>

                                    <p class="more"><a href="#"></a></p>
                                    <div class="response_all">
                                        <p></p>
                                    </div>

                                    <div class="bottom" v-if="review.mini_material">
                                        <h3>Материалы из отзыва</h3>
                                        <div class="block_inline">
                                            <a :href="review.material" class="zoom">
                                                <img :src="review.mini_material" alt="">
                                            </a>
                                        </div>
                                    </div>

                                </div>

                            </li>
                        </ul>
                    </div>
                    <br>
                    <div class="page-navigation">
                        <!--<span class="page-title">Показать:</span>
                        <a class="" href="/responses/?showcount=14">14</a>
                        <a class="" href="/responses/?showcount=26">26</a>
                        <a class="" href="/responses/?showcount=38">38</a>
                        <a class="" href="/responses/?showcount=all">Все</a>-->

                        <span class="page-number" v-if="arPages">
                            <template v-for="page in arPages">
                                <span class="modern-page-first current" :key="page.str" v-if="page.current">{{ page.str }}</span>
                                <router-link :to="{name: 'Reviews', query: { PAGEN_1: page.page }}"
                                             :title="page.str" :key="page.str" v-else>
                                    {{ page.str }}
                                </router-link>
                            </template>
                        </span>
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
    // @ is an alias to /src

    import LeftMenu from '../components/LeftMenu'
    import FeedbackForm from '../components/FeedbackForm'
    import Api from '../Api.js'

    export default {
        name: 'Reviews',
        props: ['pageParam'],
        components: {
            "left-menu": LeftMenu,
            "feedback-form": FeedbackForm
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
                reviews: null,
                lastPage: null,
                currentPage: null,
                arPages: [],

                //seo
                title: null,
                seoTitle: '',
                seoDescription: '',
                seoKeywords: ''
            }
        },

        methods: {
            updateReviews(){
                let page = this.$route.query['PAGEN_1'] ? this.$route.query['PAGEN_1'] : 1
                Api.review.list(page).then(responce => {
                    if(responce.status === 200) {
                        this.arPages = [];
                        this.reviews = responce.data.data
                        this.currentPage = responce.data.current_page
                        this.lastPage = responce.data.last_page

                        if(this.currentPage > 1)
                            this.arPages.push({str: "<", page: this.currentPage - 1, current: false})

                        let numPage = 1
                        while(numPage <= this.lastPage){
                            this.arPages.push({str: numPage, page: numPage, current: this.currentPage === numPage})
                            numPage++;
                        }

                        if(this.currentPage < this.lastPage)
                            this.arPages.push({str: ">", page: this.currentPage + 1, current: false})

                    }
                    console.log(responce.data)
                })

                Api.section.getByCode('responses').then(response => {
                    if(response.status === 200){
                        if('responses' in response.data) {
                            this.title = response.data['responses'].title
                            this.seoTitle = response.data['responses'].seo_title
                            this.seoDescription = response.data['responses'].seo_description
                            this.seoKeywords = response.data['responses'].seo_keywords
                        } else if ('home' in response.data) {
                            this.title = response.data['home'].title
                            this.seoTitle = response.data['home'].seo_title
                            this.seoDescription = response.data['home'].seo_description
                            this.seoKeywords = response.data['home'].seo_keywords
                        }
                    }
                })
            }
        },

        watch: {
            pageParam: function () {
                this.updateReviews()

            }
        },

        mounted() {

            this.updateReviews()
            //this.activeCategoryAlias = this.$router.currentRoute.params.alias
        },

    }
</script>
