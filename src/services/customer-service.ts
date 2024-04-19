import customersData from '../data/customers-data.json';
import { Customer, NewCustomer, EditCustomer } from '../types/customer-types';
import { checkValue, formattedCurrentDate } from '../utils/app-utils';
import { getCustomerId, removeCustomer } from '../utils/customer-utils';

const customers: Customer[] = customersData as Customer[];

export const getCustomers = (): Customer[] => customers;

export const getNewCustomer = (body: any): NewCustomer => {
  let firstName = checkValue({
    value: body.firstName,
    name: 'firstName',
    type: 'string',
    required: true,
  });

  let lastName = checkValue({
    value: body.lastName,
    name: 'lastName',
    type: 'string',
    required: true,
  });

  let email = checkValue({
    value: body.email,
    name: 'email',
    type: 'string',
    required: true,
  });

  let birth_date = checkValue({
    value: body.birth_date,
    name: 'birth_date',
    type: 'string',
    required: true,
    isDateString: true,
  });

  const newCustomer: NewCustomer = {
    firstName,
    lastName,
    email,
    birth_date,
  };

  return newCustomer;
};

export const addCustomer = (newCustomer: NewCustomer) => {
  let id = getCustomerId(customers);
  let create_date = formattedCurrentDate(true);
  const newCustomerEntry: Customer = {
    id,
    ...newCustomer,
    create_date,
  };

  customers.push(newCustomerEntry);
  return newCustomerEntry;
};

export const getEditCustomer = (body: any): EditCustomer => {
  if (body.create_date)
    throw new Error("Can't update 'create_date' in customer.");

  const id = checkValue({
    value: body.id,
    name: 'id',
    type: 'number',
    required: true,
  });

  const firstName = checkValue({
    value: body.firstName,
    name: 'firstName',
    type: 'string',
    required: true,
  });

  const lastName = checkValue({
    value: body.lastName,
    name: 'lastName',
    type: 'string',
    required: true,
  });

  const email = checkValue({
    value: body.email,
    name: 'email',
    type: 'string',
    required: true,
  });

  const birth_date = checkValue({
    value: body.birth_date,
    name: 'birth_date',
    type: 'string',
    isDateString: true,
    required: true,
  });

  const editCustomer: EditCustomer = {
    id,
    firstName,
    lastName,
    email,
    birth_date,
  };

  return editCustomer;
};

export const updateCustomer = (editCustomer: EditCustomer): Customer => {
  const index = customers.findIndex(
    (customer) => customer.id == editCustomer.id
  );
  if (index < 0) throw new Error('Customer not found.');
  const oldCustomer = { ...customers[index] };
  const newEditedUser: Customer = {
    ...editCustomer,
    create_date: oldCustomer.create_date,
  };
  customers[index] = newEditedUser;
  return newEditedUser;
};

export const deleteCustomer = (id: number): Customer => {
  let customerNotFound = !customers.some((customer) => customer.id == id);
  if (customerNotFound) throw new Error('Customer not found.');
  const deletedCustomer = removeCustomer(customers, id);
  if (!deletedCustomer) throw new Error('There are no customers to remove.');
  return deletedCustomer;
};
