<template>
    <div class="container">

        <left-menu></left-menu>

        <main class="content">
            <div class="content_spacer">


                <!--for inner pages-->
                <div class="header">
                    <!--<div class="contact-phone">
                        <span>+7 (812) 950-60-50</span><br>
                        <a  class="forma-link cboxElement contact-link"  href="#callback">Заказать звонок</a>
                    </div>-->
                    <feedback-form v-if="project" :title="project.title"></feedback-form>

                    <ul class="breadcrumbs">
                        <li>
                            <router-link :to="{path: '/'}" title="Главная">
                                Главная
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li>
                            <router-link :to="{path: '/proekty'}" title="Готовые проекты">
                                Готовые проекты
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <!--<li>
                            <router-link :to="{path: '/tech/' + category.alias}" v-if="category" :title="category.title">
                                {{ category.title }}
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>-->
                        <li class="active" v-if="project">{{ project.title }}</li>

                        <span class="back_link">Назад во
                            <router-link :to="{path: '/proekty'}" title="Все проекты">
                                Все проекты
                            </router-link>
                        </span>

                    </ul>


                    <h1 class="rasdel_title" v-if="project">{{ project.title }}</h1>

                    <ul class="submenu">

                        <li class="active">
                            <router-link :to="{path: '/proekty/' + alias}" >
                                Описание проекта
                            </router-link>
                        </li>
                        <li v-if="haveHouses">
                            <router-link :to="{path: '/proekty/' + alias + '/postroennye-po-proektu'}" >
                                Построенные дома по этому проекту
                            </router-link>
                        </li>

                    </ul>

                </div><!-- .header-->

                <div class="clear"></div>


                <div class="toolbar">
                    <ul class="dopknopki">
                        <li class="print" @click="printForm">Версия для печати</li>
                    </ul>
                    <div class="rasdel_subtitle">Описание проекта</div>

                </div>


                <div class="colls" v-if="project">
                    <div class="rcoll">
                        <div class="item_info_section">
                            <div class="price_info price_total" v-if="project.min_price && project.max_price">
                                <h4>Цена: </h4>
                                <dl>
                                    <dt class="actualy"><var>от</var> <span>{{ priceRender(project.min_price) }}</span> руб.</dt>
                                    <dt class="actualy"><var>до</var> <span>{{ priceRender(project.max_price) }}</span> руб.</dt>
                                </dl>
                            </div>
                            <div class="butt_credit">
                                <a class="forma-link cboxElement" href="#specialist" rel="modal:open">Хочу<br>дешевле</a>
                            </div>

                            <div class="price_info" v-if="project.unity_min_price && project.unity_max_price">
                                <h4>Стоимость за м<sup>2</sup></h4>
                                <dl>
                                    <dt class="actualy"><var>от</var> <span>{{ priceRender(project.unity_min_price) }}</span> руб.</dt>
                                    <dt class="actualy"><var>до</var> <span>{{ priceRender(project.unity_max_price) }}</span> руб.</dt>
                                </dl>
                            </div>

                            <!--   <div class="butt_credit">
                                   <a class="forma-link" href="#credit">Получить консультацию<br/>
                                   по кредиту</a>
                               </div>-->

                            <div class="obshaya_info">
                                <h4>Общая информация о проекте: </h4>

                                <div class="ploshad_info">
                                    <dl>
                                        <dt><span>Общая S: </span> <strong>{{ project.s_common }} м<sup>2</sup></strong></dt>
                                        <dt><span>Эксплуатируемая S: </span><strong>{{ project.s_exp }} м<sup>2</sup></strong></dt>
                                        <dt><span>S теплых помещений: </span><strong>{{ project.s_warm }}  м<sup>2</sup></strong></dt>
                                    </dl>
                                </div>

                                <dl class="obshaya_list">
                                    <dt><span>Этажность: </span> <strong>{{ project.levels }}</strong></dt>

                                    <dt><span>Высота 1 этажа(м): </span>
                                        <strong>{{ project.level_1 }}</strong>

                                    </dt>
                                    <dt><span>Высота 2 этажа(м): </span>
                                        <strong>{{ project.level_2 ? project.level_2 : '-' }}</strong></dt>
                                    <dt><span>Кол-во комнат:</span> <strong>{{ project.rooms ? project.rooms : '-' }}</strong></dt>
                                    <dt><span>Кол-во спален: </span> <strong>{{ project.bedrooms ? project.bedrooms : '-'}}</strong></dt>
                                    <dt><span>Кол-во санузлов: </span> <strong>{{ project.restrooms ? project.restrooms : '-'}}</strong></dt>
                                </dl>
                            </div>

                            <div class="butt_consult">
                                <a class="forma-link cboxElement" href="#specialist-consult" rel="modal:open">Получить консультацию<br>
                                    по проекту</a>
                            </div>
                        </div>



                    </div>


                    <div class="lcoll">
                        <div class="row" id="slider" v-if="project.images">

                            <div class="flex-viewport" style="overflow: hidden; position: relative;" v-for="image in project.images" :key="image.id">
                                <ul class="slides" style="width: 1400%; transition-duration: 0.6s; transform: translate3d(0px, 0px, 0px);">
                                    <li class="flex-active-slide" style="width: 531px; float: left; display: block;">
                                        <a class="picture" :href="image.path">
                                            <img :src="image.path" alt="" :data-target="image.path" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row" id="carousel" v-if="project.images">

                            <div class="flex-viewport" style="overflow: hidden; position: relative;">
                                <ul class="slides" style="width: 1400%; transition-duration: 0.6s; transform: translate3d(0px, 0px, 0px);">
                                    <li class="flex-active-slide" style="width: 117px; float: left; display: block;" v-for="image in project.images" :key="image.id">
                                        <a :href="image.path">
                                            <img :src="image.path" alt="" :data-target="image.path" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <ul class="flex-direction-nav">
                                <li class="flex-nav-prev">
                                    <a class="flex-prev flex-disabled" href="#" tabindex="-1">Previous</a>
                                </li>
                                <li class="flex-nav-next">
                                    <a class="flex-next" href="#">Next</a>
                                </li>
                            </ul>
                        </div>
                        <div class="item_description">
                            {{ project.text }}
                        </div>
                    </div>
                </div>

                <!--discount form start-->
                <div class="modal" id="specialist" v-if="project">
                    <h3>Получение скидки</h3>

                    <div v-if="!sendedDiscount">
                        Этот проект можно сделать дешевле на {{ priceRender(project.discount) }} рублей. Оставьте ваши данные, наш менеджер с вами свяжется.
                    </div>

                    <div class="modal-body" v-if="!sendedDiscount">

                        <div class="forma" >
                            <form method="post" enctype="multipart/form-data" @submit.prevent="sendForm">

                                <!--<input type="hidden" name="form_type" value="WANT_CHEAPER">
                                <input type="hidden" class="text" size="40" id="discount_amount" name="discount_amount" :value="priceRender(project.discount)">
                                <input type="hidden" class="text" size="40" id="page" name="FIELDS[PROJECT_FID6]" :value="window.location.uri">-->
                                <input type="hidden" name="form_title" value="Получение скидки" required>

                                <div class="forma_line">
                                <div class="left-block-kontakt">
                                    <span class="title">Как Вас зовут  </span>
                                    <div class="alx_feed_back_form_inputtext_bg">
                                        <input type="text" class="text" size="40" id="name" name="name"  required>
                                    </div>
                                </div>

                                <div class="right-block-kontakt">

                                    <span class="title">Контактный телефон  </span>
                                    <div class="alx_feed_back_form_inputtext_bg" id="error_PHONE_FID6">
                                        <input type="text" class="text" size="40" id="phone" name="phone" placeholder="X (XXX) XXX-XX-XX" required>
                                    </div>
                                </div>

                            </div>

                                <div class="forma_line">
                                    <div class="alx_feed_back_form_name">Текст сообщения </div>
                                    <div class="alx_feed_back_form_inputtext_bg"><textarea cols="" rows="" id="text" name="text" required></textarea></div>
                                </div>
                                <div class="capcha">
                                    <div class="alx_feed_back_form_item_pole">
                                        <div class="alx_feed_back_form_name">Введите символы,  изображённые на картинке </div>

                                    </div>

                                </div>
                                <p>
                                    <input type="submit" class="fb_close btn btn_blue btn_send" id="submit" name="submit" value="Отправить">
                                </p>
                            </form>

                        </div>
                    </div>

                    <div class="modal-body" v-else>
                        Форма успешно отправлена! Ожидайте ответа от специалиста!
                    </div>

                </div>
                <!--discount form end-->

                <!--consultation form start-->
                <div class="modal" id="specialist-consult">

                    <h3>Консультация специалиста</h3>
                    <div class="modal-body" v-if="!sendedConsultation">

                        <div class="forma">
                            <form  method="post" enctype="multipart/form-data" @submit.prevent="sendForm">

                                <input type="hidden" name="form_title" value="Консультация специалиста" required>

                                <div class="forma_line">
                                    <div class="left-block-kontakt">
                                        <span class="title">Как Вас зовут  </span>
                                        <div class="alx_feed_back_form_inputtext_bg">
                                            <input type="text" class="text" size="40" name="name" required>
                                        </div>
                                    </div>
                                    <div class="right-block-kontakt">
                                        <span class="title"> Контактный телефон  </span>
                                        <div class="alx_feed_back_form_inputtext_bg">
                                            <input type="text" class="text" size="40" name="phone" value="" placeholder="X (XXX) XXX-XX-XX" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="forma_line">
                                    <span class="title">Ваш вопрос  </span>
                                    <div class="alx_feed_back_form_inputtext_bg" id="error_QUESTION_FID3">
                                        <textarea cols="" rows="5" name="text" ></textarea>
                                    </div>
                                </div>


                                <p class="text_bottom">
                                    Также Вы можете получить консультацию по телефону <b>(812) 950-60-50</b> либо в одном из наших офисов в Санкт-Петербурге, Великом Новгороде или Пскове.
                                </p>
                                <p>
                                    <input type="submit" class="fb_close btn btn_blue btn_send" name="submit" value="Отправить">
                                </p>

                            </form>

                        </div>
                    </div>
                    <div class="modal-body" v-else>
                        Форма успешно отправлена! Ожидайте ответа от специалиста!
                    </div>
                </div>
                <!--consultation form start-->


                <table class="komplektacii" v-if="project && project.prices">
                    <tbody>

                        <tr class="title">
                            <td class="label_c">
                                Комплектация
                            </td>
                            <td v-for="(complectation, i) in project.prices" :key="complectation.id" :class="(parseInt(i)+1) % 2 > 0 ? 'gray value' : 'value'">
                                <span class="komplektacii_number">	№{{ i+1 }} </span>
                                <span class="komplektacii_title">{{ complectation.complectation.title }}</span>
                            </td>
                        </tr>

                        <tr class="price">
                            <td class="label_price">
                                Цена, руб.
                            </td>

                            <td v-for="(complectation, i) in project.prices" :key="complectation.id" :class="(parseInt(i)+1) % 2 > 0 ? 'gray value' : 'value'">
                                {{ priceRender(complectation.price) }}
                            </td>

                        </tr>

                        <tr v-for="(option, j) in project.prices[0].complectation.complectation_option" :key="option.id">
                            <td>
                                {{ option.title }}<span>{{ option.description }}</span>
                            </td>
                            <td v-for="(comp, i) in project.prices" :key="comp.id" :class="(parseInt(i)+1) % 2 > 0 ? 'gray value' : 'value'">
                                <img v-if="comp.complectation.complectation_option[j].active" width="22" height="22" src="/images/addtofav.png" alt="в наличии" title="Проект дома в наличии">
                            </td>

                        </tr>

                    </tbody>
                </table>



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
        name: 'ProjectsDetail',
        props: ['alias'],
        components: {
            "left-menu": LeftMenu,
            "feedback-form": FeedbackForm
        },

        data() {
            return {
                project: null,

                //seo
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',

                sendedDiscount: false,
                sendedConsultation: false,
                haveHouses: false
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

            printForm(){
                window.print()
            },

            priceRender(price){
                return parseInt(price).toLocaleString('ru');
            },

            sendForm(ev){
                let form = new FormData()
                let title = ''
                for(let element of ev.target.elements){
                    if(element.type === 'submit') continue;
                    form.append(element.name, element.value)

                    if(element.name === 'form_title')
                        title = element.value
                }

                form.append('page', window.location.href)
                form.append('page_title', this.project.title)
                //form.append('form_title', 'Получение скидки')

                Api.form.send(form).then(response => {

                    if(response.status === 200){
                        if(title == 'Получение скидки')
                            this.sendedDiscount = true;
                        else
                            this.sendedConsultation = true;
                    }
                })
            },

            serialize(obj, prefix) {
                let str = [], p;
                for (p in obj) {
                    if (obj instanceof Object) {
                        let k = prefix ? prefix + "[" + p + "]" : p,
                            v = obj[p];
                        str.push((v !== null && typeof v === "object") ?
                            this.serialize(v, k) :
                            encodeURIComponent(k) + "=" + encodeURIComponent(v));
                    }
                }
                return str.join("&");
            },
        },

        updated(){

            let $ = window.$

            $('#slider li a.picture').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });

            $('#carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 117,
                asNavFor: '#slider'
            });

            $('#slider').flexslider({
                animation: "slide",
                controlNav: false,
                directionNav:false,
                animationLoop: false,
                slideshow: false,
                sync: "#carousel"
            });
        },

        mounted() {

            Api.project.getByAlias(this.alias).then(response => {
                if(response.status === 200) {
                    this.project = response.data

                    let prices = Object.values(this.project.prices).sort(function (x, y) {
                        if (parseFloat(x.price) === parseFloat(y.price)) return 0
                        return parseFloat(x.price) > parseFloat(y.price) ? 1 : -1;
                    });

                    //console.log(this.project.min_price)
                    //console.log(this.project.max_price)

                    this.project.min_price = prices[0].price ? prices[0].price : 0
                    this.project.max_price = prices[prices.length - 1].price ? prices[prices.length - 1].price : 0

                    if (this.project.min_price && this.project.s_exp)
                        this.project.unity_min_price = parseFloat(this.project.min_price) / parseFloat(this.project.s_exp)
                    else
                        this.project.unity_min_price = 0

                    if (this.project.max_price && this.project.s_exp)
                        this.project.unity_max_price = parseFloat(this.project.max_price) / parseFloat(this.project.s_exp)
                    else
                        this.project.unity_max_price = 0

                    this.seoTitle = this.project.seo_title
                    this.seoDescription = this.project.seo_description
                    this.seoKeywords = this.project.seo_keywords


                    if('id' in response.data) {
                        let params = {
                            count: 1,
                            filter: {
                                typical: 1,
                                projects: [response.data.id]
                            }
                        }

                        Api.builtHouse.list(this.serialize(params)).then(response => {
                            if (response.status === 200) {
                                this.haveHouses = response.data > 0
                            }
                        })
                    }

                }
            })
            //this.activeCategoryAlias = this.$router.currentRoute.params.alias
        },

    }
</script>

<style scoped>
    .modal {
        background: #ebebeb;
        width: 100%;
        max-width: 650px;
    }

    #specialist .modal-body .text {
        width: 100%;
    }

</style>