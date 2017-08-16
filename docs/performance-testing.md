# Performance Testing

Notes and advice on testing...

To get your local database filled up with a lot of data, use the `load_test_exercise.py` script, like:

```sh
$ ./.venv/bin/python ./bin/load_test_exercise.py -q --little-image --create=50 --read-shot=0 --read-my-shots=0 --search=0 --times 100 --new-account http://localhost:10080
```

Or:

```sh
$ npm run fill_database -- --times 100
```

The argument to `--times` gives the number of user accounts to create. Each account will have 50 images (`--create=50`). `--little-image` uses the smallest image, since locally it's not meaningful for performance to have large files.
