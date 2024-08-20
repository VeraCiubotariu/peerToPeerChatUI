export default interface Message {
    sender: string | null;
    receiver: string | null;
    message: string;
    group: string | null;
}