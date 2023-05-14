# Getting Things Done with Google App Scripts


## Install

1. Clone repo 
-- `git clone https://github.com/jamro/gtd-app-scripts.git`
-- `cd gtd-app-scripts`
2. Enable Google App Script API
 -- go to https://script.google.com
 -- Set `Settings` > `Google Apps Script API` to **On**
3. Initialize project `npm run bootstrap`
4. Install App Script and deploy web app
 -- go to https://script.google.com
 -- open `gtd-app-scripts` > `app.gs`
 -- run `install()` function
 -- click `Deploy` > `New deployment` > `Select Type` > `Web app` > `Deploy`
 -- authorize access
 -- open link from `Web app` > `URL`
 5. (Optional) Open test deployment
 -- click `Deploy` > `Test deployments`
 -- open link from `Web app` > `URL`