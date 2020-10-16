// 将db.js里面的数据进行进一步的封装

var fs = require('fs')

var dbPath = './db.json'

// 封装查找学生的方法
exports.find = function(callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  })
}
// 封装添加学生的方法
exports.save = function(student, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if(err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    student.id = students[students.length - 1].id + 1
    // student.id = students.length + 1;
    // console.log(students[students.length - 1].id);
    students.push(student);
    // 把对象又转化成字符串，保存到文件
    var fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function(error) {
      if(error) {
        return callback(error);
      }
      callback();
    })
  })
}

// 更新学生信息
exports.updataById = function(student, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if(err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var stu = students.find(function(item) {
      return item.id === student.id;
    })
    for(var key in student) {
      stu[key] = student[key];
    }

    // 把对象转化成字符串
    var fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function(error) {
      if(error) {
        return callback(error);
      }
      callback();
    })
  })
}

// 通过id来找到对应的数组
exports.findById = function(id, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if(err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var ret = students.find(function(item) {
      return item.id = id
    })
    callback(null, ret)
  })
}

// 删除学生信息
exports.delete = function() {

}