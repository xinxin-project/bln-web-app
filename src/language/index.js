import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCNLocale from './zh-CN'

Vue.use(VueI18n)

const messages = {
  zhCN: {
    ...zhCNLocale,
  }
}

const i18n = new VueI18n({
  locale: 'zhCN', // set locale
  messages
})


export default i18n
