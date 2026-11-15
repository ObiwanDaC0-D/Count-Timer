/* Calendar-aware countdown engine. Local dates are deliberate: date-only events are calendar days. */
(function(root){'use strict';
const DAY=86400000, pad=n=>String(n).padStart(2,'0');
function parseDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))throw Error('Invalid date');const [y,m,d]=value.split('-').map(Number);const dt=new Date(y,m-1,d);if(dt.getFullYear()!==y||dt.getMonth()!==m-1||dt.getDate()!==d)throw Error('Invalid calendar date');return dt}
function stamp(e){const d=parseDate(e.date);if(e.time){if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time))throw Error('Invalid time');const [h,m]=e.time.split(':').map(Number);d.setHours(h,m,0,0)}return d}
function calendarDelta(a,b){return Math.round((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/DAY)}
function candidate(year,month,day,original){const d=new Date(year,month,1,original.getHours(),original.getMinutes(),0,0);d.setDate(Math.min(day,new Date(year,month+1,0).getDate()));return d}
function effective(e,now){const origin=stamp(e),repeat=e.repeat||'none';if(repeat==='none'||origin>now)return origin;const day=origin.getDate();if(repeat==='weekly'){const weeks=Math.max(0,Math.floor(calendarDelta(origin,now)/7));const d=new Date(origin);d.setDate(origin.getDate()+weeks*7);if(d<now)d.setDate(d.getDate()+7);return d}if(repeat==='monthly'){let offset=Math.max(0,(now.getFullYear()-origin.getFullYear())*12+now.getMonth()-origin.getMonth());let d=candidate(origin.getFullYear(),origin.getMonth()+offset,day,origin);if(d<now)d=candidate(origin.getFullYear(),origin.getMonth()+offset+1,day,origin);return d}if(repeat==='yearly'){let y=Math.max(origin.getFullYear(),now.getFullYear());let d=candidate(y,origin.getMonth(),day,origin);if(d<now)d=candidate(y+1,origin.getMonth(),day,origin);return d}return origin}
function measure(e,now){const target=effective(e,now);const delta=target-now;const direction=e.mode==='up'?'up':e.mode==='down'?'down':delta>=0?'down':'up';const active=(direction==='up'?delta<=0:delta>=0);const a=active?new Date(Math.min(now,target)):new Date(now),b=active?new Date(Math.max(now,target)):new Date(now);
const dateOnly=!e.time;const totalSeconds=Math.max(0,Math.floor((b-a)/1000));
const totalDays=dateOnly?(active?Math.abs(calendarDelta(now,target)):0):Math.floor(totalSeconds/86400);
return {target,direction,active,a,b,dateOnly,totalSeconds,totalDays,distance:Math.abs(delta)}}
function addYearsClamped(d,n){return candidate(d.getFullYear()+n,d.getMonth(),d.getDate(),d)}
function addMonthsClamped(d,n){return candidate(d.getFullYear(),d.getMonth()+n,d.getDate(),d)}
function values(e,now,level=3){level=Math.max(0,Math.min(6,Math.trunc(level)));const m=measure(e,now);const v=[0,0,0,0,0,0,0];let seconds=m.totalSeconds;
if(level<=1&&!m.dateOnly&&m.active){let cursor=new Date(m.a),years=0,months=0;
while(addYearsClamped(cursor,years+1)<=m.b)years++;
cursor=addYearsClamped(cursor,years);
while(addMonthsClamped(cursor,months+1)<=m.b)months++;
cursor=addMonthsClamped(cursor,months);
if(level===0){v[0]=years;v[1]=months}else v[1]=years*12+months;
seconds=Math.max(0,Math.floor((m.b-cursor)/1000))
}else if(level<=1&&m.dateOnly&&m.active){let cursor=new Date(m.a),years=0,months=0;while(addYearsClamped(cursor,years+1)<=m.b)years++;cursor=addYearsClamped(cursor,years);while(addMonthsClamped(cursor,months+1)<=m.b)months++;cursor=addMonthsClamped(cursor,months);if(level===0){v[0]=years;v[1]=months}else v[1]=years*12+months;seconds=Math.max(0,Math.floor((m.b-cursor)/1000))}
if(level<=2){v[2]=Math.floor(seconds/604800);seconds%=604800}
if(level<=3){v[3]=Math.floor(seconds/86400);seconds%=86400}
if(level<=4){v[4]=Math.floor(seconds/3600);seconds%=3600}
if(level<=5){v[5]=Math.floor(seconds/60);seconds%=60}
v[6]=seconds;return v}
function timing(e,now){const m=measure(e,now),seconds=m.totalSeconds,days=m.totalDays;const label=e.precision==='exact'&&e.time?days+'d '+pad(Math.floor(seconds/3600)%24)+':'+pad(Math.floor(seconds/60)%60)+':'+pad(seconds%60):days.toLocaleString()+(days===1?' day':' days');return {label,sub:m.direction==='up'?'elapsed':'remaining',distance:m.distance,date:m.target}}
root.CountTime={parseDate,stamp,calendarDelta,effective,measure,values,timing};
})(globalThis);
