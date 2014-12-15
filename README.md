## Pageshot

This is a prototype addon to try ideas around freezing the DOM and sharing the result.  You can view the site (with a link to install the Add-on) at [pageshotpages.appspot.com](https://pageshotpages.appspot.com)

It is a Firefox Add-on, using the [Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK) and a website using Google Appengine.  The addon is in the root, and the website is in `appengine/pageshotpages/`

Much of the interesting work about what you can do with the page after it is frozen will go in `appengine/pageshotpages/js/`.  The addon mostly just freezes the content.

Known issues:

- You should be using Firefox Aurora (or Developer Edition), or Firefox Nightly.  Also you *can't* have e10s enabled (look for underlines on your tab titles).
- I have to use http (not https) on originally http sites, because of [mixed content](https://developer.mozilla.org/en-US/docs/Security/MixedContent) problems.  Seems so lame.
- The screenshot has whitespace on the sides.

Things to do:
- Control timespan of availability of a link
- Wire in to the lifespan of a Hello connection (pin to keep for longer)
