require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema")
const authRoutes =require('./routers/')
const foodRoutes = require('./routes/food')
const orderRoutes = require('./routes/order');
const feedbackRoutes = require('./routes/feedback');
const chartRoutes = require('./routes/chart');


const clientid = "313188945982-fq2bvitbaohpt1l105or19o54q7ih2ni.apps.googleusercontent.com"
const clientsecret = "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"

app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
app.use('/order', orderRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/chart', chartRoutes)

app.use(cors({
    origin:"http://localhost:3001",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:"d9101960248a916d4819eac236e35c0a4eeeb585bb63c3af1d34dcd7285bfef0",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"http://localhost:3000/auth/google/secrets",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3001/dashboard",
    failureRedirect:"http://localhost:3001/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3001");
    })
})

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})