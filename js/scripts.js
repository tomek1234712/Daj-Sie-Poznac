//Javascript Doucment

$(document).ready(function(){
    
    
    $('nav .menu .sub-menu a').each(function(){
        var $this = $(this);
        $this.parent().addClass($this.attr('title'));
        if($this.attr('title') == 'all'){
            $this.append($('<span/>'));
        }
    });
    // reset css in menu bottom
    $('nav .menu .sub-menu a').last().css('border-bottom', '0');
    
    
    $('#home .comments .container section').first().addClass('first');
    $('#home .comments .container section').last().addClass('last');
  
    
    $('#header.home-slider .slides').carouFredSel({
        scroll: { 
            items: 1,
            fx: 'fade'
        },
        pagination: {
            container: $('#header.home-slider .pagination ul'),
            anchorBuilder: function(nr){
                return '<li><a href="#">'+nr+'</a></li>';
            }
        }
    });
    
	//inspirations
    $('#home .inspirations .slider .slides-container .items').carouFredSel({
        prev: $('#home .inspirations .slider .prev'),
        next: $('#home .inspirations .slider .next'),
        scroll: { 
            items: 1
        }
    });
	
    // podstrona archiwum przepisów
    $('#header.recipes-archive .slides').carouFredSel({
        scroll: { 
            items: 1,
            fx: 'fade'
        }
    });
    
    
    
    $('#home .boxes .box').mouseover(function(){
        var $this = $(this);
        
        if($this.find('.step2').size() > 0){
            $this.find('.step1').hide();
            $this.find('.step2').show();
        }
    });
    
    $('#home .boxes .box').mouseout(function(){
       var $this = $(this);
       
       if($this.find('.step2').size() > 0){
            $this.find('.step2').hide();
            $this.find('.step1').show();
        }
    });
    
    //archiwum przepisów
    $('#recipes .left .entry:nth-child(odd)').css('border-right', '1px dashed #cecece');
    $('#entry .right .ingredients ul li:nth-child(odd)').css('background-color', '#181818');
        
    //strzałki animacja inspiracje
    var $sliderNav = $('#home .inspirations .slider > a');
    
    $sliderNav.each(function(){
        var $this = $(this);
        
        if($this.hasClass('prev')){
            var cleft = parseInt($this.css('left'));
            $this.css('left', (cleft+2));
            var onOver = {left: cleft+'px'};
            var onOut = {left: (cleft+2)+'px'};
        }else{
            var cright = parseInt($this.css('right'));
            $this.css('right', (cright+2));
            var onOver = {right: cright+'px'};
            var onOut = {right: (cright+2)+'px'};
        }
        
        $this.hover(function(){
            $this.animate(onOver, 100);
        }, function(){
            $this.animate(onOut, 100);
        });
    });
   
    // podstrona archiwum przepisów zmiana checkboxów
    $('form.transform').jqTransform();
   
    // dwa ostatnie przepisy w archiwum dostają klasę last
    $('#recipes .entry')
        .last().addClass('last')
        .prev().addClass('last');

	//mapa
    var $headerMapCont = $('#header .map');
    if($headerMapCont.size() > 0){
	
        //przykładowy łańcuch wygenerowany jak z PHP z bazy danych
		var restaurantsList = [
		 {
		  "city":"Krak\u00f3w",
		  "restaurantsCount":"2"
		 },
		 {
		  "city":"Warszawa",
		  "restaurantsCount":"1"
		 },
		 {
		  "city":"Wroc\u0142aw",
		  "restaurantsCount":"1"
		  }
		];   

		//omijam i wracam po 
        function initHeaderMap(){
			//
            function createHeaderMap($cnt, lat, lng){
                var opts = {
                    center: new google.maps.LatLng(lat, lng),
                    zoom: 8,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
				// tworzymy mape do zm hm
                var headerMap = new google.maps.Map($cnt.get(0), opts);
                
                if(restaurantsList){
                    for(var entry in restaurantsList){
                        
                        var geocoder = new google.maps.Geocoder();
						
                        geocoder.geocode({
                            address: restaurantsList[entry].city
                        }, function(results, status){
							// jeśli status jest ok
                            if(status == google.maps.GeocoderStatus.OK){
								//rysujemy na  mapce kółeczko
                                var options = {
                                    strokeColor: "#000",
                                    strokeOpacity: 1,
                                    strokeWeight: 2,
                                    fillColor: "#f55b0c",
                                    fillOpacity: 1,
                                    center: results[0].geometry.location,
                                    map: headerMap,
                                    radius: restaurantsList[entry].restaurantsCount * 3500
                                }

                                new google.maps.Circle(options);

                            }else{
                                alert("Geocode was not successful for the following reason: " + status);
                            }

                        });
                    }
                }
            }
        
			//prosimy o lokalizację
            if(navigator.geolocation) {
				//f zwrotna uruchomiona po wyrażeniu zgody na podanie położenia, position - aktualna pozyucja
                var success = function(position) {
					//tworzy mapkę headerMapCont leci jako arg do f header map
                    createHeaderMap($headerMapCont, position.coords.latitude, position.coords.longitude)
                };

                var error = function() { 
                    createHeaderMap($headerMapCont, 52.259, 21.020); //warsaw coords
                }

                navigator.geolocation.getCurrentPosition(success, error);

            }else {
				// jeśli przegladarka nie obsługuje geo
                createHeaderMap($headerMapCont, 52.259, 21.020)
            }
        }
        //po załadowaniu dtrzewa dok i mapki
        google.maps.event.addDomListener(window, 'load', initHeaderMap);
    }
    
    // druga mapa dla szczegółów restauracji
    var $rightMapCont = $('.right .map');
    if($rightMapCont.size() > 0){
        
        var address = $.trim($('input#gmap-address').val());
        
        var geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({
            address: address
        }, function(results, status){
            
            if(status == google.maps.GeocoderStatus.OK){
                
                var mapOptions = { 
                    center: results[0].geometry.location, 
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP 
                };

                var rightMap = new google.maps.Map($rightMapCont.get(0), mapOptions);
                
                new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: rightMap
                });
                
            }else{
                alert("Geocode was not successful for the following reason: " + status);
            }
            
        });
    }
    
});