import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import compression from 'compression';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import userRouter from "./Routers/userRouter.js";
import movieRouter from "./Routers/movieRouter.js"
import seriesRouter from "./Routers/seriesRouter.js"
import postRouter from "./Routers/postRouter.js"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

dotenv.config();

const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));

const swaggerOptions ={
    swaggerDefinition:{
        info:{
            name:"Services",
            title:'PDWebProject API',
            version: '1.0.0',
            description: "KIKI'NLIG API Information",
            contact:{
                name:"Burak & Berkay"
            },
            servers:["http://localhost:5000"]
        }
    },
    apis:["../server/Routers/*.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(cors());
app.use(express.json({ limit: '100mb'}));
app.use(express.json());
app.use(compression());
app.use('/images', express.static(join(_dirname, 'dataset', 'cards'), { maxAge:31557600 }));
app.use("/users", userRouter);
app.use("/movie", movieRouter);
app.use("/series", seriesRouter);
app.use("/posts", postRouter);

app.get('/api/genres', (req, res) => {
    const getFile = readFileSync(join(_dirname, 'dataset', 'genres.json'), 'utf8');
    res.json(JSON.parse(getFile));
});


app.get('/api/video/:id', (req, res) => {
    let obj = {
        videoUri: 'https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4',
        rating: 'Rated U',
        ratingDetails: 'Suitable for all',
    };
    res.json(obj);
});

app.get('/api/details/:id', (req, res) => {
    
})

app.listen(5000, () => {
    // connect to database
    mongoose
      .connect(process.env.DB_CONNECTION_STRING)
      .then(() => console.log("connected to db"))
      .catch((error) => console.log(error));
  });
  

  
  
