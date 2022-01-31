import {generateUpdateStatement} from "../../src";

const BASE_DOC = {
    "_id": 1,
    "name": "Johnny Content Creator",
    "posts": [
        {
            "_id": 2,
            "value": "one",
            "mentions": []
        },
        {
            "_id": 3,
            "value": "two",
            "mentions": [
                {
                    "_id": 5,
                    "text": "apple"
                },
                {
                    "_id": 6,
                    "text": "orange"
                }
            ]
        },
        {
            "_id": 4,
            "value": "three",
            "mentions": []
        }
    ]
};

const generateFromBase = (inputMutation: any): any => {
    return generateUpdateStatement(BASE_DOC, inputMutation);
}

export default generateFromBase;