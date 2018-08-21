import headerCom from '@/components/common/header'
import asideCom from '@/components/common/aside'
import footerCom from '@/components/common/footer'

export default {
  install: function (vue) {
    vue.component('headerCom', headerCom)
    vue.component('asideCom', asideCom)
    vue.component('footerCom', footerCom)
  }
}
