// sample implementation file for Hacker News
{
    // userscript metadata block
    metadata: {
        name: 'Hacker News',
        include: [
            'https://news.ycombinator.com/',
            'https://news.ycombinator.com/news*',
            'https://news.ycombinator.com/newest*',
            'https://news.ycombinator.com/newcomments*',
            'https://news.ycombinator.com/show*',
            'https://news.ycombinator.com/ask*',
            'https://news.ycombinator.com/jobs*'
        ],
        exclude: [] // optional
    },

    // userscript behaviour options
    // all optional
    options: {
        initialPages: 1, // how many pages to initially load
        maxPages: 20 // maximum amount of pages to keep loaded
    },

    // the actual implementation code
    // both functions are required
    code: {

        // grabNextUrl should return the url for the next page.
        //
        // arguments:
        //      $    - A jquery object of the previous page.
        //      url  - The url of the previous page.
        //      html - The actual html of the previous page as a string.
        grabNextUrl: function ($, url, html) {
            return $.find('a.morelink').get(0).href;
        },

        // grabPage should return a jquery object containing the element(s)
        // that should be displayed for the page.
        //
        // arguments are the same as for grabNextUrl
        grabPage: function ($, url, html) {
            var table = $.find('table.itemlist');
            table.find('tr.morespace').remove();
            table.find('tr').last().remove();
            return table;
        },
    },
}
