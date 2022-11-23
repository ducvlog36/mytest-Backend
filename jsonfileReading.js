const fs = require('fs');

try {

    // get all tu vung
    const data = fs.readFileSync('tuvung_main.json', 'utf8');
    const tuvungAll = []
    const database = JSON.parse(data);
    database.forEach(db => {
        tuvungAll.push(db)
    });

    //get tu vung mimi
    const data2 = fs.readFileSync('mimin3.json', 'utf8');
    const tuvung = []
    const database2 = JSON.parse(data2);
    database2.forEach(db => {
        tuvung.push(db)
    });


    const data3 = fs.readFileSync('giaotrinhs.json', 'utf8');
    const giaotrinh = []
    const database3 = JSON.parse(data3);
    database3.forEach(db => {
        giaotrinh.push(db)
    });
    //console.log(giaotrinh)

  // let mimi = []
  // giaotrinh[0].tuvung.forEach((tv)=>{
  //     for(let i = 0; i < tuvungAll.length; i++){
  //         if(tv === tuvungAll[i]._id.$oid){
  //             mimi.push(tuvungAll[i].wordDict)
  //             console.log(tuvungAll[i].wordDict)
  //         }
  //     }
  // })


  let tuvung_n3 = []

     tuvung.forEach((tv)=>{
         for(let i = 0; i < tuvungAll.length; i++){
             if(tv.tuvung === tuvungAll[i].wordDict){
                console.log(tuvungAll[i]._id.$oid)
                tuvung_n3.push(tuvungAll[i]._id.$oid)
             }
         }
     })
 // 
 // console.log(tuvungAll[0]._id.$oid)

  fs.writeFileSync('id.json',JSON.stringify(tuvung_n3),'utf8');

 // fs.writeFileSync('giaotrinhs.json',JSON.stringify(giaotrinh),'utf8');
 // 
 // console.log(`File is written successfully!`);

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}