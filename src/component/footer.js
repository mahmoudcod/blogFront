import Logo from './logo'

import '../style/footer.css'
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
                            سياسة الاعلان
                        </li>
                        <li>
                            سياسة حقوق النشر
                        </li>
                        <li>
                            شروط الاستخدام
                        </li>
                        <li>
                            سياسة الخصوصية
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
