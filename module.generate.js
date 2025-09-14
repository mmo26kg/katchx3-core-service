// Clone thư mục src/modules/sample thành src/modules/<tên-module-mới>
// Cập nhật lại tên đối tượng theo tên module mới
// Tự động export ra allModule

import fs from 'fs';
import path from 'path';


// Lấy đường dẫn tuyệt đối đến thư mục modules
const modulesDir = path.join(process.cwd(), 'src', 'modules');
// Lấy tên module từ tham số dòng lệnh
const newModuleName = process.argv[2];

if (!newModuleName) {
    console.error('Vui lòng cung cấp tên module mới.');
    process.exit(1);
}

// Đường dẫn đến module mẫu
const sampleModuleDir = path.join(modulesDir, 'sample');
// Đường dẫn đến module mới
const newModuleDir = path.join(modulesDir, newModuleName);

// Kiểm tra nếu module mới đã tồn tại
if (fs.existsSync(newModuleDir)) {
    console.error(`Module "${newModuleName}" đã tồn tại.`);
    process.exit(1);
}

// Hàm để sao chép thư mục và thay thế nội dung file
function copyAndReplace(src, dest, replacements) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    const items = fs.readdirSync(src);
    items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item.replace('sample', newModuleName));

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyAndReplace(srcPath, destPath, replacements);
        } else {
            let content = fs.readFileSync(srcPath, 'utf8');
            Object.keys(replacements).forEach(key => {
                const regex = new RegExp(key, 'g');
                content = content.replace(regex, replacements[key]);
            });
            fs.writeFileSync(destPath, content, 'utf8');
        }
    });
}

// Định nghĩa các thay thế cần thiết
const replacements = {
    'sample': newModuleName,
    'Sample': newModuleName.charAt(0).toUpperCase() + newModuleName.slice(1),
    'samples': newModuleName.toLowerCase() + 's',
    'SampleModule': newModuleName.charAt(0).toUpperCase() + newModuleName.slice(1) + 'Module',
    'sample.config.js': `${newModuleName.toLowerCase()}.config.js`,
    'sample.model.js': `${newModuleName.toLowerCase()}.model.js`,
    'sample.service.js': `${newModuleName.toLowerCase()}.service.js`,
    'sample.controller.js': `${newModuleName.toLowerCase()}.controller.js`,
};

// Sao chép và thay thế
copyAndReplace(sampleModuleDir, newModuleDir, replacements);

// // Cập nhật file allModules.js
// const allModulesFile = path.join(modulesDir, 'allModules.js');
// let allModulesContent = fs.readFileSync(allModulesFile, 'utf8');

// // Thêm import mới
// const importStatement = `import ${replacements['SampleModule']} from './${newModuleName}/${newModuleName}.module.js';\n`;
// if (!allModulesContent.includes(importStatement)) {
//     allModulesContent = importStatement + allModulesContent;
// }

// // Thêm module mới vào mảng
// const arrayMatch = allModulesContent.match(/const allModules = \[(.*?)\];/s);
// if (arrayMatch) {
//     let modulesArray = arrayMatch[1].trim();
//     if (modulesArray) {
//         modulesArray += `,\n    ${replacements['SampleModule']}`;
//     } else {
//         modulesArray = `\n    ${replacements['SampleModule']}\n`;
//     }
//     allModulesContent = allModulesContent.replace(arrayMatch[0], `const allModules = [${modulesArray}];`);
// }

// // Ghi lại file allModules.js
// fs.writeFileSync(allModulesFile, allModulesContent, 'utf8');

console.log(`Module "${newModuleName}" đã được tạo thành công.`);

// Hướng dẫn sử dụng:
// Chạy lệnh sau trong terminal tại thư mục gốc của dự án:
// node module.generate.js <tên-module-mới>
// Ví dụ: node module.generate.js product
// Kết quả: Tạo thư mục src/modules/product với các file mẫu đã được thay thế tên tương ứng và cập nhật allModules.js
// Thêm vào package.json một script để dễ chạy hơn:
// "scripts": {
//     "create-module": "node module.generate.js"
