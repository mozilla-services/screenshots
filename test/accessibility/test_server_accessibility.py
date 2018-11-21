import pytest
from pytest_axe.parameterize_tests import *  # NOQA


class TestHomePageAccessibility(object):
    params = {
        # Used by pytest-axe to generate tests and configure xfails
        "color-contrast": "Reason: GitHub issue #5014 https://github.com/mozilla-services/screenshots/issues/5014",
        "html-has-lang": "Reason: GitHub issue #5015 https://github.com/mozilla-services/screenshots/issues/5015",
        "link-name": "Reason: GitHub issue #5017 https://github.com/mozilla-services/screenshots/issues/5017",
        "meta-viewport": "Reason: GitHub issue #5018 https://github.com/mozilla-services/screenshots/issues/5018",
    }

    @pytest.mark.accessibility
    def test_home_page_accessibility(self, rule, home_page):
        """Run accessibility audits on the home page of Screenshots."""
        results = home_page.run_single_rule(rule)
        assert len(results) == 0, home_page.report(results)
