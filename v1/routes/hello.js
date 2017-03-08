'use strict';

function factory(demo) {
    function GET(req, res) {
        demo.hello().then(result => {
            console.log(result);
            res.status(200);
            res.json({
                result: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send(err);
        })
    }

    GET.apiDoc = {
        summary: 'Return world',
        tags: ['hello'],

        responses: {
            200: {
                description: 'A string "world".'
            },
            500: {
                description: 'Server error occurred'
            }
        }
    };

    return {
        GET
    };

}
module.exports = factory;