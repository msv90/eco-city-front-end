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

                <div class="seminar seminar_top">

                    <div v-html="workWithArchitect"></div>

                    <!--<div class="write_us">
                        <div class="column">
                            <p class="title size18">Записаться к архитектору</p>

                            <div>
                                <div class="alx_feed_back_form alx_feed_back_default" id="alx_feed_back_default_FID38">
                                    <div class="alx_feed_back_form_feedback_poles dealers forma_feedback forma_page">
                                        <form enctype="multipart/form-data" method="post" @submit.prevent="sendForm">
                                            <div>
                                                <input type="hidden" name="form_title" value="Запись к архитектору"/>
                                                <p>
                                                    <label for="name_seminar">Имя </label>
                                                    <input class="text" id="name_seminar" name="name" size="40" type="text" value="" />
                                                </p>

                                                <p>
                                                    <label for="phone_seminar">Телефон </label>
                                                    <input class="text" id="phone_seminar" name="phone" size="40" type="text" value="" />
                                                </p>
                                            </div>

                                            <div class="clear"></div>
                                            <input class="fb_close btn btn_blue btn_order" type="submit" value="Отправить" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <div v-html="seminarsBottom"></div>
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
        name: 'Architect',
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

                workWithArchitect: '',
                seminarsBottom: ''
                /*seminarsTop: '',
                seminarsMiddle: '',
                seminarsBottom: '',*/

            }
        },

        methods: {
            sendForm(ev){
                let form = new FormData()

                for(let element of ev.target.elements){
                    if(element.type === 'submit') continue;
                    form.append(element.name, element.value)
                }

                form.append('page', window.location.href)
                form.append('page_title', this.title)
                //form.append('form_title', 'Получение скидки')

                Api.form.send(form).then(/*response => {

                    if(response.status === 200){

                    }
                }*/)
            },
        },

        mounted() {

            Api.page.getByCodes({codes: ['work_with_architect', 'seminars_bottom']}).then(response => {
                if (response.status === 200) {
                    this.workWithArchitect = response.data.work_with_architect.data
                    this.seminarsBottom = response.data.seminars_bottom.data
                }
            })

            Api.section.getByCode('work_with_architect').then(response => {
                if(response.status === 200){
                    if('work_with_architect' in response.data) {
                        this.title = response.data['work_with_architect'].title
                        this.seoTitle = response.data['work_with_architect'].seo_title
                        this.seoDescription = response.data['work_with_architect'].seo_description
                        this.seoKeywords = response.data['work_with_architect'].seo_keywords
                    } else if ('home' in response.data) {
                        this.title = response.data['home'].title
                        this.seoTitle = response.data['home'].seo_title
                        this.seoDescription = response.data['home'].seo_description
                        this.seoKeywords = response.data['home'].seo_keywords
                    }
                }
            })

        },

    }
</script>
