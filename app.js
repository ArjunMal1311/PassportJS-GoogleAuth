require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const UserModel = require('./model/UserModel');
const connect = require("./database/connection.js");
const path = require("path")
require('./auth');

const app = express();
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ".", "\\public\\home.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, ".", "\\public\\login.html"))
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ));

app.get('/protected',
    passport.authenticate('google', {
        successRedirect: '/authenciated',
        failureRedirect: '/authenciated/failure'
    })
);

app.get('/authenciated', isLoggedIn, (req, res) => {
    // res.send(`Hello ${req.user.displayName}`);
    const infoUser = req.user
    const { sub, given_name, family_name, email, picture } = infoUser
    UserModel.findOne({ sub }, (err, user) => {
        if (!user) {
            const new_user = new UserModel({
                sub, firstName: given_name, lastName: family_name, email, picture
            })

            new_user.save().then((result) => {
                return res.json({ result })
            }).catch((err) => {
                res.status(500).send({ err: 'Browski!' })
            })
        }

        if (err) {
            return res.json({
                "error": err
            })
        }

        else if (user) {
            res.send(`<!DOCTYPE html>
            <html>
               <head>
                  <title>Text Input</title>
                  <style>
                    .main-div {
                        display : flex;
                        align-items : center;
                        justify-content: center;
                        width: 100vw;
                        height: 100vh;
                        flex-direction : column;
                    }
                  </style>
               </head>
            <body>  
              <div class="main-div">
                    <p>ID : <b>${sub}</b></p>
                    <p>FirstName : <b>${given_name}</b></p>
                    <p>LastName : <b>${family_name}</b></p>
                    <p>Email : <b>${email}</b></p>
                    <p>PictureURL : <a href=${picture}>Click Here!</a></p>

                    <p>To Log Out : <a href='/logout'>Click Here!</a></p>
              </div>

            </body>
            </html>`)
        }
    })

});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Thanks for using Google OAuth!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

connect().then(() => {
    try {
        app.listen(3000, () => {
            console.log(`Server connected to http://localhost:${3000}`);
        });
    } catch (error) {
        console.log("502 Bad Gateway");
    }
}).catch((error) => {
    console.log("Connection to Database failed!")
})