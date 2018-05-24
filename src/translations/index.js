import Vue from 'vue'
import VueI18n from 'vue-i18n'
import English from './en'
import MessageFormat from 'messageformat'

Vue.use(VueI18n)

const messages = {
  'en': English,
  'ru': {},
  'uk': {},
  'pl': {},
}

let defaultLocale = 'en'
let locale = defaultLocale
let userLocales = navigator.languages

let lang;
for (lang of userLocales) {
  lang = lang.substring(0, 2);
  if (typeof messages[lang] !== 'undefined') {
    locale = lang;
    if (lang !== defaultLocale) {
      messages[lang] = require('@/translations/' + lang).default;
    }
    break;
  }
}

class CustomFormatter {
  constructor (options = {}) {
    this._locale = options.locale || defaultLocale
    this._formatter = new MessageFormat(this._locale)
    //this._formatter.setIntlSupport(true)
    this._caches = Object.create(null)
  }

  interpolate (message, values) {
    let fn = this._caches[message]
    if (!fn) {
      fn = this._formatter.compile(message, this._locale)
      this._caches[message] = fn
    }
    return [fn(values)]
  }
}

const formatter = new CustomFormatter({ locale })

let i18n = new VueI18n({
  'locale': locale,
  'fallbackLocale': defaultLocale,
  formatter,
  messages,
})

export default i18n