/*global location,history*/
// home.js

$(function() {
    var $feature = $('#carousel'),
        $recentNews = $('#recentNews'),
        $newsCaption = $('#newsCaption').find('div'),
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
        fade : true,
        slide : '.ss-slide-small',
        onBeforeChange : function(Slick, current, upcoming) {
            $newsCaption
                .animate({ 'opacity' : 0 }, function() {
                    var nextCaption = Slick.$slides.eq(upcoming).find('img').attr('alt')
                    $(this).html(nextCaption)
                })
                .animate({ 'opacity' : 1 })
        },
        onInit : function() {
            $('#carousel, #recentContainer').addClass('loaded')
            this.$dots.prependTo('#recentContainer').addClass('loaded')
        }
    })

    if ( !!$('#scrollbox').length ) {
        $(window).on('resize', _.debounce((function a() {
            var scrollbox = $('#scrollbox').get(0),
                contentHeight = scrollbox.scrollHeight,
                boxHeight = scrollbox.clientHeight

            scrollbox.classList.toggle('is-not-scrolling', contentHeight <= boxHeight)

            // iife to run on load
            // return self to debounce
            return a
        })(), 100))
    }
})
