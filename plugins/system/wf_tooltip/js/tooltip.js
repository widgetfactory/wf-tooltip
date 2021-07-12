/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2021 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function ($) {
    $.fn.wf_tooltip = function (options) {
        options = $.extend({
            position: 'bottom-center',
            selector: '.jcetooltip'
        }, options);

        var tooltip;

        /**
         * Show the tooltip and build the tooltip text
         * @param {Object} e  Event
         */
        function start(e) {
            var elm = e.target;

            // Get tooltip text from title
            var text = $(elm).attr('title') || '', title = '';

            $(elm).attr('title', '').data('title', text);

            // Split tooltip text ie: title::text
            if (/::/.test(text)) {
                var parts = text.split('::');
                title = $.trim(parts[0]);
                text = $.trim(parts[1]);
            }

            var html = $('<div class="wf-tooltip-inner" />');

            // Set tooltip title html
            if (title) {
                $(html).append('<h4>' + title + '</h4>');
            }

            // Set tooltip text html
            if (text) {
                $(html).append('<p>' + text + '</p>');
            }

            if (!tooltip) {
                tooltip = $('<div class="wf-tooltip-container"></div>').append(html).appendTo(document.body);
            }

            if (options.position == 'bottom-center') {
                $(tooltip).addClass('wf-tooltip-bottom').prepend('<div class="wf-tooltip-arrow"></div>');
            }

            if (options.position == 'top-center') {
                $(tooltip).addClass('wf-tooltip-top').prepend('<div class="wf-tooltip-arrow"></div>');
            }

            // Set visible
            $(tooltip).addClass('wf-tooltip-in');
        }

        /**
         * Fade Out and hide the tooltip
         * Restore the original element title
         * @param {Object} e Event trigger
         */
        function end(e) {
            // remove tooltip
            $(tooltip).removeClass('wf-tooltip-in').remove();
            // reset
            tooltip = null;

            // reset target title
            $(e.target).attr('title', $(e.target).data('title')).data('title', '');
        }

        /**
         * Position the tooltip
         * @param {Object} e Event trigger
         */
        function locate(e) {
            var o = { x: 10, y: 10 };

            var page = {
                'x': e.pageX,
                'y': e.pageY
            };

            var tip = {
                'x': $(tooltip).width(),
                'y': $(tooltip).height()
            };

            var pos = {
                'x': page.x + o.x,
                'y': page.y + o.y
            };

            switch (options.position) {
                case 'top-left':
                    pos.x = (page.x - tip.x) - o.x;
                    pos.y = (page.y - tip.y) - o.y;
                    break;
                case 'top-right':
                    pos.x = page.x + o.x;
                    pos.y = (page.y - tip.y) - o.y;
                    break;
                case 'top-center':
                    pos.x = (page.x - Math.round((tip.x / 2))) + o.x;
                    pos.y = (page.y - tip.y) - o.y;
                    break;
                case 'bottom-left':
                    pos.x = (page.x - tip.x) - o.x;
                    pos.y = (page.y + Math.round((tip.y / 2))) - o.y;
                    break;
                case 'bottom-right':
                    pos.x = page.x + o.x;
                    pos.y = page.y + o.y;
                    break;
                case 'bottom-center':
                    pos.x = (page.x - (tip.x / 2)) + o.x;
                    pos.y = page.y + o.y;
                    break;
            }

            $(tooltip).css({
                top: pos.y,
                left: pos.x
            });
        }

        return this.each(function () {
            $(this).removeClass('jcetooltip').addClass('wf-tooltip').on('mouseover', start).on('mousemove', locate).on('mouseout', end);
        });
    };
})(jQuery);
