import {
  addNewContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../untils/parsePaginationParams.js';
import { parseSortParams } from '../untils/parseSortParams.js';
import { parseFilterParams } from '../untils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  if (!contacts.data.length) {
    const typeMessage = filter.type ? `with type ${filter.type}` : '';
    const favMessage =
      filter.isFavourite !== undefined
        ? `and isFavourite=${filter.isFavourite}`
        : '';

    throw createHttpError(
      404,
      `No contacts found ${typeMessage} ${favMessage}`.trim(),
    );
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contact = await getContactsById(userId, contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addNewContactController = async (req, res, next) => {
  console.log('User in request:', req.user);

  const { _id: userId } = req.user;
  const contactData = { ...req.body, userId };

  console.log('Contact Data:', contactData);

  const contact = await addNewContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contact = await deleteContact(userId, contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const result = await updateContact(userId, contactId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};
