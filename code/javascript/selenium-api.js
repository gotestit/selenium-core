/*
 * Copyright 2004 ThoughtWorks, Inc
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

storedVars = new Object();

function Selenium(browserbot) {
	/**
	 * Defines an object that runs Selenium commands.
	 * 
	 * <h3><a name="locators"></a>Element Locators</h3>
	 * <p>
	 * Element Locators tell Selenium which HTML element a command refers to. Many
	 * commands require an Element Locator as a parameter.
	 * 
	 * We support the following strategies for locating elements:
	 * </p>
	 * <blockquote>
	 * <dl>
	 * <dt><strong>identifier</strong>=<em>id</em></dt>
	 * <dd>Select the element with the specified &#64;id attribute. If no match is
	 * found, select the first element whose &#64;name attribute is <em>id</em>.
	 * (This is normally the default; see below.)</dd>
	 * <dt><strong>id</strong>=<em>id</em></dt>
	 * <dd>Select the element with the specified &#64;id attribute.</dd>
	 * 
	 * <dt><strong>name</strong>=<em>name</em></dt>
	 * <dd>Select the first element with the specified &#64;name attribute.</dd>
	 * <dt><strong>dom</strong>=<em>javascriptExpression</em></dt>
	 * 
	 * <dd>
	 * 
	 * <dd>Find an element using JavaScript traversal of the HTML Document Object
	 * Model. DOM locators <em>must</em> begin with &quot;document.&quot;.
	 * <ul class="first last simple">
	 * <li>dom=document.forms['myForm'].myDropdown</li>
	 * <li>dom=document.images[56]</li>
	 * </ul>
	 * </dd>
	 * 
	 * </dd>
	 * 
	 * <dt><strong>xpath</strong>=<em>xpathExpression</em></dt>
	 * <dd>Locate an element using an XPath expression. XPath locators
	 * <em>must</em> begin with &quot;//&quot;.
	 * <ul class="first last simple">
	 * <li>xpath=//img[&#64;alt='The image alt text']</li>
	 * <li>xpath=//table[&#64;id='table1']//tr[4]/td[2]</li>
	 * 
	 * </ul>
	 * </dd>
	 * <dt><strong>link</strong>=<em>textPattern</em></dt>
	 * <dd>Select the link (anchor) element which contains text matching the
	 * specified <em>pattern</em>.
	 * <ul class="first last simple">
	 * <li>link=The link text</li>
	 * </ul>
	 * 
	 * </dd>
	 * </dl>
	 * </blockquote>
	 * <p>
	 * Without an explicit locator prefix, Selenium uses the following default
	 * strategies:
	 * </p>
	 * 
	 * <ul class="simple">
	 * <li><strong>dom</strong>, for locators starting with &quot;document.&quot;</li>
	 * <li><strong>xpath</strong>, for locators starting with &quot;//&quot;</li>
	 * <li><strong>identifier</strong>, otherwise</li>
	 * 
	 * </ul>
	 * <h3><a name="patterns"></a>String-match Patterns</h3>
	 * 
	 * <p>
	 * Various Pattern syntaxes are available for matching string values:
	 * </p>
	 * <blockquote>
	 * <dl>
	 * <dt><strong>glob:</strong><em>pattern</em></dt>
	 * <dd>Match a string against a "glob" (aka "wildmat") pattern. "Glob" is a
	 * kind of limited regular-expression syntax typically used in command-line
	 * shells. In a glob pattern, "*" represents any sequence of characters, and "?"
	 * represents any single character. Glob patterns match against the entire
	 * string.</dd>
	 * <dt><strong>regexp:</strong><em>regexp</em></dt>
	 * <dd>Match a string using a regular-expression. The full power of JavaScript
	 * regular-expressions is available.</dd>
	 * <dt><strong>exact:</strong><em>string</em></dt>
	 * 
	 * <dd>Match a string exactly, verbatim, without any of that fancy wildcard
	 * stuff.</dd>
	 * </dl>
	 * </blockquote>
	 * <p>
	 * If no pattern prefix is specified, Selenium assumes that it's a "glob"
	 * pattern.
	 * </p>
	 */
    this.browserbot = browserbot;
    this.optionLocatorFactory = new OptionLocatorFactory();
    this.page = function() {
        return browserbot.getCurrentPage();
    };
}

