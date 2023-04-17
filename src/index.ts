import express from 'express'
import cors from 'cors'
// import { getProductsById } from './endpoints/products/getProductById'
// import { getUserPurchasesByUserId } from './endpoints/purchases/getUserPurchasesByUserId'
import { getUsers } from './endpoints/users/getUsers'
import { getProducts } from './endpoints/products/getProducts'
import { createProduct } from './endpoints/products/postCreateProduct'
import { createPurchase } from './endpoints/purchases/postCreatePurchases'
import { createUser } from './endpoints/users/postCreateUser'
import { removeProduct } from './endpoints/products/delProductById'
import { removeUser } from './endpoints/users/delUserById'
// import { editUser } from './endpoints/users/putUserById'
import { editProduct } from'./endpoints/products/putProductById'
import { removePurchase } from './endpoints/purchases/delPurchaseById'


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/users', getUsers)
app.post('/users', createUser)
app.delete('/users/:id', removeUser)
// app.put('/users/:id', editUser)

app.get('/products', getProducts)
// app.get('/products/:id', getProductsById)
app.post('/products', createProduct)
app.delete('/products/:id', removeProduct)
app.put('/products/:id', editProduct)

app.post('/purchases', createPurchase)
app.delete('/purchases/:id', removePurchase)
// app.get('/users/:id/purchases', getUserPurchasesByUserId)
