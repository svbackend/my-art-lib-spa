import Vue from 'vue'
import VueI18n from 'vue-i18n'
import English from './en'

Vue.use(VueI18n)

const messages = {
  'en': English,
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

let i18n = new VueI18n({
  locale: 'en',
  messages,
})

export default i18n