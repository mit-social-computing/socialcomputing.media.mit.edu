/*jshint globalstrict:true*/
/*global document,window,_,jQuery,setTimeout,console*/
'use strict';

(function($) {
    var options = {
        itemWidth: 200,
        itemSelector: '.gallery-item',
        gutter: 10
    }

    $.fn.gallery = function(settings) {
        if (settings) {
            $.extend(options, settings)
        }
        return this.each(function(){
            var $t = $(this),
                rowWidth = $t.width(),
                rowCount = Math.floor(rowWidth/options.itemWidth),
                $images = $t.children(options.itemSelector)

            $images.each(function(i, el) {
                if ( i % rowCount === 0 ) {
                    var $row = $(el).siblings().addBack().slice(i, i+rowCount),
                        rowItemsWidth = 0, gutters = (rowCount - 1) * options.gutter,
                        resize

                    $row.each(function(j, el) {
                        if ( !el.originalWidth ) {
                            el.originalWidth = el.clientWidth
                        }
                        rowItemsWidth += el.originalWidth
                    })


                    resize = rowWidth / (rowItemsWidth + gutters)

                    $row.each(function(j, el) {
                        $(el).width(Math.floor( el.originalWidth * resize ))
                    })
                }
            })
        })
    }

})(jQuery)
