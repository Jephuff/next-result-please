var links =[];
var index = -1;
chrome.runtime.onMessage.addListener(function (msg){
	var json = JSON.parse(msg); 
	links = json.links;
	index = json.current;
	chrome.commands.onCommand.addListener(
		function (links, index){
			return function(command) {
				if(command === 'next_link'){
					if(index >= 0 && index < links.length-1){
						chrome.tabs.onUpdated.addListener(function (links, index){
							return function (tab){
								window.open(links[index], tab);
							}
						}(links, index++));
					}
				} else if(command === 'previous_link'){
					if(index > 0){
						chrome.tabs.onUpdated.addListener(function (links, index){
							return function (tab){
								window.open(links[index], tab);
							}
						}(links, index--));
					}
				}
			};
		}(links, index)
	);
});


