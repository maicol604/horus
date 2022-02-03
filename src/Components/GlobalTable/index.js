import React,{useState} from 'react';
import MaterialTable from "@material-table/core";
//import { ExportCsv, ExportPdf } from '@material-table/exporters';
 import ExportCsv from '@material-table/exporters/csv';
 import ExportPdf from '@material-table/exporters/pdf';
function GlobalTable({columns,alldata, title  }) {
  
  const [data, setData] = useState(alldata);
  function getNewDataBulkEdit(changes, copyData) {
    // key matches the column data id
    const keys = Object.keys(changes);
    for (let i = 0; i < keys.length; i++) {
      if (changes[keys[i]] && changes[keys[i]].newData) {
        // Find the data item with the same key in copyData[]
        let targetData = copyData.find((el) => el.id === keys[i]);
        if (targetData) {
          let newTargetDataIndex = copyData.indexOf(targetData);
          copyData[newTargetDataIndex] = changes[keys[i]].newData;
        }
      }
    }
    return copyData;
  }

    return (
      <MaterialTable 
      columns={columns}
       data={data} 
       title={title}
       editable={{
        onBulkUpdate: (changes) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let copyData = [...data];
              setData(getNewDataBulkEdit(changes, copyData));
              resolve();
            }, 1000);
          })
        },
        onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
        onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
        onRowAdd: (newData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.id = "uuid-" + Math.random() * 10000000;
              setData([...data, newData]);
              resolve();
            }, 1000);
          });
        },
        onRowUpdate: (newData, oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              // In dataUpdate, find target
              const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
              const index = dataUpdate.indexOf(target);
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve();
            }, 1000);
          });
        },
        onRowDelete: (oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const target = dataDelete.find((el) => el.id === oldData.tableData.id);
              const index = dataDelete.indexOf(target);
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              resolve();
            }, 1000);
          });
        },
      }}
      options={{
        // ...
        exportMenu: [{
          label: 'Export PDF',
          //// You can do whatever you wish in this function. We provide the
          //// raw table columns and table data for you to modify, if needed.
          // exportFunc: (cols, datas) => console.log({ cols, datas })
          exportFunc: (cols, datas) => ExportPdf(cols, datas, 'myPdfFileName')
        }, {
          label: 'Export CSV',
          exportFunc: (cols, datas) => ExportCsv(cols, datas, 'myCsvFileName')
        }]
      }}
       />
  );
    
}

export default GlobalTable;