Selenium.createForFrame = function(frame) {
    return new Selenium(BrowserBot.createForFrame(frame));
};

Selenium.prototype.reset = function() {
	/**
   * Clear out all stored variables and select the null (starting) window
   */
    storedVars = new Object();
    this.browserbot.selectWindow("null");
};

Selenium.prototype.doClick = function(locator) {
	/**
   * Clicks on a link, button, checkbox or radio button. If the click action
   * causes a new page to load (like a link usually does), call
   * waitForPageToLoad.
   * 
   * @param locator an element locator
   * 
   */
    var element = this.page().findElement(locator);
    this.page().clickElement(element);
};

Selenium.prototype.doKeyPress = function(locator, keycode) {
	/**
   * Simulates a user pressing and releasing a key.
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @param keycode the numeric keycode of the key to be pressed, normally the
   *            ASCII value of that key.
   */
    var element = this.page().findElement(locator);
    this.page().keypressElement(element, keycode);
};
Selenium.prototype.doKeyDown = function(locator, keycode) {
	/**
   * Simulates a user pressing a key (without releasing it yet).
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @param keycode the numeric keycode of the key to be pressed, normally the
   *            ASCII value of that key.
   */
    var element = this.page().findElement(locator);
    this.page().keydownElement(element, keycode);
};
Selenium.prototype.doMouseOver = function(locator) {
	/**
   * Simulates a user hovering a mouse over the specified element.
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    var element = this.page().findElement(locator);
    this.page().mouseoverElement(element);
};
Selenium.prototype.doMouseDown = function(locator) {
	/**
   * Simulates a user pressing the mouse button (without releasing it yet) on
   * the specified element.
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    var element = this.page().findElement(locator);
    this.page().mousedownElement(element);
};

Selenium.prototype.doType = function(locator, value) {
	/**
   * Sets the value of an input field, as though you typed it in.
   * 
   * <p>Can also be used to set the value of combo boxes, check boxes, etc. In these cases,
   * value should be the value of the option selected, not the visible text.</p>
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @param value the value to type
   */
		// TODO fail if it can't be typed into.
    var element = this.page().findElement(locator);
    this.page().replaceText(element, value);
};

Selenium.prototype.findToggleButton = function(locator) {
    var element = this.page().findElement(locator);
    if (element.checked == null) {
        Assert.fail("Element " + locator + " is not a toggle-button.");
    }
    return element;
}

Selenium.prototype.doCheck = function(locator) {
	/**
   * Check a toggle-button (checkbox/radio)
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    this.findToggleButton(locator).checked = true;
};

Selenium.prototype.doUncheck = function(locator) {
	/**
   * Uncheck a toggle-button (checkbox/radio)
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    this.findToggleButton(locator).checked = false;
};

Selenium.prototype.doSelect = function(locator, optionLocator) {
	/**
   * Select an option from a drop-down using an option locator.
   * 
   * <p>
   * Option locators provide different ways of specifying options of an HTML
   * Select element (e.g. for selecting a specific option, or for asserting
   * that the selected option satisfies a specification). There are several
   * forms of Select Option Locator.
   * </p>
   * <dl>
   * <dt><strong>label</strong>=<em>labelPattern</em></dt>
   * <dd>matches options based on their labels, i.e. the visible text. (This
   * is the default.)
   * <ul class="first last simple">
   * <li>label=regexp:^[Oo]ther</li>
   * </ul>
   * </dd>
   * <dt><strong>value</strong>=<em>valuePattern</em></dt>
   * <dd>matches options based on their values.
   * <ul class="first last simple">
   * <li>value=other</li>
   * </ul>
   * 
   * 
   * </dd>
   * <dt><strong>id</strong>=<em>id</em></dt>
   * 
   * <dd>matches options based on their ids.
   * <ul class="first last simple">
   * <li>id=option1</li>
   * </ul>
   * </dd>
   * <dt><strong>index</strong>=<em>index</em></dt>
   * <dd>matches an option based on its index (offset from zero).
   * <ul class="first last simple">
   * 
   * <li>index=2</li>
   * </ul>
   * </dd>
   * </dl>
   * <p>
   * Without a prefix, the default behaviour is to only match on labels.
   * </p>
   * 
   * 
   * @param locator an <a href="#locators">element locator</a> identifying a drop-down menu
   * @param optionLocator an option locator (a label by default)
   */
    var element = this.page().findElement(locator);
    if (!("options" in element)) {
        throw new SeleniumError("Specified element is not a Select (has no options)");
    }
    var locator = this.optionLocatorFactory.fromLocatorString(optionLocator);
    var option = locator.findOption(element);
    this.page().selectOption(element, option);
};

