var pager = function (){
	this.links = null;
	this.index = null;
	this.listening = false;

	chrome.runtime.onMessage.addListener(function (msg){
		var json = JSON.parse(msg);
		this.links = json.links;
		this.index = json.current;
		if(!this.listening){
			chrome.commands.onCommand.addListener(onCommand.bind(this));
			this.listening = true;
		}
	}.bind(this));
}();

function onCommand(command) {
	if(command === 'next_link'){
		if(this.index >= 0 && this.index < this.links.length-1){
			chrome.tabs.getSelected(null, function(tab){
				chrome.tabs.update(tab.id, {url: this.links[++this.index]});
			}.bind(this));
		}
	} else if(command === 'previous_link'){
		if(this.index > 0){
			chrome.tabs.getSelected(null, function(tab){
				chrome.tabs.update(tab.id, {url: this.links[--this.index]});
			}.bind(this));
		}
	}
}
