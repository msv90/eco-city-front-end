<template>
    <div class="contact-phone">
        <span>+7 (812) 950-60-50</span><br>
        <a  class="forma-link cboxElement contact-link"  href="#callback" rel="modal:open">Заказать звонок</a>



    </div>
</template>

<script>

    import Api from '../Api.js'

    export default {
        name: 'FeedbackForm',
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
