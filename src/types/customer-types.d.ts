export interface Customer {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  birth_date?: string;
  create_date?: string;
}

export type NewCustomer = Omit<Customer, 'id' | 'create_date'>;
export type EditCustomer = Omit<Customer, 'create_date'>;