Selenium.prototype.doSubmit = function(formLocator) {
	/**
   * Submit the specified form. This is particularly useful for forms without
   * submit buttons, e.g. single-input "Search" forms.
   * 
   * @param formLocator an <a href="#locators">element locator</a> for the form you want to submit
   */
    var form = this.page().findElement(formLocator);
    if (!form.onsubmit || form.onsubmit()) {
        form.submit();
    }
};

Selenium.prototype.doOpen = function(url) {
	/**
   * Opens an URL in the test frame. This accepts both relative and absolute
   * URLs.
   * 
   * <em>Note</em>: The URL must be on the same domain as the runner HTML
   * due to security restrictions in the browser (Same Origin Policy). If you
   * need to open an URL on another domain, use the Selenium Server to start a
   * new browser session on that domain.
   * 
   * @param url the URL to open; may be relative or absolute
   */
    this.browserbot.openLocation(url);
    return SELENIUM_PROCESS_WAIT;
};

Selenium.prototype.doSelectWindow = function(windowID) {
	/**
   * Selects a popup window; once a popup window has been selected, all
   * commands go to that window. To select the main window again, use "null"
   * as the target.
   * 
   * @param windowID the JavaScript window ID of the window to select
   */
    this.browserbot.selectWindow(windowID);
};

Selenium.prototype.doChooseCancelOnNextConfirmation = function() {
	/**
   * Instructs Selenium to click "Cancel" on the next JavaScript confirmation
   * dialog to be raised. By default, the confirm function will return true,
   * having the same effect as manually clicking OK. After running this
   * command, the next confirmation will behave as if the user had clicked
   * Cancel.
   * 
   */
    this.browserbot.cancelNextConfirmation();
};


Selenium.prototype.doAnswerOnNextPrompt = function(answer) {
	/**
   * Instructs Selenium to return the specified answer string in response to
   * the next JavaScript prompt [window.prompt()].
   * 
   * 
   * @param answer the answer to give in response to the prompt pop-up
   */
    this.browserbot.setNextPromptResult(answer);
};

Selenium.prototype.doGoBack = function() {
    /**
     * Simulates the user clicking the "back" button on their browser.
     * 
     */
    this.page().goBack();
};

Selenium.prototype.doClose = function() {
	/**
   * Simulates the user clicking the "close" button in the titlebar of a popup
   * window or tab.
   */
    this.page().close();
};

Selenium.prototype.doFireEvent = function(locator, event) {
	/**
   * Explicitly simulate an event, to trigger the corresponding &quot;on<em>event</em>&quot;
   * handler.
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @param event the event name, e.g. "focus" or "blur"
   */
    var element = this.page().findElement(locator);
    triggerEvent(element, event, false);
};

Selenium.prototype.getAlert = function() {
	/**
   * Retrieves the message of a javascript alert generated during the previous action, or fail if there were no alerts.
   * 
   * <p>Getting an alert has the same effect as manually clicking OK. If an
   * alert is generated but you do not get/verify it, the next Selenium action
   * will fail.</p>
   * 
   * <p>NOTE: under Selenium, javascript alerts will NOT pop up a visible alert
   * dialog.</p>
   * 
   * <p>NOTE: Selenium does NOT support javascript alerts that are generated in a
   * page's onload() event handler. In this case a visible dialog WILL be
   * generated and Selenium will hang until someone manually clicks OK.</p>
   * @return string The message of the most recent JavaScript alert
   */
    if (!this.browserbot.hasAlerts()) {
        Assert.fail("There were no alerts");
    }
    return this.browserbot.getNextAlert();
};
Selenium.prototype.getAlert.dontCheckAlertsAndConfirms = true;

