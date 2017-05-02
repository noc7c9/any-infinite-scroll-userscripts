{
    metadata: {
        name: 'Dragonball Multiverse',
        include: 'http://www.dragonball-multiverse.com/en/page-*',
    },
    code: {
        grabNextUrl: function ($) {
            return $.find('#h_read > a').get(0).href.replace('#h_read', '');
        },
        grabPage: function ($) {
            return $.find('#h_read');
        },
    },
}

