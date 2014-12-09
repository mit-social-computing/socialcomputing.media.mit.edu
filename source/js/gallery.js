// gallery.js

$(function() {
    var $gallery = $('.gallery'),
        $grid = $('.grid')

    $gallery.imagesLoaded()
        .always(function() {
            $gallery.gallery()
            $gallery.addClass('loaded')
            $(window).on('resize', _.debounce($.fn.gallery.bind($gallery), 100))
            $(document).on('menuToggle', $.fn.gallery.bind($gallery))
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
