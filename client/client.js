const publicVapidKey = 'BGwDEWugwQqlJ9Y5t62koPU8OfKJkqF_pIXrN60iY96o2xCxfHA58Xr3KY8Ilzzi9L6zMp91ZwLfXL77Jo14Cvc';

//check if the serveice worker can work in the current browser
if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

//register the service worker, register our push api, sedn the notifation
async function send() {
  //register service worker
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });

  //register push
  console.log('Regikstering push...')
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  //Send push notification
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}    