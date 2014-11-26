/*jshint globalstrict:true*/
/*global document,window,_,jQuery,setTimeout,console*/
'use strict';

(function($) {
    var $tpl, options,lazyResize

    function keyHandler(e) {
        var key = e.which
        if ( key === 39 ) { // right arrow
            $('#slideshow').slickNext()
        } else if ( key === 37 ) { // left arrow
            $('#slideshow').slickPrev()
        } else if ( key === 27 ) { // excape key
            close()
        }
    }

    function resizeLightbox() {
        var availableHeight = $('.lightbox-body').height(),
            captionHeight = $('#lbCaption').height()

        $('#slideshow').height(availableHeight - captionHeight)
    }

    function close() {
        $tpl.remove()
        $('body').removeClass(options.bodyClass)
        $(window).off('resize')

        if (options.useKeys) {
            $('window').off('keyup', keyHandler)
        }
    }

    function slickInit() {
        /*jshint validthis:true*/
        if ( this.$dots ) {
            this.$dots.css('display', 'inline-block')
            $('#lightboxBtns').prepend(this.$dots)
        }

        var caption = $(this.$slides[this.currentSlide]).find('img').attr('alt')
        $('#lbCaption').html(caption)

        resizeLightbox()
    }

    function onBeforeChange(Slick, current, upcoming) {
        var caption = $(Slick.$slides[upcoming]).find('img').attr('alt')
        $('#lbCaption').html(caption)

        resizeLightbox()
    }

    options = {
        tpl : '<div class="lightbox-bg"><div class="lightbox-body"><div class="lightbox-imgs" id="slideshow"/><div class="lb-caption" id="lbCaption"/><div class="l-fixed l-fixed--upperleft" id="lbLogo"><img src="/assets/img/sc-logo.svg" class="logo"></div><div class="l-fixed l-fixed--upperright"><button class="btn btn--close" id="close">X</button></div><div class="l-fixed l-fixed--lowerright" id="lightboxBtns"/>',
        bodyClass : 'l-fixbody',
        useKeys : true,
        thumbs : false,
        slideClass : 'lb-content',
        bgClass : 'lightbox-bg',
        wrapperClass : 'lightbox-body',
        slideshowClass : 'lightbox-imgs',
        closeClass : 'btn btn--close',
        slickOps : {
            arrows : true,
            dots: true,
            appendArrows : '#lightboxBtns',
            nextArrow : '<button class="btn btn--right">Next</button>',
            prevArrow : '<button class="btn btn--left">Previous</button>',
            fade : true,
            speed : 500,
            lazyLoad : 'ondemand',
            slidesToShow : 1,
            onInit : slickInit,
            onBeforeChange : onBeforeChange,
            responsive : [
                {
                    breakpoint : 480,
                    settings: {
                        arrows: false,
                        dots: false,
                        fade : false,
                        onInit : slickInit,
                        onBeforeChange : onBeforeChange,
                        slidesToShow : 1,
                        lazyLoad : 'ondemand'
                    }
                }
            ]
        }
    }
    lazyResize = _.debounce(resizeLightbox)

    $.fn.slickBox = function(settings) {
        return this.each(function() {
            if (settings) {
                $.extend(true, options, settings)
            }

            var slides = [],
                thumbs = [],
                $this = $(this),
                //group = options.group ? $(options.group).get() : $this.next().children()
                groupId = $this.data(options['data-group']),
                group = $(groupId).find('img').get()

            Array.prototype.forEach.call(group, function(el) {
                // TODO check responsive breakpoints and lazyLoad settings

                var $d = $('<div />').addClass(options.slideClass),
                    $i = $('<img />').attr({
                        'data-lazy': el.src,
                        'alt' : el.alt
                    })

                $('#lbCaption').html(el.alt)
                $d.append($i)
                slides.push($('<div/>').append($d))
            })

            $this.on('click', 'img', function(e) {
                e.preventDefault()

                $tpl = $(options.tpl)
                $tpl.addClass('loading')

                $('body').addClass(options.bodyClass).append($tpl)

                $tpl.find('#slideshow').append(slides)

                options.slickOps.initialSlide = $(e.target).parents('.gallery-item').index()
                $('#slideshow').slick(options.slickOps)

                $('.lightbox-body').addClass('is-visible')
                $tpl.removeClass('loading')

                if ( options.useKeys ) {
                    $(window).on('keyup', keyHandler)
                }
            })

            $(document).on('click', '#close', close)

        })
    }

    $(window).on('resize', lazyResize)

}(jQuery))
