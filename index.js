console.log("The app is running from the terminal using `node index.js` or `node .`");

// Install LiveReload daemon: `npm install -D livereload`.
// LiveReload starts a separate process to watch for project file changes.
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();

// Need to signal the browser to reload the page when the server is restarted.
// This is tricky, since when "nodemon" kills the server, the LiveReload server
// is also disconnected.
// The solution is using the connection event from the browser (because the
// browser will try to reconnect automatically). When this event is received,
// pause the webserver for a short period (100ms) to allow LiveReload to reboot.
// Then, request a browser refresh (only once to avoid an infinite refresh loop).
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Install "connect-livereload" package: `npm install -D connect-livereload`.
// Once LiveReload is running, it needs a way to force the browser to refresh
// when any changes happen. This is what "connect-livereload" does.
const connectLivereload = require("connect-livereload");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(connectLivereload());

// import axios HTTP client
const axios = require("axios");
const apiUrl = "https://baconipsum.com/api/?type=meat-and-filler";

// set the view engine to EJS
app.set("view engine", "ejs");

// enable serving static files
app.use(express.static("public"));

// set up the web server
app.listen(PORT, () => {
    console.log(`App server is listening on port ${PORT}`);
});

// define the root route
app.get("/", function (req, res) {
    res.render("index", {
      sec_1_title: 'Cash now.* Help now. Call now.',
      sec_1_paragraph_1: 'Express Legal Funding can provide financial help when you need it.™ Get help with your bills, general living costs, and other expenses while you wait for your case to settle.',
      sec_1_paragraph_2: 'We can advance you anywhere between $550 to $500,000 in pre-settlement funding cash. The amount of legal funding is based on the strength and value of your case.',
      sec_2_title: 'Financial freedom for all',
      sec_2_subtitle: 'Whether you’re owed money — or you owe money — we have a solution to help.',
      sec_4_paragraph: '*Sales of Structured Settlement and Lottery Payments are subject to Court Approval and other conditions which can take 60-90 days to complete. Annuity payment sales are also subject to certain conditions. All transactions are at JG Wentworth’s sole discretion.',
    });
});

// define a dynamic route, use an external API
app.get("/about", function (req, res) {
    axios
      .get(apiUrl)
      .then(function (response) {
        // console.log(response.data);
        var news = [];
        for (let i = 0; i < response.data.length; i++) {
          var text = response.data[i];
          var headline = text.split(". ", 1)[0];
          news[i] = {
            headline: headline,
            text: text,
            author: text.split(" ").splice(-2).join(" ").slice(0, -1),
            published: Math.floor(Math.random() * (2023 - 1980 + 1) + 1980),
          };
        }
        // console.log(news);
  
        res.render("about", {
          pageTitle: "News From An External API",
          articles: news,
        });
      })
      .catch(function (error) {
        console.log("API error", error);
      });
    // .finally(function () {
    //   console.log("API processing finalized");
    // });
  });

// define a static HTML view route
app.get("/services", function (req, res) {
    res.render("services");
  });

