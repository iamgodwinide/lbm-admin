import React, { useState } from 'react'
import { Button, Spinner } from 'reactstrap'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux';
import init from '../../config/init';
import { makeGetRequest, makePostRequest } from '../../config';


const PendingUser = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [display, setdisplay] = useState("table-row");
    const alert = useAlert();
    const dispatch = useDispatch();

    const handleClick = async () => {
        setLoading(true);
        // MAKE API CALL
        const res = await makePostRequest(`/approve/${user._id}`);
        setLoading(false);
        if (res.status === 200) {
            setdisplay("none");
            alert.show(`${user.firstname} has been approved`, { type: "success" });
            init(dispatch);
        } else {
            alert.show(`Something went wrong`, { type: "error" });
        }

    }
    return (
        <tr className={`d-${display}`}>
            <td className="p-2">
                <div className="text-center">{user.firstname}</div>
            </td>
            <td className="p-2">
                <div className="text-center">{user.lastname}</div>
            </td>
            <td className="p-2">
                <div className="text-center">{user.serialnumber}</div>
            </td>
            <td className="p-2">
                <div className="text-center">{user.phone}</div>
            </td>
            <td className="p-2 ustify-content-center">
                <p className='text-bold text-center'>{user.created}</p>
            </td>
            <td className="p-2 text-center">
                <div onClick={handleClick}>
                    <Button disabled={loading} color='success' style={{ width: "100px" }} >
                        {loading ? <Spinner size={"sm"} color='white' /> : "Approve"}
                    </Button>
                </div>
            </td>
        </tr>
    )
}

export default PendingUser