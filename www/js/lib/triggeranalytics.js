define(['https://www.google-analytics.com/analytics.js'], function () {
    // analytics number goes here
    window.ga('create', 'UA-45546538-1');
    return function () {
        //this gets done everytime we load a new page
        window.ga('set', 'location', window.location);
        window.ga('send', 'pageview');
    };
});
