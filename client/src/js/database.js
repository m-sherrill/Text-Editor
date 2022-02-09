import { openDB } from 'idb';


// Initiate the database
const initdb = async () => {
console.log("IN INIT DB!!!")
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate content')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate content', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  })
}

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  const jateDb  = await openDB('jate', 1)
  const tx = jateDb.transaction('jate content', 'readwrite');
  const store = tx.objectStore('jate content');
  const request = store.add({content})
  console.log('🚀 - data saved to the database');
  return request
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
const jateDb = await openDB('jate', 1);
 const tx = jateDb.transaction('jate content', 'readonly');
 const store = tx.objectStore('jate content');
 const request = store.getAll();
 const result = await request;
 console.log('🚀 - data received from to the database');
 return result; 
}


// Start
initdb();
