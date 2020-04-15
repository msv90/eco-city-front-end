<template>
  <div class="container">

    <left-menu></left-menu>

    <main class="content">
      <div class="content_spacer">


        <div class="home">
          <div id="wrap">
            <div class="article">

              <div v-html="homeTextCompany"></div>

              <div v-html="sipPanelHomesProjects"></div>

              <div class="home_block">
                <div class="blocks_wrap main" v-if="projects && projects.mobile">

                  <div v-for="(project, i) in projects.mobile" :key="project.id" :class="'bx_catalog_item_container  block_clr  special_offer item-' + (parseInt(i) + 1) + 'alwayShow'">

                    <router-link :to="{path: '/proekty/' + project.alias}" class="bx_catalog_item_images">
                      <img class="greyscale" border="0" v-if="project.project_images" :src="project.project_images[0].path" width="290" height="190" style="float:left">
                    </router-link>

                    <router-link :to="{path: '/proekty/' + project.alias}">
                      <div class="bx_catalog_item_title">
                        <span class="title">{{ project.title }}</span>
                        <span class="area">Общая площадь: {{ project.s_common }} м2</span>
                        <span class="price">Цена: {{ priceRender(project.min_price) }} Р.</span>
                      </div>
                    </router-link>
                  </div>
                  <p class="see_all"><router-link :to="{path: '/proekty'}">Смотреть еще</router-link></p>

                  <div class="mobile_not_show" v-if="projects.all">
                    <div v-for="(project, i) in projects.all" :key="project.id" :class="'bx_catalog_item_container  block_clr  special_offer item-' + parseInt(i) + 4">
                      <router-link :to="{path: '/proekty/' + project.alias}" class="bx_catalog_item_images">
                        <img class="greyscale" border="0" v-if="project.project_images" :src="project.project_images[0].path" width="290" height="190" style="float:left">
                      </router-link>

                      <router-link :to="{path: '/proekty/' + project.alias}">
                        <div class="bx_catalog_item_title">
                          <span class="title">{{ project.title }}</span>
                          <span class="area">Общая площадь: {{ project.s_common }} м2</span>
                          <span class="price">Цена: {{ priceRender(project.min_price) }} Р.</span>
                        </div>
                      </router-link>
                    </div>

                  </div>

                </div>
                <p><router-link :to="{path: '/proekty'}"><b>Посмотреть все типовые проекты</b></router-link></p>
              </div>

              <div v-html="sipPanelHomesProjectsEnd"></div>

              <div v-html="aboutTechnology"></div>

              <div v-html="videos"></div>

              <!--<div v-html="customerRecommendations"></div>-->
              <!--<div v-html="customerRecommendations"></div>-->
              <template v-if="reviews">

                <div v-html="customerRecommendations"></div>

                <div class="home_block main">
                  <div class="block_clr bx_catalog_item_container" style="height: auto" :key="review.id" v-for="review in reviews">

                    <div :id="'#otz' + review.id" class="modal" v-if="review.material">
                      <img :src="review.material"/>
                      <a href="#" rel="modal:close">Close</a>
                    </div>

                    <div class="rewiew">
                      «{{cutHtml(review.short)}}<router-link :to="{name: 'Reviews'}" v-if="cutHtml(review.short).length !== cutHtml(review.text).length">[...]</router-link>»
                      <div>
                        <a :href="'#otz' + review.id" class="forma-link cboxElement" rel="modal:open" v-if="review.material">Посмотреть оригинал</a> <span class="title">{{review.client_name}}</span> <br>
                      </div>

                    </div>
                  </div>

                  <div style="clear:both">
                  </div>
                  <div class="hide">
                    <div :id="'otz' + review.id" :key="review.id" v-for="review in reviews">
                      <img :src="review.material">
                    </div>
                  </div>
                  <p>
                    <b>
                      <router-link :to="{name: 'Reviews'}">Читать все отзывы</router-link>
                    </b>
                  </p>
                </div>

              </template>

              <feedback-form-footer></feedback-form-footer>

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


      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

import LeftMenu from '../components/LeftMenu'
import FeedbackFormFooter from '../components/FeedbackFormFooter'
import Api from '../Api.js'

export default {
    name: 'Home',

    components: {
        "left-menu": LeftMenu,
        "feedback-form-footer": FeedbackFormFooter
    },

    /*metaInfo: {
        title: 'My Example App',
        meta: [{
            vmid: 'description',
            name: 'description',
            content: 'my standard description',
        }]
    },*/

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
            homeTextCompany: null,
            sipPanelHomesProjects: null,
            sipPanelHomesProjectsEnd: null,
            aboutTechnology: null,
            videos: null,
            customerRecommendations: null,
            reviews: null,
            projects: null,

            //seo
            title: null,
            seoTitle: '',
            seoDescription: '',
            seoKeywords: ''
        }
    },

    computed: {

        /*homeTextCompany(){
            let data = ""
            Api.page.getByCode("home_text_company").then(response => {
                if(response.status === 200)
                    data = response.data;
            })
            return data
        }*/

    },

    methods: {
        priceRender(price){
            return parseInt(price).toLocaleString('ru');
        },

        cutHtml(str){
            return str.replace(/<[^>]+>/g,'')
        }
    },

    created(){

        let data = [
            'home_text_company',
            'sip_panel_homes_projects',
            'about_technology',
            'videos',
            'customer_recommendations',
            'sip_panel_homes_projects_end'
        ]

        Api.page.getByCodes({codes: data}).then(response => {
            if(response.status === 200) {
                this.homeTextCompany = response.data["home_text_company"].data
                this.sipPanelHomesProjects = response.data["sip_panel_homes_projects"].data
                this.sipPanelHomesProjectsEnd = response.data["sip_panel_homes_projects_end"].data
                this.aboutTechnology = response.data["about_technology"].data
                this.videos = response.data["videos"].data
                this.customerRecommendations = response.data["customer_recommendations"].data
            }
        })

        Api.review.home().then(response => {
            if(response.status === 200) {
                this.reviews = response.data
                this.reviews.map(function (item) {
                    item.short = item.text.slice(0, 199);
                })
            }
        })

        Api.section.getByCode('home').then(response => {
            if(response.status === 200 && 'home' in response.data) {
                this.title = response.data['home'].title
                this.seoTitle = response.data['home'].seo_title
                this.seoDescription = response.data['home'].seo_description
                this.seoKeywords = response.data['home'].seo_keywords
            }
        })

        Api.project.homePage().then(response => {
            if(response.status === 200) {
                this.projects = response.data
            }
        })

        /*let myrequest = new XMLHttpRequest();
        myrequest.open('GET', "http://localhost:80/");

        myrequest.addEventListener("readystatechange", () => {

            if (myrequest.readyState === 4 && myrequest.status === 200) {
                console.log( myrequest.responseText );
            }
        });
        myrequest.send();*/

    }
}
</script>
