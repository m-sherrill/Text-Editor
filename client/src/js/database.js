import { openDB } from 'idb';


// Initiate the database
const initdb = async () => {
console.log("IN INIT DB!!!")
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  })
}

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try{
  console.log('Post to the database');
  const jateDb  = await openDB('jate', 1);
  console.log("after jatedb")
  const tx = await jateDb.transaction('jate content', 'readwrite');
  console.log("after tx")
  const store = await tx.objectStore('jate content');
  console.log("after store")
  const request = await store.add({content});
  console.log("after request")
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
} catch(error) {
  console.log("ERROR IN putDB!!")
}
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
try {
const jateDb = await openDB('jate', 1);
 const tx = jateDb.transaction('jate content', 'readonly');
 const store = tx.objectStore('jate content');
 const request = store.getAll();
 const result = await request;
 console.log('result.value', result);
 return result.value;
} catch(error) {
  console.log(error, "ERROR IN GET DB!!!")
}
}


// Start
initdb();
