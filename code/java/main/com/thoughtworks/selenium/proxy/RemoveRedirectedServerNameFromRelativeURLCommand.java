/*
 * Copyright 2004 ThoughtWorks, Inc.
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
package com.thoughtworks.selenium.proxy;

/**
 * This command fixes the URI for any resources that were requested with a relative address.
 * @version $Id: RemoveRedirectedServerNameFromRelativeURLCommand.java,v 1.2 2004/11/15 18:35:01 ahelleso Exp $
 */
public class RemoveRedirectedServerNameFromRelativeURLCommand implements RequestModificationCommand {
    public static int start = SeleniumHTTPRequest.SELENIUM_REDIRECT_PROTOCOL.length();
    public static String textToReplace = SeleniumHTTPRequest.SELENIUM_REDIRECT_PROTOCOL +
                                                 SeleniumHTTPRequest.SELENIUM_REDIRECT_SERVER;

    /**
     * @see RequestModificationCommand#execute(HTTPRequest)
     */
    public void execute(HTTPRequest httpRequest) {
        String uri = httpRequest.getUri();
        httpRequest.setUri(uri.replaceFirst(textToReplace, ""));
    }
}