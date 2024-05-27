import { createContext } from "react";
import { useState } from "react"

export const SchoolContext = createContext("");

const SchoolContextProvider = ({children}) => {
    const [type, setType] = useState("--Institution-Type--");
    const [institution, setInstitution] = useState('--Institution--');
    const [campus, setCampus] = useState('--Campus--');
    const [ institutions, setInstitutions] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [filter_1, setFilter_1] = useState({
        min: "",
        max: "",
        accommodationType: "",
        service: "",
        property: "",
        level: "",
        gender: "",
        description: ""
    })

    const value = {
        type,
        setType,
        institution,
        setInstitution,
        campus,
        setCampus,
        institutions,
        setInstitutions,
        campuses,
        setCampuses,
        filter_1,
        setFilter_1
    }

    return (
        <SchoolContext.Provider value={value}>
            {children}
        </SchoolContext.Provider>
    )
}

export default SchoolContextProvider;