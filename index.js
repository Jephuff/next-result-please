document.body.onclick = function (event) {
	console.log(event.toElement);
	var results = document.querySelectorAll('.srg h3 a');
	var links = [];
	var current = 0;

	for(var i = 0; i < results.length; i++){
		if(event.toElement.href === results[i].href){
			current = i;
		}
		links.push(results[i].href);
	}
	
	chrome.runtime.sendMessage(JSON.stringify({'current': current, 'links': links}));
};