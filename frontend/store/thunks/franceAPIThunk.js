import { createAsyncThunk } from '@reduxjs/toolkit';

const franceAPIUrl = 'https://api-adresse.data.gouv.fr/search/';

export const checkAddress = createAsyncThunk('franceAPI/checkAddress', async (args) => {
    const { address } = args;
    const response = await fetch(`${franceAPIUrl}?q=${encodeURIComponent(address)}`);
    const data = await response.json();
    let res = [];
    if (response.ok) {
        data.features.forEach((feature) => {
            res.push({label: feature.properties.label, coordinates: feature.geometry.coordinates});
        });
    }
    return Promise.resolve({ res, error: !response.ok });
});