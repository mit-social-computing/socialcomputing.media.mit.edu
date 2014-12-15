// gallery.js

$(function() {
    var $gallery = $('.gallery'),
        $grid = $('.grid'),
        $others = $('.chapter-image, .text-media')

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
            if ( image.img.classList.contains('box-image') ) {
                $(image.img).parents('.grid-item').addClass('loaded')
            }
        })

    $others.imagesLoaded()
        .progress(function(i, image) {
            $(image.img).parent().addClass('loaded')
        })
})
