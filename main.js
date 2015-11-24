$(function() {

	$('.submit').click(function(e) {
	   	e.preventDefault();

		var keywords = $('#search-form-input').val().split(/\s+/);
		var url = buildQuery(keywords);

		submitQuery(url);
		$('#results').empty();
		$('#spinner').toggle();
	});

	var buildQuery = function(keywords) {
		var baseUrl = 'https://openapi.etsy.com/v2/listings/active.js?&includes=Images:1&keywords=';
		var apiKey = configVars.apiKey;

		return baseUrl + keywords.join('+') + apiKey;
	};

	var submitQuery = function(url) {
		$.ajax({
			url: url,
			dataType: 'jsonp',
			callback: '?',
			success: function(response) {
				$('#spinner').toggle();
				displayListings(response.results);
			},
			error: function(e) {
				
			}
		});
	};

	var displayListings = function(listings) {
		listings.forEach(function(listing) {
			var template = '<div class="listing"><a href=' + listing.url + '><div class="listing-image"><img src="' + listing.Images[0].url_570xN + '"></div><div class="listing-title">' + listing.title + '</div></a></div>'
			$('#results').append(template);
		})
	};
	
})

