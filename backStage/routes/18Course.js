let express = require('express');
let informationDB = require('../models/information_db');
let router = express.Router();
let bodyParser = require('body-parser');
let co=require('co');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
var ObjectID = require('mongodb').ObjectID;
var xlsx = require('node-xlsx');
var fs = require('fs');

// 跨域header设定
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//temp add account
router.post('/account', urlencodedParser, function (req, res, next) {
	let StudentData = {
		uid: req.body.uid,
        name: req.body.name,
        class: req.body.class,
        score: parseFloat(req.body.score),
        password: req.body.uid,
        chooseOrNot: 0,
        choice: "尚未选择",
        result: "尚未选择"
	}
	
	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	accountCollection.findOne({uid: StudentData.uid}, function (err, data) {
		if (!data) {
			accountCollection.insert(StudentData)
			res.status(200).json({ "code": "1" ,"msg": "添加成功"})
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "已有账号"})
		}

	});
});

/*
 * @function 登录
 * @param uid(string) 学号, password(string) 密码
 * @return code(int) , mag(string)
 */
router.post('/login', urlencodedParser, function (req, res, next) {
	let StudentData = {
		uid: req.body.uid,
		password: req.body.password
	}

	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	accountCollection.findOne({uid: StudentData.uid}, function (err, data) {
		if (data) {
			if (StudentData.password == data.password){
				res.status(200).json({ "code": "1" ,"msg": "登陆成功"})
			}
			else {
				res.status(200).json({ "code": "-1" ,"msg": "密码错误"})
			}
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "查无此人"})
		}

	});
});

/*
 * @function 修改密码
 * @param uid(string) 学号, password(string) 密码, newPassword(string) 新密码
 * @return code(int) , mag(string)
 */
router.post('/updatePassword', urlencodedParser, function (req, res, next) {
	let StudentData = {
		uid: req.body.uid,
		password: req.body.password,
		newPassword: req.body.newPassword
	}
	
	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	accountCollection.findOne({uid: StudentData.uid}, function (err, data) {
		if (data) {
			if (StudentData.password == data.password){
				accountCollection.update({uid: StudentData.uid}, {$set:{'password': StudentData.newPassword}})
				res.status(200).json({ "code": "1" ,"msg": "修改成功"})
			}
			else {
				res.status(200).json({ "code": "-1" ,"msg": "密码错误"})
			}
		}
		else {
			res.status(200).json({ "code": "-1" ,"msg": "查无此人"})
		}

	});
});

/*
 * @function 选课
 * @param uid(string) 学号, password(string) 密码, newPassword(string) 新密码
 * @return code(int) , mag(string)
 */
router.post('/chooseCourse', urlencodedParser, function (req, res, next) {
	let StudentData = {
		uid: req.body.uid,
		password: req.body.password,
		choice: req.body.choice
	}
	
	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	let timeCollection = informationDB.getCollection("18Course","TIME");
	nowDate = new Date();
	nowTime = nowDate.getTime();

	timeCollection.findOne({}, function (err, data) {
		if(data){
			data.startTime = JSON.parse(data.startTime)
			data.endTime = JSON.parse(data.endTime)
			startTimeStr = data.startTime.year + "/" + data.startTime.month + "/" + data.startTime.day + " " + data.startTime.hour +  ":" + data.startTime.min
			startdata = Date.parse(startTimeStr);
			endTimeStr = data.endTime.year + "/" + data.endTime.month + "/" + data.endTime.day + " " + data.endTime.hour +  ":" + data.endTime.min
			enddata = Date.parse(endTimeStr);
			if(startdata < nowTime && enddata > nowTime){
				accountCollection.findOne({uid: StudentData.uid}, function (err, data) {
					if (data) {
						if (StudentData.password == data.password){
							accountCollection.update({uid: StudentData.uid}, {$set:{'choice': StudentData.choice, 'chooseOrNot': 1}})
							res.status(200).json({ "code": "1" ,"msg": "选课成功"})
						}
						else {
							res.status(200).json({ "code": "-1" ,"msg": "密码错误"})
						}
					}
					else {
						res.status(200).json({ "code": "-1" ,"msg": "查无此人"})
					}
			
				});
			}
			else{
				res.status(200).json({ "code": "-1" ,"msg": "不在选课时间内"})
			}

		}
		else{
			res.status(200).json({ "code": "-1" ,"msg": "不在选课时间内"})
		}
	})


});


