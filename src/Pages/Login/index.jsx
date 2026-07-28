import React from 'react'
import useFormFields from '../../Hooks/useFormFields'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import fetchData from '../../Utils/fetchData';
import notify from '../../Utils/notify';
import { login } from '../../Store/Slices/AuthSlice';

export default function Login() {
    const [fields, handleChange, setFields] = useFormFields({
        phoneNumber: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await fetchData("auth/login-password", {
            method: "POST",
            headers: { "Content-Type": "applications/json" },
            body: JSON.stringify(fields),
        });
        if (result.success) {
            notify("sucess", result.message);
            dispatch(login({ token: result.data.token, user: result.data.user }));
        } else {
            notify("error", result.message);
            setFields({
                phoneNumber: "",
                password: "",
            });
        }
    };
    return (
        <div>
            <div>
                <h1>Admin Login</h1>
                <p>Please enter your credentials to acsess the dasboard</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Phone Number</label>
                    <input type="text"
                        name="phoneNumber"
                        id="PhoneNumber"
                        value={fields.phoneNumber}
                        onChange={handleChange}
                        placeholder="09xxxxxxxxx" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        id="password"
                        value={fields.password}
                        onChange={handleChange}
                        placeholder="******" />
                </div>
                <button>Login</button>
            </form>
        </div>

    );
}
