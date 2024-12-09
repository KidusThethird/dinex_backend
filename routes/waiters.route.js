
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const bcrypt = require('bcrypt')

const prisma = new PrismaClient();



//const checkAuthenticated = require("./login_register.route");

//working with students

//Get all student
router.get("/", async (req, res, next) => {
  console.log("Get Waiters requested:")
  try {
    const Waiters = await prisma.Waiters.findMany({
      where: {
        deleted: false,  // Filter where 'deleted' is false
      },
      orderBy: {
        firstName: "asc",  // Order by first name in ascending order
      },
    });
    res.json(Waiters);
  } catch (error) {
    next(error);
  }
});

//Get one student
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params.id;
   // console.log("rec: " + req.params.id);
    const Waiters = await prisma.Waiters.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(Waiters);
  } catch (error) {
    console.log("error form catch: " + error);
    next(error);
  }
});

//Create a Student
router.post("/", async (req, res, next) => {
  console.log("Req: " + JSON.stringify(req.body));
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log("Salt:", salt);
    console.log("Hashed Password:", hashedPassword);

    // Create a new object with the hashed password and the rest of the body
    const waiterData = {
      ...req.body, // Spread all other fields from the body
      password: hashedPassword, // Replace the password field with the hashed password
    };

    // Save the new waiter data to the database
    const Waiters = await prisma.Waiters.create({
      data: waiterData,
    });

    res.json(Waiters);
  } catch (error) {
    console.error("Error from catch:", error);
    res.status(500).json({ message: "Failed to create waiter" });
  }
});



// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     // Find the waiter by email
//     const waiter = await prisma.Waiters.findUnique({
//       where: { email },
//     });

//     // Check if the waiter exists
//     if (!waiter) {
//       return res.status(404).json({ message: "Waiter not found" });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, waiter.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Return the waiter data, excluding the password
//     const { password: _, ...waiterData } = waiter;
//     res.json({ user: waiterData });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


//Update Student
router.patch("/:id",  async (req, res, next) => {
  
   
      try {
        const { id } = req.params;
        const Waiters = await prisma.Waiters.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: req.body,
        });
        res.json(Waiters);
      } catch (error) {
        next(error);
      }
    
  
});

//delete Student
router.delete("/:id",  async (req, res, next) => {
 
    
      try {
        const { id } = req.params;
        Waiters = await prisma.Waiters.delete({
          where: {
            id: parseInt(req.params.id),
          },
        });

        res.json(Waiters);
      } catch (error) {
        next(error);
      }
   
 
});

module.exports = router;