Selenium.prototype.getConfirmation = function() {
	/**
   * Retrieves the message of a javascript confirmation dialog generated during
   * the previous action.
   * 
   * <p>
   * By default, the confirm function will return true, having the same effect
   * as manually clicking OK. This can be changed by prior execution of the
   * chooseCancelOnNextConfirmation command. If an confirmation is generated
   * but you do not get/verify it, the next Selenium action will fail.
   * </p>
   * 
   * <p>
   * NOTE: under Selenium, javascript confirmations will NOT pop up a visible
   * dialog.
   * </p>
   * 
   * <p>
   * NOTE: Selenium does NOT support javascript confirmations that are
   * generated in a page's onload() event handler. In this case a visible
   * dialog WILL be generated and Selenium will hang until you manually click
   * OK.
   * </p>
   * 
   * @return string the message of the most recent JavaScript confirmation dialog
   */
    if (!this.browserbot.hasConfirmations()) {
        Assert.fail("There were no confirmations");
    }
    return this.browserbot.getNextConfirmation();
};
Selenium.prototype.getConfirmation.dontCheckAlertsAndConfirms = true;
 
Selenium.prototype.getPrompt = function() {
	/**
   * Retrieves the message of a javascript question prompt dialog generated during
   * the previous action.
   * 
   * <p>Successful handling of the prompt requires prior execution of the
   * answerOnNextPrompt command. If a prompt is generated but you
   * do not get/verify it, the next Selenium action will fail.</p>
   * 
   * <p>NOTE: under Selenium, javascript prompts will NOT pop up a visible
   * dialog.</p>
   * 
   * <p>NOTE: Selenium does NOT support javascript prompts that are generated in a
   * page's onload() event handler. In this case a visible dialog WILL be
   * generated and Selenium will hang until someone manually clicks OK.</p>
   * @return string the message of the most recent JavaScript question prompt
   */
    if (! this.browserbot.hasPrompts()) {
        Assert.fail("There were no prompts");
    }
    return this.browserbot.getNextPrompt();
};

Selenium.prototype.getAbsoluteLocation = function() {
	/** Gets the absolute URL of the current page.
   * 
   * @return string the absolute URL of the current page
   */
    return this.page().location;
};

Selenium.prototype.assertLocation = function(expectedLocation) {
	/**
   * Verify the location of the current page ends with the expected location.
   * If an URL querystring is provided, this is checked as well.
   * @param expectedLocation the location to match
   */
    var docLocation = this.page().location;
    var searchPos = expectedLocation.lastIndexOf('?');

    if (searchPos == -1) {
        Assert.matches('*' + expectedLocation, docLocation.pathname);
    }
    else {
        var expectedPath = expectedLocation.substring(0, searchPos);
        Assert.matches('*' + expectedPath, docLocation.pathname);

        var expectedQueryString = expectedLocation.substring(searchPos);
        Assert.equals(expectedQueryString, docLocation.search);
    }
};

Selenium.prototype.getTitle = function() {
	/** Gets the title of the current page.
   * 
   * @return string the title of the current page
   */
    return this.page().title();
};


Selenium.prototype.getBodyText = function() {
	/**
	 * Get the entire text of the page.
	 * @return string the entire text of the page
	 */
    return this.page().bodyText();
};


Selenium.prototype.getValue = function(locator) {
  /**
   * Gets the (whitespace-trimmed) value of an input field (or anything else with a value parameter).
   * For checkbox/radio elements, the value will be "on" or "off" depending on
   * whether the element is checked or not.
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @return string the element value, or "on/off" for checkbox/radio elements
   */
    var element = this.page().findElement(locator)
    return getInputValue(element).trim();
}

Selenium.prototype.getText = function(locator) {
	/**
   * Gets the text of an element. This works for any element that contains
   * text. This command uses either the textContent (Mozilla-like browsers) or
   * the innerText (IE-like browsers) of the element, which is the rendered
   * text shown to the user.
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @return string the text of the element
   */
    var element = this.page().findElement(locator);
    return getText(element).trim();
};

Selenium.prototype.getEval = function(script) {
	/** Gets the result of evaluating the specified JavaScript snippet.  The snippet may 
   * have multiple lines, but only the result of the last line will be returned.
   * 
   * <p>Note that, by default, the snippet will be run in the runner's test window, not in the window
   * of your application.  To get the window of your application, you can use
   * the JavaScript snippet <code>selenium.browserbot.getCurrentWindow()</code>, and then
   * run your JavaScript in there.</p>
   * 
   * @param script the JavaScript snippet to run
   * @return string the results of evaluating the snippet
   */
    try {
    	return eval(script);
    } catch (e) {
    	throw new SeleniumError("Threw an exception: " + e.message);
    }
};

