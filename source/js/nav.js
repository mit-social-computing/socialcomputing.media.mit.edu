// nav.js

$(function() {
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
})
