import{_ as t,B as g,C,b as o,A as w,a as f,D as v,c as y,d as W,e as A,f as T,g as k,h as E,i as R,G as b,k as S,l as P,P as I,m as B,n as D,o as F,T as O}from"./index.d66630b9.js";import{S as N}from"./erc-1155-standard-ad8a6a10.browser.esm.fe9aadab.js";class _{constructor(e){t(this,"events",void 0),this.events=e}async getAllClaimerAddresses(e){const a=(await this.events.getEvents("TokensClaimed")).filter(r=>r.data&&g.isBigNumber(r.data.tokenId)?r.data.tokenId.eq(e):!1);return Array.from(new Set(a.filter(r=>{var s;return typeof((s=r.data)==null?void 0:s.claimer)=="string"}).map(r=>r.data.claimer)))}}class p extends N{constructor(e,a,r){var s;let l=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},d=arguments.length>4?arguments[4]:void 0,u=arguments.length>5?arguments[5]:void 0,m=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new C(e,a,d,l);super(m,r,u),s=this,t(this,"abi",void 0),t(this,"sales",void 0),t(this,"platformFees",void 0),t(this,"encoder",void 0),t(this,"estimator",void 0),t(this,"events",void 0),t(this,"metadata",void 0),t(this,"app",void 0),t(this,"roles",void 0),t(this,"royalties",void 0),t(this,"claimConditions",void 0),t(this,"checkout",void 0),t(this,"history",void 0),t(this,"interceptor",void 0),t(this,"owner",void 0),t(this,"createBatch",o(async(n,i)=>this.erc1155.lazyMint.prepare(n,i))),t(this,"claimTo",o(async function(n,i,c){let h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0;return s.erc1155.claimTo.prepare(n,i,c,{checkERC20Allowance:h})})),t(this,"claim",o(async function(n,i){let c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const h=await s.contractWrapper.getSignerAddress();return s.claimTo.prepare(h,n,i,c)})),t(this,"burnTokens",o(async(n,i)=>this.erc1155.burn.prepare(n,i))),this.abi=w.parse(d),this.metadata=new f(this.contractWrapper,v,this.storage),this.app=new y(this.contractWrapper,this.metadata,this.storage),this.roles=new W(this.contractWrapper,p.contractRoles),this.royalties=new A(this.contractWrapper,this.metadata),this.sales=new T(this.contractWrapper),this.claimConditions=new k(this.contractWrapper,this.metadata,this.storage),this.events=new E(this.contractWrapper),this.history=new _(this.events),this.encoder=new R(this.contractWrapper),this.estimator=new b(this.contractWrapper),this.platformFees=new S(this.contractWrapper),this.interceptor=new P(this.contractWrapper),this.checkout=new I(this.contractWrapper),this.owner=new B(this.contractWrapper)}onNetworkUpdated(e){this.contractWrapper.updateSignerOrProvider(e)}getAddress(){return this.contractWrapper.readContract.address}async getAll(e){return this.erc1155.getAll(e)}async getOwned(e){return this.erc1155.getOwned(e)}async getTotalCount(){return this.erc1155.totalCount()}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(D("transfer"),F)}async getClaimTransaction(e,a,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0;return this.erc1155.getClaimTransaction(e,a,r,{checkERC20Allowance:s})}async prepare(e,a,r){return O.fromContractWrapper({contractWrapper:this.contractWrapper,method:e,args:a,overrides:r})}async call(e,a,r){return this.contractWrapper.call(e,a,r)}}t(p,"contractRoles",["admin","minter","transfer"]);export{p as EditionDrop};
