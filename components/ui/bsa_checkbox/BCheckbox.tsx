const BCheckbox = ({label, name, disabled}:{label?:string, name:string, disabled?:boolean}) => {
    return (
        <div className="form-control">
            <label className="cursor-pointer flex flex-row p-2 gap-2">
                <input type="checkbox" className="checkbox checkbox-warning" name={name} disabled={disabled}/>
                <span className="label-text">{label}</span>
            </label>
        </div>
    );
}

export default BCheckbox;