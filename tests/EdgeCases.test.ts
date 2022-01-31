import generateFromBase from "./utils/BASE_DOC";
import {DocumentMissingTargetID} from "../src/operations/exceptions/DocumentMissingTargetID";
import {MutationMissingID} from "../src/operations/exceptions/MutationMissingID";
import {OperationNotFound} from "../src/operations/exceptions/OperationNotFound";

describe('Throwing Missing target ID', () => {
    test('Updating missing the mentions _id=-1', () => {
        expect(() => {
            generateFromBase({"posts": [{"_id": 3, "mentions": [{"_id": -1, "text": "pear"}]}]})
        }).toThrow(DocumentMissingTargetID)
    });

    test('Adding missing the mentions _id=-1', () => {
        expect(() => {
            generateFromBase({"posts": [{"_id": -1, "mentions": [{"text": "banana"}]}]})
        }).toThrow(DocumentMissingTargetID)
    });

    test('Delete missing the mentions _id=-1', () => {
        expect(() => {
            generateFromBase({"posts": [{"_id": -1, "_delete": true}]})
        }).toThrow(DocumentMissingTargetID)
    });
});

describe('Cases where it shouldnt throw missing target ID', () => {
    test('Adding a new post', () => {
        expect(() => {
            generateFromBase({"posts": [{"value": "four"}]})
        }).not.toThrow(DocumentMissingTargetID)
    });

    // (It shouldnt throw because it gets the deepest and works up)
    test('Updating missing the posts _id=-1', () => {
        expect(() => {
            generateFromBase({"posts": [{"_id": -1, "mentions": [{"_id": 5, "text": "pear"}]}]})
        }).not.toThrow(DocumentMissingTargetID)
    });
});

describe('Mutation missing general ID', () => {
    test('Delete missing _id', () => {
        expect(() => {
            generateFromBase({"posts": [{"_delete": true}]})
        }).toThrow(MutationMissingID)
    });
});

describe('Weird operation types', () => {
    test('Returns empty object from no mutations', () => {
        const OUPUT = generateFromBase({"posts": []})
        expect(OUPUT).toEqual({});
    });
    test('Empty element in operation', () => {
        expect(() => {
            generateFromBase({"posts": [{}]})
        }).toThrow(OperationNotFound)
    });
    test('Undefined element in operation', () => {
        expect(() => {
            generateFromBase({"posts": [undefined]})
        }).toThrow(OperationNotFound)
    });
});