/* ===== ตั้งค่าร้าน (แก้ตรงนี้) ===== */
const CONFIG = {
  phone: '',          // เบอร์โทรร้าน เช่น '0812345678'
  lineId: '',         // LINE OA เช่น '@rehome' (มี @ นำหน้า)
  sheetUrl: ''        // URL ของ Google Apps Script (ดู README ข้อ 3)
};
/* ================================== */

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TYPES = ['ทั้งหมด','สร้างบ้านใหม่','รีโนเวท','ต่อเติม','ซ่อมแซม'];
const SCOPE = ['ทั้งหลัง','ห้องนั่งเล่น','ห้องนอน','ห้องครัว','ห้องน้ำ','หลังคา','ผนัง/ฝ้า','พื้น','ประตู-หน้าต่าง','บันได','โรงรถ/ที่จอดรถ','ระเบียง/ดาดฟ้า','รั้ว/ประตูรั้ว','ระบบไฟฟ้า','ระบบประปา','ระบบระบายน้ำ/บ่อพัก','สีภายนอก','สีภายใน','บิวท์อิน','จัดสวน/ภูมิทัศน์','ทางลาด/ราวจับผู้สูงอายุ'];
const PROBLEMS = ['หลังคารั่ว','ผนังร้าว','บ้านทรุด/เอียง','ปลวก','น้ำซึม/ความชื้น','ไฟฟ้าช็อต/ไฟตก','ท่อแตก/น้ำไม่ไหล','ท่อตัน/กลิ่น','น้ำท่วมขัง','กระเบื้องร่อน','สีลอก/เชื้อรา','ประตูหน้าต่างฝืด'];
const chk = (el, arr, name) => el.innerHTML = arr.map((v, i) => `<label><input type="checkbox" name="${name}" value="${esc(v)}" id="${name}${i}">${esc(v)}</label>`).join('');
chk($('#scope'), SCOPE, 'scope'); chk($('#problems'), PROBLEMS, 'problems');

/* contact buttons */
const lineUrl = CONFIG.lineId ? 'https://line.me/R/ti/p/' + encodeURIComponent(CONFIG.lineId) : '';
if (lineUrl) { $('#lineBtn').href = lineUrl; } else { $('#lineBtn').hidden = true; }
if (CONFIG.phone) { $('#telBtn').href = 'tel:' + CONFIG.phone; $('#telBtn').textContent = 'โทร ' + CONFIG.phone; } else { $('#telBtn').hidden = true; }
$('#heroChat').onclick = () => lineUrl ? window.open(lineUrl, '_blank') : (CONFIG.phone && (location.href = 'tel:' + CONFIG.phone));
if (!lineUrl && !CONFIG.phone) $('#heroChat').hidden = true;
$$('[data-go]').forEach(b => b.onclick = () => $('#' + b.dataset.go).scrollIntoView({behavior: 'smooth'}));

