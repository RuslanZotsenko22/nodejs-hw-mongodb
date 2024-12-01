import { Router } from 'express';
import {
  addNewContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../untils/ctrlWrapper.js'; //wraper
import { validateBody } from '../middlewares/validateBody.js'; //midelvares/validateBody.js
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(addNewContactController),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/contacts/:contactId',
  validateBody(patchContactSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

export default router;
