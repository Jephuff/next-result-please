var links =[];
var index = -1;
var tab;
chrome.runtime.onMessage.addListener(function (msg){
	var json = JSON.parse(msg);
	links = json.links;
	index = json.current;
	tab = tab;

	chrome.commands.onCommand.addListener(
		function (links, index){
			return function(command) {
				if(command === 'next_link'){
					if(index >= 0 && index < links.length-1){
						chrome.tabs.getSelected(null, function(tab){
							chrome.tabs.update(tab.id, {url: links[index++]});
						});
					}
				} else if(command === 'previous_link'){
					if(index > 0){
						chrome.tabs.getSelected(null, function(tab){
							chrome.tabs.update(tab.id, {url: links[index--]});
						});
					}
				}
			};
		}(links, index)
	);
});