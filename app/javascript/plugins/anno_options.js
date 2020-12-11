
import { Annotorious } from '@recogito/annotorious';
import $ from 'jquery';

console.log("load")

const initAnnotorious = () => {  
  console.log("foi");
  const anno = new Annotorious({
    image: document.getElementById('annotable')
  });

}

export {initAnnotorious} 