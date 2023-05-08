import{a3 as s,C as d,_ as t,A as u,a as g,a1 as l,c as f,d as m,i as W,G as E,h as v,k as C,l as w,T as A,a4 as n,a5 as I,a6 as F,a7 as R,a8 as _,a9 as S,aa as T}from"./index.d66630b9.js";class i{get directListings(){return s(this.detectDirectListings(),_)}get englishAuctions(){return s(this.detectEnglishAuctions(),S)}get offers(){return s(this.detectOffers(),T)}get chainId(){return this._chainId}constructor(e,r,a){let o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,p=arguments.length>5?arguments[5]:void 0,h=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new d(e,r,c,o);t(this,"abi",void 0),t(this,"contractWrapper",void 0),t(this,"storage",void 0),t(this,"encoder",void 0),t(this,"events",void 0),t(this,"estimator",void 0),t(this,"platformFees",void 0),t(this,"metadata",void 0),t(this,"app",void 0),t(this,"roles",void 0),t(this,"interceptor",void 0),t(this,"_chainId",void 0),this._chainId=p,this.abi=u.parse(c||[]),this.contractWrapper=h,this.storage=a,this.metadata=new g(this.contractWrapper,l,this.storage),this.app=new f(this.contractWrapper,this.metadata,this.storage),this.roles=new m(this.contractWrapper,i.contractRoles),this.encoder=new W(this.contractWrapper),this.estimator=new E(this.contractWrapper),this.events=new v(this.contractWrapper),this.platformFees=new C(this.contractWrapper),this.interceptor=new w(this.contractWrapper)}onNetworkUpdated(e){this.contractWrapper.updateSignerOrProvider(e)}getAddress(){return this.contractWrapper.readContract.address}async prepare(e,r,a){return A.fromContractWrapper({contractWrapper:this.contractWrapper,method:e,args:r,overrides:a})}async call(e,r,a){return this.contractWrapper.call(e,r,a)}detectDirectListings(){if(n(this.contractWrapper,"DirectListings"))return new I(this.contractWrapper,this.storage)}detectEnglishAuctions(){if(n(this.contractWrapper,"EnglishAuctions"))return new F(this.contractWrapper,this.storage)}detectOffers(){if(n(this.contractWrapper,"Offers"))return new R(this.contractWrapper,this.storage)}}t(i,"contractRoles",["admin","lister","asset"]);export{i as MarketplaceV3};
