export function calculateReadTime(content: string): number {
    // Strip frontmatter (content between --- and --- at the start)
    const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');

    // Strip HTML tags
    const contentWithoutHtml = contentWithoutFrontmatter.replace(/<[^>]*>/g, '');

    // Strip markdown images and links to avoid counting URLs as words
    const contentCleaned = contentWithoutHtml
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[.*?\]\(.*?\)/g, ''); // Remove links

    // Split by whitespace to get words
    const words = contentCleaned.trim().split(/\s+/);
    const wordCount = words.length;

    // Calculate minutes (assuming 200 words per minute)
    const readTime = Math.ceil(wordCount / 200);

    // Return at least 1 minute
    return Math.max(1, readTime);
}
