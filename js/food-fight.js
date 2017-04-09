$(document).ready(function(){
    
    var $infoContent = $('#details .info .content');
    
    $('#details .info .content')
        .css({
            height: $('#details .info .content').height(),
            top: ($('#details .info .content').height()/2)*-1
        }); 
        
        
    var i = 3;
    var interval = setInterval(function(){
        
        $('#details .timer .right img').attr('src', 'img/counter_'+i+'.png');
        
        i--;
        
        if(i < 0){
            clearInterval(interval);
            $('#details .timer img').attr('src', 'img/counter_fist.png');
            runAnimation();
            
        }
        
    }, 1000);
    
    
    
    
    
    $('#details header').hide();
    var $header = $('#details header h2');
    $header.each(function(){
        var $this = $(this);
        var $span = $this.find('span');
        var spanWidth = $span.width();
        
        if($this.hasClass('left')){
            $span.css('left', spanWidth*-1);
        }else{
            $span.css('right', spanWidth*-1);
        }
        $span.css('opacity', 0);
    });
    
    
    $('.opponent').each(function(){
        
        var $this = $(this);
        
        var hideCss = {};
        if($this.hasClass('good')){
            hideCss = {
                header: {
                    top: '30px',
                    left: '30px'
                },
                details: {
                    right: '0px'
                }
            }
        }else{
           hideCss = {
                header: {
                    top: '30px',
                    right: '30px'
                },
                details: {
                    left: '0px'
                }
            } 
        }

        $this.find('.header').css(hideCss.header);

        $this.find('.details').css(hideCss.details);

        $this.find('img').hide();
        $this.find('p').hide();
        $this.find('ul').hide();

    });    
    
    
    $('#details .info, #details .tags').hide();
    
    
    
    function runAnimation(){

        //show header
        $('#details header').fadeIn('medium');
        
        var headerCount = 0;
        $header.each(function(){
            var $this = $(this);
            var $span = $this.find('span');
            var spanWidth = $span.width();
            var animOpts = {};

            if($this.hasClass('left')){
                animOpts = {right: '0px'};
            }else{
                animOpts = {left: '0px'};
            }
            animOpts.opacity = 1;
            
            $span.animate(animOpts, 'slow', function(){
                headerCount++;
                if(headerCount == 2){

                    $('.opponent').each(function(){

                        var $this = $(this);

                        var animOpts = {};
                        if($this.hasClass('good')){
                            animOpts = {
                                header: {
                                    top: '-30px',
                                    left: '-30px'
                                },
                                details: {
                                    right: '-70px'
                                }
                            }
                        }else{
                           animOpts = {
                                header: {
                                    top: '-30px',
                                    right: '-30px'
                                },
                                details: {
                                    left: '-70px'
                                }
                            } 
                        }

                        $this.find('.header').animate(animOpts.header, 'medium');

                        $this.find('.details').animate(animOpts.details, 'medium');

                        $this.find('.image div').fadeOut('medium');
                        $this.find('.image img').fadeIn('medium', function(){
                            $this.find('p').fadeIn('medium', function(){
                                $this.find('ul').slideDown('medium', function(){
                                    $('#details .info, #details .tags').delay(200).fadeIn('slow');
                                });
                            });

                        });
                    });

                }
            });
        });
        
        
    }
});