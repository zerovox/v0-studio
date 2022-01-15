// 1. inject github personal token via actions to env for refresh https://github.com/settings/tokens
// 2. inject strava access and refresh tokens to env for refresh
// 3. refresh the strava token using the api
// 4. encrypt the access and refresh tokens, send to github api https://docs.github.com/en/rest/reference/actions#create-or-update-a-repository-secret
// 5. inject strava access and refresh tokens to env for build
// 6. when local dev, grab access/refresh from github secrets UI and set in env somehow
