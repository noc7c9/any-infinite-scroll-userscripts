{
    metadata: {
        name: 'MangaReader',
        include: 'http://www.mangareader.net/*/*',
    },
    code: {
        grabNextUrl: function ($) {
            return $.find('#imgholder a').get(0).href;
        },
        grabPage: function ($) {
            return $.find('#imgholder');
        },
    },
}
