import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import Users from "../models/userModel.js";
import Tokens from "../models/tokenModel.js"
const router = express.Router();

/**
 * @swagger
 * /users/get:
 *   get:
 *    summary: Get All Users
 *    description: Use to request all users
 *    responses:
 *      200:
 *        description: A successful response
 *      400:
 *        description: Error
 *        
 */

router.get("/get", async (req, res) => {
  try {
    const user = await Users.find();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * definitions:
 *    User:
 *      properties:
 *        fullname:
 *           type: string
 *        email:
 *           type: string
 *        password:
 *           type: string
 *        passwordAgain:
 *           type: string
 *        userType:
 *           type: string
 *        phoneNumber:
 *           type: string
 */




/**
 * @swagger
 * /users/signup:
 *   post:
 *    summary: Register
 *    description: Registers the user
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/User' 
 *    responses:
 *         201:
 *           description: Registered
 *         400:
 *           description: Error
 *          
 */
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password, passwordAgain, phoneNumber } = req.body;

    const userExists = await Users.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Bu E-Mail'e Sahip Kullanıcı Bulunmakta." });

    if (password !== passwordAgain)
      return res.status(400).json({ message: "Şifre ile Tekrar Girilen Şifre Farklı." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '3m',
      }
    )

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      process.env.REFRESH_TOKEN_SECRET
    )

    await Tokens.create({
      userId: user._id,
      refreshToken: refreshToken,
    })

    res.cookie('token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })

    res.status(201).json({ user, accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: `Kullanıcı Oluşturulamadı -> ${error.message}` });
  }
});

router.get('/logout/:id', async (req, res) => {
  try {
    const { id } = req.params

    res.clearCookie('token')


    res.status(200).json({ message: 'Başarıyla çıkış yapıldı' })
  } catch (error) {
    res.status(500).json(error)
  }
})

/**
 * @swagger
 * definitions:
 *    Login:
 *      properties:
 *        email:
 *           type: string
 *        password:
 *           type: string
 */




/**
 * @swagger
 * /users/signin:
 *   post:
 *    summary: Login
 *    description: The user logins.
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to login.
 *         schema:
 *           $ref: '#/definitions/Login' 
 *    responses:
 *         200:
 *           description: Logged In
 *         400:
 *           description: Wrong password
 *         404:
 *           description: User doesn't exist
 *         500:
 *           description: Error
 *          
 */

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "Bu E-Mail'e Sahip Kullanıcı Bulunamadı." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Yanlış Şifre" });


    const accessToken = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '3m' }
    )

    const refreshToken1 = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      process.env.REFRESH_TOKEN_SECRET
    )

    await Tokens.findOneAndUpdate(
      { userId: user._id },
      {
        refreshToken: refreshToken1,
      },
      { new: true }
    )

    res.cookie('token', refreshToken1, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })


    res.status(200).json({ user, accessToken })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});


router.get('/refresh/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { refreshToken } = await Tokens.findOne({ userId: id })
    if (!refreshToken) return res.sendStatus(401)
    
    const cookie = req.cookies.token
    if (!cookie) {
      res.status(403).json({message: "Lütfen Tekrar Giriş Yapınız."})
    }

    else if (cookie !== refreshToken) {
      res.status(401).json({ message: "Başka Bir Yerden Hesaba Giriş Yapıldı." })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, x) => {

      if (err) return res.status(403).json(err)

      const accessToken = jwt.sign(
        { email: x.email, id: x.id, userType: x.userType },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '3m' }
      )
      res.status(200).json(accessToken)
    })
  } catch (error) {

    console.log(error.message)
  }
})

/**
 * @swagger
 * definitions:
 *    User2:
 *      properties:
 *        fullname:
 *           type: string
 *        email:
 *           type: string
 *        userType:
 *           type: string
 *        phoneNumber:
 *           type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *    summary: Update User
 *    description: The user is updated
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to update.
 *         schema:
 *           $ref: '#/definitions/User2' 
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: Updated
 *         404:
 *           description: User is not valid
 *          
 */

