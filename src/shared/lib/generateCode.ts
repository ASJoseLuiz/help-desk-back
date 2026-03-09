export function generateTicketCode(uuid: string): number {
    const hash = uuid
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
    return hash % 1000000;
  }