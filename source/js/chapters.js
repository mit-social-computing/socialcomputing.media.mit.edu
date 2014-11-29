/*global location,setTimeout*/
// chapters.js

$(function() {
    var hash = location.hash

    if ( hash ) {
        // need to trigger on gallery layout
        // use browserify to creat bundles and pass event
        $('#scrollable').animate({
            scrollTop : $(hash)[0].offsetTop -
                ( parseInt(getComputedStyle($('#content')[0]).paddingTop, 10) +
                  $('#siteHeader').height() )
        })
        $('#sidenav').find('a').not('[href=' + hash + ']').removeClass('active')
        $('#sidenav').find('[href=' + hash + ']').addClass('active')
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

        var scrollTo = $(this.hash)[0].offsetTop -
            ( parseInt(getComputedStyle($('#content')[0]).paddingTop, 10) +
              $('#siteHeader').height() ),
            selector = '[href=' + this.hash +']'

        history.pushState({}, '', this.hash)
        $('#scrollable').animate({
            scrollTop : scrollTo
        })

        $(e.delegateTarget).find('a').not(selector).removeClass('active')
        $(e.delegateTarget).find(selector).addClass('active')
    })
})
