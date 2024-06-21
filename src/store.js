// store.js
import {create} from 'zustand';

const useStore = create(set => ({
  currentUser: null,
  posts: [],
  feedResults:[],
  searchTerm: '',
  searchResults:{posts:[], users:[]},
  setCurrentUser: (currentUser) => set({ currentUser }),
  setPosts: (posts) => set({ posts }),
  setFeedResults: (feedResults) => set({ feedResults }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  
  updateLike: (postId, likedByUser) =>
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId ? { ...post, likedByUser } : post
      ),
    })),
}));

export default useStore;
