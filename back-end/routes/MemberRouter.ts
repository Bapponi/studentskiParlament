import { Router } from 'express';
import { MemberController } from '../api/MemberController';

const router = Router();
const memberController = new MemberController();

router.get('/', memberController.getAllMembers.bind(memberController));
router.post('/upload', memberController.uploadMemberFile.bind(memberController));
router.delete('/:id', memberController.deleteMember.bind(memberController));
router.put('/:id', memberController.updateMember.bind(memberController));

export default router;
