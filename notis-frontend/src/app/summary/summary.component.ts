import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SummaryService } from '../services/summary/summary.service';


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
	headers: Array<string> = [];
  marketType : string;
  hideLoader: boolean = true ;

  	constructor( 
  		private fb: FormBuilder,
  		private fltrfrm: FormBuilder,
      private summaryService : SummaryService,
  		private router: Router)
  	 { }

	  ngOnInit() {
      console.log("isLoggedIn ---> ",localStorage.getItem('isLoggedIn'));
  		if( !localStorage.getItem('isLoggedIn') || localStorage.getItem('isLoggedIn')==undefined || localStorage.getItem('isLoggedIn')=='undefined' || localStorage.getItem('isLoggedIn') == 'false'){
  	    	this.router.navigate(['/login']);
          this.form = this.fb.group({     // {5}
            dateLimit: ['', Validators.required]
          });
          this.filterform = this.fltrfrm.group({     // {5}
            tradeTypeFilter:  ['', Validators.required],
            marketTypeFilter: ['', Validators.required],
            symbolFilter :  ['', Validators.required],
            seriesFilter :  ['', Validators.required],
            branchIdFilter: ['', Validators.required],
            userFilter:   ['',Validators.required],
            cliAccountFilter: ['',Validators.required],
            timmerCheck:  ['',Validators.required],
            filePath:     ['', Validators.required],
            fileName:     ['', Validators.required],
            includeDateInFilename: ['', Validators.required],
            startNoFilter:  ['',Validators.required],
            endNoFilter:  ['',Validators.required]
          });

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
		  	//this.genrateData();
        this.getTradeData();
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

    getTradeData(){
      this.marketType = localStorage.getItem('marketType');
      this.hideLoader = false;
	  console.log("getTradeData() TOKEN -------> ",localStorage.getItem('token'))
      this.summaryService.getTradeData({marketType: this.marketType, token: localStorage.getItem('token')}).subscribe((data: any) => {
        console.log("getTradeData Response ----------> ",data);
        if(data.code == 200 && data.data.length){
          this.tradeDataList = [];
          let tradeDataListRes = data.data;
          this.headers = Object.keys(data.data[0])
          for(let trade of tradeDataListRes){
            this.tradeDataList.push(Object.values(trade))
          }
        }else if(data.code == 401){
            alert("Session Expired. Login Again.");
            console.log("Session Expired. Login Again.")
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('userData', '');
            localStorage.setItem('marketType', '');
            localStorage.setItem('token', '');
            this.router.navigate(['/login']);
        }
        else{
          console.log("Error / No Data");
        }
        this.hideLoader = true;

      })
    }    

}
