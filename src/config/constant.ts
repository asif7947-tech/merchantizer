
export const BASE_URL = 'https://shop.aonerecoveryservice.com/';


export const getImageType = (uri: any) => {
    // const extension: string = uri.split('.').pop().toLowerCase(); // Get the file extension
    const extension = uri.split('.').pop()?.toLocaleLowerCase();
    const imageType = extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' : 'image/png';
    return imageType;
  };


  export const getSlectedStore  = (store: string) => {
    if(store === 'existing') {
      return 'Existing Stores'
    } else if(store === 'rejected') {
      return 'Rejected Stores'
    } 
    else if(store === 'nc') {
      return 'NC Stores'
    }
     else if(store === 'successful') {
      return 'Successful Stores'
    }
    else if(store === 'new') {
      return 'New Stores'
    }
    else if(store === 'out/stock') {
      return 'Out Of Stocks'
    } else return "test"
  }