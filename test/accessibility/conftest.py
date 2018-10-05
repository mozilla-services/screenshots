import pytest

from pytest_axe.pytest_axe import PytestAxe as Axe
from selenium import webdriver

base_url = "https://screenshots.firefox.com/"
my_shots_button_locator = "myshots-button"


@pytest.fixture(scope="session", autouse=True)
def home_page():
    profile = webdriver.FirefoxProfile()
    profile.set_preference("security.csp.enable", False)
    driver = webdriver.Firefox(firefox_profile=profile)
    driver.get(base_url)

    axe = Axe(driver)
    axe.inject()

    yield axe
    driver.close()


def pytest_configure(config):
    """
        Included rule ID of tests that are expected to fail as a key, with the
        github issue number as a value (or any other desired info as
        reason for failure), and pass to pytestconfig to generate the tests.

        Example:
            config.xfail_rules = {
                "meta-viewport": "Reason: GitHub issue #245"
            }
    """
    config.xfail_rules = {}
