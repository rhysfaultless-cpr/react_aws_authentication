# react_aws_authentication

---

## Tools used

1.  [Node.js](https://nodejs.org)
2.  Google Chrome or another chromium based web browser
2.  [React](https://reactjs.org/)
3.  [AWS Amplify](https://aws.amazon.com/amplify/)
4.  [AWS Cognito](https://aws.amazon.com/cognito/)

---

## Process used to create this repo

1.  `npx create-react-app react_aws_authentication`
2.  `npm install -g @aws-amplify/cli`
3.  `amplify init` since I already have an Amazon Web Services IAM profile.
    This command redirects me to a Google Chrome tab asking me to enter:
    - My AWS acoount number
    - My IAM username
    - my IAM password
    Use the command `amplify configure` if you do not have IAM user profiles yet;noting that you will still need to have created an AWS account using your root-email address.
4.  `amplify add auth`
    - _? Do you want to use the default authentication and security configuration?_
      - `Default configuration`
    - _? How do you want users to be able to sign in?_
      - `Username`
    - _? Do you want to configure advanced settings?_
        - `No, I am done.`
5.  `amplify push`

---

## Process to clone and use this repo

This can be run on Windows, macOS, or Linux.
The commands shown are for a Linux system, but you can replicate these by using a VS Code terminal on a Windows or macOS machine.

1.  Check that you have Node.js version 16 or higher with `node -v`.
    Install [Node.js](https://nodejs.org/) if you do not have it yet.
1.  `git clone https://github.com/rhysfaultless-cpr/react_aws_authentication.git`
2.  `cd react_aws_authentication.git`
3.  `npm install`
4.  `npm run start`
