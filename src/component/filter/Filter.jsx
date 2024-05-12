
export const Filter_1 = ({children}) => {
  return (
    <div className='filter'>
        <form action="">
            <div className="input">
                <label className="p-text">PRICE</label>
                <div className="price">
                    <input type="number" placeholder='Min' />
                    <input type="number" placeholder='Max' />
                </div>
            </div>
            <div className="input">
                <label className="p-text">ACCOMMODATION TYPE</label>
                <select name="" id="">
                <option>---</option>
                    <option value="4 Bedroom Apartment">4 Bedroom Apartment</option>
                    <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
                    <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
                    <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
                    <option value="Self Contain">Self Contain</option>
                    <option value="1 Room">1 Room</option>
                </select>
            </div>
            {children}
        </form>
    </div>
  )
}

export const Filter_2 = ({children}) => {
    return (
      <div className='filter'>
        <form action="">
            <div className="input">
                <label className="p-text">SERVICE TYPE</label>
                <select name="" >
                    <option>---</option>
                    <option value="Barber">Barber</option>
                    <option value="Painter">Painter</option>
                    <option value="Hairdresser">Hairdresser</option>
                    <option value="Electrician">Electrician</option>
                </select>
            </div>
            {children}
        </form>
      </div>
    )
}
  
export const Filter_3 = ({children}) => {
return (
    <div className='filter'>
        <form action="">
            <div className="input">
                <label className="p-text">PROPERTY TYPE</label>
                <select name="">
                    <option>---</option>
                    <option value="chair">Chair</option>
                    <option value="table">Table</option>
                    <option value="fan">Fan</option>
                </select>
            </div>
            {children}
        </form>
    </div>
)
}

export const Filter_4 = ({children}) => {
return (
    <div className='filter'>
        <form>
            <div className="input">
                <label className="p-text">LEVEL</label>
                <select>
                    <option value="level 1">Level 1</option>
                    <option value="level 2">Level 2</option>
                    <option value="level 3">Level 3</option>
                    <option value="level 4">Level 4</option>
                    <option value="level 5">Level 5</option>
                    <option value="level 6">Level 6</option>
                    <option value="level 7">Level 7</option>
                </select>
            </div>
            <div className="input">
                <label className="p-text">GENDER</label>
                <select>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            {children}
        </form>
    </div>
)
}
