import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from "file-saver";
import 'rxjs/Rx' ;
import * as $ from 'jquery';
import { SummaryService } from '../services/summary/summary.service';
import { Constants } from '../app.constants';
import { LoaderService } from '../loader/services/loader.service';
import { NotificationService } from '../notification/services/notification.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
	public form: FormGroup;
  public filterform : FormGroup;
	public switchMarketForm : FormGroup;
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
    fileToUpload: File = null;
    fileErrorMsg = null;
    fileError = true;
    allowedMarkets : Array<string> = [];

    @ViewChild('transactionBackupModal', null) transactionBackupModal :ElementRef;
    @ViewChild('tradeFilterModal', null) tradeFilterModal :ElementRef;
    @ViewChild('uploadFileModal', null) uploadFileModal :ElementRef;
    @ViewChild('switchMarketModal', null) switchMarketModal :ElementRef; 

  	constructor( 
  		private fb: FormBuilder,
      private fltrfrm: FormBuilder,
  		private switchMrktfrm: FormBuilder,
      private summaryService : SummaryService,
      private loaderService:LoaderService,
      private notificationService: NotificationService,
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
            tradeType:  ['', Validators.required],
            mkt: ['', Validators.required],
            sym :  ['', Validators.required],
            ser :  ['', Validators.required],
            brnCd: ['', Validators.required],
            usrId:   ['',Validators.required],
            cliActNo: ['',Validators.required],
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
        this.switchMarketForm = this.switchMrktfrm.group({     // {5}
          newMarket: ['', '']
        });
		  	this.filterform = this.fltrfrm.group({     // {5}
		  		tradeType:  ['', Validators.required],
		  		mkt: ['', Validators.required],
		  		sym :  ['', Validators.required],
		  		ser :  ['', Validators.required],
		  		brnCd: ['', Validators.required],
		  		usrId: 	['',Validators.required],
		  		cliActNo: ['',Validators.required],
		  		timmerCheck: 	['',Validators.required],
		  		filePath: 		['', Validators.required],
		  		fileName: 		['', Validators.required],
		  		includeDateInFilename: ['', Validators.required],
		  		startNoFilter: 	['',Validators.required],
		  		endNoFilter: 	['',Validators.required]
		  	});
		  	//this.genrateData();
        let userinfo = JSON.parse(localStorage.getItem('userData'));
        if(userinfo.permitted_markets){  
          this.allowedMarkets = userinfo.permitted_markets.split(',');
        }
        this.getTradeData();
        this.getFiltersMetadata();
        console.log("Trade Filters List ---> ",this.symbols, this.series, this.userIds)
		    console.log("this.allowedMarkets ---> ",this.allowedMarkets)
        }
  	};

    showUploadFileModal() {
        console.log("Inside showUploadFileModal()");
        $("#upload-file-modal").show();
    };



    uploadCsvFile() {

        if(this.fileToUpload){

          this.loaderService.show();
            this.summaryService.postFile({marketType: this.marketType, token: localStorage.getItem('token')} ,this.fileToUpload).subscribe((data: any) => {
              if(data && data.code && data.code == 200){
                this.notificationService.show("File Sucessfully Uploaded.");
                this.closeUploadFileModal()
                //alert("File Sucessfully Uploaded.");
              }
              }, error => {
                //console.log("Error in uploading File: ",error);
                this.notificationService.show("Error in uploading File.");
                //alert(error);
              });
              this.loaderService.hide();
        }
        //$("#upload-file-modal").show();
    };

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        console.log("Inside handleFileInput()", this.fileToUpload);
        if(this.marketType == 'CM' && !['security.txt', 'security.csv'].includes(this.fileToUpload.name.toLowerCase())){
            this.fileError = true;
            this.fileErrorMsg = `Invalid file, please select 'security.txt/security.csv`;
        }else if(this.marketType == 'CD' && !['cd_contract.txt', 'cd_contract.csv'].includes(this.fileToUpload.name.toLowerCase())){
            this.fileError = true;
            this.fileErrorMsg = `Invalid file, please select 'cd_contract.txt/cd_contract.csv`;
        }else if(this.marketType == 'FO' && !['contract.txt', 'contract.csv'].includes(this.fileToUpload.name.toLowerCase())){
            this.fileError = true;
            this.fileErrorMsg = `Invalid file, please select 'contract.txt/contract.csv`;
        }else{
            this.fileError = false;
            this.fileErrorMsg = null;
        }
        //$("#upload-file-modal").show();
    };

  	showTransactionBackupModal() {
  		console.log("Inside showTransactionBackupModal()");
  		$("#transaction-backup-modal").show();
  	};

    showTradeFilterModal() {
        console.log("Inside showTradeFilterModal()");
        $("#trade-filter-modal").show();
    };

    showSwitchMarketModal() {
        console.log("Inside showSwitchMarketModal()");
        $("#switch-market-modal").show();
    };

    closeTransactionBackupModal() {
        this.transactionBackupModal.nativeElement.click();
    };

    closeTradeFilterModal() {
      this.tradeFilterModal.nativeElement.click();
    };

    closeUploadFileModal() {
      this.uploadFileModal.nativeElement.click();
    };

    closeSwitchMarketModal() {
      this.switchMarketModal.nativeElement.click();
    };

	resetFilters(){
    this.filterform.reset();
    this.notificationService.show("Filters Removed Succesfully.")
		this.getTradeData();	
	}

  switchMarket(){
    console.log("Switch Market Form --> ",this.switchMarketForm.value);
    //localStorage.setItem('marketType', '');
  }

  getFilteredData() {
      this.loaderService.show();
      console.log("Filter Form --> ",this.filterform.value);
      let filterObj = {};
      for(let key of Object.keys(this.filterform.value))
      {
          if(this.filterform.value[key] == "" || this.filterform.value[key] == null || this.filterform.value[key] == undefined){
              continue;
          }else{
              filterObj[key] = this.filterform.value[key];
          }
      }
      console.log("Filter Object: ",filterObj);
      this.summaryService.getTradeData({marketType: this.marketType, token: localStorage.getItem('token'), filters:filterObj}).subscribe((data: any) => {
      console.log("getTradeData Response ----------> ",data);
      if(data.code == 200 && data.data && data.data.TradeData && data.data.TradeData.length){
        this.tradeDataList = [];
        let tradeDataListRes = data.data.TradeData;
        this.headers = Object.keys(data.data.TradeData[0]);
        this.totalBuyValue = data.data.TotalBuy;
        this.totalSellValue = data.data.TotalSell;
        this.totalTradeValue = data.data.TotalTradeValue;
        this.totalTrade = data.data.TotalTrade;

        for(let trade of tradeDataListRes)
        {
          this.tradeDataList.push(Object.values(trade))
	  }
        console.log("Succfull filtered");
        this.closeTradeFilterModal();
	      //$("#trade-filter-modal").hide();
      }
      else if(data.code == 401){
        this.notificationService.show("Session Expired. Login Again.");
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
      this.loaderService.hide();

      })
  };


    getTradeData(){
      this.marketType = localStorage.getItem('marketType');
      this.loaderService.show();
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
            this.notificationService.show("Session Expired. Login Again.")
            //alert("Session Expired. Login Again.");
            //console.log("Session Expired. Login Again.")
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('userData', '');
            localStorage.setItem('marketType', '');
            localStorage.setItem('token', '');
            this.router.navigate(['/login']);
        }else if(data.code == 403){
            this.notificationService.show(data.error)
            //alert("Session Expired. Login Again.");
            //console.log("Session Expired. Login Again.")
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('userData', '');
            localStorage.setItem('marketType', '');
            localStorage.setItem('token', '');
            this.router.navigate(['/login']);
        }
        else{
          console.log("Error / No Data");
        }
        this.loaderService.hide();

      })
    } ; 


    takeTradeBackup() {
        console.log("Filter Form Trade Backup --> ",this.filterform.value);
        let filterObj = {};
        for(let key of Object.keys(this.filterform.value))
        {
            if(this.filterform.value[key] == "" || this.filterform.value[key] == null || this.filterform.value[key] == undefined){
                continue;
            }else{
                filterObj[key] = this.filterform.value[key];
            }
        }
        //console.log("Filter Object: ",filterObj);
        this.summaryService.getTradeDataBackup({marketType: this.marketType, token: localStorage.getItem('token'), filters:filterObj}).subscribe((data: any) => {
        console.log("getTradeData Response ----------> ",data);
        this.notificationService.show(data.msg);
        //alert(data.msg);
        this.loaderService.hide();
        this.closeTransactionBackupModal();
        })
    };


    getFiltersMetadata(){
      this.marketType = localStorage.getItem('marketType');
      this.loaderService.show();
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

            this.notificationService.show("Session Expired. Login Again.");
            //console.log("Session Expired. Login Again.")
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('userData', '');
            localStorage.setItem('marketType', '');
            localStorage.setItem('token', '');
            this.router.navigate(['/login']);
        }
        else{
          console.log("Error / No Data");
        }
        this.loaderService.hide();

      })
    } ;   
  

}
