To create the docker image, first run:

  make server
  make xpi

Then, manually sign the xpi on the AMO website, and use:

  bin/build-docker-image [dockerhubusername]

build-docker-image will build the image, tag it as [dockerhubusername]/pageshot:latest, and push it to dockerhub.

When you run docker, you should use --net=host and pass the following parameters in the environment:

  RDS_USERNAME - the username for your postgres database

  RDS_PASSWORD - the password for your postgres database

  RDS_HOSTNAME - the hostname of your postgres database

  SITE_ORIGIN - the publicly visible domain name for the main site

  CONTENT_ORIGIN - the publicly visible domain name for the content site

  S3_BUCKET_NAME - the name of the s3 bucket to store images in

  GA_ID - the google analytics id

  SENTRY_DSN - the sentry dsn url to use for logging errors

Example command line:

  docker run --net=host -e 'RDS_USERNAME=postgres' -e 'RDS_PASSWORD=********' -e 'RDS_HOSTNAME=pageshot-dev.czvvrkdqhklf.us-east-1.rds.amazonaws.com' -e 'SITE_ORIGIN=pageshotfzzzy.dev.mozaws.net' -e 'CONTENT_ORIGIN=pageshotcontentfzzzy.dev.mozaws.net' -e 'S3_BUCKET_NAME=pageshot-images-bucket' -e 'GA_ID=********' -e 'SENTRY_DSN=********' fzzzy/pageshot
