import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, MapPin, GraduationCap, Code, ChevronDown, Globe, Briefcase } from 'lucide-react';
import Profile from "./assets/dhanush.png"

const translations = {
  de: {
  nav: {
    about: 'Über mich',
    experience: 'Erfahrung',
    education: 'Bildung',
    projects: 'Projekte',
    contact: 'Kontakt'
  },

  hero: {
    greeting: 'Hallo, ich bin',
    title: 'Dhanush',
    subtitle: 'DevOps Engineer mit Schwerpunkt auf CI/CD, Cloud-Infrastruktur, Kubernetes und Observability. Erfahrung mit AWS, Terraform, Docker, Jenkins, Argo CD sowie dem Aufbau und Betrieb zuverlässiger Kubernetes-Plattformen.',
    cta: 'Kontaktieren Sie mich'
  },

  about: {
    title: 'Wer bin ich?',
    content: 'Hallo, ich bin Dhanush, DevOps Engineer mit mehr als 3 Jahren Erfahrung in Cloud-Infrastruktur, CI/CD-Automatisierung und Plattformbetrieb.\n\nMein fachlicher Schwerpunkt liegt auf AWS, Terraform, Docker, Kubernetes, Jenkins, GitOps mit Argo CD sowie Monitoring mit Prometheus und Grafana. Dazu kommen DevSecOps-Praktiken wie Container- und Dependency-Scans.\n\nIch interessiere mich für zuverlässige Release-Prozesse, reproduzierbare Infrastruktur und den stabilen, sicheren Betrieb von Plattformen in der Produktion.',
    button: 'Mehr über mich'
  },

  experience: {
    title: 'Berufserfahrung',
    description: 'Mehr als 3 Jahre Erfahrung in DevOps, Cloud-Infrastruktur und Release-Automatisierung mit Schwerpunkt auf CI/CD, Kubernetes, Infrastructure as Code und Observability.',
    download: 'Lebenslauf herunterladen',
    jobs: [
      {
        title: 'Associate DevOps Engineer',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '06/2022 - 05/2023',
        points: [
          'Jenkins-CI/CD-Pipelines von Grund auf aufgebaut und die Jenkinsfiles selbst geschrieben. Jede Pipeline hat den Code geholt, den Maven-Build ausgeführt, das Docker-Image gebaut, nach ECR gepusht und per SSH auf EC2 deployt. Dadurch entfielen manuelle Build-Starts, die Deployment-Dauer sank um geschätzt 40 % und Deployment-Fehler über die Umgebungen hinweg gingen zurück.',
    'Zustand von Anwendungen und Servern mit Prometheus und Grafana überwacht und CloudWatch- und SNS-Benachrichtigungen eingerichtet. Warnungen zu Speicherplatz und Ressourcenauslastung habe ich früh untersucht, damit Dienste nicht beeinträchtigt wurden.',
    'Python-Skripte für Log-Parsing, Festplattenüberwachung und SSL-Zertifikatsprüfungen geschrieben und damit mehr als 15 Engineering-Stunden pro Woche eingespart.'
        ]
      },
      {
        title: 'DevOps Engineer',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '06/2023 - 01/2025',
        points: [
          'Build- und Deployment-Pipelines für über 20 Anwendungen mit Jenkins Shared Libraries automatisiert, sodass Teams eine gemeinsame Pipeline nutzen, statt jeweils eigene zu pflegen. Die Release-Zykluszeit sank um 40 %, von 2 Stunden auf 1,2 Stunden.',
    'Infrastruktur mit modularem Terraform standardisiert, mit Remote State in S3 und Locking über DynamoDB, damit das Team sicher am selben State arbeiten kann. Das Aufsetzen neuer Umgebungen wurde um 60 % schneller.',
    'Produktive Microservices auf Amazon EKS mit Helm-Charts und HPA-Autoscaling betrieben und damit über 100 unterbrechungsfreie Releases pro Monat ermöglicht. Außerdem habe ich die Java/Spring-Boot-Images als Multi-Stage-Docker-Builds neu aufgebaut, wodurch die Image-Größe um 45 % und die Startzeit um 30 % sank.',
    'Stabilität und Performance der unternehmensweiten Datenpipelines verbessert und die Verarbeitungszeit von 24 Stunden auf 4 Stunden reduziert (75 %).'
        ]
      }
    ]
  },

  education: {
    title: 'Bildung',
    items: [
      {
        university: 'Hochschule Hof, University of Applied Sciences',
        year: '2026 - 2028',
        degree: 'Master in Artificial Intelligence und Robotik'
      },
      {
        university: 'Visvesvaraya Technological University',
        year: '2018 - 2022',
        degree: 'Bachelor of Engineering in Information Science'
      }
    ]
  },

  projects: {
    title: 'Ausgewählte Projekte',
    viewCode: 'Code auf GitHub ansehen',
    items: [
      {
        title: 'Self-Managed Kubernetes Platform mit Disaster Recovery',
        url: 'https://github.com/dhanushpv-25/Self-managed-Kubernetes-platform-with-DR',
        description: 'Eine hochverfügbare Kubernetes-Plattform ohne Managed Service: drei Control-Plane-Knoten mit gestapeltem etcd und zwei Worker, vollständig per Code aufgebaut. Der Cluster lässt sich per tofu destroy neu erstellen, unterbrechungsfrei aktualisieren und nach einem simulierten Control-Plane-Ausfall aus einem etcd-Snapshot wiederherstellen. GitOps über ArgoCD (App-of-Apps), Secrets über Vault und External Secrets.',
        stack: ['OpenTofu', 'libvirt', 'Ansible', 'kubeadm', 'Cilium', 'Hubble', 'ArgoCD', 'Velero', 'Vault', 'External Secrets', 'Bash', 'Python']
      },
      {
        title: 'Sichere Software Supply Chain und Progressive Delivery',
        url: 'https://github.com/dhanushpv-25/Secure-supply-chain-and-progressive-delivery',
        description: 'Eine Delivery-Pipeline, die nachweist, dass in Produktion nur geprüfter, getesteter und signierter Code läuft. Wiederverwendbare GitHub-Actions-Workflows führen Tests, Trivy-Scans, SBOM-Erzeugung und Cosign-Signierung aus; Kyverno verifiziert Signaturen beim Admission. Die Promotion erfolgt per Image-Digest, Releases werden mit Argo Rollouts und Prometheus-Analyse als Canary ausgerollt und bei Fehlern automatisch zurückgerollt. Die OpenTofu-Infrastruktur läuft über eine GitLab-CI-Pipeline.',
        stack: ['GitHub Actions', 'Trivy', 'Syft', 'Cosign', 'Harbor', 'Kyverno', 'Helm', 'Argo Rollouts', 'Prometheus', 'GitLab CI', 'OpenTofu']
      },
      {
        title: 'SLO-basierte Zuverlässigkeit mit abgesichertem Self-Healing',
        url: 'https://github.com/dhanushpv-25/SLO-driven-reliability-with-guarded-self-healing',
        description: 'Eine Reliability-Schicht, die Ausfälle erkennt, diagnostiziert und sicher behebt. SLOs werden als Code definiert, Burn-Rate-Alerts frieren bei verbrauchtem Error Budget automatisch Rollouts ein. Chaos-Experimente decken Fehlerquellen über verteiltes Tracing auf; ein Python-Remediation-Controller mit Dry-Run, Rate Limits, Schleifenschutz und Freigabe für riskante Aktionen behebt Störungen und erzeugt Incident-Reports mit gemessenen MTTD- und MTTR-Werten.',
        stack: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry', 'Tempo', 'Sloth', 'Chaos Mesh', 'Python', 'Kubernetes']
      }
    ]
  },

  contact: {
    title: 'Kontakt',
    phone: 'Telefonnummer',
    email: 'E-Mail',
    location: 'Standort',
    locationValue: 'Deutschland',
    button: 'Nachricht senden'
  }
},
  
  en: {
  nav: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    contact: 'Contact'
  },

  hero: {
    greeting: 'Hello, I am',
    title: 'Dhanush',
    subtitle: 'DevOps Engineer focused on CI/CD, cloud infrastructure, Kubernetes and observability. Experienced with AWS, Terraform, Docker, Jenkins, Argo CD and building and running reliable Kubernetes platforms.',
    cta: 'Contact Me'
  },

  about: {
    title: 'Who am I?',
    content: 'Hi, I’m Dhanush, a DevOps Engineer with 3+ years of experience in cloud infrastructure, CI/CD automation and platform operations.\n\nMy core areas are AWS, Terraform, Docker, Kubernetes, Jenkins, GitOps with Argo CD and monitoring with Prometheus and Grafana, along with DevSecOps practices such as container and dependency scanning.\n\nI care about dependable release processes, reproducible infrastructure and keeping platforms secure and stable in production.',
    button: 'More About Me'
  },

  experience: {
    title: 'Professional Experience',
    description: '3+ years of experience in DevOps, cloud infrastructure and release automation, with a focus on CI/CD, Kubernetes, Infrastructure as Code and observability.',
    download: 'Download Resume',
    jobs: [
      {
        title: 'Associate DevOps Engineer',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '06/2022 - 05/2023',
        points: [
          'Built Jenkins CI/CD pipelines from scratch and wrote the Jenkinsfiles myself. Each one pulled the code, ran the Maven build, built the Docker image, pushed it to ECR and deployed to EC2 over SSH. This replaced manual build starts, cut deployment time by an estimated 40% and reduced deployment errors across environments.',
      "Monitored application and server health with Prometheus and Grafana, and set up CloudWatch and SNS notifications. I investigated disk space and resource utilization alerts early so services didn't degrade.",
      'Wrote Python scripts for log parsing, disk monitoring and SSL certificate checks, saving 15+ engineering hours a week.'
          
        ]
      },
      {
        title: 'DevOps Engineer',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '06/2023 - 01/2025',
        points: [
           'Automated build and deployment pipelines for 20+ applications with Jenkins Shared Libraries, so teams reused one pipeline instead of maintaining separate ones. Release cycle time dropped 40%, from 2 hours to 1.2 hours.',
    'Standardized infrastructure with modular Terraform, using S3 remote state and DynamoDB locking so the team could work on the same state safely. Environment setup became 60% faster.',
    'Ran production microservices on Amazon EKS with Helm charts and HPA autoscaling, supporting 100+ monthly zero-downtime releases. I also rebuilt the Java/Spring Boot images as multi-stage Docker builds, cutting image size by 45% and startup time by 30%.',
    'Improved the stability and performance of the enterprise data pipelines, cutting processing time from 24 hours to 4 hours (75%).'
        ]
      }
    ]
  },

  education: {
    title: 'Education',
    items: [
      {
        university: 'Hochschule Hof, University of Applied Sciences',
        year: '2026 - 2028',
        degree: 'Master’s in Artificial Intelligence and Robotics'
      },
      {
        university: 'Visvesvaraya Technological University',
        year: '2018 - 2022',
        degree: 'Bachelor of Engineering in Information Science'
      }
    ]
  },

  projects: {
    title: 'Selected Projects',
    viewCode: 'View on GitHub',
    items: [
      {
        title: 'Self-Managed Kubernetes Platform with Disaster Recovery',
        url: 'https://github.com/dhanushpv-25/Self-managed-Kubernetes-platform-with-DR',
        description: 'A highly available Kubernetes platform built without a managed service: three control-plane nodes with stacked etcd and two workers, fully provisioned from code. The cluster can be destroyed and rebuilt with tofu, upgraded in place while an application stays up, and restored from an etcd snapshot after a simulated control-plane failure. GitOps runs through ArgoCD (app-of-apps) and secrets through Vault and External Secrets.',
        stack: ['OpenTofu', 'libvirt', 'Ansible', 'kubeadm', 'Cilium', 'Hubble', 'ArgoCD', 'Velero', 'Vault', 'External Secrets', 'Bash', 'Python']
      },
      {
        title: 'Secure Supply Chain and Progressive Delivery',
        url: 'https://github.com/dhanushpv-25/Secure-supply-chain-and-progressive-delivery',
        description: 'A delivery pipeline that proves production runs only what was reviewed, tested and signed. Reusable GitHub Actions workflows run tests, Trivy scans, SBOM generation and Cosign signing, and Kyverno verifies signatures at admission. Images are promoted by digest, and releases roll out as canaries with Argo Rollouts and Prometheus analysis, rolling back automatically when a release is bad. The OpenTofu infrastructure is applied through a GitLab CI pipeline.',
        stack: ['GitHub Actions', 'Trivy', 'Syft', 'Cosign', 'Harbor', 'Kyverno', 'Helm', 'Argo Rollouts', 'Prometheus', 'GitLab CI', 'OpenTofu']
      },
      {
        title: 'SLO-Driven Reliability with Guarded Self-Healing',
        url: 'https://github.com/dhanushpv-25/SLO-driven-reliability-with-guarded-self-healing',
        description: 'A reliability layer that detects, diagnoses and safely recovers from failures. SLOs are defined as code, and burn-rate alerts freeze rollouts automatically once the error budget is spent. Chaos experiments surface faulty services through distributed tracing, and a Python remediation controller with dry-run mode, rate limits, loop prevention and approval for risky actions fixes incidents and produces incident reports with measured MTTD and MTTR.',
        stack: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry', 'Tempo', 'Sloth', 'Chaos Mesh', 'Python', 'Kubernetes']
      }
    ]
  },

  contact: {
    title: 'Contact Me',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Location',
    locationValue: 'Germany',
    button: 'Send Message'
  }
}
  
};

