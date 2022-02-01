import {Path} from "deepdash/es/Path";
import {DocumentMissingTargetID} from "./exceptions/DocumentMissingTargetID";

import lodash from 'lodash';
import deepdash from 'deepdash';
const _ = deepdash(lodash);

export abstract class DocumentOperation {

    // Constant values in operations
    protected readonly ID = "_id";
    protected readonly DELETE = "_delete";

    private readonly commandPrefix: string;

    protected constructor(commandPrefix: string) {
        this.commandPrefix = commandPrefix;
    }

    public abstract isOperation(mutation: any): boolean;
    public abstract transform(document: any, mutation: any, key: any): any;

    protected getStatement(value: any) {
        return {[this.commandPrefix]: value}
    }

    protected hasKey(obj: any, keyName: string): boolean {
        return _.someDeep(obj, (value, key) => key === keyName);
    }

    protected fromPathBuildAdjecentKey(document: any, mutation: any, path: Path) {
        const {value: targetId, parent} = <any>_.findDeep(mutation,
            (value, key, parentValue, context) => (context.path === path));

        const documentPath = <(string | number)[] | undefined>_.findPathDeep(
            document,
            (value, key) => (value == targetId && key === this.ID),
            {pathFormat: "array"}
        );
        if (documentPath === undefined) {
            throw new DocumentMissingTargetID(targetId);
        }

        const [parentKey, parentValue] = Object.entries(parent).filter(([key]) => (key !== this.ID))[0];
        documentPath[documentPath.length - 1] = parentKey; // Replaces the _id to the other entry in the mutation

        return this.getStatement({[documentPath.join(".")]: parentValue});
    }

    protected getDeepestPaths(obj: any): string[] {
        const allPaths = <string[][]>_.paths(obj, {pathFormat: 'array'});
        const largestPathLength = _.reduce(allPaths.map(value => value.length), (curLargest, n) => Math.max(curLargest, n));
        return allPaths.filter(value => value.length == largestPathLength).map(path => _.pathToString(path));
    }

}