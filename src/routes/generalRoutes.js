// Dependências:
import { Router } from "express";

// Módulos de controle:
import {
  addSpeaker,
  getAllSpeakers,
} from "../controllers/speakerController.js";

// Módulos auxiliares (Middleware):
import validateNewSpeaker from "../middleware/validateNewSpeaker.js";

// Inicializando o roteador:
const router = Router();

// Endpoints | Eventos:
router.post("/criar")
router.get("/agenda")

// Endpoints | Palestrantes:
router.post("/palestrantes", validateNewSpeaker, addSpeaker);
router.get("/palestrantes", getAllSpeakers);

export default router;
