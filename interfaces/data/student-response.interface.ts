export interface RegisterStudentSuccessResponse {
  success: true;
  message: string;
  data: {
    insertedId: unknown;
  };
}

export interface RegisterStudentFailureResponse {
  success: false;
  message: string;
}
