{
    metadata: {
        name: 'MangaStream',
        include: 'https://readms.net/r/*/*/*/*',
    },
    code: {
        grabNextUrl: function ($) {
            return $.find('.page a').get(0).href;
        },
        grabPage: function ($) {
            return $.find('#manga-page');
        },
    },
}
