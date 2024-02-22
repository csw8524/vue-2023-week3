import {createApp, onMounted, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const URL = 'https://ec-course-api.hexschool.io/v2'
const PATH = 'ryann'


createApp({
  setup() {
    const products = ref([])
    const productModalRef = ref(null)
    const delProductModalRef = ref(null)
    const isEdit = ref(false)
    const tempProduct = ref({
      imagesUrl: []
    })
    let productModal
    let delProductModal

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
    const openModal = (mode, item = {}) => {
      tempProduct.value = {
        ...tempProduct.value,
        ...item
      }
      console.log(tempProduct.value)
      if (mode === 'create') {
        isEdit.value = false
        productModal.show()
      } else if (mode === 'edit') {
        isEdit.value = true
        productModal.show()
      } else if (mode === 'delete') {
        delProductModal.show()
      }
    }
    // TODO 新增商品、編輯商品 利用 isEdit 判斷模式
    const submitProduct = () => {
      if (isEdit.value) {
        console.log('edit button')
        console.log(tempProduct.value)
      } else {
        console.log('create button')
        console.log(tempProduct.value)
      }
    }
    // TODO 刪除商品
    const deleteProduct = () => {
      console.log('delete button')
    }
 
    onMounted(async () => {
      try {
        await checkLogin()
        await getProducts()

        productModal = new bootstrap.Modal(productModalRef.value, {
          keyboard: false,
          backdrop: 'static'
        })
        delProductModal = new bootstrap.Modal(delProductModalRef.value, {
          keyboard: false,
          backdrop: 'static'
        })
      } catch (err) {
        console.error('出現未經處理的錯誤')
      }
    })

    return {
      products,
      productModalRef,
      delProductModalRef,
      isEdit,
      tempProduct,
      openModal,
      submitProduct,
      deleteProduct,
    }
  }
}).mount('#app')