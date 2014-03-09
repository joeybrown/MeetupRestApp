rest.factory('SmoothScroll', function () {
    return {
        scrollElementIntoView: function (nameOrId, additionalOffset) {
            if (!nameOrId)
                return;
            var offset = -50;
            if (additionalOffset) {
                offset -= additionalOffset;
            }
            var idElement = $('#' + nameOrId + ':visible');
            if (idElement.size() > 0) {
                $.scrollTo(idElement, 300, { offset: { top: offset } });
            } else {
                var nameElement = $('[name="' + nameOrId + '"]:visible');
                if (nameElement.size() > 0)
                    $.scrollTo(nameElement, 300, { offset: { top: offset } });
            }
        }
    }
});