Selenium.prototype.getChecked = function(locator) {
	/**
   * Get whether a toggle-button (checkbox/radio) is checked.  Fails if the specified element doesn't exist or isn't a toggle-button.
   * @param locator an <a href="#locators">element locator</a> pointing to a checkbox or radio button
   * @return string either "true" or "false" depending on whether the checkbox is checked
   */
    var element = this.page().findElement(locator);
    if (element.checked == null) {
        throw new SeleniumError("Element " + locator + " is not a toggle-button.");
    }
    return element.checked;
};

Selenium.prototype.getTable = function(tableCellAddress) {
	/**
   * Gets the text from a cell of a table. The cellAddress syntax
   * tableLocator.row.column, where row and column start at 0.
   * 
   * @param tableCellAddress a cell address, e.g. "foo.1.4"
   * @return string the text from the specified cell
   */
    // This regular expression matches "tableName.row.column"
    // For example, "mytable.3.4"
    pattern = /(.*)\.(\d+)\.(\d+)/;

    if(!pattern.test(tableCellAddress)) {
        throw new SeleniumError("Invalid target format. Correct format is tableName.rowNum.columnNum");
    }

    pieces = tableCellAddress.match(pattern);

    tableName = pieces[1];
    row = pieces[2];
    col = pieces[3];

    var table = this.page().findElement(tableName);
    if (row > table.rows.length) {
        Assert.fail("Cannot access row " + row + " - table has " + table.rows.length + " rows");
    }
    else if (col > table.rows[row].cells.length) {
        Assert.fail("Cannot access column " + col + " - table row has " + table.rows[row].cells.length + " columns");
    }
    else {
        actualContent = getText(table.rows[row].cells[col]);
        return actualContent.trim();
    }
};

Selenium.prototype.assertSelected = function(locator, optionLocator) {
	/**
   * Verifies that the selected option of a drop-down satisfies the optionSpecifier.
   * 
   * <p>See the select command for more information about option locators.</p>
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @param optionLocator an option locator, typically just an option label (e.g. "John Smith")
   */
    var element = this.page().findElement(locator);
    var locator = this.optionLocatorFactory.fromLocatorString(optionLocator);
    locator.assertSelected(element);
};


Selenium.prototype.getSelectOptions = function(locator) {
	/** Gets all option labels in the specified select drop-down.
   * 
   * @param locator an <a href="#locators">element locator</a>
   * @return string[] an array of all option labels in the specified select drop-down
   */
    var element = this.page().findElement(locator);

	var selectOptions = "";

    for (var i = 0; i < element.options.length; i++) {
    	var option = element.options[i].text.replace(/,/g, "\\,");
    	selectOptions += option;
    	if (i != element.options.length-1) selectOptions += ",";
    }
    return selectOptions;
};


Selenium.prototype.getAttribute = function(attributeLocator) {
	/**
   * Gets the value of an element attribute.
   * @param attributeLocator an element locator followed by an @ sign and then the name of the attribute, e.g. "foo@bar"
   * @return string the value of the specified attribute
   */
    return this.page().findAttribute(attributeLocator);
};

Selenium.prototype.assertTextPresent = function(pattern) {
	/**
   * Verifies that the specified text pattern appears somewhere on the rendered page shown to the user.
   * @param pattern a <a href="#patterns">pattern</a> to match with the text of the page
   */
   // TODO support patterns! this does literal matching right now
    var allText = this.page().bodyText();

    if(allText == "") {
        Assert.fail("Page text not found");
    } else if(allText.indexOf(pattern) == -1) {
        Assert.fail("'" + pattern + "' not found in page text.");
    }
};

Selenium.prototype.assertTextNotPresent = function(pattern) {
	/**
   * Verifies that the specified text pattern does NOT appear anywhere on the rendered page.
   * @param pattern a <a href="#patterns">pattern</a> to match with the text of the page
   */
    var allText = this.page().bodyText();

    if(allText == "") {
        Assert.fail("Page text not found");
    } else if(allText.indexOf(pattern) != -1) {
        Assert.fail("'" + pattern + "' was found in page text.");
    }
};