// define a static HTML view route
app.get("/casesWeHundle", function (req, res) {
  res.render("casesWeHundle", {
    sec_1_title: 'Types of Lawsuit Funding',
    sec_2_title: 'Express Legal Funding can help you move forward financially. We can provide pre-settlement cash advances for all types of personal injury and civil lawsuit cases.',
    sec_2_block_1_title: 'Experts in Lawsuit Funding',
    sec_2_block_1_paragraph: 'You want the best team fighting for your fair settlement. A lawsuit funding company can be your ally in that fight. That’s why you should only accept legal funding from experts. We are an expert legal funding company respected by a large number of law firms. We have a full-time licensed attorney on staff who will make your attorney’s job easier, not harder, so you can get the settlement money you deserve.',
    sec_2_block_2_title: 'Custom Pre-settlement Funding',
    sec_2_block_2_paragraph: 'We know everyone’s case is unique to them, and no two lawsuits are the same. That’s why we evaluate each case on an individual basis to make pre-settlement funding more beneficial to our clients and their attorneys.',
    sec_2_btn1: 'Legal Funding',
    sec_2_btn2: 'Car Accident',
    sec_2_btn3: 'Personal Injury',
    sec_2_btn4: 'Slip and Fail',
    sec_3_block_1_title: 'Why are we the best lawsuit funding company in 2022?',
    sec_3_block_1_paragraph: 'We are the best lawsuit funding company in 2022 because we do what’s right for our clients. In 2021, we led the fight to set a new and higher standard for ethical, consumer legal funding.',
    sec_3_block_2_title: 'What is direct legal funding?',
    sec_3_block_2_paragraph: 'Our legal funding team will always communicate directly with you, so you can get the pre-settlement cash you need faster. At Express Legal Funding, we use our own money to assist our clients directly with lawsuit funding. So you don’t have to get charged for any broker fees. Direct legal funding means you can receive more money more quickly.',
    sec_3_block_3_title: 'What makes our lawsuit cash help better?',
    sec_3_block_3_paragraph: 'Our lawsuit cash help is better for residents of Missouri and Oklahoma. Some companies don’t get licensed by either the State of Oklahoma or the Missouri Division of Finance. We are licensed to offer lawsuit cash help in both Oklahoma and Missouri. Just two of the ways that makes Express Legal Funding the best.',
    sec_3_block_4_title: 'What is legal funding near me?',
    sec_3_block_4_paragraph: 'We are a “legal funding near me” local business with real locations in Texas. So you can get a pre-settlement cash advance on your case from a Texas legal funding company near you. So unlike some lawsuit companies, we don’t rent a virtual office or mailbox in a big Texas city. We are a Texas LLC.',
    registrationForm: {
      title: '3 Simple Steps',
      step_1_subtitle: 'Step 1. Contact us',
      step_1_text: 'Call us at (NUMBER) or apply online and get immediate assistance. ',
      step_2_subtitle: 'Step 2. We Review',
      step_2_text: 'We rapidly review your case after speaking with your attorney.',
      step_3_subtitle: 'Step 3. Get Your Legal Funding',
      step_3_text: 'We deliver funding within 24 hours after approval.',
    },


  });
});

