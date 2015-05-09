// nav.js

$(function() {
    var hash = location.hash,
        seenMenu = !!sessionStorage.getItem('seenMenu'),
        $sidenavButton = $('#sidenavButton'),
        $a = $('#article'),
        center = $('#nextBlog').outerWidth() - 35

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

    $sidenavButton.click(function(e) {
        $(this).toggleClass('close')
        var open = $('#sidebar').attr('data-sidebar') === 'is-open',
            width = 0

        $('#sidebar').attr('data-sidebar', open ? 'is-closed' : 'is-open')
        $('#sidebar').on('transitionend', function(e) {
            if ( e.target === this ) {
                $(document).trigger('menuToggle')
            }
        })

        $(window).trigger('open:sidenav')
    })

    //
    // INIT
    //

    if ( !seenMenu && !!$sidenavButton.length ) {
        setTimeout(function() {
            sessionStorage.setItem('seenMenu', true)
            $sidenavButton.click()
        }, 1000)
    }

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

    function placeSiblingNav() {
        $('#prev').css({
            left: $a.offset().left - 70
        })
        $('#next').css({
            left: $a.offset().left + $a.width() + 70
        })
    }

    if ( !!$('#article').length ) {
        $('.nav-sibling').addClass('loaded')
        placeSiblingNav()
        $(window).on('close:lightbox', placeSiblingNav)
        $(window).on('open:sidenav', function() {
            $('.nav-sibling').fadeOut(50).delay(250).queue(function(n) {
                placeSiblingNav()
                $(this).fadeIn(100)
                n()
            })
        })
        $(window).on('resize', placeSiblingNav)
    }
})
