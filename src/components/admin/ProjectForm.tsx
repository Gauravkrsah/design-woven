
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createProject, updateProject } from '@/lib/services/apiService';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Must be a valid URL'),
  link: z.string().default('#'),
  githubLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  liveDemo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  category: z.string().min(2, 'Category is required'),
  tags: z.string(), // We'll split this into an array
  status: z.enum(['Draft', 'Published'])
});

export type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editProject?: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ open, onOpenChange, editProject }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      link: '#',
      githubLink: '',
      liveDemo: '',
      category: '',
      tags: '',
      status: 'Draft'
    }
  });
  
  React.useEffect(() => {
    if (editProject) {
      setValue('title', editProject.title);
      setValue('description', editProject.description);
      setValue('imageUrl', editProject.imageUrl);
      setValue('link', editProject.link || '#');
      setValue('githubLink', editProject.githubLink || '');
      setValue('liveDemo', editProject.liveDemo || '');
      setValue('category', editProject.category);
      setValue('tags', editProject.tags.join(', '));
      setValue('status', editProject.status);
    } else {
      reset();
    }
  }, [editProject, setValue, reset]);
  
  const createMutation = useMutation({
    mutationFn: (data: ProjectFormValues) => {
      // Convert tags from comma-separated string to array
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        featured: false
      };
      
      return createProject(formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Project created',
        description: 'The project has been successfully created.',
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: (data: ProjectFormValues) => {
      // Convert tags from comma-separated string to array
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };
      
      return updateProject(editProject.id, formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Project updated',
        description: 'The project has been successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  });
  
  const onSubmit = (data: ProjectFormValues) => {
    if (editProject) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };
  
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={5} {...register('description')} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" {...register('imageUrl')} />
              {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">Project Link</Label>
              <Input id="link" {...register('link')} />
              {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub URL (Optional)</Label>
                <Input id="githubLink" {...register('githubLink')} />
                {errors.githubLink && <p className="text-red-500 text-sm">{errors.githubLink.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="liveDemo">Live Demo URL (Optional)</Label>
                <Input id="liveDemo" {...register('liveDemo')} />
                {errors.liveDemo && <p className="text-red-500 text-sm">{errors.liveDemo.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register('category')} />
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) => setValue('status', value as 'Draft' | 'Published')}
                  defaultValue={editProject ? editProject.status : 'Draft'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" {...register('tags')} />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editProject ? 'Update Project' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
