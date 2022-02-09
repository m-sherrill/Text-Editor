import { openDB } from 'idb';


// Initiate the database
const initdb = async () =>
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
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try{
  console.log('Post to the database');
  const contentAdd = await openDB('jate', 1);
  console.log(contentAdd)
  const tx = contentAdd.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  const request = store.put({id:1,  content: content});
  const result = await request;
  console.log('🚀 - data saved to the database', result);
} catch(error) {
  console.log(error, "ERROR IN putDB!!")
}
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
try {
  const jateDb = await openDB('jate', 1);
 const tx = jateDb.transaction('content', 'readonly');
 const store = tx.objectStore('content');
 const request = store.get(1);
 const result = await request;
 console.log('result.value', result);
 return result.value;
} catch(error) {
  console.log(error, "ERROR IN GET DB!!!")
}
}


// Start
initdb();
