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
                        <li>
                            <router-link :to="{path: '/postroennye-doma'}" title="Построенные дома">
                                Построенные дома
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li class="active" >Построенные дома по проекту {{ title }}</li>
                    </ul>

                    <span class="back_link">Назад во
                        <router-link :to="{path: '/proekty'}" title="Все проекты">
                            Все проекты
                        </router-link>
                    </span>

                    <h1 class="rasdel_title">{{ title }}</h1>


                    <ul class="submenu">

                        <li>
                            <router-link :to="{path: '/proekty/' + alias}" >
                                Описание проекта
                            </router-link>
                        </li>
                        <li class="active">
                            <router-link :to="{path: '/proekty/' + alias + '/postroennye-po-proektu'}" >
                                Построенные дома по этому проекту
                            </router-link>
                        </li>

                    </ul>


                </div><!-- .header-->

                <div class="clear"></div>

                <div id="wrap" v-if="builtHouses">

                    <p class="rasdel_subtitle">
                        Построенные дома по проекту {{ title }}
                    </p>

                    <div class="blocks_wrap postroennye_doma" >

                        <div class="bx_catalog_item_container  block_clr" v-for="(builtHouse, i) in builtHouses" :key="builtHouse.id">
                            <a :href="builtHouse.built_house_images && builtHouse.built_house_images.length > 0 ? builtHouse.built_house_images[0].path : 'javascript:void(0)'"
                               :class="`bx_catalog_item_images gallery${i}`"
                               :style="`background-image: url(${builtHouse.built_house_images && builtHouse.built_house_images.length > 0 ? builtHouse.built_house_images[0].path : '/images/no_photo.jpg'}); background-size:290px; background-position: center; background-repeat: no-repeat;`"
                               :title="builtHouse.title" rel="group">

                                <div class="bx_catalog_item_title" style="display: block;">
                                    <span class="title">{{ builtHouse.title }}</span>
                                    <span class="description"></span>
                                </div>
                            </a>
                            <template v-if="builtHouse.built_house_images && builtHouse.built_house_images.length > 0">
                                <template v-for="(image, j) in builtHouse.built_house_images">
                                    <a :class="`gallery${i} gallery-item`" rel="group" :href="image.path" :key="image.id" v-if="j > 0">
                                        <img :src="image.path">
                                    </a>
                                </template>
                            </template>
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
    import Api from '../../Api'

    export default {
        name: 'ProjectsHouses',
        props: ['alias'],
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
                builtHouses: null,
                title: null,
                seoTitle: null,
                seoDescription: null,
                seoKeywords: null,
                project: null
            }
        },

        methods: {
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
            let _this = this
            $(document).ready(function(){

                for(let i in _this.builtHouses) {

                    if(_this.builtHouses[i].built_house_images && _this.builtHouses[i].built_house_images.length > 0) {
                        let selector = `a.gallery${i}`;
                        $(selector).fancybox();
                        $("a.modalbox").fancybox(
                            {
                                "frameWidth": 400,
                                "frameHeight": 400
                            }
                        );
                    }
                }
            });

        },

        mounted() {
            Api.project.getByAlias(this.alias).then(response => {
                this.project = response.data
                this.title = response.data.title

                if('id' in response.data) {
                    let params = {
                        filter: {
                            typical: 1,
                            projects: [response.data.id]
                        }
                    }

                    Api.builtHouse.list(this.serialize(params)).then(response => {
                        if (response.status === 200) {
                            this.builtHouses = response.data
                        }
                    })
                }

            })
        },

    }
</script>