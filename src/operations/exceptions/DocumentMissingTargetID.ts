export class DocumentMissingTargetID extends Error {
    constructor(_id: number) {
        super(`No document with the ID ${_id}`);

        Object.setPrototypeOf(this, DocumentMissingTargetID.prototype);
    }
}