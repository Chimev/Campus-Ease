import { collection,  getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utilities/firebase'
import { getAuth } from 'firebase/auth'
import ListCard from '../../component/listCard/ListCard'

const ListingPost = () => {
    const [listings, setListings] = useState(null)
    const auth = getAuth();

    // fetch the data from the firebase and querying the user
    useEffect(() => {
        async function fetchUserListings() {
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc")
          );
          const querySnap = await getDocs(q);

          let listings = [];
          
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          });
          setListings(listings);
        }
        
        fetchUserListings();
      }, []);
   
console.log(listings, 'test')
console.log(listings?.length, 'lenght')
  return (
    <>
    <h3>My Listings</h3>

    <ul>

        {/* same as setting a state to wait for data maybe using a laoding function while it still getting the data(another route) */}
        { listings && listings?.map( listing => {
            return (
                <ListCard listing={listing} key={listing.id} />
            )
        })}
    </ul>


    </>
  )
}

export default ListingPost