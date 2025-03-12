const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//const checkAuthenticated = require("./login_register.route");

//working with students

//Get all student
router.get("/", async (req, res, next) => {
  try {
    const Item = await prisma.inventoryPurchase.findMany({});
    res.json(Item);
  } catch (error) {
    next(error);
  }
});

//Get one student
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params.id;
    // console.log("rec: " + req.params.id);
    const Item = await prisma.inventoryPurchase.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(Item);
  } catch (error) {
    console.log("error form catch: " + error);
    next(error);
  }
});

//Create a Student
router.post("/", async (req, res, next) => {
  console.log("Req: " + JSON.stringify(req.body));
  try {
    const Item = await prisma.inventoryPurchase.create({
      data: req.body,
    });
    res.json(Item);
  } catch (error) {
    res.json({ message: "failed" });
    console.log("Error from catch: " + error);
  }
});

//Update Student
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const Item = await prisma.inventoryPurchase.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(Item);
  } catch (error) {
    next(error);
  }
});

//delete Student
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    Item = await prisma.inventoryPurchase.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(Item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
