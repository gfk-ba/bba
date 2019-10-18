# Deployment

## Install libraries

Please run this command in /backend and /frontend

```bash
npm install
```

## Change config files

You can search for # TODO to find all places where you should put your configuration data in. This is especially the file

```bash
backend/Config/Backend/.env.prod
```

This file will be copied to .env during build

## Rebuild the frontend

If you made any changes to the frontend code, you'll have to rebuild the frontend code and copy thge compiled code to the backend folder /backend/Source/src/public because the frontend will be distributed by the backend.
In the frontend folder this can be done by:

```bash
npm run integrate
```
