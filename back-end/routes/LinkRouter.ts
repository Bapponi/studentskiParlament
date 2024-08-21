import { Router } from 'express';
import { LinkController } from '../controllers/LinkController';

const router = Router();
const linkController = new LinkController();

router.get('/', linkController.getAllLinks.bind(linkController));
router.post('/upload', linkController.createLink.bind(linkController));
router.delete('/:id', linkController.deleteLink.bind(linkController));
router.put('/:id', linkController.updateLink.bind(linkController));

export default router;
