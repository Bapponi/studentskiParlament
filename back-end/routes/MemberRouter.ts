import { Router } from 'express';
import { MemberController } from '../controllers/MemberController';

const router = Router();
const memberController = new MemberController();

router.get('/:roleId', memberController.getAllMembers.bind(memberController));
router.get('/name/:userId', memberController.getMemberName.bind(memberController));
router.post('/upload', memberController.uploadMemberFile.bind(memberController));
router.delete('/:id', memberController.deleteMember.bind(memberController));
router.put('/:id', memberController.updateMember.bind(memberController));
router.post('/login', memberController.loginMember.bind(memberController));
router.post('/resetPassword', memberController.requestPasswordReset.bind(memberController));
router.put('/newPassword/password', memberController.setNewPassword.bind(memberController));

export default router;
