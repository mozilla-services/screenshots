# This is for faking an FxA auth by directly updating the database. FxA is
# required for setting a shot's expiration, which is in multiple tests.

import os
import subprocess
import shlex
import psycopg2
import uuid
import hmac
import hashlib
from base64 import urlsafe_b64encode

dir_path = os.path.dirname(os.path.realpath(__file__))
pg_vars_path = os.path.join(dir_path, "..", "..", "bin", "pg_vars")
pg_vars_out = subprocess.check_output(pg_vars_path)
parts = [line.partition('=') for line in shlex.split(pg_vars_out)]
pg_vars = {name: val for name, _, val in parts}


# Attaches a device_id to an account_id. Returns a dict that can be stuffed
# into a cookie jar.
def attach_device(device_id, account_id):
    dbname = pg_vars["PGDATABASE"] or pg_vars["PGUSER"]
    conn = psycopg2.connect(dbname=dbname, user=pg_vars["PGUSER"], host=pg_vars["PGHOST"], port=pg_vars["PGPORT"])
    conn.autocommit = True
    cur = conn.cursor()
    token = str(uuid.uuid1())
    cur.execute("INSERT INTO accounts (id, token) VALUES (%s, %s)", (account_id, token))
    cur.execute("UPDATE devices SET accountid = %s WHERE id = %s", (account_id, device_id))
    cur.execute("SELECT key FROM signing_keys WHERE scope = 'auth' ORDER BY created DESC LIMIT 1")
    key_row = cur.fetchone()
    account_id_hmac = __get_hmac("accountid=%s" % account_id, key_row[0])
    cur.close()
    conn.close()
    return {"accountid": account_id, "accountid.sig": account_id_hmac}


def __get_hmac(val, key):
    h = hmac.new(key, None, hashlib.sha1)
    h.update(val)
    b64 = urlsafe_b64encode(h.digest())
    return b64.replace('=', '')
