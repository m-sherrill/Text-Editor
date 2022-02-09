
import { openDB } from 'idb';

// init the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('Post to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ content: content, id: 1 });
    const result = await request;
    console.log('Update saved to the database!', result[0].content);
  } catch (error) {
    console.error("There has been an error in the putDB", error);
  }
}


// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Get from the Database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log("notes loaded from the database!");
    return result[0].content;
  } catch (error) {
    console.error("There has been an error in the getDB", error)
  }
}

initdb();