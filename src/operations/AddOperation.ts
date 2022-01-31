import {DocumentOperation} from "./DocumentOperation";
import lodash from 'lodash';
import deepdash from 'deepdash';
const _ = deepdash(lodash);

export class AddOperation extends DocumentOperation {

    constructor() {
        super("$add");
    }

    isOperation(mutation: any): boolean {
        return this.getDeepestPaths(mutation).every(path => !path.includes(this.ID)) && !this.hasKey(mutation, this.DELETE);
    }

    transform(document: any, mutation: any, key: any): any {
        const allIDPaths = (<string[][]>_.paths(mutation, {pathFormat: 'array'})).filter(value => value.some(path => path.endsWith(this.ID)));
        const deepestIDPathLength = _.reduce(allIDPaths.map(value => value.length), (curLargest, n) => Math.max(curLargest, n));
        const [deepestIDPath] = allIDPaths.filter(value => value.length == deepestIDPathLength).map(path => _.pathToString(path));

        if (deepestIDPath == undefined) { // No ID to use
            return this.getStatement({[key]: [mutation]})
        }

        return this.fromPathBuildAdjecentKey(document, mutation, deepestIDPath);
    }

}