export default function Portfolio() {
  const [language, setLanguage] = useState('de');
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const t = translations[language];

  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'de' ? 'en' : 'de');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Fixed Header */}
      <motion.header
        style={{ opacity: headerOpacity, backgroundColor: headerBackground }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-900"
            >
              DPV
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value], index) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => scrollToSection(key === 'about' ? 'about' : key)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
                    activeSection === key ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-all duration-300"
            >
              <Globe size={16} />
              {language === 'de' ? 'EN' : 'DE'}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.p
                variants={itemVariants}
                className="text-blue-600 font-medium mb-4"
              >
                {t.hero.greeting}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
              >
                {t.hero.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex gap-4"
              >
                <a
                  href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  {t.hero.cta}
                </a>
                <a
                  href="https://github.com/dhanushpv-25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  GitHub
                </a>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex gap-4 mt-8"
              >
                <a
                  href="https://github.com/dhanushpv-25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Github size={20} className="text-gray-700" />
                </a>
                <a
                  href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                  className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Mail size={20} className="text-gray-700" />
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md mx-auto"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src={Profile}
                        alt="Profilbild"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={32} className="text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">{t.about.title}</h2>
            <motion.p
              variants={fadeInUpVariants}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              {t.about.content}
            </motion.p>
            <motion.a
              variants={fadeInUpVariants}
              href="#experience"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              {t.about.button}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              {t.experience.title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-12 leading-relaxed"
            >
              {t.experience.description}
            </motion.p>

            <div className="space-y-8">
              {[...t.experience.jobs].reverse().map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Briefcase size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.duration}</p>
                      {job.points && (
                        <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-700 leading-relaxed">
                          {job.points.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex gap-4"
            >
              <a
                href="https://drive.google.com/file/d/1oUJQzRItcfxQb9aeTnIRGlRtnJkEuqMM/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                {t.experience.download}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-12 text-gray-900"
            >
              {t.education.title}
            </motion.h2>

            <div className="space-y-8">
              {t.education.items.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <GraduationCap size={24} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                      <p className="text-purple-600 font-medium mb-2">{edu.university}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-12 text-gray-900"
            >
              {t.projects.title}
            </motion.h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {t.projects.items.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Code size={24} className="text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-5 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((technology) => (
                      <span
                        key={technology}
                        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
                    >
                      <Github size={16} />
                      {t.projects.viewCode}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
              >
                {t.contact.title}
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.contact.email}</p>
                    <a
                      href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      dhanush.palani.vijay.kumari.job@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MapPin size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.contact.location}</p>
                    <p className="text-lg font-medium text-gray-900">{t.contact.locationValue}</p>
                  </div>
                </div>
              </motion.div>

              <motion.a
                variants={itemVariants}
                href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                <Mail size={20} />
                {t.contact.button}
              </motion.a>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md mx-auto"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src={Profile}
                        alt="Profilbild"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gray-900 mb-2">Dhanush</p>
              <p className="text-gray-600">
                {language === 'de'
                  ? 'DevOps Engineer mit Schwerpunkt auf CI/CD, Cloud & Kubernetes'
                  : 'DevOps Engineer focused on CI/CD, Cloud & Kubernetes'}
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/dhanushpv-25"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Github size={20} className="text-gray-700" />
              </a>
              <a
                href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                className="p-3 bg-white hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Mail size={20} className="text-gray-700" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm"
          >
            <p>© 2026 Dhanush Palani Vijay Kumari. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}