// define a static HTML view route
app.get("/legalFunding", function (req, res) {
  res.render("service", {
    headline: 'Legal Funding',
    sec_1_img: '/slip-and-fall-legal-funding.webp',
    sec_2_title: 'Legal funding can help you pay your bills and make purchases right away.',
    sec_2_block_1_paragraph_1: 'We know that accidents and injuries result in increased costs and lost pay, regardless of your financial circumstances. Because of this, we work hard to make legal funding for our clients easy and reasonably priced.',
    sec_2_block_1_paragraph_2: 'Therefore, you can acquire the money you need immediately by taking the initial step and submitting an application for lawsuit funding. Your attorney can continue fighting for a fair settlement at the end of your case.',
    sec_2_block_1_paragraph_3: "Legal funding for your case is not based on your credit score, unlike lawsuit loans. Thus, you don't need to worry that a bad credit score will increase interest rates.",
    sec_2_block_2_paragraph_1: 'Additionally, pre-settlement funding is an entirely non-recourse cash advance on the eventual settlement of your case. You never have to pay out of pocket and can avoid new debts.',
    sec_2_block_2_paragraph_2: 'Call us at (NUMBER) or apply online for a quick lawsuit cash financial assistance. We are here to help you!',
    sec_2_block_2_paragraph_3: 'Just like your attorney and law firm hired on a contingency fee, we don’t get paid back unless you settle or win your case! Call your team at Express Legal Funding today at (888) 232-9223 or apply online for fast lawsuit cash financial relief. We make it easy and are here to help!',
    sec_3_title: 'Cases we support:',
    sec_3_paragraph_1: 'We can offer lawsuit funding for all forms of personal injury and civil lawsuit cases. If you seek compensation for damages that another person or a business caused you, apply for legal financing of your case now! ',
    sec_3_paragraph_2: '',
    sec_3_paragraph_3: 'We can advance you anywhere between <span class="font-medium">$550 to $500,000</span> in cash, depending on the value of your injury claim.',
    listItems:  [
      'Car accidents',
      '18-wheeler accidents',
      'Motorcycle collisions',
      'Injuries from pedestrian accidents',
      'Injuries from bicycle accidents',
      'Bus collisions',
      'Wrongful death',
      'Nursing home abuse',
    ],
    listItems2: [
      'Oilfield explosions',
      'Claims of medical malpractice',
      'Dog bite injuries',
      'Slip-and-fall accidents',
      'Stairway accidents',
      'Escalator accidents',
      'Drowning in a swimming pool',
    ],

    sec_4_title: '',
    sec_4_subtitle: 'If you’re not sure if your case qualifies for legal funding, give us a call to discuss your options. <span class="font-bold">(888) 232-9223</span>',
    sec_5_question_1: 'Can I qualify for legal funding if I don’t have a job?',
    sec_5_answer_1: 'Yes! At Express Legal Funding we don’t even require you to provide us with any of your current or past job histories. We make it easy, so you don’t have to worry—no rising rates—just one low fixed rate from day one. No collateral. No proof of employment. Risk-free. The way legal funding should be!',
    sec_5_question_2: 'Can I win a larger settlement amount by getting a cash advance on my settlement?',
    sec_5_answer_2_1: 'Yes, getting a pre-settlement cash advance during your case can help you and your lawyer gain a more fair and more large settlement or court award. Legal funding is there to help people survive financially while their attorney continues to fight for justice on your behalf. Plus, by calling upon Express Legal Funding and our very fair and low funding rates, you can get even more settlement money on your case now and later.',
    sec_5_answer_2_2: '',
    sec_5_question_3: 'Legal Funding is Better Than a Lawsuit Loan',
    sec_5_answer_3_1: 'Legal funding is a superior option to pre-settlement loans for plaintiffs and their attorneys. A pre-settlement cash advance is non-recourse funding in Texas. Meaning, unlike a loan, it’s not dependent on your credit score or legal status. So you don’t have to worry about a not getting approved because of a low credit score.',
    sec_5_answer_3_2: 'Don’t forget, lawsuit funding is a risk-free money on your case; you never have to pay out of your own pocket. Just like your lawyer, we don’t get paid unless you settle or go to court and win!',
    sec_5_span: 'Express Legal Funding is a lower cost pre-settlement funding company. We do our best not to misrepresent our financial services and products as pending lawsuit loans or settlement loans near me. Many pre-settlement funding companies choose to represent themselves falsely as “best lawsuit loan companies.” We are not a pending settlement loans company in Texas, enabling us to provide risk-free and non-recourse legal funding to the consumer.',
    sec_6_title: 'Cash relief now.',
    sec_6_btn1: 'Call Now',
    sec_6_btn2: 'Apply Online',
    sec_6_img: '/cash-funding-help.webp',
    registrationForm: {
      title: '3 Simple Steps',
      step_1_subtitle: 'Step 1. Contact us',
      step_1_text: 'Call us at (NUMBER) or apply online and get immediate assistance. ',
      step_2_subtitle: 'Step 2. We Review',
      step_2_text: 'We rapidly review your case after speaking with your attorney.',
      step_3_subtitle: 'Step 3. Get Your Legal Funding',
      step_3_text: 'We deliver funding within 24 hours after approval.',
    },

  });
});

