import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
	public form: FormGroup;
	public filterform : FormGroup;
	totalBuyValue : Number = 101083731;
	totalSellValue: Number = 528195326;
	totalTradeValue:Number = 762515373;
	totalTrade: Number = 62628191736; 
	tradeDataList : Array<any> = [];
	marketIds: Array<string> = ['CM', 'FO', 'CD', 'DT', 'SLB' , 'CO'];
	symbols: Array<string> = ['symbol1', 'symbol2', 'symbol3', 'symbol4'];
	series: Array<string> = ['Series1', 'Series2','Series3','Series4'];

  	constructor( 
  		private fb: FormBuilder,
  		private fltrfrm: FormBuilder,
  		private router: Router)
  	 { }

	  ngOnInit() {
  		if(localStorage.getItem('isLoggedIn') == 'false'){
  	    	this.router.navigate(['/login']);

  		}else{
	  		this.form = this.fb.group({     // {5}
		  		dateLimit: ['', Validators.required]
		  	});
		  	this.filterform = this.fltrfrm.group({     // {5}
		  		tradeTypeFilter:  ['', Validators.required],
		  		marketTypeFilter: ['', Validators.required],
		  		symbolFilter :  ['', Validators.required],
		  		seriesFilter :  ['', Validators.required],
		  		branchIdFilter: ['', Validators.required],
		  		userFilter: 	['',Validators.required],
		  		cliAccountFilter: ['',Validators.required],
		  		timmerCheck: 	['',Validators.required],
		  		filePath: 		['', Validators.required],
		  		fileName: 		['', Validators.required],
		  		includeDateInFilename: ['', Validators.required],
		  		startNoFilter: 	['',Validators.required],
		  		endNoFilter: 	['',Validators.required]
		  	});
		  	this.genrateData();
		  	console.log("Trade Data List ---> ",this.tradeDataList)
  		}

  	}

  	showTransactionBackupModal(){
  		console.log("Inside showTransactionBackupModal()");
  		$("#transaction-backup-modal").show();
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
  		'remarks':"----------- remarks ----------",
  		"cto_id":10100101010
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
  		'remarks':"----------- remarks ----------",
  		"cto_id":10100101010
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
  		'remarks':null,
  		'cto_id':2625252525
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
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
  		'remarks':null,
  		'cto_id':234567809
  	}]
  }


}
