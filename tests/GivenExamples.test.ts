import generateFromBase from "./utils/BASE_DOC";

describe('Update Mutations', () => {
    test('Example 1', () => {
        const UPDATE_1 = generateFromBase({"posts": [{"_id": 2, "value": "too"}]});
        expect(UPDATE_1).toEqual({"$update": {"posts.0.value": "too"}})
    });

    test('Example 2', () => {
        const UPDATE_2 = generateFromBase({"posts": [{"_id": 3, "mentions": [{"_id": 5, "text": "pear"}]}]});
        expect(UPDATE_2).toEqual({"$update": {"posts.1.mentions.0.text": "pear"}})
    });
});

describe('Appending Mutations', () => {
    test('Example 1', () => {
        const APPENDING_1 = generateFromBase({"posts": [{"value": "four"}]});
        expect(APPENDING_1).toEqual({"$add": {"posts": [{"value": "four"}]}})
    });

    test('Example 2', () => {
        const APPENDING_2 = generateFromBase({"posts": [{"_id": 3, "mentions": [{"text": "banana"}]}]});
        expect(APPENDING_2).toEqual({"$add": {"posts.1.mentions": [{"text": "banana"}]}})
    });
});

describe('Removing Mutations', () => {
    test('Example 1', () => {
        const REMOVING_1 = generateFromBase({"posts": [{"_id": 2, "_delete": true}]});
        expect(REMOVING_1).toEqual({"$remove": {"posts.0": true}})
    });

    test('Example 2', () => {
        const REMOVING_2 = generateFromBase({"posts": [{"_id": 3, "mentions": [{"_id": 6, "_delete": true}]}]});
        expect(REMOVING_2).toEqual({"$remove": {"posts.1.mentions.1": true}})
    });
});

describe('Multi Mutations', () => {
    test('Example 1', () => {
        const MULTI_1 = generateFromBase({
            "posts": [
                {"_id": 2, "value": "too"},
                {"value": "four"},
                {"_id": 4, "_delete": true}
            ]
        });

        expect(MULTI_1).toEqual({
            "$update": {"posts.0.value": "too"},
            "$add": {"posts": [{"value": "four"}]},
            "$remove": {"posts.2": true}
        })
    });
});