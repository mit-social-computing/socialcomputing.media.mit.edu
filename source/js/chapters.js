// chapters.js

$(function() {
    $('#sidenavButton').click(function(e) {
        $(this).toggleClass('close')
        var open = $('#sidenav').attr('data-sidebar') === 'is-open'

        $('#sidenav').attr('data-sidebar', open ? 'is-closed' : 'is-open')
        $('#content').attr('data-sidebar-state', open ? 'is-closed' : 'is-open')
    })
})
