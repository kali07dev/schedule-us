// components/layout/nav-groups.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Grip, Plus, Tag } from "lucide-react";
import { Group, GoalWithProgress } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function NavGroups({ onAddGroup, onGroupsLoad }: { onAddGroup: () => void; onGroupsLoad: (groups: Group[]) => void }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [goals, setGoals] = useState<GoalWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, goalsRes] = await Promise.all([ fetch("/api/groups"), fetch("/api/goals") ]);
        const groupsData = await groupsRes.json();
        const goalsData = await goalsRes.json();
        setGroups(groupsData);
        onGroupsLoad(groupsData);
        setGoals(goalsData);
      } catch (error) {
        console.error("Failed to fetch sidebar data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pathname, router, onGroupsLoad]);

  const goalCategories = useMemo(() => {
    const categoryMap = new Map<string, { color: string }>();
    goals.forEach((goal) => {
        const category = goal.name;
        if (!categoryMap.has(category)) {
            categoryMap.set(category, { color: goal.color || '#71717a' });
        }
    });
    return Array.from(categoryMap.entries()).map(([name, data]) => ({ name, ...data }));
  }, [goals]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-6 w-1/2" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" />
        <Skeleton className="h-6 w-1/3 mt-4" /><Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <div className="p-2 mt-4">
      <SidebarGroup>
        <SidebarGroupLabel className="flex items-center"> Groups
          <SidebarMenuAction onClick={onAddGroup} className="ml-auto"><Plus className="size-4" /></SidebarMenuAction>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {groups.map((group) => (
              <SidebarMenuItem key={group.id}>
                <SidebarMenuButton asChild isActive={pathname === `/groups/${group.id}`}>
                  <Link href={`/groups/${group.id}`}><Grip className="size-4" /><span className="truncate">{group.name === '<self>' ? 'Personal' : group.name}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup className="mt-4">
        <SidebarGroupLabel>Categories</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {goalCategories.map((cat) => (
              <SidebarMenuItem key={cat.name}>
                <SidebarMenuButton asChild>
                  <Link href={`/category/${cat.name}`}><Tag className="size-4" style={{ color: cat.color }} /><span className="truncate">{cat.name}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}