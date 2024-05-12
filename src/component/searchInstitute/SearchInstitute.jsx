import { ListOfInstitutions } from "../../../data/school";


const SearchInstitute = ({ type, setType, institution, setInstitution, campus, setCampus, institutions, setInstitutions, campuses, setCampuses, children }) => {
    

    const changeType = (e) => {
        setType(e.target.value);
        setInstitutions(ListOfInstitutions.find(int => int.type === e.target.value).institution)
    }
    const changeInstitute = (e) => {
        setInstitution(e.target.value)
        setCampuses(institutions.find( int => int.school === e.target.value).campus)
    }
    const changeCampus = (e) => {
        setCampus(e.target.value)
    }

    
      

  return (
    <>
        <select name="type" value={type} onChange={changeType}>
        <option value="">--Institution-Type--</option>
        {ListOfInstitutions.map((type) => (
            <option key={type.type} value={type.type}>{type.type}</option>
        ))}
    </select>

    <select name="institution" value={institution} onChange={changeInstitute}>
        <option value="">--Institution--</option>
        {institutions.map(int => (
            <option key={int.school} value={int.school}>{int.school}</option>
        ))}
    </select>

    <select name="campus" value={campus} onChange={changeCampus}>
        <option value="">--Campus--</option>
        {campuses.map(campus => (
            <option key={campus} value={campus}>{campus}</option>
        ))}
    </select>
    
    {children}
    </>
  )
}

export default SearchInstitute