// define a static HTML view route
app.get("/PersonalInjury", function (req, res) {
  res.render("service", {
    headline: 'Personal Injury Legal Funding for Plaintiffs',
    sec_1_img: '/slip-and-fall-legal-funding.webp',
    sec_2_title: 'Lawsuit funding for personal injury settlements can assist you in paying your bills and making purchases.',
    sec_2_block_1_paragraph_1: 'Regardless of your specific financial circumstances, injuries and accidents result in additional expenses and unexpected loss of wages. That is why we provide quick and affordable personal injury lawsuit funding! You can get the cash you need quickly while your accident lawyer fights for your case settlement.',
    sec_2_block_1_paragraph_2: "Personal injury legal funding isn't a credit-based loan. We do not need to consider your credit history. Thus, you don't need to worry that a bad credit score will increase interest rates.",
    sec_2_block_1_paragraph_3: '',
    sec_2_block_2_paragraph_1: 'Additionally, personal injury lawsuit funding offers a risk-free cash advance on your damage case. You never pay out of pocket and avoid debts. Contact us at (NUMBER) or submit an online application for financial relief today. ',
    sec_2_block_2_paragraph_2: '',
    sec_2_block_2_paragraph_3: '',
    sec_3_title: 'Personal Injury Cases we support:',
    sec_3_paragraph_1: 'Legal funding is available for all types of personal injury cases.  If you seek compensation for damages, apply for legal financing of your case now! ',
    sec_3_paragraph_2: '',
    sec_3_paragraph_3: 'We can advance you anywhere between <span class="font-medium">$550 to $500,000</span>in cash, depending on the value of your personal injury claim.',
    listItems:  [
      'Car accidents',
      '18-wheeler accidents',
      'Motorcycle collisions',
      'Injuries from pedestrian accidents',
      'Injuries from bicycle accidents',
      'Bus collisions',
      'Wrongful death',
      'Nursing home abuse',
    ],
    listItems2: [
      'Oilfield explosions',
      'Claims of medical malpractice',
      'Dog bite injuries',
      'Slip-and-fall accidents',
      'Stairway accidents',
      'Escalator accidents',
      'Drowning in a swimming pool',
    ],
    sec_4_title: 'Better Than a Personal Injury Lawsuit Loan',
    sec_4_subtitle: 'If you’re not sure if your case qualifies for personal injury legal funding, give us a call to discuss your options.',
    sec_5_question_1: 'Can I qualify for legal funding if I don’t have a job?',
    sec_5_answer_1: 'Yes! At Express Legal Funding we don’t even require you to provide us with any of your current or past job histories. We make it easy, so you don’t have to worry—no rising rates—just one low fixed rate from day one. No collateral. No proof of employment. Risk-free. The way legal funding should be!',
    sec_5_question_2: 'Are lawsuit cash advances better than personal injury lawsuit loans?',
    sec_5_answer_2_1: 'Yes! Personal injury lawsuit funding is a superior cash advance option to injury lawsuit loans for injured plaintiffs and attorneys. That’s because injury lawsuit funding is non-recourse in Texas. Meaning unlike a personal injury loan that’s repaid at the end of your case, it’s not dependent on your credit score or legal status.',
    sec_5_answer_2_2: 'Remember, with Express Legal Funding, personal injury lawsuit funding is non-recourse funding. So you can recover from your accident’s injuries, and you can work with your attorney to keep adding value to your case.',
    sec_5_question_3: 'Can I win a larger injury settlement amount by getting a cash advance on my case?',
    sec_5_answer_3_1: 'Yes, you can! Getting a pre-settlement cash advance for your personal injury case can help you, and your lawyer gain a more fair and more large settlement.',
    sec_5_answer_3_2: 'Injury lawsuit funding is there designed to help you financially survive while your attorney continues to fight for justice on your behalf. Plus, you can get even more money from your case now and later by choosing Express Legal Funding and our low and fair rates.',
    sec_5_span: 'Express Legal Funding is a lower cost pre-settlement funding company. We do our best not to misrepresent our financial services and products as pending lawsuit loans or settlement loans near me. Many pre-settlement funding companies choose to represent themselves falsely as “best lawsuit loan companies.” We are not a pending settlement loans company in Texas, enabling us to provide risk-free and non-recourse legal funding to the consumer.',
    sec_6_title: 'Cash relief now.',
    sec_6_btn1: 'Call Now',
    sec_6_btn2: 'Apply Online',
    sec_6_img: '/slip-and-fall-legal-funding.webp',
    registrationForm: {
      title: '3 Simple Steps',
      step_1_subtitle: 'Step 1. Contact us',
      step_1_text: 'Call us at (NUMBER) or apply online and get immediate assistance. ',
      step_2_subtitle: 'Step 2. We Review',
      step_2_text: 'We rapidly review your case after speaking with your attorney.',
      step_3_subtitle: 'Step 3. Get Your Legal Funding',
      step_3_text: 'We deliver funding within 24 hours after approval.',
    },

  });
});

