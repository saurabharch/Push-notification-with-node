const publicVapidKey = 'BMiFYSn16-nhu9dXOaiAhXo4Ro-h2lZ0CmZF5Ks5aX_uA02pUyBN0Ub-P5fG_UVbo_aIJ2BNyIFTfaRKG_9o8KQ';


// Check for service worker
if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
}

// Register SW , Register push ,Send Push
async function send() {
   console.log('Registering Service Worker');
   const register  = await navigator.serviceWorker.register('/worker.js' , {
       scope: '/'
   }); 
   console.log('Service Worker Register');

   // Register Push
   console.log('Registering Push');
   const subscription = await register.pushManager.subscribe({
       userVisibleOnly: true,
       applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
   });
   // Send Push Notification
   console.log("Sending Push...");
       await fetch("/subscribe", {
           method: "POST",
           body: JSON.stringify(subscription),
           headers: {
               "content-type": "application/json"
           }
       });

   console.log("Push Sent...");
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