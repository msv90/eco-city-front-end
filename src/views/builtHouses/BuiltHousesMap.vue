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
                            <router-link :to="{path: '/postroennye-doma'}" title="Дома на карте">
                                Построенные дома
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li class="active" >Дома на карте</li>
                    </ul>


                    <h1 class="rasdel_title">{{ title }}</h1>


                    <ul class="submenu">

                        <li class="active">
                            <router-link :to="{path: '/postroennye-doma/na-karte'}" >
                                Построенные дома на карте
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path: '/postroennye-doma'}" >
                                Все построенные дома
                            </router-link>
                        </li>

                    </ul>


                </div><!-- .header-->

                <div class="clear"></div>

                <br><br>

                <div id="wrap">

                    <div id="map_div" style="width:850px; height:500px"></div>

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
        name: 'BuiltHousesMap',
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

                builtHouse: []
            }
        },

        created() {
            if(!window['ymaps']) {
                Api.keyValue.getByKey('YANDEX_MAPS_KEY').then(response => {
                    (function (w, d, u) {
                        let s = d.createElement('script')
                        s.src = u
                        let h = d.getElementsByTagName('script')[0]
                        h.parentNode.insertBefore(s, h)
                    })(window, document, `https://api-maps.yandex.ru/2.1/?apikey=${response.data.value}&lang=ru`)
                })
            }
        },

        mounted() {

            Api.section.getByCode('postroennye-doma-na-karte').then(response => {
                if(response.status === 200){
                    if('postroennye-doma-na-karte' in response.data) {
                        this.title = response.data['postroennye-doma-na-karte'].title
                        this.seoTitle = response.data['postroennye-doma-na-karte'].seo_title
                        this.seoDescription = response.data['postroennye-doma-na-karte'].seo_description
                        this.seoKeywords = response.data['postroennye-doma-na-karte'].seo_keywords
                    } else if ('home' in response.data) {
                        this.title = response.data['home'].title
                        this.seoTitle = response.data['home'].seo_title
                        this.seoDescription = response.data['home'].seo_description
                        this.seoKeywords = response.data['home'].seo_keywords
                    }
                }
            })

            Api.builtHouse.list('mode=map').then(response => {
                if(response.status === 200) {
                    this.builtHouses = response.data

                    let builtHouses = []

                    let x = 0
                    let y = 0

                    for(let obj of this.builtHouses) {
                        if(obj.coordinate_x && obj.coordinate_y) {
                            x += parseFloat(obj.coordinate_x)
                            y += parseFloat(obj.coordinate_y)

                            builtHouses.push(obj)
                        }
                    }

                    x = x / builtHouses.length
                    y = y / builtHouses.length

                    var count = 0;
                    var timerId = setTimeout((builtHouses, x, y) => {
                        if(window['ymaps']) {
                            let ymaps = window['ymaps']
                            ymaps.ready(function(){

                                let map = new ymaps.Map("map_div", {
                                    center: [x, y],
                                    zoom: 4
                                });

                                for(let obj of builtHouses){
                                    map.geoObjects.add(new ymaps.Placemark([obj.coordinate_x, obj.coordinate_y]));
                                }
                            });
                            clearInterval(timerId)
                        }
                        count++;
                        if(count === 20) clearInterval(timerId)

                    }, 500, builtHouses, x, y);

                }
            })

        },

    }
</script>
