import {createApp, onMounted, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const URL = 'https://ec-course-api.hexschool.io/v2'
const PATH = 'ryann'

createApp({
  setup() {
    const products = ref([])

    const checkLogin = async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
          "$1",
        )
        console.log(token)
        axios.defaults.headers.common['Authorization'] = token

        const res = await axios.post(`${URL}/api/user/check`)
        console.log(res.data)
      } catch(err) {
        alert(err.response.data.message)
        window.location = 'login.html'
      }
    }

    const getProducts = async () => {
      try {
        const res = await axios.get(`${URL}/api/${PATH}/admin/products`)
        console.log(res)
        products.value = res.data.products
      } catch(err) {
        alert(err.response.data.message)
      }
    }
    // TODO 新增商品
    const createProduct = () => {
      // TODO 跳出新增視窗
      console.log('create button')
    }
    // TODO 編輯商品
    const editProduct = () => {
      // TODO 跳出編輯視窗
      console.log('edit button')
    }
    // TODO 刪除商品
    const deleteProduct = () => {
      // TODO 跳出確認刪除視窗
      console.log('delete button')
    }
 
    onMounted(async () => {
      try {
        await checkLogin()
        await getProducts()
      } catch (err) {
        console.error('出現未經處理的錯誤')
      }
    })

    return {
      products,
      createProduct,
      editProduct,
      deleteProduct
    }
  }
}).mount('#app')