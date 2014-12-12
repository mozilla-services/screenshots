## Pageshot

This is a prototype addon to try ideas around freezing the DOM and sharing the result.  You can view the site (with a link to install the Add-on) at [pageshotpages.appspot.com](https://pageshotpages.appspot.com)

It is a Firefox Add-on, using the [Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK) and a website using Google Appengine.  The addon is in the root, and the website is in `appengine/pageshotpages/`

Much of the interesting work about what you can do with the page after it is frozen will go in `appengine/pageshotpages/js/`.  The addon mostly just freezes the content.

Known issues:

- Iframes don't get frozen.  This is a permission problem with Add-ons.  I guess I have to do something [described here](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Content_Scripts/Cross_Domain_Content_Scripts) (though how to do it for all domains is unclear).
- You should be using Firefox Aurora (or Developer Edition), or Firefox Nightly.  Also you *can't* have e10s enabled (look for underlines on your tab titles).
- Trying to take a shot of a shot should make a copy, not a shot
- Need to use good resets for the interface (though this is less of a concern since I moved to iframes)
- Not sure how to add build step to project (for LESS/SASS or something).  May not be necessary with iframes (since the no-conflict stuff is less necessary).
- I have to use http (not https) on originally http sites, because of [mixed content](https://developer.mozilla.org/en-US/docs/Security/MixedContent) problems.  Seems so lame.
- The screenshot has whitespace on the sides.

Things to do:
- "Fuzz" things out.  I imagine selecting a range of the screen.  Then anything that seems to be inside that range (this is a little fuzzy) will be "fuzzed".  Fuzzing means replacing the text with random text of a similar size, and then applying a CSS blur effect.
- Have the link to the original content try to find the closest relevant anchor.
- Control timespan of availability of a link
- Rich copy of snippet image and link
- Wire in to the lifespan of a Hello connection (pin to keep for longer)
