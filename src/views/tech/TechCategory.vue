<template>
    <div class="container">

        <left-menu></left-menu>

        <main class="content">
            <div class="content_spacer">


                <!--for inner pages-->
                <div class="header">
                    <feedback-form v-if="category" :title="category.title"></feedback-form>

                    <ul class="breadcrumbs">
                        <li>
                            <router-link :to="{path: '/'}" title="Главная">
                                Главная
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li>
                            <router-link :to="{path: '/tech'}" title="Плюсы и Минусы СИП">
                                Плюсы и Минусы СИП
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li class="active" v-if="category">{{ category.title }}</li>
                    </ul>


                    <h1 class="rasdel_title" v-if="category">{{ category.title }}</h1>


                    <ul class="submenu">

                        <li v-for="category in categories" :key="category.id" :class="category.selected ? 'active' : ''">
                            <router-link :to="{path: '/tech/' + category.alias}" >
                                {{ category.top_menu_title }}
                            </router-link>
                        </li>

                    </ul>


                </div><!-- .header-->

                <div class="clear"></div>

                <div id="wrap" class="info_catalog" v-if="category">
                    <div class="title">{{ category.title }}</div>
                    <div class="colls info">
                        <div class="lcoll">

                            <div class="articles">
                                <div class="article" v-for="article in category.articles" :key="article.id">
                                    <div class="title">{{ article.title }}</div>

                                    <div class="text" v-html="article.preview"></div>

                                    <router-link :to="{path: '/tech/' + alias + '/' + article.alias}" >
                                        Читать полностью
                                    </router-link>


                                </div>
                            </div>

                        </div>



                        <div class="rcoll">

                            <div class="house_descr_right">
                                <span class="title">{{ category.title }}</span>
                                <ul class="links">

                                    <li v-for="article in category.articles" :key="article.id">
                                        <router-link :to="{path: '/tech/' + alias + '/' + article.alias}" >
                                            {{ article.title }}
                                        </router-link>
                                    </li>

                                </ul>
                            </div>

                            <div class="link_video" v-if="category.video">
                                <iframe width="100%" height="191" :src="category.video" frameborder="0" allowfullscreen></iframe>
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
    // @ is an alias to /src

    import LeftMenu from '../../components/LeftMenu'
    import FeedbackForm from '../../components/FeedbackForm'
    import Api from '../../Api.js'

    export default {
        name: 'TechCategory',
        props: ['alias'],
        components: {
            "left-menu": LeftMenu,
            "feedback-form": FeedbackForm
        },

        data() {
            return {
                categories: null,
                category: null,
                //activeCategoryAlias: null

                //seo
                seoTitle: '',
                seoDescription: '',
                seoKeywords: ''
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

        methods: {
            updateCategory(){
                Api.category.getByAlias(this.alias).then(response => {
                    if (response.status === 200) {
                        this.category = response.data
                        this.seoTitle = response.data.seo_title
                        this.seoDescription = response.data.seo_description
                        this.seoKeywords = response.data.seo_keywords
                    }
                })
            }
        },

        watch: {
            alias: function () {
                this.categories = this.categories.map(category => {
                    if (category.alias === this.alias) {
                        category['selected'] = true
                    } else {
                        category['selected'] = false
                    }

                    return category
                });

                this.updateCategory()

            }
        },

        mounted() {
            Api.category.list().then(response => {
                if (response.status === 200) {
                    this.categories = response.data.map(category => {
                        if (category.alias === this.alias) {
                            category['selected'] = true
                        } else {
                            category['selected'] = false
                        }

                        return category
                    });
                }
            })

            this.updateCategory()
            //this.activeCategoryAlias = this.$router.currentRoute.params.alias
        },

    }
</script>

<style scoped>
    div.news-list img.preview_picture
    {
        float:left;
        margin:0 4px 6px 0;
    }
    .news-date-time {
        color:#486DAA;
    }
</style>