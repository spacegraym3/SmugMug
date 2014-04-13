var pages = [];
pages[0] = 'page_1';
pages[1] = 'page_2';
pages[2] = 'page_3';
pages[3] = 'page_4';
pages[4] = 'page_5';
pages[5] = 'page_6';
pages[6] = 'page_7';
pages[7] = 'page_8';
pages[8] = 'page_9';
pages[9] = 'page_10';
pages[10] = 'page_11';
pages[11] = 'page_12';
pages[12] = 'page_13';
pages[13] = 'page_14';
pages[14] = 'page_15';
pages[15] = 'page_16';
pages[16] = 'page_17';

var currentPage = pages[0];

function setup() {
	for(var n=0; n<pages.length; n++) {
		var ele = document.getElementById(pages[n]);
		ele.style.display = "none";
	}
	document.getElementById(pages[0]).style.display = 'block';
}

function handleRollover(ele) {
	var eSource = ele.src.match(/on/);
	if(eSource === null) {
		ele.src = ele.src.replace(/off/, 'on');
	} else {
		ele.src = ele.src.replace(/on/, 'off');
	}
}

function handleP(e, x){
	if(e.parentNode.className === "clickText") {
		var handle = document.getElementById('audioFile');
		if(e.parentNode.id !== undefined) {
		    handle.src = "audio/" + e.parentNode.id + ".mp3";
	    } else {
			handle.src = "";
	    }
		var setX = "20px";
		if(x > 512) {
			setX = "532px";
		}
		var content = e.parentNode.innerHTML;
		var box = document.getElementById('text_box');
		    box.style.left    = setX;
		    box.style.zIndex  = 10000;
		    box.style.opacity = 1;
		var bContent = document.getElementById('box_content');
			bContent.innerHTML = content;
	}
}

function closeBox() {
	var box = document.getElementById('text_box');
	    box.style.opacity = 0;
	    box.style.zIndex  = 1;
	
	    document.getElementById('audioFile').pause();
	
	/*
	
	var btn = document.getElementById('btn_audio');
	
	if(btn.src.match(/pause/)) {
		btn.src = btn.src.replace(/pause/, 'play');
	}*/
}

function handleHotspot(ele) {
	var kids = ele.childNodes;
	
	for(var n=0; n<kids.length; n++) {
		if(kids[n].tagName === "IMG") {
			var newSrc = kids[n].getAttribute('swap');
			kids[n].setAttribute('swap', kids[n].getAttribute('src'));
			kids[n].setAttribute('src', newSrc);
			break;
		} else {
			handleHotspot(kids[n]);
		}
    }
}

function handleAudio() {
	var btn = document.getElementById('btn_audio');
	var bSource = btn.src;
	var iName = bSource.match(/play/);
	if(iName === null) {
		btn.src = bSource.replace(/pause/, 'play');
	} else {
		btn.src = bSource.replace(/play/, 'pause');
	}
}

function catchevent(event) {
	eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
	eventtype=event.type;
	status=eventSrcID+' has received a '+eventtype+' event.';
	alert(eventSrcID);
}

function interceptTap(e) {
	if (!e) e = window.event;
	var posx = e.pageX;
	var posy = e.pageY;
	
	//Check to see if we are something besides a page turn
	if(e.srcElement.tagName === "P") {
		handleP(e.srcElement, posx);
	} else if(e.target.id === "btn_close") {
		closeBox();
	} else if(e.target.id === "btnRead") {
		$('#book_container').css('display', 'block');
		$('#book_container').css('zIndex', '1000');
		$('#game_container').css('display', 'none');
		$('#game_container').css('zIndex', '1');
    } else if(e.target.id === "btnPlay") {
		
		closeBox();
		
		$('#book_container').css('display', 'none');
		$('#book_container').css('zIndex', '1');
		$('#game_container').css('display', 'block');
		$('#game_container').css('zIndex', '1000');
    } else if(e.target.className === "hotspot") {
		handleHotspot(e.target.parentNode);
    } else if(posy < 122 || posy > 650) {
		return;
	} else {
	    //first make sure our popup is closed
	    closeBox();
	    if((posx > 0) && (posx < 513)) {
		    pageTurn(-1);
		} else if((posx > 512) && (posx < 1024)) {
		    pageTurn(+1);
	    }
		return;
	}
}

function pageTurn(n) {
	for(var i=0; i<pages.length; i++) {
		var ele = document.getElementById(pages[i]);
		if(ele.style.display === "block") {
			var num = i + n;
			if(num > -1 && num < pages.length) {
				ele.style.display = "none";
				var nextEle = document.getElementById(pages[num]);
				    nextEle.style.display = "block";
				currentPage = nextEle;
				break;
			}
		}
	}
}

$(document).bind("mobileinit", function(){
     $(document).bind("tap",function(){
	     interceptTap(event);
		 event.cancelBubble();
	 });
});

