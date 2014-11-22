// nav.js

$(function() {
    $('#menu').click(function() {
        $(this).toggleClass('close')
        $('body').toggleClass('is-menu-open')
    })

    $('[data-dropdown]').click(function(e) {
        var open = $(this).attr('data-dropdown') === 'is-open'
        $(this).attr('data-dropdown', open ? 'is-closed' : 'is-open')
        return false
    })
})
