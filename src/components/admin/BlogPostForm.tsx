
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, User, Clock, Image, Tag, FileText } from 'lucide-react';
import { createBlogPost, updateBlogPost } from '@/lib/services/firebaseService';

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
  
  const form = useForm<BlogPostFormValues>({
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
      form.setValue('title', editBlogPost.title);
      form.setValue('content', editBlogPost.content || '');
      form.setValue('imageUrl', editBlogPost.imageUrl);
      form.setValue('excerpt', editBlogPost.excerpt);
      form.setValue('category', editBlogPost.category || '');
      form.setValue('tags', editBlogPost.tags.join ? editBlogPost.tags.join(', ') : editBlogPost.tags);
      form.setValue('status', editBlogPost.status);
      form.setValue('authorName', editBlogPost.authorName || editBlogPost.author || 'Gaurav Kr Sah');
    } else {
      form.reset();
    }
  }, [editBlogPost, form]);
  
  const createMutation = useMutation({
    mutationFn: (data: BlogPostFormValues) => {
      // Calculate approximate reading time based on content length
      const wordCount = data.content.trim().split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Assume 200 words per minute reading speed
      
      // Convert tags from comma-separated string to array
      const formattedData = {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        author: data.authorName,
        readTime: `${readTime} min read`,
        readingTime: `${readTime} min read`, // For consistency with other components
        featured: false,
        status: data.status
      };
      
      return createBlogPost(formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Blog post created',
        description: 'The blog post has been successfully created.',
      });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      form.reset();
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
      // Calculate approximate reading time based on content length
      const wordCount = data.content.trim().split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Assume 200 words per minute reading speed
      
      // Convert tags from comma-separated string to array
      const formattedData = {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        author: data.authorName,
        readTime: `${readTime} min read`,
        readingTime: `${readTime} min read`, // For consistency
        status: data.status
      };
      
      return updateBlogPost(editBlogPost.id, formattedData);
    },
    onSuccess: () => {
      toast({
        title: 'Blog post updated',
        description: 'The blog post has been successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost', editBlogPost.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      form.reset();
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{editBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <div className="flex relative">
                          <Image className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-8" placeholder="Enter image URL" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <div className="flex relative">
                          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-8" placeholder="Author name" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief summary of your blog post" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A short summary that will appear in blog listings
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Textarea 
                          className="min-h-[250px] pl-8" 
                          placeholder="Write your blog post content here..."
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Supports basic markdown formatting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Programming">Programming</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Career">Career</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div className="flex relative">
                        <Tag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-8" placeholder="React, Web Development, Tutorial" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Separate tags with commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="mt-6 gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-1">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {editBlogPost ? 'Update Blog Post' : 'Create Blog Post'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostForm;
