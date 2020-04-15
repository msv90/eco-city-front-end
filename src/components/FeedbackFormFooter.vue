<template>
    <div id="wrap">
        <div class="title">
            Давайте начнем!
        </div>
        <p>
            Чтобы стать заказчиком, позвоните <strong>(812) 950-60-50</strong> или оставьте заявку на обратный звонок.
        </p>
        <div style="max-width: 500px;">



            <div class="alx_feed_back_form alx_feed_back_default" id="alx_feed_back_default_FID1">
                <div class="alx_feed_back_form_feedback_poles dealers forma_feedback forma_page">
                    <form id="f_feedback_FID1" name="f_feedback_FID1" @submit.prevent="sendForm" method="post" enctype="multipart/form-data">
                        <div>
                            <input type="hidden" name="form_title" value="Давайте начнём">
                            <p>
                                <label>Как вас зовут </label>
                                <input type="text" size="40" id="form_name" name="name" value="" class="text" required="required">
                            </p>
                            <p>
                                <label>Контактный телефон </label>
                                <input type="text" size="40" id="phone_name" name="phone" value="" class="text" placeholder="X (XXX) XXX-XX-XX" required="required">
                            </p>
                        </div>

                        <div class="clear"></div>
                        <div class="capcha" style="overflow:hidden;">

                            <input type="submit" class="fb_close btn btn_blue btn_order" id="send_form" name="send_form" value="Отправить">

                        </div>
                    </form>
                </div>


                <div class="forma_contacts">
                    <h2></h2>
                </div>
            </div>
            <br>
        </div>
        <br>

    </div>
</template>

<script>

    import Api from '../Api.js'

    export default {
        name: 'FeedbackFormFooter',
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
