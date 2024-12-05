const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allows cookies and other credentials
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }));

app.use(express.json());

// Create a new user

app.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({"message":"Api is working"});
  });

 


  app.use("/waiters", require("./routes/waiters.route"));



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
