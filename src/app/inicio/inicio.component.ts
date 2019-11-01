import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { Registro } from './Registro';

declare let require: any;
const PrevencionDesastres_artifacts = require('../../../build/contracts/PrevencionDesastres.json');

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

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

  id: number;

  Registros: Registro[] = [];

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

  async mostrarRegistros() {

    if (!this.PrevencionDesastres) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    this.setStatus('Initiating transaction... (please wait)');

    try {

      const deployedPrevencionDesastres = await this.PrevencionDesastres.deployed();

      const cantidadRegistros = await deployedPrevencionDesastres.getRegistros.call();
      console.log(cantidadRegistros);
      console.log(cantidadRegistros.words[0]);
      for (let i = 0; i < cantidadRegistros.words[0]; i++) {
        const verRegistros = await deployedPrevencionDesastres.consultarRegistro.call(i+1);
        console.log(verRegistros);
        var r = new Registro(verRegistros[0],verRegistros[1],verRegistros[2],verRegistros[3],verRegistros[4],verRegistros[5],verRegistros[6]);
        this.Registros.push(r);

      }


      if (!cantidadRegistros) {
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