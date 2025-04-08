const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const port = process.env.PORT
const morgan = require('morgan')
const globalErrorHandler = require('./controllers/errorController')
const mongoose = require('mongoose')
const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.MONGO_PASS)

mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(
    console.log("DB connection successful")
)

console.log(process.env.NODE_ENV)

app.use(globalErrorHandler);
// app.listen(port,()=>{
//     console.log(`Listenig requests on port ${port}`)
// })