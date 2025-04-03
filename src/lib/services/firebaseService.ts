import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  Timestamp,
  serverTimestamp
} from "firebase/firestore";
import { BlogPost, Content, OtherWork, Project, Video } from "../models";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQNSx97VV8Dcln1w8AjDobyXyyG00FvBU",
  authDomain: "portfolio-2be29.firebaseapp.com",
  projectId: "portfolio-2be29",
  storageBucket: "portfolio-2be29.firebasestorage.app",
  messagingSenderId: "859700584283",
  appId: "1:859700584283:web:4a9445abfcdb9c450a447e",
  measurementId: "G-NEYXC93WCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

// Helper to convert Firebase timestamp to ISO string for consistent interface
const convertTimestamps = (doc: DocumentData) => {
  const data = { ...doc };
  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate().toISOString();
    }
  });
  return data;
};

// Projects collection
export const getProjects = async () => {
  try {
    const projectsQuery = query(
      collection(db, "projects"), 
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(projectsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Project[];
  } catch (error) {
    console.error("Error getting projects:", error);
    return [];
  }
};

export const getFeaturedProjects = async () => {
  try {
    const projectsQuery = query(
      collection(db, "projects"),
      where("featured", "==", true),
      where("status", "==", "Published"),
      limit(6)
    );
    const snapshot = await getDocs(projectsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Project[];
  } catch (error) {
    console.error("Error getting featured projects:", error);
    return [];
  }
};

export const getProjectById = async (id: string) => {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      } as Project;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting project:", error);
    return null;
  }
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newProject = await getDoc(docRef);
    return {
      id: docRef.id,
      ...convertTimestamps(newProject.data() || {})
    } as Project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  try {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp()
    });
    
    const updatedDoc = await getDoc(docRef);
    return {
      id,
      ...convertTimestamps(updatedDoc.data() || {})
    } as Project;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, "projects", id));
    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Blog Posts collection
export const getBlogPosts = async () => {
  try {
    const blogPostsQuery = query(
      collection(db, "blogPosts"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(blogPostsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as BlogPost[];
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
};

export const getFeaturedBlogPosts = async () => {
  try {
    const blogPostsQuery = query(
      collection(db, "blogPosts"),
      where("featured", "==", true),
      where("status", "==", "Published"),
      limit(3)
    );
    const snapshot = await getDocs(blogPostsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as BlogPost[];
  } catch (error) {
    console.error("Error getting featured blog posts:", error);
    return [];
  }
};

export const getBlogPostById = async (id: string) => {
  try {
    const docRef = doc(db, "blogPosts", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      } as BlogPost;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting blog post:", error);
    return null;
  }
};

export const createBlogPost = async (blogPost: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, "blogPosts"), {
      ...blogPost,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newBlogPost = await getDoc(docRef);
    return {
      id: docRef.id,
      ...convertTimestamps(newBlogPost.data() || {})
    } as BlogPost;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, blogPost: Partial<BlogPost>) => {
  try {
    const docRef = doc(db, "blogPosts", id);
    await updateDoc(docRef, {
      ...blogPost,
      updatedAt: serverTimestamp()
    });
    
    const updatedDoc = await getDoc(docRef);
    return {
      id,
      ...convertTimestamps(updatedDoc.data() || {})
    } as BlogPost;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    await deleteDoc(doc(db, "blogPosts", id));
    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};

// Other Works collection
export const getOtherWorks = async () => {
  try {
    const worksQuery = query(
      collection(db, "otherWorks"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(worksQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as OtherWork[];
  } catch (error) {
    console.error("Error getting other works:", error);
    return [];
  }
};

export const getFeaturedOtherWorks = async () => {
  try {
    const worksQuery = query(
      collection(db, "otherWorks"),
      where("featured", "==", true),
      where("status", "==", "Published"),
      limit(3)
    );
    const snapshot = await getDocs(worksQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as OtherWork[];
  } catch (error) {
    console.error("Error getting featured other works:", error);
    return [];
  }
};

export const getOtherWorkById = async (id: string) => {
  try {
    const docRef = doc(db, "otherWorks", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      } as OtherWork;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting other work:", error);
    return null;
  }
};

export const createOtherWork = async (work: Omit<OtherWork, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, "otherWorks"), {
      ...work,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newWork = await getDoc(docRef);
    return {
      id: docRef.id,
      ...convertTimestamps(newWork.data() || {})
    } as OtherWork;
  } catch (error) {
    console.error("Error creating other work:", error);
    throw error;
  }
};

export const updateOtherWork = async (id: string, work: Partial<OtherWork>) => {
  try {
    const docRef = doc(db, "otherWorks", id);
    await updateDoc(docRef, {
      ...work,
      updatedAt: serverTimestamp()
    });
    
    const updatedDoc = await getDoc(docRef);
    return {
      id,
      ...convertTimestamps(updatedDoc.data() || {})
    } as OtherWork;
  } catch (error) {
    console.error("Error updating other work:", error);
    throw error;
  }
};

export const deleteOtherWork = async (id: string) => {
  try {
    await deleteDoc(doc(db, "otherWorks", id));
    return true;
  } catch (error) {
    console.error("Error deleting other work:", error);
    throw error;
  }
};

// Content/Videos collection
export const getContents = async () => {
  try {
    const contentsQuery = query(
      collection(db, "contents"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(contentsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Content[];
  } catch (error) {
    console.error("Error getting contents:", error);
    return [];
  }
};

export const getVideos = async () => {
  try {
    const videosQuery = query(
      collection(db, "contents"),
      where("isVideo", "==", true),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(videosQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Video[];
  } catch (error) {
    console.error("Error getting videos:", error);
    return [];
  }
};

export const getFeaturedVideos = async () => {
  try {
    const videosQuery = query(
      collection(db, "contents"),
      where("isVideo", "==", true),
      where("featured", "==", true),
      where("status", "==", "Published"),
      limit(2)
    );
    const snapshot = await getDocs(videosQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Video[];
  } catch (error) {
    console.error("Error getting featured videos:", error);
    return [];
  }
};

export const getContentById = async (id: string) => {
  try {
    const docRef = doc(db, "contents", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      } as Content;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting content:", error);
    return null;
  }
};

export const createContent = async (content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, "contents"), {
      ...content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newContent = await getDoc(docRef);
    return {
      id: docRef.id,
      ...convertTimestamps(newContent.data() || {})
    } as Content;
  } catch (error) {
    console.error("Error creating content:", error);
    throw error;
  }
};

export const updateContent = async (id: string, content: Partial<Content>) => {
  try {
    const docRef = doc(db, "contents", id);
    await updateDoc(docRef, {
      ...content,
      updatedAt: serverTimestamp()
    });
    
    const updatedDoc = await getDoc(docRef);
    return {
      id,
      ...convertTimestamps(updatedDoc.data() || {})
    } as Content;
  } catch (error) {
    console.error("Error updating content:", error);
    throw error;
  }
};

export const deleteContent = async (id: string) => {
  try {
    await deleteDoc(doc(db, "contents", id));
    return true;
  } catch (error) {
    console.error("Error deleting content:", error);
    throw error;
  }
};

// Initialize database with some basic collections if they don't exist
export const initializeDatabase = async () => {
  try {
    // Check if collections exist, if not, create them
    const collections = ["projects", "blogPosts", "otherWorks", "contents"];
    
    for (const collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      
      // If collection is empty, we could add some sample data here
      if (snapshot.empty) {
        console.log(`Collection ${collectionName} is empty. You may want to add some initial data.`);
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
};

// Export Firebase instances in case they're needed elsewhere
export { app, db };
