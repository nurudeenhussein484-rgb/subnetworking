// EDIT HERE: all client-facing content lives in this file.
import { Compass, Network, Wrench, ClipboardCheck, ShieldCheck, MessagesSquare, Cog, Users } from "lucide-react";
export const PHONE = "+234 707 869 3219";
export const WA = "2347078693219";
export const LOCATION = "Ilorin, Kwara State, Nigeria";
export const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
export const DEFAULT_MSG = "Hello Subnetworking, I found your website and I'd like to make an enquiry about a project.";
export const NAV = ["Home", "About", "Services", "Projects", "Contact"];
// PROVISIONAL categories: replace once the business confirms its services.
export const SERVICES = [
  { icon: Compass, title: "Engineering Consultancy", text: "Professional technical guidance and engineering-focused support for projects and businesses." },
  { icon: Network, title: "Network & Infrastructure", text: "Solutions designed around reliable connectivity and technical infrastructure." },
  { icon: Wrench, title: "Technical Solutions", text: "Practical technology and engineering solutions tailored to specific requirements." },
  { icon: ClipboardCheck, title: "Project Support", text: "Technical assistance and support throughout the project lifecycle." },
];
export const WHY = [
  { icon: ShieldCheck, title: "Reliability", text: "Solutions designed with performance and dependability in mind." },
  { icon: MessagesSquare, title: "Professional Approach", text: "Clear communication and attention to project requirements." },
  { icon: Cog, title: "Practical Expertise", text: "Technology and engineering focused on solving real problems." },
  { icon: Users, title: "Client Focus", text: "Solutions built around the needs of each client." },
];
// PLACEHOLDERS: swap for real projects. Add `image: "/projects/x.jpg"` (in /public) to show a real photo.
export const PROJECTS = [
  { category: "Category (to be confirmed)", title: "Project Title Placeholder 1", text: "Replace with a short description of a real completed project.", image: null },
  { category: "Category (to be confirmed)", title: "Project Title Placeholder 2", text: "Replace with a short description of a real completed project.", image: null },
  { category: "Category (to be confirmed)", title: "Project Title Placeholder 3", text: "Replace with a short description of a real completed project.", image: null },
];
export const INTRO = "Practical technical solutions with a focus on quality, reliability and client needs.";
// Replace with the business's official description when available.
export const ABOUT_TEXT = "Subnetworking is an engineering and technology-focused business based in Ilorin, Kwara State, providing professional solutions tailored to the needs of its clients.";
