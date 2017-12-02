$(document).ready(function() {
	$(".price__header").click(function(){
		$(this).closest(".price__tarif")
			   .find(".price__list")
			   .slideToggle(300);
	});

	$(".project__link").fancybox();

	$(".price__button").fancybox();

	$(".promo__timer").TimeCircles({
		circle_bg_color: "#d2c5bd",
		fg_width: 0.05,
		time: { 
			Days: {
				show: true,
				text: "Дней",
				color: "#ffde00"
			},
			Hours: {
				show: true,
				text: "Часов",
				color: "#ffde00"
			},
			Minutes: {
				show: true,
				text: "Минут",
				color: "#ffde00"
			},
			Seconds: {
				show: true,
				text: "Секунд",
				color: "#ffde00"
			}
		}
	});
}( window, document ) );