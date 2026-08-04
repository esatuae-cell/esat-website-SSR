// our-stories.data.ts

// export interface Story {
//   year: number;
//   title: string;
//   image: string;
//   description: string;
// }

interface Achievement {
  title: string;
  description: string;
  image?: string;
}

interface Story {
  year: number;
  achievements: Achievement[];
}

export const STORIES: Story[] = [
  {
    year: 2011,
    achievements: [
      {
        title: 'ESAT journey begins',
        image: 'assets/images/logo_clr.png',
        description:
          'ESAT was established with the vision to work together as a team and develop a standard ERP package to make our own contribution to the society and help others organize and execute their business tasks more efﬁciently and accurately.',
      },
    ],
  },
  {
    year: 2012,
    achievements: [
      {
        title: 'Developing',
        image: 'assets/images/2012.png',
        description:
          'ESAT team implemented the ﬁrst Windows-based ERP using Visual Basic/SQL, with operation modules such as Facility and Construction Management, which integrate with main security software.',
      },
    ],
  },
  {
    year: 2013,
    achievements: [
      {
        title: 'New update',
        image: 'assets/images/2013.png',
        description:
          'Moving towards latest web technologies, ESAT developed a web-based ERP with Microsoft technologies (ASP.net/C#) and high availability Oracle 12C Database. Our web-based ERP contains all major modules that offer advanced options.',
      },
    ],
  },
  {
    year: 2014,
    achievements: [
      {
        title: 'Wi-Fi Project',
        image: 'assets/images/2014.png',
        description:
          'ESAT got involved in the business of installing and providing wireless network/ internet connection services (“Wireless Internet Services”) and carries out two (2) of the largest contracts in the UAE relying on the most up-to-date technology. Happily joint venture & Collaborate with international parties.',
      },
    ],
  },
  {
    year: 2015,
    achievements: [
      {
        title: 'System enhancement',
        image: 'assets/images/2015.png',
        description:
          'The information technology industry was changing, and new demands were being placed on software developers. Therefore,we adapted ASP.Net, MVC 4 C# with AngularJS framework to further enhance our systems’ performance.',
      },
    ],
  },
  {
    year: 2016,
    achievements: [
      {
        title: 'ESAT release New version.',
        image: 'assets/images/2016.png',
        description:
          'ESAT successfully implemented its new self-developed software version called Business System Application software-Enterprise Edition',
      },
    ],
  },
  {
    year: 2017,
    achievements: [
      {
        title: 'ISO certification',
        image: 'assets/images/2017.png',
        description:
          'ESAT received its ISO 9001:2015 Certiﬁcation for Quality Management Systems for the scope of "Developing, Implementing and Maintaining ERP Software products within Middle East".',
      },
    ],
  },
  {
    year: 2018,
    achievements: [
      {
        title: 'VAT system implementation',
        image: 'assets/images/vat.png',
        description:
          'VAT System was added-on ESAT-ERP Software in accordance with Federal Law No. 7 and 8, effective as of January 1, 2018.',
      },
    ],
  },
  {
    year: 2019,
    achievements: [
      {
        title: 'System enhancement',
        image: 'assets/images/angualr8-timelineimg.png',
        description:
          'ESAT recognizes the technology need for constant upgrades & we, thereby, adapted Angular 8 with ASP.Net Core, MVC 5 and added personalized web and mobile user experience for on-the-go access, giving ESAT technological competitive advantage.',
      },
    ],
  },
  {
    year: 2020,
    achievements: [
      {
        title: 'Sheikh khalifa Excellance Award',
        image: 'assets/images/SKIAUAE-timelineimg.png',
        description:
          'The Sheikh Khalifa Excellence Award (SKEA) Office at Abu Dhabi Chamber confer Quality Appreciation Certificate, 18th Cycle 2019-2020 to Enterprise Systems Analysis Technology (ESAT) in appreciation of its distinguished achievements and persistent effort and commitment to Quality and Excellence in its business.',
      },
    ],
  },
  {
    year: 2021,
    achievements: [
      {
        title: 'Continuing the legacy',
        image: 'assets/images/angualr9-timelineimg.png',
        description:
          'ESAT is continuously growing and the team is expanding.to adhere to our commitment in maintaining our lead amidst the ever-changing landscape of technology, we, thereby, providing constant enhancement through ASP.Net technology & Angular 9. We hope that you will join us in writing the next chapters of ESAT history.',
      },
    ],
  },
  {
    year: 2022,
    achievements: [
      {
        title: 'ESAT Cloud ERP',
        image: 'assets/images/cloud.png',
        description:
          'ESAT SaaS ERP is a cloud-based ERP software that offered in a subscription model, they help ease financial obstacles that often get in the way of deploying traditional on-premises ERP. ESAT ERP also provides significant speed and agility benefits and ensured that you have the right data at your fingertips to make the best decisions for your company.',
      },
    ],
  },
  {
    year: 2023,
    achievements: [
      {
        title: 'Innovate with AI',
        image: 'assets/images/ai_tech.jpg',
        description:
          'In 2023, we leveraged state-of-the-art technology and embraced AI to enhance our system, delivering advanced and innovative solutions to our clients while our unwavering dedication to technological excellence endures.',
      },
    ],
  },
  {
    year: 2024,
    achievements: [
      {
        title: 'UAE Corporate Tax Update',
        image: 'assets/images/uae_ct.png',
        description:
          'We have successfully updated our ERP system to fully comply with the UAE Federal Decree-Law No. 47 of 2022 on Corporate Tax. This update automates tax calculations, updates accounting structures, and ensures all financial reporting aligns with the latest statutory regulations.',
      },
    ],
  },
  {
    year: 2025,
    achievements: [
      {
        title: 'Continuing the legacy ',
        image: 'assets/images/2025-application.png?v=1',
        description:
          'ESAT is continuously growing and the team is expanding.to adhere to our commitment in maintaining our lead amidst the ever-changing landscape of technology, we, thereby, providing constant enhancement through ASP.Net technology & Angular 21. We hope that you will join us in writing the next chapters of ESAT history.',
      },
    ],
  },
  {
    year: 2026,
    achievements: [
      {
        title: 'ISO 27001:2022 Information Security Management System',
        image: 'assets/images/first-certification.png',
        description:
          'In 2026, ESAT received its ISO 27001:2022 Information Security Management System for excellence in delivering innovative ERP software solutions and maintaininghigh standards in software development, implementation, and customer support across the Middle East. ',
      },
      {
        title: 'ESAT Achieves In-Country Value (ICV) Certification',
        image: 'assets/images/icv-logo.png',
        description:
          'ESAT proudly obtained the In-Country Value (ICV) Certificate in 2026, reinforcing our commitment to supporting the UAE national economic development nitiatives.At ESAT, we remain committed to delivering innovative digital solutions while contributing to the UAE vision for economic growth, localization, and long-term sustainability.',
      },
    ],
  },
];
