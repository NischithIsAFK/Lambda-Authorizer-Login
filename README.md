# Lambda-authorizer-SAM

This project contains source code of implementation of Authentication in lambda using Custom Authorizer(Lambda Authorizer).
The flow of events are-
- User will send email and password 
- The credentials are validated and JWT token is generated in Login lambda function
- Responses are handled in Login lambda where it checks for valid password and if password is wrong it will send the proper response for it
- If user doesn't exist it will send a valid response for that
- Now when user sends an request to the main function it will go to Lambda Authorizer and it will return back an valid response. Example- if token is invalid/expired. Response will be to Login again (Here, usually it sends an Deny/Allow invoke policy. But we can add a context string and in Api gateway Gateway Responses modify the header to receive the context message along with Deny Policy)
- In 403 status code of Gateway response Edit the header to {"message":$context.error.messageString}


The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

If you prefer to use an integrated development environment (IDE) to build and test your application, you can use the AWS Toolkit.  
The AWS Toolkit is an open source plug-in for popular IDEs that uses the SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds a simplified step-through debugging experience for Lambda function code. 

* [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 20](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided --profile <your_aws_profile_alias>
```

