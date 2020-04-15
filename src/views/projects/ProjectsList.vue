<template>
    <div class="container">

        <left-menu></left-menu>

        <main class="content">
            <div class="content_spacer">


                <!--for inner pages-->
                <div class="header">
                    <feedback-form :title="'Готовые проекты'"></feedback-form>

                    <ul class="breadcrumbs">
                        <li>
                            <router-link :to="{path: '/'}" title="Главная">
                                Главная
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li>
                            <router-link :to="{path: '/proekty'}" title="Плюсы и Минусы СИП">
                                Готовые проекты
                            </router-link>
                        </li>
                        <li>&nbsp;&mdash;</li>
                        <li class="active">Все проекты</li>
                    </ul>


                    <h1 class="rasdel_title">Готовые проекты</h1>



                </div><!-- .header-->

                <div class="clear"></div>

                <div id="wrap" class="proecty_block">
                    <h2></h2>
                    <div class="blocks_wrap proecty" v-if="projects">



                        <div class="kombox-filter" id="kombox-filter">
                            <form name="filter_form" action="/proekty" method="get" class="smartfilter">
                                <div class="filter_top clearfix">
                                    <p class="filter_title">Фильтр</p>
                                    <p class="filter_hide"><a href="javascript:void(0)" @click="openArea('filter_area')" >Скрыть</a></p>
                                </div>

                                <input type="hidden" name="bitrix_include_areas" id="bitrix_include_areas" value="N">
                                <input type="hidden" name="combofilter-text-name" id="combofilter-text-name" value="">

                                <div class="filtren" id="filter_area">
                                    <!--<h5></h5>-->
                                    <ul>
                                        <li>
                                        </li>
                                        <li class="lvl1">
                                            <a href="javascript:void(0)" @click="openArea('name_area')" class="showchild">
                                                Поиск по названию проекта
                                            </a>
                                            <ul id="name_area" style="display: none;">
                                                <div class="kombox-text kombox-filter-property-body" data-name="name">
                                                    <input class="kombox-text kombox-num-from" type="text" name="combofilter-text-name" v-model="filter.title" @change="calculateFilter" size="28">

                                                </div>
                                            </ul>
                                        </li>
                                        <li class="lvl1">
                                            <a href="javascript:void(0)" @click="openArea('ul_96')" class="showchild">
                                                Цена, руб.
                                            </a>
                                            <ul id="ul_96">
                                                <div class="kombox-combo kombox-filter-property-body" data-name="price_filter_iblock">
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.price.to1000000" name="price_filter_iblock" id="arrProektyFilter_96_3841088110" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_96_3841088110">До 1 000 000 <span class="kombox-cnt" v-if="filterValues.price.to1000000">({{ filterValues.price.to1000000 }})</span></label>
                                                    </div>
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.price.from1000000to1500000" name="price_filter_iblock" id="arrProektyFilter_96_59016419" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_96_59016419">1 000 000 - 1 500 000 <span class="kombox-cnt" v-if="filterValues.price.from1000000to1500000">({{ filterValues.price.from1000000to1500000 }})</span></label>
                                                    </div>
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.price.from1500000" name="price_filter_iblock" id="arrProektyFilter_96_1377892512" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_96_1377892512">От 1 500 000 <span class="kombox-cnt" v-if="filterValues.price.from1500000">({{ filterValues.price.from1500000 }})</span></label>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li class="lvl1">
                                            <a href="#" @click="openArea('ul_97')" class="showchild">
                                                Площадь (кв.м)
                                            </a>
                                            <ul id="ul_97">
                                                <div class="kombox-combo kombox-filter-property-body" data-name="area_filter_iblock">
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.s.to100" name="area_filter_iblock" id="arrProektyFilter_97_367216701" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_97_367216701">От 100 <span class="kombox-cnt" v-if="filterValues.s.to100">({{ filterValues.s.to100 }})</span></label>
                                                    </div>
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.s.from100to150" name="area_filter_iblock" id="arrProektyFilter_97_635510571" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_97_635510571">От 100 до 150 <span class="kombox-cnt" v-if="filterValues.s.from100to150">({{ filterValues.s.from100to150 }})</span></label>
                                                    </div>
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.s.from150to200" name="area_filter_iblock" id="arrProektyFilter_97_149453456" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_97_149453456">От 150 до 200 <span class="kombox-cnt" v-if="filterValues.s.from150to200">({{ filterValues.s.from150to200 }})</span></label>
                                                    </div>
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.s.from200" name="area_filter_iblock" id="arrProektyFilter_97_3882686443" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_97_3882686443">От 200 <span class="kombox-cnt" v-if="filterValues.s.from200">({{ filterValues.s.from200 }})</span></label>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li class="lvl1">
                                            <a href="#" @click="openArea('ul_11')" class="showchild">
                                                Этажность
                                            </a>
                                            <ul id="ul_11">
                                                <div class="kombox-combo kombox-filter-property-body" data-name="etagnost">
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.levels.l1" name="etagnost" id="arrProektyFilter_11_4194326291" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_11_4194326291">1 <span class="kombox-cnt" v-if="filterValues.levels.l1">({{ filterValues.levels.l1 }})</span></label>
                                                    </div>
                                                    <div class="lvl2">
                                                        <input type="checkbox" v-model="filter.levels.l2" name="etagnost" id="arrProektyFilter_11_2366072709" @change="calculateFilter">
                                                        <label class="label-in-filter" for="arrProektyFilter_11_2366072709">2 <span class="kombox-cnt" v-if="filterValues.levels.l2">({{ filterValues.levels.l2 }})</span></label>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                    </ul>

                                    <div class="sbrosit clearfix">
                                        <a class="sbrosit_parametry_filtra" href="#" @click="resetFilter">Сбросить параметры фильтра</a>
                                    </div>

                                    <input type="button" id="set_filter" value="" @click="setFilter">
                                </div>
                            </form>
                        </div>





                        <div class="bx_catalog_item_container  block_clr" v-for="project in projects" :key="project.id">

                            <!--<a :href="'/proekty/' + project.alias" class="bx_catalog_item_images" :style='`background-image: url("` + project.image.path + `"); background-position: center bottom; background-repeat: no-repeat;`' :title="'Проект ' + project.title">
                                <div class="bx_catalog_item_title" style="display: block;">
                                    <span class="title">{{ project.title }}</span>

                                    <span class="area">Общая площадь: {{ project.s_common }} м2</span>
                                    <span class="price">Цена: {{ priceRender(project.min_price) }} Р.</span>
                                </div>
                            </a>-->

                            <router-link :to="{path: '/proekty/' + project.alias}" class="bx_catalog_item_images" :style='`background-image: url("` + project.image.path + `"); background-position: center bottom; background-repeat: no-repeat; background-size: cover; background-position: top bottom;`' :title="'Проект ' + project.title">
                                <div class="bx_catalog_item_title" style="display: block;">
                                    <span class="title">{{ project.title }}</span>

                                    <span class="area">Общая площадь: {{ project.s_common }} м2</span>
                                    <span class="price">Цена: {{ priceRender(project.min_price) }} Р.</span>
                                </div>
                            </router-link>


                        </div>

                    </div>

                </div>

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
        name: 'ProjectsList',
        components: {
            "left-menu": LeftMenu,
            "feedback-form": FeedbackForm,
            "feedback-form-footer": FeedbackFormFooter
        },

        data() {
            return {
                projects: null,
                //activeCategoryAlias: null

                filter: {
                    title: '',
                    price: {
                        to1000000: false,
                        from1000000to1500000: false,
                        from1500000: false
                    },
                    s: {
                        to100: false,
                        from100to150: false,
                        from150to200: false,
                        from200: false
                    },
                    levels: {
                        l1: false,
                        l2: false
                    }
                },

                filterValues: {
                    price: {
                        to1000000: 0,
                        from1000000to1500000: 0,
                        from1500000: 0
                    },
                    s: {
                        to100: 0,
                        from100to150: 0,
                        from150to200: 0,
                        from200: 0
                    },
                    levels: {
                        l1: 0,
                        l2: 0
                    }
                },

                content: null,

                filterAnswer: null,

                //seo
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
                openNameSearchFlag: false
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

        /*watch: {
            filter: function () {
                console.log(this.filter)
            }
        },*/

        methods: {
            openArea(code){
                let element = document.getElementById(code)
                if(element){
                    element.style.display = element.style.display === 'none' ? '' : 'none'
                }
            },

            priceRender(price){
                return parseInt(price).toLocaleString('ru');
            },

            calculateFilter(){

                let params = {
                    filter: this.filter
                }

                Api.project.calculateFilter(this.serialize(params)).then(response => {
                    if (response.status === 200) {
                        this.filterValues = response.data
                    }
                })
            },

            updateProjects(){

                let params = {
                    filter: this.filter
                }

                Api.project.list(this.serialize(params)).then(response => {
                    if (response.status === 200) {
                        this.projects = response.data
                    }
                })
            },

            setFilter(){

                let activeFilter = {}
                for (let i in this.filter){

                    if(i === 'title'){
                        activeFilter[i] = this.filter[i]
                        continue;
                    }

                    let section = {}
                    for(let j in this.filter[i]){
                        if(this.filter[i][j]){
                            section[j] = 1
                        }
                    }

                    if(Object.keys(section).length > 0)
                        activeFilter[i] = section
                }

                this.$router.push({path: '/proekty?' + this.serialize({filter: activeFilter})});

                this.processingFilterQuery()
                this.updateProjects()
                this.calculateFilter()
            },

            resetFilter(ev) {

                ev.preventDefault()

                this.filter = {
                    title: '',
                        price: {
                        to1000000: false,
                            from1000000to1500000: false,
                            from1500000: false
                    },
                    s: {
                        to100: false,
                            from100to150: false,
                            from150to200: false,
                            from200: false
                    },
                    levels: {
                        l1: false,
                            l2: false
                    }
                }

                this.$router.push({path: '/proekty'});

                this.updateProjects()
                this.calculateFilter()
            },

            processingFilterQuery(){
                for (let i in this.filter) {
                    if(i === 'title'){
                        this.filter[i] = this.$route.query['filter[' + i + ']'] ? this.$route.query['filter[' + i + ']'] : ''
                        continue
                    }

                    for (let j in this.filter[i]) {
                        this.filter[i][j] = this.$route.query['filter[' + i + '][' + j + ']'] ? true : false
                    }
                }

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
            }

        },

        mounted() {

            //console.log(this.$route.query["filter[price][to1000000]"])
            this.processingFilterQuery()
            this.updateProjects()
            this.calculateFilter()

            Api.page.getByCode("projects_text").then(response => {
                if (response.status === 200)
                    this.content = response.data.data;
            })

            Api.section.getByCode('proekty').then(response => {
                if(response.status === 200){
                    if('proekty' in response.data) {
                        this.title = response.data['proekty'].title
                        this.seoTitle = response.data['proekty'].seo_title
                        this.seoDescription = response.data['proekty'].seo_description
                        this.seoKeywords = response.data['proekty'].seo_keywords
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

<style scoped>


</style>