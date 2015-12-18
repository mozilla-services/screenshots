To create the docker image, first run:

  make server
  make xpi

Then, manually sign the xpi on the AMO website, and use the bin/build-docker-image script.

When you run docker, you should use --net=host and pass the following parameters in the environment:

  RDS_USERNAME - the username for your postgres database
  RDS_PASSWORD - the password for your postgres database
  RDS_HOSTNAME - the hostname of your postgres database
  SITE_ORIGIN - the publicly visible domain name for the main site
  CONTENT_ORIGIN - the publicly visible domain name for the content site

Example command line:

  docker run --net=host -e 'RDS_USERNAME=postgres RDS_PASSWORD=******** RDS_HOSTNAME=pageshot-dev.czvvrkdqhklf.us-east-1.rds.amazonaws.com SITE_ORIGIN=pageshotfzzzy.dev.mozaws.net CONTENT_ORIGIN=pageshotcontentfzzzy.dev.mozaws.net' fzzzy/pageshot