/*
 * @function 管理员登录
 * @param account(string) 账号, password(string) 密码
 * @return code(int) , mag(string)
 */
router.post('/adminLogin', urlencodedParser, function (req, res, next) {
	let AccountData = {
		uid: req.body.uid,
		password: req.body.password
    }
    
    if(AccountData.uid == "xxxxxx" && AccountData.password == "xxxxxx"){
        res.status(200).json({ "code": "1" ,"msg": "登陆成功"})
    }
    else{
        res.status(200).json({ "code": "-1" ,"msg": "账号或密码密码错误"})
    }

});

/*
 * @function 自己获取选课情况
* @param uid(string) 学号
 * @return choice(string)
 */
router.get('/getChoice', urlencodedParser, function (req, res, next) {
	let params = req.query;

	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	accountCollection.findOne({uid: params.uid}, function (err, data) {
		if(data && params.password == data.password){
			res.status(200).json({'code': "1","data": data})
		}
		else{
			res.status(200).json({'code': "-1","data": ''})
		}

	});
});


/*
 * @function 管理员获取选课情况
 */
router.get('/getAllData', urlencodedParser, function (req, res, next) {
	let params = req.query;
	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	if(params.uid == "xxxxxx" && params.password == "xxxxxx"){
		accountCollection.find().sort({"score": -1}).toArray(function (err, allData) {
			res.status(200).json({
				code: 1,
				msg:  "查询成功",
				data: allData
			});
		})
	}
	else{
		res.status(200).json({ "code": "-1" ,"msg": "账号或密码密码错误"})
	}
});


//设置
router.post('/settings', urlencodedParser, function (req, res, next) {
	let TimeData = {
		maxNums: req.body.maxNums,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
		content:req.body.content,
	}

	let timeCollection = informationDB.getCollection("18Course","TIME");
	timeCollection.findOne({}, function (err, data) {
		if(!data){
			timeCollection.insertOne(TimeData)
		}
		else{
			timeCollection.update({},{$set: {'startTime': TimeData.startTime, 'endTime': TimeData.endTime, 'content':TimeData.content, 'maxNums': TimeData.maxNums}})
		}
		res.status(200).json({ "code": "1" ,"msg": "设置成功"})
	});

});

//获取设置信息
router.get('/getSettings', urlencodedParser, function (req, res, next) {;
	let timeCollection = informationDB.getCollection("18Course","TIME");
	timeCollection.findOne({}, function (err, data) {
		if(data){
			res.status(200).json({ "code": "1" ,"msg": "获取成功","settings": data})
		}
		else{
			res.status(200).json({ "code": "-2" ,"msg": "未设置时间"})
		}
		
	});

});

//获取数字
router.get('/getStudentNums', urlencodedParser, function (req, res, next) {
	let params = req.query;
	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	accountCollection.find().sort({"score": -1}).toArray(function (err, allData) {
		let Nums = {
			a : 0,
			b : 0,
			c : 0,
			d : 0,
			e : 0,
			f : 0		
		}

		for(i = 0; i < allData.length; ++i){
			item = allData[i]
			if(item.choice == "a"){
				Nums.a += 1
			}
			else if(item.choice == "b"){
				Nums.b += 1
			}
			else if(item.choice == "c"){
				Nums.c += 1
			}
			else if(item.choice == "d"){
				Nums.d += 1
			}
			else if(item.choice == "e"){
				Nums.e += 1
			}
			else if(item.choice == "f"){
				Nums.f += 1
			}
		}
		res.status(200).json({ "code": "1" ,"nums": Nums})
	})

});


