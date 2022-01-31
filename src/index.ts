import {AddOperation} from "./operations/AddOperation";
import {DocumentOperation} from "./operations/DocumentOperation";
import {UpdateOperation} from "./operations/UpdateOperation";
import {RemoveOperation} from "./operations/RemoveOperation";
import {OperationNotFound} from "./operations/exceptions/OperationNotFound";
import * as _ from "lodash";

const ALL_OPERATIONS: DocumentOperation[] = [new AddOperation(), new UpdateOperation(), new RemoveOperation()]

export function generateUpdateStatement(document: any, mutation: any): any {
    const finalObj = {};

    for (const [key, mutations] of Object.entries(mutation)) {
        for (const mutation of <any[]>mutations) {
            const targetOperation: DocumentOperation | undefined = ALL_OPERATIONS.find(value => value.isOperation(mutation));
            if (targetOperation == undefined || mutation == undefined || _.isEmpty(mutation)) {
                throw new OperationNotFound(mutation);
            }

            Object.assign(finalObj, targetOperation.transform(document, mutation, key));
        }
    }

    return finalObj;
}