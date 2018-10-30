import pytest
import os
from pytest_axe.pytest_axe import PytestAxe as Axe
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

download_dir = os.path.join(os.getcwd(), "test", "addon", ".artifacts")

base_url = "https://screenshots.stage.mozaws.net/"

_panel_button_locator = "pageActionButton"
_take_screenshot_button_locator = (By.ID, "pageAction-panel-screenshots_mozilla_org")


def wait_for_element_to_load(driver, selector):
    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.presence_of_element_located(selector))
    return element


@pytest.fixture(scope="class")
def firefox_profile():
    """Configure Firefox Preferences."""
    profile = webdriver.FirefoxProfile()
    profile.set_preference("security.csp.enable", False)
    profile.set_preference("extensions.legacy.enabled", True)
    profile.set_preference("xpinstall.signatures.required", False)
    profile.set_preference("browser.download.folderList", 2)
    profile.set_preference("broswer.download.dir", download_dir)
    return profile


@pytest.fixture(scope="class")
def driver(firefox_profile):
    """Install Screenshots."""
    driver = webdriver.Firefox(firefox_profile=firefox_profile)
    addon = os.path.abspath(os.path.join("build", "screenshots.zip"))
    driver.install_addon(addon, temporary=True)
    yield driver
    driver.close()


@pytest.fixture(scope="class")
def home_page(driver):
    """Launch Screenshots home page as guest."""
    driver.get(base_url)

    # Inject accessibility API into page
    axe = Axe(driver)
    axe.inject()

    # Yield Axe instance, containing the WebDriver object as class attribute
    yield axe
