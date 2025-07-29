import StatusCodes from "./status-codes";

class CustomError extends Error {
  constructor(public code: StatusCodes, public message: string) {
    super(message);
  }
}

export default CustomError;
