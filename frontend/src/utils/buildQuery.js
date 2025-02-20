export const buildQuery = (data)=>{
    const entries = Object.entries(data)
    const filteredEntries = []
    entries.forEach(entry=>{
      if (entry[0] && entry[1]){
        filteredEntries.push(entry)
      }
    })
      let query=``
      for (let i=0;i<filteredEntries.length;i++){
        if (filteredEntries[i][1]!==''){
          if(i===0){
            query+=`?${filteredEntries[0][0]==='price'?'price[lte]':filteredEntries[0][0]}=${filteredEntries[0][1]}`
          }else if (filteredEntries[i][0]==='price'){
            query+=`&${filteredEntries[i][0]}[lte]=${filteredEntries[i][1]}`
          }else{
          query+=`&${filteredEntries[i][0]}=${filteredEntries[i][1]}`
          }
        }
      }
    return query
}
