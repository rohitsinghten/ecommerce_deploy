import {create} from 'zustand'

export const useProductStore = create((set) => ({
  products : [],
  setProducts : (products) => set({products}),
  createProduct : async (newProduct) => {
    if(!newProduct.name || !newProduct.price || !newProduct.image){
      return {'success' : false, 'message' : 'all fields are required - name price image'}
    }
    const res = await fetch('http://localhost:3000/api/products', {
      method  : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newProduct)
    })
    const data = await res.json()
    set((state)=>({products : [...state.products, data.data]}))
    return {'success' : true, 'message' : 'product created successfully', 'data' : data.data}
  },
  fetchProducts : async () => {
    const res = await fetch('http://localhost:3000/api/products')
    const data = await res.json()
    set({products : data.data})
  },
  deleteProducts : async (pid) => {
    const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
      method : 'DELETE'
    })
    const data = await res.json()
    if(!data.success){
      return {'success' : false, 'message' : 'error while deleting product'}
    }
    set((state) => ({products : state.products.filter(ele => ele._id !== pid)}))
    return {'success' : true, 'message' : 'successfully deleted product'}
  },
  updateProduct : async (pid, updatedProduct) => {
    if(!updatedProduct.name || !updatedProduct.price || !updatedProduct.image){
      return {'success' : false, 'message' : 'all fields are required - name price image'}
    }
    const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(updatedProduct)
    })
    const data = await res.json()
    if(!data.success){
      return {'success' : false, 'message' : 'error while updating product'}
    }
    set((state) => ({products : state.products.map(ele => ele._id === pid ? data.data : ele)}))
    return {'success' : true, 'message' : 'successfully updated product', 'data' : data.data}
  }

}))