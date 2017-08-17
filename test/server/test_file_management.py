import os
import urllib
import clientlib
import time
import atexit
from sarge import Capture, run

SERVER_URL = "http://localhost:10180"

tmp_dir = os.path.abspath(os.path.join(__file__, "../tmp"))
if not os.path.exists(tmp_dir):
    os.makedirs(tmp_dir)
project_base = os.path.abspath(os.path.join(__file__, "../../.."))

# This is where we do our "local" storage of S3 images:
data_path = os.path.join(project_base, "data")


def make_session():
    session = clientlib.ScreenshotsClient(SERVER_URL)
    session.login()
    return session


def test_s3_upload():
    restart_server()
    session = make_session()
    shot_url = session.create_shot()
    page = session.read_shot(shot_url)
    assert read_file(page["clip_url"]) is not None
    assert read_file(page["clip_url"]) == get_url(page["clip_url"])


def test_s3_expire():
    restart_server()
    session = make_session()
    shot_url = session.create_shot()
    page = session.read_shot(shot_url)
    session.set_expiration(shot_url, 1)
    time.sleep(2)
    expired_page = session.read_shot(shot_url)
    # An expired page happens to be unparseable:
    assert expired_page["clip_content"] is None
    assert read_file(page["clip_url"]) is not None
    get_url(page["clip_url"], expect=404)
    get_url(shot_url, expect=200)


def test_s3_delete():
    restart_server()
    session = make_session()
    shot_url = session.create_shot()
    page = session.read_shot(shot_url)
    assert read_file(page["clip_url"]) is not None
    session.delete_shot(shot_url)
    get_url(shot_url, expect=404)
    get_url(page["clip_url"], expect=404)
    assert read_file(page["clip_url"]) is None


def test_s3_delete_after_expire():
    restart_server(DEFAULT_EXPIRATION=1)
    session = make_session()
    shot_url = session.create_shot()
    page = session.read_shot(shot_url)
    session.set_expiration(shot_url, 1)
    time.sleep(2)
    assert read_file(page["clip_url"]) is not None
    get_url(page["clip_url"], expect=404)
    get_url(shot_url, expect=200)
    session.delete_shot(shot_url)
    get_url(shot_url, expect=404)
    get_url(page["clip_url"], expect=404)
    assert read_file(page["clip_url"]) is None


def test_s3_final_expire():
    restart_server(EXPIRED_RETENTION_TIME=1, CHECK_DELETED_INTERVAL="0.1")
    session = make_session()
    shot_url = session.create_shot()
    page = session.read_shot(shot_url)
    assert read_file(page["clip_url"]) is not None
    session.set_expiration(shot_url, 1)
    time.sleep(10)
    get_url(page["clip_url"], expect=404)
    get_url(shot_url, expect=404)
    assert read_file(page["clip_url"]) is None


# TODO: implement configurable periodic failure of the fake S3, and make sure
# things are resilient

server = None
server_out = None
server_options = None


def make_server():
    with Capture() as out:
        print("Running make server:")
        run('make server', cwd=project_base, stdout=out).wait()
        for line in out:
            print('  %s' % line.rstrip())
        print('make server completed')


def restart_server(**extra_env):
    global server, server_out, server_options
    for key in extra_env:
        extra_env[key] = str(extra_env[key])
    if server and server_options == extra_env:
        print("  Server already started with correct options")
        return
    stop_server()
    env = os.environ.copy()
    env.update(extra_env)
    env['PORT'] = '10180'
    env['SITE_ORIGIN'] = 'localhost:10180'
    env['CONTENT_ORIGIN'] = 'localhost:10180'
    env['GA_ID'] = ''
    env['DEBUG_GOOGLE_ANALYTICS'] = ''
    env['NODE_ENV'] = 'production'
    server_out = Capture()
    env_print = ['%s=%s' % (name, value) for name, value in sorted(extra_env.items())]
    if env_print:
        env_print = ' (%s)' % ' '.join(env_print)
    else:
        env_print = ''
    print('  Starting server%s' % env_print)
    server = run('./bin/run-server --no-auto', cwd=project_base, env=env, stdout=server_out, async=True)
    server_options = extra_env
    time.sleep(1)
    text = []
    while True:
        if server.commands[0].process and server.commands[0].poll():
            print('    Server exited with code %s' % server.commands[0].poll())
            text.extend(server_out.readlines())
            for line in text:
                print('      %s' % line.rstrip())
            print("    %s" % ("-" * 60))
            raise Exception("Server didn't start")
        line = server_out.readline()
        if line:
            text.append(line)
        if 'updated-metrics' in line:
            # Last log message before the server is running
            break
    print("  Server started")


def show_server_output():
    print("  Server output: %s" % ("-" * 35))
    for line in server_out.readlines():
        print("    {}".format(line.rstrip()))
    print("  %s" % ("-" * 50))


def stop_server():
    global server, server_out
    if server:
        if not server.commands[0].process or server.commands[0].poll():
            # Server has already stopped
            return
        print("  Stopping server")
        for command in server.commands:
            if command.process and not command.poll():
                command.terminate()
        for command in server.commands:
            if command.process and not command.poll():
                command.kill()
        server.wait()
        print("  Server should be stopped")
        server = None
        server_out = None


atexit.register(stop_server)


def get_url(url, expect=None):
    result = urllib.urlopen(url)
    if expect and result.getcode() != expect:
        raise Exception("GET {} returned status {}".format(url, result.getcode()))
    return result.read()


def read_file(clip_url):
    name = clip_url.split("/")[-1]
    filename = os.path.join(data_path, name)
    if not os.path.exists(filename):
        return None
    with open(filename, "rb") as fp:
        return fp.read()


if __name__ == "__main__":
    import sys
    make_server()
    funcs = [test_s3_upload, test_s3_expire, test_s3_delete, test_s3_delete_after_expire, test_s3_final_expire]
    args = sys.argv[1:]
    if args:
        funcs = [
            func for func in funcs
            if args[0] in func.func_name]
        print("Selecting %s tests" % len(funcs))
    for func in funcs:
        print("Testing {}".format(func.func_name))
        try:
            func()
        except:
            show_server_output()
            raise
        print("Finished test {}".format(func.func_name))
        print("")
