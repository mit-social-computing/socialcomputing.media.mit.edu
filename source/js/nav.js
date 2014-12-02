// nav.js

$(function() {
    var hash = location.hash

    $('#chapterNav').on('click', 'a', function(e) {
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

    $('#menu').click(function() {
        $(this).toggleClass('close')
        $('body').toggleClass('is-menu-open')
    })

    $('[data-dropdown]').click(function(e) {
        if ( !!$(e.target.parentElement).data('dropdown') && window.innerWidth < 507 ) {
            var open = $(this).attr('data-dropdown') === 'is-open'
            $(this).attr('data-dropdown', open ? 'is-closed' : 'is-open')
            return false
        } else {
            return true
        }
    })

    $('#sidenavButton').click(function(e) {
        $(this).toggleClass('close')
        var open = $('#sidebar').attr('data-sidebar') === 'is-open',
            width = 0

        if ( !open ) {
            $('#chapterList').find('li').each(function(e) {
                var textWidth = $(this).text().length * 7
                if ( textWidth > width ) {
                    width = textWidth
                }
            })
            $('#sidenav, #sidebar').innerWidth(width > 399 ? width : 399)
        } else {
            $('#sidenav, #sidebar').innerWidth(56)
        }

        $('#sidebar').attr('data-sidebar', open ? 'is-closed' : 'is-open')
    })

    if ( hash ) {
        // need to trigger on gallery layout
        // use browserify to creat bundles and pass event
        // for now just Timeout
        setTimeout(function() {
            $('#scrollable').animate({
                scrollTop : $(hash)[0].offsetTop -
                    ( parseInt(getComputedStyle($('#content')[0]).paddingTop, 10) +
                      $('#siteHeader').height() )
            })
        }, 100)

        // only for non-blog pages
        $('#chapterNav').find('a').not('[href=' + hash + ']').removeClass('active')
        $('#chapterNav').find('[href=' + hash + ']').addClass('active')
    }

    if ( !!$('#nextBlog').length ) {
        // set clip path for all browsers
        var center = $('#nextBlog').outerWidth() - 35
        $('#nextBlog').css({ 'webkitClipPath' : 'circle(20px at ' + center + 'px)' })
        $('.nav-sibling').addClass('loaded')
    }

})
