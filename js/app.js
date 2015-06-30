$(function () {
    var currentDevice = 'iphone6',
        rotated = false,
        spec = [{
            device: 'iphone6',
            css: {
                normal: '160px',
                rotate: '292px',
                width: '375px',
                height: '667px'
            },
        },
        {
            device: 'ipad',
            css: {
                normal: '160px',
                rotate: '0',
                width: '1024px',
                height: '768px'
            }
        }
        ],
        $deviceContainer = $('#device-container'),
        $iframeEl = $deviceContainer.find('iframe');

    var changeIframeSrc = function () {
        var urlInput = $('#iframeURLInput').val();
        if (urlInput.indexOf('http://') !== -1) {
            $iframeEl.attr('src', urlInput);
        }
        // TODO: Review if this is an annoying feedback.
        else {
            $('#validURLModal').openModal();
            window.setTimeout(function () {
                $('#validURLModal').closeModal();
            }, 2000);
        }

    };

    var getDeviceStyle = function () {
        var deviceSpec;
        spec.forEach(function (s) {
            if (s.device === currentDevice) {
                deviceSpec = s;
            }
        });
        return deviceSpec;
     };

    var setStyleAccordingToDevice = function () {
        var deviceStyle = getDeviceStyle();
            marginTop = deviceStyle.css.normal,
            height = deviceStyle.css.height,
            width = deviceStyle.css.width;

        if (rotated) {
            marginTop = deviceStyle.css.rotate;
            height = deviceStyle.css.width;
            width = deviceStyle.css.height;
        }

        $deviceContainer.css({
            'margin-top': marginTop,
            'width': width,
            'height': height
        });

    };



    $('#deviceBtn-iphone6').on('click', function(e) {
        e.preventDefault();
        $deviceContainer.removeClass(function (index, css) {
            return (css.match (/(^|\s)device-\S+/g) || []).join(' ');
        });

        $deviceContainer.addClass('device-iphone6');
        currentDevice = 'iphone6';
        setStyleAccordingToDevice();
    });

    $('#deviceBtn-ipad').on('click', function(e) {
        e.preventDefault();
        $deviceContainer.removeClass(function (index, css) {
            return (css.match (/(^|\s)device-\S+/g) || []).join(' ');
        });
        $deviceContainer.addClass('device-ipad');
        currentDevice = 'ipad';
        setStyleAccordingToDevice();
    });

    $('#deviceBtn-rotate').on('click', function(e) {
        e.preventDefault();
        $deviceContainer.toggleClass('rotateCW');
        rotated = !rotated;

        window.setTimeout(function() {
            setStyleAccordingToDevice();

            $deviceContainer.find('iframe').toggleClass('rotateCCW');
            $deviceContainer.toggleClass('rotate');
        }, 805);

    });

    $('#iframeURLInput').on('keydown', function (e) {
        // If the user presses enter.
        if (e.which === 13) {
            changeIframeSrc();
        }
    });

    $('.mdi-action-search').on('click', changeIframeSrc);

    $(".dropdown-button").dropdown({ hover: false });

});



