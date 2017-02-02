'use strict';

let
    async = require('async')
    , array = [
        {
            "username": "@nncl"
            , "gender": "male"
        },
        {
            "username": "@day"
            , "gender": "female"
        },
        {
            "username": "@ki"
            , "gender": "male"
        },
        {
            "username": "@kate"
            , "gender": null
        }
    ];

const func1 = (id) => {
    return (callback) => {
        console.log("Hello Func 1", id);

        let user = {
            "id": id
        };

        callback(null, user);
    }
};

const func2 = (log) => {
    return (user, callback) => {
        console.log("Hello 2n Func");
        console.log(log);

        let user2 = user
            , user3 = user;

        callback(null, user, user2, user3);
    }
};

const func3 = () => {
    return (user, user2, user3, callback) => {
        console.log("Hello 3rd Func");
        let users = [];
        users.push(user);
        users.push(user2);
        users.push(user3);

        callback(null, users);
    }
};

async.each(array, (item, eachCallback) => {

    console.log(item.username);
    async.waterfall(
        [
            func1(123)
            , func2("This is a log " + item.gender)
            , func3()
        ], (err, users) => {
            if (err) console.error("Error in waterfall", err);

            console.log("Waterfall Users Done", users);
            eachCallback();
        });

}, (err) => {
    if (err) console.error("Error in each", err);
    console.log("Each done here");

    process.exit;
});