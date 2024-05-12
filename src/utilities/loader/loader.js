import { useParams } from "react-router-dom";

export const categoryLoader = async () => {
    const res = await fetch("http://localhost:3000/category"); 

    return await res.json();
}

export const categoryDisplayLoader = async ({ params }) => {
   const { id } = params;

    const res = await fetch("http://localhost:3000/category/" + id);
    const data = await res.json()
    return data
}

