import Logo from './logo'

import '../style/footer.css'
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='sectionOne'>
                    <Logo />
                    <div className='first'>
                        <ul>
                            <li>المال والاعمال</li>
                            <li>ثقافة مالية</li>
                            <li>افكار مشاريع</li>
                        </ul>
                    </div>

                    <div>
                        <ul>
                            <li>المراة</li>
                            <li>البرامج </li>
                            <li>الادخار </li>
                            <li>الاستثمار </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>البنوك</li>
                            <li>التداول عبر الانترنت </li>
                            <li>اتصل بنا </li>
                            <li> شخصيات اقتصادية </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>دخل ايضافي</li>
                            <li>  الاستديراد والتصدير </li>
                            <li> ريادة اعمال </li>
                            <li>  عن الموقع </li>
                        </ul>
                    </div>
                </div>
                <div className='sectionTwo'>
                    <ul>
                        <li>
                            <Link to={`/advertising`}>    سياسة الاعلان</Link>
                        </li>
                        <li>
                            <Link to={`/publish`}>     حقوق النشر</Link>
                        </li>
                        <li>
                            <Link to={`/usage`}>    شروط الاستخدام</Link>
                        </li>
                        <li>
                            <Link to={`/privacy`}> سياسة الخصوصية</Link>
                        </li>
                    </ul>
                </div>
                <div className='sectionThree'>
                    <p> 2024© جميع الحقوق محفوظة</p>
                    <small className='footerSmall'>صمم بكل حب في ادا</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
