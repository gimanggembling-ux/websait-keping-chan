const skills = [
  { name: "Windows & Linux Administration", level: 90, description: "Installation, configuration, and maintenance of Windows & Linux OS for servers and workstations" },
  { name: "Networking (TCP/IP, DNS, DHCP)", level: 85, description: "LAN/WAN network setup, router, switch, and firewall configuration" },
  { name: "Hardware Troubleshooting", level: 90, description: "Diagnosing and repairing computers, laptops, printers, and other IT devices" },
  { name: "Cybersecurity Basics", level: 75, description: "Network security implementation, antivirus, and data protection" },
  { name: "Cloud Services (Google Workspace)", level: 70, description: "Account management, Google Drive, and cloud services for school" },
  { name: "Technical Support & Helpdesk", level: 95, description: "Providing quick IT solutions for teachers, students, and staff" },
  { name: "CCTV & Surveillance Systems", level: 80, description: "Installation and maintenance of CCTV and building security systems" },
  { name: "Microsoft Office Suite", level: 88, description: "Excel, Word, PowerPoint for administration and reporting needs" },
  { name: "Web & Server Management", level: 72, description: "Hosting, domain, and school website management" },
];

import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const SkillsSection = () => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section ref={ref} className={`py-24 px-6 bg-card/50 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Technical <span className="text-primary">Skills</span>
        </h2>
        <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
          Technical expertise I've mastered in IT Support & Infrastructure
        </p>

        <div className="space-y-6">
          {skills.map(({ name, level, description }) => (
            <div key={name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground">{level}%</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{description}</p>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