// define a static HTML view route
app.get("/CarAccident", function (req, res) {
  res.render("service", {

    headline: 'Car Accident Loans or Accident Lawsuit Funding?',
    sec_1_img: '/car-accidents.webp',
    sec_2_title: 'Car accident lawsuit funding can ease your financial burden. Unlike a car accident settlement loan, it’s risk-free!',
    sec_2_block_1_paragraph_1: 'Car accident lawsuit funding can assist you in paying your payments and making purchases.',
    sec_2_block_1_paragraph_2: 'We understand that car accident lawsuits result in increased expenses and lost wages.',
    sec_2_block_1_paragraph_3: 'We make car accident lawsuit funding quick and reasonable!',
    sec_2_block_2_paragraph_1: 'You can get the car wreck cash you need immediately while your car accident lawyer fights for your case settlement.',
    sec_2_block_2_paragraph_2: "Car accident legal funding isn't a credit-based loan. We do not need to consider your credit history. Thus, you don't need to worry that a bad credit score will increase interest rates.",
    sec_2_block_2_paragraph_3: 'Additionally, car accident legal funding offers a risk-free cash advance on your damage case. You never pay out of pocket and avoid debts. Contact us at (NUMBER) or submit an online application for financial relief today. ',
    sec_3_title: 'Car Accident Injury Cases We Support',
    sec_3_paragraph_1: 'Car accident funding is available for all types of motor vehicle accident cases. If you seek compensation for damages, apply for legal financing of your case now!',
    sec_3_paragraph_2: 'Legal funding is available for all types of car accident cases.  If you seek compensation for damages, apply for legal financing of your case now!',
    sec_3_paragraph_3: 'We can advance you anywhere between <span class="font-medium">$550 to $500,000</span>in cash, depending on the value of your car accident claim.',
    listItems:  [
      'Car accidents',
      '18-wheeler accidents',
      'Motorcycle collisions',
      'Injuries from pedestrian accidents',
      'Injuries from bicycle accidents',
      'Bus collisions',
      'Wrongful death',
      'Nursing home abuse',
    ],
    listItems2: [
      'Oilfield explosions',
      'Claims of medical malpractice',
      'Dog bite injuries',
      'Slip-and-fall accidents',
      'Stairway accidents',
      'Escalator accidents',
      'Drowning in a swimming pool',
    ],
    sec_4_title: '',
    sec_4_subtitle: 'If you’re not sure if your case qualifies for legal funding, give us a call to discuss your options. <span class="font-bold">(888) 232-9223</span>',
    sec_5_question_1: 'Can I qualify for legal funding if I don’t have a job?',
    sec_5_answer_1: 'Yes! At Express Legal Funding we don’t even require you to provide us with any of your current or past job histories. We make it easy, so you don’t have to worry—no rising rates—just one low fixed rate from day one. No collateral. No proof of employment. Risk-free. The way legal funding should be!',
    sec_5_question_2: 'Are lawsuit cash advances better than personal injury lawsuit loans?',
    sec_5_answer_2_1: 'Yes! Personal injury lawsuit funding is a superior cash advance option to injury lawsuit loans for injured plaintiffs and attorneys. That’s because injury lawsuit funding is non-recourse in Texas. Meaning unlike a personal injury loan that’s repaid at the end of your case, it’s not dependent on your credit score or legal status.',
    sec_5_answer_2_2: 'Remember, with Express Legal Funding, personal injury lawsuit funding is non-recourse funding. So you can recover from your accident’s injuries, and you can work with your attorney to keep adding value to your case.',
    sec_5_question_3: 'Can I win a larger injury settlement amount by getting a cash advance on my case?',
    sec_5_answer_3_1: 'Yes, you can! Getting a pre-settlement cash advance for your personal injury case can help you, and your lawyer gain a more fair and more large settlement.',
    sec_5_answer_3_2: 'Injury lawsuit funding is there designed to help you financially survive while your attorney continues to fight for justice on your behalf. Plus, you can get even more money from your case now and later by choosing Express Legal Funding and our low and fair rates.',
    sec_5_span: 'Express Legal Funding is a lower cost pre-settlement funding company. We do our best not to misrepresent our financial services and products as pending lawsuit loans or settlement loans near me. Many pre-settlement funding companies choose to represent themselves falsely as “best lawsuit loan companies.” We are not a pending settlement loans company in Texas, enabling us to provide risk-free and non-recourse legal funding to the consumer.',
    sec_6_title: 'Cash relief now.',
    sec_6_btn1: 'Call Now',
    sec_6_btn2: 'Apply Online',
    sec_6_img: '/auto-accidents.webp',
    registrationForm: {
      title: '3 Simple Steps',
      step_1_subtitle: 'Step 1. Contact us',
      step_1_text: 'Call us at (NUMBER) or apply online and get immediate assistance. ',
      step_2_subtitle: 'Step 2. We Review',
      step_2_text: 'We rapidly review your case after speaking with your attorney.',
      step_3_subtitle: 'Step 3. Get Your Legal Funding',
      step_3_text: 'We deliver funding within 24 hours after approval.',
    },
  });
});

