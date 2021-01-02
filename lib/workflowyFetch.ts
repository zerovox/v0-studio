import fetch from "node-fetch";

const initialHeaders = {
  accept: "text/html,application/xhtml+xml,application/xml",
  "accept-language": "en-US,en",
};

const jsonHeaders = {
  accept: "application/json",
  "accept-language": "en-US,en",
};

export interface TextTree {
  // N.B, the content here is an HTML string.
  content: string;
  children: TextTree[];
}

interface WorkflowyItem {
  id: string;
  nm: string;
  ch: WorkflowyItem[];
}

interface WorkflowyResponse {
  projectTreeData: {
    mainProjectTreeInfo: {
      rootProject: {
        id: string;
        nm: string;
      };
      rootProjectChildren: WorkflowyItem[];
    };
  };
}

function workflowyItemToTextTree(item: WorkflowyItem): TextTree {
  return {
    content: item.nm,
    children: item.ch?.map(workflowyItemToTextTree) ?? [],
  };
}

const SHARE_ID_PHRASE_START = "var PROJECT_TREE_DATA_URL_PARAMS =";

/**
 * The share page contains the following HTML, which contains the shareId, which can be used to fetch a JSON representation of the workflowy node. We slice on
 *
 * <script type="text/javascript">
 * var PROJECT_TREE_DATA_URL_PARAMS = {"share_id": "BCe6.tuRDzKYO9m"};
 * </script>
 */
function extractShareId(bodyContent: string) {
  const shareIdStartIndex = bodyContent.indexOf(SHARE_ID_PHRASE_START);
  const shareIdEndIndex = bodyContent.indexOf(";", shareIdStartIndex);
  const shareIdJson = bodyContent.slice(
    shareIdStartIndex + SHARE_ID_PHRASE_START.length,
    shareIdEndIndex
  );
  return JSON.parse(shareIdJson)["share_id"];
}

export default async function fetchWorkflowyTree(id: string) {
  const url = `https://workflowy.com/s/${id}`;
  const initRequest = await fetch(url, {
    headers: initialHeaders,
    body: undefined,
    method: "GET",
  });
  const setCookie = initRequest.headers.get("set-cookie");
  if (setCookie == null) {
    throw new Error("Failed to get workflowy cookie");
  }
  const cookie = setCookie.slice(0, setCookie.indexOf(";"));

  const bodyContent = await initRequest.text();
  const shareId = extractShareId(bodyContent);

  const shareData = await fetch(
    `https://workflowy.com/get_initialization_data?share_id=${shareId}&client_version=21`,
    {
      headers: {
        ...jsonHeaders,
        cookie,
      },
      body: undefined,
      method: "GET",
    }
  );
  const json: WorkflowyResponse = await shareData.json();
  return {
    content: json.projectTreeData.mainProjectTreeInfo.rootProject.nm,
    children: json.projectTreeData.mainProjectTreeInfo.rootProjectChildren.map(
      workflowyItemToTextTree
    ),
  };
}
