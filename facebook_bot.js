    function MessageHandler(context, event) {
	        context.console.log("test")
	        if(event.message.toLowerCase() == "hi") {
	            context.sendResponse("hello")
	        }
	        else if(event.message.toLowerCase() == "hello") {
	            context.sendResponse("Hey there " + event.senderobj.display + ". Do you prefer reading wired or techcrunch?");
	        }
	        else if((event.message == "wired") || (event.message == "techcrunch")) {
	            //setPreference(event.message);
	             context.simplehttp.makeGet('https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://www.' + event.message + '.com/feed/&num=1');
	        }
	        else {
	            context.sendResponse('No keyword found : '+event.message); 
	        }
	    }
	    
	    function setPreference (pref) {
	        context.simpledb.roomleveldata.publication = pref;
	        context.sendResponse("Looks like you prefer reading " + context.simpledb.roomleveldata.publication)
	    }
	    
	    /** Functions declared below are required **/
	    function EventHandler(context, event) {
	        if(! context.simpledb.botleveldata.numinstance)
	            context.simpledb.botleveldata.numinstance = 0;
	        numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
	        context.simpledb.botleveldata.numinstance = numinstances;
	        context.sendResponse("Thanks for adding me. You are:" + numinstances);
	    }
	
	    function HttpResponseHandler(context, event) {
	        // if(event.geturl === "http://ip-api.com/json")
	        //context.sendResponse(event.getresp);
	        
	        var respJson = JSON.parse(event.getresp);
	        var stories = respJson.responseData.feed.entries;
	        var resp = "";
	        
	        for (var i = 0; i<1; i++) {
	            resp = resp + stories[i].title + "\n" + stories[i].link + "\n";
	           
	        }
	        
	        resp = resp.replace("&nbsp", "");
	        context.sendResponse(resp);
	    }
	
	    function DbGetHandler(context, event) {
	        context.sendResponse("testdbput keyword was last get by:" + event.dbval);
	    }
	
	    function DbPutHandler(context, event) {
	        context.sendResponse("testdbput keyword was last put by:" + event.dbval);
	    }
	    
