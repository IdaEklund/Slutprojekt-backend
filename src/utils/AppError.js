
//Klass som skapar felobjekt. Kastar fel med statuskod och meddelande.
//Fångas upp av errorHandlern som läser av statusCode och message.
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}