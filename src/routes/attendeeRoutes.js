// Dependências:
import { Router } from "express";

// Módulos de controle:
import { addAttendee } from "../controllers/attendeeController.js";

// Inicializando o roteador:
const router = Router();

// Endpoints:
router.post("/registrar", addAttendee)

export default router;