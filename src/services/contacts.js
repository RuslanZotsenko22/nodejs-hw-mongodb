import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../untils/calculatePaginationData.js';
import { SORT_ORDER } from '../constans/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    const isFav = filter.isFavourite === true || filter.isFavourite === 'true';
    contactsQuery.where('isFavourite').equals(isFav);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (userId, contactId) => {
  const contacts = await ContactsCollection.findOne({ _id: contactId, userId });
  return contacts;
};

export const addNewContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (userId, contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (userId, contactId, payload) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
    },
  );

  if (!rawResult) return null;

  return rawResult;
};
