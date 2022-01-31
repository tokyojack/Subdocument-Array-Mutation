import {DocumentOperation} from "./DocumentOperation";

export class UpdateOperation extends DocumentOperation {

    constructor() {
        super("$update");
    }

    isOperation(mutation: any): boolean {
        return this.getDeepestPaths(mutation).some(path => path.includes(this.ID)) && !this.hasKey(mutation, this.DELETE);
    }

    transform(document: any, mutation: any): any {
        const [deepestIDPath] = this.getDeepestPaths(mutation).filter(path => path.endsWith(this.ID))
        return this.fromPathBuildAdjecentKey(document, mutation, deepestIDPath);
    }

}