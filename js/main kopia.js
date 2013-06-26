(function( window ) {

	var transEventNames = {
		'WebkitTransform' : '-webkit-transform',
		'MozTransform' : '-moz-transform',
		'OTransform' : '-o-transform',
		'msTransform' : '-ms-transform',
		'transform' : 'transform'
	},    	
	transEventName = transEventNames[ Modernizr.prefixed( 'transform' ) ],
	supportTransitions = Modernizr.csstransitions;

	function initialize() {

		YB.loadTwitter.initialize();
		YB.loadYoutube.initialize();
		YB.loadSpotify.initialize();
		YB.loadTumblr.initialize();
		YB.loadSvpply.initialize();
	
		if(Modernizr.touch){
			
			//YB.carousel.initialize($(".introCarousel"));	
			//YB.carouselWork.initialize($(".workCarousel"));	
		}
	}
	
	// Return the public API for this class
	window.YB = {
		initialize: initialize,
		transEventName: transEventName
	};
	
}(window)) // Self execute

YB.carousel = (function(window){

	var target,
		value = [0,215,430],
		clicks = 0,
		buttons = '<div class="carouselButtons"><img src="img/prev-button.png" class="prev" /><img src="img/next-button.png" class="next" /></div>';

	function initialize(carouselWrapper){
		target = carouselWrapper;
		total = target.find(".carouselItem").length;
		target.find(".carouselItem").wrapInner("<div class='inner-wrap' />");
		checkPosition(target.find(".carouselItem"),0);
		target.find('header').append(buttons);
		bindButton();
	}

	function checkPosition(carouselItem,clicks){
		carouselItem.each(function(index){
			$(this).removeClass("old upcoming active future");
			if(index === clicks){
				$(this).addClass("active");
			} else if(index-clicks === 1){
				$(this).addClass("upcoming");
			} else if(index-clicks >= 2) {
				$(this).addClass("future");
			} else {
				$(this).addClass("old");
			}
		})
	}

	function moveToNextTab(){
		target.find(".carouselItem .inner-wrap").css(YB.transEventName,'translate('+-value[clicks]+'%, 0)');
		target.find(".carouselItem .inner-wrap").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			checkPosition(target.find(".carouselItem"),clicks);
		});		
	}

	function moveToPrevTab(){
		target.find(".carouselItem .inner-wrap").css(YB.transEventName,'translate('+-value[clicks]+'%, 0)');
		target.find(".carouselItem .inner-wrap").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			checkPosition(target.find(".carouselItem"),clicks);
		});	
	}

	function bindButton(){
		target.find(".next").click(function(){
			if(clicks%total != 2){
				clicks++;
				if(clicks < total){
					moveToNextTab();
				}
			} else {
				console.log("last one");
			}
		})
		target.find(".prev").click(function(){
			if(clicks != 0){
				clicks--;
				if(clicks < total){
					moveToPrevTab();
				}
			} else {
				console.log("first one");
			}
		})			
	}

	return {
		initialize: initialize,
		checkPosition: checkPosition
	}
})(window)

YB.carouselWork = (function(window){

	var target,
		value = [0,107,215,322],
		clicks = 0,
		buttons = '<div class="carouselButtons"><img src="img/prev-button.png" class="prev" /><img src="img/next-button.png" class="next" /></div>';

	function initialize(carouselWrapper){
		target = carouselWrapper;
		total = target.find(".carouselItem").length;
		target.find(".carouselItem").wrapInner("<div class='inner-wrap' />");
		checkPosition(target.find(".carouselItem"),0);
		target.find('header').append(buttons);
		bindButton();
	}

	function checkPosition(carouselItem,clicks){
		carouselItem.each(function(index){
			$(this).removeClass("old upcoming active future");
			if(index === clicks){
				$(this).addClass("active");
			} else if(index-clicks === 1){
				$(this).addClass("upcoming");
			} else if(index-clicks >= 2) {
				$(this).addClass("future");
			} else {
				$(this).addClass("old");
			}
		})
	}

	function moveToNextTab(){
		target.find(".carouselItem .inner-wrap").css('-webkit-transform','translate('+-value[clicks]+'%, 0)');
		target.find(".carouselItem .inner-wrap").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			checkPosition(target.find(".carouselItem"),clicks);
		});		}

	function moveToPrevTab(){
		target.find(".carouselItem .inner-wrap").css('-webkit-transform','translate('+-value[clicks]+'%, 0)');
		target.find(".carouselItem .inner-wrap").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			checkPosition(target.find(".carouselItem"),clicks);
		});		}

	function bindButton(){
		target.find(".next").click(function(){
			if(clicks%total != 3){
				clicks++;
				if(clicks < total){
					moveToNextTab();
				}
			} else {
				console.log("last one");
			}
		})
		target.find(".prev").click(function(){
			if(clicks != 0){
				clicks--;
				if(clicks < total){
					moveToPrevTab();
				}
			} else {
				console.log("first one");
			}
		})			
	}

	return {
		initialize: initialize,
		checkPosition: checkPosition
	}
})(window)

YB.loadTwitter = (function(window){

	var _template = '<br/><a target="_blank" href="https://twitter.com/moppedisco/status/{{id_str}}">{{text}}</a><br/>',
		_index = 3,
		_url = 'http://api.twitter.com/1/statuses/user_timeline/moppedisco.json?&callback=?&count='+_index,
		_target = $("#twitterSection"),
		returnedJSONdata;

	function initialize(){
		$.getJSON(_url).success(function(response) {
			returnedJSONdata = response;
			parseData();
		}).error(function(){
			errorHandler();
		});
	}

	function parseData(){
		$.each(returnedJSONdata, function(key,item){
			_html = Mustache.to_html(_template, item);
			_target.append(_html);
		})
	}

	function errorHandler(){
		console.log("TWITTER there was an error");
	}	

	// Return our public API
	return {
		initialize: initialize
	};	

})(window);

