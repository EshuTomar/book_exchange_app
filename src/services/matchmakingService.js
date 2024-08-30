// import { firebase } from '../firebaseConfig';
// import { collection, getDocs } from "firebase/firestore";

// const findMatches = async (userPreferences) => {
//   const booksSnapshot = await getDocs(collection(firebase, "books"));
//   const matches = booksSnapshot.docs.filter(doc => 
//     userPreferences.includes(doc.data().title)
//   );
//   return matches.map(match => match.data());
// };

// export default findMatches;

import { firestore } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const findMatches = async (userPreferences) => {
  try {
    const booksSnapshot = await getDocs(collection(firestore, "books"));
    const matches = booksSnapshot.docs.filter(doc => 
      userPreferences.includes(doc.data().title)
    );
    return matches.map(match => ({ id: match.id, ...match.data() }));
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};

export default findMatches;

