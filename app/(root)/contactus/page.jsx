"use client"
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";

const teamMembers = [
  {
    name: "محمدرضا شریفی",
    role: "Backend Developer / Project Manager",
    email: "mohammadrezasharify@outlook.com",
    imageSrc: "/images/mohammadrezasharify.png",
    linkedIn: "https://ir.linkedin.com/in/mohammad-reza-sharify-76b3501b1",
    telegram: "https://t.me/Varyoe",
    instagram: "https://www.instagram.com/mhmdrezash83/",
    github: "https://github.com/VaryoSc",
  },
  {
    name: "داود ربیعی",
    role: "Frontend Developer / Designer",
    email: "davoodrb@outlook.com",
    imageSrc: "/images/davoodrabiei.png",
    linkedIn: "https://ir.linkedin.com/in/davoodrb",
    telegram: "https://t.me/davoodrb",
    github: "https://github.com/davoodrb",
  },
];

const ContactUsPage = () => {
  return (
    <div className="text-center mt-16 py-10 md:grid grid-cols-2 space-y-16 md:space-y-0">
      {teamMembers.map((member, index) => (
        <div key={index}>
          <Image
            className="mx-auto"
            src={member.imageSrc}
            width={100}
            height={100}
            alt={`${member.name} profile`}
          />
          <span className="block mt-4 text-xl">{member.name}</span>
          <span className="block mt-2">{member.role}</span>
          {member.email && <span className="block mt-1">{member.email}</span>}
          <div className="mt-2 space-x-2 space-x-reverse">
            {member.linkedIn && (
              <a
                rel="noopener noreferrer"
                href={member.linkedIn}
                target="_blank"
              >
                <IconButton color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </a>
            )}
            {member.telegram && (
              <a
                rel="noopener noreferrer"
                href={member.telegram}
                target="_blank"
              >
                <IconButton color="inherit">
                  <TelegramIcon />
                </IconButton>
              </a>
            )}
            {member.instagram && (
              <a
                rel="noopener noreferrer"
                href={member.instagram}
                target="_blank"
              >
                <IconButton color="inherit">
                  <InstagramIcon />
                </IconButton>
              </a>
            )}
            {member.github && (
              <a rel="noopener noreferrer" href={member.github} target="_blank">
                <IconButton color="inherit">
                  <GitHubIcon />
                </IconButton>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactUsPage;
