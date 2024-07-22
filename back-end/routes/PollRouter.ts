import { Router } from 'express';
import { PollController } from '../api/PollController';

const router = Router();
const pollController = new PollController();

router.get('/', pollController.getAllPolls.bind(pollController));
router.post('/upload', pollController.uploadPoll.bind(pollController));
router.delete('/:id', pollController.deletePoll.bind(pollController));
router.put('/:id', pollController.updatePollActivityStatus.bind(pollController));

export default router;