Selenium.prototype.assertElementPresent = function(locator) {
	/**
   * Verifies that the specified element is somewhere on the page.
   * @param locator an <a href="#locators">element locator</a>
   */
    try {
        this.page().findElement(locator);
    } catch (e) {
        Assert.fail("Element " + locator + " not found.");
    }
};

Selenium.prototype.assertElementNotPresent = function(locator) {
	/**
   * Verifies that the specified element is NOT on the page.
   * @param locator an <a href="#locators">element locator</a>
   */
    try {
        this.page().findElement(locator);
    }
    catch (e) {
        return;
    }
    Assert.fail("Element " + locator + " found.");
};

Selenium.prototype.assertVisible = function(locator) {
	/**
   * Verifies that the specified element is both present and visible. An
   * element can be rendered invisible by setting the CSS "visibility"
   * property to "hidden", or the "display" property to "none", either for the
   * element itself or one if its ancestors.
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    var element;
    try {
        element = this.page().findElement(locator);
    } catch (e) {
        Assert.fail("Element " + locator + " not present.");
    }
    if (! this.isVisible(element)) {
        Assert.fail("Element " + locator + " not visible.");
    }
};

Selenium.prototype.assertNotVisible = function(locator) {
	/**
   * Verifies that the specified element is NOT visible; elements that are
   * simply not present are also considered invisible.
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    var element;
    try {
        element = this.page().findElement(locator);
    } catch (e) {
        return;
    }
    if (this.isVisible(element)) {
        Assert.fail("Element " + locator + " is visible.");
    }
};

Selenium.prototype.isVisible = function(element) {
    var visibility = this.findEffectiveStyleProperty(element, "visibility");
    var isDisplayed = this.isDisplayed(element);
    return (visibility != "hidden" && isDisplayed);
};

Selenium.prototype.findEffectiveStyleProperty = function(element, property) {
    var effectiveStyle = this.findEffectiveStyle(element);
    var propertyValue = effectiveStyle[property];
    if (propertyValue == 'inherit' && element.parentNode.style) {
        return this.findEffectiveStyleProperty(element.parentNode, property);
    }
    return propertyValue;
};

Selenium.prototype.isDisplayed = function(element) {
    var display = this.findEffectiveStyleProperty(element, "display");
    if (display == "none") return false;
    if (element.parentNode.style) {
        return this.isDisplayed(element.parentNode);
    }
    return true;
};

Selenium.prototype.findEffectiveStyle = function(element) {
    if (element.style == undefined) {
        return undefined; // not a styled element
    }
    var window = this.browserbot.getContentWindow();
    if (window.getComputedStyle) { 
        // DOM-Level-2-CSS
        return window.getComputedStyle(element, null);
    }
    if (element.currentStyle) {
        // non-standard IE alternative
        return element.currentStyle;
        // TODO: this won't really work in a general sense, as
        //   currentStyle is not identical to getComputedStyle()
        //   ... but it's good enough for "visibility"
    }
    throw new SeleniumError("cannot determine effective stylesheet in this browser");
};

Selenium.prototype.assertEditable = function(locator) {
	/**
   * Verifies that the specified element is editable, ie. it's an input
   * element, and hasn't been disabled.
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    var element = this.page().findElement(locator);
    if (element.value == undefined) {
        Assert.fail("Element " + locator + " is not an input.");
    }
    if (element.disabled) {
        Assert.fail("Element " + locator + " is disabled.");
    }
};

Selenium.prototype.assertNotEditable = function(locator) {
	/**
   * Verifies that the specified element is NOT editable, ie. it's NOT an
   * input element, or has been disabled.
   * 
   * @param locator an <a href="#locators">element locator</a>
   */
    var element = this.page().findElement(locator);
    if (element.value == undefined) {
        return; // not an input
    }
    if (element.disabled == false) {
        Assert.fail("Element " + locator + " is editable.");
    }
};

Selenium.prototype.getAllButtons = function() {
	/** Returns the IDs of all buttons on the page.
   * 
   * <p>If a given button has no ID, it will appear as "" in this array.</p>
   * 
   * @return string[] the IDs of all buttons on the page
   */
   return this.page().getAllButtons();
};

Selenium.prototype.getAllLinks = function() {
	/** Returns the IDs of all links on the page.
   * 
   * <p>If a given link has no ID, it will appear as "" in this array.</p>
   * 
   * @return string[] the IDs of all links on the page
   */
   return this.page().getAllLinks();
};

