export function protectUrl(url: any) {
    return `/link?to=${url}`;
}

export function getHashGradient(str: string) {
    const hash = generateHash(str);
    const directions = ['to-l', 'to-r', 'to-tr', 'to-br', 'to-bl', 'to-tl'];
    const colors = [
        'red',
        'orange',
        'teal',
        'green',
        'blue',
        'indigo',
        'purple',
        'pink',
    ];
    const values = [300,500, 700];
    const values2 = [400, 600, 800];
    let output = 'bg-gradient-';
    output += directions[hash % directions.length];
    output += ' from-';
    output += colors[(hash >> 1) % colors.length];
    output += '-';
    output += values[(hash >> 2) % values.length];
    output += ' to-';
    output += colors[(hash >> 3) % colors.length];
    output += '-';
    output += values2[(hash >> 4) % values2.length];
    return output;
}

function generateHash(input: string): number {
    let hash = 0;
    input = input+"_pad_"+input
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}