YB.loadYoutube = (function(window){

	var _template = '<li><span>{{video.title}}</span><a target="_blank" href="http://www.youtube.com/watch?v={{video.id}}" class="listHighlight">View</a></li>',
		_index = 9,
		_url = 'http://gdata.youtube.com/feeds/api/playlists/17706B6D47388B7D?alt=jsonc&v=2&orderby=published&max-results='+_index,
		_target = $("#youtubeSection"),
		returnedJSONdata;

	function initialize(){
		$.getJSON(_url).success(function(response) {
			returnedJSONdata = response['data']['items'];
			parseData();
		}).error(function(){
			errorHandler();
		});
	}

	function parseData(){
		$.each(returnedJSONdata, function(key,item){
			_html = Mustache.to_html(_template, item);
			_target.append(_html);
		})
	}

	function errorHandler(){
		console.log("YOUTUBE there was an error");
	}	

	// Return our public API
	return {
		initialize: initialize
	};

})(window);

YB.loadSpotify = (function(window){

	var _template = '{{#track}}<li><span class="artist">{{artist.name}} - <i>{{name}}</i></span><a target="_blank" href="{{url}}" class="listHighlight">{{playcount}} <small>plays</small></a></li>{{/track}}',
		_index = 9,
		_url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=moppedisco&api_key=751f646ff078929140ae0d72344c6a2f&period=7day&format=json&limit='+_index,
		_target = $("#spotifySection"),
		returnedJSONdata;

	function initialize(){
		$.getJSON(_url).success(function(response) {
			returnedJSONdata = response;
			parseData();
		}).error(function(){
			errorHandler();
		});
	}

	function parseData(){
		$.each(returnedJSONdata, function(key,item){
			_html = Mustache.to_html(_template, item);
			_target.append(_html);
		})
	}

	function errorHandler(){
		console.log("SPOTIFY there was an error");
	}	

	// Return our public API
	return {
		initialize: initialize
	};

})(window);

YB.loadTumblr = (function(window){

	var _template = '{{#photo-url-75}}<a href="{{url}}" target="_blank"><img src="{{photo-url-75}}" alt="{{photo-caption}}" /></a>{{/photo-url-75}}',
		_index = 20,
		_url = 'http://iamaltofctrl.tumblr.com/api/read/json?callback=?&num='+_index,
		_target = $("#tumblrSection"),
		$items = $("#tumblrSection a"),
		$overlay = $('.tumblrOverlay'),
		returnedJSONdata,
		$window = $(window),
		$body = $('BODY'),
		current = -1,
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},    	
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		supportTransitions = Modernizr.csstransitions,
		winsize = getWindowSize();		

	function initialize(){
		$.getJSON(_url).success(function(response) {
			returnedJSONdata = response['posts'];
			parseData();
			initEvents();
		}).error(function(){
			errorHandler();
		});
	}

	function initEvents(){
		
		var $item = $(this);

		$item.each(function(){
			$item.on('click',function(){
				$item.data( 'isExpanded', true );
				current = $item.index()
				/*var layoutProp = getItemLayoutProp( $item ),
					clipPropFirst = 'rect(' + layoutProp.top + 'px ' + ( layoutProp.left + layoutProp.width ) + 'px ' + ( layoutProp.top + layoutProp.height ) + 'px ' + layoutProp.left + 'px)',
					clipPropLast = 'rect(0px ' + winsize.width + 'px ' + winsize.height + 'px 0px)';

				/*$overlay.css( {
					clip : supportTransitions ? clipPropFirst : clipPropLast,
					opacity : 1,
					zIndex: 9999,
					pointerEvents : 'auto'
				});*/

			})
		})
	}

	function parseData(){
		$.each(returnedJSONdata, function(key,item){
			_html = Mustache.to_html(_template, item);
			_target.append(_html);
		})
	}

	function errorHandler(){
		console.log("TUMBLR there was an error");
	}	

	function getItemLayoutProp( $item ) {
		var scrollT = $window.scrollTop(),
			scrollL = $window.scrollLeft(),
			itemOffset = $item.offset();

		return {
			left : itemOffset.left - scrollL,
			top : itemOffset.top - scrollT,
			width : $item.outerWidth(),
			height : $item.outerHeight()
		};

	}

	function getWindowSize() {
		$body.css( 'overflow-y', 'hidden' );
		var w = $window.width(), h =  $window.height();
		if( current === -1 ) {
			$body.css( 'overflow-y', 'auto' );
		}
		return { width : w, height : h };
	}


	// Return our public API
	return {
		initialize: initialize
	};

})(window);

YB.loadSvpply = (function(window){

	var _template = '<li><a href="{{page_url}}" target="_blank"><img src="{{image}}" /></a></li>',
		_index = 3,
		_url = 'https://api.svpply.com/v1/users/moppedisco/wants/products.json?limit='+_index,
		_target = $("#svpplySection"),
		returnedJSONdata;

	function initialize(){
		$.ajax({
			url: _url,
			dataType: 'jsonp'
		}).success(function(response) {
			returnedJSONdata = response['response']['products'];
			parseData();
		}).error(function(){
			errorHandler();
		});
	}

	function parseData(){
		$.each(returnedJSONdata, function(key,item){
			_html = Mustache.to_html(_template, item);
			_target.append(_html);
		})
	}

	function errorHandler(){
		console.log("SVPPLY there was an error");
	}	

	// Return our public API
	return {
		initialize: initialize
	};

})(window);

