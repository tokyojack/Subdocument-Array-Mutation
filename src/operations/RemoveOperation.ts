import {DocumentOperation} from "./DocumentOperation";
import lodash from 'lodash';
import deepdash from 'deepdash';
import {MutationMissingID} from "./exceptions/MutationMissingID";
import {DocumentMissingTargetID} from "./exceptions/DocumentMissingTargetID";
const _ = deepdash(lodash);

export class RemoveOperation extends DocumentOperation {

    constructor() {
        super("$remove");
    }

    isOperation(mutation: any): boolean {
        return this.hasKey(mutation, this.DELETE);
    }

    transform(document: any, mutation: any): any {
        const {_id} = <any>_.findDeep(mutation, (value, key) => (key === this.DELETE))?.parent;
        if (_id == undefined) {
            throw new MutationMissingID();
        }

        const documentPath = <(string | number)[]>_.findPathDeep(
            document,
            (value, key) => (value == _id && key === this.ID),
            {pathFormat: "array"}
        );
        if (documentPath == undefined) {
            throw new DocumentMissingTargetID(_id);
        }

        const cleanedPath = documentPath.slice(0, documentPath.length - 1).join("."); // Slice to remove the extra _id at the end
        return this.getStatement({[cleanedPath]: true});
    }

}

