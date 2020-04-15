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
                        <li class="active" >Все построенные дома</li>
                    </ul>


                    <h1 class="rasdel_title">{{ title }}</h1>


                    <ul class="submenu">

                        <li>
                            <router-link :to="{path: '/postroennye-doma/na-karte'}" >
                                Построенные дома на карте
                            </router-link>
                        </li>
                        <li class="active">
                            <router-link :to="{path: '/postroennye-doma'}" >
                                Все построенные дома
                            </router-link>
                        </li>

                    </ul>


                </div><!-- .header-->

                <div class="clear"></div>

                <div id="wrap">


                    <div v-if="builtHousesHeader" v-html="builtHousesHeader"></div>


                    <div class="page-navigation" v-if="paginationList">
                        <span class="page-number" style="text-align:left;">

                            <template v-for="(page, i) in paginationList">
                                <router-link :key="i"
                                             :to="{path: '/postroennye-doma?' + getQueryString(page.page)}"
                                             :title="page.label"
                                                v-if="!page.current">{{ page.label }}

                                </router-link>
                                <span v-else class="current" :key="i">{{ page.label }}</span>
                            </template>
                         стр.
                        </span>
                    </div>


                    <div class="blocks_wrap postroennye_doma" v-if="builtHouses">

                        <!--filter start-->
                        <form name="_form" method="get" class="smartfilter">
                            <div class="filter_top clearfix">
                                <p class="filter_title">Фильтр</p>
                                <p class="filter_hide"><a href="javascript:void(0)" @click="openFilter()">Скрыть</a></p>
                            </div>
                            <input type="hidden" name="combofilter-text-name" id="combofilter-text-name" value="">
                            <div id="filter_area" class="filtren">
                                <h5>Выбор по параметрам:</h5>
                                <ul>
                                    <li class="lvl1  project_type">
                                        <ul id="ul_22">
                                            <li class="lvl2">
                                                <div :class="`jq-checkbox check ${individual ? 'checked' : ''}`" @click="individual = !individual" style="user-select: none; display: inline-block; position: relative; overflow: hidden;">
                                                    <input type="checkbox" class="check" value="" id="individual" v-model="individual" style="position: absolute; z-index: -1; opacity: 0; margin: 0px; padding: 0px;">
                                                    <div class="jq-checkbox__div"></div>
                                                </div>
                                                <label for="individual">индивидуальный</label>
                                            </li>

                                            <li class="lvl2 standard">
                                                <div :class="`jq-checkbox check ${typical ? 'checked' : ''}`" @click="typical = !typical" style="user-select: none; display: inline-block; position: relative; overflow: hidden;">
                                                    <input type="checkbox" class="check" value="" id="typical" v-model="typical" style="position: absolute; z-index: -1; opacity: 0; margin: 0px; padding: 0px;">
                                                    <div class="jq-checkbox__div"></div>
                                                </div>
                                                <label for="typical">типовой</label>
                                            </li>
                                        </ul>
                                        <div class="project-list">
                                            <div> <!--:class="`jq-select-multiple jqselect width-260 standardList ${typical ? '' : 'disabled'}`" style="display: inline-block; position: relative"-->
                                                <select v-model="projects" multiple="" size="4" class="width-260 standardList" :disabled="!typical" v-if="projectList">
                                                    <option :value="project.id" v-for="project in projectList" :key="project.id">{{ project.title }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                </ul>



                                <div class="sbrosit clearfix" style="margin: 15px auto 0 auto;">
                                    <router-link class="sbrosit_parametry_filtra" :to="{path: '/postroennye-doma', query: { PAGEN_1: currentPage }}">
                                        Сбросить параметры фильтра
                                    </router-link>
                                </div>
                                <input type="button" id="set_filter" name="set_filter" @click="setFilter()">
                                <!--	<input type="submit" id="del_filter" name="del_filter" value="Сбросить" /> -->
                            </div>

                        </form>
                        <!--filter finish-->


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

                </div>


                <div v-if="builtHousesFooter" v-html="builtHousesFooter"></div>


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
        name: 'BuiltHouses',
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
                builtHouses: null,
                lastPage: null,
                currentPage: null,
                arPages: [],

                //seo
                title: null,
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',

                //filter
                individual: false,
                typical: false,
                projects: [],

                projectList: null,
                paginationList: null,

                builtHousesHeader: null,
                builtHousesFooter: null
            }
        },

        methods: {

            prepareParams(page){
                let params = {
                    page: page
                }

                let filter = {}

                if(this.individual)
                    filter['individual'] = 1

                if(this.typical)
                    filter['typical'] = 1

                if(this.projects.length > 0)
                    filter['projects'] = this.projects

                if(JSON.stringify(filter) !== '{}')
                    params['filter'] = filter

                return params
            },

            getQueryString(page){

                let params = {
                    PAGEN_1: page
                }

                let filter = {}

                let q = this.$route.query
                let projects = []
                for (let key in q){
                    if(key.includes('individual')){
                        filter['individual'] = q[key] === '1' ? 1 : 0
                    }

                    if(key.includes('typical')){
                        filter['typical'] = q[key] === '1' ? 1 : 0
                    }

                    if(key.includes('projects')){
                        projects.push(q[key])
                    }
                }

                if(projects.length > 0)
                    filter['projects'] = projects

                if(JSON.stringify(filter) !== '{}')
                    params['filter'] = filter

                return this.serialize(params)
            },

            setFilter(){

                let params = {
                    PAGEN_1: 1
                }

                let filter = {}

                if(this.individual)
                    filter['individual'] = 1

                if(this.typical)
                    filter['typical'] = 1

                if(this.projects.length > 0)
                    filter['projects'] = this.projects

                if(JSON.stringify(filter) !== '{}')
                    params['filter'] = filter

                this.$router.push({path: '/postroennye-doma?' + this.serialize(params)});
                this.updateBuiltHomes()
            },

            openFilter(){
                let element = document.getElementById('filter_area')
                if(element){
                    element.style.display = element.style.display === 'none' ? '' : 'none'
                }
            },

            updateBuiltHomes(){

                //let page = this.$route.query['PAGEN_1'] ? this.$route.query['PAGEN_1'] : 1

                let q = this.$route.query
                this.projects = []
                for (let key in q){
                    if(key.includes('individual')){
                        this.individual = q[key] === '1'
                    }

                    if(key.includes('typical')){
                        this.typical = q[key] === '1'
                    }

                    if(key.includes('projects')){
                        this.projects.push(q[key])
                    }
                }

                let params = this.prepareParams(this.$route.query['PAGEN_1'] ? this.$route.query['PAGEN_1'] : 1)

                Api.builtHouse.list(this.serialize(params)).then(response => {
                    if(response.status === 200) {
                        this.currentPage = response.data.current_page
                        this.builtHouses = response.data.data
                        this.paginationList = this.getPaginationArray(response.data.current_page, response.data.last_page)
                        //console.log(response.data)
                    }
                })
            },

            getProjectList(){
                let params = {
                    filter: {}
                }
                Api.project.list(params).then(response => {
                    if (response.status === 200) {
                        this.projectList = response.data
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

            getPaginationArray(current, end){
                let arLinks = []

                if(current !== 1)
                    arLinks.push({label: '<', page: current - 1, current: false})

                if(end <= 8){
                    for (let i = 1; i <= end; i++)
                        arLinks.push({label: i, page: i, current: current === i})
                } else {
                    if(current <= 4){
                        for (let i = 1; i <= 6; i++)
                            arLinks.push({label: i, page: i, current: current === i})

                        arLinks.push({label: '...', page: Math.round((end + 6) / 2), current: current === Math.round((end - 6) / 2)})
                        arLinks.push({label: end, page: end, current: current === end})
                    } else if(current >= (end - 4)){

                        arLinks.push({label: 1, page: 1, current: current === 1})
                        arLinks.push({label: '...', page: Math.round(((end - 4) + 1) / 2), current: current === Math.round(((end - 4) + 1) / 2)})

                        for (let i = (end - 5); i <= end; i++) {
                            arLinks.push({label: i, page: i, current: current === i})
                        }

                    } else {
                        arLinks.push({label: 1, page: 1, current: false})
                        arLinks.push({label: '...', page: Math.round(((current - 2) + 1) / 2), current: false})

                        arLinks.push({label: current - 2, page: current - 2, current: false})
                        arLinks.push({label: current - 1, page: current - 1, current: false})
                        arLinks.push({label: current, page: current, current: true})
                        arLinks.push({label: current + 1, page: current + 1, current: false})
                        arLinks.push({label: current + 2, page: current + 2, current: false})


                        arLinks.push({label: '...', page: Math.round((end + (current + 2)) / 2), current: false})
                        arLinks.push({label: end, page: end, current: false})
                    }

                }

                if(current !== end)
                    arLinks.push({label: '>', page: current + 1, current: false})

                return arLinks
            }
        },

        watch: {
            pageParam: function () {
                this.updateBuiltHomes()
            }
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

            Api.section.getByCode('postroennye-doma').then(response => {
                if(response.status === 200){
                    if('postroennye-doma' in response.data) {
                        this.title = response.data['postroennye-doma'].title
                        this.seoTitle = response.data['postroennye-doma'].seo_title
                        this.seoDescription = response.data['postroennye-doma'].seo_description
                        this.seoKeywords = response.data['postroennye-doma'].seo_keywords
                    } else if ('home' in response.data) {
                        this.title = response.data['home'].title
                        this.seoTitle = response.data['home'].seo_title
                        this.seoDescription = response.data['home'].seo_description
                        this.seoKeywords = response.data['home'].seo_keywords
                    }
                }
            })

            let data = [
                'built_houses_header',
                'built_houses_footer'
            ]

            Api.page.getByCodes({codes: data}).then(response => {
                if(response.status === 200) {
                    this.builtHousesHeader = response.data["built_houses_header"].data
                    this.builtHousesFooter = response.data["built_houses_footer"].data
                }
            })


            this.getProjectList()
            this.updateBuiltHomes()
            //this.activeCategoryAlias = this.$router.currentRoute.params.alias
        },

    }
</script>

<style scoped>
    .standardList {
        height: 116px;
        width: 240px;
        opacity: 1;
    }

</style>