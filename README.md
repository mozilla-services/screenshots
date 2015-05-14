## Pageshot

[![Build Status](https://travis-ci.org/mozilla-services/pageshot.svg)](https://travis-ci.org/mozilla-services/pageshot)

This is a prototype for a product to create better sharable assets. It uses techniques like copying/freezing the DOM, optionally showing history, allowing inline comments, taking snippets and screenshots.

You can view the site (with a link to install the Add-on) at [pageshotpages.appspot.com](https://pageshotpages.appspot.com)

It is implemented as a Firefox Add-on, using the [Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK) and a website using NodeJS.  The addon is in `addon/`, and the website is in `server/`

Ian has been blogging about the [design, definition, and development process](http://www.ianbicking.org/tag/product-journal.html).

### Participation

There is an IRC channel `#pageshot` on irc.mozilla.org.

We hold daily standups each weekday at 11am Eastern, 10am Central, 8am Pacific.  Meetings typically last 20 minutes, and we just discuss whatever we're working on.  Feel free to stop by and say hi.  Follow [this link](https://v.mozilla.com/flex.html?roomdirect.html&key=HKjEDYoY2zMqhoZ8by7z3UTLKA) to join the meeting (you'll have to install the Vidyo  video conferencing software, sorry).  Please don't join with your video turned off, it's a conversational meeting and we like to know who is part of the conversation.  If someone is out for some reason we may cancel this meeting, check in on IRC if you are unsure.

Planning and ideation is happening in the [issue tracker](https://github.com/ianb/pageshot/issues).  We use a pattern roughly like:

* [Issues with no milestone](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+no%3Amilestone) are awaiting triage
* [Issues set to the next milestone](https://github.com/mozilla-services/pageshot/milestones/The%20Shallow%20MVP) can be worked on any time (this link will rot!)
* [Issues in Next Tasks](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Next+Tasks%22) will be re-triaged when the current milestone is done
* [Issues in Blue Sky](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Blue+Sky%22) are mostly shelved; we'd like to do them but have no plans to move forward.  (If you see something you care about there, comment on it -- otherwise we may not notice it)
* [Issues with the needs-discussion label](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3A%22needs+discussion%22) are for discussion at the next meeting.  We don't have a plan for open meetings (not that we don't want them, we just don't have a plan), so this is largely for internal use.

Issue tags otherwise aren't very structured. [Experiment](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3Aexperiment) means that the implementation should focus on creating something usable for analysis (i.e., something we can play with), not a committed feature. [Research](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3Aresearch) is primarily analysis of other products that do something interesting, or some source material that could provide insight.  Input on these (things like "I like this product because...") is very helpful!

Also Ian [blogs regularly about PageShot](http://www.ianbicking.org/tag/product-journal.html).
