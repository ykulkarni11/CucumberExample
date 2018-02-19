	//  This file is for uploading the result file generated by cucumber to QTM4J   

	var Client = require('node-rest-client').Client;
	var client = new Client();
	var request = require('request');
	var fs = require("fs");

	//set var type = Cloud or Server
	var type = 'Cloud';

	// this code block will run when the type is set to 'Cloud'
	if (type == 'Cloud') {

	    // set content-type header and data as json in args parameter 
	    var args = {
	        data: {
	            "apiKey": "311bc1af691eba5addee39fe15f5c836bc55a726eef287d1d9c8f98e1951aa0f",
	            "format": "cucumber/json",
	            "testRunName": "My Test Run1",
	            

	            // You can uncomment the below object and pass other optional paramets alongwith the required ones.
	            // "testAssetHierarchy": "TestCase-TestStep" or "TestScenario-TestCase",
	            // "labels":"",
	            // "versions":"",
	            // "components":"",
	            // "sprint":"",
	            // "comment":"",
	            // "testRunKey":""
	        },
	        headers: { "Content-Type": "application/json" }
	    };

	    //1st API call
	    client.post('https://importresults.qmetry.com/prod/importresults-qtm4j ', args, function(data, response) {

	        var filePath = 'test-result.json';

	        //2nd API call
	        request.put({
	            url: data.url,
	            headers: { 'Content-Type': 'multipart/form-data' },
	            body: fs.readFileSync(filePath, 'utf8', function(err, data) {
	                if (err) throw err;
	                console.log(data);
	            })
	        }, function optionalCallback(err, httpResponse, body) {
	            if (err) {
	                return console.error('upload failed:', err);
	            }
	            console.log('Upload successful! ');
	        });

	    });

	}

	// this code block will run when the type is set to 'Server'
	else {

	    var serverurl = 'https://you_jira_url/rest/qtm/latest/automation/importresults';
	   
	   //Jira username password.
	    var username = 'admin';
	    var password = 'admin';
	    var encoded = "Basic " + (new Buffer(username + ":" + password).toString('base64'));
	    var filePath = 'test-result.json';
	    console.log(encoded);

	    var formData = {
	        // Pass simple key-value pairs
	        apiKey: 'c9e3a7a4b617d8882b139537e971a156d93523224c62df44cbf5f9f3318cfba6',
	        format: "cucumber/json",
	        testRunName: "New Test Run",
	        file: fs.createReadStream(filePath)

	        // You can uncomment the below object and pass other optional paramets alongwith the required ones.
	        // "testAssetHierarchy": "TestCase-TestStep" or "TestScenario-TestCase",
	        // "labels":"",
	        // "versions":"",
	        // "components":"",
	        // "sprint":"",
	        // "comment":"",
	        // "testRunKey":""
	    };

	    request.post({ url: serverurl, headers: { 'Authorization': encoded }, formData: formData }, function optionalCallback(err, httpResponse, body) {
	        if (err) {
	            return console.error('upload failed:', err);
	        }
	        console.log('Upload successful!  Server responded with:', body);
	    });


	}
