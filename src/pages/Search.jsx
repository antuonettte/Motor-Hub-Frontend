import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Tabs, Tab, Grid, Card, CardContent, Typography } from '@mui/material';
import { search } from '../api/api.js';
import PostsGrid from '../components/PostsGrid.jsx';
import UserCard from '../components/UserCard.jsx';
import useStore from '../store.js'

const SearchPage = () => {
    // const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    // const [results, setResults] = useState({
    //     posts: [],
    //     users: []
    // });

    const {searchResults, setSearchResults, searchTerm, setSearchTerm} = useStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {



    }, [searchTerm]);


    const handleSearch = async (event) => {
        setSearchTerm(event.target.value);
        try {
            console.log("searching in for: ", searchTerm)
            const response = await search(event.target.value);
            setSearchResults(response.data.result);
            console.log(response.data.result)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    console.log(searchResults)


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };




    return (
        <Container maxWidth="md" style={{ marginTop: '150px' }}>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Box>
            <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                <Tab label="Posts" />
                <Tab label="Users" />
            </Tabs>
            <Box mt={2}>
                {activeTab === 0 && (
                    <Grid container spacing={2}>
                        <PostsGrid posts={searchResults.posts} />
                    </Grid>
                )}
                {activeTab === 1 && (
                    <Grid container spacing={2}>
                        {searchResults.users.map((user) => (
                            <UserCard user={user}></UserCard>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default SearchPage;
