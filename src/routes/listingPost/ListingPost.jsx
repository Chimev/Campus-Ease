import './listingPost.scss'
import { collection,  getDocs, orderBy, query, where, deleteDoc, doc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utilities/firebase'
import { getAuth } from 'firebase/auth'
import ListCard from '../../component/listCard/ListCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
   
      async function onDelete(listingID) {
        if (window.confirm("Are you sure you want to delete?")) {
          await deleteDoc(doc(db, "listings", listingID));

          console.log("first")
          const updatedListings = listings.filter(
            (listing) => listing.id !== listingID
          );
          setListings(updatedListings);
          toast.success("Successfully deleted");
        }
      }

      // function onEdit(listingID) {
      //   // navigate(`/edit-listing/${listingID}`);
      // }
    

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
                onDelete={() => onDelete(listing.id)}
                // onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
      <ToastContainer />
    </>
  )
}

export default ListingPost