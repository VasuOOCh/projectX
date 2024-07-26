import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from 'mongoose'

let connection : {
  isConnected : boolean,
} = {
  isConnected : false
}

export const connectToDb = async ()=>{
  try {
    if(connection.isConnected) {
      console.log("Using existing connection");
      
    }
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/projectx');
    console.log("Formed new DB connection");
    if(db.connections[0].readyState == 1) {
      connection.isConnected = true;
    }
    
  } catch (error) {
    console.log(error);
    
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
