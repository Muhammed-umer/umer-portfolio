import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://www.hackerrank.com/rest/hackers/Md_umer77/badges', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            throw new Error(`HackerRank API responded with ${response.status}`);
        }
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('HackerRank fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch HackerRank data' }, { status: 500 });
    }
}
