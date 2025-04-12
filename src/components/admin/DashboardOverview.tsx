
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, FilePenLine, FileVideo, Code, Briefcase, Mail, CalendarClock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon }) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground pt-1">{description}</p>
    </CardContent>
  </Card>
);

const DashboardOverview: React.FC = () => {
  // This would normally fetch stats from your API
  const stats = {
    projects: 3,
    blogPosts: 5,
    videos: 2,
    otherWorks: 4,
    messages: 12,
    meetings: 2
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your website content and statistics
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Projects"
          value={stats.projects}
          description="Total projects in your portfolio"
          icon={<Code className="h-4 w-4" />}
        />
        <StatsCard
          title="Blog Posts"
          value={stats.blogPosts}
          description="Published articles and tutorials"
          icon={<FilePenLine className="h-4 w-4" />}
        />
        <StatsCard
          title="Videos"
          value={stats.videos}
          description="Video content and tutorials"
          icon={<FileVideo className="h-4 w-4" />}
        />
        <StatsCard
          title="Other Works"
          value={stats.otherWorks}
          description="Designs, consultations, and more"
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatsCard
          title="Messages"
          value={stats.messages}
          description="Contact form submissions"
          icon={<Mail className="h-4 w-4" />}
        />
        <StatsCard
          title="Scheduled Calls"
          value={stats.meetings}
          description="Upcoming client meetings"
          icon={<CalendarClock className="h-4 w-4" />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>
            Website traffic and engagement over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <BarChart3 className="h-16 w-16 text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-sm text-muted-foreground">
              Analytics data will be displayed here once connected to your analytics service.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
