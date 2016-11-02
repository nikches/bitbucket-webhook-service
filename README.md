# bitbucket-webhook-service

Web service for handling bitbucket's webhooks.
- Now don't make difference between triggers.

For work need `repositories.json` file. Here example of configuraion for self-update.
```javascript
{
    "bitbucket-webhook-service": {
        "cwd": ".",
        "commands": [
            "git fetch",
            "git reset --hard origin/master",
            "forever restart app.js"
        ]
    }
}
```
