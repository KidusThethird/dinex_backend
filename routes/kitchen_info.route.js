
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const bcrypt = require('bcrypt')

const prisma = new PrismaClient();
const authenticateToken = require("./authentication/authMiddleWare");



//const checkAuthenticated = require("./login_register.route");

//working with students

//Get all student
router.get("/", async (req, res, next) => {
  console.log("Get Waiters requested:")
  try {
    const Orders = await prisma.Orders.findMany({
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order
      },
      where:{
        OR: [
            { OrderStatus: "approved" },
            { OrderStatus: "delivered" }
          ]
      },
        include: {
            // Include the related waiter details
            Waiter: true,  // This will include the entire waiter data (you can also specify specific fields)
    
            // Include the related items for each order
            OrderItems: {
              include: {
                Item: true,  // This will include the item details (e.g., name, price, etc.)
              },
            },
          },

    });
    res.json(Orders);
  } catch (error) {
    next(error);
  }
});


router.get("/approved", async (req, res, next) => {
    console.log("Get Waiters requested:")
    try {
      const Orders = await prisma.Orders.findMany({
        orderBy: {
          createdAt: 'desc', // Sort by createdAt in descending order
        },
        where:{
         
              OrderStatus: "approved" 
            
           
        },
          include: {
              // Include the related waiter details
              Waiter: true,  // This will include the entire waiter data (you can also specify specific fields)
      
              // Include the related items for each order
              OrderItems: {
                include: {
                  Item: true,  // This will include the item details (e.g., name, price, etc.)
                },
              },
            },
  
      });
      res.json(Orders);
    } catch (error) {
      next(error);
    }
  });

  router.get("/delivered", async (req, res, next) => {
    console.log("Get Waiters requested:")
    try {
      const Orders = await prisma.Orders.findMany({
        orderBy: {
          createdAt: 'desc', // Sort by createdAt in descending order
        },
        where:{
         
              OrderStatus: "delivered" 
            
           
        },
          include: {
              // Include the related waiter details
              Waiter: true,  // This will include the entire waiter data (you can also specify specific fields)
      
              // Include the related items for each order
              OrderItems: {
                include: {
                  Item: true,  // This will include the item details (e.g., name, price, etc.)
                },
              },
            },
  
      });
      res.json(Orders);
    } catch (error) {
      next(error);
    }
  });
  




//Get one student
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params.id;
   // console.log("rec: " + req.params.id);
    const Orders = await prisma.Orders.findUnique({
      where: {
        id:req.params.id,
      },
    });
    res.json(Orders);
  } catch (error) {
    console.log("error form catch: " + error);
    next(error);
  }
});







//Update Student
router.patch("/:id",  async (req, res, next) => {
  
   console.log("Req: "+ JSON.stringify(req.body))
   console.log("ID: "+ req.params.id)
      try {
        const { id } = req.params;
        const Orders = await prisma.Orders.update({
          where: {
            id: req.params.id,
          },
          data: req.body,
        });
        res.json(Orders);
      } catch (error) {
        next(error);
      }
    
  
});


module.exports = router;