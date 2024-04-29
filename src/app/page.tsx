'use client';

import MainLayout from "./_main/mainLayout";
import Login from "./login/page";
import Button from "./_component/button/Button";
import Modal_Lg_Finish from "./_component/modal/Modal_Lg_Finish";
import Modal_Lg_Confirm from "./_component/modal/Modal_Lg_Confirm";
import Modal_Md_Default from "./_component/modal/Modal_Md_Variant2";
import Modal_Md_Variant2 from "./_component/modal/Modal_Md_Default";

export default function Home() {
  return (
    <div>
      <Login /><br/>
      <Button
        size='large'
        text="스터디 만들기"
        property="default"
        onClick={() => {return;}} />
        <br/>
      <Button
        size='medium'
        text="가입하기"
        property="confirm"
        onClick={() => {return;}} />
        <br/>
      <Button
        size='small'
        text="가입하기"
        property="pressed"
        onClick={() => {return;}} /><br/>
      <Modal_Lg_Confirm /><br/>
      <Modal_Lg_Finish /><br/>
      <Modal_Md_Default /><br/>
      <Modal_Md_Variant2 /><br />
      </div>
);
}
