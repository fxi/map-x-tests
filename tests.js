(function(){

  /*
   * TEST OF MAPBOX GL AND WEBSOCKET: one by one
   * based on https://github.com/mapbox/mapbox-gl-supported/blob/gh-pages/index.js 
   */

  var elTests = document.getElementById("tests");
  var wsUri = "wss://echo.websocket.org/";
  var wspingCount = 5;
  var elWsRes = document.createElement("span");
  var ulWs = document.createElement("ul");


  var tests = {
    browser: !!isBrowser(),
    array: !!isArraySupported(),
    function: !!isFunctionSupported(),
    object: !!isObjectSupported(),
    json: !!isJSONSupported(),
    worker: !!isWorkerSupported(),
    uint8ClampedArray: !!isUint8ClampedArraySupported(),
    arrayBuffer: !!isArrayBufferSupported(),
    webgl: !!isWebGLSupported(),
    websocket: isWebsocketSupported()
  };

  for (var t in tests) {
    var el = document.createElement("p");
    var test = tests[t];
    if(test instanceof Node){
      el.innerText = t + "=" ;
      el.appendChild(test);
    }else{
      el.innerText = t + "=" + test;
    }
    elTests.appendChild(el);
  }

  function isBrowser() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  function isArraySupported() {
    return (
      Array.prototype &&
      Array.prototype.every &&
      Array.prototype.filter &&
      Array.prototype.forEach &&
      Array.prototype.indexOf &&
      Array.prototype.lastIndexOf &&
      Array.prototype.map &&
      Array.prototype.some &&
      Array.prototype.reduce &&
      Array.prototype.reduceRight &&
      Array.isArray
    );
  }

  function isFunctionSupported() {
    return Function.prototype && Function.prototype.bind;
  }

  function isObjectSupported() {
    return (
      Object.keys &&
      Object.create &&
      Object.getPrototypeOf &&
      Object.getOwnPropertyNames &&
      Object.isSealed &&
      Object.isFrozen &&
      Object.isExtensible &&
      Object.getOwnPropertyDescriptor &&
      Object.defineProperty &&
      Object.defineProperties &&
      Object.seal &&
      Object.freeze &&
      Object.preventExtensions
    );
  }

  function isJSONSupported() {
    return 'JSON' in window && 'parse' in JSON && 'stringify' in JSON;
  }

  function isWorkerSupported() {
    if (!('Worker' in window && 'Blob' in window && 'URL' in window)) {
      return false;
    }

    var blob = new Blob([''], {
      type: 'text/javascript'
    });
    var workerURL = URL.createObjectURL(blob);
    var supported;
    var worker;

    try {
      worker = new Worker(workerURL);
      supported = true;
    } catch (e) {
      supported = false;
    }

    if (worker) {
      worker.terminate();
    }
    URL.revokeObjectURL(workerURL);

    return supported;
  }

  // IE11 only supports `Uint8ClampedArray` as of version
  // [KB2929437](https://support.microsoft.com/en-us/kb/2929437)
  function isUint8ClampedArraySupported() {
    return 'Uint8ClampedArray' in window;
  }

  // https://github.com/mapbox/mapbox-gl-supported/issues/19
  function isArrayBufferSupported() {
    return ArrayBuffer.isView;
  }


  function isWebGLSupported() {

    var canvas = document.createElement('canvas');
    var attributes = {
      antialias: false,
      alpha: true,
      stencil: true,
      depth: true
    };
    if (canvas.probablySupportsContext) {
      return (
        canvas.probablySupportsContext('webgl', attributes) ||
        canvas.probablySupportsContext('experimental-webgl', attributes)
      );

    } else if (canvas.supportsContext) {
      return (
        canvas.supportsContext('webgl', attributes) ||
        canvas.supportsContext('experimental-webgl', attributes)
      );

    } else {
      return (
        canvas.getContext('webgl', attributes) ||
        canvas.getContext('experimental-webgl', attributes)
      );
    }
  }
  /**
   * websocket
   */
  var wsresult = {
    open:"waiting...",
    close:"waiting...",
    message:"sending " + wspingCount + " messages; waiting echos...",
    error:"none"
  };

  var wserror = false;
  for( var r in wsresult){
    var liWs = document.createElement("li");
    liWs.classList.add("ws-"+r);
    var spanWs = document.createElement("span");
    spanWs.id="ws-"+r;
    spanWs.innerText = wsresult[r];
    liWs.innerText= r + "=";
    liWs.appendChild(spanWs);
    ulWs.appendChild(liWs);
  }

  function isWebsocketSupported(){
    elWsRes.appendChild(ulWs);
    testWebsocket();
    return elWsRes;
  }
  function testWebsocket() {
    try{
      websocket = new WebSocket(wsUri);
      websocket.onopen = function(evt) { onOpen(evt); };
      websocket.onclose = function(evt) { onClose(evt); }; 
      websocket.onmessage = function(evt) { onMessage(evt); };
      websocket.onerror = function(evt) { onError(evt); }; 
    }
    catch(err){
      onError(err); 
    }
  }
  function onOpen(evt) {
    document.getElementById("ws-open").innerText = true;

    // Sending "ping" messages
    var elMsg = document.querySelector('.ws-message');
    var elUl = document.createElement('ul');
    elMsg.appendChild(elUl);
    var pingui = 1;
    var ping = function() {
      var message = {
        id: pingui,
        content: 'ping item ' + pingui,
      };
      var elLi = document.createElement('li');
      elLi.innerHTML = 'sending message: "' + message.content + '" <span class="response-item-' + pingui + '">...<span>';
      elUl.appendChild(elLi);
      websocket.send(JSON.stringify(message));
      if (pingui >= wspingCount) {
        clearInterval(si);
      }
      pingui++;
    };
    ping();
    var si = setInterval(ping, 2000);
  }
  function onClose(evt) {
    document.getElementById("ws-close").innerText = true;
  } 
  function onMessage(evt) { 
    var message = JSON.parse(evt.data);
    document.querySelector('.response-item-' + message.id).innerText = '; echoed: "' + message.content + '"';
    if (message.id >= wspingCount) {
      websocket.close();
      document.getElementById("ws-message").innerText = 'done';
    }
  } 
  function onError(evt) { 
    document.getElementById("ws-error").innerText = true;
    console.log(evt);
  } 

})();

