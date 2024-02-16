const express = require('express')
const {readdirSync} = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./Config/db')
//const productRouter = require('./Routes/product.js')
//const authRouter = require('./Routes/auth.js')

const app = express();

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({ extended: true }))

//Route1
// app.get('/product',(req,res) => {
//     res.send('Hello Endpoint');
// })

//Route2
// app.use('/', productRouter)
// app.use('/', authRouter)

//Route3
readdirSync('./Routes')
    .map((r)=>app.use('/', require('./Routes/'+r)))



app.listen(5000,()=> console.log('server is running on port 5000'));

