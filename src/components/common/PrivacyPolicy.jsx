import React, { useState } from 'react';
import { Collapse, Switch, Typography } from 'antd';
// import 'antd/dist/reset.css';

const { Panel } = Collapse;
const { Title, Text } = Typography;

// English and Arabic sections remain the same as provided above
const englishSections = [
  {
    title: 'ONtrend Community',
    content: `
    <ol>
      <li><strong>Data Collection:</strong>
        <ul>
          <li>ONtrend collects minimal information such as community code, user ID, order amount, and timestamps to track referral-based activity.</li>
          <li>No sensitive or financial data is shared between community members.</li>
        </ul>
      </li>
      <li><strong>Use of Data:</strong>
        <ul>
          <li>Data is used solely to calculate earnings, prevent abuse, and generate performance reports.</li>
          <li>Aggregated data may be used for improving our services and community features.</li>
        </ul>
      </li>
      <li><strong>Data Protection:</strong>
        <ul>
          <li>All data is stored securely and protected under ONtrend’s main privacy protocols.</li>
          <li>No personal information will be disclosed without user consent unless required by law.</li>
        </ul>
      </li>
      <li><strong>User Rights:</strong>
        <ul>
          <li>Community users may request a summary of their earnings and referral records.</li>
          <li>Users can withdraw from the community program anytime; however, past earnings will remain intact unless violation is found.</li>
        </ul>
      </li>
      <li><strong>Updates:</strong>
        <ul>
          <li>ONtrend may update these terms without prior notice. Updated terms will be communicated through the app or email.</li>
        </ul>
      </li>
    </ol>
  `
  },
  {
    title: 'Personal Information',
    content: `
      In order to provide our customers with the best possible delivery experience ONTREND will request the following information from users: First and Last Name Mobile Number Email Address and Nationality. Additionally, the delivery location (GPS Location) will be collected. This information is used to identify the customer and complete the order. Only the restaurants and stores will be able to view the name and phone number of the customer and vendors have signed an agreement not to disclose any customer information while processing the order. Customers can access and update their personal information at a later date in the profile section of the application. Your information may be disclosed to our staff and third-party delivery services.
    `,
  },
  {
    title: 'Payment Information',
    content: `
      To provide our customers with the most convenient delivery service ONTREND offers three payment options: Cash on Delivery, Card on Delivery, and Online Payment (Debit or Credit Card). For online payments, all card information is transmitted to the approved debit/credit card company in an encrypted format following nationally accepted rules and regulations during the processing of your order. Saving your card details on ONTREND means they will be kept in an encrypted format with all legal precautions taken to maintain physical, electronic, and procedural safeguards over credit/debit card information. Credit/Debit Card details will not be shared with any restaurant/store or third parties.
    `,
  },
  {
    title: 'Privacy Policy Amendment',
    content: `
      ONTREND may choose to change the Privacy Policy in alignment with all local legal authorities and related publications. Changes will be communicated through appropriate channels to ensure customers are aware of any updates.
    `,
  },
  {
    title: 'ONTREND Ads',
    content: `
      To constantly improve our services ONTREND may use Advertising Agencies to employ cookies and action tags to measure our marketing impact. This technology may also be used to serve relevant advertising content and recommendations. Any information reported by these third-party agencies is completely confidential and does not contain any user’s personal information.
    `,
  },
  {
    title: 'Pricing & Payments',
    content: `
      The pricing of all products on the ONTREND app is set by the vendors. After a customer places an order and it has been accepted this represents an agreement between the customer and the store. Stores are solely responsible for any orders placed for their business. All payments including Cash on Delivery, Card on Delivery, and Online Payment are handled by ONTREND. ONTREND processes these payments and pays back the vendor after deducting the commission and any other applicable charges. All delivery charges will be clearly displayed in the order summary before the order placement is confirmed.
    `,
  },
  {
    title: 'Online Payments',
    content: `
      If you choose to pay for your order online and save your Credit/Debit Card information on ONTREND’s application please read the following terms of use and disclaimers carefully. If any extra charges are incurred due to "Special Requests" or "General Requests" placed by the user the user is liable to pay via Cash on Delivery. The customer refund process may take 2-3 working days if ONTREND Credit is requested. However processing the refund on a Debit/Credit Card through the bank’s payment gateway might take 7-14 working days. The customer must follow up with their bank in case of any delay in the refunding of their payment. Any Credit/Debit Cards used to place an order through Card on Delivery or the online payment gateway on the application must belong to the user. If not the user must attain legal permission from the card owner to perform the transaction. The user is entirely responsible for placing any orders using the Credit/Debit Cards facility after carefully reading all the Terms & Conditions.
    `,
  },
  {
    title: 'Refund Policy',
    content: `
      The customer refund process may take 2-3 working days if ONTREND Credit is requested. However processing the refund on a Debit/Credit Card through the bank’s payment gateway might take 7-14 working days. The customer must follow up with their bank in case of any delay in the refunding of their payment.
    `,
  },
  {
    title: 'Order Cancellation',
    content: `
      You can cancel orders before they are accepted by the vendor. ONTREND reserves the right to cancel orders due to unavailability or errors. In the event of a canceled order the amount deducted will be refunded to the customer’s bank account within 7-14 working days. Alternatively customers may choose for the refund to be converted to ONTREND Credit which will be added within 3 working days to their wallet on the app.
    `,
  },
  {
    title: 'Deliveries',
    content: `
      If an order is placed to the wrong address or the customer is not available at the provided address the order will not be delivered to any other location. The customer must accept all legal responsibilities related to placing an order to an address where they are not available to collect from. ONTREND has a team of delivery drivers as well as third-party delivery partners. However some stores may have their own drivers to deliver your order. In the event of an order being delivered late to the wrong location or in an unacceptable manner ONTREND will not be liable for those drivers as they are not affiliated with ONTREND or its delivery policies. Any concerns or complaints derived from the delivery of these drivers must be taken up with the store that the user has ordered from.
    `,
  },
  {
    title: 'Delivery Responsibilities',
    content: `
      Delivery Responsibilities for delivery issues caused by third-party services, Customers can make complaints through Email: <a href="mailto:info@ontrend.live">info@ontrend.live</a>
    `,
  },
  {
    title: 'Returns',
    content: `
      If a customer chooses to return a product/meal the terms and conditions of product returns belonging to the restaurant/store will apply. ONTREND will not be held responsible for any disputes related to any returns.
    `,
  },
  {
    title: 'Validity of Records',
    content: `
      In disputes related to their terms the user agrees states and warrants that any bookkeeping entry microfilm microfiche and computer records constitute valid binding absolute and exclusive evidence. This article has the characteristics of an evidential contract and the user waives in advance all kinds of objections to the specified ONTREND records and the right to tender an oath regarding these records being kept in due form.
    `,
  },
  {
    title: 'Restrictions for Non-Personal & Non-Commercial Use',
    content: `
      You agree that the consequences of commercial use or republication of content or information of ONTREND may lead to serious and incalculable monetary compensation that may not be a sufficient or appropriate remedy and that ONTREND will be entitled to temporary and permanent injunctive relief to prohibit such use.
    `,
  },
  {
    title: 'Guidelines for Reviews',
    content: `
      Store reviews are approved based on the following criteria: relevancy acceptable content and ownership by ONTREND. Reviews must be based on firsthand experience and not contain offensive language irrelevant content discrimination references to illegal activity or conflicts of interest. Reviews are not endorsed by ONTREND and do not represent the views of ONTREND or its subsidiaries. ONTREND reserves the right to reproduce modify translate transmit and distribute all materials relating to reviews without obligation to pay the author(s) or any third-party.
    `,
  },
  {
    title: 'Visitor Material & Conduct',
    content: `
      Other than personally identifiable information which is covered under the ONTREND Privacy Policy any material you provide/post on the application will be considered non-confidential and non-proprietary. ONTREND will have no obligation with respect to such material and will be free to copy disclose distribute incorporate and otherwise use that material for any and all commercial or non-commercial purposes. Users are prohibited from posting any material that breaches any applicable law is unlawful or fraudulent amounts to unauthorized advertising contains viruses or is otherwise harmful. Users may not misuse the application or engage in activities that interfere with the use and enjoyment of the application by others.
    `,
  },
  {
    title: 'User Responsibilities',
    content: `
      While using ONTREND’s services the user accepts and undertakes the following responsibilities: ensuring the accuracy of registration information being responsible for personal ideas opinions and statements set forth while using ONTREND’s services not accessing unauthorized services or changing software in any unauthorized way indemnifying ONTREND for all losses resulting from non-compliance and not sending threatening immoral or racially offensive messages. Users must not engage in activities that harass or threaten other users or ONTREND’s personnel and must comply with all relevant laws and regulations. Users are responsible for all acts made under their username and must not access the application or services using a third-party’s account without consent.
    `,
  },
  {
    title: 'Background Location Usage Policy',
    content: `
      While using ONTREND’s services the user accepts and undertakes the following responsibilities: ensuring the accuracy of registration information being responsible for personal ideas opinions and statements set forth while using ONTREND’s services not accessing unauthorized services or changing software in any unauthorized way indemnifying ONTREND for all losses resulting from non-compliance and not sending threatening immoral or racially offensive messages. Users must not engage in activities that harass or threaten other users or ONTREND’s personnel and must comply with all relevant laws and regulations. Users are responsible for all acts made under their username and must not access the application or services using a third-party’s account without consent.
    `,
  },
  {
    title: 'Purpose of Background Location Access',
    content: `
      Background location data is utilized to provide live tracking of delivery routes and order status. This helps in monitoring and managing delivery logistics in real time.
      Disclosure and Consent: Users (our staff) are informed and required to grant explicit consent for background location access. This permission is crucial for the proper functioning of the delivery tracking feature.    `,
  },
  {
    title: 'Data Privacy and Security',
    content: `
     All location data collected is securely stored and only used for operational purposes. The data is not shared with third parties, and strict measures are in place to protect user privacy.
By accepting these terms, users acknowledge and agree to the use of background location data as described.    `,
  },
  {
    title: 'Prohibited Activity',
    content: `
      You may not access or use the application for any purpose other than that for which ONTREND’s application makes it available. The application is for personal use only and may not be used for commercial endeavors except those specifically endorsed by ONTREND. Prohibited activities include criminal or tortious activity advertising to or soliciting any user to buy or sell products/services without authorization systematic retrieval of data unauthorized use of ONTREND’s application services transmitting chain letters or junk email interfering with the application impersonating another user selling or transferring your profile using information to harass others and any activities inconsistent with applicable laws. Engaging in prohibited activities may result in the suspension locking or termination of the user’s account and prevention of access to ONTREND’s services.
    `,
  },
];

