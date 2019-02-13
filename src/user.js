import {isEqual} from 'lodash';
import styles from './styles.scss';
export class User {
  constructor({user}={}){
    this.user = user;
  }

  greetUser(){
    console.log(`Hello ${this.user}`);
    console.log('styles', styles);
  }
}