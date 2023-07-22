import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ExitInterface {
  id?: string;
  exit_date: any;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ExitGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
