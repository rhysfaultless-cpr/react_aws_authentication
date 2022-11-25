# react_aws_authentication

## Link to the deployed website:

- [_production_ branch](https://production.d13gc4trt27el4.amplifyapp.com/)

## Overview of the deployed website, and its purpose

This repository uses a [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) example website.
The main difference between Docusaurus's example, and this repository's deployed site, is that this repository includes an authentication sign-in using Amazon Web Services Cognito.
Cognito has tools for you to manage the database of User information, and connect this to your React React based website.
The site itself is deployed using [Amazon Web Services Amplify](https://create-react-app.dev/docs/deployment/#aws-amplify).
There are other React deployment options like [Netlify](https://create-react-app.dev/docs/deployment/#netlify), [GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages), [Heroku](https://create-react-app.dev/docs/deployment/#heroku), and [Vercel](https://create-react-app.dev/docs/deployment/#vercel).
For our use case, AWS was ideal for the balance between; low cost, deploying multiple branches, and an ecosystem of other features like Authentication.

Note, this guide is only relevant to you if you are using AWS's Cognito and Amplify for your React website.

### Walkthrough of this website

1. Go to the deployed site at https://production.d13gc4trt27el4.amplifyapp.com/
2. You will be asked to sign-in or create a new account.

    <center><img src="/public/readme_images/readme_1.png" width="300"/></center>

    I have created three accounts, which you are welcome to sign-in with for the demonstration:
    
    |   Username   | Password  |
    | :----------- | :-------- |
    | cpr_employee | clearpath |
    | cpr_reseller | clearpath |
    | cpr_customer | clearpath |

3. As a website administrator, I can go to our AWS account's console at https://us-east-2.console.aws.amazon.com/cognito/users/, and review all the User accounts in Cognito.
    Note that the address will change based on what AWS datacenter you are using for your Cognito database.
    I used AWS's _us-east-2_ datacenter.

    <center><img src="/public/readme_images/readme_2.png" width="800"/></center>

    You can use the AWS Cognito console to block User accounts, assign User accounts to Groups for different privileges.

    <center><img src="/public/readme_images/readme_3.png" width="800"/></center>

4.  Back to our demonstration website; we can enter our username and password.

    <center><img src="/public/readme_images/readme_4.png" width="300"/></center>

5.  We are routed to the homepage of the Reack website.  

    <center><img src="/public/readme_images/readme_5.png" width="300"/></center>

6.  Click on the buttons _Page A_, _Page B_, and _Page c_.
    You will be routed to the Pages, _/pagea_, _/pageb_, or _/pagec_.
    The content that is rendered is dependent on the User's Group in AWS Cognito.
    The example Users I created have the following permissions:

    |   Username   | Permissions                                          |
    | :----------- | :--------------------------------------------------- |
    | cpr_customer | group **'customer'** with minimal access permissions |
    | cpr_reseller | group **'reseller'** with more access permissions    |
    | cpr_employee | group **'employee'** with full access permissions    |
    
    The content rendered for _/pagec_ is only acccessable as the User *cpr_employee*:

    - User = **cpr_customer**
      <center><img src="/public/readme_images/readme_6.png" width="300"/></center>
    
    - User = **cpr_reseller**
      <center><img src="/public/readme_images/readme_7.png" width="300"/></center>

    - User = **cpr_employee**
      <center><img src="/public/readme_images/readme_8.png" width="300"/></center>

## Tools used

1.  [Node.js](https://nodejs.org)
2.  Google Chrome or another chromium based web browser
2.  [React](https://reactjs.org/)
3.  [AWS Amplify](https://aws.amazon.com/amplify/)
4.  [AWS Cognito](https://aws.amazon.com/cognito/)

## Process used to create this repo

1.  `npx create-react-app react_aws_authentication`
2.  `npm install -g @aws-amplify/cli`
3.  `amplify init` since I already have an Amazon Web Services IAM profile.
    This command redirects me to a Google Chrome tab asking me to enter:
    - My AWS acoount number
    - My IAM username
    - my IAM password
    Use the command `amplify configure` if you do not have IAM user profiles yet; noting that you will still need to have created an AWS account using your root-email address.
4.  `amplify add auth`
    - _? Do you want to use the default authentication and security configuration?_
      - `Default configuration`
    - _? How do you want users to be able to sign in?_
      - `Username`
    - _? Do you want to configure advanced settings?_
        - `No, I am done.`
5.  `amplify push`
6.  `npm install aws-amplify`
7.  Import and call authenticaton in _App.js_
    ```
    import { Amplify, Auth } from 'aws-amplify';
    import awsconfig from './aws-exports';
    Amplify.configure(awsconfig);
    ```
8.  Use a prebuilt AWS component for account-creation and sign-in.
    `npm install aws-amplify @aws-amplify/ui-react`
    
    And importing this component into _App.js_
    ```
    import { withAuthenticator } from '@aws-amplify/ui-react';
    import '@aws-amplify/ui-react/styles.css';
    import awsExports from './aws-exports';
    Amplify.configure(awsExports);
    ```

    This blocks the User from seeing your React app before logging in.
9.  Set up Local State of the User's Group in _App.js_ with `useState`
10. Update Local State of the User's Group based on AWS database using `Async` / `useEffect`
11. Read  the Local State of the User's Group, and update the React-Routing's pages according to the Group
    - Routing paths will be directed to a PageBlocked function by default
    - Routing paths will be updated to actual pages based on Local State of User's Group.


## Process to clone and use this repo

This can be run on Windows, macOS, or Linux.
The commands shown are for a Linux system, but you can replicate these by using a VS Code terminal on a Windows or macOS machine.

1.  Check that you have Node.js version 16 or higher with `node -v`.
    Install [Node.js](https://nodejs.org/) if you do not have it yet.
1.  `git clone https://github.com/rhysfaultless-cpr/react_aws_authentication.git`
2.  `cd react_aws_authentication.git`
3.  `npm install`
4.  `npm run start`

## References / Readings that helped create this

1.  https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#authentication-with-amplify
2.  https://github.com/aws-amplify/amplify-cli/issues/186
3.  https://github.com/aws-amplify/amplify-cli
4.  https://github.com/aws-amplify/amplify-cli/issues/35
5.  https://stackoverflow.com/questions/71791450/module-not-found-cant-resolve-aws-exports
6.  https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#create-the-graphql-api
7.  https://stackoverflow.com/questions/59708481/aws-amplify-deploy-failure-due-to-aws-exports
8.  https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html
9.  https://medium.com/@dantasfiles/three-methods-to-get-user-information-in-aws-amplify-authentication-e4e39e658c33
10. https://stackoverflow.com/questions/52878146/aws-cognito-how-to-get-users-group-from-token-object
11. https://dev.to/beezfedia/check-if-a-user-is-part-of-a-cognito-group-in-aws-amplify-17ca
12. https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#forgot-password
14. https://medium.com/@dantasfiles/multi-tenant-aws-amplify-method-2-cognito-groups-38b40ace2e9e