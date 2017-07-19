**Note:** Most of what is described in these instructions is implemented in the `./bin/release-version` script.

To create the docker image, first run:

    make server
    make signed_xpi

Then, manually sign the xpi (in the build directory) using the AMO website, download the signed copy, replace the unsigned copy, and use:

    bin/build-docker-image [dockerhubusername]

build-docker-image will build the image, tag it as [dockerhubusername]/pageshot:latest, and push it to dockerhub.

When you run docker, you should use --net=host and pass the following parameters in the environment:

    RDS_USERNAME - the username for your postgres database
    RDS_PASSWORD - the password for your postgres database
    RDS_HOSTNAME - the hostname of your postgres database
    SITE_ORIGIN - the publicly visible domain name for the main site
    CONTENT_ORIGIN - the publicly visible domain name for the content site
    USE_S3 - true to use s3 to store images, otherwise they will be stored locally in a directory named "data"
    S3_BUCKET_NAME - the name of the s3 bucket to store images in
    GA_ID - the google analytics id
    SENTRY_DSN - the sentry dsn url to use for logging errors
    SENTRY_PUBLIC_DSN - the sentry public dsn url to use for logging errors from content and the addon

Example command line:

    docker run --net=host -e 'RDS_USERNAME=postgres' -e 'RDS_PASSWORD=********' \ 
      -e 'RDS_HOSTNAME=pageshot-dev.czvvrkdqhklf.us-east-1.rds.amazonaws.com' \ 
      -e 'SITE_ORIGIN=pageshotfzzzy.dev.mozaws.net' \
      -e 'CONTENT_ORIGIN=pageshotcontentfzzzy.dev.mozaws.net' \
      -e 'USE_S3=true' -e 'S3_BUCKET_NAME=pageshot-images-bucket' -e 'GA_ID=********' \ 
      -e 'SENTRY_DSN=********' -e 'SENTRY_PUBLIC_DSN=********' fzzzy/pageshot

Publishing on Elastic Beanstalk:

When you run `build-docker-image`, it will create a file called `build/eb-app-latest.zip`. This is the file you give to Elastic Beanstalk when using "Upload and Deploy". When you create the Elastic Beanstalk instance, you will need to configure it to use a Postgres RDS instance. That's all you need to know to deploy on Beanstalk!