// define a static HTML view route
app.get("/SlipAndFall", function (req, res) {
  res.render("service", {

    headline: 'Slip and Fall Legal Funding',
    sec_1_img: '/slip-and-fall-legal-funding.webp',
    sec_2_title: 'Legal funding for your slip and fall accident case can ease your financial burden. Unlike a slip and fall accident loan, it’s risk-free!',
    sec_2_block_1_paragraph_1: 'Slip and fall accident funding can assist you in paying your payments and making purchases.',
    sec_2_block_1_paragraph_2: 'We understand that slip-and-fall accident lawsuits result in increased expenses and lost wages.',
    sec_2_block_1_paragraph_3: 'We make slip-and-fall accident lawsuit funding quick and reasonable!',
    sec_2_block_2_paragraph_1: 'You can get the cash you need immediately while your slip-and-fall accident lawyer fights for your case settlement.',
    sec_2_block_2_paragraph_2: "Slip-and-fall lawsuit funding isn't a credit-based loan. We do not need to consider your credit history. Thus, you don't need to worry that a bad credit score will increase interest rates.",
    sec_2_block_2_paragraph_3: 'Slip-and-fall lawsuit funding offers a risk-free cash advance on your damage case. You never pay out of pocket and avoid debts. Contact us at (NUMBER) or submit an online application for financial relief today.',
    sec_3_title: 'Slip and Fall Cases We Support',
    sec_3_paragraph_1: 'Legal funding is available for all types of slip and fall accident cases and premises liability cases. If you seek compensation for damages, apply for legal financing of your case now! ',
    sec_3_paragraph_2: '',
    sec_3_paragraph_3: 'We can advance you anywhere between <span class="font-medium">$550 to $500,000</span>in cash, depending on the value of your slip and fall accident claim.',
    listItems:  [
      'Slip and fall accidents.',
      'Broken locks or windows break-in',
      'Gym accidents',
      'Staircase injuries',
      'Escalator injuries',
      'Amusement park injuries',
      'Negligent maintenance injuries',
      'Loose handrails fall injuries',
    ],
    listItems2: [
      'Drowning in a public swimming pool',
      'Dog bite injuries ',
      'Dog bite injuries',
      'Building code violations',
      'Inadequate event security',
      'Escalator accidents',
      'Drowning in a swimming pool',
    ],
    sec_4_title: '',
    sec_4_subtitle: 'If you’re not sure if your case qualifies for legal funding, give us a call to discuss your options. <span class="font-bold">(888) 232-9223</span>',
    sec_5_question_1: 'Can I qualify for legal funding if I don’t have a job?',
    sec_5_answer_1: 'Yes! At Express Legal Funding we don’t even require you to provide us with any of your current or past job histories. We make it easy, so you don’t have to worry—no rising rates—just one low fixed rate from day one. No collateral. No proof of employment. Risk-free. The way legal funding should be!',
    sec_5_question_2: 'Are lawsuit cash advances better than personal injury lawsuit loans?',
    sec_5_answer_2_1: 'Yes! Personal injury lawsuit funding is a superior cash advance option to injury lawsuit loans for injured plaintiffs and attorneys. That’s because injury lawsuit funding is non-recourse in Texas. Meaning unlike a personal injury loan that’s repaid at the end of your case, it’s not dependent on your credit score or legal status.',
    sec_5_answer_2_2: 'Remember, with Express Legal Funding, personal injury lawsuit funding is non-recourse funding. So you can recover from your accident’s injuries, and you can work with your attorney to keep adding value to your case.',
    sec_5_question_3: 'Can I win a larger injury settlement amount by getting a cash advance on my case?',
    sec_5_answer_3_1: 'Yes, you can! Getting a pre-settlement cash advance for your personal injury case can help you, and your lawyer gain a more fair and more large settlement.',
    sec_5_answer_3_2: 'Injury lawsuit funding is there designed to help you financially survive while your attorney continues to fight for justice on your behalf. Plus, you can get even more money from your case now and later by choosing Express Legal Funding and our low and fair rates.',
    sec_5_span: 'Express Legal Funding is a lower cost pre-settlement funding company. We do our best not to misrepresent our financial services and products as pending lawsuit loans or settlement loans near me. Many pre-settlement funding companies choose to represent themselves falsely as “best lawsuit loan companies.” We are not a pending settlement loans company in Texas, enabling us to provide risk-free and non-recourse legal funding to the consumer.',
    sec_6_title: 'Cash relief now.',
    sec_6_btn1: 'Call Now',
    sec_6_btn2: 'Apply Online',
    sec_6_img: '/slip-and-fall-legal-funding.webp',
    registrationForm: {
      title: '3 Simple Steps',
      step_1_subtitle: 'Step 1. Contact us',
      step_1_text: 'Call us at (NUMBER) or apply online and get immediate assistance. ',
      step_2_subtitle: 'Step 2. We Review',
      step_2_text: 'We rapidly review your case after speaking with your attorney.',
      step_3_subtitle: 'Step 3. Get Your Legal Funding',
      step_3_text: 'We deliver funding within 24 hours after approval.',
    },
  });
});

