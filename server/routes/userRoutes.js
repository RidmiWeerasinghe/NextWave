import express from 'express'
import { User } from '../model/userModel.js'
import nodemailer from 'nodemailer'
import { EMAIL, PASSWORD } from '../config.js'
import crypto from 'crypto'

const router = express.Router();

//registering a user
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.username ||
            !req.body.password ||
            !req.body.email
        ) {
            return res.status(400).send({
                message: 'send all required fields'
            });
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            imageUrl: null
        }
        console.log(newUser)
        const user = await User.create(newUser)
        return res.status(201).send(user)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//check if user exists
router.post('/email', async (req, res) => {
    const { email } = req.body
    User.findOne({ email: email })
        .then(user => {
            //console.log(user)
            if (user) {
                res.status(201).json("User already exists")
            }
            else {
                res.status(204).json("User does not exists")
            }
        })

})

//get user
router.get('/get/:email', async (req, res) => {
    const { email } = req.params
    await User.findOne({ email: email })
        .then(user => {
            //console.log(user)
            if (user) {
                res.status(201).json({
                    user: user
                })
            }
            else {
                res.status(500).json("no user")
            }
        })

})

//user login
router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({
                        status: "success",
                        user: user
                    })
                }
                else {
                    res.json({
                        status: "Incorrect password"
                    })
                }
            }
            else {
                res.json({
                    status: "User doesn't exists"
                })
            }
        })
})

//retrieving all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//update user
router.put('/update/:email', async (req, res) => {
    try {
        const { email } = req.params
        const { username, password, imageUrl } = req.body

        const user = await User.findOne({ email })
        if (user) {
            user.username = username
            user.email = email
            user.password = password
            user.imageUrl = imageUrl
            await user.save()
            return res.status(200).send({ message: "user updated successfully" })
        }
        else {
            res.status(500).send({ message: "user not found" })
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//delete user
router.delete('/delete/:email', async (req, res) => {
    try {
        const { email } = req.params
        const result = await User.findOneAndDelete({ email })

        if (!result) {
            res.status(500).send({ message: "user not found" })
        }

        return res.status(200).send({ message: "deleted successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.post('/sendemail', async (req, res) => {
    const { email } = req.body
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetRout = `http://localhost:5173/resetpassword?token=${resetToken}`
    console.log("email")

    await User.updateOne({ email: email }, { resetToken: resetToken, resetTokenExpiry: Date.now() + 3600000 })

    const emailStructure = ` 
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link.
                                        </p>
                                        <a href=${resetRout}
                                            style="background:#000000;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:5px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config)

    let message = {
        from: EMAIL,
        to: email,
        subject: "Reset Password",
        html: emailStructure
    }
    transporter.sendMail(message)
        .then(() => {
            return res.status(201).json({ message: "check your inbox" })
        })
        .catch((error) => {
            return res.status(500).json({ message: "something went wrong", error: error })
        })
})


router.post('/verify-reset-token', async (req, res) => {
    const { token } = req.body
    console.log(token)

    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" })
        }
        return res.status(200).json({ email: user.email })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});


router.put('/update/password/:email', async (req, res) => {
    try {
        const { email } = req.params
        const { newPassword } = req.body

        const user = await User.findOne({ email })
        if (user) {
            user.password = newPassword
            user.resetToken = undefined
            user.resetTokenExpiry = undefined
            await user.save()
            return res.status(200).send({ message: "Password updated successfully" })
        }
        else {
            res.status(500).send({ message: "user not found" })
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default router