import './listingPost.scss'
import { collection,  getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utilities/firebase'
import { getAuth } from 'firebase/auth'
import ListCard from '../../component/listCard/ListCard'

const ListingPost = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
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
          setLoading(false)
        }
        
        fetchUserListings();
      }, []);
   
console.log(listings, 'test')
console.log(listings?.length, 'lenght')
  return (
    <>
      {/* same as setting a state to wait for data maybe using a laoding function while it still getting the data(another route) */}
      {!loading && listings.length > 0 && (
        <>
          <h2>
            My Listings
          </h2>
          <ul className="list">
            {listings.map((listing) => (
              <ListCard
                key={listing.id}
                id={listing.id}
                listing={listing.data}
              />
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default ListingPost