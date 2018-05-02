### Installing PostgreSQL

Install Postgres 
`sudo apt-get install postgresql postgresql-10`

Check if server is running
`sudo service postgresql status`

If nothing shows up you need to create a cluster
`sudo pg_createcluster 10 main`

The server should now be running with port 5432 online, if the port is still down, you can manually start the server by running
`sudo -u postgres /usr/lib/postgresql/10/bin/pg_ctl -D /etc/postgresql/10/main/ start`

You should be able to run `./bin/run-server` now.

If you get "error: password authentication failed for user \"{you username}\", you can fix this by creating a username on postgresql.

### Create a user and database
Switch to the default superuser 'postgres' `sudo su postgres`

Open PostgreSql terminal `psql`
```
CREATE USER {your username} superuser;
ALTER USER {your username} WITH PASSWORD 'password'
CREATE DATABASE {your username};
\q
```

Modify `pg_hba.conf` to authenticate the user you just created

Navigate to `/etc/postgresql/10/main/`

Open `pg_hba.conf`

Edit Ipv4 connections to 
```
# IPv4 local connections: 
host    all             all             127.0.0.1/32            trust 
```

Restart the server

You should now be able to run `./bin/run-server`


