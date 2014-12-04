// gallery.js

$(function() {
    var $gallery = $('.gallery'),
        $grid = $('.grid')

    $gallery.imagesLoaded()
        .always(function() {
            $gallery.packery({
                itemSelector : '.gallery-item',
                gutter : 10,
                rowHeight : 207,
                transitionDuration : 0
            })
            $gallery.packery('bindResize')
        })
        .progress( function(instance, image) {
            image.img.classList.add('loaded')
        })

    $gallery.slickBox({ 'data-group': 'block' })

    $grid.imagesLoaded()
        .progress(function(instance, image) {
            image.img.classList.add('loaded')
        })
})
