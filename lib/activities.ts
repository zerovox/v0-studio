import fs from "fs";

const CLIENT_ID = "8908";
const CLIENT_SECRET = "...";
const TMP_CODE= "...";

const oauthUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all,read_all,profile:read_all`

const authResponse = null;

async function auth() {
  const authUrl = `https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${TMP_CODE}&grant_type=authorization_code`;
  const authResponse = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  console.log(await authResponse.json());
}

export type Activity = {
  id: string;
  name: string;
  start_date: string;
}

export type Stream = {
  "data": number[]
  "series_type": string,
  "original_size": number,
  "resolution": string,
};

export type Streams = {
  "velocity_smooth": Stream,
  "distance": Stream,
  "time": Stream,
}

export async function getStreams(id: string): Promise<Stream> {
  const jsonFilePath = getStreamCachePath(id);

  if (fs.existsSync(jsonFilePath)) {
    return JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  }

  console.log("Cached streams not found, fetching...");
  //  types: "time,distance,altitude,velocity_smooth,cadence,watts,moving,temp,grade_smooth",
  const url = "https://www.strava.com/api/v3/activities/" + id + "/streams?keys=time,distance,velocity_smooth&key_by_type=true";
  const streamResponse = await stravaGet(url);
  cacheStream(id, streamResponse);
  return streamResponse;
}

export async function getActivity(id: string): Promise<Activity> {
  const jsonFilePath = getActivityCachePath(id);

  if (fs.existsSync(jsonFilePath)) {
    return JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  }

  console.log("Cached activity not found, fetching...");
  const url = "https://www.strava.com/api/v3/activities/" + id;
  const activityResponse = await stravaGet(url);

  cacheActivity(id, activityResponse);

  return activityResponse;
}

export async function getLatestActivities(): Promise<Activity[]> {
  const url = "https://www.strava.com/api/v3/athlete/activities";
  const activityResponse = await stravaGet(url);

  for (const activity of activityResponse) {
    cacheActivity(activity.id, activity);
  }

  return activityResponse;
}

function cacheActivity(activityId: string, activityJson: Activity) {
  const jsonFilePath = getActivityCachePath(activityId);
  fs.writeFileSync(jsonFilePath, JSON.stringify(activityJson, null, 2), "utf8");
  console.log("Cached activity written to " + jsonFilePath);
}

function cacheStream(activityId: string, activityJson: Stream) {
  const jsonFilePath = getStreamCachePath(activityId);
  fs.writeFileSync(jsonFilePath, JSON.stringify(activityJson, null, 2), "utf8");
  console.log("Cached stream written to " + jsonFilePath);
}

function getActivityCachePath(id: string) {
  return `./strava-cache/activities/${id}.json`;
}

function getStreamCachePath(id: string) {
  return `./strava-cache/streams/${id}.json`;
}

async function stravaGet(url: string) {
  return await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + authResponse["access_token"]
    },
  }).then(r => r.json());
}
