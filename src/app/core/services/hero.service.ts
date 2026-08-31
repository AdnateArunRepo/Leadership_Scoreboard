import { Injectable } from '@angular/core';

declare var $: any;
 //  $.cordys.baseURL = '/home/Adnate';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  xmltojson(resp: any, key: any) { 

 return $.cordys.json.find(resp, key); 

} 

// xmltojson(resp: any, key: any): any[] {
//   const result = $.cordys.json.find(resp, key);

//   return Array.isArray(result)
//     ? result
//     : result
//       ? [result]
//       : [];
// }


ajax(method: any, namespace: any, parameters: any , data?: any) { 

 return new Promise((rev, rej) => { 
   // Check if $.cordys.ajax is available
      if (typeof $.cordys === 'undefined' || typeof $.cordys.ajax === 'undefined') {
        // If the library isn't loaded, reject immediately with a descriptive error
        rej({
          status: 'Error',
          errorText: 'Cordys AJAX library is not loaded.',
        });
        return;
      }


   $.cordys.ajax({ 

     method: method, 

     namespace: namespace, 

     dataType: '* json', 

     parameters: parameters, 

     data: data,
     //   url: '/home/Adnate/com.eibus.web.soap.Gateway.wcp',

     success: function success(resp: any) { 

       rev(resp); 

       //let test = $.cordys.json.find(resp, 'ScreenAccess'); 

     }, 

     error: function error(e1: any, e2: any, e3: any) { 

       console.log('err=>', e1, e2, e3); 

      // rev([e1, e2, e3]); 
        const responseText = e1?.responseText || '';
          console.log('Response Body:', responseText);
          // Reject with response text included for better debugging
          rej({ jqXHR: e1, textStatus: e2, errorThrown: e3, responseText: responseText });

     }, 

   }); 

 }); 

} 
}
