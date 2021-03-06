"use strict"
$(document).ready(function() {
	initEaseWords();
	$(".circle").on("click", function() {
		easeWords();
	});
});

function initEaseWords() {
	var es = $(".ease-content");
	for(var i = 0; i < es.length; i++) {
		var eps = $(es[i]).children("p");
		for(var j = 0; j < eps.length; j++) {
			var p = $(eps[j]).text();
			var ph = "";
			for(var k = 0; k < p.length; k ++) {
				var ph = ph + '<span class="ease-word">' + p[k] + '</span>';
			}
			$(eps[j]).html(ph);
		}
	}
	es.css("opacity", "1");
}

var ws;
var w;
var di;
function easeWords() {
	ws = $(".ease-content .ease-word");
	w = 0;
	di = setInterval(function(){
		if(w < ws.length) {
			$(ws[w]).addClass("word-easing");
			w++;
		} else {
			clearInterval(di);
		}
	}, 200);
}

function clearEase($w) {
	$w.css("animation", "none");
}