// define a static HTML view route
app.get("/ActAndMaritime", function (req, res) {
  res.render("service", {
    headline: 'Jones Act and Maritime Lawsuit Funding',
    sec_1_img: '/maritime-lawsuit-funding.webp',
    sec_2_title: 'Legal funding for your Jones Act injury claim can ease your financial burden. Unlike a Jones Act lawsuit loan, lawsuit funding is risk-free!',
    sec_2_block_1_paragraph_1: '<span class="font-bold">Jones Act lawsuit funding</span>, which is often incorrectly referred to as “Jones Act lawsuit settlement loans,” can help you pay your bills and make purchases. We know that no matter your unique financial situation, maritime accidents bring additional expenses and lost wages.',
    sec_2_block_1_paragraph_2: ' That’s why we make injured maritime worker funding fast and affordable! So you can get cash relief, and your attorney can keep fighting for your maritime case settlement..',
    sec_2_block_2_paragraph_1: 'Unlike personal injury lawsuit loans, personal injury legal funding isn’t a credit based loan of any type. Meaning we do not consider or need to pull your credit history. So you don’t have to worry about a bad credit score making your interest rates go up.',
    sec_2_block_2_paragraph_2: 'Just like your maritime injury attorney hired on contingency, we don’t get paid unless you win! Call us at (888) 232-9223 or apply online to get financial relief today.',
    sec_3_title: 'Maritime Law Cases We Handle',
    sec_3_paragraph_1: 'We can provide lawsuit funding for all types of personal injury and civil lawsuit cases. If you are reading this right now and seeking money for your injuries and damages that another person or company caused, you are qualified to apply for legal funding on your case anytime.',
    sec_3_paragraph_2: 'You can use any computer or mobile device with internet access to apply for a lawsuit cash advance. Or give us a call 24/7, day or night. The choice is yours!',
    sec_3_paragraph_3: 'We can advance you anywhere between <span class="font-medium">$550 to $500,000</span> in cash depending on the value of your case.',
    listItems:  [
      'Car accidents',
      '18-wheeler accidents',
      'Motorcycle accidents',
      'Pedestrian accident injuries',
      'Bicycle accident injuries',
      'Bus accidents',
      'Wrongful death',
      'Oilfield explosions',
      'Food poisoning'
    ],
    sec_4_title: '',
    sec_4_subtitle: 'If you’re not sure if your case qualifies for legal funding, give us a call to discuss your options. <span class="font-bold">(888) 232-9223</span>',
    sec_5_question_1: 'Can I qualify for legal funding if I don’t have a job?',
    sec_5_answer_1: 'Yes! At Express Legal Funding we don’t even require you to provide us with any of your current or past job histories. We make it easy, so you don’t have to worry—no rising rates—just one low fixed rate from day one. No collateral. No proof of employment. Risk-free. The way legal funding should be!',
    sec_5_question_2: 'Are lawsuit cash advances better than personal injury lawsuit loans?',
    sec_5_answer_2_1: 'Yes! Personal injury lawsuit funding is a superior cash advance option to injury lawsuit loans for injured plaintiffs and attorneys. That’s because injury lawsuit funding is non-recourse in Texas. Meaning unlike a personal injury loan that’s repaid at the end of your case, it’s not dependent on your credit score or legal status.',
    sec_5_answer_2_2: 'Remember, with Express Legal Funding, personal injury lawsuit funding is non-recourse funding. So you can recover from your accident’s injuries, and you can work with your attorney to keep adding value to your case.',
    sec_5_question_3: 'Can I win a larger injury settlement amount by getting a cash advance on my case?',
    sec_5_answer_3_1: 'Yes, you can! Getting a pre-settlement cash advance for your personal injury case can help you, and your lawyer gain a more fair and more large settlement.',
    sec_5_answer_3_2: 'Injury lawsuit funding is there designed to help you financially survive while your attorney continues to fight for justice on your behalf. Plus, you can get even more money from your case now and later by choosing Express Legal Funding and our low and fair rates.',
    sec_5_span: 'Express Legal Funding is a lower cost pre-settlement funding company. We do our best not to misrepresent our financial services and products as pending lawsuit loans or settlement loans near me. Many pre-settlement funding companies choose to represent themselves falsely as “best lawsuit loan companies.” We are not a pending settlement loans company in Texas, enabling us to provide risk-free and non-recourse legal funding to the consumer.',
    sec_6_title: 'Cash relief now.',
    sec_6_btn1: 'Call Now',
    sec_6_btn2: 'Apply Online',
    sec_6_img: '/offshore-oil-rig-injuries.webp',
    registrationForm: {
      title: '3 Simple Steps',
      step_1_subtitle: 'Step 1. Contact us',
      step_1_text: 'Call us at (NUMBER) or apply online and get immediate assistance. ',
      step_2_subtitle: 'Step 2. We Review',
      step_2_text: 'We rapidly review your case after speaking with your attorney.',
      step_3_subtitle: 'Step 3. Get Your Legal Funding',
      step_3_text: 'We deliver funding within 24 hours after approval.',
    },
  });
});



  // define a static HTML view route
