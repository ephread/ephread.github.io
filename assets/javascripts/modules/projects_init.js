(function () {
    window.Ephread = {};
    
    function getTimeoutDuration () {
        if (Modernizr.mq('only screen and (min-width : 1025px)') && !$('body').hasClass('ie9')) {
            return 500;
        } else {
            return 0;
        }
    }
    
    function displayShowcase ($clickedElement, showcaseName) {
        var duration = getTimeoutDuration();
        
        var $screenshotContent = $('#' + showcaseName + '-screenshot-content');
        var $showcase = $('#' + showcaseName + '-showcase');
        
        var offsetTop = $screenshotContent.offset().top - $(window).scrollTop();
        var offsetLeft = $screenshotContent.offset().left - $(window).scrollLeft();

        var offsetRight = $screenshotContent.offset().left + $screenshotContent.innerWidth() - ($(window).scrollLeft() + $(window).width());
        var offsetBottom = $screenshotContent.offset().top + $screenshotContent.innerHeight() - ($(window).scrollTop() + $(window).height());

        $clickedElement.addClass('hidden');
        $screenshotContent.addClass('full-page');

        $screenshotContent.css('top', -offsetTop + 'px');
        $screenshotContent.css('left', -offsetLeft + 'px');
        $screenshotContent.css('height', $(window).height() + 'px');
        $screenshotContent.css('width', $(window).width() + 'px');

        window.Ephread.currentScroll = $(document).scrollTop();

        setTimeout(function () {
            $showcase.removeClass('hidden');

            $(document).scrollTop(0);

            $showcase.removeClass('invisible');
            $showcase.addClass('visible');

            $('#regular-sections').addClass('hidden');
        }, duration);
    }
    
    function hideShowcase (showcaseName) {
        var duration = getTimeoutDuration();
        
        var $screenshotContent = $('#' + showcaseName + '-screenshot-content');
        var $showcase = $('#' + showcaseName + '-showcase');
        var $anchor = $('#' + showcaseName + '-anchor');
        
        $showcase.addClass('invisible');
        $showcase.removeClass('visible');
        $anchor.addClass('no-background-image');
    
        setTimeout(function () {
            $('#regular-sections').removeClass('hidden');
            $(document).scrollTop(window.Ephread.currentScroll);
    
            $showcase.addClass('hidden');
            $screenshotContent.removeClass('full-page');
            $screenshotContent.css('z-index', '100');
            $screenshotContent.css('top', '');
            $screenshotContent.css('left', '');
            $screenshotContent.css('height', '');
            $screenshotContent.css('width', '');
    
            setTimeout(function () {
                $screenshotContent.css('z-index', '');
                $anchor.removeClass('no-background-image');
            }, duration); 
        }, duration);
    }

    $(document).ready(function () {
        $('#gimmicode-anchor').on('click', function (e) {
            e.preventDefault();
            displayShowcase($(this), 'gimmicode');
        });
    
        $('#abjapp-anchor').on('click', function (e) {
            e.preventDefault();
            displayShowcase($(this), 'abjapp');
        });
        
        $('#instructions-anchor').on('click', function (e) {
            e.preventDefault();
            displayShowcase($(this), 'instructions');
        });
    
        $('#gimmicode-showcase .close-showcase').on('click', function (e) {
            e.preventDefault();
            hideShowcase('gimmicode');
        });
    
        $('#abjapp-showcase .close-showcase').on('click', function (e) {
            e.preventDefault();
            hideShowcase('abjapp');
        });
        
        $('#instructions-showcase .close-showcase').on('click', function (e) {
            e.preventDefault();
            hideShowcase('instructions');
        });
    });
})();


