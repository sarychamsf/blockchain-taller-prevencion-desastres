import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const PrevencionDesastres_artifacts = require('../../../build/contracts/PrevencionDesastres.json');

@Component({
  selector: 'app-agregar-registro',
  templateUrl: './agregar-registro.component.html',
  styleUrls: ['./agregar-registro.component.css']
})
export class AgregarRegistroComponent implements OnInit {

  //contrato
  PrevencionDesastres: any;
  accounts: string[];
  status: string;
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  }

  id:number;
  day:number;
  month:number;
  year:number;
  latitud:string;
  longitud:string;
  caudal:string;


  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.web3Service.artifactsToContract(PrevencionDesastres_artifacts)
      .then((GasEstationAbstraction) => {
        this.PrevencionDesastres = GasEstationAbstraction;
        this.PrevencionDesastres.deployed().then(deployed => {
          console.log("deployed " + deployed);
        });
      });
  }

  async hacerRegistro() {

    if (!this.PrevencionDesastres) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      console.log(this.id+" "+ this.day+" "+ this.month+" "+ this.year+" "+ this.latitud+" "+ this.longitud+" "+ this.caudal);
      const deployedPrevencionDesastres = await this.PrevencionDesastres.deployed();
     
      const hacerRegistro = await deployedPrevencionDesastres.hacerRegistro.sendTransaction(this.id, this.day, this.month, this.year, this.latitud, this.longitud, this.caudal, { from: this.model.account });
      
      if (!hacerRegistro) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }

    } catch (e) {
      console.log(e);
      this.setStatus('Error; see log.');
    }
    
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];

    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, { duration: 3000 });
  }


}

