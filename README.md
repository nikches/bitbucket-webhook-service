# webhook-service

Web service for handling webhooks.
- Now don't make difference between triggers.

For work need `repositories.json` file. Here example of configuraion for self-update.
```javascript
{
    "webhook-service": {
        "cwd": ".",
        "commands": [
            "git fetch",
            "git reset --hard origin/master",
            "forever restart app.js"
        ]
    }
}
```
