import { Router } from 'express';
import { NewsController } from '../api/NewsController';

const router = Router();
const newsController = new NewsController();

router.get('/', newsController.getAllNews.bind(newsController));
router.get('/:id', newsController.getNewsWithId.bind(newsController));
router.post('/upload', newsController.uploadNewsFile.bind(newsController));
router.delete('/:id', newsController.deleteNews.bind(newsController));

// New routes for updating title, clip, banner, and sections
router.put('/:id/title', newsController.updateTitle.bind(newsController));
router.put('/:id/clip', newsController.updateClip.bind(newsController));
router.put('/:id/banner', newsController.upload.single('banner'), newsController.updateBanner.bind(newsController));
router.put('/:id/section', newsController.upload.single('file'), newsController.updateNewsSection.bind(newsController));

export default router;
