import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Download, 
  Linkedin, 
  Code2, 
  GraduationCap, 
  Users, 
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Phone,
  FileText
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// --- Components ---

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
          className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary whitespace-nowrap`}
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
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
              activeSection === section.id 
                ? "bg-primary border-primary scale-125 shadow-[0_0_10px_rgba(0,109,119,0.5)]" 
                : "bg-slate-300 dark:bg-slate-700 border-transparent hover:bg-slate-400 dark:hover:bg-slate-600"
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
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="prose dark:prose-invert prose-slate max-w-2xl text-slate-900 dark:text-slate-100 leading-relaxed text-xl font-medium order-1 md:order-1 py-2">
          <p>
            Hi, I'm Samarth. I’m a high school student driven by a deep curiosity for Artificial Intelligence and its capacity to change our future. I see AI as a tool for discovering solutions to humanity's problems. My journey is driven by the pursuit of knowledge, bridging the gap between raw code and real-world impact to create technology that fosters change.
          </p>
        </div>
        <div className="prose dark:prose-invert prose-slate max-w-none text-slate-900 dark:text-slate-100 leading-relaxed text-lg md:text-xl font-bold order-2 md:order-2 italic border-r-4 border-primary pr-10 pl-6 py-6 bg-slate-50 dark:bg-slate-900/50 rounded-l-xl text-right flex items-center justify-end min-h-[150px] w-full md:w-[calc(100%+8rem)] relative md:left-[8rem] -translate-y-[90px]">
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
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Academics</h2>
      
      <div className="grid gap-8">
        <motion.div variants={fadeIn}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Walnut Hills High School</h3>
              <p className="text-slate-500">Class of 2027</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-none">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">
                  GPA
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Unweighted</span>
                    <span className="font-mono font-medium">3.9 / 4.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Weighted</span>
                    <span className="font-mono font-medium">5.3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-none">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">
                  SAT Score
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-900 dark:text-slate-200 font-semibold">Total</span>
                    <span className="font-mono font-bold text-lg text-primary">1520</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span>Math: 780</span>
                    <span>Reading: 740</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-50">Coursework</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">AP Courses</span>
                <Separator className="flex-1" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Chemistry", "Biology", "Calculus BC", "Computer Science A", "Research", "U.S. History"].map(course => (
                  <Badge key={course} variant="secondary" className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 font-normal text-slate-700 dark:text-slate-300">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dual Enrollment</span>
                <Separator className="flex-1" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-100 dark:border-slate-800">
                   <p className="text-xs text-primary font-semibold mb-1">Ohio State University</p>
                   <p className="text-sm text-slate-700 dark:text-slate-300">Multivariable Calculus, Family Financial Management</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-100 dark:border-slate-800">
                   <p className="text-xs text-primary font-semibold mb-1">University of Cincinnati</p>
                   <p className="text-sm text-slate-700 dark:text-slate-300">Statistics 1031, 19th Century Music, Nutrition 101</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
);

const ProjectsSectionContent = () => {
  const scrollRef = import("react").then(m => {
    // This is a bit tricky in a functional component without proper state/ref management inside the component body
    // but I'll implement it within the component below.
  });

  const projects = [
    {
      title: "CrisisAnalyzer: Multimodal Disaster Summarization",
      role: "Research Project Team Lead",
      description: "Led a team developing a multimodal AI system that processes real-time social media data to generate concise summaries for emergency responders.",
      tech: ["Transformers", "NLP", "Computer Vision", "GPT-4o mini", "BERTScore 0.78"],
      awards: ["Most Impactful Research Project (1st of 6 teams)", "Leadership Prestige Award"],
      context: "UC AI Research Internship",
      links: [
        { name: "Research Poster", url: "/attached_assets/ExLAI_Poster_1767460245154.pdf" }
      ]
    },
    {
      title: "Glioblastoma Research: ceRNA Networks via RGCN",
      role: "Principal Investigator",
      description: "Investigating if Relational Graph Convolutional Networks (RGCN) can model miRNA-lncRNA-mRNA networks in Glioblastoma to identify master regulators and treatment targets.",
      tech: ["Graph ML", "PyTorch Geometric", "GNNExplainer", "Bioinformatics"],
      context: "AP Research Project"
    },
    {
      title: "EagleVision: Live Microscope Web Session",
      role: "Developer",
      description: "A web app allowing teachers to stream a phone-mounted microscope feed to student devices with real-time pan/zoom and annotation features.",
      tech: ["WebRTC", "Socket.io", "JavaScript", "HTML5 Canvas"],
      context: "Programming Club Competition"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('projects-container');
    if (container) {
      const card = container.querySelector('.snap-start');
      if (card) {
        const cardWidth = card.clientWidth;
        const gap = 24; // gap-6
        const scrollAmount = cardWidth + gap;
        
        // Calculate the next scroll position based on current scroll position to ensure perfect snapping
        const currentScroll = container.scrollLeft;
        let targetScroll;
        
        if (direction === 'left') {
          // Subtract a small buffer to handle floating point precision and find the previous card
          targetScroll = Math.max(0, Math.round((currentScroll - scrollAmount) / scrollAmount) * scrollAmount);
        } else {
          // Add a small buffer to find the next card
          targetScroll = Math.min(container.scrollWidth - container.clientWidth, Math.round((currentScroll + scrollAmount) / scrollAmount) * scrollAmount);
        }

        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Projects</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-slate-200 dark:border-slate-800"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-slate-200 dark:border-slate-800"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div 
          id="projects-container"
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="min-w-[320px] md:min-w-[700px] snap-start flex-shrink-0"
            >
              <Card className="h-full border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50">{project.title}</CardTitle>
                    <Badge variant="outline" className="text-xs font-normal whitespace-nowrap">{project.context}</Badge>
                  </div>
                  <CardDescription className="text-sm font-medium text-primary">{project.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {project.awards && (
                    <div className="mb-6 space-y-2">
                      {project.awards.map((award, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
                          <span>🏆</span>
                          <span className="font-medium">{award}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-mono text-slate-500 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-2 py-0.5 rounded shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  {project.links && (
                    <div className="flex gap-3">
                      {project.links.map((link, i) => (
                        <a 
                          key={i} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
  );
};

const CommunitySectionContent = () => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Community Outreach</h2>
      
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-12 pb-4">
        {[
          {
            title: "Lakota Robotics FRC Team 1038",
            role: "Autonomous Lead",
            desc: "Program robot control systems in Java; led team to World Championship qualifications and won Regional FIRST Impact Award."
          },
          {
            title: "Ohio Attorney General's Teen Ambassador Board",
            role: "Group Lead",
            desc: "Leading a statewide committee to advise on AI ethics in secondary education and drafting policy recommendations."
          },
          {
            title: "Leukemia & Lymphoma Society",
            role: "Social Media Manager",
            desc: "Co-managed a campaign raising over $75,000 for leukemia research."
          },
          {
            title: "Kumon Math & Reading Center",
            role: "Center Assistant/Volunteer",
            desc: "Managed center operations and volunteered 350+ hours assisting students."
          }
        ].map((item, i) => (
          <div key={i} className="relative pl-8">
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-white dark:border-slate-950 ring-4 ring-white dark:ring-slate-950" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{item.title}</h3>
            <p className="text-sm font-medium text-primary mb-2">{item.role}</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
);

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
        <div className="bg-white dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Left Column: Info */}
            <div className="p-8 md:p-12 bg-slate-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-50">Contact</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Have a project in mind? My inbox is always open for new opportunities.
                </p>
                
                <div className="space-y-6">
                  <a href="https://github.com/SamarthKhandelwal-create" target="_blank" className="flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 group-hover:border-primary/50 transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <span className="font-medium">SamarthKhandelwal-create</span>
                  </a>
                  
                  <a href="mailto:skhandelwal1324@gmail.com" className="flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 group-hover:border-primary/50 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium">skhandelwal1324@gmail.com</span>
                  </a>

                  <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 group">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">513-953-6153</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-8 md:p-12 bg-white dark:bg-slate-950">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus-visible:ring-primary" />
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
                        <FormLabel className="text-slate-700 dark:text-slate-300">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Inquiry" {...field} className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus-visible:ring-primary" />
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
                        <FormLabel className="text-slate-700 dark:text-slate-300">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="resize-none min-h-[120px] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus-visible:ring-primary" 
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
    <div className="h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-primary/20 selection:text-primary overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <DotNavigation activeSection={activeSection} />
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-950 shadow-2xl shadow-slate-200/50 dark:shadow-none min-h-screen flex flex-col">
        
        {/* Top Header Section */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 px-6 md:px-12 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Samarth Khandelwal</h1>
            </div>
            
            <div className="hidden lg:block">
              <Navigation />
            </div>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-8">
                      <h2 className="text-xl font-bold">Samarth Khandelwal</h2>
                    </div>
                    <Navigation mobile onItemClick={() => {}} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Hero Info Section */}
        <section id="hero" className="px-6 md:px-12 lg:px-20 py-12 md:py-20 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-900 flex-shrink-0 snap-start min-h-screen flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-slate-900 dark:text-slate-50 tracking-tight">Samarth Khandelwal</h1>
            <p className="text-xl md:text-2xl font-semibold text-primary mb-6">Aspiring AI Engineer</p>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl">
              Motivated and detail-oriented high school student seeking opportunities to deepen expertise in engineering, AI, and computer science development.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
              >
                Contact Me
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="rounded-full px-8 border-slate-200 dark:border-slate-800"
              >
                Learn More
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Cincinnati, OH
              </div>
              <a href="mailto:skhandelwal1324@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                skhandelwal1324@gmail.com
              </a>
              <div className="flex items-center gap-4 ml-auto">
                <a href="https://github.com/SamarthKhandelwal-create" target="_blank" className="hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 px-6 md:px-12 lg:px-20 bg-white dark:bg-slate-950">
          <section id="about" className="max-w-3xl snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <AboutSectionContent />
          </section>
          
          <section id="academics" className="max-w-3xl border-t border-slate-100 dark:border-slate-800 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <AcademicsSectionContent />
          </section>

          <section id="projects" className="max-w-3xl border-t border-slate-100 dark:border-slate-800 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <ProjectsSectionContent />
          </section>

          <section id="community" className="max-w-3xl border-t border-slate-100 dark:border-slate-800 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <CommunitySectionContent />
          </section>

          <section id="contact" className="border-t border-slate-100 dark:border-slate-800 snap-start scroll-mt-0 min-h-screen flex flex-col justify-center py-16">
            <ContactSectionContent />
          </section>
          
          <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800 snap-end">
          </footer>
        </main>
      </div>
    </div>
  );
}
