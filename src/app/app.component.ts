import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'convert-excel-to-json';
  json! : string;

  fileUpload(event:any){
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) =>{
      console.log(event);
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, {type : 'binary'});
      console.log(workBook)
      workBook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
        console.log(data);
        this.json = JSON.stringify(data, undefined, 4);
      })
    }
  }
}
