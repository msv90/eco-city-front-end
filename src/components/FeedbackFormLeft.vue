<template>
    <div class="left_bottom">
        <div class="soc_link">
            <a class="vk" href="http://vk.com/ecocity78" target="_blank"><img width="39" height="39" alt="vk" src="/images/vk.jpg"></a>
        </div>

        <div class="contact_block">
            <span class="phone">+7 (812) 950-60-50</span>
            <span class="phone"><a class="forma-link cboxElement" href="#callback" rel="modal:open">Заказать звонок</a></span>

            <div class="modal" id="callback">

                <h3>Заказать звонок </h3>
                <div class="modal-body" v-if="!sended">

                    <div class="forma">
                        <form id="callback_form" method="post" enctype="multipart/form-data" @submit.prevent="sendForm">
                            <input type="hidden" name="form_title" value="Заказать звонок">
                            <div class="forma_line">
                                <div class="left-block-kontakt">
                                    <span class="title">Как Вас зовут  </span>
                                    <div class="alx_feed_back_form_inputtext_bg">
                                        <input type="text" class="text" size="40" name="name" required>
                                    </div>
                                </div>
                                <div class="right-block-kontakt">
                                    <span class="title">Контактный телефон  </span>
                                    <div class="alx_feed_back_form_inputtext_bg">
                                        <input type="text" class="text" size="40" name="phone" required>
                                    </div>
                                </div>
                            </div>

                            <div class="forma_line">
                                <div class="alx_feed_back_form_name">Текст сообщения (необязательно):</div>
                                <div class="alx_feed_back_form_inputtext_bg"><textarea cols="" rows="" name="text"></textarea></div>
                            </div>

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

            <span class="email"><br><span>e-mail: </span><a href="mailto:info@eco-city.spb.ru">info@eco-city.spb.ru</a></span>
            <br style="margin-bottom: 0; line-height: 10px;">
        </div>
        <div class="copyright">Группа компаний "Eco-City"<br style="margin-bottom: 0; line-height: 6px;">&copy; 2018</div>
    </div>

</template>

<script>

    import Api from '../Api.js'

    export default {
        name: 'FeedbackFormLeft',
        props: ['title'],
        data() {
            return {
                sended: false
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

                Api.form.send(form).then(response => {
                    if(response.status === 200)
                        this.sended = true
                })
            }
        }
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
