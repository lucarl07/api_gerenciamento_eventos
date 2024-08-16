// Dependências:
import { Router } from "express";

// Roteadores externos:
import speakerRouter from "./speakerRoutes.js"

// Módulos de controle:
import { addEvent, getAllEvents } from "../controllers/eventController.js";

// Módulos auxiliares (Middleware):
import validateNewEvents from "../middleware/validateNewEvents.js";

// Inicializando o roteador:
const router = Router();

// Endpoints Locais | Eventos:
router.post("/criar", validateNewEvents, addEvent)
router.get("/agenda", getAllEvents)

// Endpoints Externos:
router.use("/palestrantes", speakerRouter)

export default router;
