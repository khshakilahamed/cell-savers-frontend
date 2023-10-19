export type INavItems = {
  key: string;
  label: string | React.ReactNode | React.ReactElement;
}[];

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IRole {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IUser {
  id: string;
  email: string;
  roleId: string;
  role: IRole;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  gender: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  userId: string;
  user: IUser;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IService {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ITimeSlot {
  id: string;
  startTime: string;
  endTime: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
