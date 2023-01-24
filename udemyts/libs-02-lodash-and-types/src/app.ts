import _ from 'lodash'; // you have to install lodash library first if you want to use it npm --save lodash
//-- In addition you install npm install --save-dev @types/lodash so that Ts can know how to use lodash --//
//--Lodash is for vanilla JS ---//
import "reflect-metadata"
//NOTE: you will also install more Node.js like npm install class-transformer --save and npm install reflect-metadata //
//NOTE: npm install class-validator --save is found in class-validator(google) this helps makes validation easier for bigger projects--//
console.log(_.shuffle([1, 2, 3]));
