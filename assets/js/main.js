// info: enroll btn js
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("enrollbtn").addEventListener("click", function() {
    window.location.href = "Enroll_form.html";  // Ensure this link works correctly
  });
});

// todo: enroll form js
// Function to generate a unique registration number
function generateRegistrationNumber() {
  const datePrefix = new Date().getFullYear().toString(); // Use current year as prefix
  const randomSuffix = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return `REG-${datePrefix}-${randomSuffix}`;
}

// Function to set the current date for date of admission
function setCurrentDate() {
  const currentDate = new Date().toISOString().split('T')[0];
  document.getElementById('dateOfAdmission').value = currentDate;
}

// Function to toggle document requirements based on qualification selection
function toggleDocumentRequirement() {
  const qualification = document.getElementById('qualification').value;
  const docs10th = document.getElementById('documents10th');
  const docs12th = document.getElementById('documents12th');

  if (qualification === '8') {
    docs10th.style.display = 'none';
    docs12th.style.display = 'none';
  } else if (qualification === '10') {
    docs10th.style.display = 'block';
    docs12th.style.display = 'none';
  } else if (qualification === '12') {
    docs10th.style.display = 'block';
    docs12th.style.display = 'block';
  }
}

// Function to preview the uploaded photo
function previewPhoto() {
  const photoInput = document.getElementById('studentPhoto');
  const photoPreview = document.getElementById('photoPreview');
  const file = photoInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoPreview.src = e.target.result;
      photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// Function to generate the PDF
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Generate registration number and set date of admission
  const registrationNo = generateRegistrationNumber();
  document.getElementById('registrationNo').value = registrationNo;
  setCurrentDate();

  // Form data collection
  const studentName = document.getElementById('studentName').value;
  const fathersName = document.getElementById('fathersName').value;
  const mothersName = document.getElementById('mothersName').value;
  const emailId = document.getElementById('emailId').value;
  const mobileNo = document.getElementById('mobileNo').value;
  const qualification = document.getElementById('qualification').value;
  const gender = document.getElementById('gender').value;
  const permanentAddress = document.getElementById('permanentAddress').value;
  const aadharNo = document.getElementById('aadharNo').value;
  const timeSlot = document.getElementById('timeSlot').value;

  // Add header
  doc.text('PPTECH Computer & Education Center', 10, 10);
  doc.text('Application for Computer', 10, 20);
  doc.text(`Registration No: ${registrationNo}`, 10, 30);
  doc.text(`Date of Admission: ${document.getElementById('dateOfAdmission').value}`, 10, 40);

  // Add form data in a table
  doc.autoTable({
    head: [['Field', 'Details']],
    body: [
      ['Student Name', studentName],
      ["Father's Name", fathersName],
      ["Mother's Name", mothersName],
      ['Email ID', emailId],
      ['Mobile No', mobileNo],
      ['Qualification', qualification],
      ['Gender', gender],
      ['Permanent Address', permanentAddress],
      ['Aadhar Card No', aadharNo],
      ['Preferred Time Slot', timeSlot]
    ],
    startY: 50,
    theme: 'grid'
  });

  // Add declaration
  doc.text('Declaration:', 10, doc.lastAutoTable.finalY + 10);
  doc.text('I hereby declare that the above information is true to the best of my knowledge.', 10, doc.lastAutoTable.finalY + 20);
  doc.text('Date: ' + new Date().toLocaleDateString(), 10, doc.lastAutoTable.finalY + 30);
  doc.text('Signature: ____________________', 10, doc.lastAutoTable.finalY + 40);

  // Function to add image to PDF
  async function addImageToPDF(fileInput, label) {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();
      return new Promise((resolve) => {
        fileReader.onload = function (e) {
          doc.addPage();
          doc.text(label, 10, 10);
          doc.addImage(e.target.result, 'PNG', 10, 20, 180, 180); // Adjust dimensions as needed
          resolve();
        };
        fileReader.readAsDataURL(file);
      });
    }
  }

  // Handle document uploads
  const promises = [];
  const qualificationSelected = document.getElementById('qualification').value;
  if (qualificationSelected === '10') {
    const docs10thInput = document.getElementById('documents10thInput');
    promises.push(addImageToPDF(docs10thInput, 'Uploaded 10th Marksheet:'));
  } else if (qualificationSelected === '12') {
    const docs10thInput = document.getElementById('documents10thInput');
    const docs12thInput = document.getElementById('documents12thInput');
    promises.push(addImageToPDF(docs10thInput, 'Uploaded 10th Marksheet:'));
    promises.push(addImageToPDF(docs12thInput, 'Uploaded 12th Marksheet:'));
  }

  // Wait for all images to be added before saving the PDF
  await Promise.all(promises);
  doc.save('Admission_Form.pdf');
}

// Initialize the current date on page load
window.onload = function() {
  setCurrentDate();
};




