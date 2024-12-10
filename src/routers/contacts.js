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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(addNewContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.patch(
  '/:contactId',
  validateBody(patchContactSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

export default router;
