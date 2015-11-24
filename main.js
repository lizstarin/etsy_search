$(function() {

	var data = {};

	$('.submit').click(function(e) {
	   	e.preventDefault();

		var keywords = $('#search-form-input').val().split(/\s+/);
		var url = buildQuery(keywords);

		submitQuery(url);
		$('#results').empty();
		$('#spinner').toggle();
	});

	$('#overlay').add('#lightbox-close').click(function() {
		toggleLightbox();
	});

	$(document).keyup(function(e) {
		var lightbox = $('#lightbox');

		if (e.keyCode == 27 && lightbox.css('display') === 'block') {
			toggleLightbox();
		}
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
		listings.forEach(function(listing, i) {
			var template = '<div class="listing" data-id=' + i + '><div class="listing-image"><img src="' + listing.Images[0].url_570xN + '"></div><div class="listing-title">' + listing.title + '</div></div>'
			$('#results').append(template);
			data[i] = listing;
		})

		$('.listing').click(function() {
			toggleLightbox(this);
		});
	};

	var toggleLightbox = function(target) {
		$('#lightbox').toggle();
		$('#overlay').toggle();

		if ($('#lightbox').css('display') === 'block') {
			var listing = data[$(target).attr('data-id')];
			$('#lightbox-content').append(listing.title);
		} else {
			$('#lightbox-content').empty();
		}
	};
	
})

