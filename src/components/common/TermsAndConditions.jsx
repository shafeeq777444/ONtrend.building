import React, { useState } from 'react';
import { Collapse, Switch, Typography } from 'antd';
// import 'antd/dist/reset.css';

const { Panel } = Collapse;
const { Title, Text } = Typography;

/** 
 * If you do not have Arabic text, feel free to replace the 'arabicSections' 
 * with placeholders or remove the language switch altogether.
 */
const englishSections = [
  {
    title: 'Terms & Conditions',
    content: `
      <p>Welcome to <strong>ONTREND</strong>. By using our website, mobile applications, and services, you agree to comply with the following Terms & Conditions. Please read them carefully before making any transactions.</p>
      <br>
      <ul>
        <p><strong>1. Secure & Encrypted Transactions</strong></p>
        <li> All payments made on <strong>ONTREND</strong>’s platform are secured and encrypted, ensuring no risk of information leakage.</li>
        <p><strong>2. Credit & Debit Card Payments</strong></p>
        <li>Credit/Debit Cards used for transactions on <strong>ONTREND</strong> must belong to the user.  </li>
        <li>All transactions are processed only after validation by the online payment gateway service provider.</li>
        <li>The customer is liable to pay cash on delivery to the driver if the "Special Request" or "General Request" requires extra charges as required by restaurants.</li>
        <p><strong>3. Order Cancellation & Refund Policy</strong></p>
        <li>Customer may cancel the order if the delivery time exceeded the restaurant delivery promise time highlighted in the restaurant info section, your paid amount will be refunded back to your account after validating the delay reason.</li>
        <li>The customer order cancellation is limited to a maximum time of 5 minutes after placing the order.</li>
        <li>The customer refund procedure depends on the chargeback process of the customer’s bank, with a maximum period of 15 working days. The customer has to follow up with their bank in case of any delay in crediting the amount previously paid. <strong>ONTREND</strong> will send an email to the customer that contains a printout of the refund advice from the online payment gateway as a reference in case the customer needs to follow up with their bank.</li>
        <li>If the customer faces the inconvenience of a missing item informed by the restaurant, both parties (restaurant and customer) can agree on a substitute item. In any other case, the customer can cancel the order and place a new one via <strong>ONTREND</strong> platforms; in this case, the full amount of the canceled order will be refunded as mentioned above.</li>
        <li>If your ordered item is unavailable and a replacement of higher value is selected, we reserve the right to charge your payment card for the outstanding amount beyond the originally displayed order amount. We will make every effort to communicate any such adjustments promptly, allowing you to be informed of any changes to your order total.</li>
        <li>The customer is entirely liable for placing an order using the Credit Cards facility after carefully reading all the terms & conditions.</li>
        <p><strong>4. Account Responsibility</strong></p>
        <li>Users must maintain the confidentiality of their <strong>ONTREND</strong>’s account login credentials.<strong>ONTREND</strong> is not responsible for unauthorized access resulting from user negligence.</li>
        <p><strong>5. Order Acceptance & Vendor Liability</strong></p>
        <li><strong>ONTREND</strong> and vendors reserve the right to accept or reject any order due to unavailability, operational constraints, or other reasons. Refunds will be processed accordingly. </li>
        <li>Vendors are responsible for order accuracy, packaging, and food safety. <strong>ONTREND</strong> acts as a platform provider and is not liable for product quality or delays caused by vendor</li>
        <p><strong>6. Pricing, Charges & Service Fees</strong></p>
        <li> Vendors determine the pricing of items on <strong>ONTREND</strong>, and prices may change without prior notice. <strong>ONTREND</strong> is not responsible for discrepancies between online and in-store pricing.</li>
        <li> Delivery fees and service charges are non-refundable unless explicitly stated otherwise.</li>
        <p><strong>7. Promotions & Discounts</strong></p>
        <li><strong>ONTREND</strong> may offer promotions, discounts, and loyalty rewards, subject to change at <strong>ONTREND</strong>’s discretion.</li>
        <li>Abuse of promotional codes or discounts may result in account suspension.</li>
        <p><strong>8. Fraudulent Transactions</strong></p>
        <li><strong>ONTREND</strong> reserves the right to cancel orders, suspend accounts, and report any detected fraudulent transactions to the authorities.</li>
        <p><strong>9. Service Availability & Technical Issues</strong></p>
        <li><strong>ONTREND</strong> strives to provide uninterrupted service but does not guarantee availability at all times due to maintenance, technical failures, or external factors.</li>
        <p><strong>10. Dispute Resolution</strong></p>
        <li>Customers can contact <strong>ONTREND</strong> support in case of disputes related to order fulfillment, refunds, or service issues. <strong>ONTREND</strong>’s decision will be final.</li>
        <p><strong>11. Third-Party Services</strong></p>
        <li> <strong>ONTREND</strong> integrates third-party services for payment processing, location tracking, and other functionalities. Users agree to abide by the terms of these third-party providers.</li>
        <p><strong>12. Termination of Service</strong></p>
        <li><strong>ONTREND</strong> reserves the right to suspend or terminate user accounts in cases of fraud, policy violations, or misuse of the platform. </li>
        <p><strong>13. ONTREND Wallet</strong> </p>
        <li>The <strong>ONTREND</strong> Wallet is a digital feature that allows users to store ONTREND Credit, which can be used for future purchases on the ONTREND platform.</li>
        <li>13.1 Funding the Wallet <br/>
          Wallet balances can only be credited through:<br/>
           Refunds issued for canceled or returned orders.<br/>
           Promotional credits granted by ONTREND (if applicable).<br/>
           Transfers from previous transactions where the customer opted to receive ONTREND Credit instead of a direct bank refund.
        </li>
        <li>13.2 Wallet Usage<br/>
          Wallet credit can be used fully or partially to pay for orders placed on ONTREND’s platform (website and apps).<br/>
          Wallet credit is non-transferable and cannot be withdrawn as cash or transferred to any bank account.<br/>
          Wallet credit cannot be used to tip delivery drivers or pay for any third-party services not linked to ONTREND.<br/>
        </li>
        <li>13.3 Validity & Expiry<br/>
          ONTREND Credit in the wallet may be subject to expiration based on promotional terms or refund conditions. Users will be notified of such expiry dates, if applicable.<br/>
          ONTREND reserves the right to cancel or expire credits that are misused or obtained fraudulently.<br/>
        </li>
          <li>13.4 Refunds to Wallet<br/>
          Wallet refunds are typically processed within 2-3 working days from the cancellation or approval of the refund.<br/>
          Once credited, the wallet balance will be visible in the user’s account.<br/>
        </li>
        </li>
          <li>13.5 Wallet Balance Discrepancies<br/>
          If you believe there is a discrepancy in your wallet balance, please contact ONTREND support within 7 days of the issue. ONTREND will investigate and resolve the issue accordingly.
        </li>
        </li>
          <li>13.6 Liability & Restrictions<br/>
          ONTREND reserves the right to modify, suspend, or terminate the wallet feature or related promotions at any time without prior notice
        </li>
        <p><strong>By continuing to use ONTREND, you acknowledge and agree to these Terms & Conditions. ONTREND may update these terms periodically, and continued usage of the platform implies acceptance of any modifications.</strong></p>
      </ul>
    `,
  },
  {
    title: 'ONtrend Community',
    content: `
    <ol>
      <li><strong>Community Code Eligibility:</strong>
        <ul>
          <li>Any registered ONtrend user can generate a unique Community Code after accepting these terms.</li>
          <li>Each user can generate and use only one active Community Code.</li>
        </ul>
      </li>
      <li><strong>Earnings & Rewards:</strong>
        <ul>
          <li>The code generator (Community Owner) will earn <strong>5% of the order amount</strong> (excluding delivery charges, VAT, and service fees) from all valid purchases made by users who entered their code.</li>
          <li>Rewards will be credited to the ONtrend wallet or respective account and are non-transferable.</li>
          <li>Earnings are subject to final order completion and are voided in case of full refunds or cancellations.</li>
        </ul>
      </li>
      <li><strong>Fair Usage Policy:</strong>
        <ul>
          <li>Community Codes must be shared ethically. Any misuse, spamming, fake registrations, or fraudulent activity will result in immediate disqualification and loss of earnings.</li>
          <li>ONtrend reserves the right to suspend or terminate any community account found violating the platform rules.</li>
        </ul>
      </li>
      <li><strong>Community Limitations:</strong>
        <ul>
          <li>Community Codes cannot be used by the code owner themselves.</li>
          <li>Community benefits are applicable only to orders made after code linkage.</li>
          <li>A user can only join one community and cannot switch once linked.</li>
        </ul>
      </li>
      <li><strong>Settlement & Payouts:</strong>
        <ul>
          <li>ONtrend will settle earnings as per the minimum threshold value determined by ONtrend to eligible Community Owners.</li>
          <li>All settlements are subject to internal accounting and tax regulations.</li>
        </ul>
      </li>
    </ol>
  `
  },
  {
    title: 'Product Representation Disclaimer',
    content: `
      <p>Images represented here are not an exact representation of the actual product. 
      The actual product may vary in appearance, color, and size.</p>
    `,
  },
];