router.put('/:id', async (req, res) => {
  try {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: 'User is not valid' })
    const { fullname, email, password, userType, phoneNumber, hostingname, options } = req.body

    const updatedUser = await Users.findByIdAndUpdate(id,
      { fullname, email, password, userType, phoneNumber, hostingname, options, _id: id },
      { new: true })
    res.status(200).json(updatedUser)

  } catch (error) {
    console.log(error.message)
    res.json({ message: 'Update failed' })
  }

})

/**
 * @swagger
 * definitions:
 *    Profile:
 *      properties:
 *        fullname:
 *           type: string
 *        email:
 *           type: string
 *        phoneNumber:
 *           type: string
 *        password:
 *           type: string
 *        newPassword:
 *           type: string
 */

/**
 * @swagger
 * /users/profile/update:
 *   post:
 *    summary: Update Profile
 *    description: The profile is updated
 *    
 *    parameters:
 *       - in: body
 *         name: profile
 *         description: The user to update.
 *         schema:
 *           $ref: '#/definitions/Profile' 
 *    responses:
 *         200:
 *           description: Updated
 *         400:
 *           description: Wrong password
 *         404:
 *           description: User doesn't exist
 *         500:
 *           description: Error
 *          
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *    summary: Get ID Users
 *    description: Use to request all movie
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID required
 *          schema:
 *            type: string
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: 'User id is not valid' })

    const user = await Users.findById(id)
    if (!user) return

    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'User not found' })
  }
})


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *    summary: Delete Users
 *    description: this ap
 *    
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/Movie'
 *          
 */

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: 'This id does not belong to any user' })

    await Users.findByIdAndDelete(id)
    res.status(200).json({ message: 'User deletion successful' })
  } catch (error) {
    console.log(error.message)
    res.json({ message: 'An error occurred during the deletion process' })
  }

})

router.post("/profile/update", async (req, res) => {
  try {
    const { email, fullname, phoneNumber, image, password, newPassword } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Bu E-Maile Sahip Kullanıcı Bulunamadı" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Yanlış Şifre" });
    const isPasswordSame = password === newPassword
    if (isPasswordSame)
      return res.status(400).json({ message: "Aynı Şifre Bir Daha Girilemez" });
    const inputSet = (newPassword ? { fullname, phoneNumber, image, password: await bcrypt.hash(newPassword, 10) } :
      { fullname, phoneNumber, image });
    const updatedUser = await Users.findOneAndUpdate(
      { email },
      inputSet
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Profil Güncellenirken Hata Oluştu -> ${error.message}` });
  }
});

/**
 * @swagger
 * /users/profile/get/{email}:
 *   get:
 *    summary: Get The User Profile
 *    description: Use to request the user profile info
 *    parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email please
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        description: A successful response
 *      404:
 *        description: User doesn't exist
 *      500:
 *        description: Error
 *        
 */

router.get("/profile/get/:email/:accessToken", async (req, res) => {
  try {
    const { email, accessToken } = req.params;
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "Kullanıcı Bulunamadı." });
    const { fullname, phoneNumber, userType, image } = user;
    res.status(200).json({ user, accessToken })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});



router.post("/password/update", async (req, res) => {
  try {
    const { email, password, samePassword } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Bu E-Maile Sahip Kullanıcı Bulunamadı" });

    const isPasswordSame = password !== samePassword
    if (isPasswordSame)
      return res.status(400).json({ message: "Girilen İki Şifre Eşleşmiyor" });

    const isPasswordNew = await bcrypt.compare(password, user.password);
    if (isPasswordNew)
      return res.status(400).json({ message: "Son Şifre İle Girilen Şifre Aynı Olamaz" });
    const inputSet = { password: await bcrypt.hash(password, 10) };
    const updatedUser = await Users.findOneAndUpdate(
      { email },
      inputSet
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `update password failed -> ${error.message}` });
  }
});

export default router;
