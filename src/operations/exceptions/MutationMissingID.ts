export class MutationMissingID extends Error {
    constructor() {
        super("No ID found for mutation selection operation");

        Object.setPrototypeOf(this, MutationMissingID.prototype);
    }
}