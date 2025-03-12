import express from "express";
import { getAll, getAddresById, createAddres, /*updateAddres*/ destroyAddresById } from "../controllers/AddressController";

const router = express.Router();

router.get("/Address", getAll);
router.get("/Address/:id", getAddresById);
router.post("/Address", createAddres);
//router.put("/Address", updateAddres);
router.delete("/Address/:id", destroyAddresById)

export default router;