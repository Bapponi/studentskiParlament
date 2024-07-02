import { Router } from 'express';
import { NewsController } from '../api/NewsController';

const router = Router();
const newsController = new NewsController();

router.get('/', newsController.getAllNews.bind(newsController));
router.post('/upload', newsController.uploadNewsFile.bind(newsController));
router.delete('/:id', newsController.deleteNews.bind(newsController));
router.put('/:id', newsController.updateNews.bind(newsController));

export default router;
