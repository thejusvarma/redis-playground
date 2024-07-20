const express = require('express');
const axios = require('axios').default;
const cors = require('cors'); // Import the CORS middleware
const app = express();
const client = require('./client');

// Use CORS middleware
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const cacheValue = await client.get('todo');
        var enabledRedis=false;
        //retreiving cache vaues from Redis
        if(cacheValue)
            {
                enabledRedis = true;
                return res.json({
                    cacheValue: JSON.parse(cacheValue),
                    enabledRedis: enabledRedis
                });
            }
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos/");
        //feeding new cache value to Redis
        await client.set('todo',JSON.stringify(response.data));
        await client.expire('todo',5);
        return res.json({
            cacheValue: response.data,
            enabledRedis: enabledRedis
        });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000/');
});

