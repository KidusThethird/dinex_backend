
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



router.get("/history_for_waiter", authenticateToken, async (req, res, next) => {

if(req.user.id){
  
  console.log("Get Waiters requested:")
  try {

    const UserDetails = await prisma.Waiters.findUnique({
 
      where: { id: req.user.id },
     
    });


    const Orders = await prisma.Orders.findMany({
      where:{
        WaiterId: UserDetails.id
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order
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
  }}else {
    res.send(401)
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

//Create a Student
router.post("/", authenticateToken, async (req, res, next) => {
  
    try {
        console.log("Req: " + JSON.stringify(req.body));
        
        const WaiterDetails = await prisma.Waiters.findUnique({
 
            where: { id: req.user.id },
           
          });
const WaiterId = WaiterDetails.id;
      const { OrderItems  } = req.body;
      var TableNumber = "x";
      console.log("TableNUm: "+ req.body.TableNumber)
      if(req.body.TableNumber !=null){  var TableNumber = req.body.TableNumber;}

      // Prepare the order data including the nested OrderItems
      const orderData = {
        WaiterId,
        
       
       
        OrderItems: {
          create: OrderItems.map((item) => ({
            ItemId: item.ItemId,
            quantity: item.quantity,
          })),
        },
      };
  
      console.log("Order Data: " + JSON.stringify(orderData));
  
      // Save the new order data to the database
      const order = await prisma.Orders.create({
        data: {TableNumber: TableNumber, // Add the table number here
        ...orderData, }// Include other order data like waiterId, orderItems, etc.
      });
  
      res.json(order);
    } catch (error) {
      console.error("Error from catch:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  





//Update Student
// router.patch("/:id",  async (req, res, next) => {
  
   
//       try {
//         const { id } = req.params;
//         const Waiters = await prisma.Waiters.update({
//           where: {
//             id: parseInt(req.params.id),
//           },
//           data: req.body,
//         });
//         res.json(Waiters);
//       } catch (error) {
//         next(error);
//       }
    
  
// });

//delete Student
// router.delete("/:id",  async (req, res, next) => {
 
    
//       try {
//         const { id } = req.params;
//         Waiters = await prisma.Waiters.delete({
//           where: {
//             id: parseInt(req.params.id),
//           },
//         });

//         res.json(Waiters);
//       } catch (error) {
//         next(error);
//       }
   
 
// });

module.exports = router;