$(function() {
	$.ajax({
		url: "data/numbers",
		type: "POST",
		dataType: "json",
		success: function(data) {
			console.log(data);
		},
	});

	$(".content").mouseover(function() {
		$(this).css("transform", "rotate(30deg)");
	});
	$(".content").mouseout(function() {
		$(this).css("transform", "rotate(0deg)");
	});
});

