function generateOrderNumber() {
    const now = new Date();
  
    // Extract parts of the date and time
    const year = now.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
    const day = now.getDate().toString().padStart(2, '0'); // Day (01-31)
    const hour = now.getHours().toString().padStart(2, '0'); // Hour (00-23)
    const minute = now.getMinutes().toString().padStart(2, '0'); // Minute (00-59)
    const second = now.getSeconds().toString().padStart(2, '0'); // Second (00-59)
  
    // Generate a unique numeric part (e.g., last 4 digits of a UUID or random number)
    const uniquePart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
    // Concatenate all parts to form the order number
    return `${year}${month}${day}${hour}${minute}${second}${uniquePart}`;
  }
  
  export default generateOrderNumber;
  