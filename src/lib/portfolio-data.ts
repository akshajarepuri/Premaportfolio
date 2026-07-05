import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Project = { id: string; title: string; description: string; long_description: string | null; image_url: string | null; tech: string[]; github_url: string | null; live_url: string | null; featured: boolean; sort_order: number };
export type Skill = { id: string; category: string; name: string; level: number | null; sort_order: number };
export type Experience = { id: string; role: string; company: string; period: string; description: string; bullets: string[]; sort_order: number };
export type Education = { id: string; institution: string; degree: string; period: string; score: string | null; sort_order: number };
export type Achievement = { id: string; title: string; description: string; year: string | null; sort_order: number };
export type Certification = { id: string; name: string; issuer: string; year: string | null; url: string | null; sort_order: number };
export type Service = { id: string; title: string; description: string; icon: string | null; sort_order: number };

const list = <T,>(table: string) => async (): Promise<T[]> => {
  const { data, error } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as T[];
};

export const useProjects = () => useQuery({ queryKey: ["projects"], queryFn: list<Project>("projects") });
export const useSkills = () => useQuery({ queryKey: ["skills"], queryFn: list<Skill>("skills") });
export const useExperience = () => useQuery({ queryKey: ["experience"], queryFn: list<Experience>("experience") });
export const useEducation = () => useQuery({ queryKey: ["education"], queryFn: list<Education>("education") });
export const useAchievements = () => useQuery({ queryKey: ["achievements"], queryFn: list<Achievement>("achievements") });
export const useCertifications = () => useQuery({ queryKey: ["certifications"], queryFn: list<Certification>("certifications") });
export const useServices = () => useQuery({ queryKey: ["services"], queryFn: list<Service>("services") });