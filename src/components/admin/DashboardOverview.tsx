
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  FilePenLine, 
  FileVideo, 
  Code, 
  Briefcase, 
  Mail, 
  CalendarClock, 
  AlertTriangle,
  RefreshCcw,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { initializeDatabaseWithSampleData, checkIfCollectionsEmpty } from '@/lib/services/databaseInitializer';

interface StatsCardProps {
  title: string;
  value: number | string;
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
  const [isInitializing, setIsInitializing] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState<boolean | null>(null);
  
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      // This would normally fetch stats from your API
      // For now, we'll just check if collections are empty
      const isEmpty = await checkIfCollectionsEmpty();
      setIsDataEmpty(isEmpty);
      
      // Return dummy stats for now
      return {
        projects: 0,
        blogPosts: 0,
        videos: 0,
        otherWorks: 0,
        messages: 0,
        meetings: 0,
      };
    }
  });
  
  const handleInitializeDatabase = async () => {
    setIsInitializing(true);
    try {
      await initializeDatabaseWithSampleData();
      // Refetch stats after initialization
      await new Promise(resolve => setTimeout(resolve, 1000)); // Short delay
    } catch (error) {
      console.error("Error initializing database:", error);
    } finally {
      setIsInitializing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your website content and statistics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            onClick={handleInitializeDatabase}
            disabled={isInitializing}
            className="flex items-center gap-2"
          >
            {isInitializing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
            Initialize Sample Data
          </Button>
        </div>
      </div>
      
      {isDataEmpty && (
        <Alert className="bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-900">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertTitle className="text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
            No Content Found
          </AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-400">
            Your database appears to be empty. Click the "Initialize Sample Data" button above
            to populate your portfolio with sample content. You can then edit or delete these
            items as needed.
          </AlertDescription>
        </Alert>
      )}
      
      {isDataEmpty === false && (
        <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300 flex items-center gap-2">
            Content Available
          </AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            Your database has content. You can manage your portfolio items from the respective sections.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Projects"
          value={isStatsLoading ? "..." : stats?.projects || 0}
          description="Total projects in your portfolio"
          icon={<Code className="h-4 w-4" />}
        />
        <StatsCard
          title="Blog Posts"
          value={isStatsLoading ? "..." : stats?.blogPosts || 0}
          description="Published articles and tutorials"
          icon={<FilePenLine className="h-4 w-4" />}
        />
        <StatsCard
          title="Videos"
          value={isStatsLoading ? "..." : stats?.videos || 0}
          description="Video content and tutorials"
          icon={<FileVideo className="h-4 w-4" />}
        />
        <StatsCard
          title="Other Works"
          value={isStatsLoading ? "..." : stats?.otherWorks || 0}
          description="Designs, consultations, and more"
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatsCard
          title="Messages"
          value={isStatsLoading ? "..." : stats?.messages || 0}
          description="Contact form submissions"
          icon={<Mail className="h-4 w-4" />}
        />
        <StatsCard
          title="Scheduled Calls"
          value={isStatsLoading ? "..." : stats?.meetings || 0}
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
        <CardFooter>
          <Button variant="outline" className="w-full">
            Connect Analytics
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardOverview;
