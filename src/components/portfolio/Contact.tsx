import { motion } from "framer-motion";
import { Section } from "./Section";
import { Mail, Phone, Linkedin, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

// Initialize EmailJS
emailjs.init("TRaRHPIP4K1IL8jzU");

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { 
      toast.error(parsed.error.issues[0].message); 
      return; 
    }
    
    setLoading(true);
    try {
      const response = await emailjs.send(
        "service_sdyhhcd", // Service ID
        "template_pad4f3a", // Template ID
        {
          from_name: parsed.data.name,
          from_email: parsed.data.email,
          subject: parsed.data.subject || "Portfolio Contact",
          message: parsed.data.message,
        }
      );
      
      console.log("Email sent successfully:", response);
      toast.success("Message sent — I'll get back to you soon!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("EmailJS Error Details:", error);
      toast.error(error?.text || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something" subtitle="Have a role, project or idea in mind? I'd love to hear from you.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { Icon: Mail, label: "Email", value: "pa.repuri45@gmail.com", href: "mailto:pa.repuri45@gmail.com" },
            { Icon: Phone, label: "Phone", value: "+91 8520898133", href: "tel:+918520898133" },
            { Icon: Linkedin, label: "LinkedIn", value: "prema-akshaja-repuri", href: "https://linkedin.com/in/prema-akshaja-repuri-10604231a" },
          ].map(({ Icon, label, value, href }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="glass card-shadow flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-bg text-primary-foreground">
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                <div className="font-medium">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass card-shadow space-y-4 rounded-2xl p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          </div>
          <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
          </div>
          <button disabled={loading} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground gradient-bg glow transition-transform hover:scale-[1.02] disabled:opacity-60">
            {loading ? "Sending…" : (<>Send Message <Send size={16} /></>)}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
    </div>
  );
}