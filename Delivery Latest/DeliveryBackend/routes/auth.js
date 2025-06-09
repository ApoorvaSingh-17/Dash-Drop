// import express from "express";
// const router = express.Router();
// import User from "../models/user.js";
// import bcrypt from 'bcryptjs';
// // import jwt from "jsonwebtoken";

// //REGISTER
// router.post("/register", async (req, res) => {
//         try {
//            const salt = await bcrypt.genSalt(10);
//            const hashedPassword = await bcrypt.hash(req.body.password,salt);
//             const newuser = new User({
               
//                 username: req.body.username,
//                 email:req.body.email,
//                 password: hashedPassword,
//             });
//             await newuser.save();
//             res.status(201).json({
//                 success: true,
//                 newuser,
//             });
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 error,
//             });
//         }
//     }
// );

//LOGIN

// router.post("/login", async (req,res) => {
//     try{
//         const user = await User.findOne({ username: req.body.username });
//         !user && res.status(401).json("Wrong Credentials");

//         const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
//         const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8) ;

//         OriginalPassword !== req.body.password && res.status(401).json("Wrong Credentials");

//         const accessToken = jwt.sign(
//             { 
//             id: user._id,
//             isAdmin: user.isAdmin,
//         },
//         process.env.JWT_SEC,
//         {expiresIn: "3d"}
//        );

//         const { password, ...others } = user._doc;

//         res.status(200).json({ ...others, accessToken });

//     }catch(err) {
//         res.status(500).json(err)
//     }
// })

// export default router;
import express from "express";

import { registerController, loginController } from "../controller/userController.js";

//router object
const router = express.Router()

//routers
//POST || LOGIN USER
 router.post('/login', loginController);

//POST || REGISTER USER
router.post('/register', registerController);

export default router;