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

                <br><br>

                <div id="wrap">

                    <div class="news-widget">
                        <div id="vk_groups">
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

    import LeftMenu from '../components/LeftMenu'
    import FeedbackForm from '../components/FeedbackForm'
    import Api from '../Api'

    export default {
        name: 'News',
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
                //seo
                title: null,
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',

            }
        },

        created(){
            if(!window['VK']) {
                Api.keyValue.getByKey('VK_PUBLIC_ID').then(response => {
                    (function (w, d, u) {
                        let s = d.createElement('script')
                        s.src = u
                        let h = d.getElementsByTagName('script')[0]
                        h.parentNode.insertBefore(s, h)
                    })(window, document, `https://vk.com/js/api/openapi.js?${response.data.value}`)
                })
            }
        },

        mounted() {

            Api.section.getByCode('novosti').then(response => {
                if(response.status === 200){
                    if('novosti' in response.data) {
                        this.title = response.data['novosti'].title
                        this.seoTitle = response.data['novosti'].seo_title
                        this.seoDescription = response.data['novosti'].seo_description
                        this.seoKeywords = response.data['novosti'].seo_keywords
                    } else if ('home' in response.data) {
                        this.title = response.data['home'].title
                        this.seoTitle = response.data['home'].seo_title
                        this.seoDescription = response.data['home'].seo_description
                        this.seoKeywords = response.data['home'].seo_keywords
                    }
                }
            })

            var count = 0;
            var timerId = setTimeout(() => {
                if(window['VK']) {
                    let frame_width = document.body.clientWidth - 30;
                    if (document.body.clientWidth > 890) {
                        frame_width = 1240 - 375;
                    }

                    let VK = window['VK']
                    VK.Widgets.Group("vk_groups", {mode: 2, width: frame_width, height: "700"}, 36447280);
                    clearInterval(timerId)
                }
                count++;
                if(count === 20) clearInterval(timerId)

            }, 500);

        },

    }
</script>
