/* MapLibre + OpenFreeMap replaces direct OpenStreetMap raster tiles.
   This avoids the 403 shown when tile.openstreetmap.org blocks an application's
   tile traffic. OpenFreeMap provides OSM-derived vector tiles without an API key. */
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [24, -22],
  zoom: 4.2,
  attributionControl: true
});
map.addControl(new maplibregl.NavigationControl(), 'top-right');

let activeLayer = null;
const layerInfo = {
  stress:{color:'#ef6b73',label:'Climate Stress'},
  rain:{color:'#56a8ff',label:'Rainfall anomaly'},
  temp:{color:'#f4bd4e',label:'Temperature anomaly'},
  soil:{color:'#35c7a6',label:'Soil moisture'},
  veg:{color:'#9c8cff',label:'Vegetation'},
  gw:{color:'#4bb7d8',label:'Recharge vulnerability'},
  crop:{color:'#d99a5a',label:'Agriculture exposure'}
};

const saBox = {
  type:'Feature',
  geometry:{
    type:'Polygon',
    coordinates:[[[16,-34],[40,-34],[40,-10],[16,-10],[16,-34]]]
  }
};

function setLayer(k,btn){
  document.querySelectorAll('.layers button').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  const cfg=layerInfo[k];

  if (map.getLayer('risk-fill')) map.removeLayer('risk-fill');
  if (map.getLayer('risk-line')) map.removeLayer('risk-line');
  if (map.getSource('risk-area')) map.removeSource('risk-area');

  if (!map.isStyleLoaded()) return;

  map.addSource('risk-area',{type:'geojson',data:saBox});
  map.addLayer({
    id:'risk-fill',type:'fill',source:'risk-area',
    paint:{'fill-color':cfg.color,'fill-opacity':0.12}
  });
  map.addLayer({
    id:'risk-line',type:'line',source:'risk-area',
    paint:{'line-color':cfg.color,'line-width':2,'line-dasharray':[2,2]}
  });
  activeLayer=k;
}

map.on('load',()=>{
  setLayer('stress',document.querySelector('.layers button'));
});

new Chart(document.getElementById('waterChart'),{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'],datasets:[
{label:'Precipitation',data:[95,112,86,72,55,43,38,42,51],borderWidth:2,tension:.35},
{label:'ET',data:[82,91,79,70,58,49,44,45,48],borderWidth:2,tension:.35},
{label:'Recharge proxy',data:[13,21,7,2,-3,-6,-6,-3,3],borderWidth:2,tension:.35}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#a9bac9',font:{size:10}}}},scales:{x:{ticks:{color:'#71879b'},grid:{color:'#17283a'}},y:{ticks:{color:'#71879b'},grid:{color:'#17283a'}}}}});
new Chart(document.getElementById('climateChart'),{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'],datasets:[
{label:'Rainfall anomaly (%)',data:[-4,-8,-12,-19,-22,-26,-21,-17,-18],borderWidth:2,tension:.35},
{label:'Temperature anomaly (°C)',data:[.5,.7,.9,1.1,1.4,1.5,1.3,1.2,1.2],borderWidth:2,tension:.35}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#a9bac9',font:{size:10}}}},scales:{x:{ticks:{color:'#71879b'},grid:{color:'#17283a'}},y:{ticks:{color:'#71879b'},grid:{color:'#17283a'}}}}});

function showSection(id,btn){
 document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
 const el=document.getElementById(id);
 if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
}
