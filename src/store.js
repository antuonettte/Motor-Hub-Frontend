// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useStore = create(persist(set => ({
    currentUser: null,
    posts: [],
    profile: {},
    currentUserPosts: [],
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
    setProfile: (profile) => set({ profile }),
    setCurrentUserPosts: (currentUserPosts) => set({ currentUserPosts }),


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

    updateCurrentUserLike: (post_id) =>
        set((state) => ({
            currentUserPosts: state.currentUserPosts.map((post) =>
                post.id === post_id
                    ? {
                        ...post,
                        like_count: post.likedByUser ? post.like_count - 1: post.like_count + 1,
                        likedByUser: !post.likedByUser
                    }
                    : post
            ),
        })),

    updateFeedLike: (post_id, user_id) =>
        set((state) => ({
            feedResults: state.feedResults.map((post) =>
                post.id === post_id
                    ? {
                        ...post,
                        like_count: post.likedByUser ? post.like_count - 1: post.like_count + 1,
                        likedByUser: !post.likedByUser
                    }
                    : post
            ),
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
}), {
    name: 'app-storage',
    getStorage: () => localStorage,
}));

export default useStore;
