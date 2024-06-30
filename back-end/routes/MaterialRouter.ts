import { Router } from 'express';
import { MaterialController } from '../api/MaterialController';

const router = Router();
const materialController = new MaterialController();

router.get('/', materialController.getAllMaterials.bind(materialController));
router.post('/upload', materialController.uploadMaterialFile.bind(materialController));
router.delete('/:id', materialController.deleteMaterial.bind(materialController));
router.put('/:id', materialController.updateMaterial.bind(materialController));

export default router;