(function() {
  "use strict";


// note: Apply .scrolled class to the body as the page is scrolled down

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  //note: Mobile nav toggle
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

// note: Hide mobile nav on same-page/hash links
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

// info: Toggle mobile nav dropdowns
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

// info: Toggle mobile nav dropdowns
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

// info: Scroll top button
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

// info: Animation on scroll function and init
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

// note: Initiate glightbox
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

// note: Initiate Pure Counter
  new PureCounter();

//info: Init swiper sliders
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();
// todo: course details
//info: Course data object with details for each course
const courses = {
  diplomacourse1: {
    detail: 'Learn PHP and MySQL in-depth with our diploma course. Learn database administration and web development to create reliable, dynamic websites and applications.',
    title: 'DIPLOMA IN PHP AND MYSQL',
    description: 'Enrol in our PHP and MySQL Diploma programme to acquire thorough knowledge of database administration and web development. Database design, integration, and advanced programming techniques are covered in this course. You will have the skills necessary to develop dynamic, reliable websites and applications by the end, setting yourself up for success in the tech sector.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse2: {
    detail : 'With our diploma programme, you can acquire useful computer application abilities. To improve your computer skills and employment prospects, learn the fundamentals of IT, office supplies, and necessary applications.',
    title: 'Diploma in Computer Application',
    description: 'Enrol in our Diploma in Computer Application programme to gain hands-on experience with necessary office tools and software. The basics of IT, including word processing, spreadsheets, and presentations, are covered in this course. Through the development of your technical skills and computer literacy, this course prepares you for a wide range of occupations.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '4/ 6/ 12 Months',
  },
  diplomacourse3: {
    detail : '"Take advantage of our Advanced Diploma in Computer Application to learn sophisticated Excel techniques. Develop your management, visualisation, and data analysis abilities for career success.',
    title: 'Advance Diploma in Computer Application - MS Excel',
    description: 'With our Advanced Diploma in Computer Application, which focusses on Microsoft Excel, you can improve your computer skills. Advanced Excel skills, such as intricate formulae, data analysis, and visualisation, are covered in this course. You will discover how to efficiently handle and work with big information, produce complex reports, and make use of Excel robust features to streamline corporate procedures. You will be able to use Excel to handle practical problems by the end of the course, which will improve your chances of landing a job in a variety of industries, including project management, data analysis, and finance.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse4: {
    detail : 'Enhance your accounting and financial management skills with our Advanced Diploma in Computer Application specializing in Tally. This course provides in-depth training on Tally software, covering everything from basic accounting principles to advanced features such as inventory management, GST, payroll, and more. You will learn how to efficiently manage business finances, prepare accurate reports, and use Tally powerful tools to optimize financial processes. By the end of the course, you will be adept at using Tally for various business applications, making you a valuable asset in any accounting or finance role.',
    title: 'Advance Diploma in Computer Application - Tally',
    description: 'With our Advanced Diploma in Computer Application with a Tally concentration, you may improve your accounting and financial management abilities. This course offers comprehensive instruction on Tally software, covering everything from fundamental accounting concepts to more complex functions like payroll, GST, inventory management, and more. You will discover how to effectively handle company funds, create precise reports, and maximise financial procedures with Tally robust features. You will be proficient in using Tally for a variety of business applications at the end of the course, which will make you an invaluable asset in any position involving accounting or finance.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse5: {
    detail : 'Become proficient in graphic design by completing our Advanced Diploma programme. Learn software and design ideas to produce eye-catching images for a variety of media.zcx',
    title: 'Advance Diploma in Computer Application - Graphic Design',
    description: 'With our Advanced Diploma in Computer Application, with a focus on Graphic Design, you may unleash your creative potential. Design principles, typography, colour theory, and the use of industry-standard programmes like Adobe Photoshop, Illustrator, and InDesign are all covered in detail in this course. You will discover how to produce eye-catching visuals for print, digital, and web media. You will graduate from the course with the ability to create designs of professional calibre, which will make you an invaluable asset in the marketing, advertising, and digital content development industries.',
    trainer: 'Lavanya',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse6: {
    detail : 'Use our Advanced Diploma to become an expert in web design. Create responsive, user-friendly websites by learning HTML, CSS, JavaScript, and design concepts.',
    title: 'Web Design',
    description: 'Take advantage of our Advanced Diploma in Computer Application to become an expert in web design. This course teaches you how to construct beautiful, user-friendly websites using HTML, CSS, JavaScript, and design principles. You will gain knowledge about creating visually beautiful, accessible, and responsive web pages that function flawlessly on a variety of devices. You will be prepared to start a lucrative career in web design by the end of the course, having gained proficiency with web development tools and methodologies.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '12 Months',
  },
  diplomacourse7: {
    detail : 'With the help of our specialised training programme, you ready to become an efficient computer teacher. To effectively teach computer programs, acquire technical skills, curriculum design, and pedagogical techniques.',
    title: 'Computer Teacher Training',
    description: 'With the help of our specialised training programme, you ready to become an efficient computer teacher. To effectively teach computer programs, acquire technical skills, curriculum design, and pedagogical techniques.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse8: {
    detail : 'Take our course to become an expert in office automation. To increase productivity when performing administrative activities, learn how to use Google Workspace, Microsoft Office, and productivity applications.',
    title: 'Office Automation',
    description: 'Learn office automation with our in-depth course. Acquire knowledge of key tools including Google Workspace, Microsoft Office, and other productivity apps. To increase workplace productivity, learn how to create documents, manage spreadsheets, make presentations, and handle data. You will become a valued asset in any company by completing this course, which prepares you for roles that involve skilled use of office software and administrative responsibilities.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse9: {
    detail : 'To improve your technical competency and efficiency in work environments, acquire hands-on experience with key software programmes, such as word processors, spreadsheets, and databases.',
    title: 'Software Application',
    description: 'With our extensive course, you can become an expert in software applications. Acquire proficiency with key software tools, such as database management systems, spreadsheets, and word processors. This course prepares you to succeed in positions requiring a high level of technical ability by covering the practical skills required for effective software use in a variety of professional settings.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse10: {
    detail : 'Take this course to become an expert in desktop publishing. Discover how to use programmes like Adobe InDesign and QuarkXPress to produce documents, brochures, and newsletters of expert quality.',
    title: 'Desktop Publishing',
    description: 'Take advantage of our extensive training to become an expert in desktop publishing. Learn how to use industry-standard programmes like Adobe InDesign and QuarkXPress to produce papers, brochures, and newsletters of expert quality. Develop your typographic, image editing, and layout design abilities to create publications that are visually appealing. This course improves your ability to produce polished, print-ready projects and prepares you for careers in publishing, marketing, and graphic design.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse11: {
    detail : 'With our Advanced Diploma, you can learn everything there is to know about computer programming and applications. Acquire the necessary programming languages, software tools, and practical skills for an IT job.',
    title: 'Advance Diploma In Computer Applications And Programming',
    description: 'With our Advanced Diploma, you can acquire broad programming and computer application skills. In order to prepare you for a prosperous and exciting career in the information technology industry, this course covers fundamental software tools, several programming languages, and useful approaches.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse12: {
    detail : 'With our Diploma in Information Technology, you may acquire critical IT skills. This course prepares you for a successful tech profession by covering the principles of cybersecurity, network administration, and software applications.',
    title: 'Diploma in Information Technology',
    description: 'Obtain the necessary IT skills by enrolling in our Diploma in Information Technology programme. You will get practical knowledge and competence in software applications, network administration, and cybersecurity essentials from this course. Get ready for a lucrative career in the quickly changing technology sector.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse13: {
    detail : 'Learn to design in 2D and 3D with our AutoCAD course. Develop your draughting and design skills by learning the necessary commands, tools, and methods to produce intricate drawings and models.',
    title: '2D & 3D Autocad',
    description: 'With our extensive AutoCAD course, you may become an expert in both 2D and 3D design. Learn the fundamental instructions, equipment, and methods needed to produce intricate engineering and architectural drawings. Develop your modelling, draughting, and visualisation abilities to succeed professionally in the design and engineering industries.',
    trainer: 'Lavanya',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse14: {
    detail : 'Learn the fundamentals of accounting and computer programs to set yourself up for success in both domains.',
    title: 'Computer Application and Accounting (DCAA)',
    description: 'Our Diploma in Computer Application and Accounting (DCAA) will give you the fundamental computer skills and accounting knowledge you need. In order to prepare you for a prosperous future in accounting and IT, this course covers software applications, financial accounting, and useful strategies.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse15: {
    detail : 'Master Tally.GST and ERP 9 with our all-inclusive course. To succeed in accounting and taxation positions, master fundamental accounting and taxes skills such as business formation, voucher kinds, and GST compliance.',
    title: 'Diploma in Tally.ERP 9 Advance with GST',
    description: 'Master Tally.GST and ERP 9 with our all-inclusive course. Study advanced accounting methods, GST compliance, firm formation, and voucher types. Give yourself the tools you need for lucrative jobs in finance and accounting, with a focus on taxation and Tally.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse16: {
    detail : 'Learn to write effective, useful programmes for a variety of software applications by becoming proficient in Python, Java, and C++.',
    title: 'Programming',
    description: 'With our extensive course, learn the fundamental programming languages and methods. Develop your problem-solving abilities and learn to code in languages like Python, Java, and C++ to produce effective, useful programmes for a range of uses.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse17: {
    detail : 'Take this course to become an expert in graphic design. Learn how to use Adobe Photoshop, Illustrator, and InDesign to produce eye-catching designs. Gain expertise in digital illustration, typography, and layout.',
    title: 'Graphic Design',
    description: 'Use our extensive course to become an expert in graphic design. Learn how to use Adobe Photoshop, Illustrator, and InDesign to produce eye-catching designs. Gain expertise in digital illustration, layout, typography, and branding. With its practical competence and robust portfolio, this study prepares you for a prosperous career in the creative business.',
    trainer: 'Lavanya',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse18: {
    detail : 'Using software, learn the fundamentals of accounting and finance to get ready for a lucrative career in these fields.',
    title: 'Computer Professional Accountant (DCPA)',
    description: 'With our Diploma in Computer Professional Accountant (DCPA), you may learn critical accounting and financial management skills. Develop your financial management skills, learn how to use sophisticated accounting software, and get ready for a lucrative career in the finance and accounting sector.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse19: {
    detail : 'To succeed in graphic design, learn how to produce polished papers and designs using industry-standard tools.',
    title: 'DTP And Graphic Designing (DDGD)',
    description: 'With our extensive Diploma in Desktop Publishing and Graphic Designing (DDGD) course, you may become an expert in desktop publishing and graphic design. Discover how to use industry-standard tools to produce documents, brochures, and visual designs of expert quality. Gain expertise in digital illustration, typography, and layout design for a prosperous career in the creative sector.',
    trainer: 'Lavanya',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse20: {
    detail : 'Learn how to manage funds, use software for financial accounting, and get ready for a lucrative accounting profession.',
    title: 'Financial Accounting (DFA)',
    description: 'With our Diploma in Financial Accounting (DFA), you may learn all about financial accounting. Learn how to handle money, use accounting software, and comprehend important financial concepts. Get ready for a lucrative career in finance and accounting.',
    trainer: 'Mamta Mehta',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse21: {
    detail : 'To pursue a career in database administration and management, become proficient in Oracle database design, SQL, and PL/SQL.',
    title: 'Diploma in Oracle',
    description: 'With our Oracle Diploma, you may become an expert in Oracle database administration. The fundamentals of database design, SQL, and PL/SQL programming are covered in this course. Learn useful techniques for backup recovery, performance tweaking, and database administration. Learn how to use Oracle robust tools and technologies to get ready for a lucrative career in database administration.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse22: {
    detail : 'For a successful marketing profession, learn digital tools and platforms for branding and digital marketing techniques.',
    title: 'Branding And Digital Marketing',
    description: 'Take advantage of our extensive course to become an expert in digital marketing and branding. Discover how to build and run profitable companies, formulate winning marketing plans, and use digital tools and platforms to connect with your target market. Get ready for a lucrative career in the rapidly evolving field of digital marketing.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  diplomacourse23: {
    detail : '"Learn nursery teacher training, covering child development, teaching methods, and classroom management for effective early childhood education.',
    title: 'Nursery Teacher Training',
    description: 'Learn nursery teacher training, covering child development, teaching methods, and classroom management. Develop skills to create engaging and educational activities through practical exercises and hands-on experience. Prepare for a successful career in early childhood education with comprehensive training in the essential techniques and principles of nursery teaching.',
    trainer: 'Mamta Mehta',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  //note: Add more courses as needed...
  certificatecourse1: {
    detail : 'Learn essential desktop publishing skills to create professional documents and designs using industry-standard software.',
    title: 'Basic Desktop Publishing (DTP)',
    description: 'Learn essential desktop publishing skills to create professional documents and designs using industry-standard software. Gain expertise in layout, typography, and image editing. Prepare for a career in desktop publishing and graphic design with hands-on experience in creating high-quality publications and marketing materials.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse2: {
    detail : 'Master MS Office and internet skills for professional tasks, including word processing, spreadsheets, presentations, and online communication.',
    title: 'MS Office with Internet',
    description: 'Learn how to use the internet and Microsoft Office for work-related tasks. Learn how to communicate online, use word processing, spreadsheets, and presentations. Gain proficiency with Microsoft Word, Excel, and PowerPoint as well as efficient internet usage for communication and research. Develop the necessary office skills to set yourself up for career success.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3/6 Months',
  },
  certificatecourse3: {
    detail : 'Learn how to use Tally ERP 9\s sophisticated features for effective inventory control, accounting, and GST compliance. Develop your financial literacy.',
    title: 'Tally ERP. 9 Advance',
    description: 'Master Tally ERP 9\s advanced tools for efficient inventory management, precise accounting, and seamless GST compliance. Enhance your financial skills and literacy with this comprehensive software, empowering you to streamline operations, ensure regulatory adherence, and optimize your business’s financial health. Your pathway to financial excellence starts here!',
    trainer: 'Mamta Mehta',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse4: {
    detail : '"Master computer-based English typing skills for professional tasks. Enhance typing speed, accuracy, and proficiency with practice and software.',
    title: 'Computer based English Typing',
    description: 'Learn how to type English on a computer for work-related tasks. Improve your typing accuracy, speed, and skill with a lot of practice and software. This course helps you increase your efficiency and communication skills while preparing you for effective typing in a variety of professional settings.',
    trainer: 'Harshita Devlal',
    fee: '₹600',
    duration: '3 /6 /12 Months',
  },
  certificatecourse5: {
    detail : 'Learn essential computer fundamentals, including hardware, software, operating systems, and basic troubleshooting, to build a strong IT foundation.',
    title: 'Computer Fundamental',
    description: 'Learn the essentials of computers, including operating systems, hardware, software, and basic troubleshooting. Gain a solid foundation in IT through both academic and practical exercises. Develop a thorough understanding of computer systems and their applications to set yourself up for success in the IT industry.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse6: {
    detail : 'Learn C++ programming for software development, covering everything from the fundamentals to more complex subjects including object-oriented programming, data structures, and algorithms.',
    title: 'C++',
    description: 'Learn C++ programming, from the fundamentals to more complex subjects including data structures, algorithms, and object-oriented programming. Gain useful skills for software development by working on real-world projects and practicing code. Gain a thorough understanding of C++ to set yourself up for success in the software engineering field.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse7: {
    detail : 'For a solid coding foundation, learn the fundamentals of C programming, such as grammar, data types, functions, and control structures.',
    title: 'C Programming',
    description: 'Learn C programming, from the basics to more complex ideas. Recognise memory management, control structures, functions, data types, and grammar. Through projects and exercises, get hands-on experience with coding. With a solid foundation in C programming, you can become ready for a lucrative career in software development.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse8: {
    detail : 'To create contemporary, mobile-friendly websites, learn about Bootstrap, which covers responsive web design, the grid system, components, and utilities.',
    title: 'Bootstrap',
    description: 'Learn about the grid system, components, responsive web design, and utilities of Bootstrap. Learn how to easily develop modern, mobile-friendly websites. Through projects and practical exercises, acquire real-world experience. Learn all about the amazing capabilities of Bootstrap to get ready for a lucrative career in web development.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse9: {
    detail : 'Learn the fundamentals of web technology, such as HTML, CSS, JavaScript, and web development tools, to create dynamic and interactive websites.',
    title: 'Web Technology',
    description: 'Learn the fundamentals of web development tools, HTML, CSS, and JavaScript. Learn how to make dynamic, interactive websites. Get real-world experience by working on practical projects and activities. Gain a thorough understanding of contemporary web technologies to position yourself for success in the web development industry.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse10: {
    detail : 'For effective data organisation and manipulation, become familiar with data structures such as arrays, linked lists, stacks, queues, trees, and graphs.',
    title: 'Data Structure',
    description: 'Learn about data structures such as trees, graphs, stacks, queues, arrays, linked lists, and stacks. Gain expertise in effectively organising and manipulating data. Get real-world experience by working on practical projects and activities. Gaining a solid grasp of data structures can help you prepare for a lucrative career in software development.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse11: {
    detail : 'Master advanced Java topics, including concurrency, networking, GUI development, and frameworks like Spring, for efficient and scalable applications.',
    title: 'Java Advance',
    description: 'Learn about advanced Java subjects such as GUI development, networking, concurrency, and frameworks like Spring. Learn how to create scalable, effective applications. Through projects and practical exercises, acquire real-world experience. Gain a thorough understanding of sophisticated Java topics to set yourself up for success in the software development industry.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse12: {
    detail : 'Learn C# and .NET for robust application development, covering object-oriented programming, frameworks, and industry best practices.',
    title: 'C# & .Net',
    description: 'Learn C# and .NET for robust application development, covering object-oriented programming, frameworks, and industry best practices. Develop skills to create scalable, efficient applications through practical projects and hands-on exercises. Prepare for a successful career in software development with comprehensive knowledge of C# and .NET technologies.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse13: {
    detail : 'Learn AutoCAD for accurate design and draughting, including tools, industry standards, and 2D and 3D modelling.',
    title: 'Autocad',
    description: 'Learn AutoCAD for accurate design and draughting, including tools, industry standards, and 2D and 3D modelling. Through real-world projects and hands-on activities, hone your ability to produce intricate engineering drawings and designs. Gain a thorough understanding of AutoCAD to set yourself up for success in a profession in engineering, architecture, or design.',
    trainer: 'Lavanya',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse14: {
    detail : '"Master data entry skills for accurate and efficient handling of information, including typing, data management, and software use.',
    title: 'Data Entry',
    description: 'Learn data entry techniques, such as typing, data management, and software use, for precise and effective information handling. Gain speed and accuracy with hands-on activities and real-world situations. With thorough instruction in fundamental data entry methods, you can get ready for a future in administrative and data management positions.',
    trainer: 'Kushi Vishwakarma',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse15: {
    detail : 'Gain proficiency with sophisticated Excel features, such as pivot tables, data analysis, macros, and complex calculations, for effective data management.',
    title: 'Advance Excel',
    description: 'Learn how to use pivot tables, data analysis, macros, and sophisticated calculations in Excel. Learn how to handle big datasets, automate processes, and provide informative reports. Get real-world experience through practical exercises and projects. Complete Excel training will set you up for success in a profession in data management and analysis.',
    trainer: 'Mamta Mehta',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse16: {
    detail : 'For efficient use in a variety of professional contexts, become proficient with word processing, spreadsheets, presentations, and databases.',
    title: 'Computer Applications',
    description: 'Discover the fundamentals of word processing, spreadsheets, databases, and presentations. Gain proficiency with Google Workspace, Microsoft Office, and other programmes. Get real-world experience through practical exercises and projects. Comprehensive training in the most widely used computer software will help you get ready for a prosperous career.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse17: {
    detail : 'For effective financial operations, Master TALLY ERP 9.0 with GST covers accounting, inventory control, and GST compliance.',
    title: 'TALLY ERP 9.0 with GST',
    description: 'Accounting, inventory control, and GST compliance are all covered in Master TALLY ERP 9.0 with GST. Gain expertise in effectively managing financial transactions, producing reports, and guaranteeing GST compliance. Get real-world experience by working on practical projects and activities. With thorough TALLY ERP 9.0 training, you can get ready for a lucrative career in accounting and finance.',
    trainer: 'Mamta Mehta',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse18: {
    detail : 'Learn AngularJS for dynamic web applications, covering directives, services, controllers, and dependency injection for efficient development.',
    title: 'Angular JS',
    description: 'Learn about directives, services, controllers, and dependency injection in AngularJS for dynamic web applications. Gain the ability to create scalable, maintainable, and effective web apps through real-world projects and practical exercises. Gain thorough understanding of AngularJS and its potent features to set yourself up for a prosperous career in web development.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse19: {
    detail : 'Learn JavaScript for interactive web development, covering functions, events, DOM manipulation, and AJAX for dynamic user experiences.',
    title: 'JavaScript',
    description: 'Learn JavaScript to create interactive websites by studying functions, events, AJAX, and DOM manipulation. Through real-world projects and practical exercises, hone your ability to design dynamic and adaptable user experiences. Develop a thorough understanding of JavaScript and its potent features to set yourself up for success in the web development industry.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse20: {
    detail : 'Learn Object-Oriented Programming (OOP) using C++, covering classes, objects, inheritance, polymorphism, and encapsulation for efficient software design.',
    title: 'OOP\s Using C++',
    description: 'Learn Object-Oriented Programming (OOP) using C++, covering classes, objects, inheritance, polymorphism, and encapsulation. Develop skills to design efficient, scalable software through practical projects and hands-on exercises. Prepare for a successful career in software development with comprehensive knowledge of OOP principles and their implementation in C++.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse21: {
    detail : 'For effective computer operation, learn the basics of operating systems, such as file systems, memory management, process management, and security.',
    title: 'Operating System',
    description: 'Learn operating system fundamentals, including process management, memory management, file systems, and security. Develop skills to understand and troubleshoot operating systems through practical exercises and hands-on projects. Prepare for a successful career in IT with comprehensive knowledge of operating system concepts and functionalities.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse22: {
    detail : 'Learn essential skill development techniques, including communication, teamwork, problem-solving, and critical thinking for personal and professional growth.',
    title: 'Skill Development',
    description: 'Develop your communication, teamwork, problem-solving, and critical thinking skills, among other vital abilities. Through hands-on activities and real-world situations, cultivate the skills necessary to adapt and succeed in a variety of professional settings. Get thorough instruction in the essential skills required for both professional and personal development to set yourself up for career success.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse23: {
    detail : 'Learn web technology and multimedia, covering HTML, CSS, JavaScript, multimedia tools, and techniques for dynamic web content.',
    title: 'Web Technology & Multimedia',
    description: 'Learn web technology and multimedia, covering HTML, CSS, JavaScript, and multimedia tools. Develop skills to create dynamic web content, including interactive elements and multimedia integration. Gain practical experience through hands-on projects and exercises. Prepare for a successful career in web development with comprehensive knowledge of modern web technologies and multimedia techniques.',
    trainer: 'Manish Kumar',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse24: {
    detail : 'Learn about arrays, linked lists, stacks, queues, trees, sorting, and finding effective solutions as you study data structures and algorithms.',
    title: 'Data Structure and Algorithms',
    description: 'Learn about arrays, linked lists, stacks, queues, trees, sorting, and searching as well as other data structures and algorithms. Gain expertise in effective optimisation and problem-solving through real-world projects and practical exercises. Gain a thorough understanding of data structures and algorithms to set yourself up for success in the software development industry.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse25: {
    detail : 'For effective data storage and retrieval, understand the foundations of database management systems (DBMS), such as database design, SQL, normalisation, and transactions.',
    title: 'Data Base Management System (DBMS)',
    description: 'Study the foundations of database management systems, such as transactions, normalisation, SQL, and database design. Gain expertise in effectively managing, storing, and retrieving data through real-world projects and practical activities. Gain a thorough understanding of Database Management Systems (DBMS) to set yourself up for success in database administration and management.',
    trainer: 'Kunal Bisht',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse26: {
    detail : 'Discover how to type in Hindi, including the Devanagari script, typing strategies, and software tools for precise and productive text entry.',
    title: 'Hindi Typing',
    description: 'Learn Hindi typing, including Devanagari script, typing techniques, and software tools. Develop skills to type efficiently and accurately in Hindi through practical exercises and real-world scenarios. Prepare for a successful career or personal use with comprehensive training in Hindi typing and related tools.',
    trainer: 'Harshita Devlal',
    fee: '₹600',
    duration: '3 /6 /12 Months',
  },
  certificatecourse27: {
    detail : 'Learn how to produce and improve digital photographs using Photoshop\s layers, tools, and techniques.',
    title: 'Photoshop',
    description: 'Learn how to alter images using Photoshop\s tools, layers, and strategies. Learn how to produce and improve digital photos through real-world projects and practical activities. master graphic design, compositing, and retouching. Learn all about Photoshop\s strong features to get ready for a successful career in digital media.',
    trainer: 'Lavanya',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse28: {
    detail : 'To create documents, manage data, and communicate effectively, learn Microsoft Office, which includes Word, Excel, PowerPoint, and Outlook.',
    title: 'MS Office',
    description: 'Learn MS Office, including Word, Excel, PowerPoint, and Outlook. Develop skills for efficient document creation, data management, and communication. Gain practical experience through hands-on projects and exercises. Prepare for a successful career in various professional fields with comprehensive knowledge of Microsoft Office applications and their powerful features.',
    trainer: 'Harshita Devlal',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse29: {
    detail : 'Learn the fundamentals of graphic design, including typography, colour theory, tools, and software such as Adobe Illustrator for imaginative visual communication.',
    title: 'Graphic Design',
    description: 'Study graphic design concepts, techniques, colour theory, typography, and software such as Adobe Illustrator. Through real-world projects and practical exercises, hone your ability to produce visually captivating material. Learn digital media, branding, and marketing design strategies. With thorough instruction, you can get ready for a lucrative career in graphic design.',
    trainer: 'Lavanya',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  certificatecourse30: {
    detail : 'Learn video editing, covering tools, techniques, effects, and software like Adobe Premiere Pro for creating engaging visual content.',
    title: 'Video Editing',
    description: 'Learn video editing, covering tools, techniques, effects, and software like Adobe Premiere Pro. Develop skills to create engaging visual content through practical projects and hands-on exercises. Master editing techniques for storytelling, transitions, and special effects. Prepare for a successful career in digital media with comprehensive video editing training.',
    trainer: 'Amit Pathak',
    fee: '₹1000',
    duration: '3 /6 /12 Months',
  },
  // note: load more if needed

  // info: popular computer courses
  popularcourse01: {
    detail : 'This foundational computer course, created for a computer education centre, is ideal for novices looking to improve their digital literacy because it covers key concepts in word processing, spreadsheets, email, internet navigation, and basic troubleshooting.',
    title: 'Basic Computer Course',
    description: 'This extensive introductory computer course at our computer education centre covers key competencies like word processing, spreadsheet management, email usage, internet navigation, and basic troubleshooting. This course is perfect for beginners since it gives them the basic digital literacy they need to undertake daily computer chores with confidence and advance their technology skills.',
    trainer: 'Prakash Kumar',
    fee: '₹600 / Month',
    duration: '3/6/12 Months',
  },
    popularcourse02: {
    detail : 'Programming, database administration, networking, cybersecurity, and advanced software skills for career advancement are all covered in the advanced computer course.',
    title: 'Advance Computer Course',
    description: 'Our computer education centre offers an advanced computer course that explores advanced software abilities, database administration, networking, cybersecurity, and programming languages. This course, which is intended for professionals looking to improve their technical expertise, guarantees thorough information and practical experience, preparing students for challenging and high-level IT tasks.',
    trainer: 'Prakash Kumar',
    fee: '₹1000 / Month',
    duration: '3/6/12 Months',
  },
    popularcourse03: {
    detail : 'Web development, UI/UX design, graphic design principles, and advanced design software abilities are all covered in the Web & Graphic Designing course.',
    title: 'Web & Graphic Designing',
    description: 'Web programming, UI/UX design, and fundamental graphic design concepts are all covered in our Web & Graphic Designing course, which is intended for budding designers. By mastering industry-standard programmes like Adobe Creative Suite, students will acquire the abilities necessary to produce visually appealing, intuitive websites and captivating digital graphics.',
    trainer: 'Prakash Kumar',
    fee: '₹1000 / Month',
    duration: '3 /6 /12 Months',
  },
};

//info: Function to load the course details based on the `courseId` from URL
function loadCourseData() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('courseId'); //note: Get courseId from the URL

  //info: Retrieve course data using the `courseId`
  const course = courses[courseId];

  if (course) {
    //info: Populate course details on the page
    document.getElementById('course-Details').textContent = course.detail;  // Fill course description with detail
    document.getElementById('course-title').textContent = course.title;      // Fill course title
    document.getElementById('course-description').textContent = course.description; // Fill course detailed description
    document.getElementById('course-trainer').textContent = course.trainer;  // Fill course trainer
    document.getElementById('course-fee').textContent = course.fee;          // Fill course fee
  } else {
    //info: If the course is not found, display an error message
    document.getElementById('course-title').textContent = "Course not found";
    document.getElementById('course-description').textContent = "Sorry, the course you are looking for does not exist.";
    document.getElementById('course-trainer').textContent = "";
    document.getElementById('course-fee').textContent = "";
    document.getElementById('course-Details').textContent = ""; // Reset the introductory description
  }
}

//note: Call the function when the page loads
window.onload = loadCourseData;


// note: gallery js

let gallery = document.querySelector('#gallery');
let getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
let getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
let resizeAll = function () {
    let altura = getVal(gallery, 'grid-auto-rows');
    let gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        let el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};
gallery.querySelectorAll('img').forEach(function (item) {
    item.classList.add('byebye');
    if (item.complete) {
        console.log(item.src);
    }
    else {
        item.addEventListener('load', function () {
            let altura = getVal(gallery, 'grid-auto-rows');
            let gap = getVal(gallery, 'grid-row-gap');
            let gitem = item.parentElement.parentElement;
            gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            item.classList.remove('byebye');
        });
    }
});
window.addEventListener('resize', resizeAll);
gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {        
        item.classList.toggle('full');        
    });
});

// note: gallery video


;(function($) {

  let pluginName	= 'vidGallery',
      dataKey 	= 'plugin_' + pluginName,
      defaults	= {
          galleryMainClass:	'gallery-main',
          galleryItemsClass:	'gallery-items',
          galleryItemClass:	'gallery-item',
          galleryTitleText: 	'Related Videos',
          // Valid sizes: default (default), medium (mqdefault),
          // high (hqdefault), standard (sqdefault), max (maxresdefault)
          thumbSize: 			'default'
      };

  function Plugin (element, options) {

      this.element 	= element;
      this.$element 	= $(element);
      this.options 	= $.extend({}, defaults, options);

      this._defaults = defaults;
      this._name = pluginName;

      this.init(options);

  }

  Plugin.prototype = {

      init: function () {

          this._getVideos();
          this._getMainVid();
          this._getEvents();

          return this;

      },
      _getVideos: function () {

          let self			= this,
              thumbSize 		= self.options.thumbSize;

          videoList = [];

          switch ( thumbSize ) {

              case 'default':
                  thumbSize = 'mqdefault.jpg';
                  break;
              case 'mqdefault':
              case 'medium':
                  thumbSize = 'mqdefault.jpg';
                  break;
              case 'hqdefault':
              case 'high':
                  thumbSize = 'hqdefault.jpg';
                  break;
              case 'sddefault':
              case 'standard':
                  thumbSize = 'sddefault.jpg';
                  break;
              case 'maxresdefault':
              case 'max':
                  thumbSize = 'maxresdefault.jpg';
                  break;
              default:
                  throw new Error( '`' + self.options.thumbSize + '`' + ' is not a valid thumbnail size. Valid sizes: default (default), medium (mqdefault), high (hqdefault), standard (sqdefault), max (maxresdefault)');

          }

          $('.' + self.options.galleryItemClass).each(function (index) {

              let $vidLink = $(this).find('a'),
                  listItem = [],
                  text = $(this).data('type') === 'youtube' ? 'v=' : 'video/';

              videoList.push({
                  reference: this,
                  videoId: $vidLink.attr('href').split(text)[1],
                  vidDesc: $vidLink.text(),
                  type: $(this).data('type')
              });
              let thumbnailUrl = '';
              if (text === 'v=') {
                  thumbnailUrl = 'http://i.ytimg.com/vi/' + videoList[index].videoId + '/' + thumbSize;
              } else {
                  $.getJSON('https://vimeo.com/api/v2/video/' + videoList[index].videoId + '.json', function(data) {
                      $('img#' + videoList[index].videoId).attr('src', data[0].thumbnail_medium);
                  });
              }
              $vidLink.html('');

              listItem 	+= '<div class=\"media media-left\">';
              listItem 	+= 		'<div class=\"media-img gallery-item-thumb\">';
              listItem 	+=			'<img id="'+videoList[index].videoId+'" src=\"' + thumbnailUrl + '"/>';
              listItem	+= 		'</div>';
              listItem	+= 		'<div class=\"media-body gallery-item-desc\">';
              listItem	+= 			videoList[index].vidDesc;
              listItem	+= 		'</div>';
              listItem	+= 	'</div>';

              console.log(listItem);

              $vidLink.append(listItem);

          });

      },
      _getMainVid: function () {

          let self 		= this,
              mainVid		= [],
              url = videoList[0].type === 'youtube'
                  ? 'www.youtube.com/embed/' + videoList[0].videoId + '?rel=0'
                  : 'player.vimeo.com/video/' + videoList[0].videoId;

          mainVid 	+= '<div class=\"' + self.options.galleryMainClass + '\">';
          mainVid 	+= 		'<div class=\"flex-media\">';
          mainVid 	+= 			'<iframe src=\"https://' + url + '\" seamless>';
          mainVid		+= 		'</div>';
          mainVid 	+= '</div>';

          $('.gallery').prepend(mainVid);
          $('.' + self.options.galleryItemClass).eq(0).addClass('active');

      },
      _getEvents: function () {

          let self = this;

          $('.' + self.options.galleryItemClass).on('click', function (e) {

              e.preventDefault();

              let $iframe			= $('.' + self.options.galleryMainClass).find('iframe'),
                  currentIndex	= $(this).index(),
                  newSrc = videoList[currentIndex].type === 'youtube'
                      ? 'https://www.youtube.com/embed/' + videoList[currentIndex].videoId + '?rel=0'
                      : 'https://player.vimeo.com/video/' + videoList[currentIndex].videoId;


              if ( !$(this).hasClass('active') ) {

                  $(this).siblings().removeClass('active');
                  $(this).addClass('active');
                  $iframe.attr('src', newSrc);

              }

          });

      }
  };

  $.fn[pluginName] = function (options) {

      let plugin = this.data(dataKey);

      if ( plugin instanceof Plugin ) {
          if (typeof options !== 'undefined') {
              plugin.init(options);
          }
      } else{
          plugin = new Plugin(this, options);
          this.data(dataKey, plugin);
      }

      return plugin;

  };

})(jQuery);


$(function() {

  $('.gallery').vidGallery();

  $('.vid-popup').magnificPopup({
      type: 'inline',
      preloader: false,
      showCloseBtn: true,
      mainClass: 'mfp-active',
      removalDelay: 300
  });

});

// info: opening hours js

(function () {
  let dt = new Date(),
    day = dt.getDay(),
    table = document.getElementsByClassName("oh-table"),
    tr = table[0].getElementsByTagName("TR"),
    hours = document.querySelectorAll(".oh-table tr td:nth-child(2)"),
    todayHour = hours[day === 0 ? 6 : day - 1].textContent.toLowerCase(), // Sunday fix
    displayElement = document.getElementById("dataDisplay"), // Target specific element
    minToday = minutesOfDay(dt),
    open = false;

  // Highlight Today
  if (day === 0) {
    tr[6].style.color = 'rgb(196, 58, 80)'; // Sunday
  } else {
    tr[day - 1].style.color = 'rgb(196, 58, 80)';
  }

  // Position
  for (let i = 0; i < day - 1; i++) {
    table[0].appendChild(tr[0]);
  }

  if (todayHour === "closed") open = false;
  else {
    let tHs = todayHour.split(', '); // Split multiple time slots
    for (let slot of tHs) {
      let [start, end] = slot.split(' - ');
      let minStart = minutesOfDay(parseTime(start));
      let minEnd = minutesOfDay(parseTime(end));

      if (minStart <= minToday && minToday <= minEnd) {
        open = true;
        break; // No need to check further if open
      }
    }
  }

  // Update status in the display element
  if (open) {
    displayElement.innerText = "⊙ The store is OPEN!";
  } else {
    displayElement.innerText = "⊙ The store is CLOSED!";
  }

  // Convert time string (e.g., "7:00 AM") to Date object
  function parseTime(timeStr) {
    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === "pm" && hours < 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;
    return new Date(1970, 0, 1, hours, minutes, 0);
  }

  // Get minutes of the Day
  function minutesOfDay(date) {
    return date.getMinutes() + date.getHours() * 60;
  }
})();
