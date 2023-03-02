export default function convertDateRange(start: string, end: string): string {

    const months: any = {"01":"Jan", "02": "Feb", "03": "Mar", "04":"Apr", "05":"May", "06":"Jun", "07":"Jul", "08":"Aug", "09":"Sep", "10":"Oct", "11":"Nov", "12":"Dec"};

    const dateStartYears = start.slice(0,4);
    const dateStartMonth = start.slice(5,7);
    const dateEndYears =  end.slice(0, 4);
    const dateEndMonth = end.slice(5, 7)
    
    return months[dateStartMonth] + " " + dateStartYears + " - " + months[dateEndMonth] + " " + dateEndYears;
    
    
    
}
