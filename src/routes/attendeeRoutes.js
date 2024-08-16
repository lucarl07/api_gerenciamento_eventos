// Dependências:
import { Router } from "express";

// Módulos de controle:
import { addAttendee } from "../controllers/attendeeController.js";

// Módulos auxiliares (Middleware):
import validateNewAttendees from "../middleware/validateNewAttendees.js";

// Inicializando o roteador:
const router = Router();

// Endpoints:
router.post("/registrar", validateNewAttendees, addAttendee)

export default router;