Selenium.prototype.getAllFields = function() {
	/** Returns the IDs of all input fields on the page.
   * 
   * <p>If a given field has no ID, it will appear as "" in this array.</p>
   * 
   * @return string[] the IDs of all field on the page
   */
   return this.page().getAllFields();
};

Selenium.prototype.doSetContext = function(context, logLevelThreshold) {
	/**
   * Writes a message to the status bar and adds a note to the browser-side
   * log.
   * 
   * <p>If logLevelThreshold is specified, set the threshold for logging
   * to that level (debug, info, warn, error).</p>
   * 
   * <p>(Note that the browser-side logs will <i>not</i> be sent back to the
   * server, and are invisible to the Client Driver.)</p>
   * 
   * @param context
   *            the message to be sent to the browser
   * @param logLevelThreshold one of "debug", "info", "warn", "error", sets the threshold for browser-side logging
   */
    if  (logLevelThreshold==null || logLevelThreshold=="") {
    	return this.page().setContext(context);
    }
    return this.page().setContext(context, logLevelThreshold);
};

Selenium.prototype.getExpression = function(expression) {
	/**
	 * Return the specified expression.
	 *
	 * <p>This is useful because of JavaScript preprocessing.
	 * It is used to generate commands like assertExpression and storeExpression.</p>
	 * 
	 * @param expression the value to return
	 * @return string the value passed in
	 */
	return expression;
}

Selenium.prototype.doWaitForCondition = function(script, timeout) {
	/**
   * Runs the specified JavaScript snippet repeatedly until it evaluates to "true".
   * The snippet may have multiple lines, but only the result of the last line
   * will be considered.
   * 
   * <p>Note that, by default, the snippet will be run in the runner's test window, not in the window
   * of your application.  To get the window of your application, you can use
   * the JavaScript snippet <code>selenium.browserbot.getCurrentWindow()</code>, and then
   * run your JavaScript in there</p>
   * @param script the JavaScript snippet to run
   * @param timeout a timeout in milliseconds, after which this command will return with an error
   */
    if (isNaN(timeout)) {
    	throw new SeleniumError("Timeout is not a number: " + timeout);
    }
    
    testLoop.waitForCondition = function () {
        return eval(script);
    };
    
    testLoop.waitForConditionStart = new Date().getTime();
    testLoop.waitForConditionTimeout = timeout;
};

Selenium.prototype.doWaitForPageToLoad = function(timeout) {
	/**
   * Waits for a new page to load.
   * 
   * <p>You can use this command instead of the "AndWait" suffixes, "clickAndWait", "selectAndWait", "typeAndWait" etc.
   * (which are only available in the JS API).</p>
   * 
   * <p>Selenium constantly keeps track of new pages loading, and sets a "newPageLoaded"
   * flag when it first notices a page load.  Running any other Selenium command after
   * turns the flag to false.  Hence, if you want to wait for a page to load, you must
   * wait immediately after a Selenium command that caused a page-load.</p>
   * @param timeout a timeout in milliseconds, after which this command will return with an error
   */
    this.doWaitForCondition("selenium.browserbot.isNewPageLoaded()", timeout);
};

/**
 * Evaluate a parameter, performing javascript evaluation and variable substitution.
 * If the string matches the pattern "javascript{ ... }", evaluate the string between the braces.
 */
Selenium.prototype.preprocessParameter = function(value) {
    var match = value.match(/^javascript\{(.+)\}$/);
    if (match && match[1]) {
        return eval(match[1]).toString();
    }
    return this.replaceVariables(value);
};

/*
 * Search through str and replace all variable references ${varName} with their
 * value in storedVars.
 */
Selenium.prototype.replaceVariables = function(str) {
    var stringResult = str;

    // Find all of the matching variable references
    var match = stringResult.match(/\$\{\w+\}/g);
    if (!match) {
        return stringResult;
    }

    // For each match, lookup the variable value, and replace if found
    for (var i = 0; match && i < match.length; i++) {
        var variable = match[i]; // The replacement variable, with ${}
        var name = variable.substring(2, variable.length - 1); // The replacement variable without ${}
        var replacement = storedVars[name];
        if (replacement != undefined) {
            stringResult = stringResult.replace(variable, replacement);
        }
    }
    return stringResult;
};


