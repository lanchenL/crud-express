var fs = require('fs')

var Student = require('./student')
// 这里是使用抛出函数的方法
// module.exports = function(app) {
//   app.get('/', function(req, res) {
//     fs.readFile('./db.json', 'utf8', function(err, data) {
//       if(err) {
//         console.log('db.json文件读取失败!');
//       }
//       var students = JSON.parse(data).students;
//       res.render('index.html', {
//         fruit: [
//           '苹果',
//           '香蕉',
//           '雪梨',
//           '哈密瓜'
//         ],
//         students: students
//       })
//     })
    
//   })
// }

// 这里是使用express里面提供的Router方法

// Student.updataById({
//   id: 1,
//   name: '0.0'
// }, function(err) {
//   if(err) {
//     return console.log('修改失败');
//   }
//   console.log('修改成功');
// })

var express = require('express')
var router = express.Router()
router.get('/', function(req, res) {
  Student.find(function(err, data) {
    if(err) {
      return res.status(500).send('文件读取错误');
    }
    res.render('index.html', {
      fruit: [
        '苹果',
        '香蕉',
        '雪梨',
        '哈密瓜'
      ],
      students: data
    })
  })
})

router.get('/students', function(req, res) {
  Student.find(function(err, data) {
    if(err) {
      return res.status(500).send('文件读取错误');
    }
    res.render('index.html', {
      fruit: [
        '苹果',
        '香蕉',
        '雪梨',
        '哈密瓜'
      ],
      students: data
    })
  })

})
router.get('/students/new', function(req, res) {
  res.render('new.html')
})
router.post('/students/new', function(req, res) {
  // console.log(req.body );
  Student.save(req.body, function(err) {
    if(err) {
      return res.status(500).send('文件读取错误');
    }
    res.redirect('/')
  })
  
})
router.get('/students/edit', function(req, res) {
  // console.log(req.query.id);
  Student.findById(parseInt(req.query.id), function(err, student) {
    if(err) {
      return res.status(500).send('server error')
    }
    // console.log(student);
    res.render('edit.html', {
      student: student
    })
  })
})
router.post('/students/edit', function(req, res) {
  
})
router.get('/students/delete', function(req, res) {
  
})
module.exports = router