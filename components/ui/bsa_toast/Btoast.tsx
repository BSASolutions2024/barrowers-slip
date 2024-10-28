export default function BToast({message}: {message:string}) {
    return (
        <div className="toast z-50 fixed">
            <div className="alert alert-info">
                <span>{message}</span>
            </div>
        </div>
    )
}