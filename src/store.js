// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define expiration time in milliseconds (e.g., 1 day)
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

const useStore = create(persist(
  (set, get) => ({
    currentUser: null,
    posts: [],
    profile: {},
    currentUserPosts: [],
    feedResults: [],
    searchTerm: '',
    users: {},
    searchResults: { posts: [], users: [] },
    timestamp: null,

    setCurrentUser: (currentUser) => set({ currentUser, timestamp: Date.now() }),
    setPosts: (posts) => set({ posts, timestamp: Date.now() }),
    setFeedResults: (feedResults) => set({ feedResults, timestamp: Date.now() }),
    setSearchResults: (searchResults) => set({ searchResults, timestamp: Date.now() }),
    setSearchTerm: (searchTerm) => set({ searchTerm, timestamp: Date.now() }),
    setUsers: (user) => set((state) => ({
      ...state.users,
      [user.id]: user,
      timestamp: Date.now()
    })),
    setProfile: (profile) => set({ profile, timestamp: Date.now() }),
    setCurrentUserPosts: (currentUserPosts) => set({ currentUserPosts, timestamp: Date.now() }),

    updateUserPosts: (userId, posts) =>
      set((state) => ({
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            posts: [...state.users[userId]?.posts || [], ...posts],
          },
        },
        timestamp: Date.now(),
      })),

    updateCurrentUserLike: (post_id) =>
      set((state) => ({
        currentUserPosts: state.currentUserPosts.map((post) =>
          post.id === post_id
            ? {
              ...post,
              like_count: post.likedByUser ? post.like_count - 1 : post.like_count + 1,
              likedByUser: !post.likedByUser
            }
            : post
        ),
        timestamp: Date.now(),
      })),

    updateFeedLike: (post_id, user_id) =>
      set((state) => ({
        feedResults: state.feedResults.map((post) =>
          post.id === post_id
            ? {
              ...post,
              like_count: post.likedByUser ? post.like_count - 1 : post.like_count + 1,
              likedByUser: !post.likedByUser
            }
            : post
        ),
        timestamp: Date.now(),
      })),

    updateMediaUrl: (postIndex, mediaIndex, newUrl, expiresAt) =>
      set((state) => {
        if (
          postIndex >= 0 &&
          postIndex < state.feedResults.length &&
          mediaIndex >= 0 &&
          mediaIndex < state.feedResults[postIndex].media_metadata.length
        ) {
          state.feedResults[postIndex].media_metadata[mediaIndex].url = newUrl;
          state.feedResults[postIndex].media_metadata[mediaIndex].expiresAt = expiresAt;
          state.timestamp = Date.now();
        }
      }),

      addCommentToPost: (postId, comment) => 
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post
          ),
          feedResults: state.feedResults.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post
          ),
          timestamp: Date.now(),
        })),

    clearData: () => set({
      currentUser: null,
      posts: [],
      profile: {},
      currentUserPosts: [],
      feedResults: [],
      searchTerm: '',
      users: {},
      searchResults: { posts: [], users: [] },
      timestamp: null
    }),

    checkExpiration: () => {
      const { timestamp } = get();
      if (timestamp && (Date.now() - timestamp > EXPIRATION_TIME)) {
        set({
          currentUser: null,
          posts: [],
          profile: {},
          currentUserPosts: [],
          feedResults: [],
          searchTerm: '',
          users: {},
          searchResults: { posts: [], users: [] },
          timestamp: null
        });
      }
    },

    

  }), {
    name: 'app-storage',
    getStorage: () => localStorage,
    onRehydrateStorage: () => (state) => {
      if (state) {
        const { timestamp } = state;
        if (timestamp && (Date.now() - timestamp > EXPIRATION_TIME)) {
          state.currentUser = null;
          state.posts = [];
          state.profile = {};
          state.currentUserPosts = [];
          state.feedResults = [];
          state.searchTerm = '';
          state.users = {};
          state.searchResults = { posts: [], users: [] };
          state.timestamp = null;
        }
      }
    }
  }
));

export default useStore;
