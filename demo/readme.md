# What Works

The python script does not work, launch with the typescript server:

- `npm install`
- `npm run server`
- The server will listen on port 8080.

Packages used in `requirements.txt`:

```
attrs==23.2.0
cattrs==23.2.3
certifi==2024.2.2
charset-normalizer==3.3.2
docx==0.2.4
h11==0.14.0
idna==3.6
looker-sdk==24.4.0
lxml==5.2.1
numpy==1.26.4
outcome==1.3.0.post0
pandas==1.5.2
pillow==10.3.0
PySocks==1.7.1
python-dateutil==2.9.0.post0
pytz==2024.1
requests==2.31.0
selenium==4.7.2
six==1.16.0
sniffio==1.3.1
sortedcontainers==2.4.0
trio==0.25.0
trio-websocket==0.11.1
typing_extensions==4.11.0
urllib3==1.26.18
wsproto==1.2.0
```

Ensure that the models variable in `demo_user.json` include the name of the project which the looks and dashboard pull data from.

Create `.env` in the root dir and not `/demo`:
```
LOOKER_EMBED_HOST=<DOMAIN>.cloud.looker.com
LOOKER_EMBED_API_URL=https://<DOMAIN>.cloud.looker.com
LOOKER_DEMO_HOST=localhost
LOOKER_DEMO_PORT=8080
LOOKER_EMBED_SECRET=<FROM ADMIN > EMBED>
LOOKER_CLIENT_ID=<FROM ADMIN > USERS > SELECT USER > ADD KEY>
LOOKER_CLIENT_SECRET=<FROM ADMIN > USERS > SELECT USER > ADD KEY>
LOOKER_DASHBOARD_ID=1
LOOKER_LOOK_ID=1
LOOKER_EXPLORE_ID=thelook::orders
LOOKER_EXTENSION_ID=extension::my-great-extension
COOKIE_SECRET=cookie_stash
LOOKER_USE_EMBED_DOMAIN=false
```