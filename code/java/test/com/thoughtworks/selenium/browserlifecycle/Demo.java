/*
 * Copyright 2004 ThoughtWorks, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *  
 */
package com.thoughtworks.selenium.browserlifecycle;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.thoughtworks.selenium.browserlifecycle.coordinate.Audible;
import com.thoughtworks.selenium.browserlifecycle.coordinate.Listener;
import com.thoughtworks.selenium.browserlifecycle.coordinate.SignalWaiter;
import com.thoughtworks.selenium.browserlifecycle.coordinate.Waiter;
import com.thoughtworks.selenium.browserlifecycle.session.BrowserSession;
import com.thoughtworks.selenium.browserlifecycle.session.SequentialMultipleBrowserSession;
import com.thoughtworks.selenium.browserlifecycle.session.StoppableBrowserSession;
import com.thoughtworks.selenium.browserlifecycle.window.BrowserSpawner;
import com.thoughtworks.selenium.browserlifecycle.window.SpecifiedPathBrowserSpawner;

public class Demo {

	static class DemoServer implements Audible, Runnable {

		List _listeners = new ArrayList();

		public void run() {

			//Wait for a bit before triggering the event - in the real world
			// this would be a real event

			try {
				Thread.sleep(5000); // 
			} catch (InterruptedException e) {
				e.printStackTrace();
			}

			synchronized (_listeners) {

				for (Iterator iter = _listeners.iterator(); iter.hasNext();) {
					Listener listener = (Listener) iter.next();
					listener.signal();

				}
			}
		}

		public void addListener(Listener listener) {
			synchronized (_listeners) {
				_listeners.add(listener);
			}
		}

	}
	

	public static void main(String[] args) throws LifeCycleException {

		long timeout = 10000;
		String url = "http://www.google.com/search?q=Selenium";
		
		DemoServer signalingServer = new DemoServer();
  
		BrowserSpawner firefoxSpawner = new SpecifiedPathBrowserSpawner(
				"c:\\program files\\Mozilla Firefox\\firefox.exe");
		BrowserSpawner ieSpawner = new SpecifiedPathBrowserSpawner(
				"c:\\program files\\internet explorer\\iexplore.exe");

		Waiter firefoxWaiter = new SignalWaiter(signalingServer);
		Waiter ieWaiter = new SignalWaiter(signalingServer);
		
		BrowserSession firefoxSession = new StoppableBrowserSession(
				firefoxSpawner, firefoxWaiter);
		BrowserSession ieSession = new StoppableBrowserSession(ieSpawner,
				ieWaiter);

		BrowserSession[] sessions = new BrowserSession[] { firefoxSession,
				ieSession };
		BrowserSession multipleSession = new SequentialMultipleBrowserSession(
				sessions);

		Thread serverThread = new Thread(signalingServer);
		serverThread.start();

		multipleSession.run(url, timeout);

		// Expect that this will result in :
		//         - firefox window for 5 secs before it is killed by
		// notification from the demo server
		//         - IE window for 10 secs before killed by timeout
		// if thread timing is off, then both may time out

	}
}