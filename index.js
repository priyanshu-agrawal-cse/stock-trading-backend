require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("./model/UserModel");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser')

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {PositionsModel} = require("./model/PositionsModel");
const {HoldingsModel} = require("./model/HoldingModel");
const {OrdersModel} = require("./model/OrdersModel");
const {watchlistModel} = require("./model/WatchListModel");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3002 ;
const mongo_uri = process.env.MONGO_URL ;

app.use(cors({
  origin: ['https://stock-trading-platform-mvlj.onrender.com' , 'http://localhost:3001'], // Array of allowed origins
  credentials: true, // Enable credentials (cookies, auth headers, etc.)
}));


app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



let createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
  };

 app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, username, createdAt } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = await User.create({ email, password, username, createdAt });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      console.error(error);
    }
  });


app.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
        httpOnly: true, // Ensure the cookie is only accessible by the server
        secure: false, // Set to true in production (requires HTTPS)
        sameSite: "None", // Required for cross-origin requests
      });
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  })


  // app.post('/userVerification', (req, res) => {
  //   const token = req.cookies.token
  //   if (!token) {
  //     return res.json({ status: false })
  //   }
  //   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
  //     if (err) {
  //      return res.json({ status: false })
  //     } else {
  //       const user = await User.findById(data.id)
  //       if (user) return res.json({ status: true, user: user.username })
  //       else return res.json({ status: false })
  //     }
  //   })
  // })
  app.post('/userVerification', async (req, res) => {
    console.log("Cookies received:", req.cookies); // Debug log

    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }

    try {
        const data = jwt.verify(token, process.env.TOKEN_KEY); // Verify JWT
        console.log("Decoded token data:", data); // Debug log

        const user = await User.findById(data.id); // Fetch user
        if (user) {
            return res.json({ status: true, user: user.username });
        } else {
            return res.json({ status: false });
        }
    } catch (err) {
        console.error("JWT Verification Error:", err); // Debug log
        return res.json({ status: false });
    }
});

app.get("/allHoldings", async(req,res)=>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
})

app.get("/allwatchlist", async(req,res)=>{
    let allwatchlist = await watchlistModel.find({});
    res.json(allwatchlist);
})
app.get("/allPositions", async(req,res)=>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
})
app.get("/allOrders", async(req,res)=>{
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
})

app.post("/newOrder",async(req,res)=>{
let newOrder = new OrdersModel({
    name: req.body.name,
    price: req.body.price,
    qty:req.body.qty,
    mode : req.body.mode,
})
    newOrder.save();

    let allHoldings = new HoldingsModel({
        name: req.body.name,
        qty: req.body.qty,
        avg: req.body.price,
        price:req.body.price,
        net: "2",
        day: "1.2",
    })
   console.log(await allHoldings.save()) ;

    res.send("new order saved");

})


app.listen(PORT ,'0.0.0.0', ()=>{
    console.log("started");
    mongoose.connect(mongo_uri);
    console.log("db connected");
})
