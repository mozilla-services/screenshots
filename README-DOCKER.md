To create the docker image, first run:

  make server
  make xpi

Then, manually sign the xpi on the AMO website, and use the bin/build-docker-image script.

When you run docker, you should use --net=host and pass the RDS_PASSWORD in the environment, like this:

  docker run --net=host -e 'RDS_PASSWORD=********' fzzzy/pageshot
