// global.js

$(function() {

    // scrollbar check
    function scrollbarGlobalDetect() {
        var contentHeight = $('#content').children()
                .map(function() { return $(this).outerHeight() })
                .get()
                .reduce(function(a,b) { return a + b }),
            pageHeight = $('.scrollbar').height()

        $('body').toggleClass('is-not-scrolling', contentHeight < pageHeight)
    }

    if ( !!$('.scrollbar').length ) {
        $(window).on( 'resize', _.debounce(scrollbarGlobalDetect, 100) )
        scrollbarGlobalDetect()
    }
})
