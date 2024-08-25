const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/db")
const mongoose = require('mongoose')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')

const User = require('./models/userModel')



connectDB();

const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


const generatePassword = () => {
    return crypto.randomBytes(4).toString('hex');
}

app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, phoneNumber } = req.body;
        const users = await User.find({ email: email })
        console.log(users)
        if (users.length)
            return res.send({
                registered: false,
                message: 'Account already exists'
            })
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name: fullName,
            email: email,
            password: hashedPassword,
            phone: phoneNumber
        };
        console.log(newUser)
        const createdUser = await User.create(newUser);
        console.log(createdUser)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "thesurveycreww@gmail.com",
                pass: "grbh zdbb tsgh cyyv",
            },
        });

        const mailOptions = {
            from: "SurveyCrew",
            to: email,
            subject: "Account Credentials",
            html: `
                <html>
                <head>
                <style>
                 body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                      }
                .container {
                     max-width: 600px;
                     margin: auto;
                     background: #fff;
                     padding: 20px;
                     border-radius: 8px;
                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
            h1 {
                    color: #007bff;
                  }
               p {
            font-size: 16px;
              }
          .info {
            background: #e9ecef;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
          }
          .footer {
            font-size: 12px;
            color: #888;
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hey ${fullName}!</h1>
          <p>Here are your account details:</p>
          <div class="info">
            <p><strong>Email:</strong> <span>${email}</span></p>
            <p><strong>Password:</strong> <span>${password}</span></p>
          </div>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Thank you for using our service!</p>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Our Service. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `,

        };
        await transporter.sendMail(mailOptions);
        return res.send({
            registered: true,
            message: 'Successfully registered. Check mail for password.'
        })
    }
    catch (e) {
        return res.status(500).send({
            registered: false,
            message: 'Error registering user. Please try again.'
        })
    }
})
app.post('/api/login', async (req, res) => {

    const { email, password } = req.body;
    const validUser = await User.findOne({ email: email });
    if (validUser == null) {
        return res.json({ auth: false, message: 'Invalid username or password' });
    }
    const passwordIsValid = bcrypt.compareSync(password, validUser.password);
    if (!passwordIsValid) {
        return res.json({ auth: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 hours
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    })
    res.json({ auth: true, message: 'Successfully logged in' });

})
app.post("/api/logout", async (req, res) => {
  try{
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.json({ status:'success',message: "Successfully Logged Out" });
}
catch(e)
{
  return res.json({ status:'failure',message: "Unable to sign out" });
}
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
