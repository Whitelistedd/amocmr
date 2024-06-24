import { userType } from './users';

export type leadType = {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id: number;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  is_deleted: string;
  score: number;
  account_id: number;
  labor_cost: number;
  custom: {
    responsible_user: userType;
    contacts: userType[];
    status: string;
  };
  _embedded: {
    contacts: userType[];
  };
};
