import pytest
from pytest_axe.parameterize_tests import *  # NOQA


@pytest.mark.accessibility
def test_home_page_accessibility(rule, home_page):
    """Run accessibility audits on the home page of Screenshots."""
    results = home_page.run_only(rule)
    assert len(results) == 0, home_page.report(results)


# TODO: Configure test account setup to enable tests for My Shots page, and
# the single screenshot view.
