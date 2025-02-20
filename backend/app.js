const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const laptopRouter = require('./routes/laptopRoutes')
const userRouter = require('./routes/userRoutes')
const supplierRouter = require('./routes/supplierRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const cors = require('cors')
const app = express()

const model = require('./models/reviewModel')

app.use(cors({
    origin: '*', // Allow all origins (for development)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const reviews = [
    {
        "review": "great laptop for gaming! runs all the latest games smoothly.",
        "rating": 5,
        "user": "67ab801279012ae8055ddcd7",
        "laptop": "67b3863b48e1adeb6b06aff1"
      },
      {
        "review": "good performance but the battery life could be better.",
        "rating": 4,
        "user": "67ab804579012ae8055ddcdb",
        "laptop": "67b3863b48e1adeb6b06aff1"
      },
      {
        "review": "excellent build quality and display is stunning.",
        "rating": 5,
        "user": "67af9da619417813aa4d9afa",
        "laptop": "67b3863b48e1adeb6b06aff1"
      },
      {
        "review": "perfect for work and entertainment. highly recommended.",
        "rating": 5,
        "user": "67ab801279012ae8055ddcd7",
        "laptop": "67b3863b48e1adeb6b06afef"
      },
      {
        "review": "good value for money but gets hot under heavy load.",
        "rating": 4,
        "user": "67ab804579012ae8055ddcdb",
        "laptop": "67b3863b48e1adeb6b06afef"
      },
      {
        "review": "lightweight and portable, ideal for students.",
        "rating": 5,
        "user": "67af9da619417813aa4d9afa",
        "laptop": "67b3863b48e1adeb6b06afef"
      },
      {
        "review": "fast and reliable, but the keyboard could be better.",
        "rating": 4,
        "user": "67ab801279012ae8055ddcd7",
        "laptop": "67b3863b48e1adeb6b06aff0"
      },
      {
        "review": "amazing performance for the price. no complaints.",
        "rating": 5,
        "user": "67ab804579012ae8055ddcdb",
        "laptop": "67b3863b48e1adeb6b06aff0"
      },
      {
        "review": "good laptop but the screen could be brighter.",
        "rating": 3,
        "user": "67af9da619417813aa4d9afa",
        "laptop": "67b3863b48e1adeb6b06aff0"
      },
      {
        "review": "excellent for multitasking and heavy workloads.",
        "rating": 5,
        "user": "67ab801279012ae8055ddcd7",
        "laptop": "67b3863b48e1adeb6b06aff2"
      },
      {
        "review": "decent laptop but the trackpad is not very responsive.",
        "rating": 3,
        "user": "67ab804579012ae8055ddcdb",
        "laptop": "67b3863b48e1adeb6b06aff2"
      },
      {
        "review": "great for gaming and content creation.",
        "rating": 5,
        "user": "67af9da619417813aa4d9afa",
        "laptop": "67b3863b48e1adeb6b06aff2"
      },
      {
        "review": "solid performance and good battery life.",
        "rating": 4,
        "user": "67ab801279012ae8055ddcd7",
        "laptop": "67b3863b48e1adeb6b06aff3"
      },
      {
        "review": "good laptop but the speakers are not great.",
        "rating": 3,
        "user": "67ab804579012ae8055ddcdb",
        "laptop": "67b3863b48e1adeb6b06aff3"
      },
      {
        "review": "excellent laptop for the price. highly recommended.",
        "rating": 5,
        "user": "67af9da619417813aa4d9afa",
        "laptop": "67b3863b48e1adeb6b06aff3"
      },
      {
        "review": "fast and reliable, perfect for everyday use.",
        "rating": 5,
        "user": "67ab801279012ae8055ddcd7",
        "laptop": "67b3863b48e1adeb6b06aff4"
      },
      {
        "review": "good laptop but the build quality could be better.",
        "rating": 4,
        "user": "67ab804579012ae8055ddcdb",
        "laptop": "67b3863b48e1adeb6b06aff4"
      },
]

// Body parser
app.use(express.json())
// app.use(cookieParser())
app.use(morgan('dev'))
app.use('/api/v1/laptops',laptopRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/suppliers',supplierRouter)
app.use('/api/v1/reviews',reviewRouter)
module.exports=app