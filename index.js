import  express  from 'express' ;
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from  'cors'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'


// Routes 
const app = express();


//Middlware : software that acts as a bridge between an operating system or database and applications, especially on a network.

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser: true , useUnifiedTopology: true}
).then(
    ()=>app.listen(process.env.PORT,() => console.log(`Listening at ${process.env.PORT}`))).catch((error)=> 
    console.log(error));
//usage of routes


app.use('/auth' , AuthRoute) // nt :after follwing my auth  i will call so my autentification  
app.use('/user',UserRoute )
app.use('/post', PostRoute)

