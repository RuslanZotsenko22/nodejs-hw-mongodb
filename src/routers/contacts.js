import { Router } from 'express';
import {
  addNewContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../untils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(addNewContactController));
router.delete('/contacts', ctrlWrapper(deleteContactController));
router.patch('/contacts', ctrlWrapper(patchContactController));

export default router;
