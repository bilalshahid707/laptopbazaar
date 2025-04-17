const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const port = process.env.PORT || 8000
const morgan = require('morgan')
const globalErrorHandler = require('./controllers/errorController')
const mongoose = require('mongoose')
const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.MONGO_PASS)

mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(
    console.log("DB connection successful")
)

app.use(globalErrorHandler);
app.listen(port,()=>{
    console.log(`Listenig requests on port ${port}`)
})