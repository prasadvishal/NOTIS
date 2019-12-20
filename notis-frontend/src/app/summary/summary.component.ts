import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
	abc = 'Inside Summary Component'
	tradeDataList : Array<any> = [];
	public form: FormGroup;
  	constructor( 
  		private fb: FormBuilder,
  		private router: Router)
  	 { }

	  ngOnInit() {
	  	this.form = this.fb.group({     // {5}
	  		dateLimit: ['', Validators.required]
	  	});
	  	this.genrateData();
	  	console.log("Trade Data List ---> ",this.tradeDataList)
  	}

  	genrateData(){
  	this.tradeDataList =[{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081237',
  		'trade_time': '10:17:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111292",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081238',
  		'trade_time': '10:19:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111253",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081239',
  		'trade_time': '10:21:53',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111342",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081237',
  		'trade_time': '10:17:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111292",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081238',
  		'trade_time': '10:19:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111253",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081239',
  		'trade_time': '10:21:53',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111342",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081237',
  		'trade_time': '10:17:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111292",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081238',
  		'trade_time': '10:19:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111253",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081239',
  		'trade_time': '10:21:53',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111342",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081237',
  		'trade_time': '10:17:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111292",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081238',
  		'trade_time': '10:19:23',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111253",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	},{
  		'trade_date':'21 DEC 2019',
  		'market': 'N',
  		'trade_no': '20191221081239',
  		'trade_time': '10:21:53',
  		'symbol':'RADICO',
  		'series': 'EQ',
  		'quantity': 432,
  		'price': 303.71,
  		'trade_value':131202.72,
  		'buy_sell': 'B',
  		'order_no':"1300000000 111342",
  		'branch_no':1,
  		'user_id':44215,
  		'client_type':'CLI',
  		'client_ac':50045,
  		'cp_code':'INST',
  		'remarks':null
  	}]
  }


}
