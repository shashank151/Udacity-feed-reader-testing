/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*Test to check whether all feeds have valid url*/
        it('url defined', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /*Test to check whether all feeds have valid name*/
        it('name defined', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });

    });

    /*Test suite is created named "The Menu"*/
    describe('The Menu', function () {

        /*Test to check whether slide menu is hidden by default */
        it('Menu Element hidden', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*Test to check whether menu open & closed as expected*/

        it('Menu Change', function () {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /*Test suite is created named "Initial Entries"*/

    describe('Initial Entries', function () {

        /*Test to verify  if load function works as expected & at least one feed is loaded*/

        beforeEach(function (done) {
            loadFeed(0,done);
        });
        it('load Feed', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /*Test suite is created named "New Feed Selection"*/

    describe('New Feed Selection', function () {

        /*Test to verify  if load function works as expected 
         *& if different feed is loaded, the data on the page changes
         */
        var textBefore, textAfter;
        beforeEach(function (done) {
            loadFeed(0, function () {
                textBefore = document.querySelector('.feed').innerText;
                loadFeed(1, done);
            });
        });
        it('New Feed Loaded', function () {
            textAfter = document.querySelector('.feed').innerText;
            expect(textBefore).not.toBe(textAfter);
        });
    });
}());
