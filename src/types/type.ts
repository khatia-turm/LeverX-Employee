// for date_birth prop
export interface IDateOfBirth {
  year: number;
  month: number;
  day: number;
}

export interface IManager {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IVisa {
  issuing_country: string;
  type: string;
  start_date: number;
  end_date: number;
}

export interface IEmployee {
  // id and avatar
  _id: string;
  user_avatar: string;

  // names
  first_name: string;
  last_name: string;
  first_native_name: string;
  middle_native_name: string;
  last_native_name: string;

  // job and location
  department: string;
  building: string;
  room: string;
  desk_number: number;
  isRemoteWork: boolean;

  // contacts
  phone: string;
  email: string;
  zoom_id: string;
  zoom_link: string;

  // travel info
  citizenship: string;
  date_birth: IDateOfBirth;
  manager: IManager;
  visa: IVisa[];
}

