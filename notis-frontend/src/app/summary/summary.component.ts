import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SummaryService } from '../services/summary/summary.service';
import { Constants } from '../app.constants';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
	public form: FormGroup;
	public filterform : FormGroup;
	totalBuyValue : Number = 0;
	totalSellValue: Number = 0;
	totalTradeValue:Number = 0;
	totalTrade: Number = 0; 
	tradeDataList : Array<any> = [];
	marketIds: Array<any> = Constants.MARKET_IDS.filter(x => x.market_type == localStorage.getItem('marketType'));
	symbols: Array<string> = ['symbol1', 'symbol2', 'symbol3', 'symbol4'];
    series: Array<string> = ['Series1', 'Series2','Series3','Series4'];
    headers: Array<string> = [];
    userIds: Array<string> = [];
    cliAccounts: Array<string> = [];
	branches: Array<string> = [];
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
        this.getFiltersMetadata();
        console.log("Trade Filters List ---> ",this.symbols, this.series, this.userIds)
		console.log("Trade Data List ---> ",this.tradeDataList)
        }
  	};

  	showTransactionBackupModal() {
  		console.log("Inside showTransactionBackupModal()");
  		$("#transaction-backup-modal").show();
  	};


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
    };

    getTradeData(){
      this.marketType = localStorage.getItem('marketType');
      this.hideLoader = false;
	  console.log("getTradeData() TOKEN -------> ",localStorage.getItem('token'))
      this.summaryService.getTradeData({marketType: this.marketType, token: localStorage.getItem('token')}).subscribe((data: any) => {
        console.log("getTradeData Response ----------> ",data);
        if(data.code == 200 && data.data && data.data.TradeData && data.data.TradeData.length){
          this.tradeDataList = [];
          let tradeDataListRes = data.data.TradeData;
          this.headers = Object.keys(data.data.TradeData[0]);
          this.totalBuyValue = data.data.TotalBuy;
          this.totalSellValue = data.data.TotalSell;
          this.totalTradeValue = data.data.TotalTradeValue;
          this.totalTrade = data.data.TotalTrade;

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
    } ; 

    getFiltersMetadata(){
      this.marketType = localStorage.getItem('marketType');
      this.hideLoader = false;
      console.log("getFiltersMetadata() TOKEN -------> ",localStorage.getItem('token'))
      this.summaryService.getFiltersMetadata({marketType: this.marketType, token: localStorage.getItem('token')}).subscribe((data: any) => {
        console.log("getFiltersMetadata Response ----------> ",data);
        if(data.code == 200 && data.data){
          this.symbols = data.data.symbols.map(x => (x.symbol));
          this.series = data.data.series.map(x => (x.series));
          this.userIds = data.data.userinfo.map(x => (x.user_id));
          this.branches = data.data.branches.map(x => (x.branch));
          this.cliAccounts = data.data.cliAccounts.map(x => (x.cli_act_no));
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
    } ;   
  

}
