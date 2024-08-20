const baseURL = "http://localhost:8080/chat";

export async function disconnect(conversationId: string) {
    const response = await fetch(`${baseURL}/group-disconnection-request/${conversationId}`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.text();
}

export async function switchConversation(conversationId: string) {
    const response = await fetch(`${baseURL}/groups/active-group/${conversationId}`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.text();
}

export async function createGroup(groupId: string) {
    const response = await fetch(`${baseURL}/groups/${groupId}`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.text();
}

export async function getAllActiveConversations(): Promise<string[]> {
    const response = await fetch(`${baseURL}/groups`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    return await Array.from(jsonResponse);
}