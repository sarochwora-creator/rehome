# Rehome — บ้านเก่า เราเล่าใหม่

เว็บไซต์รับสร้างบ้าน รีโนเวท ต่อเติม ซ่อมแซมอาคาร

## 1. เปิดเว็บด้วย GitHub Pages
Settings → Pages → Source: Deploy from a branch → Branch `main` / `(root)` → Save
รอ 1–2 นาที เว็บจะอยู่ที่ `https://sarochwora-creator.github.io/rehome/`

## 2. ใส่เบอร์โทรและ LINE
แก้ไฟล์ `app.js` ส่วน `CONFIG` ด้านบนสุด (กดรูปดินสอบน GitHub แล้ว Commit)

## 3. รับข้อมูลลูกค้าเข้า Google Sheets
1. สร้าง Google Sheets ใหม่ → เมนู ส่วนขยาย → Apps Script
2. ลบโค้ดเดิม วางโค้ดจาก `google-apps-script.gs` แล้วกดบันทึก
3. Deploy → New deployment → ประเภท Web app → Execute as: **Me** → Who has access: **Anyone** → Deploy (อนุญาตสิทธิ์)
4. คัดลอก URL ที่ได้ ไปใส่ `sheetUrl` ใน `app.js`

## 4. เพิ่มผลงาน
1. อัปโหลดรูปเข้าโฟลเดอร์ `images/` (Add file → Upload files) แนะนำย่อรูปไม่เกิน 1400px
2. แก้ `projects.json` เพิ่มรายการใหม่ตามแบบที่มีอยู่ (รูปแรกเป็นภาพปก)
3. วิดีโอ: ใส่ลิงก์ YouTube/TikTok/Facebook ในช่อง `videoUrl`

## 5. หลังบ้าน (เพิ่ม/แก้/ลบผลงานผ่านหน้าเว็บ)
เข้าที่ `https://sarochwora-creator.github.io/rehome/admin.html`

สร้าง Token ครั้งแรก (ทำครั้งเดียว):
1. GitHub → รูปโปรไฟล์ → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token
2. Repository access: **Only select repositories** → เลือก `rehome`
3. Permissions → Repository permissions → **Contents: Read and write**
4. ตั้งวันหมดอายุตามต้องการ → Generate → คัดลอก Token ไปวางในหน้าหลังบ้าน

อย่าส่ง Token ให้ผู้อื่น ใครมี Token จะแก้ไขเว็บได้
