function translate(text, lang) {
  if (lang == 'EN') {
    return text;
  } else if (lang == 'AR') {
    
    if (text == 'Change to English') {
      return 'غير إلى العربية';
    } else if (text == 'Login to continue') {
      return 'أدخل معلوماتك للمتابعة';
    } else if (text == 'Signup to continue') {
      return 'سجل حسابك الجديد للمتابعة';
    } else if (text == 'Write your Email below') {
      return 'أكتب بريدك الإلكتروني في الأسفل';
    } else if (text == 'Write your password below') {
      return 'أكتب كلمة السر الخاصة بحسابك في الأسفل';
    } else if (text == 'Rewrite your password below') {
      return 'أعد كتابة كلمة السر الخاصة بحسابك في الأسفل';
    } else if (text == '\"@\" missing from your email') {
      return 'تنقص هاته العلامة \"@\" من بريدك الإلكتروني';
    } else if (text == 'Bad Email domain name') {
      return '\"@ بريدك الإلكتروني مشوه أو ناقص \"بعد حرف ال';
    } else if (text == 'Correct Email') {
      return 'بريدك الإلكتروني مكتوب بشكل صحيح';
    } else if (text == 'Weak password') {
      return 'كلمة سر ضعيفة';
    } else if (text == 'Normal password') {
      return 'كلمة سر عادية';
    } else if (text == 'Strong password') {
      return 'كلمة سر قوية';
    } else if (text == 'Empty password above') {
      return 'كلمة السر غير مكتوبة في الأعلى';
    } else if (text == 'Bad password above') {
      return 'كلمة السر في الأعلى ضعيفة';
    } else if (text == 'Wrong password rewrite') {
      return 'إعادة كتابة خاطئة لكلمة السر';
    } else if (text == 'Correct password rewrite') {
      return 'إعادة كتابة صحيحة لكلمة السر';
    } else if (text == 'Or Login using Google') {
      return 'أو سجل الدخول بإستخدام جوجل';
    } else if (text == 'Or Signup using Google') {
      return 'أو أنشئ حسابك الجديد بإستخدام جوجل';
    } else if (text == 'OR') {
      return 'أو';
    } else if (text == 'Login') {
      return 'سجل الدخول';
    } else if (text == 'Signup') {
      return 'أنشئ حساب جديد';
    } else if (text == 'Forgot your password') {
      return 'نسيت كلمة السر';
    } else if (text == 'Restore password') {
      return 'إسترجع كلمة السر';
    } else if (text == 'Write your Email above first') {
      return 'أكتب بريدك الإلكتروني في الأعلى أولا';
    } else if (text == 'Bad written Email above') {
      return 'البريد الإلكتروني المكتوب في الأعلى مشوه أو ناقص';
    } else if (text == 'Sending password restoration Email...') {
      return '... يتم إرسال بريد إسترجاع كلمة السر';
    } else if (text == 'Password restoration Email sent successfully to :\n') {
      return 'تم إرسال بريد استرجاع كلمة السر إلى : \n';
    } else if (text == 'An error occured :\n') {
      return 'حدث خطأ ما :\n';
    } else if (text == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
      return 'لا يوجد مستخدم بالبريد الإلكتروني المكتوب ، ربما تم إزالة حساب هذا المستخدم أو تم حظره';
    } else if (text == 'Write your Email and Password first to signIn') {
      return 'أكتب بريدك الإلكتروني و كلمة السر الخاصة بك أولا لتسجيل الدخول';
    } else if (text == 'Write your Email and Password first to signUp') {
      return 'أكتب بريدك الإلكتروني و كلمة السر الجدد أولا لإنشاء حساب جديد';
    } else if (text == 'Write your Email first to signIn') {
      return 'أكتب بريدك الإلكتروني الخاصة بك أولا لتسجيل الدخول';
    } else if (text == 'Write your Email first to signUp') {
      return 'أكتب بريدك الإلكتروني الجديد أولا لإنشاء حساب جديد';
    } else if (text == 'Write your Password first to signIn') {
      return 'أكتب كلمة السر الخاصة بك أولا لتسجيل الدخول';
    } else if (text == 'Write your Password first to signUp') {
      return 'أكتب كلمة السر الجديدة أولا لإنشاء حساب جديد';
    } else if (text == 'Bad Email and/or Password') {
      return 'البريد الإلكتروني و/أو كلمة السر المكتوبة أعلاه مشوهين أو ناقصين';
    } else if (text == 'Rewrite your Password first to Signup') {
      return 'أعد كتابة كلمة السر أولا لتسجيل حسابك الجديد';
    } else if (text == 'Wrong Password Rewrite') {
      return 'إعادة كتابة خاطئة لكلمة السر';
    } else if (text == 'Logging in...') {
      return 'جاري تسجيل الدخول...';
    } else if (text == 'Welcome back, logged in successfuly with email : ') {
      return 'مرحبا بك مجددا، تم تسجيل الدخول بنجاح بواسطة : ';
    } else if (text == 'Signing up...') {
      return 'جاري إنشاء حساب جديد...';
    } else if (text == 'Signed up successfuly with Email : ') {
      return 'مرحبا بك، تم إنشاء حسابك الجديد بواسطة : ';
    } else if (text == '\n\n\n\nPlease check your Email Inbox and search for PointBank Password Restoration Email, open it then open the provided link to change your password,      remember all that just for your account safety.') {
      return '\n\n\n\nالرجاء الذهاب إلى صندوق البريد الخاص بحسابك و البحث على بريد إسترجاع كلمة السر الخاص ب بوينت بانك، فتحه و زيارة الرابط الموجود فيه لتغيير كلمة السر،        تذكر كل هذا لأجل سلامة حسابك.';
    } else if (text == "Cannot continue with Gmail : ") {
      return 'لا يمكن المتابعة بحساب جيمايل التالي : ';
    } else if (text == "Welcome back, logged in successfuly with Gmail : ") {
      return 'مرحبا بك مجددا، تم تسجيل الدخول بنجاح بحساب جيمايل التالي : ';
    } else if (text == "Signed up successfuly with Gmail : ") {
      return 'مرحبا بك، تم انشاء حسابك الجديد بنجاح بواسطة الجيمايل التالي : ';
    } else if (text == "Logging in with Google...") {
      return 'جاري تسجيل الدخول بواسطة جوجل...';
    } else if (text == "Signing up with Google...") {
      return 'جاري إنشاء حساب جديد بواسطة جوجل...';
    } else if (text == "Congratulations !, you're one of the few people who's viewing the test version right now.") {
      return 'تهانينا !, أنت واحد من الناس القليلين الذين يستعملون النسخة التجريبية الآن.';
    } else if (text == "Signout") {
      return 'سجل الخروج';
    } else if (text == "Signing out...") {
      return 'جاري تسجيل الخروج...';
    } else if (text == "An error occurred while signing out :\n") {
      return 'حدث خطأ ما أثناء تسجيل الخروج :\n';
    }
  }
}