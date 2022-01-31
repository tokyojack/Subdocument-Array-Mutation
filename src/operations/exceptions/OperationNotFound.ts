export class OperationNotFound extends Error {
    constructor(mutation: any) {
        super("No operation found for mutation: " + JSON.stringify(mutation));

        Object.setPrototypeOf(this, OperationNotFound.prototype);
    }
}