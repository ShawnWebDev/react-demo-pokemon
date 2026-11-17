import { useLocation, useNavigate } from "react-router";

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    function goBack() {
        if (location.key === 'default') {
            navigate('/')
        } else {
            navigate(-1)
        }
    }

    return (
        <button onClick={goBack}>Go Back</button>
    )
}