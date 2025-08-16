'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="p-4 space-y-8 pt-20">
          {posts.length === 0 ? (
            <p className="text-center text-green-800">No posts yet. Upload one!</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
