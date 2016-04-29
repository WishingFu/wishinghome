"use strict"
$(document).ready(function() {
	$("body").dynamicPages({
		dpages: ["article", "shake"]
	});
	$("#page_1").inpageScroll("init", {
		onpageend : function() {
			// $.preventPageScroll();
			// $.scrollToNext();
		}
	})
	$("#page_2").inpageScroll("init", {
		beforepage : function() {
			console.log("before page_2");
		},
		onpagetop : function() {
			console.log("page_2 top");
		},
		onpageend : function() {
			console.log("page_2 end");
			// $.preventPageScroll();
			$.ajax({
				url : "../hf/effect/article",
				type: "get",
				success: function(data) {
					// $("#page_2").append(data);
					// $("#page_2").inpageScroll("resize");
				}
			})
		},
		afterpage : function() {
			console.log("after page_2");
		}
	})
	$(".article").change(function(e) {
		console.log($("input[name='testFile']"));
	})
});