FROM node:0.12.7

RUN apt-get -y update && apt-get install -y git && git clone https://github.com/fzzzy/pageshot.git --branch docker-aws --single-branch pageshot
RUN cd pageshot && npm install
RUN cd pageshot && make server

#ENV RDS_HOSTNAME db:5432
#ENV RDS_USERNAME postgres
#ENV RDS_DB_NAME postgres

CMD /pageshot/bin/run-server
