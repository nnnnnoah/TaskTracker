// Converts a Date object to a string or returns an empty string if the date is invalid
// Defines the date parameter as a Date object, and type hints the return type for the function to be a string
export const dateToValue = (date: Date): string => 
    // Inline conditional to return the Date as a populated or empty string depending on the input
    date instanceof Date && !Number.isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : '';