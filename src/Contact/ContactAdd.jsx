import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import TypeError from "./TypeError";

const ContactAdd = (props) => {

    const contactData = useSelector(state => state.Data.contactData);
    const editContactData = useSelector(state => state.Data.editContactData);
    const contactAddMode = useSelector(state => state.Data.contactAddMode);

    const disPatch = useDispatch()

    const saveContactData = (contactData) => disPatch({ type: 'saveContactData', contactData: contactData });

    const [name, setName] = useState("");
    const [sex, setSex] = useState("男");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errorType, setErrorType] = useState(false);

    useEffect(() => {
        let { Name, Sex, Email, Phone, Address } = editContactData;
        setName(Name);
        setSex(Sex);
        setEmail(Email);
        setPhone(Phone);
        setAddress(Address);

    }, [])
    const nameTyped = event => {
        setName(event.target.value)
    }
    const sexTyped = event => {
        setSex(event.target.value)
    }
    const emailTyped = event => {
        setEmail(event.target.value)
    }
    const phoneTyped = event => {
        setPhone(event.target.value)
    }
    const addressTyped = event => {
        setAddress(event.target.value)
    }
    const onCancel = () => {
        props.onEditContact(false)
    }
    const deleteContact = () => {
        let newItems = [];
        for (let i = 0; i < contactData.length; i++) {
            if (editContactData.ContactId === contactData[i].ContactId) {
                newItems = [...contactData];
                newItems.splice(i, 1);
                break;
            }
        }
        saveContactData(newItems)
        props.onDelete()//刪除關閉編輯頁
    }

    const checkTyped = () => {
        setErrorType(false)
    }
    const formsubmit = (event) => {
        event.preventDefault();
        if (name === "" || phone === "" || address === "" || email === "") {
            setErrorType(true)
        }
        else {
            if (contactAddMode) {
                saveContactData([...contactData,
                {
                    ContactId: editContactData.ContactId,
                    ClassId: editContactData.ClassId,
                    Classname: editContactData.Classname,
                    Name: name,
                    Sex: sex,
                    Phone: phone,
                    Address: address,
                    Email: email
                }])
            }
            else {
                let newItems = [];
                for (let i = 0; i < contactData.length; i++) {
                    if (editContactData.ContactId === contactData[i].ContactId) {
                        newItems = [...contactData];
                        newItems[i] = {
                            ContactId: editContactData.ContactId,
                            ClassId: editContactData.ClassId,
                            Classname: editContactData.Classname,
                            Name: name,
                            Sex: sex,
                            Phone: phone,
                            Address: address,
                            Email: email
                        };
                        break;
                    }
                }
                saveContactData(newItems);
            }
            props.onEditContact(false)
        }
    }


    return (
        <form onSubmit={formsubmit}>
            {errorType && <TypeError onCheck={checkTyped} onVisible={errorType} />}
            {!errorType && <div>
                {contactAddMode && <label>新增通訊錄</label>}
                {!contactAddMode && <label>修改通訊錄</label>}
                <br></br>
                <label className="textlabel">類別</label>
                <input className="readonly" type="text" value={editContactData.Classname} readOnly="readonly"></input>

                <label className="textlabel">姓名</label>
                <input type="text" value={name} placeholder="姓名" onChange={nameTyped}></input>

                <label className="textlabel">性別</label>
                <select value={sex} onChange={sexTyped}>
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>

                <label className="textlabel">Email</label>
                <input type="email" value={email} placeholder="Email" onChange={emailTyped}></input>

                <label className="textlabel">電話</label>
                <input type="text" value={phone} placeholder="電話" onChange={phoneTyped}></input>

                <label className="textlabel">地址</label>
                <input type="text" value={address} placeholder="地址" onChange={addressTyped}></input>

                <button className="enter" type="submit">儲存</button>
                {!contactAddMode && <button type="button" className="del" onClick={deleteContact}>刪除</button>}
                <button className="back" type="button" onClick={onCancel}>取消</button>
            </div>
            }
        </form>
    )

}
export default ContactAdd;