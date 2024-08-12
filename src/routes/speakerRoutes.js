// Dependências:
import { Router } from "express";

// Módulos de controle:
import { 
  addSpeaker, getAllSpeakers 
} from "../controllers/speakerController.js"

// Módulos auxiliares (Middleware):

// Inicializando o roteador:
const router = Router();

// Endpoints:
router.post("/", addSpeaker);
router.get("/", getAllSpeakers);

export default router;
