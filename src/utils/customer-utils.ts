import { Customer } from '../types/customer-types';

export function removeCustomer(
  customers: Customer[],
  id: number
): Customer | null {
  customers.sort((_, customer) => {
    if (customer.id == id) return -1;
    else return 0;
  });
  const deletedCustomer = customers.pop();
  return deletedCustomer ?? null;
}

export function getCustomerId(customers: Customer[]) {
  const ids = customers.map((customer) => customer.id ?? 0);
  const maxCustomerId = Math.max(...ids);
  const hasCustomers = customers.length > 0;
  return hasCustomers ? maxCustomerId + 1 : 1;
}
