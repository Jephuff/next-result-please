document.body.onclick = function (event) {
	var i, current = 0, links = [], results = document.querySelectorAll('.srg h3 a');
	for(i = 0; i < results.length; i++){
		if(event.toElement.href === results[i].href){
			current = i;
		}
		links.push(results[i].href);
	}
	chrome.runtime.sendMessage(JSON.stringify({'current': current, 'links': links}));
};