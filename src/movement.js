// Original articulated vector mannequins. No network assets or third-party video.
// Coordinates describe the same joint hierarchy in every frame, interpolated smoothly.
export const movementIds = ['march','squat','wall','bridge','calf','row','curl','shoulder'];
const point=(x,y)=>[x,y];
const stand=()=>({head:point(88,44),neck:point(88,63),shoulderL:point(72,72),shoulderR:point(104,72),elbowL:point(65,104),elbowR:point(111,104),handL:point(62,132),handR:point(114,132),hipL:point(79,128),hipR:point(97,128),kneeL:point(76,166),kneeR:point(100,166),ankleL:point(74,205),ankleR:point(102,205)});
const side=()=>({head:point(101,44),neck:point(97,64),shoulderL:point(94,74),shoulderR:point(101,73),elbowL:point(98,105),elbowR:point(110,104),handL:point(101,134),handR:point(115,132),hipL:point(91,130),hipR:point(99,129),kneeL:point(99,167),kneeR:point(107,167),ankleL:point(94,205),ankleR:point(104,205)});
function keyframe(id,n){
 let p=['squat','wall','bridge','row'].includes(id)?side():stand();
 if(id==='march'&&n===1)Object.assign(p,{kneeL:point(57,147),ankleL:point(50,177),elbowR:point(119,94),handR:point(116,67),elbowL:point(63,104),handL:point(72,130)});
 if(id==='march'&&n===3)Object.assign(p,{kneeR:point(119,147),ankleR:point(126,177),elbowL:point(57,94),handL:point(60,67),elbowR:point(113,104),handR:point(104,130)});
 if(id==='squat'){
  // Side view: hips travel back; both heels remain fixed on the floor.
  p={...p,elbowL:point(113,85),handL:point(143,86),elbowR:point(119,81),handR:point(147,81)};
  if(n===1)Object.assign(p,{head:point(103,88),neck:point(98,107),shoulderL:point(94,116),shoulderR:point(102,115),elbowL:point(119,125),handL:point(146,126),elbowR:point(126,119),handR:point(151,120),hipL:point(64,158),hipR:point(71,157),kneeL:point(103,171),kneeR:point(111,170)});
 }
 if(id==='wall'){
  // Hands remain planted on the wall while elbows bend. Body stays in one line.
  p={head:point(113,47),neck:point(109,66),shoulderL:point(107,76),shoulderR:point(115,75),elbowL:point(135,89),elbowR:point(141,83),handL:point(162,84),handR:point(162,75),hipL:point(87,132),hipR:point(94,132),kneeL:point(79,168),kneeR:point(87,168),ankleL:point(71,205),ankleR:point(80,205)};
  if(n===1)Object.assign(p,{head:point(141,59),neck:point(136,77),shoulderL:point(132,86),shoulderR:point(139,85),elbowL:point(137,113),elbowR:point(146,108),hipL:point(108,138),hipR:point(115,137),kneeL:point(88,171),kneeR:point(96,170)});
 }
 if(id==='bridge'){
  // Head and shoulders rest on the mat; feet stay planted as the pelvis lifts.
  p={head:point(24,190),neck:point(41,190),shoulderL:point(51,190),shoulderR:point(54,184),elbowL:point(73,198),elbowR:point(77,193),handL:point(99,199),handR:point(105,195),hipL:point(102,190),hipR:point(105,184),kneeL:point(133,157),kneeR:point(140,154),ankleL:point(154,204),ankleR:point(162,200)};
  if(n===1)Object.assign(p,{hipL:point(103,160),hipR:point(106,154),kneeL:point(138,150),kneeR:point(145,146)});
 }
 if(id==='calf'){
  // Front view: left hand stays on a support; entire body rises onto toes.
  p.elbowL=point(48,100);p.handL=point(28,102);
  if(n===1){for(const k of Object.keys(p)){if(k==='handL')continue;p[k]=point(p[k][0],p[k][1]-11);}p.elbowL=point(48,94);}
 }
 if(id==='row'){
  // Side view: left hand fixed to bench. Right elbow pulls up and back to hip.
  p={head:point(128,88),neck:point(115,98),shoulderL:point(108,105),shoulderR:point(112,100),elbowL:point(125,130),elbowR:point(108,132),handL:point(142,151),handR:point(104,161),hipL:point(68,132),hipR:point(74,129),kneeL:point(68,169),kneeR:point(87,168),ankleL:point(52,205),ankleR:point(98,205)};
  if(n===1)Object.assign(p,{elbowR:point(74,104),handR:point(88,131)});
 }
 if(id==='curl'&&n===1)Object.assign(p,{handL:point(56,78),handR:point(120,78),elbowL:point(65,104),elbowR:point(111,104)});
 if(id==='shoulder'){
  const shift=[[0,0],[0,-7],[5,-3],[0,3],[-4,-2]][n]||[0,0];
  for(const k of ['shoulderL','shoulderR','elbowL','elbowR','handL','handR']) p[k]=point(p[k][0]+shift[0],p[k][1]+shift[1]);
 }
 return p;
}
export function poseAt(id,phase){
 if(!movementIds.includes(id))throw Error(`Unknown exercise: ${id}`);
 const count=id==='march'?4:id==='shoulder'?5:2;
 const normalized=((phase%1)+1)%1;
 // Shoulder circles traverse five points then reverse each second cycle.
 let position;
 if(id==='march')position=normalized*count;
 else if(id==='shoulder'){const reverse=normalized>=.5;const v=(normalized*2)%1;position=(reverse?1-v:v)*count;}
 else position=normalized<.5?normalized*2:(1-normalized)*2;
 const a=id==='march'||id==='shoulder'?Math.floor(position)%count:0;
 const b=id==='march'||id==='shoulder'?(a+1)%count:1;
 const f=id==='march'||id==='shoulder'?position-Math.floor(position):position;
 const eased=(1-Math.cos(Math.PI*f))/2;
 const from=keyframe(id,a),to=keyframe(id,b);
 return Object.fromEntries(Object.keys(from).map(k=>[k,from[k].map((v,j)=>v+(to[k][j]-v)*eased)]));
}
const coords=p=>`${p[0].toFixed(2)},${p[1].toFixed(2)}`;
function line(a,b,color,width=9,extra=''){return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;}
function disc(p,r,color){return `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${color}"/>`;}
function dumbbell(p){return `<g transform="translate(${coords(p)}) rotate(-10)"><rect x="-12" y="-2" width="24" height="4" rx="2" fill="#d4dce4"/><rect x="-15" y="-8" width="7" height="16" rx="2" fill="#63758b"/><rect x="8" y="-8" width="7" height="16" rx="2" fill="#63758b"/></g>`;}
function figure(id,phase,female){
 const p=poseAt(id,phase),skin=female?'#dfac90':'#c98f68',top=female?'#c2a3ff':'#b6ef61',pants=female?'#68638f':'#455b73',hair='#24282d';
 const shoe=ankle=>id==='calf'?`<path d="M ${ankle[0]-5} ${ankle[1]} L ${ankle[0]+8} 205 l 7 6 -11 0 L ${ankle[0]-6} ${ankle[1]+5} Z" fill="#f2f2e7"/>`:`<path d="M ${ankle[0]-5} ${ankle[1]} l 12 0 7 6 -20 0 z" fill="#f2f2e7"/>`;
 let s=`<ellipse cx="91" cy="218" rx="72" ry="5" fill="#000" opacity=".18"/>`;
 if(id==='bridge')s+=`<rect x="10" y="211" width="166" height="5" rx="3" fill="#537962"/>`;
 if(id==='wall')s+=`<rect x="168" y="46" width="6" height="166" rx="3" fill="#6a7d76"/><path d="M171 55v145" stroke="#a6b5ae" stroke-width="1" stroke-dasharray="5 6"/>`;
 if(id==='row')s+=`<rect x="121" y="154" width="55" height="8" rx="3" fill="#778b83"/><path d="M130 162v47m37-47v47" stroke="#485b52" stroke-width="5"/>`;
 if(id==='calf')s+=`<path d="M17 212V103h18" fill="none" stroke="#788c81" stroke-width="5" stroke-linecap="round"/>`;
 // Far limbs first create depth and keep the head/body in front.
 s+=line(p.hipL,p.kneeL,pants,13)+line(p.kneeL,p.ankleL,pants,11)+shoe(p.ankleL);
 s+=line(p.shoulderL,p.elbowL,top,11)+line(p.elbowL,p.handL,skin,8)+disc(p.handL,4.5,skin);
 s+=line(p.hipR,p.kneeR,pants,14)+line(p.kneeR,p.ankleR,pants,11)+shoe(p.ankleR);
 const l=p.shoulderL,r=p.shoulderR,hl=p.hipL,hr=p.hipR;
 const center=[(l[0]+r[0])/2,(l[1]+r[1])/2];
 const hip=[(hl[0]+hr[0])/2,(hl[1]+hr[1])/2];
 const dx=hip[0]-center[0],dy=hip[1]-center[1],len=Math.hypot(dx,dy)||1,nx=dy/len,ny=-dx/len;
 const width=female?14:18,waist=female?10:13;
 const a=[center[0]-nx*width,center[1]-ny*width],b=[center[0]+nx*width,center[1]+ny*width],c=[hip[0]+nx*waist,hip[1]+ny*waist],d=[hip[0]-nx*waist,hip[1]-ny*waist];
 s+=`<path d="M${coords(a)} Q${coords(center)} ${coords(b)} L${coords(c)} Q${hip[0]} ${hip[1]+8} ${coords(d)}Z" fill="${top}"/>`;
 s+=line([hip[0]-nx*waist,hip[1]-ny*waist],[hip[0]+nx*waist,hip[1]+ny*waist],pants,9);
 s+=line(p.neck,[p.head[0],p.head[1]+9],skin,10);
 if(female)s+=`<path d="M${p.head[0]-9} ${p.head[1]-3} q-16 10 -12 29 q13-2 12-18Z" fill="${hair}"/>`;
 s+=disc(p.head,13,skin)+`<path d="M${p.head[0]-13} ${p.head[1]-2} a13 13 0 0 1 26 0 q-10 -9 -26 0" fill="${hair}"/>`;
 const sideView=['squat','wall','bridge','row'].includes(id);
 if(sideView)s+=`<circle cx="${p.head[0]+7}" cy="${p.head[1]}" r="1.3" fill="#29282b"/>`;
 else s+=`<circle cx="${p.head[0]-4}" cy="${p.head[1]}" r="1.2" fill="#29282b"/><circle cx="${p.head[0]+4}" cy="${p.head[1]}" r="1.2" fill="#29282b"/>`;
 s+=line(p.shoulderR,p.elbowR,top,12)+line(p.elbowR,p.handR,skin,8)+disc(p.handR,4.5,skin);
 if(id==='curl')s+=dumbbell(p.handL)+dumbbell(p.handR);
 if(id==='row')s+=dumbbell(p.handR);
 return s;
}
export function movementSvg(id,phase=0){
 return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="244" viewBox="0 0 400 244"><rect width="400" height="244" rx="18" fill="#101b17"/><path d="M200 22v199" stroke="#2a3d33" stroke-dasharray="3 7"/><g transform="translate(10,5)">${figure(id,phase,false)}</g><g transform="translate(211,5)">${figure(id,phase,true)}</g></svg>`;
}