app.get("/about", function (req, res) {
  res.render("about");
});

  // define a static HTML view route
  app.get("/forAttorneys", function (req, res) {
    res.render("forAttorneys", {
      listItems:  [
        'Fair and affordable',
        'Low rates',
        'Ethical and transparent',
        'Risk-free for legal funding clients and attorneys',
        'Top-rated service',
        'Client first legal funding company',
      ],

      listItems1:  [
        'Car accidents',
        '18-wheeler accidents',
        'Motorcycle collisions',
        'Injuries from pedestrian accidents',
        'Injuries from bicycle accidents',
        'Bus collisions',
        'Wrongful death',
        'Nursing home abuse',
      ],
      listItems2: [
        'Oilfield explosions',
        'Claims of medical malpractice',
        'Dog bite injuries',
        'Slip-and-fall accidents',
        'Stairway accidents',
        'Escalator accidents',
        'Drowning in a swimming pool',
      ],
      registrationForm: {
        title: '3 Simple Steps',
        step_1_subtitle: 'Step 1. Contact us',
        step_1_text: 'Call us at (NUMBER) or apply online and get immediate assistance. ',
        step_2_subtitle: 'Step 2. We Review',
        step_2_text: 'We rapidly review your case after speaking with your attorney.',
        step_3_subtitle: 'Step 3. Get Your Legal Funding',
        step_3_text: 'We deliver funding within 24 hours after approval.',
      },
    });
  });

  // define a string response route
app.get("/string", function (req, res) {
    res.send("Hello World from Express.js running on Node");
  });

  app.use((req, res) => {
    res.render("404", { pageTitle: "Page Not Found" });
  });