import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSection<T extends Record<string, unknown>>(section: string, defaults: T) {
  const [content, setContent] = useState<T>(defaults);
  useEffect(() => {
    let alive = true;
    supabase.from("site_content").select("content").eq("section", section).maybeSingle().then(({ data }) => {
      if (alive && data?.content) setContent({ ...defaults, ...(data.content as T) });
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);
  return content;
}

export type ServiceRow = { id: string; title: string; description: string; icon: string; display_order: number };

export function useServices() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  useEffect(() => {
    supabase.from("services").select("*").order("display_order").then(({ data }) => {
      setServices((data ?? []) as ServiceRow[]);
    });
  }, []);
  return services;
}