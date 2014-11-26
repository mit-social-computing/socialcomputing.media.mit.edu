/*global location*/
// chapters.js

$(function() {
    var hash = location.hash

    if ( hash ) {
        $('#scrollable').animate({
            scrollTop : $(hash).offset().top - $('#siteHeader').height()
        })
    }

    $('#sidenavButton').click(function(e) {
        $(this).toggleClass('close')
        var open = $('#sidenav').attr('data-sidebar') === 'is-open',
            width = 0

        if ( !open ) {
            $('#chapterList').find('li').each(function(e) {
                var textWidth = $(this).text().length * 7
                if ( textWidth > width ) {
                    width = textWidth
                }
            })
            $('#sidenav, #chapterNav').width(width > 399 ? width : 399)
        } else {
            $('#sidenav, #chapterNav').innerWidth(56)
        }

        $('#sidenav').attr('data-sidebar', open ? 'is-closed' : 'is-open')
    })

    $('#sidenav').on('click', 'a', function(e) {
        e.preventDefault()

        var scrollTo = $(this.hash)[0].offsetTop - $('#siteHeader').height(),
            selector = '[href=' + this.hash +']'

        location.hash = this.hash
        $('#scrollable').animate({
            scrollTop : scrollTo
        })

        $(e.delegateTarget).find('a').not(selector).removeClass('active')
        $(e.delegateTarget).find(selector).addClass('active')
    })
})
