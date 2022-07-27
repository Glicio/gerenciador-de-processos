export default function getData(data) {
    const arr = data.split('-')
    
    return arr[2]+"/"+arr[1]+"/"+arr[0]
  };