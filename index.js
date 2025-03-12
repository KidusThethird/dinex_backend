const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: true,
    credentials: true, // Allows cookies and other credentials
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || origin === 'http://localhost:8080' ||
//       origin === 'http://192.168.8.130:8080' ||
//        origin === 'http://192.168.8.130:3000 '||
//        origin === 'http://192.168.8.130:7000 ') {
//       callback(null, true); // Allow PC1's frontend or localhost
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow sending cookies or authorization headers
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// }));

// app.use(cors({
//   origin: "*" ,  // Allow all origins
//   credentials: true,  // Allow sending credentials (cookies, headers, etc.)
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],  // Allowed methods
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],  // Allowed headers
// }));

// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:4000',
//   'http://localhost:7000',
//   'http://localhost:8080',
//   'http://192.168.8.130:3000',
//   'http://192.168.8.130:8080',
//   'http://192.168.8.130:7000',
//   'http://192.168.8.130:4000'
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     // Allow only specific origins or requests with no origin (e.g., Postman)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow credentials
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// }));

app.use(express.json());

// Create a new user

app.get("/", async (req, res) => {
  // const users = await prisma.user.findMany();
  res.json({ message: "Api is working" });
});

app.get("/dashboard_info", async (req, res, next) => {
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
app.use("/finance_info", require("./routes/finance_info.route"));
app.use("/kitchen_info", require("./routes/kitchen_info.route"));

app.use("/items", require("./routes/items.route"));
app.use("/inventory_items", require("./routes/inventory_items.route"));

app.use("/inventory_purchase", require("./routes/inventory_purchase.route"));
app.use("/login_waiter", require("./routes/authentication/login_waiter"));

app.use("/orderitem", require("./routes/orderitem.route"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
