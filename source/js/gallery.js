// gallery.js

$(function() {
    $gallery = $('.gallery').imagesLoaded(function() {
        $gallery.packery({
            itemSelector : '.gallery-item',
            gutter : 10,
            rowHeight : 207,
            transitionDuration : 0
        })
        $gallery.packery('bindResize')
    })

    $gallery.slickBox({ 'data-group': 'block' })
})