/* portfolio */
let projects = [], filter = 'ทั้งหมด';
$('#filters').innerHTML = TYPES.map(t => `<button class="chip" aria-pressed="${t === filter}" data-f="${t}">${t}</button>`).join('');
$('#filters').onclick = e => { const f = e.target.dataset.f; if (!f) return; filter = f; $$('#filters .chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.f === f)); renderGrid(); };
const cover = p => { const m = (p.media || [])[0]; return m ? `<img src="${esc(m.src)}" alt="" loading="lazy">` : '<span>ยังไม่มีรูป</span>'; };
function renderGrid() {
  const list = projects.filter(p => filter === 'ทั้งหมด' || p.type === filter);
  if (!list.length) { $('#grid').innerHTML = '<div class="empty" style="grid-column:1/-1">ยังไม่มีผลงานในหมวดนี้</div>'; return; }
  $('#grid').innerHTML = list.map(p => `<button class="card" data-p="${esc(p._id)}"><div class="thumb">${cover(p)}<span class="badge">${esc(p.type)}</span>${p.videoUrl ? '<span class="badge vid">▶ วิดีโอ</span>' : ''}</div>
    <div class="body"><h3>${esc(p.title)}</h3><div class="meta">${p.location ? `<span>📍 ${esc(p.location)}</span>` : ''}${p.area ? `<span>${esc(p.area)} ตร.ม.</span>` : ''}${p.duration ? `<span>${esc(p.duration)}</span>` : ''}</div></div></button>`).join('');
}
$('#grid').onclick = e => { const c = e.target.closest('[data-p]'); if (c) openProject(c.dataset.p); };
function openProject(id) {
  const p = projects.find(x => x._id === id); if (!p) return;
  const facts = [['สถานที่', p.location], ['พื้นที่', p.area && p.area + ' ตร.ม.'], ['ระยะเวลา', p.duration], ['งบประมาณ', p.budget], ['ปีที่แล้วเสร็จ', p.year]].filter(x => x[1]);
  $('#modalBox').innerHTML = `<div style="display:flex;justify-content:space-between;gap:12px"><div><span class="pill">${esc(p.type)}</span><h2 style="margin-top:6px">${esc(p.title)}</h2></div><button class="btn ghost" id="mClose">ปิด</button></div>
  <dl class="facts">${facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
  ${p.desc ? `<p style="white-space:pre-wrap;margin:0">${esc(p.desc)}</p>` : ''}
  ${p.videoUrl ? `<p style="margin:0"><a class="btn alt" href="${esc(p.videoUrl)}" target="_blank" rel="noopener">▶ ดูวิดีโอผลงาน</a></p>` : ''}
  <div class="gallery">${(p.media || []).map(m => `<img src="${esc(m.src)}" alt="${esc(p.title)}" loading="lazy">`).join('')}</div>
  ${lineUrl ? `<div><a class="btn" href="${lineUrl}" target="_blank" rel="noopener">สนใจงานแบบนี้ ทัก LINE</a></div>` : ''}`;
  $('#modal').hidden = false; $('#mClose').onclick = closeModal;
}
const closeModal = () => { $('#modal').hidden = true; $('#modalBox').innerHTML = ''; };
$('#modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
fetch('projects.json', {cache: 'no-cache'}).then(r => r.json()).then(d => { projects = d; renderGrid(); })
  .catch(() => { $('#grid').innerHTML = '<div class="empty" style="grid-column:1/-1">โหลดผลงานไม่สำเร็จ</div>'; });

/* lead form -> Google Sheets */
$('#leadForm').addEventListener('submit', async e => {
  e.preventDefault();
  const msg = $('#formMsg');
  if (!CONFIG.sheetUrl) { msg.textContent = 'ยังไม่ได้ตั้งค่าการรับฟอร์ม' + (CONFIG.phone ? ' กรุณาโทร ' + CONFIG.phone : ''); return; }
  const fd = new FormData(e.target), o = {};
  for (const [k, v] of fd.entries()) { if (k === 'scope' || k === 'problems') (o[k] = o[k] || []).push(v); else o[k] = v; }
  o.scope = (o.scope || []).join(', '); o.problems = (o.problems || []).join(', ');
  $('#submitBtn').disabled = true; msg.textContent = 'กำลังส่ง...';
  try {
    await fetch(CONFIG.sheetUrl, {method: 'POST', mode: 'no-cors', headers: {'Content-Type': 'text/plain'}, body: JSON.stringify(o)});
    e.target.reset();
    msg.innerHTML = '<span class="msg">ได้รับข้อมูลแล้ว ทีมงานจะติดต่อกลับภายใน 1 วันทำการ' + (lineUrl ? ` · <a href="${lineUrl}" target="_blank" rel="noopener">ส่งรูปหน้างานทาง LINE</a>` : '') + '</span>';
  } catch { msg.textContent = 'ส่งไม่สำเร็จ ตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง'; }
  $('#submitBtn').disabled = false;
});
