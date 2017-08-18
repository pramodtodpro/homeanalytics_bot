var builder = require('botbuilder');
var azure = require('botbuilder-azure');
var restify = require('restify');
var session_start=0;
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create connector and listen for messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector,[
    function (session) {
        builder.Prompts.text(session, 'Can you tell me the size of your home in square feet?');
    },
    function (session, results) {
        session.userData.q1 = results.response;
        builder.Prompts.number(session, 'How old is your home, please provide the year it was originally built?');
    },
	function (session, results) {
        session.userData.q2 = results.response;
        builder.Prompts.choice(session, 'What type of home do you live in? Pick which type?', ['Single Family', 'Townhome', 'Condominium'],{listStyle: builder.ListStyle.button});
    },
    function (session, results) {
        session.userData.q3 = results.response;
        builder.Prompts.choice(session, 'Do you have any children or elderly living with you in the home?', ['Yes', 'No'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
        session.userData.q5 = results.response.entity;
        builder.Prompts.choice(session, 'Does anyone at home have any respiratory sensitivity or asthma?', ['Yes', 'No'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
        session.userData.q6 = results.response.entity;
        builder.Prompts.choice(session, 'Do you feel if your home is dusty?', ['Yes', 'No'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
        session.userData.q7 = results.response.entity;
        builder.Prompts.choice(session, 'Do you notice any mold/mildew in or around your home?', ['Yes', 'No'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
        session.userData.q8 = results.response.entity;
        builder.Prompts.choice(session, 'Has any work been done with your insulation or ducts in your home in the past 10 years. Answer a YES if your home is less than 10 years old?', ['Yes', 'No'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
        session.userData.q9 = results.response.entity;
        builder.Prompts.choice(session, 'How does your attic look, pick one of the asnwers!', ['Fully insulated', 'Partially Insulated', 'No Insulation'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
        session.userData.q10 = results.response.entity;
        builder.Prompts.choice(session, 'What type of thermostat do you have in your home?', ['Standard', 'Smart'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
        session.userData.q11 = results.response.entity;
		builder.Prompts.choice(session, 'What type of heating system do you have in your home?', ['Gas powered central heating', 'Electric powered central heating', 'Wood Fired in home', 'None'],{listStyle: builder.ListStyle.button});
    },
	function (session, results) {
       var v_q12 =  results.response.entity;
		if(results.response.entity!="None" && results.response.entity!="none"){
			builder.Prompts.choice(session, 'How old is your heating systing?', ['0-5 years', '5-10 Years', '10 years or older'],{listStyle: builder.ListStyle.button});
			heatingSystem_age = "true";
		}else{
			builder.Prompts.choice(session, 'What type of cooling system do you have in your home?', ['Electric powered central cooling', 'Individual room', 'None'],{listStyle: builder.ListStyle.button});
			heatingSystem_age = "false";
		}
        
    },
	function (session, results) {
 		if(heatingSystem_age=="true"){
			session.userData.q13 = results.response.entity;
			builder.Prompts.choice(session, 'What type of cooling system do you have in your home?', ['Electric powered central cooling', 'Individual room', 'None'],{listStyle: builder.ListStyle.button});
			coolingSystem = "true";
		}else{
			session.userData.q13 = "";
			question14 = session.userData.q14 = results.response.entity;
			if(question14!="None" && question14!="none"){
				builder.Prompts.choice(session, 'How old is your cooling systing?', ['0-5 years', '5-10 Years', '10 years or older'],{listStyle: builder.ListStyle.button});
				coolingSystem = "true";
			}else{
				builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom'],{listStyle: builder.ListStyle.button});
				coolingSystem = "false";
			}
		}
    },
	function (session, results) {
		if(heatingSystem_age=="true"){
			question14 = session.userData.q14 = results.response.entity;
			if(results.response.entity!="None" && results.response.entity!="none"){
				builder.Prompts.choice(session, 'How old is your cooling systing?', ['0-5 years', '5-10 Years', '10 years or older'],{listStyle: builder.ListStyle.button});
				coolingSystem = "true";
			}else{
				builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom'],{listStyle: builder.ListStyle.button});
				coolingSystem = "false";
			}
		}else{
			question14 = "";
			question15 = session.userData.q15 =results.response.entity;
			builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom'],{listStyle: builder.ListStyle.button});
			coolingSystem = "false";
		}
    },
	function (session, results) {
		if(heatingSystem_age=="true"){
			question15 = session.userData.q15 = results.response.entity;
			if(question14!="None" && question14!="none"){
				question15 = session.userData.q15 = results.response.entity;
				builder.Prompts.choice(session, 'What type of refrigerator do you have in your home?', ['Side-by side', 'Freezer on top', 'Freezer on bottom'],{listStyle: builder.ListStyle.button});
			}else{
				session.userData.q16 = results.response.entity;
				builder.Prompts.choice(session, 'How old is your refrigerator?',['0-5 years', '5-10 Years', '10 years or older'],{listStyle: builder.ListStyle.button});
			}
		}else{
			session.userData.q16 = results.response.entity;
			builder.Prompts.choice(session, 'How old is your refrigerator?',['0-5 years', '5-10 Years', '10 years or older'],{listStyle: builder.ListStyle.button});
		}
        
		
    },function (session, results) {
        
		if(heatingSystem_age=="true"){
			
			if(question14!="None" && question14!="none"){
				session.userData.q16 = results.response.entity;
				builder.Prompts.choice(session, 'How old is your refrigerator?',['0-5 years', '5-10 Years', '10 years or older'],{listStyle: builder.ListStyle.button});
			}else{
				session.userData.q17 = results.response.entity;
				builder.Prompts.choice(session, 'What type of water heater do you have in your home?', ['Gas powered tank', 'Electric powered tank', 'Tankless system'],{listStyle: builder.ListStyle.button});
			}
		}else{
			session.userData.q17 = results.response.entity;
			builder.Prompts.choice(session, 'What type of water heater do you have in your home?', ['Gas powered tank', 'Electric powered tank', 'Tankless system'],{listStyle: builder.ListStyle.button});
			
		}
        
		
    },
	function (session, results) {
        
		if(heatingSystem_age=="true"){
			
			if(question14!="None" && question14!="none"){
				session.userData.q17 = results.response.entity;
				builder.Prompts.choice(session, 'What type of water heater do you have in your home?', ['Gas powered tank', 'Electric powered tank', 'Tankless system'],{listStyle: builder.ListStyle.button});
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

bot.on('conversationUpdate', function (message) {
	if(session_start==0){ 
		session_start=1;
		bot.send(new builder.Message().address(message.address).text('Hello, I am Al, the home assessment bot, my goal is to show you how healthy is your home.  This assessment will only take a few minutes and at the end you will receive both a health and efficiency rating for your home.  The home is a system and our goal is to educate our residents, renters and owners, on ways you can increase the air quality of your home along with reducing energy costs.'));
		bot.send(new builder.Message().address(message.address).addAttachment({
			contentUrl: 'http://www.verbinden.in/dont-delete/thor.png',
			contentType: 'image/png',
			name: 'BotFrameworkOverview.png'
		}));
	}
});


// Azure DocumentDb State Store
var docDbClient = new azure.DocumentDbClient({
	/*
    host: process.env.DOCUMENT_DB_HOST,
    masterKey: process.env.DOCUMENT_DB_MASTER_KEY,
    database: process.env.DOCUMENT_DB_DATABASE,
    collection: process.env.DOCUMENT_DB_COLLECTION
	*/
	host: 'https://5253.documents.azure.com:443/', 
    masterKey: 'sn5KXUflECwKEzoQdn59gcTm1biEJNnDepA1WeXRXJovmbTVsqccLX3LMc9EgBZdzFUkDW6vk59qRz12ClH5wg==', 
    database: 'botdocdb',   
    collection: 'botdata'
});
var botStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

// Set Custom Store
bot.set('storage', botStorage);

// Enable Conversation Data persistence
bot.set('persistConversationData', true);
bot.on('conversationUpdate', function (message) {
	if(session_start==0){ 
		session_start=1;
		bot.send(new builder.Message().address(message.address).addAttachment({
			contentUrl: 'http://www.verbinden.in/dont-delete/thor.png',
			contentType: 'image/png',
			name: 'BotFrameworkOverview.png'
		}));
		bot.send(new builder.Message().address(message.address).text('Hello, I am Al, the home assessment bot, my goal is to show you how healthy is your home.  This assessment will only take a few minutes and at the end you will receive both a health and efficiency rating for your home.  The home is a system and our goal is to educate our residents, renters and owners, on ways you can increase the air quality of your home along with reducing energy costs.'));
		
	}
});

