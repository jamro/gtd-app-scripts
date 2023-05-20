# Getting Things Done with Google App Scripts

It is a tool designed to assist in implementing the "Getting Things Done" (GTD) methodology. Leveraging the power of Google App Scripts, this project aims to provide a streamlined workflow for organizing and managing tasks, projects, and goals according to the GTD principles.

## Getting Things Done (GTD):
Getting Things Done (GTD), is a productivity methodology developed by David Allen. It provides a systematic approach to organizing tasks and achieving greater efficiency and clarity in work and personal life. GTD emphasizes capturing all tasks and ideas, clarifying their purpose, organizing them into actionable lists, and regularly reviewing and engaging with the lists.

![GTD Flow](docs/gtd_process.png)

Read more [here](https://en.wikipedia.org/wiki/Getting_Things_Done).

## Google App Scripts:
Google App Scripts is a cloud-based scripting platform provided by Google, allowing users to automate tasks and extend the functionality of various Google services, such as Google Sheets, Docs, and Gmail. With App Scripts, developers can create custom functions, trigger events, and build applications that interact with Google services.

Read more [here](https://developers.google.com/apps-script/).

## Install

1. Clone repo 
   - `git clone https://github.com/jamro/gtd-app-scripts.git`
   - `cd gtd-app-scripts`
2. Enable Google App Script API
   - go to https://script.google.com
   - Set `Settings` > `Google Apps Script API` to **On**
3. Initialize project `npm run bootstrap`
4. Install App Script and deploy web app
   - go to https://script.google.com
   - open `gtd-app-scripts` > `app.gs`
   - run `install()` function
   - click `Deploy` > `New deployment` > `Select Type` > `Web app` > `Deploy`
   - authorize access
   - open link from `Web app` > `URL`
5. (Optional) Open test deployment
   - click `Deploy` > `Test deployments`
   - open link from `Web app` > `URL`