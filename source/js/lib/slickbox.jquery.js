/*jshint globalstrict:true*/
/*global document,window,_,jQuery,setTimeout,console*/
'use strict';

(function($) {
    var $tpl, options, lazyResize, scrollPos

    function captionSetup() {
        $('#lbCaptionWide').html($('<div/>', {'class': 'text'}).html($('<div/>', {'class': 'text-body'})))
    }

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
            captionHeight = $('#lbCaptionWide').height(),
            $current, dims = []

        $('#slideshow').height(availableHeight - captionHeight)

        if ( arguments[0].type === 'resize' ) {
            $current = $('.slick-active')
        } else if ( arguments[0] === 0 ) {
            $current = $('.slick-slide').eq(0)
        } else {
            $current = arguments[0]
        }

        dims[0] = $current.find('.lb-img').width()
        dims[1] = $current.find('.lb-img').height()
        $current.find('.lb-mask').width(dims[0]).height(dims[1])
    }

    function close() {
        $tpl.remove()
        $('body').removeClass(options.bodyClass)
        $(window).off('resize', resizeLightbox)

        window.scrollTo(0, scrollPos)

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

        captionSetup()

        var caption = $(this.$slides[this.currentSlide]).find('img').attr('alt')
        $('#lbCaptionWide').find('.text-body').html(caption).toggleClass('large', $('#lbCaptionWide').height() <= 27)

        $(window).on('resize', resizeLightbox)
        resizeLightbox(0)
        $(this.$slides[this.currentSlide]).find('.lb-content').addClass('active')
    }

    function onBeforeChange(Slick, current, upcoming) {
        /*jshint validthis:true*/
        $(Slick.$slides[current]).find('.lb-content').removeClass('active')
        $('#lbCaptionWide').addClass('fade-out')
    }

    function onAfterChange(Slick, current) {
        var caption = $(Slick.$slides[current]).find('img').attr('alt')
        $('#lbCaptionWide')
            .find('.text-body')
                .html(caption).toggleClass('large', $('#lbCaptionWide').height() <= 27)
            .end()
                .removeClass('fade-out')

        resizeLightbox( $(Slick.$slides[current]) )

        $(Slick.$slides[current]).find('.lb-content').addClass('active')
    }

    options = {
        tpl : '<div class="lightbox-bg"><div class="lightbox-body"><div class="lightbox-imgs" id="slideshow"/><div class="lb-caption" id="lbCaptionWide"/><div class="l-fixed l-fixed--upperleft" id="lbLogo"><img src="/assets/img/sc-logo.svg" class="logo"></div><div class="l-fixed l-fixed--upperright"><button class="btn btn--close" id="close"><img src="/assets/img/lightbox-close.png"></button></div><div class="l-fixed l-fixed--lowerright" id="lightboxBtns"/>',
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
            speed : 150,
            lazyLoad : 'ondemand',
            slidesToShow : 1,
            onInit : slickInit,
            onBeforeChange : onBeforeChange,
            onAfterChange : onAfterChange,
            responsive : [
                {
                    breakpoint : 480,
                    settings: {
                        arrows: false,
                        dots: false,
                        fade : false,
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

                var $d = $('<div />', {'class': options.slideClass}),
                    $wrapper = $('<div />', {'class': 'lb-wrapper'}),
                    $i = $('<img />', {
                        'data-lazy': el.src,
                        'alt' : el.alt,
                        'class' : 'lb-img'
                    }),
                    $m = $('<img />', {
                        'src': '/assets/img/masks/white_big.png',
                        'class': 'lb-mask'
                    }),
                    $narrowCaption = $('<div/>', {'class' : 'lb-caption'}).html(
                        $('<div/>', {'class' : 'text'}).html(
                        $('<div/>', {'class' : 'text-body'}).html(el.alt) ) )

                $('#lbCaptionWide').html(el.alt)
                $d.append($i, $m)
                slides.push($('<div/>').append($d))
            })

            $this.on('click', 'img', function(e) {
                e.preventDefault()

                scrollPos = window.scrollY
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

}(jQuery))
