import express from 'express'
import cors from 'cors'
import { getProductsById } from './endpoints/products/getProductById'
import { getUserPurchasesByUserId } from './endpoints/purchases/getUserPurchasesByUserId'
import { getAllUsers } from './endpoints/users/getAllUsers'
import { getAllProducts } from './endpoints/products/getAllProducts'
import { getProductByName } from './endpoints/products/getProductByName'
import { createProduct } from './endpoints/products/postCreateProduct'
import { createPurchase } from './endpoints/purchases/postCreatePurchases'
import { createUser } from './endpoints/users/postCreateUser'
import { removeProduct } from './endpoints/products/delProductById'
import { removeUser } from './endpoints/users/delUserById'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/users', getAllUsers)
app.post('/users', createUser)
app.delete('/users/:id', removeUser)
app.put('/users/:id', removeUser)

app.get('/products', getAllProducts)
app.get('/products/search', getProductByName)
app.get('/products/:id', getProductsById)
app.post('/products', createProduct)
app.delete('/products/:id', removeProduct)

app.post('/purchases', createPurchase)
app.get('/users/:id/purchases', getUserPurchasesByUserId)
