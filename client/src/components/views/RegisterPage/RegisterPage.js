import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser, checkDuplicateNickname, checkDuplicateId, checkDuplicateEmail } from '../../../_actions/user_action'; // 회원가입 액션
import { withRouter } from 'react-router-dom';

import HeaderNav from '../MainDesign/HeaderNav';
import SubNav from '../MainDesign/SubNav';
import UnderNav from '../MainDesign/UnderNav';

import './RegisterPage.css'

function RegisterPage(props) { // 회원가입 페이지

    const dispatch = useDispatch(); // dispatch: 액션을 스토어에 전달

    const [Nickname, setNickname] = useState("")
    const [Id, setId] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const [dpNickname, setDpNickname] = useState(false);
    const [dpId, setDpId] = useState(false);
    const [dpEmail, setDpEmail] = useState(false);

    // 폼 값 입력
    const onNicknameHandler = (event) => { setNickname(event.currentTarget.value) }
    const onIdHandler = (event) => { setId(event.currentTarget.value) }
    const onEmailHandler = (event) => { setEmail(event.currentTarget.value) }
    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value) }
    const onConfirmPasswordHandler = (event) => { setConfirmPassword(event.currentTarget.value) }

    // 중복 확인
    const checkNickname = (event) => {

        let body = { nickname: Nickname }

        dispatch(checkDuplicateNickname(body))
            .then(response => {
                if (response.payload.permit) {
                    setDpNickname(true);
                    return alert("사용할 수 있는 닉네임입니다.")
                } else {
                    return alert("사용할 수 없는 닉네임입니다.")
                }
            })
    }
    const checkId = (event) => {

        let body = { id: Id }

        dispatch(checkDuplicateId(body))
            .then(response => {
                if (response.payload.permit) {
                    setDpId(true);
                    return alert("사용할 수 있는 아이디입니다.")
                } else {
                    return alert("사용할 수 없는 아이디입니다.")
                }
            })
    }
    const checkEmail = (event) => {

        let body = { email: Email }

        dispatch(checkDuplicateEmail(body))
            .then(response => {
                if (response.payload.permit) {
                    setDpEmail(true);
                    return alert("사용할 수 있는 이메일입니다.")
                } else {
                    return alert("사용할 수 없는 이메일입니다.")
                }
            })
    }

    // 제출
    const onSubmitHandler = (event) => {
        event.preventDefault(); // refresh 방지

        if (Password !== ConfirmPassword) { return alert('비밀번호와 비밀번호 확인은 같아야 합니다.') }


        // 중복 확인을 모두 진행한 경우
        if(dpNickname && dpId && dpEmail) {

            var emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
            var passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,30}$/

            if(!passwordRegExp.test(Password)) { return alert('유효하지 않은 비밀번호입니다. 비밀번호는 8자 이상 영문, 숫자 조합으로 설정해주세요.'); }
            if(!emailRegExp.test(Email)) { return alert('유효하지 않은 이메일입니다. 다시 설정해주세요.'); }

            let body = {
                id: Id,
                email: Email,
                password: Password,
                nickname: Nickname
            }

            dispatch(registerUser(body))
                .then(response => {
                    if (response.payload.success) {
                        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.")
                        props.history.push("/login")
                    } else {
                        alert("Failed to sign up")
                    }
                })
        }

        // 모든 입력란에 입력했지만 중복확인을 진행하지 않은 경우
        else if(Nickname && Id && Email && Password && ConfirmPassword) {
            if(!dpNickname) return alert("닉네임 중복 확인을 진행해주세요");
            else if(!dpId) return alert("아이디 중복 확인을 진행해주세요");
            else return alert("이메일 중복 확인을 진행해주세요");
        }
    }

    return (
        <div class="App">
            <HeaderNav />
            <SubNav />
            <div id="register_page">
                <div id="logo"></div>
                <form id="register_form" onSubmit={onSubmitHandler}>
                    <input class="input" id="nickname" type="text" value={Nickname} placeholder=" 닉네임을 입력하세요" onChange={onNicknameHandler} />
                    <button class ="confirm" id="nickname_confirm" onClick={checkNickname}>중복 확인</button>
                    <br />
                    <input class="input" id="id" type="id" value={Id} placeholder=" 아이디를 입력하세요" onChange={onIdHandler} />
                    <button class="confirm" id="id_confirm" onClick={checkId}>중복 확인</button>
                    <br />
                    <input class="input" id="email" type="email" value={Email} placeholder=" 이메일을 입력하세요" onChange={onEmailHandler} />
                    <button class="confirm" id="email_confirm" onClick={checkEmail}>중복 확인</button>
                    <br />
                    <input class="input" id="password" type="password" value={Password} placeholder=" 비밀번호를 입력하세요" onChange={onPasswordHandler} />
                    <br />
                    <input class="input" type="password" value={ConfirmPassword} placeholder=" 비밀번호를 한 번 더 입력하세요" onChange={onConfirmPasswordHandler} />
                    <br />
                    <button id="register_button" onClick={onSubmitHandler}>회원 가입</button>
                </form>
            </div>
            <UnderNav />
        </div>
    )
}

export default withRouter(RegisterPage)