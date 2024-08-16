// Dependências:
import { Router } from "express";

// Módulos de controle:
import { addSpeaker, getAllSpeakers } from "../controllers/speakerController.js";

// Módulos auxiliares (Middleware):
import validateNewSpeaker from "../middleware/validateNewSpeaker.js";

// Inicializando o roteador:
const router = Router();

// Endpoints:
router.post("/", validateNewSpeaker, addSpeaker);
router.get("/", getAllSpeakers);

export default router;