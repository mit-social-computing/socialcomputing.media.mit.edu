/*global $,location*/
// splash.js

$(function() {
    if ( !!$('.is-splash-page').length ) {
        var $splash = $('<div/>', {class: 'splash'}),
            $splashBg = $('<div/>', {class: 'splash-bg'}),
            $splashBody = $('<div/>', {class: 'splash-body'}),
            $splashButton = $('<button/>', {class: 'splash-button'}),
            $quote = $('<blockquote/>', {class: 'splash-quote'}),
            $cite = $('<cite/>', {class: 'splash-cite'})

            $splash
                .append($splashBg.append($splashBody))
                .append($splashButton)

            $quote.html('When we try to pick anything out by itself, we find it hitched to everything else in the universe.').append($cite.html('John Muir')).appendTo($splashBody)

        $('body').append($splash).delay(800).queue(function(n) {
            $splash.addClass('step-one')
            n()
        }).delay(600).queue(function(n) {
            $splash.addClass('step-two')
            n()
        })

        $splashButton.click(function() {
            $('body').removeClass('is-splash-page')
            $splash.addClass('fade-out').delay(250).queue(function(n) {
                $splash.remove()
                n()
            })
        })
    }
})
