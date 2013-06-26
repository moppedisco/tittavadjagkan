jQuery(function ($) {
	$('[data-script]').Instantiate();	

	// check which CSS media querie is being applied	
	var currentSize = "desktop",
		clone,
		stepIndex = 0,
		steps = new Array("108%","215%","323%"),
		step = 0;

	/*$(window).resize(function() {

		var size = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
			
		size = size.replace(/"/g, "");
		size = size.replace(/'/g, "");

		if (size != currentSize) {
			if (size == 'desktop') {
				currentSize = 'desktop';
			}
			if (size == 'mobile') {
				currentSize = 'mobile';
				window.mySwipe = new Swipe(document.getElementById('yacine'));						
			}
		}
	}).resize();*/

});

/* Auto Instantiate */
(function($) {
	$.fn.Instantiate = function(settings) {
		this.each(function() { 

			var $self = $(this),
			$script = $self.attr('data-script');

			if ($self[$script])
			$self[$script]();
		});
	}
})(jQuery);

/* loadAjax */
(function($) {
	$.fn.loadAjax = function(settings) {

		this.each(function(index) { 

			var $self = $(this),
				$dataUrl = $self.attr('data-url'),
				_template = $self.attr("data-target"),
				_target = $self.attr("id");
				
				$self.addClass("loading");

				$.getJSON($dataUrl, function(data) {

					$.each(data, function(key,item){
						if(item){
							var template = $('#'+_template).text(),
								_html = "";
							console.log(item);
							_html += Mustache.to_html(template, item);
							$('#'+_target).append(_html);
						}
					})
				}).complete(function() { 
					$self.removeClass("loading");
				});;
		});

		return this;
	}
})(jQuery); 

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
	ytplayer = document.getElementById("ytPlayer");
	ytplayer.addEventListener("onError", "onPlayerError");
}

var youtubePlayer = {
	loadPlayer: function (videoID) {
        var params = { allowScriptAccess: "always" };
        var atts = { id: "ytPlayer" };
        swfobject.embedSWF("http://www.youtube.com/v/" + videoID + 
                           "?version=3&enablejsapi=1&playerapiid=player1&autohide=1", 
                           "youtubeEmbed", "480", "295", "9", null, null, params, atts);
	}, // end loadPlayer	
	loadVideo: function(videoID) {
        if(ytplayer) {
          ytplayer.loadVideoById(videoID);
        }	
	}, // end loadVideo	
	bindPlay: function(element) {
		console.log(element);

	}
};