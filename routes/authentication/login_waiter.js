require('dotenv').config()
const router = require("express").Router();
//add this
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const authenticateToken = require("./authMiddleWare");



const prisma = new PrismaClient();


//const cors = require("cors");
router.use(express.json())

 

// router.get("/", authenticateToken, async (req, res, next) => {
//   try {
//     const Student = await prisma.Students.findUnique({
//       where:{id: req.user.id}
//     });
   
//     console.log("Body: "+JSON.stringify(req.user))
   
//     res.json(Student);
//   } catch (error) {
//     next(error);
//   }
// });


router.get("/profile", authenticateToken, async (req, res, next) => {
 
  try {
    console.log("Profile: "+ req.user.id)
    const Waiter = await prisma.Waiters.findUnique({
      where:{id: req.user.id }
    });
   
    console.log("Body: "+JSON.stringify(req.user))
   if(Waiter){
    res.json(Waiter);} else {
      res.json({"message": "User not authenticated"})
    }
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
    console.log("Login started")

    console.log("Waiter Body: "+ JSON.stringify(req.body))
    console.log("e: "+ req.body.email)
    try {

        //authentication started
      const Waiter = await prisma.Waiters.findFirst({
        where: {
          email: req.body.email,
       // email: "dani@gmail.com"
        },
      });
      
      if (!Waiter) {
        return res.status(404).json({ message: 'Student not found' });
      }
      if(Waiter){
        if(await bcrypt.compare(req.body.password , Waiter.password)){
            console.log("Logged in successfully!");

const fetchedWaiter = { id: Waiter.id}
const accessToken = jwt.sign(fetchedWaiter, process.env.ACCESS_TOKEN_SECRET)
res.json({accessToken: accessToken})
           
        }else{
            console.log("Not logged in");
            res.send('Not allowed')
        }
      }
       
    } catch (error) {
        console.log("Error from catch: "+ error);
      res.status(500).json({ message: 'Server error', error });
    }
  });



module.exports = router;