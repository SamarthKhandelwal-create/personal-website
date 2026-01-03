import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

// --- Sidebar / Navigation ---

const Navigation = ({ mobile = false, onItemClick }: { mobile?: boolean, onItemClick?: () => void }) => {
  const links = [
    { name: "About", id: "about", icon: <Users className="w-4 h-4" /> },
    { name: "Academics", id: "academics", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Projects", id: "projects", icon: <Code2 className="w-4 h-4" /> },
    { name: "Community", id: "community", icon: <Users className="w-4 h-4" /> },
    { name: "Contact", id: "contact", icon: <MessageSquare className="w-4 h-4" /> },
    { name: "Resume", id: "resume", icon: <FileText className="w-4 h-4" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      if (onItemClick) onItemClick();
    }
  };

  return (
    <nav className={`flex ${mobile ? "flex-col space-y-4" : "flex-col space-y-2"} w-full`}>
      {links.map((link) => (
        <button
          key={link.name}
          onClick={() => scrollToSection(link.id)}
          className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-left group`}
          data-testid={`nav-${link.id}`}
        >
          <span className="text-slate-400 group-hover:text-primary transition-colors">{link.icon}</span>
          {link.name}
        </button>
      ))}
    </nav>
  );
};

const Sidebar = () => {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between p-8 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Samarth Khandelwal</h1>
          <p className="mt-2 text-lg text-primary font-medium">High School Student</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Engineering, Computer Science, AI</p>
          
          <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <p className="leading-relaxed font-medium">
              Building transformer models for disaster relief and applying deep learning to bioinformatics.
            </p>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4" />
              West Chester, OH
            </div>
          </div>
        </div>

        <Navigation />
      </div>

      <div className="flex gap-4">
        <a href="https://github.com/SamarthKhandelwal-create" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="mailto:skhandelwal1324@gmail.com" className="text-slate-400 hover:text-primary transition-colors">
          <Mail className="w-5 h-5" />
        </a>
        <a href="#" className="text-slate-400 hover:text-primary transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

const MobileHeader = () => {
  return (
    <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <span className="font-bold text-lg">Samarth Khandelwal</span>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-6">
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-xl font-bold">Samarth Khandelwal</h2>
              <p className="text-sm text-muted-foreground">Engineering, CS, & AI</p>
            </div>
            <Navigation mobile onItemClick={() => {}} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// --- Content Sections ---

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 max-w-3xl">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">About Me</h2>
      <div className="prose dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
        <p className="mb-6">
          I am a motivated and detail-oriented high school student with a passion for <span className="font-medium text-primary">engineering, computer science, and AI development</span>. I have experience applying advanced concepts, such as transformer models, to real-world challenges like social media analysis for emergency response.
        </p>
        <p>
          Recognized for leadership and impact, I have contributed to raising over <span className="font-medium text-slate-900 dark:text-white">$75,000 for cancer research</span> and earned awards in national engineering competitions. I am currently seeking opportunities to deepen my expertise and contribute to meaningful technological innovations.
        </p>
      </div>
    </motion.div>
  </section>
);

const AcademicsSection = () => (
  <section id="academics" className="py-16 md:py-24 max-w-3xl border-t border-slate-100 dark:border-slate-800">
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
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Grade Point Average
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
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-50">Relevant Coursework</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Advanced Placement</span>
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
                   <p className="text-xs text-primary font-semibold mb-1">University of Cincinnati</p>
                   <p className="text-sm text-slate-700 dark:text-slate-300">Statistics 1031, 19th Century Music, Nutrition 101</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-100 dark:border-slate-800">
                   <p className="text-xs text-primary font-semibold mb-1">Ohio State University</p>
                   <p className="text-sm text-slate-700 dark:text-slate-300">Family Financial Management</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const ProjectsSection = () => {
  const projects = [
    {
      title: "CrisisAnalyzer: Multimodal Disaster Summarization",
      role: "Research Project Team Lead",
      description: "Led a team developing a multimodal AI system that processes real-time social media data to generate concise summaries for emergency responders.",
      tech: ["Transformers", "NLP", "Computer Vision", "GPT-4o mini", "BERTScore 0.78"],
      awards: ["Most Impactful Research Project (1st of 6 teams)", "Leadership Prestige Award"],
      context: "UC AI Research Internship"
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

  return (
    <section id="projects" className="py-16 md:py-24 max-w-3xl border-t border-slate-100 dark:border-slate-800">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">Projects</h2>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeIn}>
              <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-primary transition-colors">{project.title}</h3>
                  <Badge variant="outline" className="w-fit text-xs font-normal text-slate-500 border-slate-300 dark:border-slate-700">{project.context}</Badge>
                </div>
                
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{project.role}</p>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {project.awards && (
                  <div className="mb-4 flex flex-col gap-2">
                    {project.awards.map((award, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
                        <span className="text-lg">🏆</span>
                        <span className="font-medium">{award}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const CommunitySection = () => (
  <section id="community" className="py-16 md:py-24 max-w-3xl border-t border-slate-100 dark:border-slate-800">
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
            desc: "Co-managed a campaign raising over $75,000 for cancer research."
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
  </section>
);

// --- Contact Form ---

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactSection = () => {
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
    <section id="contact" className="py-16 md:py-24 border-t border-slate-100 dark:border-slate-800">
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
    </section>
  );
};

const ResumeSection = () => (
  <section id="resume" className="py-24 border-t border-slate-100 dark:border-slate-800">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-50">Resume</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
        Interested in learning more about my experience and skills? Download my full resume below.
      </p>
      <Button 
        size="lg" 
        className="gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8"
        onClick={() => window.open("/resume.pdf", "_blank")}
      >
        <Download className="w-5 h-5" />
        Download Resume
      </Button>
    </motion.div>
  </section>
);


// --- Main Page Component ---

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-primary/20 selection:text-primary">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto bg-white dark:bg-slate-950 shadow-2xl shadow-slate-200/50 dark:shadow-none min-h-screen">
        
        {/* Sidebar Container (Desktop) */}
        <aside className="hidden lg:block w-80 flex-shrink-0 relative">
          <Sidebar />
        </aside>

        {/* Mobile Header */}
        <MobileHeader />

        {/* Main Content Area */}
        <main className="flex-1 px-6 md:px-12 lg:px-20 py-8 bg-white dark:bg-slate-950">
          <AboutSection />
          <AcademicsSection />
          <ProjectsSection />
          <CommunitySection />
          <ContactSection />
          <ResumeSection />
          
          <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800 mt-12">
            <p>© {new Date().getFullYear()} Samarth Khandelwal. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
