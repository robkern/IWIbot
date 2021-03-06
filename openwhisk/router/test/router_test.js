/**
 * Created by Armin on 11.06.2017.
 */
var request = require('request');
var actionUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/c9f88de3acb5a4648e4f118769d019c8df8797d1777c4342f43260626b4c51bf/iwibotTest/router';
var params = {
    use_unauthenticated: true,
    semester: 5,
    courseOfStudies: 'INFB',
    context: { // If this test is not successful, try to get a new context! (Log and paste it here!)
        conversation_id: '69cf475b-b891-4889-923b-f3605060e1c2',
        system: {
            dialog_stack:[{dialog_node: 'root'}],
            dialog_turn_counter: 1,
            dialog_request_counter: 1,
            _node_output_map:{
                "Willkommen":[0]
            }
        }
    }
};

module.exports = {
    'Router Action Test (timetables)' : function (test) {
        test.expect(2);
        params.payload = 'timetable friday';
        request.post({
            headers: {'content-type': 'text/plain'},
            url: actionUrl,
            body: JSON.stringify(params)
        }, function (err, response, body) {
            console.log('Body: ' + body);
            console.log('Error: ' + err);
            console.log('Response: ' + JSON.stringify(response));
            body = JSON.parse(body);
            test.ok(typeof body.payload === 'string');
            test.ok(body.payload.indexOf('Error') === -1 && body.payload.indexOf('error') === -1);
            test.done();
        });
    },
    'Router Action Test (meal)' : function (test) {
        test.expect(2);
        params.payload = 'Food 1';
        request.post({
            headers: {'content-type': 'text/plain'},
            url: actionUrl,
            body: JSON.stringify(params)
        }, function (err, response, body) {
            console.log('Body: ' + body);
            console.log('Error: ' + err);
            console.log('Response: ' + JSON.stringify(response));
            body = JSON.parse(body);
            test.ok(typeof body.payload === 'string');
            test.ok(body.payload.indexOf('Error') === -1 && body.payload.indexOf('error') === -1);
            test.done();
        });
    },
    'Router Action Test (joke)' : function (test) {
        test.expect(1);
        params.payload = 'joke';
        request.post({
            headers: {'content-type': 'text/plain'},
            url: actionUrl,
            body: JSON.stringify(params)
        }, function (err, response, body) {
            console.log('Body: ' + body);
            console.log('Error: ' + err);
            console.log('Response: ' + JSON.stringify(response));
            body = JSON.parse(body);
            test.ok('payload' in body);
            test.done();
        });
    }
};