//导出excel
router.get('/download/excel', urlencodedParser, function (req, res, next) {

    let datas = [];
    let cols = ['排名','学号', '姓名', '班级', '成绩', '是否选课', '选课选项', '最终结果'];
    datas.push(cols);
    
	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	accountCollection.find().sort({"score": -1}).toArray(function (err, allData) {
        var tows = ['paiming','uid', 'name', 'class', 'score', 'chooseOrNot', 'choice', 'result'];
        
        let towsLen = tows.length
        let dataLen = allData.length

        for(var i = 0; i < dataLen; ++i){
            let row = [];
            for (let j = 0; j < towsLen; j++){
                row.push(allData[i][tows[j]].toString())
            }
            datas.push(row);
        }

        var buffer = xlsx.build([{name: "18选课", data: datas}]);


        fs.writeFileSync('/root/EIC/BackStage/18选课.xlsx', buffer, 'binary');

        res.status(200).json({
            code: 1,
            msg:  "导出成功",
            url: "18选课.xlsx"
        });

	})
});

//获取选课结果
router.get('/getResult', urlencodedParser, function (req, res, next) {
	let accountCollection = informationDB.getCollection("18Course","ACCOUNT");
	let timeCollection = informationDB.getCollection("18Course","TIME");

	timeCollection.findOne({}, function (err, data) {
		if(data){
			data.maxNums = JSON.parse(data.maxNums)
			DXNum = data.maxNums.dianxin
			TXNum = data.maxNums.tongxin
			DCNum = data.maxNums.dianci
			DXCounter = 0
			TXCounter = 0
			DCCounter = 0
			accountCollection.find().sort({"score": -1}).toArray(function (err, allData) {
				for(i = 0; i < allData.length; ++i){
					item = allData[i]
					if(item.choice == "a"){
						if(DXCounter < DXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电信"}})
							DXCounter += 1
						}
						else if(TXCounter < TXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "通信"}})
							TXCounter += 1
						}
						else if(DCCounter < DCNum){
								accountCollection.update({uid: item.uid}, {$set:{'result': "电磁"}})
								DCCounter += 1
							}
					}
					else if(item.choice == "b"){
						if(DXCounter < DXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电信"}})
							DXCounter += 1
						}
						else if(DCCounter < DCNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电磁"}})
							DCCounter += 1
						}
						else if(TXCounter < TXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "通信"}})
							TXCounter += 1
						}
					}
					else if(item.choice == "c"){
						if(DCCounter < DCNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电磁"}})
							DCCounter += 1
						}
						else if(DXCounter < DXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电信"}})
							DXCounter += 1
						}
						else if(TXCounter < TXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "通信"}})
							TXCounter += 1
						}
					}
					else if(item.choice == "d"){
						if(DCCounter < DCNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电磁"}})
							DCCounter += 1
						}
						else if(TXCounter < TXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "通信"}})
							TXCounter += 1
						}		
						else if(DXCounter < DXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电信"}})
							DXCounter += 1
						}
					}
					else if(item.choice == "e"){
						if(TXCounter < TXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "通信"}})
							TXCounter += 1
						}	
						else if(DXCounter < DXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电信"}})
							DXCounter += 1
						}
						else if(DCCounter < DCNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电磁"}})
							DCCounter += 1
						}
					}
					else if(item.choice == "f"){
						if(TXCounter < TXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "通信"}})
							TXCounter += 1
						}	
						else if(DCCounter < DCNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电磁"}})
							DCCounter += 1
						}
			
						else if(DXCounter < DXNum){
							accountCollection.update({uid: item.uid}, {$set:{'result': "电信"}})
							DXCounter += 1
						}
					}
				}
				res.status(200).json({ "code": "1" ,"msg": "更新成功"})
			})
		}
		else{
			res.status(200).json({ "code": "-1" ,"msg": "更新失败，请检查设置"})
		}
	})
})

module.exports = router;
