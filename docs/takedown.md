## Take-down process

In cases of a DMCA notice, or other abuse yet to be determined, a shot has to be removed from the service.

Currently the only way to remove a shot is to execute SQL on the server. Typically only operations staff has access to do this.

Given a shot ID, which should look like `29f8d8asd93/example.com` (that is, *not* including any domain name, and no leading `/`), the SQL is:

```sql
UPDATE data
SET block_type = 'dmca'
WHERE id = '29f8d8asd93/example.com'
```

To undo a block:

```sql
UPDATE data
SET block_type = 'none'
WHERE id = '29f8d8asd93/example.com'
```

In the future we might identify other categories of blocked content, but currently the only kind is `'dmca'`.

For a non-owner the link should now return a 404; for the owner the link will give a notification.
