PRE-REQ:
1. Install node.js from https://nodejs.org/en/ into your machine.
2. Verify versions by running commands below in terminal after installing Node.js. npm is the package manager for Node.js

```node -v```

```npm -v```

3. If you are unable to view the versions above in IDE's Windows Powershell, reopen the IDE with Admin.
4. In your project directory, run ```npm install``` to install Cypress.
5. If there are installation issues, delete 'package-lock.json', and try again.

RUN INSTRUCTIONS:
1. In the terminal of your IDE (or machine), ensure you are in project directory.
2. Run the command below to execute the test:

```sh
npx cypress run --browser chrome --spec "cypress/integration/ProfilePage/*" --headed
```

3. --headed means the browser will launch and run on foreground.
4. In cypress.json file, the video option is set as false to save time and space. If true, a video recording of the test run will be auto-generated.
5. 1st happy case is uploading a PDF CV and verifying user is notified to review the updated Experience and Skills page.
6. 2nd and 3rd test case are negative scenarios where the Experience and Skills page should not be updated, and certain elements from happy case
    should not exist here.


PLUGINS:
1. "mochawesome-reporter" plugin is installed manually to produce a custom HTML report. 
2. List of dependencies/plugins can be viewed in package.json.

WHY CYPRESS:
1. Every tool has its advantages and limitations. In this scenario, Cypress performs well in web UI in-browser testing.
2. Snapshots are captured in every test step; User can hover the commands, and view what happened in that step through the browser.
3. Tests are also executed in real time as the user is writing the test. Each time user makes a change to the script, Cypress reloads and runs again.

FINDINGS: 
1. Biggest advantage over Selenium will be the ease of coding and maintenance. User has no need for creating additional classes (or files) for methods, 
    functions, pages and even declaring element’s selectors. Additional plugins or builders are also not required.
2. In this case, all the codings for the test are written in only one file: uploadCV.spec.js (integration > ProfilePage folder). 
3. As the test framework is in mochaJS, all the assertions are already built-in within the Cypress commands.
4. After written the first positive test case, the negative tests are quite straightforward; Cypress has assertions that cater for elements that shouldn’t exist.
5. There is no need to implement sleep threads, unlike Selenium, which tends to fail if the test platform slows down. 
6. However, an explicit wait time is added in the test, as the document upload time could take up to 20 seconds to complete.

LIMITATIONS: 
1. There was a challenge in uploading the docs from Cypress to the Shortlyster website. Somehow the uploaded docs have encoding and MIME issues,
    resulting in uploaded docs to have no contents. Despite Cypress has a command to upload documents (.attachFile), it could not work. After some time
    of research, turns out Cypress has released a new, updated command that manages to resolve this issue (.selectFile).
2. Relating to above, many documentations and guides online are still not up-to-date. Cypress still has bugs and limitations in some real 
   test functions. 
3. Best coding practice in Cypress will be to use element’s unique IDs and identifiable names. However, many elements in Shortlyster have neither of those, thus
   it is dependent on developers to put this into thought while creating the website.
