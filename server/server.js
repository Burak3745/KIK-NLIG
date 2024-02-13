import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import compression from 'compression';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import userRouter from "./Routers/userRouter.js";
import movieRouter from "./Routers/movieRouter.js"
import seriesRouter from "./Routers/seriesRouter.js"
import actorsRouter from "./Routers/actorsRouter.js"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import Users from "../server/models/userModel.js";
dotenv.config();

const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            name: "Services",
            title: 'PDWebProject API',
            version: '1.0.0',
            description: "KIKI'NLIG API Information",
            contact: {
                name: "Burak & Berkay"
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["../server/Routers/*.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.json());
app.use(compression());
app.use('/images', express.static(join(_dirname, 'dataset', 'cards'), { maxAge: 31557600 }));
app.use("/users", userRouter);
app.use("/movie", movieRouter);
app.use("/series", seriesRouter);
app.use("/actors", actorsRouter);

async function sendEmail({ recipient_email, OTP }) {
    

    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'reelquorum@gmail.com',
                pass: 'dcss ajoz dfpc xzox',
            },
        });

        const mail_configs = {
            from: 'reelquorum@gmail.com',
            to: recipient_email,
            subject: "ReelQuorum | Şifremi Unuttum",
            html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="http://reelquorum.netlify.app/" style="text-shadow:
        2px 0 #000000, -2px 0 #000000, 0 2px #000000, 0 -2px #000000,
        1px 1px #000000, -1px -1px #000000, 1px -1px #000000, -1px 1px #000000;font-size:1.4em;color: #2dffb9;text-decoration:none;
        font-weight:600">ReelQuorum</a>
      </div>
      <p style="font-size:1.1em">Merhaba,</p>
      <p> Şifre yenileme talebini aldık. Aşağıdaki kodu girerek yeni şifreni belirleyebilirsin. 
       </p>
      <h2 style="background: #2dffb9;margin: 0 auto;width: max-content;padding: 0 10px;color: #000;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Saygılarımızla,<br />ReelQuorum</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>ReelQuorum Inc</p>
        <p>Hamidiye Mah. Anadolu Cad.</p>
        <p>Kağıthane/İstanbul</p>
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
        };
        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "E-mail Başarıyla Gönderildi" });
        });
    });
}

app.post("/send_recovery_email", async (req, res) => {
    const user = await Users.findOne({ email: req.body.recipient_email });
    if (!user)
        return res.status(404).json({ message: "Bu E-Mail adresine sahip kullanıcı bulunamadı" });
    sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});
app.get('/api/genres', (req, res) => {
    const getFile = readFileSync(join(_dirname, 'dataset', 'genres.json'), 'utf8');
    res.json(JSON.parse(getFile));
});

app.listen(5000, () => {
    // connect to database
    mongoose
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => console.log("connected to db"))
        .catch((error) => console.log(error));
});




