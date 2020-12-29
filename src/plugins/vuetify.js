import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: '#5F9EA0',
                secondary: '#aaaaaa',
            },
            light: {
                primary: '#5F9EA0',
            }
        }
    },
}

export default new Vuetify(opts)
