const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json())

const cors = require("cors");

app.use(cors({
   // origin: "http://localhost:3000", // Replace with your frontend URL
   origin: true,  
   credentials: true, // Allows cookies and other credentials
    methods: ["GET", "POST", "PUT", "DELETE" , "PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }));

app.use(express.json());

// Create a new user

app.get('/', async (req, res) => {
   // const users = await prisma.user.findMany();
    res.json({"message":"Api is working"});
  });


  app.get('/dashboard_info', async (req, res, next) => {
    try {
      // Fetch count of items where itemType is 'food' and 'drink'
      const foodCount = await prisma.Item.count({
        where: {
          deleted: false,
          itemType: "food",
        },
      });
  
      const drinkCount = await prisma.Item.count({
        where: {
          deleted: false,
          itemType: "drink",
        },
      });
  
      // Fetch count of waiters where deleted is false
      const waiterCount = await prisma.Waiters.count({
        where: {
          deleted: false,
        },
      });
  
      // Return the counts in the response
      res.json({
        waiters: waiterCount,
        foods: foodCount,
        drinks: drinkCount,
      });
    } catch (error) {
      next(error);
    }
  });
  
 
 


  app.use("/waiters", require("./routes/waiters.route"));

  app.use("/items", require("./routes/items.route"));
  app.use("/login_waiter", require("./routes/authentication/login_waiter"))

  app.use("/orderitem", require("./routes/orderitem.route"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
