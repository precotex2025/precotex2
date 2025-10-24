// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //Desarrollo en localhost
  //--> url: "https://localhost:7172/api/",
  //url_UbiAlm: "https://localhost:7093/api/",
  //url: "http://localhost:5172/api/"

  //Produccion
  //url: "http://activosfijos.precotex.com:7080/activosfijos/api/",
  url: "http://192.168.1.36:7080/activosfijos/api/",
  url_UbiAlm: "https://gestion.precotex.com:444/ubicaciones/api/",
  //url_UbiAlm: "http://192.168.1.36:8062/api/",

  //Desarrollo en  servidor
  //--> url:  "http://192.168.1.36:7090/desarrollo/api/"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
