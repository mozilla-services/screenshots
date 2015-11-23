FROM node:0.12.7

RUN apt-get -y update && apt-get install -y git && git clone https://github.com/mozilla-services/pageshot.git

ENV RDS_HOSTNAME db:5432
ENV RDS_USERNAME postgres
ENV RDS_DB_NAME postgres

CMD /pageshot/bin/run-server

#CMD which bash
