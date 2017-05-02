{
    metadata: {
        name: 'MangaFox',
        include: 'http://mangafox.me/manga/*',
    },
    code: {
        grabNextUrl: function ($, url) {
            var urlPrefix = url.substr(0, url.lastIndexOf('/') + 1);
            var nextUrlFragment = $.find('div.read_img > a').attr('href');
            if (nextUrlFragment.substr(0, 11) === 'javascript:') {
                return $.find('#chnav a').get(1).href;
            } else {
                return urlPrefix + nextUrlFragment;
            }
        },
        grabPage: function ($) {
            return $.find('div.read_img');
        },
    },
}