// Example Arabic translation (adjust as you see fit)
const arabicSections = [
  {
    title: 'الشروط والأحكام',
    content: `
      <p>يرجى ملاحظة أن عملية الاتصال مشفرة وآمنة، ولا يوجد خطر لتسريب المعلومات. يرجى قراءة الشروط والأحكام التالية وإخلاء المسؤولية بعناية قبل استخدام البطاقة الائتمانية:</p>
      <ul>
        <li>يجب أن تكون بطاقات الائتمان/الخصم المستخدمة في تقديم الطلبات عبر بوابة الدفع الإلكتروني على موقع أو تطبيقات <strong>ONTREND</strong> مملوكة للمستخدم.</li>
        <li>يتم معالجة جميع المعاملات بعد عملية التحقق من قبل مزود خدمة بوابة الدفع عبر الإنترنت.</li>
        <li>يجب على العميل دفع المبلغ نقداً عند التسليم إذا كانت هناك تكاليف إضافية متعلقة بـ"الطلبات الخاصة" أو "الطلبات العامة" تتطلبها المطاعم.</li>
        <li>يمكنك إلغاء الطلب إذا تجاوز وقت التوصيل الوقت المعلن من قبل المطعم؛ سيتم رد المبلغ المدفوع إلى حسابك بعد التحقق من سبب التأخير.</li>
        <li>يقتصر إلغاء طلب العميل على مدة أقصاها 5 دقائق بعد تقديم الطلب.</li>
        <li>تعتمد إجراءات استرداد أموال العميل على عملية الاسترجاع الخاصة ببنك العميل، وبحد أقصى 15 يوم عمل. يجب على العميل متابعة البنك في حال حدوث أي تأخير. سترسل <strong>ONTREND</strong> رسالة إلكترونية تحتوي على نسخة من طلب الاسترجاع كمرجع للعميل.</li>
        <li>إذا واجه العميل مشكلة في فقدان عنصر ما كما أُبلغ من قبل المطعم، يمكن للطرفين (المطعم والعميل) الاتفاق على استبدال العنصر المفقود. وفي أي حالة أخرى، يمكن للعميل إلغاء الطلب وتقديم طلب جديد عبر منصات <strong>ONTREND</strong>؛ في هذه الحالة، يتم رد المبلغ المدفوع بالكامل وفقًا للمذكور أعلاه.</li>
        <li>إذا كان المنتج المطلوب غير متوفر وتم اختيار بديل بقيمة أعلى، نحتفظ بالحق في خصم المبلغ المتبقي من بطاقتك الائتمانية. سنبذل قصارى جهدنا لإبلاغك بأي تعديلات في أسرع وقت، حتى تكون على دراية بأي تغييرات على إجمالي طلبك.</li>
        <li>يتحمل العميل المسؤولية الكاملة عند تقديم أي طلب باستخدام خدمة بطاقات الائتمان بعد قراءة كافة الشروط والأحكام بعناية.</li>
      </ul>
    `,
  },
  {
    title: 'شروط وأحكام مجتمع ONtrend',
    content: `
    <ol>
      <li><strong>أهلية رمز المجتمع:</strong>
        <ul>
          <li>يمكن لأي مستخدم مسجل في ONtrend إنشاء رمز مجتمع فريد بعد الموافقة على هذه الشروط.</li>
          <li>يحق لكل مستخدم إنشاء وامتلاك رمز مجتمع نشط واحد فقط.</li>
        </ul>
      </li>
      <li><strong>الأرباح والمكافآت:</strong>
        <ul>
          <li>يحصل مالك الرمز على 5% من قيمة كل طلب صالح (باستثناء رسوم التوصيل، ورسوم الخدمة، وضريبة القيمة المضافة) بوجود المجتمع الذي تم استخدام رمزه.</li>
          <li>تُضاف المكافآت إلى محفظة ONtrend أو الحساب المرتبط ولا يمكن تحويلها إلى طرف ثالث.</li>
          <li>تُخصم الأرباح عند عدم اكتمال الطلب أو في حال الإلغاء الكامل أو الاسترداد.</li>
        </ul>
      </li>
      <li><strong>سوء الاستخدام العادل:</strong>
        <ul>
          <li>يجب مشاركة رمز المجتمع بشكل أخلاقي. أي نشر عشوائي، أو إساءة استخدام، أو تسجيلات وهمية، أو نشاط احتيالي يؤدي إلى إنهاء الحساب وفقدان المكافآت.</li>
          <li>تحتفظ ONtrend بالحق في تعليق أو إنهاء أي حساب مجتمع ينتهك قواعد المنصة.</li>
        </ul>
      </li>
      <li><strong>قيود المشاركة بالمجتمع:</strong>
        <ul>
          <li>لا يجوز لمالك الرمز استخدام رمزه الشخصي.</li>
          <li>تنطبق المزايا المجتمعية فقط على الطلبات التي تتم بعد ربط الرمز.</li>
          <li>يمكن للمستخدم الانضمام إلى مجتمع واحد فقط ولا يحق له تغييره بعد الربط.</li>
        </ul>
      </li>
      <li><strong>الشروط والدفع:</strong>
        <ul>
          <li>تُصرف الأرباح فقط عندما تتجاوز الحد الأدنى الذي تحدده ONtrend لأصحاب المجتمعات المؤهلين.</li>
          <li>جميع الدفعات تخضع للمعالجة المحاسبية والضريبية الداخلية.</li>
        </ul>
      </li>
    </ol>
  `
  },
  {
    title: 'تنويه حول صور المنتج',
    content: `
      <p>الصور المعروضة هنا ليست بالضرورة مطابقة للمنتج الفعلي. قد يختلف المنتج الفعلي في مظهره أو لونه أو حجمه.</p>
    `,
  },
];

const TermsAndConditions = () => {
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
        {isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}
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

export default TermsAndConditions;