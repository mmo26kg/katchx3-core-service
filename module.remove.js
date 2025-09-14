// Sửa lại file này để xóa module bằng dòng lệnh
// Ví dụ node module.remove.js user
// Lấy tên module từ tham số dòng lệnh rồi thực hiện xóa thư mục tương ứng trong src/modules


import fs from 'fs';
import path from 'path';


// Lấy đường dẫn tuyệt đối đến thư mục modules
const modulesDir = path.join(process.cwd(), 'src', 'modules');
// Lấy tên module từ tham số dòng lệnh
const removeModuleName = process.argv[2];

if (!removeModuleName) {
    console.error('Vui lòng cung cấp tên module cần xóa.');
    process.exit(1);
}

// Đường dẫn đến module mẫu
// Đường dẫn đến module mới
const removeModuleDir = path.join(modulesDir, removeModuleName);

// Kiểm tra nếu module mới đã tồn tại
if (!fs.existsSync(removeModuleDir)) {
    console.error(`Module "${removeModuleName}" không tồn tại.`);
    process.exit(1);
}


// Hàm để sao chép thư mục và thay thế nội dung file
function remove(src) {
    if (fs.existsSync(src)) {
        const items = fs.readdirSync(src);
        items.forEach(item => {
            const srcPath = path.join(src, item);

            if (fs.lstatSync(srcPath).isDirectory()) {
                remove(srcPath);
            } else {
                fs.unlinkSync(srcPath);
            }
        });
        fs.rmdirSync(src);
    }
}

// Sao chép và thay thế
remove(removeModuleDir);


console.log(`Module "${removeModuleDir}" đã được xóa thành công.`);
