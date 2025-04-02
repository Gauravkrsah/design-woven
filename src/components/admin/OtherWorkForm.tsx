
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
import { createOtherWork, updateOtherWork } from '@/lib/services/apiService';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Must be a valid URL'),
  category: z.string().min(2, 'Category is required'),
  clientName: z.string().optional(),
  completionDate: z.string().optional(),
  projectUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  status: z.enum(['Draft', 'Published']), // Changed to match the expected case
  technologies: z.string() // We'll split this into an array
});

export type OtherWorkFormValues = z.infer<typeof formSchema>;

interface OtherWorkFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editOtherWork?: any;
}

const OtherWorkForm: React.FC<OtherWorkFormProps> = ({ open, onOpenChange, editOtherWork }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<OtherWorkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      category: '',
      clientName: '',
      completionDate: '',
      projectUrl: '',
      status: 'Draft', // Changed to match the expected case
      technologies: ''
    }
  });
  
  React.useEffect(() => {
    if (editOtherWork) {
      setValue('title', editOtherWork.title);
      setValue('description', editOtherWork.description);
      setValue('imageUrl', editOtherWork.imageUrl);
      setValue('category', editOtherWork.category);
      setValue('clientName', editOtherWork.clientName || '');
      setValue('completionDate', editOtherWork.completionDate || '');
      setValue('projectUrl', editOtherWork.projectUrl || '');
      // Convert the status to match our enum case if needed
      setValue('status', editOtherWork.status === 'published' ? 'Published' : 
              editOtherWork.status === 'draft' ? 'Draft' : editOtherWork.status);
      setValue('technologies', Array.isArray(editOtherWork.technologies) ? 
              editOtherWork.technologies.join(', ') : '');
    } else {
      reset();
    }
  }, [editOtherWork, setValue, reset]);
  
  const createMutation = useMutation({
    mutationFn: (data: OtherWorkFormValues) => {
      // Convert technologies from comma-separated string to array
      const formattedData = {
        title: data.title, // Ensure title is provided (not optional)
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        date: data.completionDate || new Date().toISOString().split('T')[0], // Ensure date is provided
        link: data.projectUrl || '',
        technologies: data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== ''),
        featured: false, // Ensure featured is provided
        status: data.status
      };
      
      return createOtherWork(formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Work created',
        description: 'The work has been successfully created.',
      });
      queryClient.invalidateQueries({ queryKey: ['otherWorks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create work: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: (data: OtherWorkFormValues) => {
      // Convert technologies from comma-separated string to array
      const formattedData = {
        title: data.title, // Ensure title is provided (not optional)
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        date: data.completionDate || (editOtherWork.date || new Date().toISOString().split('T')[0]), // Use existing date or create new
        link: data.projectUrl || '',
        technologies: data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== ''),
        status: data.status
      };
      
      return updateOtherWork(editOtherWork.id, formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Work updated',
        description: 'The work has been successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['otherWorks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update work: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  });
  
  const onSubmit = (data: OtherWorkFormValues) => {
    if (editOtherWork) {
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
          <DialogTitle>{editOtherWork ? 'Edit Other Work' : 'Add New Other Work'}</DialogTitle>
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
                  defaultValue={editOtherWork ? 
                    (editOtherWork.status === 'published' ? 'Published' : 
                     editOtherWork.status === 'draft' ? 'Draft' : editOtherWork.status) 
                    : 'Draft'}
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name (Optional)</Label>
                <Input id="clientName" {...register('clientName')} />
                {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="completionDate">Completion Date (Optional)</Label>
                <Input id="completionDate" type="date" {...register('completionDate')} />
                {errors.completionDate && <p className="text-red-500 text-sm">{errors.completionDate.message}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectUrl">Project URL (Optional)</Label>
              <Input id="projectUrl" {...register('projectUrl')} />
              {errors.projectUrl && <p className="text-red-500 text-sm">{errors.projectUrl.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input id="technologies" {...register('technologies')} />
              {errors.technologies && <p className="text-red-500 text-sm">{errors.technologies.message}</p>}
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editOtherWork ? 'Update Work' : 'Create Work'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OtherWorkForm;
