$(function () {
    var $deviceContainer = $('#device-container'),
        $iframeEl = $deviceContainer.find('iframe');

    var changeIframeSrc = function () {
        // TODO: Check if valid URL.
        $iframeEl.attr('src', $('#iframeURLInput').val());
    };


    $('#deviceBtn-iphone6').on('click', function(e) {
        e.preventDefault();
        $deviceContainer.removeClass(function (index, css) {
            return (css.match (/(^|\s)device-\S+/g) || []).join(' ');
        });

        $deviceContainer.addClass('device-iphone6');
    });

    $('#deviceBtn-ipad').on('click', function(e) {
        e.preventDefault();
        $deviceContainer.removeClass(function (index, css) {
            return (css.match (/(^|\s)device-\S+/g) || []).join(' ');
        });
        $deviceContainer.addClass('device-ipad');
    });

    $('#deviceBtn-rotate').on('click', function(e) {
        e.preventDefault();
        $deviceContainer.toggleClass('rotateCW');

        window.setTimeout(function() {
            var tmpWidth = $deviceContainer.width();
            var tmpHeight = $deviceContainer.height();
            $deviceContainer.height(tmpWidth);
            $deviceContainer.width(tmpHeight);
            if ($deviceContainer.hasClass('rotateCW')) {
                $deviceContainer.css({'margin-top': '292px'});
            }
            else {
                $deviceContainer.css({'margin-top': '160px'});
            }

            $deviceContainer.find('iframe').toggleClass('rotateCCW');
            $deviceContainer.toggleClass('rotate');
        }, 805);

        // $deviceContainer.css({
        //     '-webkit-transform': 'rotate(90deg)',
        //    'transform': 'rotate(90deg)'});
    });

    $('#iframeURLInput').on('keydown', function (e) {
        // If the user presses enter
        if (e.which === 13) {
            console.log('Changing iframe src');
            changeIframeSrc();
        }
    });

    $('.mdi-action-search').on('click', changeIframeSrc);

    $(".dropdown-button").dropdown({ hover: false });

});



