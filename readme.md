# Sinapsis

### Challenge
Build a simple API that generates thumbnails from a source image

### Solution (brief description)
For the solution of the challenge, I have implemented three lambdas with two endpoints.
- One endpoint is in charge to validate and store image into S3.
- One lambda listen an specific folder from S3, and asynchronously. resized every new images and save an new directory.
- The latest endpoint retrieve a list of resized images.

### Technology stack
- For authentication -> **Cognito**.
- For develop and deploy the architecture -> **Serverless**.
- For Api endpoint -> **Lambda** with **ApiGateway**
- For Storage -> **S3**

### Documentation 
For documentation I use `Blueprint` specification deployed [here](https://thumbnailgenerator.docs.apiary.io/)


### Set up
You may configure the folowing enviroment vars 
```
    export ACCESS_KEY="YOUR_ACCESS_KEY"
    export SECRET_KEY="YOUR_SECRET_KEY"
```

In the `.env.yml` file you must configure the following vars

| Name | Description | Example  |
| :---: | :---: | :---: |
| BUCKET | Bucket where the images will be saved | thumbnail.api.sinapsis.co |
| BASE_PATH | Base path access the resized images, could be s3 or cloudFront | https://s3.amazonaws.com/thumbnail.api.sinapsis.co |
| REGION | The region where the bucket is hosted | us-east-1 |
| MAX_SIZE | Max size that api allow images in MB | 5 |
| ALLOW_FORMATS | Api allow formats | jpeg,png |

### Test
```
    npm install
    npm run test
```