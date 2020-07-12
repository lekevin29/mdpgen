import { Component } from '@angular/core';
import { splitAtColon } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  longueur = 8;
  mdp: string;
  solidite: number;
  phraseSolidite: string;
  checkMajuscules = true;
  checkMinuscules = true;
  checkChiffres = true;
  checkCaracteresSpeciaux = true;
  checkMotDePasse = false;

  generer(): void {
    let result = '';
    let caracteresSouhaites = '';
    const majuscules = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const minuscules = `abcdefghijklmnopqrstuvwxyz`;
    const chiffres = `01234567890123456789`;
    const caracteresSpeciaux = `"'(-_çà)=~#{[|@]},;:!?./§<>$¤£µ*%ù`;
    if (this.checkMajuscules === true) {
      caracteresSouhaites += majuscules;
    }
    if (this.checkMinuscules === true) {
      caracteresSouhaites += minuscules;
    }
    if (this.checkChiffres === true) {
      caracteresSouhaites += chiffres;
    }
    if (this.checkCaracteresSpeciaux === true) {
      caracteresSouhaites += caracteresSpeciaux;
    }
    const charactersLength = caracteresSouhaites.length;
    for (let i = 0; i < this.longueur; i++) {
      result += caracteresSouhaites.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.mdp = result;
    this.checkMotDePasse = true;
    this.calculSolidite();
  }
  plus(chiffre: number): void {
    this.longueur += chiffre;
    if (this.longueur > 32) {
      this.longueur = 32;
    }
  }
  moins(chiffre: number): void {
    this.longueur -= chiffre;
    if (this.longueur < 8) {
      this.longueur = 8;
    }
  }
  calculSolidite(): void {

    let max = 0;
    this.solidite = 0;

    if (this.checkMajuscules) {
      max += 20;
      this.solidite += 10;
    }
    if (this.checkMinuscules) {
      max += 20;
      this.solidite += 10;
    }
    if (this.checkChiffres) {
      max += 25;
      this.solidite += 15;
    }
    if (this.checkCaracteresSpeciaux) {
      max += 35;
      this.solidite += 20;
    }
    this.solidite += 1.4 * this.longueur;

    if (this.solidite > max) {
      this.solidite = max;
    }

    this.solidite = Math.round(this.solidite);

    if (this.solidite <= 25) {
      this.phraseSolidite = 'ton mot de passe il est naze';
    }
    else if (this.solidite <= 50) {
      this.phraseSolidite = 'ton mot de passe il est pas ouf';
    }
    else if (this.solidite <= 75) {
      this.phraseSolidite = 'ton mot de passe il est bien ';
    }
    else if (this.solidite <= 100) {
      this.phraseSolidite = 'ton mot de passe il est sécurisé de fou';
    }
  }
}

