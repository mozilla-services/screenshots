## Pageshot

This is a prototype for a product to create better sharable assets. It uses techniques like copying/freezing the DOM, optionally showing history, allowing inline comments, taking snippets and screenshots.

You can view the site (with a link to install the Add-on) at [pageshotpages.appspot.com](https://pageshotpages.appspot.com)

It is implemented as a Firefox Add-on, using the [Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK) and a website using Google Appengine.  The addon is in the root, and the website is in `appengine/pageshotpages/`

Ian has been blogging about the [design, definition, and development process](http://www.ianbicking.org/tag/product-journal.html).

Planning and ideation is happening in the [issue tracker](https://github.com/ianb/pageshot/issues).  We use a pattern roughly like:

* [Issues with no milestone](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+no%3Amilestone) are awaiting triage
* [Issues set to the next milestone](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Sprint+1%22) can be worked on any time (this link will rot!)
* [Issues in Next Tasks](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Next+Tasks%22) will be re-triaged when the current milestone is done
* [Issues in Blue Sky](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Blue+Sky%22) are mostly shelved; we'd like to do them but have no plans to move forward.  (If you see something you care about there, comment on it -- otherwise we may not notice it)
* [Issues with the needs-discussion label](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3A%22needs+discussion%22) are for discussion at the next meeting.  We don't have a plan for open meetings (not that we don't want them, we just don't have a plan), so this is largely for internal use.

Issue tags otherwise aren't very structured. [Experiment](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3Aexperiment) means that the implementation should focus on creating something usable for analysis (i.e., something we can play with), not a committed feature. [Research](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3Aresearch) is primarily analysis of other products that do something interesting, or some source material that could provide insight.  Input on these (things like "I like this because...") is very helpful!
