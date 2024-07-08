'use client';
import { useRouter } from 'next/navigation';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const LoginPage = ():JSX.Element => {

    const router = useRouter();

    return (
        <>
            <div style = {{ width: '100%', margin: '100px 0',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div>
                    <AccountCircleIcon style={{width: '100px', height: '100px'}}/>
                </div>

                {/* 자체적 회원가입 시 아이디 & 비밀번호 입력 칸 */}

                {/* <div style = {{ marginTop: '20px', display: 'flex', flexDirection: 'column', width: '50%'}}>

                    <input type='text' style = {{ borderRadius: '12px', border: '1px solid #000', padding: '10px 20px'}} placeholder='아이디를 입력해주세요' />

                    <input type='password' style = {{ borderRadius: '12px', border: '1px solid #000', padding: '10px 20px', marginTop: '20px'}} placeholder='비밀번호를 입력해주세요' />

                </div> */}

                <div style = {{ marginTop: '50px', display: 'flex' }}>
                    <div style = {{ borderRadius: '50px', border: '1px solid #000', cursor: 'pointer', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        구글 소셜 로그인
                    </div>

                    <div style = {{ borderRadius: '50px', border: '1px solid #000', cursor: 'pointer', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginLeft: '20px' }}>
                        카카오 소셜 로그인
                    </div>
                </div>

                <div style = {{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', cursor: 'pointer', padding: '20px 10px', backgroundColor: '#1285BB', color: '#FFF', width: '20%'}} onClick={() => router.back()}>
                    뒤로가기
                </div>
            </div>
        </>
    )
}

export default LoginPage;