const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const dataFilePath = path.resolve(__dirname, '../data.json');
    const newContent = JSON.parse(event.body);

    try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        data.args.push(newContent);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Content created successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
