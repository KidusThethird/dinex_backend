
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

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
router.post("/",  async (req, res, next) => {
  console.log("Req: " + JSON.stringify(req.body));
  try {
    const Waiters = await prisma.Waiters.create({
      data: req.body,
    });
    res.json(Waiters);
  } catch (error) {
    res.json({"message":"failed"});
    console.log("Error from catch: " + error);
  }
});

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