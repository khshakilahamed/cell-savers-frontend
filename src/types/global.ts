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

export interface ICustomerAgent {
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

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  id: string;
  title: string;
  price: number;
  image: string;
  reviews: IReview[];
  description: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ITimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IBlog {
  id: string;
  title: string;
  image: string;
  description: string;
  customerAgentId: string;
  customerAgent: ICustomerAgent;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  customerAgentId: string;
  customerAgent: ICustomerAgent;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IBooking {
  id: string;
  bookingDate: string;
  bookingStatus: string;
  issueDescription: string;
  issueStatus: String;
  readyToReview: boolean;
  customerId: string;
  customer: ICustomer[];
  customerAgentId: string;
  customerAgent: ICustomerAgent;
  serviceId: string;
  service: IService;
  slotId: string;
  slot: ITimeSlot;
  reviews: IReview[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
