// home.js

$(function() {
    var $feature = $('#carousel'),
        $recentNews = $('#recentNews')

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