const arabicSections = [
  {
    title: 'سياسة الخصوصية للمجتمع',
    content: `
    <ol>
      <li><strong>جمع البيانات:</strong>
        <ul>
          <li>يتم تجميع الحد الأدنى من المعلومات مثل: رمز المجتمع، معرف المستخدم، قيمة الطلب، والطوابع الزمنية لتتبع النشاط الإحالي.</li>
          <li>لا يتم مشاركة أي بيانات حساسة أو مالية بين أعضاء المجتمع.</li>
        </ul>
      </li>
      <li><strong>استخدام البيانات:</strong>
        <ul>
          <li>تُستخدم البيانات حصريًا لحساب المكافآت، ومنع الانتهاكات، وإعداد تقارير الأداء.</li>
          <li>قد تُستخدم بيانات مجمعة لتحسين الخدمات وميزات المجتمع.</li>
        </ul>
      </li>
      <li><strong>حماية البيانات:</strong>
        <ul>
          <li>يتم تخزين جميع البيانات بأمان وفق بروتوكولات الخصوصية المعتمدة في ONtrend.</li>
          <li>لا تُفصح ONtrend عن معلومات شخصية بدون موافقة المستخدم، إلا إذا تطلب القانون ذلك.</li>
        </ul>
      </li>
      <li><strong>حقوق المستخدم:</strong>
        <ul>
          <li>يحق لأعضاء المجتمع طلب ملخص بأرباحهم وسجلات الإحالات في أي وقت.</li>
          <li>يمكن للمستخدم الانسحاب من برنامج المجتمع في أي وقت؛ مع الإبقاء على المكافآت المكتسبة سابقًا ما لم يتم رصد خرق للشروط.</li>
        </ul>
      </li>
      <li><strong>التحديثات:</strong>
        <ul>
          <li>يحق لـ ONtrend تحديث هذه الشروط والسياسات دون إشعار مسبق.</li>
          <li>يتم إعلام المستخدمين بأي تغييرات من خلال التطبيق أو البريد الإلكتروني.</li>
        </ul>
      </li>
    </ol>
  `
  },
  {
    title: 'المعلومات الشخصية',
    content: `
      من أجل توفير أفضل تجربة توصيل ممكنة لعملائنا، ستطلب ONTREND المعلومات التالية من المستخدمين: الاسم الأول والأخير ورقم الهاتف المحمول وعنوان البريد الإلكتروني والجنسية. بالإضافة إلى ذلك، سيتم جمع موقع التوصيل ( موقع GPS ) تُستخدم هذه المعلومات لتحديد هوية العميل وإكمال الطلب. لن تتمكن سوى المطاعم والمتاجر من عرض اسم ورقم هاتف العميل، وقد وقع البائعون على اتفاقية بعدم الكشف عن أي معلومات خاصة بالعميل أثناء معالجة الطلب. يمكن للعملاء الوصول إلى معلوماتهم الشخصية وتحديثها في وقت لاحق في قسم الملف الشخصي في التطبيق. قد يتم الكشف عن معلوماتك لموظفينا وخدمات التوصيل التابعة لجهات خارجية.
    `,
  },
  {
    title: 'معلومات الدفع',
    content: `
      لتوفير خدمة التوصيل الأكثر ملاءمة لعملائنا، تقدم ONTREND ثلاثة خيارات للدفع: الدفع نقدًا عند التسليم، والدفع بالبطاقة عند التسليم، والدفع عبر الإنترنت (بطاقة الخصم أو الائتمان). بالنسبة للدفع عبر الإنترنت، يتم نقل جميع معلومات البطاقة إلى شركة بطاقة الخصم/الائتمان المعتمدة بتنسيق مشفر وفقًا للقواعد واللوائح المقبولة على المستوى الوطني أثناء معالجة طلبك. إن حفظ تفاصيل بطاقتك على ONTREND يعني أنها ستُحفظ بتنسيق مشفر، مع اتخاذ جميع الاحتياطات القانونية للحفاظ على الضمانات المادية والإلكترونية والإجرائية بشأن معلومات بطاقة الائتمان/الخصم. لن تتم مشاركة تفاصيل بطاقة الائتمان/الخصم مع أي مطعم/متجر أو أطراف ثالثة.
    `,
  },
  {
    title: 'تعديل سياسة الخصوصية',
    content: `
      قد تختار ONTREND تغيير سياسة الخصوصية بما يتماشى مع جميع السلطات القانونية المحلية والمنشورات ذات الصلة. سيتم إبلاغ التغييرات من خلال القنوات المناسبة لضمان علم العملاء بأي تحديثات.
    `,
  },
  {
    title: 'إعلانات ONTREND',
    content: `
      لتحسين خدماتنا باستمرار، قد تستخدم ONTREND وكالات الإعلان لاستخدام ملفات تعريف الارتباط وعلامات الإجراء (cookies and action tags) لقياس تأثيرنا التسويقي. يمكن أيضًا استخدام هذه التقنية لتقديم محتوى إعلاني ذي صلة وتوصيات. أي معلومات يتم الإبلاغ عنها من قبل هذه الوكالات الخارجية سرية تمامًا ولا تحتوي على أي معلومات شخصية للمستخدم.
    `,
  },
  {
    title: 'التسعير والدفعات',
    content: `
      يتم تحديد سعر جميع المنتجات على تطبيق ONTREND من قبل البائعين. بعد أن يقوم العميل بوضع طلب ويتم قبوله، يمثل هذا اتفاقًا بين العميل والمتجر. المتاجر مسؤولة وحدها عن أي طلبات يتم تقديمها لأعمالها. يتم إجراء المدفوعات النقدية مباشرة إلى المتجر. إذا اختار العميل الدفع عبر الإنترنت أو ببطاقة عند التسليم، فسوف تقوم ONTREND بمعالجة الدفع كوكيل للمتجر/المطعم. سيتم عرض جميع رسوم التوصيل الأخرى بوضوح في ملخص الطلب قبل تأكيد وضع الطلب.
    `,
  },
  {
    title: 'الدفع عبر الإنترنت',
    content: `
      إذا اخترت الدفع مقابل طلبك عبر الإنترنت وحفظ معلومات بطاقة الائتمان/الخصم الخاصة بك على تطبيق ONTREND، يرجى قراءة شروط الاستخدام وإخلاءات المسؤولية التالية بعناية. إذا تم فرض أي رسوم إضافية بسبب "الطلبات الخاصة" أو "الطلبات العامة" التي وضعها المستخدم، فإن المستخدم ملزم بالدفع عبر الدفع نقدًا عند التسليم. قد تستغرق عملية استرداد الأموال للعميل 2-3 أيام عمل إذا تم طلب رصيد ONTREND. ومع ذلك، قد تستغرق معالجة الاسترداد على بطاقة الخصم/الائتمان من خلال بوابة الدفع الخاصة بالبنك 7-14 يوم عمل. يجب على العميل متابعة البنك في حالة حدوث أي تأخير في استرداد مدفوعاته. يجب أن تكون أي بطاقات ائتمان/خصم مستخدمة لتقديم طلب من خلال خدمة الدفع عبر البطاقة عند التسليم أو بوابة الدفع عبر الإنترنت على التطبيق مملوكة للمستخدم. إذا لم يكن الأمر كذلك، فيجب على المستخدم الحصول على إذن قانوني من مالك البطاقة لإجراء المعاملة. المستخدم مسؤول بالكامل عن تقديم أي طلبات باستخدام بطاقات الائتمان/الخصم بعد قراءة جميع الشروط والأحكام بعناية.
    `,
  },
  {
    title: 'سياسة الاسترداد',
    content: `
      قد تستغرق عملية استرداد الأموال من العميل من 2 إلى 3 أيام عمل إذا تم طلب بطاقة الائتمان ONTREND. ومع ذلك، قد تستغرق معالجة استرداد الأموال على بطاقة الخصم/الائتمان من خلال بوابة الدفع الخاصة بالبنك من 7 إلى 14 يوم عمل. يجب على العميل متابعة البنك في حالة حدوث أي تأخير في استرداد مدفوعاته.
    `,
  },
  {
    title: 'إلغاء الطلب',
    content: `
      يمكنك إلغاء الطلبات قبل قبولها من قبل البائع. تحتفظ ONTREND بالحق في إلغاء الطلبات بسبب عدم التوافر أو الأخطاء. في حالة إلغاء الطلب، سيتم رد المبلغ المخصوم إلى الحساب المصرفي للعميل في غضون 7-14 يوم عمل. بدلاً من ذلك، يمكن للعملاء اختيار تحويل المبلغ المسترد إلى رصيد ONTREND، والذي سيتم إضافته في غضون 3 أيام عمل إلى محفظتهم على التطبيق.
    `,
  },
  {
    title: 'التوصيلات',
    content: `
      إذا تم تقديم طلب إلى عنوان خاطئ أو لم يكن العميل متاحًا في العنوان المقدم، فلن يتم توصيل الطلب إلى أي مكان آخر. يجب على العميل قبول جميع المسؤوليات القانونية المتعلقة بتقديم طلب إلى عنوان لا يكون متاحًا لاستلامه منه. لدى ONTREND فريق من سائقي التوصيل بالإضافة إلى شركاء التوصيل التابعين لجهات خارجية. ومع ذلك، قد يكون لدى بعض المتاجر سائقوها الخاصون لتوصيل طلبك. في حالة تأخر توصيل الطلب أو إلى الموقع الخطأ أو بطريقة غير مقبولة، لن تكون ONTREND مسؤولة عن هؤلاء السائقين لأنهم غير تابعين لشركة ONTREND أو سياسات التوصيل الخاصة بها. يجب تقديم أي مخاوف أو شكاوى ناتجة عن توصيل هؤلاء السائقين إلى المتجر الذي طلب منه المستخدم.
    `,
  },
  {
    title: 'مسؤوليات التوصيل',
    content: `
      لا تتحمل ONTREND مسؤولية مشكلات التوصيل الناجمة عن خدمات الطرف الثالث. يجب توجيه شكاوى التوصيل إلى البائع. البريد الإلكتروني: <a href="mailto:info@ontrend.live">info@ontrend.live</a>
    `,
  },
  {
    title: 'الإرجاعات',
    content: `
      إذا اختار العميل إرجاع منتج/وجبة، فسوف تنطبق عليه الشروط والأحكام الخاصة بإرجاع المنتجات التي تخص المطعم/المتجر. ولن تتحمل ONTREND المسؤولية عن أي نزاعات تتعلق بأي إرجاعات.
    `,
  },
  {
    title: 'صحة السجلات',
    content: `
      يوافق المستخدم ويصرح ويضمن أن أي إدخالات حسابية، وميكروفيلم، وسجلات كمبيوتر تشكل أدلة صالحة وملزمة ومطلقة وحصرية (فى حالة تقديم الشكاوى). تتمتع هذه المادة بخصائص العقد القائم على الأدلة، ويتنازل المستخدم مسبقًا عن جميع أنواع الاعتراضات على سجلات ONTREND المحددة والحق أن يُقسِم بشأن الاحتفاظ بهذه السجلات بالشكل اللائق.
    `,
  },
  {
    title: 'القيود المفروضة على الاستخدام غير الشخصي وغير التجاري',
    content: `
      إنك توافق على أن عواقب الاستخدام التجاري أو إعادة نشر المحتوى أو المعلومات الخاصة بـ ONTREND قد تؤدي إلى تعويضات مالية جسيمة وغير قابلة للقياس وقد لا يكون التعويض كافيًا أو مناسبًا، وأن ONTREND ستكون مؤهلة للحصول على أمر قضائي مؤقت ودائم لمنع مثل هذا الاستخدام.
    `,
  },
  {
    title: 'إرشادات الآراء',
    content: `
      تتم الموافقة على آراء العملاء على المتجر بناءً على المعايير التالية: الصلة، والمحتوى المقبول، والملكية من قبل ONTREND يجب أن تستند الآراء إلى خبرة مباشرة ولا تحتوي على لغة مسيئة، أو محتوى غير ذي صلة، أو تمييز، أو إشارات إلى نشاط غير قانوني، أو تضارب في المصالح. لا يتم اعتماد الآراء من قبل ONTREND ولا تمثل آراء ONTREND أو الشركات التابعة لها. تحتفظ ONTREND بالحق في إعادة إنتاج وتعديل وترجمة ونقل وتوزيع جميع المواد المتعلقة بالآراء دون التزام بدفع المال للمؤلفين أو أي طرف ثالث.
    `,
  },
  {
    title: 'مواد وسلوكيات الزائرين',
    content: `
      بخلاف المعلومات الشخصية التي تغطيها سياسة الخصوصية الخاصة بـ ONTREND، فإن أي مواد تقدمها/تنشرها على التطبيق ستُعتبر غير سرية وغير مملوكة. ولن يكون لدى ONTREND أي التزام فيما يتعلق بهذه المواد وستكون حرة في نسخها والإفصاح عنها وتوزيعها ودمجها واستخدامها بأي شكل آخر لأي غرض تجاري أو غير تجاري. ويُحظر على المستخدمين نشر أي مواد تنتهك أي قانون ساري أو غير قانونية أو احتيالية أو ترقى إلى مستوى الإعلان غير المصرح به أو تحتوي على فيروسات أو ضارة بأي شكل آخر. ولا يجوز للمستخدمين إساءة استخدام التطبيق أو الانخراط في أنشطة تتداخل مع استخدام الآخرين للتطبيق واستمتاعهم به.
    `,
  },
  {
    title: 'مسؤوليات المستخدم',
    content: `
      أثناء استخدام خدمات ONTREND، يقبل المستخدم ويتعهد بالمسؤوليات التالية: ضمان دقة معلومات التسجيل، وتحمل المسؤولية عن الأفكار والآراء والتصريحات الشخصية الواردة أثناء استخدام خدمات ONTREND، وعدم الوصول إلى خدمات غير مصرح بها أو تغيير البرامج بأي طريقة غير مصرح بها، وتعويض ONTREND عن جميع الخسائر الناتجة عن عدم الامتثال، وعدم إرسال رسائل تهديدية أو غير أخلاقية أو مسيئة عنصريًا. يجب ألا يشارك المستخدمون في أنشطة تضايق أو تهدد المستخدمين الآخرين أو موظفي ONTREND، ويجب عليهم الامتثال لجميع القوانين واللوائح ذات الصلة. يتحمل المستخدمون مسؤولية جميع الأفعال التي تتم بموجب اسم المستخدم الخاص بهم ويجب ألا يدخلوا إلى التطبيق أو الخدمات باستخدام حساب جهة خارجية دون موافقة.
    `,
  },
  {
    title: 'النشاط المحظور',
    content: `
      لا يجوز لك الوصول إلى التطبيق أو استخدامه لأي غرض آخر غير الغرض المخصص من أجله. التطبيق مخصص للاستخدام الشخصي فقط ولا يجوز استخدامه للأغراض التجارية باستثناء تلك التي أقرّتها ONTREND على وجه التحديد. تشمل الأنشطة المحظورة النشاط الإجرامي أو غير المشروع، أو الإعلان لأي مستخدم أو حثه على شراء أو بيع منتجات/خدمات دون إذن، أو الاسترجاع المنهجي للبيانات، أو الاستخدام غير المصرح به لخدمات تطبيق ONTREND ، أو إرسال رسائل متسلسلة أو بريد إلكتروني عشوائي، أو التدخل في التطبيق، أو انتحال شخصية مستخدم آخر، أو بيع ملفك الشخصي أو نقله، أو استخدام المعلومات لمضايقة الآخرين، وأي أنشطة تتعارض مع القوانين المعمول بها. قد يؤدي الانخراط في أنشطة محظورة إلى تعليق أو قفل أو إنهاء حساب المستخدم ومنع الوصول إلى خدمات .ONTREND
    `,
  },
];

const PrivacyPolicy = () => {
  const [isArabic, setIsArabic] = useState(false);
  const sections = isArabic ? arabicSections : englishSections;

  const handleLanguageToggle = (checked) => {
    setIsArabic(checked);
  };

  return (
    <div
      style={{
        padding: '30px 20px',
        maxWidth: '900px',
        margin: '20px auto',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        Privacy Policy
      </Title>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Text style={{ marginRight: '10px', fontSize: '16px' }}>English</Text>
        <Switch
          checked={isArabic}
          onChange={handleLanguageToggle}
          checkedChildren="عربي"
          unCheckedChildren="EN"
        />
        <Text style={{ marginLeft: '10px', fontSize: '16px' }}>عربي</Text>
      </div>

      <Collapse
        accordion
        bordered={false}
        style={{
          backgroundColor: 'transparent',
          borderRadius: '8px',
        }}
        expandIconPosition="right"
      >
        {sections.map((section, index) => (
          <Panel
            header={<Text style={{ fontSize: '18px', fontWeight: '500', color: '#333' }}>{section.title}</Text>}
            key={index}
            style={{
              marginBottom: '10px',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{ padding: '10px 15px', lineHeight: '1.8', fontSize: '16px', color: '#555' }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default PrivacyPolicy;