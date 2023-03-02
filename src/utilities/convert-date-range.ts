export default function convertDateRange(start: string, end: string): string {

    const months: any = {"01":"Jan", "02": "Feb", "03": "Mar", "04":"Apr", "05":"May", "06":"Jun", "07":"Jul", "08":"Aug", "09":"Sep", "10":"Oct", "11":"Nov", "12":"Dec"};

    const dateStartYears = start.slice(0,4);
    const dateStartMonth = start.slice(5,7);
    const dateStartDay = start.slice(8,10);
    const dateEndYears =  end.slice(0, 4);
    const dateEndMonth = end.slice(5, 7)
    const dateEndDay = end.slice(8,10);
    
    return (dateStartYears == dateEndYears && dateStartMonth == dateEndMonth && dateStartDay == dateEndDay ? "Performed on " + months[dateEndMonth] + " " + dateEndDay + ", " + dateEndYears 
    : dateStartYears == dateEndYears && dateStartMonth == dateEndMonth ? "Performed in " + months[dateEndMonth] + " " + dateEndYears 
    : "Performed from " + months[dateStartMonth] + " " + dateStartYears + " until " + months[dateEndMonth] + " " + dateEndYears);
    
    
    
}
