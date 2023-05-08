import{aF as c,aG as C,aH as f,aI as v,aJ as m,aK as k,aL as D,aM as P}from"./index.d66630b9.js";import{C as S,n as I,a as u,U as l,R as E,b as A,A as U,S as W}from"./normalizeChainId-e4cc0175.browser.esm.5fe02725.js";function M(d){var i,o,s;if(!d)return"Injected";const t=e=>{if(e.isAvalanche)return"Core Wallet";if(e.isBitKeep)return"BitKeep";if(e.isBraveWallet)return"Brave Wallet";if(e.isCoinbaseWallet)return"Coinbase Wallet";if(e.isExodus)return"Exodus";if(e.isFrame)return"Frame";if(e.isKuCoinWallet)return"KuCoin Wallet";if(e.isMathWallet)return"MathWallet";if(e.isOneInchIOSWallet||e.isOneInchAndroidWallet)return"1inch Wallet";if(e.isOpera)return"Opera";if(e.isPortal)return"Ripio Portal";if(e.isTally)return"Tally";if(e.isTokenPocket)return"TokenPocket";if(e.isTokenary)return"Tokenary";if(e.isTrust||e.isTrustWallet)return"Trust Wallet";if(e.isMetaMask)return"MetaMask"};if((i=d.providers)!=null&&i.length){const e=new Set;let n=1;for(const a of d.providers){let h=t(a);h||(h=`Unknown Wallet #${n}`,n+=1),e.add(h)}const r=[...e];return r.length?r:(o=r[0])!=null?o:"Injected"}return(s=t(d))!=null?s:"Injected"}var g=new WeakMap,w=new WeakMap;class T extends S{constructor(t){const o={...{shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:()=>{if(P(globalThis.window))return globalThis.window.ethereum}},...t.options};super({chains:t.chains,options:o}),c(this,"id",void 0),c(this,"name",void 0),c(this,"ready",void 0),C(this,g,{writable:!0,value:void 0}),C(this,w,{writable:!0,value:void 0}),c(this,"connectorStorage",void 0),c(this,"shimDisconnectKey","injected.shimDisconnect"),c(this,"onAccountsChanged",async e=>{e.length===0?await this.onDisconnect():this.emit("change",{account:f(e[0])})}),c(this,"onChainChanged",e=>{const n=I(e),r=this.isChainUnsupported(n);this.emit("change",{chain:{id:n,unsupported:r}})}),c(this,"onDisconnect",async()=>{if(this.options.shimChainChangedDisconnect&&v(this,w)){m(this,w,!1);return}this.emit("disconnect"),this.options.shimDisconnect&&await this.connectorStorage.removeItem(this.shimDisconnectKey)});const s=o.getProvider();if(typeof o.name=="string")this.name=o.name;else if(s){const e=M(s);o.name?this.name=o.name(e):typeof e=="string"?this.name=e:this.name=e[0]}else this.name="Injected";this.id="injected",this.ready=!!s,this.connectorStorage=t.connectorStorage}async connect(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{const i=await this.getProvider();if(!i)throw new u;this.setupListeners(),this.emit("message",{type:"connecting"});const o=await i.request({method:"eth_requestAccounts"}),s=f(o[0]);let e=await this.getChainId(),n=this.isChainUnsupported(e);if(t.chainId&&e!==t.chainId)try{await this.switchChain(t.chainId),e=t.chainId,n=this.isChainUnsupported(t.chainId)}catch(a){console.error(`Could not switch to chain id: ${t.chainId}`,a)}this.options.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");const r={account:s,chain:{id:e,unsupported:n},provider:i};return this.emit("connect",r),r}catch(i){throw this.isUserRejectedRequestError(i)?new l(i):i.code===-32002?new E(i):i}}async disconnect(){const t=await this.getProvider();!(t!=null&&t.removeListener)||(t.removeListener("accountsChanged",this.onAccountsChanged),t.removeListener("chainChanged",this.onChainChanged),t.removeListener("disconnect",this.onDisconnect),this.options.shimDisconnect&&await this.connectorStorage.removeItem(this.shimDisconnectKey))}async getAccount(){const t=await this.getProvider();if(!t)throw new u;const i=await t.request({method:"eth_accounts"});return f(i[0])}async getChainId(){const t=await this.getProvider();if(!t)throw new u;return t.request({method:"eth_chainId"}).then(I)}async getProvider(){const t=this.options.getProvider();return t&&m(this,g,t),v(this,g)}async getSigner(){let{chainId:t}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const[i,o]=await Promise.all([this.getProvider(),this.getAccount()]);return new k(i,t).getSigner(o)}async isAuthorized(){try{if(this.options.shimDisconnect&&!Boolean(await this.connectorStorage.getItem(this.shimDisconnectKey)))return!1;if(!await this.getProvider())throw new u;return!!await this.getAccount()}catch{return!1}}async switchChain(t){var s,e;this.options.shimChainChangedDisconnect&&m(this,w,!0);const i=await this.getProvider();if(!i)throw new u;const o=D(t);try{await i.request({method:"wallet_switchEthereumChain",params:[{chainId:o}]});const n=this.chains.find(r=>r.chainId===t);return n||{chainId:t,name:`Chain ${o}`,slug:`${o}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpc:[""],chain:"",shortName:"",testnet:!0}}catch(n){const r=this.chains.find(a=>a.chainId===t);if(!r)throw new A({chainId:t,connectorId:this.id});if(n.code===4902||((e=(s=n==null?void 0:n.data)==null?void 0:s.originalError)==null?void 0:e.code)===4902)try{return await i.request({method:"wallet_addEthereumChain",params:[{chainId:o,chainName:r.name,nativeCurrency:r.nativeCurrency,rpcUrls:r.rpc,blockExplorerUrls:this.getBlockExplorerUrls(r)}]}),r}catch(a){throw this.isUserRejectedRequestError(a)?new l(n):new U}throw this.isUserRejectedRequestError(n)?new l(n):new W(n)}}async setupListeners(){const t=await this.getProvider();t.on&&(t.on("accountsChanged",this.onAccountsChanged),t.on("chainChanged",this.onChainChanged),t.on("disconnect",this.onDisconnect))}isUserRejectedRequestError(t){return t.code===4001}}var p=new WeakMap;class q extends T{constructor(t){const o={...{name:"MetaMask",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider(){var e;function s(n){if(!!(n!=null&&n.isMetaMask)&&!(n.isBraveWallet&&!n._events&&!n._state)&&!n.isAvalanche&&!n.isKuCoinWallet&&!n.isPortal&&!n.isTokenPocket&&!n.isTokenary)return n}if(P(globalThis.window))return(e=globalThis.window.ethereum)!=null&&e.providers?globalThis.window.ethereum.providers.find(s):s(globalThis.window.ethereum)}},...t.options};super({chains:t.chains,options:o,connectorStorage:t.connectorStorage}),c(this,"id","metaMask"),C(this,p,{writable:!0,value:void 0}),m(this,p,o.UNSTABLE_shimOnConnectSelectAccount)}async connect(){var i,o;let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{const s=await this.getProvider();if(!s)throw new u;this.setupListeners(),this.emit("message",{type:"connecting"});let e=null;if(v(this,p)&&((i=this.options)==null?void 0:i.shimDisconnect)&&!Boolean(this.connectorStorage.getItem(this.shimDisconnectKey))&&(e=await this.getAccount().catch(()=>null),!!e))try{await s.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}catch(y){if(this.isUserRejectedRequestError(y))throw new l(y)}if(!e){const h=await s.request({method:"eth_requestAccounts"});e=f(h[0])}let n=await this.getChainId(),r=this.isChainUnsupported(n);if(t.chainId&&n!==t.chainId)try{await this.switchChain(t.chainId),n=t.chainId,r=this.isChainUnsupported(t.chainId)}catch(h){console.error(`Could not switch to chain id : ${t.chainId}`,h)}(o=this.options)!=null&&o.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");const a={chain:{id:n,unsupported:r},provider:s,account:e};return this.emit("connect",a),a}catch(s){throw this.isUserRejectedRequestError(s)?new l(s):s.code===-32002?new E(s):s}}}export{q as MetaMaskConnector};
