import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Mail, 
  MapPin, 
  ChevronRight,
  ChevronLeft,
  Menu,
  Phone,
  FileText,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// --- Components ---

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-950">
    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        x: [0, -40, 0],
        y: [0, -60, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"
    />
  </div>
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Navigation ---

const Navigation = ({ mobile = false, onItemClick }: { mobile?: boolean, onItemClick?: () => void }) => {
  const links = [
    { name: "About", id: "about" },
    { name: "Academics", id: "academics" },
    { name: "Projects", id: "projects" },
    { name: "Community", id: "community" },
    { name: "Contact", id: "contact" },
    { name: "Resume", id: "resume" },
  ];

  const scrollToSection = (id: string) => {
    if (id === "resume") {
      window.open("/attached_assets/Khandelwal_Samarth_Resume_updated_(10_21_25)_(1)_1767460225537.pdf", "_blank");
      if (onItemClick) onItemClick();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      if (onItemClick) onItemClick();
    }
  };

  return (
    <nav className={`flex ${mobile ? "flex-col space-y-4" : "items-center gap-1"}`}>
      {links.map((link) => (
        <button
          key={link.name}
          onClick={() => scrollToSection(link.id)}
          className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-full hover:bg-slate-800 text-slate-400 hover:text-primary whitespace-nowrap`}
          data-testid={`nav-${link.id}`}
        >
          {link.name}
        </button>
      ))}
    </nav>
  );
};

const DotNavigation = ({ activeSection }: { activeSection: string }) => {
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "academics", label: "Academics" },
    { id: "projects", label: "Projects" },
    { id: "community", label: "Community" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-32 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center"
          aria-label={`Scroll to ${section.label}`}
        >
          <span className="absolute right-8 px-2 py-1 rounded bg-slate-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {section.label}
          </span>
          <div 
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              activeSection === section.id 
                ? "bg-primary border-primary scale-125 shadow-[0_0_15px_rgba(0,109,119,0.6)]" 
                : "bg-slate-700 border-transparent hover:bg-slate-600 hover:scale-110"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// --- Content Sections Content ---

const AboutSectionContent = () => (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <h2 className="text-3xl font-bold mb-8 text-white">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center text-slate-300">
        <div className="prose dark:prose-invert prose-slate max-w-2xl leading-relaxed text-xl font-medium order-1 md:order-1 py-2">
          <p>
            Hi, I'm Samarth. I’m a high school student driven by a deep curiosity for Artificial Intelligence and its capacity to change our future. I see AI as a tool for discovering solutions to humanity's problems. My journey is driven by the pursuit of knowledge, bridging the gap between raw code and real-world impact to create technology that fosters change.
          </p>
        </div>
        <div className="prose dark:prose-invert prose-slate max-w-none leading-relaxed text-lg md:text-xl font-bold order-2 md:order-2 italic border-r-4 border-primary pr-10 pl-6 py-6 bg-slate-900/50 rounded-l-xl text-right flex items-center justify-end min-h-[150px] w-full md:w-[calc(100%+8rem)] relative md:left-[8rem] -translate-y-[90px]">
          <p className="m-0">
            "AI will open up new ways of doing things that we cannot even imagine today."<br/>
            <span className="text-lg font-medium text-slate-500 block mt-4">– Sundar Pichai</span>
          </p>
        </div>
      </div>
    </motion.div>
);

const AcademicsSectionContent = () => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <h2 className="text-3xl font-bold mb-8 text-white">Academics</h2>
      
      <div className="grid gap-8">
        <motion.div variants={fadeIn}>
          <div className="flex justify-between items-start mb-2 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white">Walnut Hills High School</h3>
              <p className="text-slate-500">Class of 2027</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-slate-900/50 border-slate-800 shadow-none">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3 text-slate-300">GPA</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Unweighted</span>
                    <span className="font-mono font-medium text-white">3.9 / 4.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Weighted</span>
                    <span className="font-mono font-medium text-white">5.3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 shadow-none">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3 text-slate-300">SAT Score</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-300 font-semibold">Total</span>
                    <span className="font-mono font-bold text-lg text-primary">1520</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-800">
                    <span>Math: 780</span>
                    <span>Reading: 740</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <h3 className="text-lg font-semibold mb-4 text-white">Coursework</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">AP Courses</span>
                <Separator className="flex-1 bg-slate-800" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Chemistry", "Biology", "Calculus BC", "Computer Science A", "Research", "U.S. History"].map(course => (
                  <Badge key={course} variant="secondary" className="bg-slate-900 border border-slate-800 font-normal text-slate-300">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Dual Enrollment</span>
                <Separator className="flex-1 bg-slate-800" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-3 rounded-md border border-slate-800">
                   <p className="text-xs text-primary font-semibold mb-1">Ohio State University</p>
                   <p className="text-sm text-slate-300">Multivariable Calculus, Family Financial Management</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-md border border-slate-800">
                   <p className="text-xs text-primary font-semibold mb-1">University of Cincinnati</p>
                   <p className="text-sm text-slate-300">Statistics 1031, 19th Century Music, Nutrition 101</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
);

const ProjectsSectionContent = () => {
  const projects = [
    {
      title: "CrisisAnalyzer: Multimodal Disaster Summarization",
      role: "Research Project Team Lead",
      description: "Directed a 7-person team to develop a transformer-based model analyzing social media data to optimize emergency service responses. Utilized data from the Crisis Multimodal Dataset and prompt engineering to build a model that provided actionable summaries. Presented project findings to faculty from UC and regional universities during a competitive poster session. Earned the \"Most Impactful Research Project\" award and the \"Leadership Prestige\" award.",
      tech: ["Transformers", "NLP", "Computer Vision"],
      context: "UC AI Research Internship",
      links: [
        { name: "Research Poster", url: "/attached_assets/ExLAI_Poster_1767460245154.pdf" }
      ]
    },
    {
      title: "Deep Learning Prediction of Glioblastoma miRNAs via RGCN",
      role: "Principal Investigator",
      description: "Developing a model to predict microRNA (miRNA) regulators implicated in Glioblastoma by engineering a multiomics network from public databases and applying bioinformatics methods to train a relational graph convolutional network model. Targeting submission to the Great Lakes Bioinformatics Conference as a conference paper, as well as ISEF and the Ohio Society of Science.",
      tech: ["Graph ML", "PyTorch Geometric", "Deep Learning", "Bioinformatics"],
      context: "AP Research Project"
    },
    {
      title: "EagleVision",
      role: "Developer",
      description: "EagleVision utilizes a phone attached to a microscope to broadcast a camera feed to a web-based interface. In this system, teachers act as hosts who create sessions with unique codes to share the live feed with students, allowing for interactive features such as image annotation, snapshots, and session management. This application assists in microscope use in schools with resource limitations, allowing for one microscope to be used by multiple students at a time.",
      tech: ["WebRTC", "JavaScript", "HTML"],
      context: "Programming Team"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('projects-container');
    if (container) {
      const scrollAmount = container.clientWidth;
      const currentScroll = container.scrollLeft;
      const currentIndex = Math.round(currentScroll / scrollAmount);
      const totalSlides = projects.length;
      
      let targetScroll;
      if (direction === 'left') {
        if (currentIndex === 0) {
          targetScroll = (totalSlides - 1) * scrollAmount;
        } else {
          targetScroll = (currentIndex - 1) * scrollAmount;
        }
      } else {
        if (currentIndex === totalSlides - 1) {
          targetScroll = 0;
        } else {
          targetScroll = (currentIndex + 1) * scrollAmount;
        }
      }

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-slate-800 text-slate-300 hover:bg-slate-800"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-slate-800 text-slate-300 hover:bg-slate-800"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div 
          id="projects-container"
          className="flex overflow-x-hidden gap-8 pb-8 snap-x snap-mandatory scrollbar-none px-0 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="w-full snap-center flex-shrink-0"
            >
              <div className="max-w-[700px] h-full">
                <Card className="h-full border-slate-800 bg-slate-900/50 hover:border-primary transition-colors flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                      <CardTitle className="text-2xl font-bold text-white break-words leading-tight max-w-xl">{project.title}</CardTitle>
                      <Badge variant="outline" className="text-xs font-normal self-start whitespace-nowrap px-3 py-1 border-slate-700 text-slate-400">{project.context}</Badge>
                    </div>
                    <CardDescription className="text-base font-medium text-primary leading-snug max-w-lg">{project.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map(t => (
                        <span key={t} className="text-xs font-mono text-slate-500 bg-slate-950 border border-slate-800 px-3 py-1 rounded shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto border-t border-slate-800 pt-6">
                    {project.links && (
                      <div className="flex gap-6">
                        {project.links.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
                          >
                            <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
  );
};

const CommunitySectionContent = () => {
  const communityData = [
    {
      title: "Lakota Robotics FRC Team 1038",
      role: "Autonomous Lead",
      desc: "Programming and operating the robot for FIRST Robotics Competition Team 1038, writing Java control code and managing live telemetry during practice matches. Ensuring the timeliness and quality of deliverables to the robot manager and training new team members. Led the team to win the Industrial Design Award and Impact award at regional level competitions, securing qualification for the 2025 FIRST World Championship. Volunteering 40-50 hours a year to assist in outreach events."
    },
    {
      title: "Ohio Attorney General's Teen Ambassador Board",
      role: "Group Lead",
      desc: "Leading a committee of peers across Ohio in coordination with the Attorney General to advocate for policies that lead to the effective use of AI in education. Currently, the committee is conducting surveys to assess the current state of AI-related academic dishonesty and has obtained representation from 20+ schools. Additionally, we are in the process of drafting school policy recommendations with feedback from the Ohio Attorney General's Higher Education Section."
    },
    {
      title: "Kumon Math & Reading Center",
      role: "Center Assistant/Volunteer",
      desc: "Managed the center during class hours and assigned digital coursework using Kumon Connect. Volunteered over 350 hours assisting students and grading materials."
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('community-container');
    if (container) {
      const scrollAmount = container.clientWidth;
      const currentScroll = container.scrollLeft;
      const currentIndex = Math.round(currentScroll / scrollAmount);
      const totalSlides = communityData.length;
      
      let targetScroll;
      if (direction === 'left') {
        if (currentIndex === 0) {
          targetScroll = (totalSlides - 1) * scrollAmount;
        } else {
          targetScroll = (currentIndex - 1) * scrollAmount;
        }
      } else {
        if (currentIndex === totalSlides - 1) {
          targetScroll = 0;
        } else {
          targetScroll = (currentIndex + 1) * scrollAmount;
        }
      }

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative w-full"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Community Outreach</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full border-slate-800 text-slate-300 hover:bg-slate-800"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full border-slate-800 text-slate-300 hover:bg-slate-800"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div 
        id="community-container"
        className="flex overflow-x-hidden gap-8 pb-8 snap-x snap-mandatory scrollbar-none px-0 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {communityData.map((item, i) => (
          <motion.div 
            key={i} 
            variants={fadeIn}
            className="w-full snap-center flex-shrink-0"
          >
            <div className="max-w-[700px] h-full">
              <Card className="h-full border-slate-800 bg-slate-900/50 hover:border-primary transition-colors flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-2xl font-bold text-white break-words leading-tight max-w-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base font-medium text-primary leading-snug max-w-lg mt-2">{item.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactSectionContent = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    form.reset();
  }

  return (
       <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Left Column: Info */}
            <div className="p-8 md:p-12 bg-slate-950/50 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Contact</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Have a project in mind? My inbox is always open for new opportunities.
                </p>
                
                <div className="space-y-6">
                  <a href="https://github.com/SamarthKhandelwal-create" target="_blank" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
                    <div className="p-3 bg-slate-900 rounded-lg shadow-sm border border-slate-800 group-hover:border-primary/50 transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <span className="font-medium">SamarthKhandelwal-create</span>
                  </a>
                  
                  <a href="mailto:skhandelwal1324@gmail.com" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
                    <div className="p-3 bg-slate-900 rounded-lg shadow-sm border border-slate-800 group-hover:border-primary/50 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium">skhandelwal1324@gmail.com</span>
                  </a>

                  <div className="flex items-center gap-4 text-slate-400 group">
                    <div className="p-3 bg-slate-900 rounded-lg shadow-sm border border-slate-800">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">513-953-6153</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-8 md:p-12 bg-slate-900/50">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} className="bg-slate-950 border-slate-800 focus-visible:ring-primary text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Inquiry" {...field} className="bg-slate-950 border-slate-800 focus-visible:ring-primary text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="resize-none min-h-[120px] bg-slate-950 border-slate-800 focus-visible:ring-primary text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

// --- Main Page Component ---

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ["hero", "about", "academics", "projects", "community", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen bg-slate-950 text-slate-100 font-sans selection:bg-primary/30 selection:text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">
      <AnimatedBackground />
      <DotNavigation activeSection={activeSection} />
      <div className="max-w-7xl mx-auto bg-slate-900/40 backdrop-blur-[4px] border-x border-slate-800/50 min-h-screen flex flex-col shadow-2xl shadow-black/50">
        
        {/* Top Header Section */}
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 md:px-12 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">Samarth Khandelwal</h1>
            </div>
            
            <div className="hidden lg:block">
              <Navigation />
            </div>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-6 bg-slate-950 text-slate-100 border-slate-800">
                  <div className="flex flex-col h-full">
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-white">Samarth Khandelwal</h2>
                    </div>
                    <Navigation mobile onItemClick={() => {}} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Hero Info Section */}
        <section id="hero" className="px-6 md:px-12 lg:px-20 py-12 md:py-20 bg-transparent border-b border-slate-800/50 flex-shrink-0 snap-start min-h-screen flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-white tracking-tight">Samarth Khandelwal</h1>
            <p className="text-xl md:text-2xl font-semibold text-primary mb-6">Aspiring AI Engineer</p>
            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl">
              Motivated and detail-oriented high school student seeking opportunities to deepen expertise in engineering, AI, and computer science development.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-lg shadow-primary/20"
              >
                Contact Me
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="rounded-full px-8 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                Learn More
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Cincinnati, OH
              </div>
              <a href="mailto:skhandelwal1324@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors underline underline-offset-4 decoration-slate-800 hover:decoration-primary">
                <Mail className="w-4 h-4 text-primary" />
                skhandelwal1324@gmail.com
              </a>
              <div className="flex items-center gap-4 ml-auto">
                <a href="https://github.com/SamarthKhandelwal-create" target="_blank" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 px-6 md:px-12 lg:px-20 bg-transparent">
          <section id="about" className="max-w-3xl snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <AboutSectionContent />
          </section>
          
          <section id="academics" className="max-w-3xl border-t border-slate-800/50 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <AcademicsSectionContent />
          </section>

          <section id="projects" className="max-w-3xl border-t border-slate-800/50 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <ProjectsSectionContent />
          </section>

          <section id="community" className="max-w-3xl border-t border-slate-800/50 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <CommunitySectionContent />
          </section>

          <section id="contact" className="border-t border-slate-800/50 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <ContactSectionContent />
          </section>
          
          <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800/50 snap-end">
          </footer>
        </main>
      </div>
    </div>
  );
}
