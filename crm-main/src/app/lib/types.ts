import { ObjectId } from "mongodb";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "lost"
  | "cancelled"
  | "confirmed";

export type SrStatus =
  | "created"
  | "open"
  | "in process"
  | "released"
  | "canceled"
  | "completed";

export default interface Customer {
  name: string;
  email: string;
  phone: string;
  leadStatus: LeadStatus;
}

export type CustomerWithId = {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  leadStatus: LeadStatus;
  createdAt: Date;
};

export type ServiceRequest = {
  _id: ObjectId;
  createedAt: Date;
  status: SrStatus;
  customerId: ObjectId;
};
