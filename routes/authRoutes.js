const express = require('express');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const path = require("path");

const createDB = require("../config/db");
const router = express.Router();

const User = require("../models/userModels");

createDB.sync().then(() => {
    console.log("Db is running");
});
let users = {

}

router.post('/signup',
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').not().isEmpty(),
    async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            const userExist = await User.findOne({
                where: {
                    email
                }
            });

            if (userExist) {
                res.send('User exists already');
                return;
            }

            if (!name || !email || !password) {
                res.send("Invalid input");
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const saveToDB = {
                name, email, password: hashedPassword

            }
            const createUser = await User.create(saveToDB);

        } catch (error) {
            res.status(500).send({ message: "Something whent wrong on the server" });
            console.log(error);
            return;
        }
        // res.redirect('login');
        return res.status(200).send(`User Saved`);
    });
router.get('/signup', (req, res) => {
    const html = path.join(__dirname, 'public', 'html', 'index.html');
    res.status(200).sendFile(html);
    // res.status(200).send({ message: "signing page" })
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({

            where: {
                email,
            }
        });

        if (!userExist) {
            res.send("user does'nt exist");
            return;
        }
        const passMatch = await bcrypt.compare(password, userExist.password);

        if (!passMatch) {
            res.send("Password is not Correct");
            return;
        }
    } catch (error) {
        console.log(error);
        return;
    }
    res.send('login');
})
module.exports = router;