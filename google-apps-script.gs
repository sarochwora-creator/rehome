// วางโค้ดนี้ใน Google Sheets > ส่วนขยาย > Apps Script แล้ว Deploy เป็น Web app (ดู README)
const FIELDS = ['เวลา','name','phone','line','email','contactBy','contactTime','source','jobType','building','floors','age','area','land','structure','living','address','map','juristic','access','parking','scope','problems','style','design','permit','detail','budget','finance','start','deadline','survey','สถานะ'];
const HEAD = ['เวลา','ชื่อ','โทร','LINE','อีเมล','ติดต่อทาง','เวลาสะดวก','รู้จักจาก','ประเภทงาน','อาคาร','ชั้น','อายุอาคาร','พื้นที่ ตร.ม.','ที่ดิน ตร.ว.','โครงสร้าง','ระหว่างก่อสร้าง','ที่อยู่','แผนที่','นิติฯ','ทางเข้า','ที่จอดรถ','ส่วนที่ทำ','ปัญหา','สไตล์','แบบ','ขออนุญาต','รายละเอียด','งบ','แหล่งเงิน','เริ่มงาน','เสร็จภายใน','วันสำรวจ','สถานะ'];

function doPost(e) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(HEAD);
  const d = JSON.parse(e.postData.contents);
  d['เวลา'] = new Date(); d['สถานะ'] = 'ใหม่';
  sh.appendRow(FIELDS.map(k => d[k] ?? ''));
  return ContentService.createTextOutput('ok');
}
