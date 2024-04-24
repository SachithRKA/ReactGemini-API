import React, {useState} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";
import Markdown from "react-markdown";

const API_KEY = "API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});

function Body() {
    const [search, setSearch] = useState("");
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function aiRun() {
        const prompt = `${search}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
    }

    const handleClick = () => {
        aiRun();
        setLoading(true);

        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div>
            <h1>Gemini Project: Take Prompt from user: Output the solution</h1>
            <div style={{ display: 'flex'}}>
                <input placeholder='Search Food with Category using Generative AI' 
                    type="text" 
                    value={search} 
                    onChange={(event) => handleChangeSearch(event)} 
                />
                <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
            </div>

            {
                loading === true && search !== '' ?
                <p style={{ margin: '30px 0' }}>Loading ...</p>:
                <div style={{ margin: '30px 0' }}>
                    <h2>Search: {search}</h2>
                    <Markdown>{aiResponse}</Markdown>
                </div>
            }
        </div>
    );
}

export default Body;