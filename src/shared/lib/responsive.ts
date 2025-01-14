"use server" 

import {headers} from  'next/headers' ; 
import { UAParser } from  'ua-parser-js' ; 

export  const  isMobileDevice = ( ) => { 
  if ( typeof process === 'undefined' ) { 
    throw  new  Error ( '[Server method] вы импортируете серверный модуль за пределами сервера' ); 
  } 

  const { get } = headers (); 
  const ua = get ( 'user-agent' ); 
  const device = new  UAParser (ua || '' ) .getDevice (); 

  return device.type === 'mobile' ; 
};