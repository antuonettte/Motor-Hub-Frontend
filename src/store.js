// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useStore = create(persist(set => ({
  currentUser: null,
  posts: [],
  feedResults: [],
  searchTerm: '',
  users: {},
  searchResults: { posts: [], users: [] },
  setCurrentUser: (currentUser) => set({ currentUser }),
  setPosts: (posts) => set({ posts }),
  setFeedResults: (feedResults) => set({ feedResults }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setUsers: (user) => set((state) => ({ ...state.users, [user.id]: user })),
  updateUserPosts: (userId, posts) =>
    set((state) => ({
      users: {
        ...state.users,
        [userId]: {
          ...state.users[userId],
          posts: [...state.users[userId]?.posts || [], ...posts],
        },
      },
    })),

  updateMediaUrl: (postIndex, mediaIndex, newUrl, expiresAt) =>
    set((state) => {
      if (
        postIndex >= 0 &&
        postIndex < state.feedResults.length &&
        mediaIndex >= 0 &&
        mediaIndex < state.feedResults[postIndex].media_metadata.length
      ) {
        // Use immer to safely update the state
        state.feedResults[postIndex].media_metadata[mediaIndex].url = newUrl;
        state.feedResults[postIndex].media_metadata[mediaIndex].expiresAt = expiresAt;
      }
    }),

  updateLike: (postId, likedByUser) =>
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId ? { ...post, likedByUser } : post
      ),
    })),
}), {
  name: 'app-storage', // unique name
  getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
}));

export default useStore;