/**
 *  Factory for creating "Option Locators".
 *  An OptionLocator is an object for dealing with Select options (e.g. for
 *  finding a specified option, or asserting that the selected option of 
 *  Select element matches some condition.
 *  The type of locator returned by the factory depends on the locator string:
 *     label=<exp>  (OptionLocatorByLabel)
 *     value=<exp>  (OptionLocatorByValue)
 *     index=<exp>  (OptionLocatorByIndex)
 *     id=<exp>     (OptionLocatorById)
 *     <exp> (default is OptionLocatorByLabel).
 */
function OptionLocatorFactory() {
}

OptionLocatorFactory.prototype.fromLocatorString = function(locatorString) {
    var locatorType = 'label';
    var locatorValue = locatorString;
    // If there is a locator prefix, use the specified strategy
    var result = locatorString.match(/^([a-zA-Z]+)=(.*)/);
    if (result) {
        locatorType = result[1];
        locatorValue = result[2];
    }
    if (this.optionLocators == undefined) {
        this.registerOptionLocators();
    }
    if (this.optionLocators[locatorType]) {
        return new this.optionLocators[locatorType](locatorValue);
    }
    throw new SeleniumError("Unkown option locator type: " + locatorType);
};

/**
 * To allow for easy extension, all of the option locators are found by
 * searching for all methods of OptionLocatorFactory.prototype that start
 * with "OptionLocatorBy".
 * TODO: Consider using the term "Option Specifier" instead of "Option Locator".
 */
OptionLocatorFactory.prototype.registerOptionLocators = function() {
    this.optionLocators={};
    for (var functionName in this) {
      var result = /OptionLocatorBy([A-Z].+)$/.exec(functionName);
      if (result != null) {
          var locatorName = result[1].lcfirst();
          this.optionLocators[locatorName] = this[functionName];
      }
    }
};

/**
 *  OptionLocator for options identified by their labels.
 */
OptionLocatorFactory.prototype.OptionLocatorByLabel = function(label) {
    this.label = label;
    this.labelMatcher = new PatternMatcher(this.label);
    this.findOption = function(element) {
        for (var i = 0; i < element.options.length; i++) {
            if (this.labelMatcher.matches(element.options[i].text)) {
                return element.options[i];
            }
        }
        throw new SeleniumError("Option with label '" + this.label + "' not found");
    };

    this.assertSelected = function(element) {
        var selectedLabel = element.options[element.selectedIndex].text;
        Assert.matches(this.label, selectedLabel);
    };
};

/**
 *  OptionLocator for options identified by their values.
 */
OptionLocatorFactory.prototype.OptionLocatorByValue = function(value) {
    this.value = value;
    this.valueMatcher = new PatternMatcher(this.value);
    this.findOption = function(element) {
        for (var i = 0; i < element.options.length; i++) {
            if (this.valueMatcher.matches(element.options[i].value)) {
                return element.options[i];
            }
        }
        throw new SeleniumError("Option with value '" + this.value + "' not found");
    };

    this.assertSelected = function(element) {
        var selectedValue = element.options[element.selectedIndex].value;
        Assert.matches(this.value, selectedValue);
    };
};

/**
 *  OptionLocator for options identified by their index.
 */
OptionLocatorFactory.prototype.OptionLocatorByIndex = function(index) {
    this.index = Number(index);
    if (isNaN(this.index) || this.index < 0) {
        throw new SeleniumError("Illegal Index: " + index);
    }

    this.findOption = function(element) {
        if (element.options.length <= this.index) {
            throw new SeleniumError("Index out of range.  Only " + element.options.length + " options available");
        }
        return element.options[this.index];
    };

    this.assertSelected = function(element) {
        Assert.equals(this.index, element.selectedIndex);
    };
};

/**
 *  OptionLocator for options identified by their id.
 */
OptionLocatorFactory.prototype.OptionLocatorById = function(id) {
    this.id = id;
    this.idMatcher = new PatternMatcher(this.id);
    this.findOption = function(element) {
        for (var i = 0; i < element.options.length; i++) {
            if (this.idMatcher.matches(element.options[i].id)) {
                return element.options[i];
            }
        }
        throw new SeleniumError("Option with id '" + this.id + "' not found");
    };

    this.assertSelected = function(element) {
        var selectedId = element.options[element.selectedIndex].id;
        Assert.matches(this.id, selectedId);
    };
};


