import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
//import axios from 'axios'

import '../public/styles.scss'

Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

var interceptor = function(open) {

    let activeXhr = [];
    let flag = false
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

        this.addEventListener('readystatechange', function() {
            //console.log(this.readyState)
            switch(this.readyState){

                case 1:
                    activeXhr.push(this);
                    break;

                /*case 4:
                    var i = activeXhr.indexOf(this);

                    if(i > -1)
                        activeXhr.splice(i ,1);

                    if(!activeXhr.length && !flag){

                        //setTimeout(function () {
                            let path = window.location.pathname

                            if(path.substr(-1) === '/' && path.length > 1)
                                path = path.slice(0, -1)

                            axios.post('http://local.eco-city.ru/api/seoCache', {
                                code: path,
                                html: document.documentElement.innerHTML
                            })
                        //}, 1000);

                        flag = true
                    }

                    break;*/
            }

        }, false);

        this.addEventListener('load', function() {
            var i = activeXhr.indexOf(this);

            if(i > -1)
                activeXhr.splice(i ,1);

            if(!activeXhr.length && !flag){

                //setTimeout(function () {
                let path = window.location.pathname

                if(path.substr(-1) === '/' && path.length > 1)
                    path = path.slice(0, -1)

                /*axios.post('http://local.eco-city.ru/api/seoCache', {
                    code: path,
                    html: document.documentElement.innerHTML
                })*/
                //}, 1000);

                flag = true
            }
        }, false);

        open.call(this, method, url, async, user, pass);
    };

}

interceptor(XMLHttpRequest.prototype.open);