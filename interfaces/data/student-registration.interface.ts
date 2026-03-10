export interface StudentRegistrationRow {
  udid?: string;
  [key: string]: unknown;
}

export interface StudentIdentificationDetails {
  udid?: string;
  row1?: StudentRegistrationRow;
  idRow1?: StudentRegistrationRow;
  [key: string]: unknown;
}

export interface StudentRegistrationPayload {
  identificationDetails?: StudentIdentificationDetails;
  [key: string]: unknown;
}

export interface StudentRegistrationRecord extends StudentRegistrationPayload {
  createdAt: Date;
}
