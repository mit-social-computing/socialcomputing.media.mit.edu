/*global location,history*/
// home.js

$(function() {
    var $feature = $('#carousel'),
        $recentNews = $('#recentNews'),
        path = location.pathname.slice(1).split('/')

    if ( !path[0] ) {
        //history.replaceState({},'','about')
    }

    $feature.slick({
        autoplay: true,
        pauseOnHover : false,
        arrows : false,
        fade : true,
        draggable: false,
        responsive : [
        {
            breakpoint: 507,
            settings : {
                fade : false
            }
        }
        ]
    })

    $recentNews.slick({
        arrows : false,
        dots : true,
        draggable: false,
        slide : '.ss-slide-small',
        onInit : function() {
            this.$dots.prependTo('#recentContainer')
        }
    })
})
