const { Router } = require("express");
const { compare, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("../models/User.model");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = User.findOne({ email });

        if(!candidate) {
          return res.status(400).json({ message: "User already exists" })
        }

        const hashPassword = await hash(password, 10);
        const user = await User.create({...req.body, password: hashPassword});

        res.status(201).json({ message: "User is created", user })
    } catch (err) {
        res.status(404).json({ message: "Error. Please can you try again!", err })
    }
});

router.get("/auth", auth, async (req, res) => {
   try {
       const user = await User.findById(req.user.userId);
       const response = {
           _id: user._id,
           firstName: user.firstName,
           secondName: user.secondName,
           email: user.email,
           role: user.role,
           isAuth: true
       };

       res.json({ message: "You are authenticated", user: response })
   } catch (err) {
       res.status(404).json({ message: "Error. Please you try again!", err })
   }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //find the email
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Error! Incorrect data during sign in system" })
        }
        //compare password
        // user.comparePassword(password, (err, res) => {
        //     if(!res) {
        //         return res.status(400).json({ message: "Password is incorrect, please try again" })
        //     }
        //
        //     //save ...
        // });
        const isMatch = await compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Password is incorrect, please try again" })
        }
        //generate token
        const token = await sign(
            { userId: user._id },
            "secret",
            { expiresIn: "10h" }
        );

        user.token = token;
        await user.save();

        res.cookie("x_auth", user.token)
            .json({ message: "Token is created!", token, user });

    } catch(err) {
        res.status(404).json({ message: "Error. Please you try again!", err })
    }
});

router.get("/logout", auth, async (req, res) => {
   try {
        const user = await User.findByIdAndUpdate(req.user.userId, { token: "" });
        if(!user) {
            return res.status(500).json({ message: "Server error. Invalidate token" })
        }
        res.clearCookie("x_auth").json({ message: "You are logout!", user })
   } catch(err) {
       res.status(404).json({ message: "Error. Please you try again!", err })
   }
});

module.exports = router;