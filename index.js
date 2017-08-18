"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');
var heatingSystem_age="";
var coolingSystem="";
var question14="";
var question15="";

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});


var bot = new builder.UniversalBot(connector,[
    function (session) {

     session.send('Hello, I am Al, the home assessment bot, my goal is to show you how healthy is your home.  This assessment will only take a few minutes and at the end you will receive both a health and efficiency rating for your home.  The home is a system and our goal is to educate our residents, renters and owners, on ways you can increase the air quality of your home along with reducing energy costs.');
    
        return session.beginDialog('q1');
   
	
	

}]);



bot.localePath(path.join(__dirname, './locale'));

bot.dialog('q1', [
    function (session) {
        builder.Prompts.text(session, 'Can you tell me the size of your home in square feet?');
    },
    function (session, results) {
        session.userData.q1 = results.response;
        builder.Prompts.number(session, 'How old is your home, please provide the year it was originally built?');
    },
	function (session, results) {
        session.userData.q2 = results.response;
        builder.Prompts.choice(session, 'What type of home do you live in? Pick which type?', ['Single Family', 'Townhome', 'Condominium']);
    },
    function (session, results) {
        session.userData.q3 = results.response;
        builder.Prompts.choice(session, 'Do you have any children or elderly living with you in the home?', ['Yes', 'No']);
    },
	function (session, results) {
        session.userData.q5 = results.response.entity;
        builder.Prompts.choice(session, 'Does anyone at home have any respiratory sensitivity or asthma?', ['Yes', 'No']);
    },
	function (session, results) {
        session.userData.q6 = results.response.entity;
        builder.Prompts.choice(session, 'Do you feel if your home is dusty?', ['Yes', 'No']);
    },
	function (session, results) {
        session.userData.q7 = results.response.entity;
        builder.Prompts.choice(session, 'Do you notice any mold/mildew in or around your home?', ['Yes', 'No']);
    },
	function (session, results) {
        session.userData.q8 = results.response.entity;
        builder.Prompts.choice(session, 'Has any work been done with your insulation or ducts in your home in the past 10 years. Answer a YES if your home is less than 10 years old?', ['Yes', 'No']);
    },
	function (session, results) {
        session.userData.q9 = results.response.entity;
        builder.Prompts.choice(session, 'How does your attic look, pick one of the asnwers!', ['Fully insulated', 'Partially Insulated', 'No Insulation']);
    },
	function (session, results) {
        session.userData.q10 = results.response.entity;
        builder.Prompts.choice(session, 'What type of thermostat do you have in your home?', ['Standard', 'Smart']);
    },
	function (session, results) {
        session.userData.q11 = results.response.entity;
		builder.Prompts.choice(session, 'What type of heating system do you have in your home?', ['Gas powered central heating', 'Electric powered central heating', 'Wood Fired in home', 'None']);
    },
	function (session, results) {
       var v_q12 =  results.response.entity;
		if(results.response.entity!="None" && results.response.entity!="none"){
			builder.Prompts.choice(session, 'How old is your heating systing?', ['0-5 years', '5-10 Years', '10 years or older']);
			heatingSystem_age = "true";
		}else{
			builder.Prompts.choice(session, 'What type of cooling system do you have in your home?', ['Electric powered central cooling', 'Individual room', 'None']);
			heatingSystem_age = "false";
		}
        
    },
	function (session, results) {
 		if(heatingSystem_age=="true"){
			session.userData.q13 = results.response.entity;
			builder.Prompts.choice(session, 'What type of cooling system do you have in your home?', ['Electric powered central cooling', 'Individual room', 'None']);
			coolingSystem = "true";
		}else{
			session.userData.q13 = "";
			question14 = session.userData.q14 = results.response.entity;
			if(question14!="None" && question14!="none"){
				builder.Prompts.choice(session, 'How old is your cooling systing?', ['0-5 years', '5-10 Years', '10 years or older']);
				coolingSystem = "true";
			}else{
				builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom']);
				coolingSystem = "false";
			}
		}
    },
	function (session, results) {
		if(heatingSystem_age=="true"){
			question14 = session.userData.q14 = results.response.entity;
			if(results.response.entity!="None" && results.response.entity!="none"){
				builder.Prompts.choice(session, 'How old is your cooling systing?', ['0-5 years', '5-10 Years', '10 years or older']);
				coolingSystem = "true";
			}else{
				builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom']);
				coolingSystem = "false";
			}
		}else{
			question14 = "";
			question15 = session.userData.q15 =results.response.entity;
			builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom']);
			coolingSystem = "false";
		}
    },
	function (session, results) {
		if(heatingSystem_age=="true"){
			question15 = session.userData.q15 = results.response.entity;
			if(question14!="None" && question14!="none"){
				question15 = session.userData.q15 = results.response.entity;
				builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom']);
			}else{
				session.userData.q16 = results.response.entity;
				builder.Prompts.choice(session, 'How old is your refrigerator?',['0-5 years', '5-10 Years', '10 years or older']);
			}
		}else{
			session.userData.q16 = results.response.entity;
			builder.Prompts.choice(session, 'How old is your refrigerator?',['0-5 years', '5-10 Years', '10 years or older']);
		}
        
		
    },function (session, results) {
        
		if(heatingSystem_age=="true"){
			
			if(question14!="None" && question14!="none"){
				session.userData.q16 = results.response.entity;
				builder.Prompts.choice(session, 'How old is your refrigerator?',['0-5 years', '5-10 Years', '10 years or older']);
			}else{
				session.userData.q17 = results.response.entity;
				builder.Prompts.choice(session, 'What type of water heater do you have in your home?', ['Gas powered tank', 'Electric powered tank', 'Tankless system']);
			}
		}else{
			session.userData.q17 = results.response.entity;
			builder.Prompts.choice(session, 'What type of water heater do you have in your home?', ['Gas powered tank', 'Electric powered tank', 'Tankless system']);
			
		}
        
		
    },
	function (session, results) {
        
		if(heatingSystem_age=="true"){
			
			if(question14!="None" && question14!="none"){
				session.userData.q17 = results.response.entity;
				builder.Prompts.choice(session, 'What type of water heater do you have in your home?', ['Gas powered tank', 'Electric powered tank', 'Tankless system']);
			}else{
				session.userData.q18 = results.response.entity;
				session.endDialog('WOW!!!. You are done, let me calculate your health and efficiency index, calculating now. Here you go');
			}
		}else{
			session.userData.q18 = results.response.entity;
			session.endDialog('WOW!!!. You are done, let me calculate your health and efficiency index, calculating now. Here you go');
			
		}
        
		
    },
	function (session, results) {

			session.userData.q18 = results.response.entity;
			session.endDialog('WOW!!!. You are done, let me calculate your health and efficiency index, calculating now. Here you go');
		
		
    }
]);

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
