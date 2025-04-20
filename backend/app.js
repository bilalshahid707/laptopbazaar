const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const laptopRouter = require('./routes/laptopRoutes')
const userRouter = require('./routes/userRoutes')
const supplierRouter = require('./routes/supplierRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const cors = require('cors')
const path =  require("path")
const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(cors({
  origin: "*", 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization","Set-cookie","userId"],
}));
app.options("*", cors());

// Body parser
app.use(express.json())


app.use('/api/v1/laptops',laptopRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/suppliers',supplierRouter)
app.use('/api/v1/reviews',reviewRouter)
module.exports=app