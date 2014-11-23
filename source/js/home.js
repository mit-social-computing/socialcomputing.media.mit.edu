/*global location,history*/
// home.js

$(function() {
    var $feature = $('#carousel'),
        $recentNews = $('#recentNews'),
        path = location.pathname.slice(1).split('/')

    if ( !path[0] ) {
        history.replaceState({},'','about')
    }

    $feature.slick({
        arrows : false,
        dots: true,
        fade : true,
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
        slide : '.ss-slide-small'
    })
})
