/* Small view helpers kept independent from state and persistence. */
(function(root){'use strict';const UNITS=['Years','Months','Weeks','Days','Hours','Minutes','Seconds'];
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function durationMarkup(e,now){const level=Math.max(0,Math.min(6,Number.isInteger(e.viewLevel)?e.viewLevel:3)),v=root.CountTime.values(e,now,level);return '<div class="duration-view" data-duration="'+esc(e.id)+'"><div class="duration-units">'+UNITS.map((u,i)=>'<div class="duration-unit '+(i<level?'inactive':'')+'"><div class="duration-number">'+(i<level?'':v[i].toLocaleString())+'</div><div class="duration-label">'+u+'</div></div>').join('')+'</div><input class="duration-slider" type="range" min="0" max="6" step="1" value="'+level+'" aria-label="Time units for '+esc(e.name)+'"></div>'}
root.CountUI={esc,durationMarkup};
})(globalThis);
