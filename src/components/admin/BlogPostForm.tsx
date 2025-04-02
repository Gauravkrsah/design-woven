
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
import { createBlogPost, updateBlogPost } from '@/lib/services/apiService';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  imageUrl: z.string().url('Must be a valid URL'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  tags: z.string(), // We'll split this into an array
  status: z.enum(['Draft', 'Published']),
  authorName: z.string().min(2, 'Author name is required')
});

export type BlogPostFormValues = z.infer<typeof formSchema>;

interface BlogPostFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editBlogPost?: any;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ open, onOpenChange, editBlogPost }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      imageUrl: '',
      excerpt: '',
      category: '',
      tags: '',
      status: 'Draft',
      authorName: 'Gaurav Kr Sah'
    }
  });
  
  React.useEffect(() => {
    if (editBlogPost) {
      setValue('title', editBlogPost.title);
      setValue('content', editBlogPost.content);
      setValue('imageUrl', editBlogPost.imageUrl);
      setValue('excerpt', editBlogPost.excerpt);
      setValue('category', editBlogPost.category);
      setValue('tags', editBlogPost.tags.join(', '));
      setValue('status', editBlogPost.status);
      setValue('authorName', editBlogPost.authorName || editBlogPost.author || 'Gaurav Kr Sah');
    } else {
      reset();
    }
  }, [editBlogPost, setValue, reset]);
  
  const createMutation = useMutation({
    mutationFn: (data: BlogPostFormValues) => {
      // Convert tags from comma-separated string to array
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        author: data.authorName,
        readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
        featured: false
      };
      
      return createBlogPost(formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Blog post created',
        description: 'The blog post has been successfully created.',
      });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: (data: BlogPostFormValues) => {
      // Convert tags from comma-separated string to array
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        author: data.authorName,
        readTime: editBlogPost.readTime
      };
      
      return updateBlogPost(editBlogPost.id, formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Blog post updated',
        description: 'The blog post has been successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  });
  
  const onSubmit = (data: BlogPostFormValues) => {
    if (editBlogPost) {
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
          <DialogTitle>{editBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Featured Image URL</Label>
                <Input id="imageUrl" {...register('imageUrl')} />
                {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name</Label>
                <Input id="authorName" {...register('authorName')} />
                {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName.message}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" rows={2} {...register('excerpt')} />
              {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" rows={10} {...register('content')} />
              {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
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
                  defaultValue={editBlogPost ? editBlogPost.status : 'Draft'}
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
              {editBlogPost ? 'Update Blog Post' : 'Create Blog Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostForm;
