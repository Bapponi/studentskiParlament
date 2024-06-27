import { Router } from 'express';
import { LinkController } from '../api/LinkController';

const router = Router();
const linkController = new LinkController();

router.get('/', linkController.getAllLinks.bind(linkController));
router.post('/upload', linkController.uploadLinkFile.bind(linkController));

export default router;
