import{j as t}from"./react-DHBI0EtI.js";import{p as a,f as s}from"./styled-components-BPr5Wr9K.js";const p="#4fa94d",h={"aria-busy":!0,role:"progressbar"},$=a.div`
  display: ${i=>i.$visible?"flex":"none"};
`,b="http://www.w3.org/2000/svg",e=242.776657104492,m=1.6,x=s`
12.5% {
  stroke-dasharray: ${e*.14}px, ${e}px;
  stroke-dashoffset: -${e*.11}px;
}
43.75% {
  stroke-dasharray: ${e*.35}px, ${e}px;
  stroke-dashoffset: -${e*.35}px;
}
100% {
  stroke-dasharray: ${e*.01}px, ${e}px;
  stroke-dashoffset: -${e*.99}px;
}
`;a.path`
  stroke-dasharray: ${e*.01}px, ${e};
  stroke-dashoffset: 0;
  animation: ${x} ${m}s linear infinite;
`;const u=s`
to {
   transform: rotate(360deg);
 }
`;a.svg`
  animation: ${u} 0.75s steps(12, end) infinite;
  animation-duration: 0.75s;
`;a.polyline`
  stroke-width: ${i=>i.width}px;
  stroke-linecap: round;

  &:nth-child(12n + 0) {
    stroke-opacity: 0.08;
  }

  &:nth-child(12n + 1) {
    stroke-opacity: 0.17;
  }

  &:nth-child(12n + 2) {
    stroke-opacity: 0.25;
  }

  &:nth-child(12n + 3) {
    stroke-opacity: 0.33;
  }

  &:nth-child(12n + 4) {
    stroke-opacity: 0.42;
  }

  &:nth-child(12n + 5) {
    stroke-opacity: 0.5;
  }

  &:nth-child(12n + 6) {
    stroke-opacity: 0.58;
  }

  &:nth-child(12n + 7) {
    stroke-opacity: 0.66;
  }

  &:nth-child(12n + 8) {
    stroke-opacity: 0.75;
  }

  &:nth-child(12n + 9) {
    stroke-opacity: 0.83;
  }

  &:nth-child(12n + 11) {
    stroke-opacity: 0.92;
  }
`;const g=({height:i=80,width:o=80,radius:r=9,color:n=p,ariaLabel:c="three-dots-loading",wrapperStyle:d,wrapperClass:l,visible:f=!0})=>t.jsx($,{style:d,$visible:f,className:l,"data-testid":"three-dots-loading","aria-label":c,...h,children:t.jsxs("svg",{width:o,height:i,viewBox:"0 0 120 30",xmlns:b,fill:n,"data-testid":"three-dots-svg",children:[t.jsxs("circle",{cx:"15",cy:"15",r:Number(r)+6,children:[t.jsx("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]}),t.jsxs("circle",{cx:"60",cy:"15",r,attributeName:"fill-opacity",from:"1",to:"0.3",children:[t.jsx("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]}),t.jsxs("circle",{cx:"105",cy:"15",r:Number(r)+6,children:[t.jsx("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]})]})}),y=s`
to {
   stroke-dashoffset: 136;
 }
`;a.polygon`
  stroke-dasharray: 17;
  animation: ${y} 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
`;a.svg`
  transform-origin: 50% 65%;
`;export{g as $};
//# sourceMappingURL=react-loader-spinner-DqUhPy2Y.js.map
